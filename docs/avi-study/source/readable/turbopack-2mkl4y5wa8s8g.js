(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, { otherChunks: ["static/immutable/chunks/17tuxysuvqwd2.js", "static/immutable/chunks/28fkf9f9btak4.js", "static/immutable/chunks/14hixo8lqikjs.js", "static/immutable/chunks/05vpcne26z-o4.js", "static/immutable/chunks/013n7xrct7gqq.js"], runtimeModuleIds: [94553] }]), (() => {
  let e;
  if (!Array.isArray(globalThis.TURBOPACK)) return;
  var t, r = (function() {
    if (null != self.TURBOPACK_ASSET_SUFFIX) return self.TURBOPACK_ASSET_SUFFIX;
    let e2 = document?.currentScript?.getAttribute?.("src") ?? "", t2 = e2.indexOf("?");
    return t2 >= 0 ? e2.slice(t2) : "";
  })(), n = ((t = n || {})[t.Runtime = 0] = "Runtime", t[t.Parent = 1] = "Parent", t[t.Update = 2] = "Update", t);
  let o = /* @__PURE__ */ new WeakMap();
  function i(e2, t2) {
    this.m = e2, this.e = t2;
  }
  let l = i.prototype, u = Object.prototype.hasOwnProperty, s = "u" > typeof Symbol && Symbol.toStringTag;
  function c(e2, t2, r2) {
    u.call(e2, t2) || Object.defineProperty(e2, t2, r2);
  }
  function a(e2, t2) {
    let r2 = e2[t2];
    return r2 || (r2 = f(t2), e2[t2] = r2), r2;
  }
  function f(e2) {
    return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
  }
  function p(e2, t2, r2) {
    c(e2, "__esModule", { value: true }), s && c(e2, s, { value: "Module" });
    let n2 = 0;
    for (; n2 < t2.length; ) {
      let r3 = t2[n2++], o2 = t2[n2++];
      if ("number" == typeof o2) if (0 === o2) c(e2, r3, { value: t2[n2++], enumerable: true, writable: false });
      else throw Error(`unexpected tag: ${o2}`);
      else "function" == typeof t2[n2] ? c(e2, r3, { get: o2, set: t2[n2++], enumerable: true }) : c(e2, r3, { get: o2, enumerable: true });
    }
    r2 || Object.seal(e2);
  }
  function h(e2, t2) {
    (null != t2 ? a(this.c, t2) : this.m).exports = e2;
  }
  l.s = function(e2, t2, r2) {
    let n2, o2;
    null != t2 ? o2 = (n2 = a(this.c, t2)).exports : (n2 = this.m, o2 = this.e), n2.namespaceObject = o2, p(o2, e2, r2);
  }, l.j = function(e2, t2) {
    let r2, n2;
    null != t2 ? n2 = (r2 = a(this.c, t2)).exports : (r2 = this.m, n2 = this.e);
    let i2 = (function(e3, t3) {
      let r3 = o.get(e3);
      if (!r3) {
        o.set(e3, r3 = []);
        let n3 = (e4) => {
          if ("default" !== e4) {
            for (let t4 of r3) if (u.call(t4, e4)) return t4;
          }
        };
        e3.exports = e3.namespaceObject = new Proxy(t3, { get(e4, t4) {
          if (u.call(e4, t4) || "default" === t4 || "__esModule" === t4) return Reflect.get(e4, t4);
          let r4 = n3(t4);
          return r4 && Reflect.get(r4, t4);
        }, set: () => false, defineProperty: () => false, deleteProperty: () => false, has: (e4, t4) => !!Reflect.has(e4, t4) || "default" !== t4 && "__esModule" !== t4 && void 0 !== n3(t4), ownKeys(e4) {
          let t4 = Reflect.ownKeys(e4);
          for (let e5 of r3) for (let r4 of Reflect.ownKeys(e5)) "default" === r4 || t4.includes(r4) || t4.push(r4);
          return t4;
        }, getOwnPropertyDescriptor(e4, t4) {
          let r4 = Reflect.getOwnPropertyDescriptor(e4, t4);
          if (r4 || "default" === t4 || "__esModule" === t4) return r4;
          let o2 = n3(t4);
          if (o2) return { enumerable: true, configurable: true, get: () => Reflect.get(o2, t4) };
        } });
      }
      return r3;
    })(r2, n2);
    "object" == typeof e2 && null !== e2 && i2.push(e2);
  }, l.v = h, l.n = function(e2, t2) {
    let r2;
    (r2 = null != t2 ? a(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
  };
  let d = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, m = [null, d({}), d([]), d(d)];
  function y(e2, t2, r2) {
    let n2 = [], o2 = -1;
    for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !m.includes(t3); t3 = d(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ (function(e3, t4) {
      return () => e3[t4];
    })(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
    return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), p(t2, n2), t2;
  }
  function b(e2) {
    let t2 = I(e2, this.m);
    if (t2.namespaceObject) return t2.namespaceObject;
    let r2 = t2.exports;
    return t2.namespaceObject = y(r2, "function" == typeof r2 ? function(...e3) {
      return r2.apply(this, e3);
    } : /* @__PURE__ */ Object.create(null), r2 && r2.__esModule);
  }
  function g(e2) {
    let t2 = e2.indexOf("#");
    -1 !== t2 && (e2 = e2.substring(0, t2));
    let r2 = e2.indexOf("?");
    return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
  }
  l.i = b, l.A = function(e2) {
    return this.r(e2)(b.bind(this));
  }, l.t = "function" == typeof require ? require : function() {
    throw Error("Unexpected use of runtime require");
  }, l.r = function(e2) {
    return I(e2, this.m).exports;
  }, l.f = function(e2) {
    function t2(t3) {
      if (t3 = g(t3), u.call(e2, t3)) return e2[t3].module();
      let r2 = Error(`Cannot find module '${t3}'`);
      throw r2.code = "MODULE_NOT_FOUND", r2;
    }
    return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
      if (t3 = g(t3), u.call(e2, t3)) return e2[t3].id();
      let r2 = Error(`Cannot find module '${t3}'`);
      throw r2.code = "MODULE_NOT_FOUND", r2;
    }, t2.import = async (e3) => await t2(e3), t2;
  };
  let O = function(e2) {
    let t2 = new URL(e2, "x:/"), r2 = {};
    for (let e3 in t2) r2[e3] = t2[e3];
    for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
  };
  function w(e2, t2) {
    throw Error(`Invariant: ${t2(e2)}`);
  }
  O.prototype = URL.prototype, l.U = O, l.z = function(e2) {
    throw Error("dynamic usage of require is not supported");
  }, l.g = globalThis;
  let k = Symbol("turbopack queues"), j = Symbol("turbopack exports"), v = Symbol("turbopack error");
  function C() {
    let e2, t2;
    return { promise: new Promise((r2, n2) => {
      t2 = n2, e2 = r2;
    }), resolve: e2, reject: t2 };
  }
  function R(e2) {
    e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
  }
  l.a = function(e2, t2) {
    let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: i2, reject: l2, promise: u2 } = C(), s2 = Object.assign(u2, { [j]: r2.exports, [k]: (e3) => {
      n2 && e3(n2), o2.forEach(e3), s2.catch(() => {
      });
    } }), c2 = { get: () => s2, set(e3) {
      e3 !== s2 && (s2[j] = e3);
    } };
    Object.defineProperty(r2, "exports", c2), Object.defineProperty(r2, "namespaceObject", c2), e2(function(e3) {
      let t3 = e3.map((e4) => {
        if (null !== e4 && "object" == typeof e4) {
          if (k in e4) return e4;
          if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
            let t4 = Object.assign([], { status: 0 }), r4 = { [j]: {}, [k]: (e5) => e5(t4) };
            return e4.then((e5) => {
              r4[j] = e5, R(t4);
            }, (e5) => {
              r4[v] = e5, R(t4);
            }), r4;
          }
        }
        return { [j]: e4, [k]: () => {
        } };
      }), r3 = () => t3.map((e4) => {
        if (e4[v]) throw e4[v];
        return e4[j];
      }), { promise: i3, resolve: l3 } = C(), u3 = Object.assign(() => l3(r3), { queueCount: 0 });
      function s3(e4) {
        e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (u3.queueCount++, e4.push(u3)));
      }
      return t3.map((e4) => e4[k](s3)), u3.queueCount ? i3 : r3();
    }, function(e3) {
      e3 ? l2(s2[v] = e3) : i2(s2[j]), R(n2);
    }), n2 && -1 === n2.status && (n2.status = 0);
  };
  let U = i.prototype, P = "string" == typeof TURBOPACK_CHUNK_BASE_PATH ? TURBOPACK_CHUNK_BASE_PATH : "/_next/", _ = /* @__PURE__ */ new Map();
  l.M = _;
  let $ = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map();
  async function E(e2, t2, r2) {
    let n2;
    if ("string" == typeof r2) return (function(e3, t3, r3) {
      return M(e3, t3, r3);
    })(e2, t2, q(r2));
    let o2 = r2.included || [], i2 = o2.map((e3) => !!_.has(e3) || $.get(e3));
    if (i2.length > 0 && i2.every((e3) => e3)) return void await Promise.all(i2);
    for (let i3 of (n2 = M(e2, t2, q(r2.path)), o2)) $.has(i3) || $.set(i3, n2);
    await n2;
  }
  U.l = function(e2) {
    return E(n.Parent, this.m.id, e2);
  };
  let S = Promise.resolve(void 0), x = /* @__PURE__ */ new WeakMap();
  function M(t2, r2, o2) {
    let i2 = e.loadChunkCached(t2, o2), l2 = x.get(i2);
    if (void 0 === l2) {
      let e2 = x.set.bind(x, i2, S);
      l2 = i2.then(e2).catch((e3) => {
        let i3;
        switch (t2) {
          case n.Runtime:
            i3 = `as a runtime dependency of chunk ${r2}`;
            break;
          case n.Parent:
            i3 = `from module ${r2}`;
            break;
          case n.Update:
            i3 = "from an HMR update";
            break;
          default:
            w(t2, (e4) => `Unknown source type: ${e4}`);
        }
        let l3 = Error(`Failed to load chunk ${o2} ${i3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
        throw l3.name = "ChunkLoadError", l3;
      }), x.set(i2, l2);
    }
    return l2;
  }
  U.L = function(e2) {
    var t2, r2;
    return t2 = n.Parent, r2 = this.m.id, M(t2, r2, e2);
  };
  U.R = function(e2) {
    let t2 = this.r(e2);
    return t2?.default ?? t2;
  }, U.P = function(e2) {
    return `/ROOT/${e2 ?? ""}`;
  }, U.F = function(e2) {
    return e2 ? `file:///ROOT/${e2.split("/").map(encodeURIComponent).join("/")}` : "file:///ROOT/";
  }, U.q = function(e2, t2) {
    h.call(this, `${e2}${r}`, t2);
  };
  let K = /[^A-Za-z0-9\-_.!~*'()/]/;
  function q(e2, t2 = P) {
    let n2 = K.test(e2) ? e2.split("/").map(encodeURIComponent).join("/") : e2;
    return `${t2}${n2}${r}`;
  }
  function N(e2, t2) {
    let r2, n2 = e2.indexOf("?");
    if (-1 !== n2) r2 = n2;
    else {
      let t3 = e2.indexOf("#");
      r2 = -1 !== t3 ? t3 : e2.length;
    }
    return r2 >= t2.length && e2.startsWith(t2, r2 - t2.length);
  }
  U.b = P, U.X = r, U.h = q;
  function B(e2) {
    return N(e2, ".css");
  }
  let L = {};
  l.c = L;
  let I = (e2, t2) => {
    let r2 = L[e2];
    if (r2) {
      if (r2.error) throw r2.error;
      return r2;
    }
    return H(e2, n.Parent, t2.id);
  };
  function H(e2, t2, r2) {
    let n2 = _.get(e2);
    if ("function" != typeof n2) throw Error((function(e3, t3, r3) {
      let n3;
      switch (t3) {
        case 0:
          n3 = `as a runtime entry of chunk ${r3}`;
          break;
        case 1:
          n3 = `because it was required from module ${r3}`;
          break;
        case 2:
          n3 = "because of an HMR update";
          break;
        default:
          w(t3, (e4) => `Unknown source type: ${e4}`);
      }
      return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
    })(e2, t2, r2));
    let o2 = f(e2), l2 = o2.exports;
    L[e2] = o2;
    let u2 = new i(o2, l2);
    try {
      n2(u2, o2, l2);
    } catch (e3) {
      throw o2.error = e3, e3;
    }
    return o2.namespaceObject && o2.exports !== o2.namespaceObject && y(o2.exports, o2.namespaceObject), o2;
  }
  function F(t2) {
    let r2;
    if (!Array.isArray(t2)) return e.registerChunk(void 0, t2);
    let n2 = (function(e2) {
      if ("string" == typeof e2) return e2;
      if (e2) return { src: e2.getAttribute("src") };
      if ("u" > typeof TURBOPACK_NEXT_CHUNK_URLS) return { src: TURBOPACK_NEXT_CHUNK_URLS.pop() };
      throw Error("chunk path empty but not in a worker");
    })(t2[0]);
    return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !(function(e2, t3) {
      let r3 = 1;
      for (; r3 < e2.length; ) {
        let n3, o2 = r3 + 1;
        for (; o2 < e2.length && "function" != typeof e2[o2]; ) o2++;
        if (o2 === e2.length) throw Error("malformed chunk format, expected a factory function");
        let i2 = e2[o2];
        for (let i3 = r3; i3 < o2; i3++) {
          let r4 = e2[i3], o3 = t3.get(r4);
          if (o3) {
            n3 = o3;
            break;
          }
        }
        let l2 = n3 ?? i2, u2 = false;
        for (let n4 = r3; n4 < o2; n4++) {
          let r4 = e2[n4];
          t3.has(r4) || (u2 || (l2 === i2 && Object.defineProperty(i2, "name", { value: "module evaluation" }), u2 = true), t3.set(r4, l2));
        }
        r3 = o2 + 1;
      }
    })(t2, _)), e.registerChunk(n2, r2);
  }
  let D = /* @__PURE__ */ new Map();
  function W(e2) {
    let t2 = D.get(e2);
    if (!t2) {
      let r2, n2;
      t2 = { resolved: false, loadingStarted: false, retryAttempts: 0, promise: new Promise((e3, t3) => {
        r2 = e3, n2 = t3;
      }), resolve: () => {
        t2.resolved = true, r2();
      }, reject: n2 }, D.set(e2, t2);
    }
    return t2;
  }
  function X(e2, t2, r2, n2, o2) {
    !(null == n2 || n2 instanceof DOMException && "NetworkError" === n2.name) || r2.retryAttempts >= 1 || D.get(t2) !== r2 ? (D.get(t2) === r2 && D.delete(t2), r2.reject(n2)) : (r2.retryAttempts++, setTimeout(() => {
      r2.resolved || D.get(t2) !== r2 || (o2 ? o2() : (r2.loadingStarted = false, z(e2, t2)));
    }, 200 + Math.floor(401 * Math.random())));
  }
  function z(e2, t2) {
    let r2 = W(t2);
    if (r2.loadingStarted) return r2.promise;
    if (e2 === n.Runtime) return r2.loadingStarted = true, B(t2) && r2.resolve(), r2.promise;
    if ("function" == typeof importScripts) if (B(t2)) ;
    else if (N(t2, ".js")) {
      self.TURBOPACK_NEXT_CHUNK_URLS.push(t2);
      try {
        importScripts(t2);
      } catch (n2) {
        X(e2, t2, r2, n2);
      }
    } else throw Error(`can't infer type of chunk from URL ${t2} in worker`);
    else {
      let n2 = decodeURI(t2);
      if (B(t2)) if (document.querySelectorAll(`link[rel=stylesheet][href="${t2}"],link[rel=stylesheet][href^="${t2}?"],link[rel=stylesheet][href="${n2}"],link[rel=stylesheet][href^="${n2}?"]`).length > 0) r2.resolve();
      else {
        let n3 = () => {
          let o2 = document.createElement("link");
          return o2.rel = "stylesheet", o2.crossOrigin = null, o2.href = t2, o2.onerror = () => {
            let i2 = document.createComment("");
            o2.replaceWith(i2), X(e2, t2, r2, void 0, () => i2.replaceWith(n3()));
          }, o2.onload = () => {
            r2.resolve();
          }, o2;
        };
        document.head.appendChild(n3());
      }
      else if (N(t2, ".js")) {
        let o2 = document.querySelectorAll(`script[src="${t2}"],script[src^="${t2}?"],script[src="${n2}"],script[src^="${n2}?"]`);
        if (o2.length > 0) for (let n3 of Array.from(o2)) n3.addEventListener("error", () => {
          n3.remove(), X(e2, t2, r2);
        }, { once: true });
        else {
          let n3 = document.createElement("script");
          n3.crossOrigin = null, n3.src = t2, n3.onerror = () => {
            n3.remove(), X(e2, t2, r2);
          }, document.head.appendChild(n3);
        }
      } else throw Error(`can't infer type of chunk from URL ${t2}`);
    }
    return r2.loadingStarted = true, r2.promise;
  }
  e = { async registerChunk(e2, t2) {
    let r2;
    if (null != e2 && (r2 = (function(e3) {
      if ("string" == typeof e3) return e3;
      let t3 = decodeURIComponent(e3.src.replace(/[?#].*$/, ""));
      return t3.startsWith(P) ? t3.slice(P.length) : t3;
    })(e2), W("string" == typeof e2 ? q(e2) : e2.src).resolve()), null != t2) {
      for (let e3 of t2.otherChunks) W(q("string" == typeof e3 ? e3 : e3.path));
      if (await Promise.all(t2.otherChunks.map((e3) => {
        var t3;
        return t3 = r2, E(n.Runtime, t3, e3);
      })), t2.runtimeModuleIds.length > 0) for (let e3 of t2.runtimeModuleIds) !(function(e4, t3) {
        let r3 = L[t3];
        if (r3) {
          if (r3.error) throw r3.error;
          return;
        }
        H(t3, n.Runtime, e4);
      })(r2, e3);
    }
  }, loadChunkCached: (e2, t2) => z(e2, t2) };
  var J = globalThis.TURBOPACK;
  globalThis.TURBOPACK = { push: F }, J.forEach(F);
})();
