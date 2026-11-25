---
title: "PacketLark Internals: QuickJS Script Isolation, DNS-Pinned Capability Grants, and OpenAPI 3.1 Inference"
date: "2026-11-25"
description: "Inside PacketLark, built by Abrar Akhunji: a zero-cloud HTTP workbench running on 127.0.0.1 with plaintext Git-friendly JSON collections, 64 MiB QuickJS worker sandboxes, TOCTOU-free DNS lookup pinning, HTTP capture proxy, OpenAPI 3.1 synthesis, and local stdio MCP."
tags: ["PacketLark", "API Client", "QuickJS", "OpenAPI 3.1", "MCP", "Local First", "Security", "Abrar Akhunji"]
author: "Abrar Akhunji"
heroImage: "/images/blog/packetlark-local-first-api-workbench-quickjs-openapi-mcp/hero.jpg"
techTree:
  branch: "Developer Tools"
  level: 9
  prerequisites: ["nvidia-openshell-kernel-sandbox-landlock-seccomp-agent-runtime", "omniroute-agentic-ai-gateway-rtk-compression"]
faq:
  - question: "Who created PacketLark and how does it store API collections?"
    answer: "PacketLark is created and maintained by Abrar Akhunji as MIT-licensed local-first software. Instead of forcing proprietary cloud workspaces, collections and environments live as per-resource JSON files inside .packetlark/ (up to 1,000 resource documents, 2 MiB per resource, 32 MiB workspace cap) protected by 0600 atomic writes, fsync, and If-Match content-hash concurrency checks."
  - question: "Why did PacketLark replace node:vm with QuickJS child worker processes?"
    answer: "Node's built-in vm module is not a security or resource boundary: synchronous infinite loops block the entire event loop and shared heap references risk memory exhaustion or host object leakage. PacketLark's ScriptWorkerPool runs pre/post scripts in fresh single-shot child processes embedding QuickJS with strict 64 MiB old-generation caps, 2s-30s execution deadlines, 4 MiB serialized I/O bounds, and explicit termination on cancel."
  - question: "How fast is PacketLark and how much memory does the local server use?"
    answer: "On Node 24 (Apple M4, 200 sequential 1 KiB fixture samples), PacketLark measured P95 0.163 ms direct response latency, 0.591 ms bounded capture proxy latency, and 0.667 ms workspace list latency. Cold CLI readiness across 30 fresh processes measured 85.62 ms P95 at 71.41 MiB backend RSS, while live Workbench screenshots show 52.95 MB to 75.38 MB server RSS."
  - question: "How does PacketLark compare to Postman, Bruno, Insomnia, and Hoppscotch?"
    answer: "Postman remains the broadest enterprise ecosystem ($0 Solo, $9 Solo, $19 Team, $49/user/mo Enterprise, plus Postman 12 Git YAML sync) with native GraphQL, gRPC, and cloud governance. PacketLark offers $0 local execution, QuickJS script isolation, deny-by-default SSRF/DNS-rebinding protection, traffic-driven OpenAPI 3.1 synthesis, and native stdio/HTTP MCP, while explicitly lacking HTTPS CONNECT decryption and non-HTTP protocols."
---

:::eli5
*Written by Abrar Akhunji*

Sending one HTTP POST request to `localhost` should not require creating a cloud account, syncing environment keys across corporate servers, or waiting for a bloated multi-hundred-megabyte desktop app just to edit three JSON headers. At the same time, running someone else's imported API collection with hidden pre-request scripts is basically executing untrusted JavaScript right on your laptop.

