# Portfolio V5 state

## Checkpoint

Gate 1 is unapproved. Round 4 passed the targeted Patchbay prototype review. Patchbay with normal scroll is the lead candidate, awaiting Abrar’s choice. The baseline is `abb86caf65f3b06c4a9c369759b2519c42cedde9`, tagged `v5-signal-field-before-rebuild`. Working branch: `codex/portfolio-v5-gate-1`.

## Inputs

| ID | Status |
| --- | --- |
| I1 | Run commands and manifest below. |
| I2 | Missing. No supplied Home, Work or About captures were attached. Independently captured browser evidence belongs under `evidence/baseline/`. |
| I3 | Missing. No paper-cutout reference image was attached. |
| I4 | Missing. The animation collection profile URL was unspecified. |
| I5 | Optional. No additional award examples were supplied. |

## Run versions

With Node 22+ and an installed dependency tree, run `npm run dev` for V5 development. For the production build of the current site and pinned archives, run `PORTFOLIO_PUBLISH_VERSIONS=1 npm run build:release`, then `npm run preview`. Serve the nested archive pages with the archive fallback described in `versions/README.md` when testing their direct loads and 404s.

| Version | Source | Entry |
| --- | --- | --- |
| V1 Serif Studio | `b6a6217e2aa1b52a6900ecddac41568cbd3fc8cc` | `/versions/serif/` |
| V2 Terminal Pulse | `2c3376d68aacfdbf0a266ed370afa02083570d30` | `/versions/cyberterminal/` |
| V3 Halide Signal | `8bffe4b75356cbc34c836bebeffdb057a3e4a062` | `/versions/halide/` |
| V4 Build Room | `32300307da910a03a97e289a81a142d172e033fc` | `/versions/zero-to-built/` |
| Current V5 Signal Field | `abb86caf65f3b06c4a9c369759b2519c42cedde9` | `/` |

## Completed

The original brief is preserved byte-for-byte. The root V5 rules are appended. The current palette, gradients, themes, content, routes and preserved behavior are documented. The five-version browser audit covers 804 desktop and emulated-mobile route visits, motion recordings for each version, and targeted controls. The [evidence index](evidence/baseline/README.md) describes the locally stored full corpus and curated checkpoint evidence.

The [Gate 1 directions](DIRECTIONS.md) include three whole-Home storyboards and four running variants at the [prototype chooser](http://127.0.0.1:5181/docs/v5/prototypes/). See the [scorecard](SCORECARD.md), [captures](evidence/directions/README.md), [effect ledger](LEDGER.md), [route inventory](routes.md) and [source research](SOURCES.md). The initial recommendation was C with normal scroll. The pre-revision blind comparisons favoured V4 on distinctiveness and motion continuity. The current-site dark quote, animated desktop Work filter, and Home history findings are in [CRITIQUE.md](CRITIQUE.md).

## Patchbay revision

Round 4 scored 33/40 with all prototype dimensions at 4 or above. Matched blind motion was 4.5 vs 3.8 on desktop and 4.3 vs 2.8 on mobile, and recruiter clarity was 4.7 vs 3.4, Patchbay vs V4. V4 still led on first-frame distinctiveness. The paper-cutout reference and GitHub animation URL are still missing. See the [revision and scorecard](PATCHBAY.md), [recordings](evidence/patchbay/README.md) and [regression diagnoses](REGRESSIONS.md).

## Next

Gate 1 requires Abrar’s direction and scroll choice, plus any requested changes. After approval, re-read the brief and this state, author `DESIGN.md` and its section contract, then complete the Phase 2 slice. The current V5 presentation, application routes, archive pins, and deployment configuration are untouched. No deployment took place.
