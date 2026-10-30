(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 70764, (e) => {
  e.v({ ask: "dev-module__G5ThLG__ask", copy: "dev-module__G5ThLG__copy", group: "dev-module__G5ThLG__group", groups: "dev-module__G5ThLG__groups", headline: "dev-module__G5ThLG__headline", hero: "dev-module__G5ThLG__hero", heroText: "dev-module__G5ThLG__heroText", kicker: "dev-module__G5ThLG__kicker", line: "dev-module__G5ThLG__line", method: "dev-module__G5ThLG__method", page: "dev-module__G5ThLG__page", refBody: "dev-module__G5ThLG__refBody", refHead: "dev-module__G5ThLG__refHead", reference: "dev-module__G5ThLG__reference", sub: "dev-module__G5ThLG__sub", terminal: "dev-module__G5ThLG__terminal", what: "dev-module__G5ThLG__what" });
}, 50299, (e) => {
  "use strict";
  var _ = e.i(43476), d = e.i(71645), o = e.i(70764);
  e.s(["CopyLine", 0, function({ command: e2 }) {
    let [l, r] = (0, d.useState)(false);
    return (0, _.jsxs)("button", { type: "button", className: o.default.line, onClick: async () => {
      try {
        await navigator.clipboard.writeText(e2), r(true), setTimeout(() => r(false), 1500);
      } catch {
      }
    }, children: [(0, _.jsxs)("code", { children: [(0, _.jsx)("span", { "aria-hidden": "true", children: "$ " }), e2] }), (0, _.jsx)("span", { className: o.default.copy, children: l ? "Copied" : "Copy" })] });
  }]);
}]);