```
+-----------------------------------------------------------------------------+
|            PACKETLARK : ZERO-CLOUD HTTP WORKBENCH + MCP SERVER              |
+-----------------------------------------------------------------------------+
|                                                                             |
|  [ .packetlark/ JSON ]   [ Forward Proxy :8085 ]   [ Studio UI :4040 ]      |
|  Git-friendly files      500 bounded captures      Zero external CDNs       |
|  If-Match ETag guard     Secret & cookie mask      Light / Dark / Halide    |
|            |                        |                         |             |
|            +------------------------+-------------------------+             |
|                                     |                                       |
|                                     v                                       |
|        +--------------------------------------------------------+           |
|        |   ISOLATED EXECUTION & CAPABILITY CORE                 |           |
|        |   1. QuickJS Worker Pool (64 MiB / 2s-30s Cap)         |           |
|        |   2. DestinationGrant + DNS Pinning (SSRF Guard)       |           |
|        +--------------------------------------------------------+           |
|                     |                                  |                    |
|                     v                                  v                    |
|    [ OpenAPI 3.1 Inference + SDK ]      [ Local Stdio & Bearer MCP ]        |
|    TS Client + cURL / Python / Go       Agents invoke tested API collections|
|                                                                             |
+-----------------------------------------------------------------------------+
```

I built **PacketLark** (**Abrar Akhunji**, `github.com/abrar225/packetlark`, `abrar225.github.io/packetlark/`) to deliver three properties in one open-source local runtime: human-readable JSON collections stored inside your repository, hard OS and interpreter guardrails around untrusted scripts and private-network targets, and automated inference that converts real captured HTTP traffic directly into reviewable **OpenAPI 3.1 contracts**, **TypeScript SDKs**, and **agent-ready MCP tools**.

Instead of trusting imported Postman scripts with access to Node's filesystem or letting a wildcard redirect touch `127.0.0.1` metadata endpoints, PacketLark denies both by default. Scripts execute inside a **QuickJS WebAssembly/native sandbox worker** with strict millisecond deadlines and zero Node globals, while every target origin requires an explicit versioned `DestinationGrant` checked at the actual socket DNS lookup boundary.
:::

:::interactive chart
{
  "title": "PacketLark Measured Local Core Latency Benchmarks (P95 Milliseconds, Node 24 / Apple M4)",
  "description": "Source-pinned loopback microbenchmarks (200 measured runs after 20 warmups per path; 30 fresh processes for CLI startup). Direct/proxy runs benchmark local server IPC and capture ring latency, not cross-WAN API calls.",
  "type": "bar",
  "xKey": "operation",
  "series": [
    { "name": "P95 Latency (ms)", "dataKey": "p95Ms" }
  ],
  "data": [
    { "operation": "Direct Loopback Response (1 KiB)", "p95Ms": 0.163 },
    { "operation": "Bounded Capture Proxy Record", "p95Ms": 0.591 },
    { "operation": "Workspace Collection List", "p95Ms": 0.667 },
    { "operation": "Cold CLI Subprocess Readiness (30 runs)", "p95Ms": 85.62 }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

### 1. Local-First Workspace Integrity and Storage Design

**PacketLark** (`0.0.1` beta line / `1.1.0` platform candidate milestones across Phases P0 through P4) is built by **Abrar Akhunji** on Node 22/24 with a zero-CDN local web application bound exclusively to `127.0.0.1:4040/studio`. Every design decision treats the developer's local filesystem as the canonical source of truth, eliminating vendor lock-in while defending aggressively against silent truncation and race corruption.

Inside `.packetlark/`, workspace collections and environments are stored as discrete, structured JSON files rather than monolithic binary databases:
- **Hard Scale Envelopes:** Up to **1,000 resource documents** per workspace, capped at **2 MiB per document** and **32 MiB combined workspace serialization** (switching from formatted to compact JSON cleanly when whitespace alone would cross the 2 MiB loader limit).
- **Atomic File Lifecycle:** Saves serialize through an exclusive `0600` temporary file, execute `fsync`, and swap via atomic rename so interrupted disk writes never leave half-truncated collection JSON.
- **Optimistic Concurrency & External Change Reconciliation:** Every resource revision hashes content cleanly; workbench mutations enforce `If-Match` headers and surface `412 ERR_WORKSPACE_CONFLICT` cleanly when an external script or Git checkout edits a collection on disk. Users inspect side-by-side diffs with credential masking before choosing whether to discard local drafts, keep them, or clone a recovered file.

```
[ Browser Studio UI :4040 ] --(127.0.0.1 + Host/Origin Check + If-Match Revision)--> [ PacketLark Core ]
                                                                                            |
      +----------------------------------------+--------------------------------------------+
      |                                        |                                            |
      v                                        v                                            v
[ .packetlark/ Store ]              [ Forward Proxy :8085 ]                     [ QuickJS Worker Pool ]
- 0600 tmp + fsync + rename         - 500 records / 32 MiB ring cap             - 2 active / 8 queued jobs
- macOS Keychain secret refs        - 4 MiB upload / 10 MiB decoded cap         - 64 MiB heap / 2s-30s TTL
- Content-hash revision checks      - Header/cookie/query redaction             - Zero Node globals
      |                                        |                                            |
      +----------------------------------------+--------------------------------------------+
                                               |
                                               v
                               [ DestinationPolicy.assertDestination ]
                               - Exact Origin + Uppercase HTTP Method Grant
                               - Socket-Level DNSLookup Pinning (No SSRF Rebinding)
                                               |
            +----------------------------------+----------------------------------+
            |                                                                     |
            v                                                                     v
[ OpenAPI 3.1 Inference + SDK ]                                    [ MCP Server (Stdio + Bearer HTTP) ]
- Route clustering & schema merge                                  - Bounded collection runs & inspection
- Verified TS client + Go/Py/Fetch/cURL                            - Redacts marked environment secrets
```

---

### 2. Bounded QuickJS Script Sandbox vs `node:vm`

Executing Postman-style `pm.test` and `pm.sendRequest` hooks inside Node's native `vm` context creates two severe bugs in desktop API runners: a single `while (true) {}` hangs the entire Studio server permanently, and shared JavaScript engine objects make memory exhaustion trivial.

PacketLark replaces `vm` with `ScriptWorkerPool` (`docs/P3_EXECUTION_SECURITY.md`): every script executes inside an **isolated single-shot child process** running a compiled **QuickJS interpreter** with strictly enforced IPC and heap quotas:

| Resource Boundary | Enforced Limit | Failure Semantics |
| :--- | :--- | :--- |
| **Pool Concurrency** | **2 active** workers + **8 queued** slots | Admission queue bounded; deadlines include queue wait |
| **Wall-Clock Deadline** | **2 seconds default**, **30 seconds hard max** | Aborts parent HTTP controller and kills child process |
| **Worker Memory** | **64 MiB** old-gen + **1 MiB** semi-space (plus QJS heap/stack) | Process exit reclaims native/WASM pages immediately |
| **Serialized I/O Caps** | **4 MiB** input/output total; **1 MiB** per IPC frame | Parent sets `stateUnchanged: true` preserving scopes |
| **Bridge & Child Calls** | Max **256** parent msgs, **100** host calls, **20** child HTTP calls | Prevents timer floods and fork/request storms |
| **Environment Inheritance** | Strictly `PATH`, `LANG`, and temp directory | Zero access to parent env secrets, `fs`, or Node modules |

Notably, PacketLark distinguishes resource containment from an adversarial kernel sandbox: scripts see only explicit JSON copies of scoped variables (`packetlark-pm/1` + Chai assertion compatibility) and cannot retain memory across runs because worker exit destroys the entire process address space.

---

### 3. Origin Grants and Socket-Level DNS Pinning Against Rebinding

Checking whether a URL string resolves to `127.0.0.1` or `169.254.169.254` **before** handing that hostname back to Node's HTTP client creates a classic **Time-of-Check to Time-of-Use (TOCTOU) DNS rebinding vulnerability**. An attacker's DNS responder returns a clean public IP during preflight validation and swaps cleanly to `127.0.0.1` when the OS socket calls `getaddrinfo` a millisecond later.

PacketLark closes both halves using `DestinationGrant` plus socket-level lookup injection (`DestinationPolicy.assertDestination`):

1. **Deny-by-Default Explicit Consent:** Every workspace defaults to deny-all. Collections imported from Git or third-party Postman dumps do not inherit permission. Sending a request or firing a script `pm.sendRequest` requires an explicit versioned JSON grant:
   ```json
   {
     "version": 1,
     "origins": ["https://api.example.com"],
     "methods": ["GET", "POST"],
     "allowPrivate": false
   }
   ```
   Canonical origin checks disallow paths, query strings, trailing slashes, userinfo tokens, noncanonical ports, `CONNECT`, `TRACE`, and `TRACK`.
2. **Every Hop Re-Validated:** `assertDestination` executes on initial submission, every post-rewrite HTTP redirect hop (while stripping cross-origin credentials cleanly), and every script-triggered subrequest.
3. **DNS Lookup Pinning (`createLookup()`):** Instead of calling `dns.lookup` separately, PacketLark passes a custom lookup hook directly into the HTTP transport socket. It resolves addresses once, blocks loopback, link-local, shared, multicast, IPv4-mapped IPv6, and RFC 1918 ranges unless `allowPrivate: true` is granted, and passes those **exact validated IP tuples** directly to the TCP socket so no second DNS resolution occurs.

---

### 4. Capture Proxy, OpenAPI 3.1 Synthesis, and Real UI Workflows

PacketLark turns passive HTTP traffic directly into verified specifications and runnable client code via an isolated forwarding proxy (`localhost:8085`). Captured traffic uses explicit **start / pause / resume / stop** states backed by admission generations (preventing pre-pause inflight packets from polluting resumed recordings).

Defaults bound every buffer tightly: **500 retained records**, **10 sessions**, **24-hour TTL**, **32 MiB aggregate retained memory**, **1 MiB per inspected record**, **32 open sockets**, **8 active forwards**, **4 MiB upload cap**, and **10 MiB upstream decoded body cap**. Heuristic redaction strips common API keys, tokens, cookies, and configured secrets before entries reach either capture history or OpenAPI drafts.

From captured records (plus validated OpenAPI 3.0/3.1 JSON/YAML imports capped cleanly at `2 MiB`, depth `40`, `50,000` nodes, `500` ops, and `1,000` internal `$ref`), an isolated discovery worker (`1` active / `2` queued, `128 MiB` heap limit, `5 s` admission timeout):
1. Normalizes UUIDs, MongoDB ObjectIds, numeric path IDs, and SHA hashes into parameterized OpenAPI routes.
2. Merges observed sample structures while flagging optionality honestly instead of fabricating strict required fields.
3. Requires explicit checksum-bound user confirmation before promoting inferred specs into contract fixtures or generating **TypeScript clients** and **cURL / Fetch / Python / Go snippets**.

![PacketLark desktop studio light theme showing local 127.0.0.1 HTTP GET request execution, response timing 74 ms, 75.38 MB server RSS, and passing Test Results](/images/blog/packetlark-local-first-api-workbench-quickjs-openapi-mcp/workbench-desktop.png)

*Figure 1: PacketLark desktop Workbench light mode running a local HTTP test against `127.0.0.1:59600/profile`, displaying `200 OK` in `74 ms`, `1` passing assertion, and live footer telemetry (`Local server · 75.38 MB RSS`).*

![PacketLark dark indigo redesign UI displaying Collections sidebar, request limits, and 52.95 MB live backend RSS](/images/blog/packetlark-local-first-api-workbench-quickjs-openapi-mcp/workbench-redesign.png)

*Figure 2: PacketLark Halide-aligned dark UI (`workbench-redesign.png`) inspecting request/response size bounds (`4 MiB` / `10 MiB`), local tab caps (`20` tabs), and `52.95 MB RSS` server memory.*

![PacketLark workspace reconciliation conflict modal showing side-by-side Local drafts vs Disk version JSON diff](/images/blog/packetlark-local-first-api-workbench-quickjs-openapi-mcp/reconciliation-review.png)

*Figure 3: Conflict reconciliation modal catching an external modification to a `.packetlark/` collection JSON file and presenting a redacted side-by-side comparison (`Load disk and discard local drafts`, `Keep drafts with disk context`, or `Save recovered collection copy`).*

---

### 5. Verified Performance, Soak Testing, and Honest Gaps

PacketLark has zero patience for fabricated "10x lighter than X" slogans. Earlier exploratory drafts referencing unpinned Postman RAM comparisons were explicitly purged from the repository (`docs/PRODUCT_ASSESSMENT.md`) in favor of reproducible, source-pinned measurements:

| Benchmark / Verification Suite | Measured Result | Scope & Explicit Caveats |
| :--- | :--- | :--- |
| **P4 Full Automated Regression** | **405 / 405 tests across 48 files passed** (0 skips) | Includes real loopback servers, QuickJS workers, OpenAPI validation, and live compiled Go snippet execution |
| **Targeted Chromium UI Suite** | **16 / 16 workflows passed** (7 exact server hits) | Captures, fixture replays, cancellation, exported OpenAPI + TS client CLI drift check |
| **Loopback Microbenchmark (200 runs, Node 24 / M4)** | Direct P95 **`0.163 ms`**; Proxy P95 **`0.591 ms`**; List **`0.667 ms`** | Single-machine sequential `1 KiB` payload; measures server overhead, not remote network latency |
| **Fresh CLI Cold Start (30 processes)** | P95 readiness **`85.62 ms`**; backend RSS **`71.41 MiB`** | Warm OS filesystem caches; excludes external Chromium browser tab memory |
| **Live Server RSS Observed in UI** | **`52.95 MB`** (dark redesign) to **`75.38 MB`** (desktop capture) | Live Node server footprint shown in Workbench footer |
| **10-Minute Sustained Capture Soak** | **`41,000` requests**; **`0.887 MiB`** post-GC median heap growth | Held `64,370` retained bytes, `0` leaked forwards (`200.7 MiB` combined client+target+proxy test tree) |
| **10,004-Row Browser Stress Test** | Readiness `490 ms`; Filter **`801 ms`**; Select **`805.5 ms`** | Candidly flagged above the `100 ms` UI target, motivating P1 list virtualization |

Where does PacketLark intentionally fall short of mature enterprise platforms today? Let the missing checklist speak plainly:
- **No HTTPS `CONNECT` MITM Interception:** Forwarding proxy inspects plain local HTTP traffic only; browser HTTPS capture extensions remain deferred.
- **HTTP-Only Core:** Native schema-aware GraphQL explorers, gRPC/protobuf reflection, WebSockets, MQTT, and webhook listeners are absent (GraphQL payloads go as plain JSON POSTs).
- **Preview-Only Editor & MCP Maturity:** A packagable VS Code extension exists (`@vscode/vsce` verified cleanly) alongside local `stdio` and bearer HTTP MCP tools (`get`, list, bounded runs with body/secret omission), yet full VS Code extension-host QA and multi-user cloud workspaces remain deferred.

---

### 6. Comparison Against Postman, Insomnia, Bruno, and Hoppscotch

| Capability | PacketLark (Abrar Akhunji) | Postman | Insomnia (Kong) | Bruno | Hoppscotch |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **License & Pricing** | **$0 MIT Open Source** | Free (1 user), **$9** Solo, **$19** Team, **$49/user/mo** Enterprise | Free (Git <=3 users), **$10 to $12/mo** Pro, **$45/mo** Ent | Free MIT (2 workspaces), **~$6/mo** Pro, **~$11/mo** Ult | Free cloud / Docker OSS, **~$6-$8/mo** Biz, **~$11-$14/mo** Ent |
| **Workspace Storage** | **`.packetlark/` JSON (If-Match ETag + `0600` fsync)** | Cloud workspaces default (v12 added YAML Git mode) | Local, Cloud, or Native YAML Git sync | Native `.bru` plain text files inside Git folders | Cloud DB / self-hosted Docker DB |
| **Script Isolation** | **QuickJS worker (`64 MiB`, `2s-30s` cap, no Node globals)** | Node / Postman Sandbox runtime | Insomnia plugins + Mocha/Chai test runtime | Bru CLI / JavaScript sandbox | Web / desktop JS script runner |
| **SSRF / Origin Guard** | **Explicit `DestinationGrant` + Socket DNS Pinning** | Standard desktop proxy / CA config | Standard app networking | Standard app networking | CORS / proxy agent config |
| **Traffic -> OpenAPI 3.1** | **Built-in capture proxy (`:8085`) -> OpenAPI + TS/Go** | API Builder + spec sync (paid tiers for scale) | Spec-first Design + Git sync | OpenAPI import / export | OpenAPI import / collections |
| **Protocol Breadth** | HTTP/1.1 & HTTPS (JSON/binary/multipart); Stdio + HTTP MCP | **Broadest:** HTTP, GraphQL, gRPC, WebSocket, Socket.IO, MQTT | HTTP, GraphQL, gRPC, WebSockets | HTTP, GraphQL, gRPC (emerging), WebSockets | HTTP, GraphQL, WebSocket, SSE, MQTT |
| **Sweet Spot** | Security-conscious local REST dev, traffic inference, AI agent MCP | Full enterprise API governance, mocks, flows, teams | Kong gateway workflows + YAML spec design | Lightweight Git-native team collections | Fast browser-first open-source multi-protocol UI |

---

### 7. Engineering Rules of Thumb for Local API Toolchains

1. **Quarantine Collection Scripts Like Untrusted Code:** Anyone importing a stranger's OpenAPI or Postman collection into an Electron or Node backend must never run tests via `vm.runInNewContext`. Enforce an out-of-process bytecode engine (such as QuickJS) with hard millisecond timers and explicit IPC byte caps.
2. **Validate DNS Resolutions Inside the Socket Connect Hook:** Preflight domain blacklists fail against zero-TTL DNS rebinding. Pin resolved IP addresses at `createLookup()` right before TCP socket establishment and strip authorization headers across origin redirects.
3. **Require Explicit Human Sign-Off Before Turning Logs into Specs:** Captured production or staging traffic misses optional fields and rare error codes. Treat traffic-inferred OpenAPI 3.1 documents strictly as checksum-bound drafts paired with drift-detection fixtures rather than unquestioned truth.
4. **Expose Bounded Read/Run Primitives Over MCP Rather Than Raw Shells:** Giving coding agents a dedicated `stdio` MCP adapter over local HTTP collections lets Claude Code or Codex run integration assertions directly while keeping secret environment keys masked from model context windows.
:::

---

### Sources
- Project Repository & Documentation: [PacketLark GitHub Repository (Abrar Akhunji)](https://github.com/abrar225/packetlark) and [PacketLark Overview Site](https://abrar225.github.io/packetlark/)
- Execution Sandbox & DNS Security Spec: [PacketLark docs/P3_EXECUTION_SECURITY.md](https://github.com/abrar225/packetlark/blob/main/docs/P3_EXECUTION_SECURITY.md)
- OpenAPI Inference & Capture Architecture: [PacketLark docs/P4_PROGRESS.md](https://github.com/abrar225/packetlark/blob/main/docs/P4_PROGRESS.md)
- Verification & Honest Product Audit: [PacketLark docs/VERIFICATION.md](https://github.com/abrar225/packetlark/blob/main/docs/VERIFICATION.md) and [docs/PRODUCT_ASSESSMENT.md](https://github.com/abrar225/packetlark/blob/main/docs/PRODUCT_ASSESSMENT.md)
- Competitor Pricing & Feature References: [Postman Pricing](https://www.postman.com/pricing/), [Insomnia Plans](https://insomnia.rest/pricing), [Bruno](https://www.usebruno.com), [Hoppscotch](https://hoppscotch.com)
