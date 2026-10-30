(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 69430, (e) => {
  "use strict";
  let t, i, s, r, n, o, a, l, u = "u" > typeof window ? window : void 0, h = "u" > typeof globalThis ? globalThis : u, c = null == h ? void 0 : h.navigator, d = null == h ? void 0 : h.document, p = null == h ? void 0 : h.location, f = null == h ? void 0 : h.fetch, g = (null == h ? void 0 : h.XMLHttpRequest) && "withCredentials" in new h.XMLHttpRequest() ? h.XMLHttpRequest : void 0, v = null == h ? void 0 : h.AbortController, _ = null == h ? void 0 : h.CompressionStream, m = null == c ? void 0 : c.userAgent;
  function y() {
    return !(!u || false === u.navigator.onLine);
  }
  let b = "u" > typeof globalThis ? globalThis : u;
  b && "u" < typeof self && (b.self = b), b && "u" < typeof File && (b.File = function() {
  });
  let w = null != u ? u : {}, x = "0.9.1", k = { DEBUG: false, LIB_VERSION: x, LIB_NAME: "browser-common", JS_SDK_VERSION: x };
  var E, $, S, I, P = (($ = {}).AnonymousId = "anonymous_id", $.DistinctId = "distinct_id", $.Props = "props", $.EnablePersonProcessing = "enable_person_processing", $.PersonMode = "person_mode", $.FeatureFlagDetails = "feature_flag_details", $.FeatureFlags = "feature_flags", $.FeatureFlagPayloads = "feature_flag_payloads", $.BootstrapFeatureFlagDetails = "bootstrap_feature_flag_details", $.BootstrapFeatureFlags = "bootstrap_feature_flags", $.BootstrapFeatureFlagPayloads = "bootstrap_feature_flag_payloads", $.OverrideFeatureFlags = "override_feature_flags", $.Queue = "queue", $.AiQueue = "ai_queue", $.AiCaptureQueue = "ai_capture_queue", $.LogsQueue = "logs_queue", $.OptedOut = "opted_out", $.SessionId = "session_id", $.SessionStartTimestamp = "session_start_timestamp", $.SessionLastTimestamp = "session_timestamp", $.PersonProperties = "person_properties", $.GroupProperties = "group_properties", $.InstalledAppBuild = "installed_app_build", $.InstalledAppVersion = "installed_app_version", $.SessionReplay = "session_replay", $.PushRegistered = "push_registered", $.SessionReplayEventTriggerActivatedSession = "session_replay_event_trigger_activated_session", $.SurveyLastSeenDate = "survey_last_seen_date", $.SurveysInProgress = "surveys_in_progress", $.SurveysSeen = "surveys_seen", $.Surveys = "surveys", $.RemoteConfig = "remote_config", $.FlagsEndpointWasHit = "flags_endpoint_was_hit", $.DeviceId = "device_id", $), F = ((S = {}).GZipJS = "gzip-js", S.Base64 = "base64", S);
  let C = ["$snapshot", "$pageview", "$pageleave", "$set", "survey dismissed", "survey sent", "survey shown", "$identify", "$groupidentify", "$create_alias", "$$client_ingestion_warning", "$web_experiment_applied", "$feature_enrollment_update", "$feature_flag_called"], O = ["token"];
  function T(e10, t10) {
    return -1 !== e10.indexOf(t10);
  }
  let A = function(e10) {
    return e10.trim();
  }, M = function(e10) {
    return e10.replace(/^\$/, "");
  };
  function R(e10) {
    var t10;
    let i10 = [];
    return null != (t10 = JSON.stringify(e10, function(e11, t11) {
      if ("bigint" == typeof t11) return t11.toString();
      if ("function" != typeof t11 && "symbol" != typeof t11) {
        if (t11 instanceof Error) return { name: t11.name, message: t11.message, stack: t11.stack };
        if (t11 && "object" == typeof t11) {
          for (; i10.length > 0 && i10[i10.length - 1] !== this; ) i10.pop();
          if (i10.includes(t11)) return "[Circular]";
          i10.push(t11);
        }
        return t11;
      }
    })) ? t10 : "null";
  }
  let L = Object.prototype, D = L.hasOwnProperty, N = L.toString, j = Array.isArray || function(e10) {
    return "[object Array]" === N.call(e10);
  }, B = (e10) => "function" == typeof e10, q = (e10) => e10 === Object(e10) && !j(e10), H = (e10) => {
    if (q(e10)) {
      for (let t10 in e10) if (D.call(e10, t10)) return false;
      return true;
    }
    return false;
  }, z = (e10) => void 0 === e10, V = (e10) => "[object String]" == N.call(e10), W = (e10) => V(e10) && 0 === e10.trim().length, U = (e10) => null === e10, G = (e10) => z(e10) || U(e10), K = (e10) => "[object Number]" == N.call(e10) && e10 == e10, J = (e10) => K(e10) && e10 > 0, X = (e10) => "[object Boolean]" === N.call(e10), Y = (e10) => T(C, e10), Q = (e10) => T(O, e10);
  function Z(e10) {
    return null === e10 || "object" != typeof e10;
  }
  function ee(e10, t10) {
    return {}.toString.call(e10) === `[object ${t10}]`;
  }
  function et(e10) {
    switch ({}.toString.call(e10)) {
      case "[object Error]":
      case "[object Exception]":
      case "[object DOMException]":
      case "[object DOMError]":
      case "[object WebAssembly.Exception]":
        return true;
      default:
        return es(e10, Error);
    }
  }
  function ei(e10) {
    return "u" > typeof Event && es(e10, Event);
  }
  function es(e10, t10) {
    try {
      return e10 instanceof t10;
    } catch (e11) {
      return false;
    }
  }
  let er = [true, "true", 1, "1", "yes"], en = [false, "false", 0, "0", "no"];
  function eo(e10, t10, i10, s10, r10, n10, o10) {
    try {
      var a10 = e10[n10](o10), l2 = a10.value;
    } catch (e11) {
      return void i10(e11);
    }
    a10.done ? t10(l2) : Promise.resolve(l2).then(s10, r10);
  }
  function ea(e10) {
    return function() {
      var t10 = this, i10 = arguments;
      return new Promise(function(s10, r10) {
        var n10 = e10.apply(t10, i10);
        function o10(e11) {
          eo(n10, s10, r10, o10, a10, "next", e11);
        }
        function a10(e11) {
          eo(n10, s10, r10, o10, a10, "throw", e11);
        }
        o10(void 0);
      });
    };
  }
  let el = ["amazonbot", "amazonproductbot", "app.hypefactors.com", "applebot", "archive.org_bot", "awariobot", "backlinksextendedbot", "baiduspider", "bingbot", "bingpreview", "chrome-lighthouse", "dataforseobot", "deepscan", "duckduckbot", "facebookexternal", "facebookcatalog", "http://yandex.com/bots", "hubspot", "ia_archiver", "leikibot", "linkedinbot", "meta-externalagent", "mj12bot", "msnbot", "nessus", "petalbot", "pinterestbot", "prerender", "rogerbot", "screaming frog", "sebot-wa", "sitebulb", "slackbot", "slurp", "trendictionbot", "turnitin", "twitterbot", "vercel-screenshot", "vercelbot", "yahoo! slurp", "yandexbot", "zoombot", "bot.htm", "bot.php", "(bot;", "bot/", "crawler", "ahrefsbot", "ahrefssiteaudit", "semrushbot", "siteauditbot", "splitsignalbot", "gptbot", "oai-searchbot", "chatgpt-user", "perplexitybot", "better uptime bot", "sentryuptimebot", "uptimerobot", "headlesschrome", "cypress", "google-hoteladsverifier", "adsbot-google", "apis-google", "duplexweb-google", "feedfetcher-google", "google favicon", "google web preview", "google-read-aloud", "googlebot", "googleother", "google-cloudvertexbot", "googleweblight", "mediapartners-google", "storebot-google", "google-inspectiontool", "bytespider"], eu = function(e10, t10 = []) {
    if (!e10) return false;
    let i10 = e10.toLowerCase();
    return el.concat(t10).some((e11) => {
      let t11 = e11.toLowerCase();
      return -1 !== i10.indexOf(t11);
    });
  };
  function eh(e10, t10, i10, s10, r10) {
    return t10 > i10 && (s10.warn("min cannot be greater than max."), t10 = i10), K(e10) ? e10 > i10 ? (s10.warn(" cannot be  greater than max: " + i10 + ". Using max value instead."), i10) : t10 > e10 ? (s10.warn(" cannot be less than min: " + t10 + ". Using min value instead."), t10) : e10 : (s10.warn(" must be a number. using max or fallback. max: " + i10 + ", fallback: " + r10), eh(null != r10 ? r10 : i10, t10, i10, s10));
  }
  var ec = class {
    constructor(e10) {
      this.C = {}, this.I = e10.I, this.R = eh(e10.bucketSize, 0, 100, e10.A), this.$ = eh(e10.refillRate, 0, this.R, e10.A), this.O = eh(e10.refillInterval, 0, 864e5, e10.A);
    }
    F(e10, t10) {
      let i10 = Math.floor((t10 - e10.lastAccess) / this.O);
      i10 > 0 && (e10.tokens = Math.min(e10.tokens + i10 * this.$, this.R), e10.lastAccess = e10.lastAccess + i10 * this.O);
    }
    consumeRateLimit(e10) {
      var t10;
      let i10 = Date.now(), s10 = String(e10), r10 = this.C[s10];
      return r10 ? this.F(r10, i10) : (r10 = { tokens: this.R, lastAccess: i10 }, this.C[s10] = r10), 0 === r10.tokens || (r10.tokens--, 0 === r10.tokens && (null == (t10 = this.I) || t10.call(this, e10)), 0 === r10.tokens);
    }
    stop() {
      this.C = {};
    }
  };
  let ed = "Mobile", ep = "Android", ef = "Tablet", eg = "Android Tablet", ev = "iPad", e_ = "Apple Watch", em = "Safari", ey = "BlackBerry", eb = "Samsung Internet", ew = "Chrome", ex = "Chrome iOS", ek = "Internet Explorer", eE = "Internet Explorer Mobile", e$ = "Opera", eS = "Microsoft Edge", eI = "Firefox", eP = "Firefox iOS", eF = "Nintendo", eC = "PlayStation", eO = "Xbox", eT = "Android Mobile", eA = "Mobile Safari", eM = "Windows", eR = "Windows Phone", eL = "Nokia", eD = "Ouya", eN = "Generic " + ed.toLowerCase(), ej = "Generic " + ef.toLowerCase(), eB = "Konqueror", eq = "Oculus Browser", eH = "Vivaldi", ez = "Yandex", eV = "Whale", eW = "DuckDuckGo", eU = "Pale Moon", eG = "Waterfox", eK = "Brave", eJ = "Claude", eX = "Codex", eY = "ChatGPT", eQ = "Google Search App", eZ = RegExp("Version/(\\d+(\\.\\d+)?)"), e0 = RegExp("(Claude|Codex|ChatGPT)\\/(\\d+(\\.\\d+)?)"), e1 = RegExp(eO, "i"), e2 = RegExp("PlayStation \\w+", "i"), e3 = RegExp("Nintendo \\w+", "i"), e5 = RegExp("BlackBerry|PlayBook|BB10", "i"), e4 = { "NT3.51": "NT 3.11", "NT4.0": "NT 4.0", "5.0": "2000", 5.1: "XP", 5.2: "XP", "6.0": "Vista", 6.1: "7", 6.2: "8", 6.3: "8.1", 6.4: "10", "10.0": "10" }, e6 = function(e10, t10, i10, s10) {
    var r10;
    return t10 = t10 || "", ((null == i10 ? void 0 : i10.brave) ? eK : null) || ((null == s10 ? void 0 : s10.detectGoogleSearchApp) && T(e10, "GSA/") ? eQ : T(e10, " OPR/") && T(e10, "Mini") ? "Opera Mini" : T(e10, " OPR/") ? e$ : e5.test(e10) ? ey : T(e10, "IEMobile") || T(e10, "WPDesktop") ? eE : T(e10, "OculusBrowser") ? eq : T(e10, "SamsungBrowser") ? eb : T(e10, "Edge") || T(e10, "Edg/") ? eS : T(e10, "Vivaldi/") ? eH : T(e10, "YaBrowser/") ? ez : T(e10, "Whale/") ? eV : T(e10, "DuckDuckGo/") || T(e10, "Ddg/") ? eW : T(e10, "Claude/") ? eJ : T(e10, "Codex/") ? eX : T(e10, "ChatGPT/") ? eY : T(e10, "FBIOS") ? "Facebook Mobile" : T(e10, "UCWEB") || T(e10, "UCBrowser") ? "UC Browser" : T(e10, "CriOS") ? ex : T(e10, "CrMo") || T(e10, ew) ? ew : T(e10, ep) && T(e10, em) ? eT : T(e10, "FxiOS") ? eP : T(e10.toLowerCase(), eB.toLowerCase()) ? eB : T(e10, "Brave/") ? eK : (r10 = t10) && T(r10, "Apple") || T(e10, em) && !T(e10, ew) && !T(e10, ep) ? T(e10, ed) ? eA : em : T(e10, "PaleMoon/") ? eU : T(e10, "Waterfox/") ? eG : T(e10, eI) ? eI : T(e10, "MSIE") || T(e10, "Trident/") ? ek : T(e10, "Gecko") ? eI : "");
  }, e8 = { [eE]: [RegExp("rv:(\\d+(\\.\\d+)?)")], [eS]: [RegExp("Edge?\\/(\\d+(\\.\\d+)?)")], [ew]: [RegExp("(Chrome|CrMo)\\/(\\d+(\\.\\d+)?)")], [ex]: [RegExp("CriOS\\/(\\d+(\\.\\d+)?)")], "UC Browser": [RegExp("(UCBrowser|UCWEB)\\/(\\d+(\\.\\d+)?)")], [em]: [eZ], [eA]: [eZ], [e$]: [RegExp("(Opera|OPR)\\/(\\d+(\\.\\d+)?)")], [eI]: [RegExp("Firefox\\/(\\d+(\\.\\d+)?)")], [eP]: [RegExp("FxiOS\\/(\\d+(\\.\\d+)?)")], [eB]: [RegExp("Konqueror[:/]?(\\d+(\\.\\d+)?)", "i")], [ey]: [RegExp("BlackBerry (\\d+(\\.\\d+)?)"), eZ], [eT]: [RegExp("android\\s(\\d+(\\.\\d+)?)", "i")], [eb]: [RegExp("SamsungBrowser\\/(\\d+(\\.\\d+)?)")], [eq]: [RegExp("OculusBrowser\\/(\\d+(\\.\\d+)?)")], [eH]: [RegExp("Vivaldi\\/(\\d+(\\.\\d+)?)")], [ez]: [RegExp("YaBrowser\\/(\\d+(\\.\\d+)?)")], [eV]: [RegExp("Whale\\/(\\d+(\\.\\d+)?)")], [eK]: [RegExp("Brave\\/(\\d+(\\.\\d+)?)")], [eJ]: [e0], [eX]: [e0], [eY]: [e0], [eW]: [RegExp("(DuckDuckGo|Ddg)\\/(\\d+(\\.\\d+)?)")], [eU]: [RegExp("PaleMoon\\/(\\d+(\\.\\d+)?)")], [eG]: [RegExp("Waterfox\\/(\\d+(\\.\\d+)?)")], [eQ]: [RegExp("GSA\\/(\\d+(\\.\\d+)?)")], [ek]: [RegExp("(rv:|MSIE )(\\d+(\\.\\d+)?)")], Mozilla: [RegExp("rv:(\\d+(\\.\\d+)?)")] }, e9 = function(e10, t10, i10, s10) {
    let r10 = e8[e6(e10, t10, i10, s10)];
    if (z(r10)) return null;
    for (let t11 = 0; r10.length > t11; t11++) {
      let i11 = e10.match(r10[t11]);
      if (i11) return parseFloat(i11[i11.length - 2]);
    }
    return null;
  }, e7 = [[RegExp("Xbox; Xbox (.*?)[);]", "i"), (e10) => [eO, e10 && e10[1] || ""]], [RegExp(eF, "i"), [eF, ""]], [RegExp(eC, "i"), [eC, ""]], [e5, [ey, ""]], [RegExp(eM, "i"), (e10, t10) => {
    if (/Phone/.test(t10) || /WPDesktop/.test(t10)) return [eR, ""];
    if (new RegExp(ed).test(t10) && !/IEMobile\b/.test(t10)) return ["Windows Mobile", ""];
    let i10 = /Windows NT ([0-9.]+)/i.exec(t10);
    if (i10 && i10[1]) {
      let e11 = e4[i10[1]] || "";
      return /arm/i.test(t10) && (e11 = "RT"), [eM, e11];
    }
    return [eM, ""];
  }], [/((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/, (e10) => e10 && e10[3] ? ["iOS", [e10[3], e10[4], e10[5] || "0"].join(".")] : ["iOS", ""]], [/(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i, (e10) => {
    let t10 = "";
    return e10 && e10.length >= 3 && (t10 = z(e10[2]) ? e10[3] : e10[2]), ["watchOS", t10];
  }], [RegExp("(Android (\\d+)\\.(\\d+)\\.?(\\d+)?|Android)", "i"), (e10) => e10 && e10[2] ? [ep, [e10[2], e10[3], e10[4] || "0"].join(".")] : [ep, ""]], [/Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i, (e10) => {
    let t10 = ["Mac OS X", ""];
    return e10 && e10[1] && (t10[1] = [e10[1], e10[2], e10[3] || "0"].join(".")), t10;
  }], [/Mac/i, ["Mac OS X", ""]], [/CrOS/, ["Chrome OS", ""]], [/Linux|debian/i, ["Linux", ""]]], te = function(e10) {
    for (let t10 = 0; e7.length > t10; t10++) {
      let [i10, s10] = e7[t10], r10 = i10.exec(e10), n10 = r10 && (B(s10) ? s10(r10, e10) : s10);
      if (n10) return n10;
    }
    return ["", ""];
  }, tt = function(e10) {
    return e3.test(e10) ? eF : e2.test(e10) ? eC : e1.test(e10) ? eO : RegExp(eD, "i").test(e10) ? eD : RegExp("(Windows Phone|WPDesktop)", "i").test(e10) ? eR : /iPad/.test(e10) ? ev : /iPod/.test(e10) ? "iPod Touch" : /iPhone/.test(e10) ? "iPhone" : /(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(e10) ? e_ : e5.test(e10) ? ey : /(kobo)\s(ereader|touch)/i.test(e10) ? "Kobo" : RegExp(eL, "i").test(e10) ? eL : /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(e10) || /(kf[a-z]+)( bui|\)).+silk\//i.test(e10) ? "Kindle Fire" : /(Android|ZTE)/i.test(e10) ? new RegExp(ed).test(e10) && !/(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(e10) || /pixel[\daxl ]{1,6}/i.test(e10) && !/pixel c/i.test(e10) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(e10) || /lmy47v/i.test(e10) && !/QTAQZ3/i.test(e10) ? ep : eg : RegExp("(pda|Mobile)", "i").test(e10) ? eN : RegExp(ef, "i").test(e10) && !RegExp("Tablet pc", "i").test(e10) ? ej : "";
  }, ti = function(e10, t10) {
    var i10, s10, r10, n10;
    let o10 = tt(e10);
    return o10 === ev || o10 === eg || "Kobo" === o10 || "Kindle Fire" === o10 || o10 === ej ? ef : o10 === eF || o10 === eO || o10 === eC || o10 === eD ? "Console" : o10 === e_ ? "Wearable" : o10 ? ed : "Android" === (null == t10 ? void 0 : t10.userAgentDataPlatform) && (null != (n10 = null == t10 ? void 0 : t10.maxTouchPoints) ? n10 : 0) > 0 ? 600 > Math.min(null != (i10 = null == t10 ? void 0 : t10.screenWidth) ? i10 : 0, null != (s10 = null == t10 ? void 0 : t10.screenHeight) ? s10 : 0) / (null != (r10 = null == t10 ? void 0 : t10.devicePixelRatio) ? r10 : 1) ? ed : ef : "Desktop";
  }, ts = /\bFBAV\/(\d+(?:\.\d+)*)/i, tr = [[/\bInstagram(?:[ /](\d+(?:\.\d+)*))?\b/i, "Instagram"], [/\bBarcelona[ /](\d+(?:\.\d+)*)?/i, "Threads"], [/\b(?:MessengerForiOS|(?:FBAN|FB_IAB)\/Orca-Android)\b/i, "Messenger", ts], [/\bFBAN\/EMA\b/i, "Facebook Lite", ts], [/\b(?:FBIOS|(?:FBAN|FB_IAB)\/(?:FB4A|FBIOS))\b/i, "Facebook", ts], [/\bLinkedInApp(?:\]?\/(\d+(?:\.\d+)*))?\b/i, "LinkedIn"], [/\bTwitter(?:Android| for (?:iPhone|iPad|Android))(?:\/(\d+(?:\.\d+)*))?\b/i, "Twitter"], [/\b(?:musical_ly|trill)(?:[_/](\d+\.\d+(?:\.\d+)*))?(?=\b|_)/i, "TikTok", /\bapp_version\/(\d+(?:\.\d+)*)/i], [/\b(?:MicroMessenger|WeChat)\/(\d+(?:\.\d+)*)?/i, "WeChat"], [/\bLine\/(\d+(?:\.\d+)*)?/i, "Line"], [/\bGSA\/(\d+(?:\.\d+)*)?/i, "Google"], [/\[Pinterest\/(?:iOS|Android)\b|\bPinterest(?: for (?:Android(?: Tablet)?|iOS))?\/(\d+(?:\.\d+)*)/i, "Pinterest"], [/\b(?:WA4A|WAiOS)\/(\d+(?:\.\d+)*)?/i, "WhatsApp"], [/\bSnapchat[ /](\d+(?:\.\d+)*)?/i, "Snapchat"], [/\bBing(?:Web|Sapphire)\/(\d+(?:\.\d+)*)?/i, "Bing"], [/\bNAVER\(inapp; search;/i, "Naver", /\bNAVER\(inapp; search;[^;)]*; (\d+(?:\.\d+)*)/i], [/\bKAKAOTALK[ /](\d+\.\d+(?:\.\d+)*)?/i, "KakaoTalk"]], tn = "[Truncated]", to = "[Unserializable]";
  function ta(e10) {
    let t10 = "";
    for (let i10 = 0; e10.length > i10; i10++) {
      let s10 = e10.charCodeAt(i10);
      if (55296 > s10 || s10 > 56319) t10 += 56320 > s10 || s10 > 57343 ? e10[i10] : "\uFFFD";
      else {
        let s11 = e10.charCodeAt(i10 + 1);
        56320 > s11 || s11 > 57343 ? t10 += "\uFFFD" : (t10 += e10[i10] + e10[i10 + 1], i10++);
      }
    }
    return t10;
  }
  function tl(e10, t10) {
    if (!t10) return e10;
    let i10 = [];
    try {
      i10 = Object.keys(t10);
    } catch (e11) {
      i10 = [];
    }
    for (let s10 of i10) {
      let i11;
      try {
        i11 = t10[s10];
      } catch (e11) {
        i11 = to;
      }
      Object.defineProperty(e10, s10, { value: i11, enumerable: true, writable: true, configurable: true });
    }
    return e10;
  }
  var tu = class {
    record(e10) {
      if ("too-large" === e10.kind) return;
      if ("retry-later" !== e10.kind) return void this.reset();
      if (!e10.retryAfterMs) return;
      let t10 = this.isOpen(), i10 = Date.now(), s10 = Math.min(e10.retryAfterMs, 3e5);
      t10 ? this.es = Math.max(this.es, Math.min(i10 + s10, this.ts + 3e5)) : (this.ts = i10, this.es = i10 + s10);
    }
    remainingMs() {
      let e10 = Date.now();
      if (this.ts - 5e3 > e10) return this.reset(), 0;
      let t10 = Math.min(3e5, Math.max(0, this.es - e10));
      return 0 === t10 && this.reset(), t10;
    }
    isOpen() {
      return this.remainingMs() > 0;
    }
    reset() {
      this.es = 0, this.ts = 0;
    }
    constructor() {
      this.es = 0, this.ts = 0;
    }
  };
  let th = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  function tc(e10, t10) {
    return "string" == typeof e10 && th.test(e10) ? e10 : t10();
  }
  function td(e10, t10) {
    let i10 = Error(t10);
    try {
      Object.defineProperty(i10, "name", { value: e10, writable: true, enumerable: true, configurable: true });
    } catch (e11) {
    }
    return i10;
  }
  function tp(e10) {
    return e10 ? e10.split("#")[0] : e10;
  }
  function tf(e10) {
    try {
      return e10();
    } catch (e11) {
      return;
    }
  }
  function tg(e10, t10) {
    let i10 = setTimeout(e10, t10);
    return null != i10 && i10.unref && (null == i10 || i10.unref()), i10;
  }
  function tv(e10, t10, i10) {
    return t_.apply(this, arguments);
  }
  function t_() {
    return (t_ = ea(function* (e10, t10, i10) {
      let s10;
      try {
        return yield Promise.race([e10, new Promise((e11, r10) => {
          s10 = tg(() => {
            try {
              null == i10 || i10(), e11();
            } catch (e12) {
              r10(e12);
            }
          }, t10);
        })]);
      } finally {
        clearTimeout(s10);
      }
    })).apply(this, arguments);
  }
  function tm(e10) {
    return (tm = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e11) {
      return typeof e11;
    } : function(e11) {
      return e11 && "function" == typeof Symbol && e11.constructor === Symbol && e11 !== Symbol.prototype ? "symbol" : typeof e11;
    })(e10);
  }
  function ty(e10, t10) {
    var i10 = Object.keys(e10);
    if (Object.getOwnPropertySymbols) {
      var s10 = Object.getOwnPropertySymbols(e10);
      t10 && (s10 = s10.filter(function(t11) {
        return Object.getOwnPropertyDescriptor(e10, t11).enumerable;
      })), i10.push.apply(i10, s10);
    }
    return i10;
  }
  function tb(e10) {
    for (var t10 = 1; arguments.length > t10; t10++) {
      var i10 = null != arguments[t10] ? arguments[t10] : {};
      t10 % 2 ? ty(Object(i10), true).forEach(function(t11) {
        !(function(e11, t12, i11) {
          var s10;
          (s10 = (function(e12) {
            if ("object" != tm(e12) || !e12) return e12;
            var t13 = e12[Symbol.toPrimitive];
            if (void 0 !== t13) {
              var i12 = t13.call(e12, "string");
              if ("object" != tm(i12)) return i12;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return String(e12);
          })(t12), (t12 = "symbol" == tm(s10) ? s10 : s10 + "") in e11) ? Object.defineProperty(e11, t12, { value: i11, enumerable: true, configurable: true, writable: true }) : e11[t12] = i11;
        })(e10, t11, i10[t11]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e10, Object.getOwnPropertyDescriptors(i10)) : ty(Object(i10)).forEach(function(t11) {
        Object.defineProperty(e10, t11, Object.getOwnPropertyDescriptor(i10, t11));
      });
    }
    return e10;
  }
  var tw = class {
    constructor(e10, t10, i10 = []) {
      this.coercers = e10, this.stackParser = t10, this.modifiers = i10;
    }
    buildFromUnknown(e10, t10 = {}) {
      let i10 = t10 && t10.mechanism || { handled: true, type: "generic" }, s10 = this.buildCoercingContext(i10, t10, 0).apply(e10), r10 = this.buildParsingContext(t10), n10 = this.parseStacktrace(s10, r10);
      return { $exception_list: this.convertToExceptionList(n10, i10), $exception_level: "error" };
    }
    modifyFrames(e10) {
      var t10 = this;
      return ea(function* () {
        for (let i10 of e10) i10.stacktrace && i10.stacktrace.frames && j(i10.stacktrace.frames) && (i10.stacktrace.frames = yield t10.applyModifiers(i10.stacktrace.frames));
        return e10;
      })();
    }
    coerceFallback(e10) {
      var t10;
      return { type: "Error", value: "Unknown error", stack: null == (t10 = e10.syntheticException) ? void 0 : t10.stack, synthetic: true };
    }
    parseStacktrace(e10, t10) {
      var i10;
      let s10, r10;
      if (null != e10.cause && (s10 = this.parseStacktrace(e10.cause, t10)), "" != e10.stack && null != e10.stack) try {
        r10 = this.applyChunkIds(this.stackParser(e10.stack, e10.synthetic ? t10.skipFirstLines : 0), t10.chunkIdMap);
      } catch (e11) {
      }
      return tb(tb({}, e10), {}, { cause: s10, stack: r10, errors: null == (i10 = e10.errors) ? void 0 : i10.map((e11) => this.parseStacktrace(e11, t10)) });
    }
    applyChunkIds(e10, t10) {
      return e10.map((e11) => (e11.filename && t10 && (e11.chunk_id = t10[e11.filename]), e11));
    }
    applyCoercers(e10, t10) {
      for (let i10 of this.coercers) if (i10.match(e10)) return i10.coerce(e10, t10);
      return this.coerceFallback(t10);
    }
    applyModifiers(e10) {
      var t10 = this;
      return ea(function* () {
        let i10 = e10;
        for (let e11 of t10.modifiers) i10 = yield e11(i10);
        return i10;
      })();
    }
    convertToExceptionList(e10, t10) {
      let i10 = [], s10 = (e11, r10, n10) => {
        var o10;
        let a10 = i10.length, l2 = void 0 === r10 ? tb(tb({ type: "string" == typeof t10.type && t10.type.length > 0 ? t10.type : "generic" }, "boolean" == typeof t10.handled ? { handled: t10.handled } : void 0 === t10.handled ? { handled: true } : {}), {}, { synthetic: "boolean" == typeof t10.synthetic ? t10.synthetic : e11.synthetic, exception_id: a10 }) : { type: "chained", source: n10, synthetic: e11.synthetic, exception_id: a10, parent_id: r10 }, u2 = { type: e11.type, value: e11.value, mechanism: l2 };
        for (let t11 of (e11.stack && (u2.stacktrace = { type: "raw", frames: e11.stack }), i10.push(u2), e11.cause && s10(e11.cause, a10, "cause"), null != (o10 = e11.errors) ? o10 : [])) s10(t11, a10, "member");
      };
      return s10(e10), i10;
    }
    buildParsingContext(e10) {
      var r10;
      return { chunkIdMap: (function(e11) {
        let r11 = globalThis._posthogChunkIds;
        if (!r11) return;
        let n10 = Object.keys(r11);
        return s && n10.length === i || (i = n10.length, s = n10.reduce((i10, s10) => {
          t || (t = {});
          let n11 = t[s10];
          if (n11) i10[n11[0]] = n11[1];
          else {
            let n12 = e11(s10);
            for (let e12 = n12.length - 1; e12 >= 0; e12--) {
              let o10 = n12[e12], a10 = null == o10 ? void 0 : o10.filename, l2 = r11[s10];
              if (a10 && l2) {
                i10[a10] = l2, t[s10] = [a10, l2];
                break;
              }
            }
          }
          return i10;
        }, {})), s;
      })(this.stackParser), skipFirstLines: null != (r10 = e10.skipFirstLines) ? r10 : 1 };
    }
    getAggregateErrors(e10) {
      try {
        if (et(e10)) {
          let i10 = Object.getPrototypeOf(e10);
          for (let s10 = 0; i10 && 100 > s10; s10++) {
            var t10;
            let s11 = null == (t10 = Object.getOwnPropertyDescriptor(i10, "constructor")) ? void 0 : t10.value;
            if ("function" == typeof s11 && "AggregateError" === s11.name) {
              let t11 = e10.errors;
              return j(t11) ? t11 : void 0;
            }
            i10 = Object.getPrototypeOf(i10);
          }
        }
      } catch (e11) {
      }
    }
    buildCoercingContext(e10, t10, i10 = 0) {
      let s10 = 0, r10 = 0, n10 = false, o10 = /* @__PURE__ */ new Set(), a10 = [], l2 = {}, u2 = (e11, t11, i11 = 0) => {
        let u3, c3, d2 = h2(t11, i11), p2 = d2.apply;
        if (d2.apply = (t12) => {
          a10.push(e11);
          try {
            return p2(t12);
          } finally {
            a10.pop();
          }
        }, i11 > 4 || i11 > 0 && -1 !== a10.indexOf(e11)) return this.coerceFallback(d2);
        let f2 = "object" == typeof e11 && null !== e11 || "function" == typeof e11;
        if (0 === i11 && s10 >= 50 || f2 && o10.has(e11)) return;
        f2 && o10.add(e11), 0 === i11 && s10++;
        let g2 = this.getAggregateErrors(e11);
        n10 || (n10 = !!g2);
        try {
          if (!(u3 = this.applyCoercers(e11, d2))) throw l2;
        } catch (e12) {
          if (e12 === l2) return void (0 === i11 && s10--);
          if (!n10) throw e12;
          u3 = this.coerceFallback(d2);
        }
        if (!g2 || s10 >= 50) return u3;
        try {
          c3 = g2.length;
        } catch (e12) {
          return u3;
        }
        if (!Number.isInteger(c3) || 0 > c3 || c3 > 4294967295) return u3;
        let v2 = [];
        for (let e12 = 0; 50 > s10 && 1e3 > r10 && c3 > e12; e12++) {
          let i12;
          r10++;
          try {
            i12 = d2.next(g2[e12]);
          } catch (e13) {
            s10++, i12 = this.coerceFallback(h2(t11 + 1));
          }
          i12 && v2.push(i12);
        }
        return tb(tb({}, u3), {}, { errors: v2 });
      }, h2 = (i11, s11 = 0) => tb(tb({}, t10), {}, { syntheticException: 0 == i11 ? t10.syntheticException : void 0, mechanism: 0 == i11 ? e10 : {}, apply(e11) {
        let t11 = u2(e11, i11, s11 + 1);
        if (!t11) throw l2;
        return t11;
      }, next: (e11) => u2(e11, i11 + 1) }), c2 = h2(i10);
      return tb(tb({}, c2), {}, { apply: (e11) => {
        var t11;
        return null != (t11 = u2(e11, i10)) ? t11 : this.coerceFallback(c2);
      } });
    }
  };
  let tx = /^([a-z][a-z0-9.+-]+):/i, tk = ["http", "https", "file", "blob", "app", "capacitor", "ionic", "webpack", "webpack-internal", "ng"];
  function tE(e10, t10, i10, s10, r10) {
    let n10 = { platform: e10, filename: t10, function: "<anonymous>" === i10 ? "?" : i10, in_app: (function(e11) {
      if (!e11 || "<anonymous>" === e11) return false;
      let t11 = tx.exec(e11);
      return !t11 || tk.includes(t11[1].toLowerCase());
    })(t10) };
    return z(s10) || (n10.lineno = s10), z(r10) || (n10.colno = r10), n10;
  }
  let t$ = (e10, t10) => {
    let i10 = -1 !== e10.indexOf("safari-extension"), s10 = -1 !== e10.indexOf("safari-web-extension");
    return i10 || s10 ? [-1 !== e10.indexOf("@") ? e10.split("@")[0] : "?", i10 ? `safari-extension:${t10}` : `safari-web-extension:${t10}`] : [e10, t10];
  }, tS = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i, tI = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, tP = /\((\S*)(?::(\d+))(?::(\d+))\)/, tF = (e10, t10) => {
    let i10 = tS.exec(e10);
    if (i10) {
      let [, e11, s11, r10] = i10;
      return tE(t10, e11, "?", +s11, +r10);
    }
    let s10 = tI.exec(e10);
    if (s10) {
      if (s10[2] && 0 === s10[2].indexOf("eval")) {
        let e12 = tP.exec(s10[2]);
        e12 && (s10[2] = e12[1], s10[3] = e12[2], s10[4] = e12[3]);
      }
      let [e11, i11] = t$(s10[1] || "?", s10[2]);
      return tE(t10, i11, e11, s10[3] ? +s10[3] : void 0, s10[4] ? +s10[4] : void 0);
    }
  }, tC = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i, tO = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, tT = (e10, t10) => {
    let i10 = tC.exec(e10);
    if (i10) {
      if (i10[3] && i10[3].indexOf(" > eval") > -1) {
        let e12 = tO.exec(i10[3]);
        e12 && (i10[1] = i10[1] || "eval", i10[3] = e12[1], i10[4] = e12[2], i10[5] = "");
      }
      let e11 = i10[3], s10 = i10[1] || "?";
      return [s10, e11] = t$(s10, e11), tE(t10, e11, s10, i10[4] ? +i10[4] : void 0, i10[5] ? +i10[5] : void 0);
    }
  }, tA = /\(error: (.*)\)/;
  function tM(e10, t10) {
    return e10.filename === t10.filename && e10.function === t10.function && e10.module === t10.module && e10.lineno === t10.lineno && e10.colno === t10.colno;
  }
  function tR(e10, t10) {
    let i10 = t10.start;
    for (; i10 > 0 && tM(e10[i10 - 1], e10[i10 - 1 + t10.length]); ) i10--;
    return t10.start - i10;
  }
  function tL(e10, t10) {
    let i10 = t10.start + t10.length, s10 = i10;
    for (; e10.length > s10 && tM(e10[s10], e10[s10 - t10.length]); ) s10++;
    return s10 - i10;
  }
  var tD = class {
    match(e10) {
      return this.isDOMException(e10) || this.isDOMError(e10);
    }
    coerce(e10, t10) {
      let i10 = V(e10.stack);
      return { type: this.getType(e10), value: this.getValue(e10), stack: i10 ? e10.stack : void 0, cause: e10.cause ? t10.next(e10.cause) : void 0, synthetic: false };
    }
    getType(e10) {
      return this.isDOMError(e10) ? "DOMError" : "DOMException";
    }
    getValue(e10) {
      let t10 = e10.name || (this.isDOMError(e10) ? "DOMError" : "DOMException");
      return e10.message ? `${t10}: ${e10.message}` : t10;
    }
    isDOMException(e10) {
      return ee(e10, "DOMException");
    }
    isDOMError(e10) {
      return ee(e10, "DOMError");
    }
  }, tN = class {
    match(e10) {
      return et(e10);
    }
    coerce(e10, t10) {
      var i10;
      let s10 = this.getStack(e10), r10 = void 0 === s10 ? null == (i10 = t10.syntheticException) ? void 0 : i10.stack : void 0;
      return { type: this.getType(e10), value: this.getMessage(e10, t10), stack: null != s10 ? s10 : r10, cause: e10.cause ? t10.next(e10.cause) : void 0, synthetic: !!r10 };
    }
    getType(e10) {
      return e10.name || e10.constructor.name;
    }
    getMessage(e10, t10) {
      let i10 = e10.message;
      return String(i10.error && "string" == typeof i10.error.message ? i10.error.message : i10);
    }
    getStack(e10) {
      try {
        let t10 = e10.stacktrace;
        if ("string" == typeof t10 && t10.length > 0) return t10;
        let i10 = e10.stack;
        return "string" == typeof i10 && i10.length > 0 ? i10 : void 0;
      } catch (e11) {
        return;
      }
    }
  }, tj = class {
    match(e10) {
      return !!ee(e10, "ErrorEvent") && (null != e10.error || this.ar(e10));
    }
    coerce(e10, t10) {
      var i10;
      if (null != e10.error) return t10.apply(e10.error);
      let s10 = t10.apply(e10.message);
      return tb(tb({}, s10), {}, { stack: null != (i10 = this.lr(e10)) ? i10 : s10.stack, synthetic: true });
    }
    ar(e10) {
      return V(e10.message) && e10.message.length > 0;
    }
    lr(e10) {
      var t10, i10;
      let s10 = null != (t10 = e10.lineno) ? t10 : 0, r10 = null != (i10 = e10.colno) ? i10 : 0;
      if (V(e10.filename) && 0 !== e10.filename.length && 0 !== s10) return `Error
    at ${e10.filename}:${s10}:${r10}`;
    }
  };
  let tB = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
  var tq = class {
    match(e10) {
      return "string" == typeof e10;
    }
    coerce(e10, t10) {
      var i10;
      let [s10, r10] = this.getInfos(e10);
      return { type: null != s10 ? s10 : "Error", value: null != r10 ? r10 : e10, stack: null == (i10 = t10.syntheticException) ? void 0 : i10.stack, synthetic: true };
    }
    getInfos(e10) {
      let t10 = "Error", i10 = e10, s10 = e10.match(tB);
      return s10 && (t10 = s10[1], i10 = s10[2]), [t10, i10];
    }
  };
  let tH = ["fatal", "error", "warning", "log", "info", "debug"];
  function tz(e10, t10 = 40) {
    let i10 = Object.keys(e10);
    if (i10.sort(), !i10.length) return "[object has no keys]";
    for (let e11 = i10.length; e11 > 0; e11--) {
      let s10 = i10.slice(0, e11).join(", ");
      if (t10 >= s10.length) return e11 === i10.length ? s10 : s10.length > t10 ? `${s10.slice(0, t10)}...` : s10;
    }
    return "";
  }
  var tV = class {
    match(e10) {
      return "object" == typeof e10 && null !== e10;
    }
    coerce(e10, t10) {
      var i10, s10;
      let r10 = this.getErrorPropertyFromObject(e10);
      return r10 ? t10.apply(r10) : { type: this.getType(e10), value: this.getValue(e10), stack: null != (i10 = this.getStack(e10)) ? i10 : null == (s10 = t10.syntheticException) ? void 0 : s10.stack, level: this.isSeverityLevel(e10.level) ? e10.level : "error", synthetic: true };
    }
    getType(e10) {
      if (ei(e10)) return e10.constructor.name;
      let t10 = "name" in e10 ? e10.name : void 0;
      return V(t10) && !W(t10) ? t10 : "Error";
    }
    getValue(e10) {
      if ("name" in e10 && "string" == typeof e10.name) {
        let t11 = `'${e10.name}' captured as exception`;
        return "message" in e10 && "string" == typeof e10.message && (t11 += ` with message: '${e10.message}'`), t11;
      }
      if ("message" in e10 && "string" == typeof e10.message) return e10.message;
      let t10 = this.getObjectClassName(e10);
      return `${t10 && "Object" !== t10 ? `'${t10}'` : "Object"} captured as exception with keys: ${tz(e10)}`;
    }
    isSeverityLevel(e10) {
      return V(e10) && !W(e10) && tH.indexOf(e10) >= 0;
    }
    getStack(e10) {
      try {
        return V(e10.stacktrace) && e10.stacktrace.length > 0 ? e10.stacktrace : V(e10.stack) && e10.stack.length > 0 ? e10.stack : void 0;
      } catch (e11) {
        return;
      }
    }
    getErrorPropertyFromObject(e10) {
      for (let t10 in e10) if ({}.hasOwnProperty.call(e10, t10)) {
        let i10 = e10[t10];
        if (et(i10)) return i10;
      }
    }
    getObjectClassName(e10) {
      try {
        let t10 = Object.getPrototypeOf(e10);
        return t10 ? t10.constructor.name : void 0;
      } catch (e11) {
        return;
      }
    }
  }, tW = class {
    match(e10) {
      return ei(e10);
    }
    coerce(e10, t10) {
      var i10;
      let s10 = e10.constructor.name;
      return { type: s10, value: `${s10} captured as exception with keys: ${tz(e10)}`, stack: null == (i10 = t10.syntheticException) ? void 0 : i10.stack, synthetic: true };
    }
  }, tU = class {
    match(e10) {
      return Z(e10);
    }
    coerce(e10, t10) {
      var i10;
      return { type: "Error", value: `Primitive value captured as exception: ${String(e10)}`, stack: null == (i10 = t10.syntheticException) ? void 0 : i10.stack, synthetic: true };
    }
  }, tG = class {
    match(e10) {
      return ee(e10, "PromiseRejectionEvent") || this.isCustomEventWrappingRejection(e10);
    }
    isCustomEventWrappingRejection(e10) {
      if (!ei(e10)) return false;
      try {
        let t10 = e10.detail;
        return null != t10 && "object" == typeof t10 && "reason" in t10;
      } catch (e11) {
        return false;
      }
    }
    coerce(e10, t10) {
      var i10;
      let s10 = this.getUnhandledRejectionReason(e10);
      return Z(s10) ? { type: "UnhandledRejection", value: `Non-Error promise rejection captured with value: ${String(s10)}`, stack: null == (i10 = t10.syntheticException) ? void 0 : i10.stack, synthetic: true } : t10.apply(s10);
    }
    getUnhandledRejectionReason(e10) {
      try {
        if ("reason" in e10) return e10.reason;
        if ("detail" in e10 && null != e10.detail && "object" == typeof e10.detail && "reason" in e10.detail) return e10.detail.reason;
      } catch (e11) {
      }
      return e10;
    }
  };
  let tK = "$message", tJ = "$timestamp", tX = /* @__PURE__ */ new Set([tK, tJ]), tY = { enabled: true, max_bytes: 32768 };
  function tQ(e10) {
    var t10;
    return e10 ? { enabled: null != (t10 = e10.enabled) ? t10 : tY.enabled, max_bytes: (function(e11, t11) {
      if (!K(e11) || 1 / 0 === e11 || -1 / 0 === e11) return t11;
      let i10 = Math.floor(e11);
      return 0 > i10 ? t11 : i10;
    })(e10.max_bytes, tY.max_bytes) } : tb({}, tY);
  }
  var tZ = class {
    constructor(e10) {
      this.ns = [], this.ss = 0, this.Ir = tQ(e10);
    }
    setConfig(e10) {
      this.Ir = tQ(e10), this.rs();
    }
    add(e10) {
      let t10 = (function(e11) {
        let t11;
        try {
          t11 = R(e11);
        } catch (e12) {
          return;
        }
        try {
          let e12 = JSON.parse(t11);
          if (!q(e12)) return;
          let i11 = e12[tK], s10 = e12[tJ];
          if (!V(i11) || 0 === i11.trim().length || !V(s10) && !K(s10)) return;
          return { step: e12, json: t11 };
        } catch (e12) {
          return;
        }
      })(e10);
      if (!t10) return;
      let i10 = (function(e11) {
        if ("u" > typeof TextEncoder) return new TextEncoder().encode(e11).length;
        let t11 = encodeURIComponent(e11), i11 = 0;
        for (let e12 = 0; t11.length > e12; e12++) "%" === t11[e12] ? (i11 += 1, e12 += 2) : i11 += 1;
        return i11;
      })(t10.json);
      i10 > this.Ir.max_bytes || (this.ns.push({ step: t10.step, bytes: i10 }), this.ss += i10, this.rs());
    }
    getAttachable() {
      return this.ns.map((e10) => e10.step);
    }
    clear() {
      this.ns = [], this.ss = 0;
    }
    size() {
      return this.ns.length;
    }
    rs() {
      for (; this.ss > this.Ir.max_bytes && this.ns.length > 0; ) {
        let e10 = this.ns.shift();
        e10 && (this.ss -= e10.bytes);
      }
    }
  };
  let t0 = (e10) => {
    if ("string" != typeof e10) return e10;
    try {
      return JSON.parse(e10);
    } catch (t10) {
      return e10;
    }
  };
  function t1(e10) {
    return "string" == typeof e10 || e10;
  }
  function t2(e10) {
    return "string" == typeof e10 ? e10 : void 0;
  }
  let t3 = ["$feature_flag", "$feature_flag_response", "$feature_flag_has_experiment", "$feature_flag_id", "$feature_flag_version", "$feature_flag_reason", "$feature_flag_request_id", "$feature_flag_evaluated_at", "$feature_flag_error", "locally_evaluated", "$groups", "$process_person_profile", "$geoip_disable", "$current_url", "$pathname", "$referring_domain", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gad_source", "mc_cid", "gclid", "gclsrc", "dclid", "gbraid", "wbraid", "fbclid", "msclkid", "twclid", "li_fat_id", "igshid", "ttclid", "rdt_cid", "epik", "qclid", "sccid", "oppref", "irclid", "_kx", "$session_id", "$window_id", "$lib", "$lib_version", "$device_id", "$is_server"], t5 = "NativeGzipValidationError", t4 = (e10) => e10.length >= 2 && 31 === e10[0] && 139 === e10[1], t6 = (e10, t10) => e10 === F.GZipJS || t10 === F.GZipJS || "gzip" === t10, t8 = (e10) => !(!e10 || "object" != typeof e10) && "NotReadableError" === ("name" in e10 ? String(e10.name) : ""), t9 = (e10) => {
    throw td(t5, `Native gzip produced invalid output: ${e10}`);
  }, t7 = (I = ea(function* (e10, t10) {
    18 > e10.size && t9("too-short");
    let i10 = new Uint8Array(yield e10.slice(0, 10).arrayBuffer());
    t4(i10) && 8 === i10[2] || t9("invalid-header");
    let s10 = new DataView(yield e10.slice(e10.size - 8).arrayBuffer());
    s10.getUint32(0, true) !== ((e11) => {
      let t11 = (() => {
        if (r) return r;
        r = [];
        for (let e12 = 0; 256 > e12; e12++) {
          let t12 = e12;
          for (let e13 = 0; 8 > e13; e13++) t12 = 1 & t12 ? 3988292384 ^ t12 >>> 1 : t12 >>> 1;
          r[e12] = t12 >>> 0;
        }
        return r;
      })(), i11 = 4294967295;
      for (let s11 = 0; e11.length > s11; s11++) i11 = t11[255 & (i11 ^ e11[s11])] ^ i11 >>> 8;
      return (4294967295 ^ i11) >>> 0;
    })(t10) && t9("invalid-crc");
    let n10 = t10.length >>> 0;
    s10.getUint32(4, true) !== n10 && t9("invalid-size");
  }), function(e10, t10) {
    return I.apply(this, arguments);
  });
  function ie() {
    return (ie = ea(function* (e10, t10 = true, i10) {
      var s10;
      try {
        let t11 = new TextEncoder().encode(e10), i11 = new globalThis.CompressionStream("gzip"), r10 = i11.writable.getWriter(), n10 = r10.write(t11).then(() => r10.close()).catch((s10 = ea(function* (e11) {
          try {
            yield r10.abort(e11);
          } catch (e12) {
          }
          throw e11;
        }), function(e11) {
          return s10.apply(this, arguments);
        })), o10 = new Response(i11.readable).blob(), [a10] = yield Promise.all([o10, n10]);
        return yield t7(a10, t11), a10;
      } catch (e11) {
        if (null == i10 ? void 0 : i10.rethrow) throw e11;
        return t10 && console.error("Failed to gzip compress data", e11), null;
      }
    })).apply(this, arguments);
  }
  function it(e10, t10) {
    if (null == e10) return {};
    var i10, s10, r10 = (function(e11, t11) {
      if (null == e11) return {};
      var i11 = {};
      for (var s11 in e11) if ({}.hasOwnProperty.call(e11, s11)) {
        if (t11.includes(s11)) continue;
        i11[s11] = e11[s11];
      }
      return i11;
    })(e10, t10);
    if (Object.getOwnPropertySymbols) {
      var n10 = Object.getOwnPropertySymbols(e10);
      for (s10 = 0; n10.length > s10; s10++) t10.includes(i10 = n10[s10]) || {}.propertyIsEnumerable.call(e10, i10) && (r10[i10] = e10[i10]);
    }
    return r10;
  }
  let ii = {}.propertyIsEnumerable;
  function is(e10, t10) {
    try {
      return ir(e10, t10, { ancestors: /* @__PURE__ */ new WeakSet(), remainingNodes: 1e4 }, 0);
    } catch (e11) {
      return [];
    }
  }
  function ir(e10, t10, i10, s10) {
    let r10 = [];
    for (let n10 in e10) if (ii.call(e10, n10)) {
      if (!n10) {
        null == t10 || t10.debug("Dropping an attribute with an empty key");
        continue;
      }
      if (r10.length >= 1e3 || 0 >= i10.remainingNodes) {
        null == t10 || t10.debug("Attributes truncated: the value exceeds the OTLP encoder budget");
        break;
      }
      try {
        let o10 = e10[n10];
        if (U(o10) || z(o10)) continue;
        r10.push({ key: ta(n10), value: (function e11(t11, i11, s11, r11) {
          if (0 >= s11.remainingNodes) return { stringValue: tn };
          if (s11.remainingNodes--, X(t11)) return { boolValue: t11 };
          if ("bigint" == typeof t11) {
            let e12, s12;
            return e12 = t11.toString(), t11 >= (s12 = BigInt("9223372036854775808")) || -s12 > t11 ? (null == i11 || i11.debug(`Attribute ${e12} is outside the int64 range; encoding it as a string`), { stringValue: e12 }) : { intValue: e12 };
          }
          if ("number" == typeof t11) {
            if (!Number.isFinite(t11)) return { stringValue: String(t11) };
            if (Number.isInteger(t11)) {
              if (Number.isSafeInteger(t11)) return { intValue: String(t11) };
              if (typeof BigInt > "u") return { stringValue: String(t11) };
              let e12 = BigInt(t11).toString();
              return t11 >= 9223372036854776e3 || -9223372036854776e3 > t11 ? (null == i11 || i11.debug(`Attribute ${e12} is outside the int64 range; encoding it as a string`), { stringValue: e12 }) : { intValue: e12 };
            }
            return { doubleValue: t11 };
          }
          if ("string" == typeof t11) return { stringValue: ta(t11) };
          if ("function" == typeof t11) return { stringValue: "[Function]" };
          if ("symbol" == typeof t11) return { stringValue: String(t11) };
          if ("object" == typeof t11 && null !== t11) {
            if (s11.ancestors.has(t11)) return { stringValue: "[Circular]" };
            if (r11 >= 20) return { stringValue: tn };
            if (t11 instanceof Date) {
              let e12 = Number.isFinite(t11.getTime()) ? t11.toISOString() : String(t11);
              return { stringValue: "string" == typeof e12 ? ta(e12) : String(e12) };
            }
            s11.ancestors.add(t11);
            try {
              try {
                let n11 = t11.toJSON;
                if ("function" == typeof n11) return e11(n11.call(t11), i11, s11, r11 + 1);
              } catch (e12) {
              }
              return j(t11) ? { arrayValue: { values: (function(t12, i12, s12, r12) {
                let n11 = [], o11 = Math.min(t12.length, 1e3), a10 = 0;
                for (; o11 > a10 && s12.remainingNodes > 0; a10++) try {
                  let o12 = a10 in t12 ? t12[a10] : void 0;
                  if (G(o12)) continue;
                  n11.push(e11(o12, i12, s12, r12));
                } catch (e12) {
                  n11.push({ stringValue: to });
                }
                return t12.length > a10 && n11.push({ stringValue: tn }), n11;
              })(t11, i11, s11, r11 + 1) } } : { kvlistValue: { values: ir(t11, i11, s11, r11 + 1) } };
            } finally {
              s11.ancestors.delete(t11);
            }
          }
          return { stringValue: ta(String(t11)) };
        })(o10, t10, i10, s10) });
      } catch (e11) {
        r10.push({ key: ta(n10), value: { stringValue: to } });
      }
    }
    return r10;
  }
  function io(e10, t10, i10) {
    return tb(tb(tb(tb({}, tl({}, e10.resourceAttributes)), {}, { "service.name": e10.serviceName || "unknown_service" }, e10.environment && { "deployment.environment": e10.environment }), e10.serviceVersion && { "service.version": e10.serviceVersion }), {}, { "telemetry.sdk.name": t10, "telemetry.sdk.version": i10 });
  }
  let ia = ["service.name", "deployment.environment", "service.version", "telemetry.sdk.name", "telemetry.sdk.version"];
  function il(e10, t10) {
    let i10 = tl({}, e10), s10 = {};
    for (let e11 of ia) ({}).hasOwnProperty.call(i10, e11) && (s10[e11] = i10[e11], delete i10[e11]);
    return [...is(i10, t10), ...is(s10, t10)];
  }
  let iu = { darwin: "macOS", win32: "Windows", cygwin: "Windows", linux: "Linux", android: "Android", freebsd: "FreeBSD", openbsd: "OpenBSD", netbsd: "NetBSD", sunos: "SunOS", aix: "AIX", haiku: "Haiku", "Mac OS X": "macOS" }, ih = { trace: { text: "TRACE", number: 1 }, debug: { text: "DEBUG", number: 5 }, info: { text: "INFO", number: 9 }, warn: { text: "WARN", number: 13 }, error: { text: "ERROR", number: 17 }, fatal: { text: "FATAL", number: 21 } }, ic = ih.info;
  function id(e10, t10, i10, s10) {
    return { resourceLogs: [{ resource: { attributes: il(t10) }, scopeLogs: [{ scope: { name: i10, version: s10 }, logRecords: e10 }] }] };
  }
  var ip = class {
    constructor(e10) {
      this.ls = e10, this.us = 0;
    }
    get pending() {
      return !!this.hs;
    }
    arm(e10) {
      this.clear(), this.us = Date.now() + e10, this.hs = tg(() => {
        this.hs = void 0, this.ls();
      }, e10);
    }
    armNoEarlierThan(e10) {
      this.hs && Date.now() + e10 <= this.us || this.arm(e10);
    }
    clear() {
      this.hs && (clearTimeout(this.hs), this.hs = void 0);
    }
  };
  function ig() {
    return 0.75 + 0.5 * Math.random();
  }
  function iv(e10, t10, i10, s10) {
    let r10 = e10 * Math.pow(2, Math.min(Math.max(0, t10 - 1), 6));
    return Math.round((void 0 === s10 ? r10 : Math.min(r10, Math.max(s10, e10))) * i10);
  }
  var i_ = class {
    constructor(e10, t10, i10, s10, r10, n10 = () => Promise.resolve(), o10) {
      var a10;
      this._instance = e10, this.Ir = t10, this.A = i10, this.cs = s10, this.ds = r10, this.vs = n10, this.fs = o10, this.ps = new ip(() => this.gs()), this.ys = null, this.bs = 0, this._s = 0, this.ws = new tu(), this.ks = 0, this.Ss = 1, this.xs = 0, this.Cs = 0, this.$s = false, this.Ts = t10.maxBufferSize, this.Is = Math.max(null != (a10 = t10.maxQueueSize) ? a10 : t10.maxBufferSize, t10.maxBufferSize), this.Ms = t10.flushIntervalMs, this.Es = t10.maxBatchRecordsPerPost, this.Ps = t10.rateCapWindowMs, this.Rs = t10.maxLogsPerInterval;
    }
    clearQueue() {
      this._s++, this._instance.setPersistedProperty(P.LogsQueue, []);
    }
    reset() {
      this.ps.clear(), this.xs = 0, this.Cs = 0, this.$s = false, this.ks = 0, this.Ss = 1, this.ws.reset(), this.Es = this.Ir.maxBatchRecordsPerPost;
    }
    onReconnect() {
      this.ks = 0, this.Ss = 1, this.ws.isOpen() ? this.As() && this.Fs() : this.gs();
    }
    captureLog(e10, t10) {
      var i10;
      if (this._instance.isDisabled || this._instance.optedOut || !(null == e10 ? void 0 : e10.body)) return;
      let s10 = this.Os(e10);
      if (null === s10) return;
      if (!s10.body) return void this.A.info("Log was rejected in beforeSend function");
      if (!this.Ds()) return;
      let r10 = { record: (function(e11, t11, i11, s11) {
        let { text: r11, number: n10 } = ih[e11.level || "info"] || ic, o10 = (function(e12 = Date.now()) {
          return String(e12) + "000000";
        })(K(s11) ? s11 : void 0), a10 = {};
        t11.distinctId && (a10.posthogDistinctId = t11.distinctId), t11.sessionId && (a10.sessionId = t11.sessionId), t11.windowId && (a10["window.id"] = t11.windowId), G(t11.sessionStartTimestamp) || (a10.sessionStartTimestamp = String(t11.sessionStartTimestamp)), G(t11.lastActivityTimestamp) || (a10.lastActivityTimestamp = String(t11.lastActivityTimestamp)), t11.currentUrl && (a10["url.full"] = t11.currentUrl), t11.screenName && (a10["screen.name"] = t11.screenName), t11.appState && (a10["app.state"] = t11.appState), t11.activeFeatureFlags && t11.activeFeatureFlags.length > 0 && (a10.feature_flags = t11.activeFeatureFlags);
        let l2 = tb({}, a10), u2 = e11.attributes;
        if (u2) {
          let e12 = [];
          try {
            e12 = Object.keys(u2);
          } catch (t12) {
            e12 = [];
          }
          for (let t12 of e12) {
            let e13;
            try {
              e13 = u2[t12];
            } catch (t13) {
              e13 = to;
            }
            Object.defineProperty(l2, t12, { value: e13, enumerable: true, writable: true, configurable: true });
          }
        }
        let h2 = { timeUnixNano: o10, observedTimeUnixNano: o10, severityNumber: n10, severityText: r11, body: { stringValue: (function(e12) {
          try {
            return ta(String(e12));
          } catch (e13) {
            return to;
          }
        })(e11.body) }, attributes: is(l2, i11) };
        return e11.trace_id && (h2.traceId = e11.trace_id), e11.span_id && (h2.spanId = e11.span_id), z(e11.trace_flags) || (h2.flags = e11.trace_flags), h2;
      })(s10, null != (i10 = null == t10 ? void 0 : t10.context) ? i10 : this.cs(), this.A, null == t10 ? void 0 : t10.occurredAtMs) };
      this.ds(() => this.Ls(r10));
    }
    Os(e10) {
      let t10 = this.Ir.beforeSend;
      if (!t10) return e10;
      let i10 = j(t10) ? t10 : [t10], s10 = e10;
      for (let e11 of i10) try {
        let t11 = e11(s10);
        if (!t11) return this.A.info("Log was rejected in beforeSend function"), null;
        s10 = t11;
      } catch (e12) {
        return this.A.error("Error in beforeSend function for log:", e12), null;
      }
      return s10;
    }
    Ds() {
      if (void 0 === this.Rs) return true;
      let e10 = Date.now(), t10 = e10 - this.xs;
      return this.Ps > t10 && t10 >= 0 || (this.xs = e10, this.Cs = 0, this.$s = false), this.Rs > this.Cs ? (this.Cs++, true) : (this.$s || (this.A.warn(`captureLog dropping logs: exceeded ${this.Rs} logs per ${this.Ps}ms`), this.$s = true), false);
    }
    flush() {
      var e10 = this;
      return ea(function* () {
        if (!e10._instance.isDisabled) return e10.ys || (e10.ys = e10.Ns().finally(() => {
          e10.ys = null;
        })), e10.ys;
      })();
    }
    Ns() {
      var e10 = this;
      return ea(function* () {
        var t10, i10, s10;
        e10.ps.clear();
        let r10 = null != (t10 = e10._instance.getPersistedProperty(P.LogsQueue)) ? t10 : [];
        if (0 === r10.length) return;
        let n10 = r10.length, o10 = 0;
        for (; r10.length > 0 && n10 > o10; ) {
          let t11 = e10._s;
          e10.bs = 0;
          let n11 = Math.min(r10.length, e10.Es), a10 = r10.slice(0, n11), l2 = id(a10.map((e11) => e11.record), e10.qs(), null != (i10 = e10.fs) ? i10 : e10._instance.getLibraryId(), e10._instance.getLibraryVersion()), u2 = yield e10._instance.js(l2);
          if (e10._s !== t11) return;
          if ("too-large" === u2.kind && a10.length > 1) e10.Es = Math.max(1, Math.floor(a10.length / 2)), e10.A.warn(`Logs batch of size ${a10.length} was too large for the ingestion endpoint, reducing batch size to ${e10.Es}`);
          else if (e10.ws.record(u2), e10.ps.pending && e10.ps.arm(Math.max(e10.Ms, e10.ws.remainingMs())), "retry-later" === u2.kind || ("too-large" === u2.kind ? e10.A.warn("Dropping a single log record with batch size 1 \u2014 the record is larger than the server cap and cannot be split further.") : "ok" === u2.kind && e10.Ir.maxBatchRecordsPerPost > e10.Es && (e10.Es = Math.min(e10.Ir.maxBatchRecordsPerPost, e10.Es + 1)), yield e10.Bs(a10.length), r10 = null != (s10 = e10._instance.getPersistedProperty(P.LogsQueue)) ? s10 : [], o10 += a10.length, "fatal" === u2.kind)) throw u2.error;
        }
      })();
    }
    Bs(e10) {
      var t10 = this;
      return ea(function* () {
        var i10;
        let s10 = Math.max(0, e10 - t10.bs), r10 = null != (i10 = t10._instance.getPersistedProperty(P.LogsQueue)) ? i10 : [];
        t10._instance.setPersistedProperty(P.LogsQueue, r10.slice(s10)), yield t10.vs();
      })();
    }
    qs() {
      var e10;
      return e10 = this.Ir, io(e10, this._instance.getLibraryId(), this._instance.getLibraryVersion());
    }
    Ls(e10) {
      var t10;
      if (this._instance.optedOut) return;
      let i10 = null != (t10 = this._instance.getPersistedProperty(P.LogsQueue)) ? t10 : [];
      this.Is > i10.length || (i10.shift(), this.bs++, this.A.info("Logs queue is full, dropping oldest record.")), i10.push(e10), this._instance.setPersistedProperty(P.LogsQueue, i10), this.Ts > i10.length || this.ws.isOpen() ? this.Fs() : this.gs();
    }
    Fs() {
      this.ps.pending || this.ps.arm(Math.max(this.Ms, this.ws.remainingMs()));
    }
    Hs() {
      return Math.max(iv(this.Ms, this.ks, this.Ss, 3e4), this.ws.remainingMs());
    }
    As() {
      let e10 = this._instance.getPersistedProperty(P.LogsQueue);
      return !!e10 && e10.length > 0;
    }
    shutdown(e10) {
      var t10 = this;
      return ea(function* () {
        t10.ps.clear();
        let i10 = t10.flush().catch(() => {
        });
        void 0 !== e10 ? yield tv(i10, e10) : yield i10;
      })();
    }
    flushWithTimeout(e10) {
      var t10 = this;
      return ea(function* () {
        let i10 = t10.flush();
        yield tv(i10, e10, () => {
          i10.catch(() => {
          });
        });
      })();
    }
    gs() {
      this.flush().then(() => {
        this.ks = 0, this.Ss = 1;
      }, (e10) => {
        this.ks++, this.Ss = ig(), this.A.error("PostHog logs flush failed:", e10);
      }).finally(() => {
        !this._instance.isDisabled && this.As() && this.ps.armNoEarlierThan(this.Hs());
      });
    }
  };
  let im = [0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1e3, 2500, 5e3, 7500, 1e4];
  function iy(e10) {
    return String(e10) + "000000";
  }
  function ib(e10, t10, i10, s10) {
    let r10 = "";
    return s10 && (r10 = Object.keys(s10).sort().map((e11) => `${JSON.stringify(e11)}:${JSON.stringify(s10[e11])}`).join(",")), `${e10}\0${t10}\0${null != i10 ? i10 : ""}\0${r10}`;
  }
  var iw = class {
    constructor(e10, t10, i10) {
      this._instance = e10, this.Ir = t10, this.A = i10, this.zs = /* @__PURE__ */ new Map(), this.ps = new ip(() => this.flush().catch((e11) => {
        this.A.error("Metrics flush failed:", e11);
      })), this.ys = null, this.Us = false, this.Ws = /* @__PURE__ */ new Map(), this.Vs = /* @__PURE__ */ new Set(), this.ws = new tu(), this.ks = 0, this.Ss = 1, this.Gs = 0;
    }
    count(e10, t10 = 1, i10) {
      this.Zs({ name: e10, type: "count", value: t10, unit: null == i10 ? void 0 : i10.unit, attributes: null == i10 ? void 0 : i10.attributes });
    }
    gauge(e10, t10, i10) {
      this.Zs({ name: e10, type: "gauge", value: t10, unit: null == i10 ? void 0 : i10.unit, attributes: null == i10 ? void 0 : i10.attributes });
    }
    histogram(e10, t10, i10) {
      this.Zs({ name: e10, type: "histogram", value: t10, unit: null == i10 ? void 0 : i10.unit, attributes: null == i10 ? void 0 : i10.attributes });
    }
    flush() {
      var e10, t10 = this;
      let i10 = this.ys, s10 = (e10 = ea(function* () {
        i10 && (yield i10.catch(() => {
        })), yield t10.Qs();
      }), function() {
        return e10.apply(this, arguments);
      })().finally(() => {
        this.ys === s10 && (this.ys = null);
      });
      return this.ys = s10, s10;
    }
    drainWindow() {
      if (0 === this.zs.size) return null;
      let e10 = this.zs;
      return this.zs = /* @__PURE__ */ new Map(), this.Us = false, this.Ws = /* @__PURE__ */ new Map(), this.Vs = /* @__PURE__ */ new Set(), this.Js(e10);
    }
    reset() {
      this.Gs++, this.ws.reset(), this.ks = 0, this.Ss = 1, this.ps.clear(), this.zs = /* @__PURE__ */ new Map(), this.ys = null, this.Us = false, this.Ws = /* @__PURE__ */ new Map(), this.Vs = /* @__PURE__ */ new Set();
    }
    Zs(e10) {
      let t10, i10;
      if (this._instance.isDisabled || this._instance.optedOut) return;
      let s10 = this.Os(e10);
      if (null === s10) return;
      if (!s10.name || "string" != typeof s10.name) return void this.A.warn("Dropping metric with empty name");
      if ("number" != typeof s10.value || !Number.isFinite(s10.value)) return void this.A.warn(`Dropping metric '${s10.name}': value must be a finite number`);
      if ("count" === s10.type && 0 > s10.value) return void this.A.warn(`Dropping count '${s10.name}': counters are monotonic, value must be >= 0`);
      try {
        t10 = s10.attributes ? tb({}, s10.attributes) : void 0, i10 = ib(s10.type, s10.name, s10.unit, t10);
      } catch (e11) {
        return void this.A.warn(`Dropping metric '${s10.name}': attributes could not be serialized`, e11);
      }
      let r10 = this.zs.get(i10);
      if (!r10) {
        if (!this.Ks()) return;
        r10 = { name: s10.name, type: s10.type, unit: s10.unit, attributes: t10, windowStartMs: Date.now() }, this.zs.set(i10, r10);
      }
      let n10 = this.Ws.get(s10.name);
      void 0 === n10 ? this.Ws.set(s10.name, s10.type) : n10 === s10.type || this.Vs.has(s10.name) || (this.Vs.add(s10.name), this.A.warn(`Metric name '${s10.name}' is already used as a ${n10}; recording it as a ${s10.type} too will blend both series in charts. Use a distinct name.`)), this.Xs(r10, s10.value), this.Fs();
    }
    Ks() {
      return this.Ir.maxSeriesPerFlush > this.zs.size || (this.Us || (this.Us = true, this.A.warn(`Metric series cap reached (${this.Ir.maxSeriesPerFlush} per flush window); dropping new series until the next flush. Reduce attribute cardinality.`)), false);
    }
    Xs(e10, t10) {
      switch (e10.type) {
        case "count":
          var i10;
          e10.total = (null != (i10 = e10.total) ? i10 : 0) + t10;
          break;
        case "gauge":
          e10.last = t10;
          break;
        case "histogram": {
          e10.hist || (e10.hist = { count: 0, sum: 0, min: t10, max: t10, bucketCounts: Array(im.length + 1).fill(0) });
          let i11 = e10.hist;
          i11.count += 1, i11.sum += t10, i11.min = Math.min(i11.min, t10), i11.max = Math.max(i11.max, t10), i11.bucketCounts[(function(e11, t11) {
            for (let i12 = 0; t11.length > i12; i12++) if (t11[i12] >= e11) return i12;
            return t11.length;
          })(t10, im)] += 1;
        }
      }
    }
    Os(e10) {
      let t10 = this.Ir.beforeSend;
      if (!t10) return e10;
      let i10 = j(t10) ? t10 : [t10], s10 = e10;
      for (let e11 of i10) try {
        let t11 = e11(s10);
        if (!t11) return this.A.info("Metric was rejected in beforeSend function"), null;
        s10 = t11;
      } catch (e12) {
        return this.A.error("Error in beforeSend function for metric:", e12), null;
      }
      return s10;
    }
    Fs() {
      this.ps.pending || this.ps.arm(this.Hs());
    }
    Hs() {
      return Math.max(iv(this.Ir.flushIntervalMs, this.ks, this.Ss, 3e4), this.ws.remainingMs());
    }
    Qs() {
      var e10 = this;
      return ea(function* () {
        if (e10.ps.clear(), 0 === e10.zs.size) return;
        let t10 = e10.zs;
        e10.zs = /* @__PURE__ */ new Map(), e10.Us = false, e10.Ws = /* @__PURE__ */ new Map(), e10.Vs = /* @__PURE__ */ new Set();
        let i10 = e10.Gs, s10 = yield e10._instance.Ys(e10.Js(t10));
        if (i10 === e10.Gs) switch (e10.ws.record(s10), "retry-later" === s10.kind ? (e10.ks++, e10.Ss = ig()) : (e10.ks = 0, e10.Ss = 1), e10.ps.pending && e10.ps.arm(e10.Hs()), s10.kind) {
          case "ok":
            return;
          case "retry-later":
            return e10.ho(t10), void e10.ps.armNoEarlierThan(e10.Hs());
          case "too-large":
            return void e10.A.warn("Metrics batch exceeded the server size limit and was dropped");
          case "fatal":
            return void e10.A.error("Failed to send metrics batch:", s10.error);
        }
      })();
    }
    Js(e10) {
      var t10, i10, s10, r10;
      return t10 = this.co(e10), i10 = io(this.Ir, this._instance.getLibraryId(), this._instance.getLibraryVersion()), s10 = this._instance.getLibraryId(), r10 = this._instance.getLibraryVersion(), { resourceMetrics: [{ resource: { attributes: il(i10) }, scopeMetrics: [{ scope: { name: s10, version: r10 }, metrics: t10 }] }] };
    }
    co(e10) {
      let t10 = iy(Date.now()), i10 = /* @__PURE__ */ new Map();
      for (let o10 of e10.values()) {
        var s10, r10, n10;
        let e11 = ib(o10.type, o10.name, o10.unit, void 0), a10 = i10.get(e11);
        a10 || (a10 = tb({ name: o10.name }, o10.unit && { unit: o10.unit }), "count" === o10.type ? a10.sum = { aggregationTemporality: 1, isMonotonic: true, dataPoints: [] } : "gauge" === o10.type ? a10.gauge = { dataPoints: [] } : a10.histogram = { aggregationTemporality: 1, dataPoints: [] }, i10.set(e11, a10));
        let l2 = is(null != (s10 = o10.attributes) ? s10 : {}, this.A), u2 = iy(o10.windowStartMs);
        if ("count" === o10.type) {
          let e12 = { attributes: l2, startTimeUnixNano: u2, timeUnixNano: t10, asDouble: null != (r10 = o10.total) ? r10 : 0 };
          a10.sum.dataPoints.push(e12);
        } else if ("gauge" === o10.type) {
          let e12 = { attributes: l2, timeUnixNano: t10, asDouble: null != (n10 = o10.last) ? n10 : 0 };
          a10.gauge.dataPoints.push(e12);
        } else o10.hist && a10.histogram.dataPoints.push({ attributes: l2, startTimeUnixNano: u2, timeUnixNano: t10, count: o10.hist.count, sum: o10.hist.sum, min: o10.hist.min, max: o10.hist.max, bucketCounts: o10.hist.bucketCounts, explicitBounds: im });
      }
      return Array.from(i10.values());
    }
    ho(e10) {
      for (let [s10, r10] of e10) {
        let e11 = this.zs.get(s10);
        if (e11) switch (e11.windowStartMs = Math.min(e11.windowStartMs, r10.windowStartMs), e11.type) {
          case "count":
            var t10, i10;
            e11.total = (null != (t10 = e11.total) ? t10 : 0) + (null != (i10 = r10.total) ? i10 : 0);
            break;
          case "gauge":
            break;
          case "histogram":
            if (r10.hist) if (e11.hist) {
              e11.hist.count += r10.hist.count, e11.hist.sum += r10.hist.sum, e11.hist.min = Math.min(e11.hist.min, r10.hist.min), e11.hist.max = Math.max(e11.hist.max, r10.hist.max);
              for (let t11 = 0; e11.hist.bucketCounts.length > t11; t11++) e11.hist.bucketCounts[t11] += r10.hist.bucketCounts[t11];
            } else e11.hist = r10.hist;
        }
        else this.Ks() && this.zs.set(s10, r10);
      }
    }
  };
  let ix = (e10, { debugEnabled: t10 } = {}) => {
    let i10 = { N(i11, ...s10) {
      u && (k.DEBUG || u.POSTHOG_DEBUG || t10) && !z(u.console) && u.console && ("__rrweb_original__" in u.console[i11] ? u.console[i11].__rrweb_original__ : u.console[i11])(e10, ...s10);
    }, debug(...e11) {
      i10.N("debug", ...e11);
    }, info(...e11) {
      i10.N("log", ...e11);
    }, warn(...e11) {
      i10.N("warn", ...e11);
    }, error(...e11) {
      i10.N("error", ...e11);
    }, critical(...t11) {
      console.error(e10, ...t11);
    }, uninitializedWarning(e11) {
      i10.error(`You must initialize PostHog before calling ${e11}`);
    }, createLogger: (t11, i11) => ix(`${e10} ${t11}`, i11) };
    return i10;
  }, ik = ix("[PostHog.js]"), iE = ik.createLogger, i$ = iE("[ExternalScriptsLoader]"), iS = (e10) => {
    let t10 = null == d ? void 0 : d.querySelectorAll("script");
    if (t10) {
      for (let i10 = 0; t10.length > i10; i10++) if (t10[i10].src === e10 || t10[i10].getAttribute("src") === e10) return t10[i10];
    }
  }, iI = (e10, t10, i10) => {
    if (e10.config.disable_external_dependency_loading) return i$.warn(`${t10} was requested but loading of external scripts is disabled.`), i10("Loading of external scripts is disabled");
    let s10 = iS(t10);
    if (s10) {
      if (s10.__posthog_loading_callback_fired) return i10();
      let e11 = s10.__posthog_loading_error;
      return e11 ? i10(e11) : (s10.addEventListener("load", (e12) => {
        s10.__posthog_loading_callback_fired = true, i10(void 0, e12);
      }), void s10.addEventListener("error", (e12) => {
        s10.__posthog_loading_error = e12, i10(e12);
      }));
    }
    let r10 = () => {
      if (!d) return i10("document not found");
      if (iS(t10)) return iI(e10, t10, i10);
      let s11 = d.createElement("script");
      if (s11.type = "text/javascript", s11.crossOrigin = "anonymous", s11.src = t10, s11.onload = (e11) => {
        s11.__posthog_loading_callback_fired = true, i10(void 0, e11);
      }, s11.onerror = (e11) => {
        s11.__posthog_loading_error = e11, i10(e11);
      }, e10.config.prepare_external_dependency_script && (s11 = e10.config.prepare_external_dependency_script(s11)), !s11) return i10("prepare_external_dependency_script returned null");
      if ("head" === e10.config.external_scripts_inject_target) d.head.appendChild(s11);
      else {
        var r11;
        let e11 = d.querySelectorAll("body > script");
        e11.length > 0 ? null == (r11 = e11[0].parentNode) || r11.insertBefore(s11, e11[0]) : d.body.appendChild(s11);
      }
    };
    (null == d ? void 0 : d.body) ? r10() : null == d || d.addEventListener("DOMContentLoaded", r10);
  }, iP = {}, iF = (e10, t10) => {
    let i10 = `/static/${t10}.js?v=${e10.version}`;
    return "toolbar" === t10 && (i10 = `${i10}&t=${3e5 * Math.floor(Date.now() / 3e5)}`), e10.requestRouter.endpointFor("assets", i10);
  };
  w.__PosthogExtensions__ = w.__PosthogExtensions__ || {}, w.__PosthogExtensions__.loadExternalDependency = (e10, t10, i10) => {
    if ("remote-config" === t10) {
      let t11 = e10.requestRouter.endpointFor("assets", `/array/${e10.config.token}/config.js`);
      return void iI(e10, t11, i10);
    }
    let s10 = e10.config.strict_script_versioning;
    if (s10) {
      let r10 = e10.requestRouter.endpointFor("assets", `/static/${e10.version}/${t10}.js`), n10 = iP[r10];
      if ("fallback" === s10 && n10) {
        if (iS(n10)) return void iI(e10, n10, i10);
        delete iP[r10];
      }
      return void iI(e10, r10, "fallback" === s10 ? (s11, n11) => {
        if (s11) if ("string" == typeof s11) i10(s11);
        else {
          var o10;
          let s12 = iF(e10, t10);
          iP[r10] = s12;
          let n12 = iS(r10);
          null == n12 || null == (o10 = n12.parentNode) || o10.removeChild(n12), iI(e10, s12, i10);
        }
        else i10(void 0, n11);
      } : i10);
    }
    iI(e10, iF(e10, t10), i10);
  }, w.__PosthogExtensions__.loadSiteApp = (e10, t10, i10) => {
    let s10 = e10.requestRouter.endpointFor("api", t10);
    iI(e10, s10, i10);
  }, k.DEBUG = false, k.LIB_VERSION = "1.435.7", k.LIB_NAME = "web";
  let iC = "distinct_id", iO = "$device_id", iT = "$device_model", iA = "__alias", iM = "$fbc", iR = "$fbc_persistence", iL = "$fbp", iD = "$fbp_persistence", iN = "__timers", ij = "$autocapture_disabled_server_side", iB = "$heatmaps_enabled_server_side", iq = "$exception_capture_enabled_server_side", iH = "$error_tracking_suppression_rules", iz = "$error_tracking_capture_extension_exceptions", iV = "$web_vitals_enabled_server_side", iW = "$dead_clicks_enabled_server_side", iU = "$product_tours_enabled_server_side", iG = "$logs_capture_enabled_server_side", iK = "$web_vitals_allowed_metrics", iJ = "$session_recording_remote_config", iX = "$sesid", iY = "$session_is_sampled", iQ = "$enabled_feature_flags", iZ = "$active_feature_flags", i0 = "$early_access_features", i1 = "$feature_flag_details", i2 = "$feature_flag_payloads", i3 = "$feature_flag_request_id", i5 = "$minimal_flag_called_events", i4 = "$override_feature_flags", i6 = "$override_feature_flag_payloads", i8 = "$stored_person_properties", i9 = "$stored_group_properties", i7 = "$groups", se = "$surveys", st = "$surveys_loaded_at", si = "$surveys_activated", ss = "$surveys_activated_session", sr = "$surveys_activated_timestamps", sn = "ph_product_tours", so = "$flag_call_reported", sa = "$flag_call_reported_session_id", sl = "$feature_flag_errors", su = "$feature_flag_evaluated_at", sh = "$user_state", sc = "$client_session_props", sd = "$initial_campaign_params", sp = "$initial_referrer_info", sf = "$initial_person_info", sg = "$epp", sv = "$posthog_cookieless", s_ = "$cookieless_mode", sm = "$sdk_debug_extensions_init_method", sy = "$sdk_debug_extensions_init_time_ms", sb = "$sdk_debug_recording_script_not_loaded", sw = "$sdk_debug_replay_stale_config", sx = "$sdk_debug_replay_event_trigger_status", sk = "$sdk_debug_replay_linked_flag_trigger_status", sE = "$sdk_debug_replay_matched_recording_trigger_groups", s$ = "$sdk_debug_replay_pending_trigger_conditions", sS = "$sdk_debug_replay_remote_trigger_matching_config", sI = "$sdk_debug_replay_trigger_groups_count", sP = "$sdk_debug_replay_url_trigger_status", sF = "PostHog loadExternalDependency extension not found.", sC = "anonymous", sO = "identified", sT = "identified_only", sA = "visibilitychange", sM = "beforeunload", sR = "$pageview", sL = "$pageleave", sD = "$identify", sN = "$groupidentify";
  function sj(e10, t10) {
    j(e10) && e10.forEach(t10);
  }
  function sB(e10, t10) {
    if (!G(e10)) if (j(e10)) e10.forEach(t10);
    else if (e10 instanceof FormData) e10.forEach((e11, i10) => t10(e11, i10));
    else for (let i10 in e10) D.call(e10, i10) && t10(e10[i10], i10);
  }
  let sq = function(e10, ...t10) {
    for (let i10 of t10) for (let t11 in i10) void 0 !== i10[t11] && (e10[t11] = i10[t11]);
    return e10;
  };
  function sH(e10) {
    let t10 = Object.keys(e10), i10 = t10.length, s10 = Array(i10);
    for (; i10--; ) s10[i10] = [t10[i10], e10[t10[i10]]];
    return s10;
  }
  let sz = function(e10) {
    return function(...t10) {
      try {
        return e10.apply(this, t10);
      } catch (e11) {
        ik.critical("Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A."), ik.critical(e11);
      }
    };
  }, sV = function(e10) {
    let t10 = {};
    return sB(e10, function(e11, i10) {
      (V(e11) && e11.length > 0 || K(e11)) && (t10[i10] = e11);
    }), t10;
  };
  function sW(e10) {
    let t10 = tb({}, e10);
    for (let i10 of ["name", "message", "stack", "cause", "errors"]) try {
      i10 in e10 && (t10[i10] = e10[i10]);
    } catch (e11) {
    }
    return t10;
  }
  let sU = ["herokuapp.com", "vercel.app", "netlify.app"];
  function sG(e10, t10, i10, s10) {
    let { capture: r10 = false, passive: n10 = true } = null != s10 ? s10 : {};
    null == e10 || e10.addEventListener(t10, i10, { capture: r10, passive: n10 });
  }
  function sK(e10) {
    return "ph_toolbar_internal" === e10.name;
  }
  let sJ = (e10) => {
    if (d) {
      try {
        let t10 = e10 + "=", i10 = d.cookie.split(";").filter((e11) => e11.length);
        for (let e11 = 0; i10.length > e11; e11++) {
          let s10 = i10[e11];
          for (; " " == s10.charAt(0); ) s10 = s10.substring(1, s10.length);
          if (0 === s10.indexOf(t10)) return decodeURIComponent(s10.substring(t10.length, s10.length));
        }
      } catch (e11) {
      }
      return null;
    }
  };
  Math.trunc || (Math.trunc = function(e10) {
    return 0 > e10 ? Math.ceil(e10) : Math.floor(e10);
  }), Number.isInteger || (Number.isInteger = function(e10) {
    return K(e10) && isFinite(e10) && Math.floor(e10) === e10;
  });
  var sX = class e10 {
    constructor(e11) {
      if (this.bytes = e11, 16 !== e11.length) throw TypeError("not 128-bit length");
    }
    static fromFieldsV7(t10, i10, s10, r10) {
      if (!Number.isInteger(t10) || !Number.isInteger(i10) || !Number.isInteger(s10) || !Number.isInteger(r10) || 0 > t10 || 0 > i10 || 0 > s10 || 0 > r10 || t10 > 281474976710655 || i10 > 4095 || s10 > 1073741823 || r10 > 4294967295) throw RangeError("invalid field value");
      let n10 = new Uint8Array(16);
      return n10[0] = t10 / 1099511627776, n10[1] = t10 / 4294967296, n10[2] = t10 / 16777216, n10[3] = t10 / 65536, n10[4] = t10 / 256, n10[5] = t10, n10[6] = 112 | i10 >>> 8, n10[7] = i10, n10[8] = 128 | s10 >>> 24, n10[9] = s10 >>> 16, n10[10] = s10 >>> 8, n10[11] = s10, n10[12] = r10 >>> 24, n10[13] = r10 >>> 16, n10[14] = r10 >>> 8, n10[15] = r10, new e10(n10);
    }
    toString() {
      let e11 = "";
      for (let t10 = 0; this.bytes.length > t10; t10++) e11 = e11 + (this.bytes[t10] >>> 4).toString(16) + (15 & this.bytes[t10]).toString(16), 3 !== t10 && 5 !== t10 && 7 !== t10 && 9 !== t10 || (e11 += "-");
      if (36 !== e11.length) throw Error("Invalid UUIDv7 was generated");
      return e11;
    }
    clone() {
      return new e10(this.bytes.slice(0));
    }
    equals(e11) {
      return 0 === this.compareTo(e11);
    }
    compareTo(e11) {
      for (let t10 = 0; 16 > t10; t10++) {
        let i10 = this.bytes[t10] - e11.bytes[t10];
        if (0 !== i10) return Math.sign(i10);
      }
      return 0;
    }
  }, sY = class {
    generate() {
      let e10 = this.generateOrAbort();
      if (!z(e10)) return e10;
      {
        this.Ct = 0;
        let e11 = this.generateOrAbort();
        if (z(e11)) throw Error("Could not generate UUID after timestamp reset");
        return e11;
      }
    }
    generateOrAbort() {
      let e10, t10 = K(e10 = Date.now()) && isFinite(e10) ? Math.min(Math.max(Math.floor(e10), 0), 281474976710655) : 0;
      if (t10 > this.Ct) this.Ct = t10, this.Mt();
      else {
        if (this.Ct >= t10 + 1e4) return;
        this.It++, this.It > 4398046511103 && (this.Ct++, this.Mt());
      }
      return sX.fromFieldsV7(this.Ct, Math.trunc(this.It / 1073741824), 1073741823 & this.It, this.Tt.nextUint32());
    }
    Mt() {
      this.It = 1024 * this.Tt.nextUint32() + (1023 & this.Tt.nextUint32());
    }
    constructor() {
      this.Ct = 0, this.It = 0, this.Tt = new sZ();
    }
  };
  let sQ = (e10) => {
    if ("u" > typeof UUIDV7_DENY_WEAK_RNG && UUIDV7_DENY_WEAK_RNG) throw Error("no cryptographically strong RNG available");
    for (let t10 = 0; e10.length > t10; t10++) e10[t10] = 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random());
    return e10;
  };
  u && !z(u.crypto) && crypto.getRandomValues && (sQ = (e10) => crypto.getRandomValues(e10));
  var sZ = class {
    nextUint32() {
      return this.Rt.length > this.At || (sQ(this.Rt), this.At = 0), this.Rt[this.At++];
    }
    constructor() {
      this.Rt = new Uint32Array(8), this.At = 1 / 0;
    }
  };
  let s0 = () => s1().toString(), s1 = () => (n || (n = new sY())).generate(), s2 = "", s3 = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i, s5 = null, s4 = { Et() {
    if (!U(s5)) return s5;
    if (s5 = false, d) try {
      let e10 = `__ph_cookie_support_${s0()}`;
      s4.$t(e10, "xyz"), s5 = '"xyz"' === sJ(e10), s4.Lt(e10);
    } catch (e10) {
      s5 = false;
    }
    return s5;
  }, Pt(e10) {
    ik.error("cookieStore error: " + e10);
  }, Ot: sJ, Dt(e10) {
    let t10;
    try {
      t10 = JSON.parse(s4.Ot(e10)) || {};
    } catch (e11) {
    }
    return t10;
  }, $t(e10, t10, i10, s10, r10) {
    if (!d) return false;
    try {
      let n10 = "", o10 = "", a10 = (function(e11, t11) {
        if (t11) {
          let t12 = (function(e12, t13 = d) {
            if (s2) return s2;
            if (!t13 || ["localhost", "127.0.0.1"].includes(e12)) return "";
            let i11 = e12.split("."), s11 = Math.min(i11.length, 8), r11 = "dmn_chk_" + s0();
            for (; !s2 && s11--; ) {
              let e13 = i11.slice(s11).join("."), n11 = r11 + "=1;domain=." + e13 + ";path=/";
              t13.cookie = n11 + ";max-age=3", t13.cookie.includes(r11) && (t13.cookie = n11 + ";max-age=0", s2 = e13);
            }
            return s2;
          })(e11);
          if (!t12) {
            let i11, s11 = (i11 = e11.match(s3)) ? i11[0] : "";
            s11 !== t12 && ik.info("Warning: cookie subdomain discovery mismatch", s11, t12), t12 = s11;
          }
          return t12 ? "; domain=." + t12 : "";
        }
        return "";
      })(d.location.hostname, s10);
      if (i10) {
        let e11 = /* @__PURE__ */ new Date();
        e11.setTime(e11.getTime() + 864e5 * i10), n10 = "; expires=" + e11.toUTCString();
      }
      r10 && (o10 = "; secure");
      let l2 = e10 + "=" + encodeURIComponent(JSON.stringify(t10)) + n10 + "; SameSite=Lax; path=/" + a10 + o10;
      return l2.length > 3686.4 && ik.warn("cookieStore warning: large cookie, len=" + l2.length), d.cookie = l2, true;
    } catch (e11) {
      return false;
    }
  }, Lt(e10, t10) {
    if ((null == d ? void 0 : d.cookie) && (!t10 || !U(sJ(e10)))) try {
      s4.$t(e10, "", -1, t10);
    } catch (e11) {
      return;
    }
  } }, s6 = null, s8 = { Et() {
    if (!U(s6)) return s6;
    let e10 = true;
    if (z(u)) e10 = false;
    else try {
      let t10 = "__mplssupport__";
      s8.$t(t10, "xyz"), '"xyz"' !== s8.Ot(t10) && (e10 = false), s8.Lt(t10);
    } catch (t10) {
      e10 = false;
    }
    return e10 || ik.error("localStorage unsupported; falling back to cookie store"), s6 = e10, e10;
  }, Pt(e10) {
    ik.error("localStorage error: " + e10);
  }, Ot(e10) {
    try {
      return null == u ? void 0 : u.localStorage.getItem(e10);
    } catch (e11) {
      s8.Pt(e11);
    }
    return null;
  }, Dt(e10) {
    try {
      return JSON.parse(s8.Ot(e10)) || {};
    } catch (e11) {
    }
    return null;
  }, $t(e10, t10) {
    try {
      return null == u || u.localStorage.setItem(e10, JSON.stringify(t10)), true;
    } catch (e11) {
      s8.Pt(e11);
    }
    return false;
  }, Lt(e10) {
    try {
      null == u || u.localStorage.removeItem(e10);
    } catch (e11) {
      s8.Pt(e11);
    }
  } }, s9 = [i8, iZ, iQ, i1, i2, i3, su, sl, so], s7 = [iO, iC, iX, iY, sg, sf, iR, sh], re = ["__proto__", "constructor", "prototype"], rt = (e10) => {
    if (!q(e10)) return {};
    let t10 = {};
    return Object.keys(e10).forEach((i10) => {
      -1 === re.indexOf(i10) && (t10[i10] = e10[i10]);
    }), t10;
  }, ri = (e10, t10 = []) => {
    let i10 = {};
    return [...s7, ...t10].forEach((t11) => {
      let s10 = e10[t11];
      z(s10) || U(s10) || "" === s10 || (i10[t11] = s10);
    }), i10;
  }, rs = (e10) => {
    let t10 = 5381, i10 = 2166136261;
    for (let s10 = 0; e10.length > s10; s10++) {
      let r10 = e10.charCodeAt(s10);
      t10 = 33 * t10 ^ r10, i10 = Math.imul(i10 ^ r10, 16777619);
    }
    return e10.length.toString(36) + "." + (t10 >>> 0).toString(36) + "." + (i10 >>> 0).toString(36);
  }, rr = (e10, t10) => ({ p: t10, f: rs(JSON.stringify(e10)) }), rn = (e10, t10) => {
    if (!t10) return { properties: [], isValid: false };
    try {
      let i10 = s4.Dt(e10 + "_cpm"), s10 = (null == i10 ? void 0 : i10.f) === rs(t10) && j(i10.p);
      return { properties: s10 ? i10.p : [], isValid: s10 };
    } catch (e11) {
      return { properties: [], isValid: false };
    }
  }, ro = (e10, t10) => t10 + "|" + (s4.Ot(e10 + "_cpm") || ""), ra = {}, rl = { Et: () => true, Pt(e10) {
    ik.error("memoryStorage error: " + e10);
  }, Ot: (e10) => e10 in ra ? ra[e10] : null, Dt: (e10) => e10 in ra ? ra[e10] : null, $t: (e10, t10) => (ra[e10] = t10, true), Lt(e10) {
    delete ra[e10];
  } }, ru = null, rh = { Et() {
    if (!U(ru)) return ru;
    if (ru = true, z(u)) ru = false;
    else try {
      let e10 = "__support__";
      rh.$t(e10, "xyz"), '"xyz"' !== rh.Ot(e10) && (ru = false), rh.Lt(e10);
    } catch (e10) {
      ru = false;
    }
    return ru;
  }, Pt(e10) {
    ik.error("sessionStorage error: ", e10);
  }, Ot(e10) {
    try {
      return null == u ? void 0 : u.sessionStorage.getItem(e10);
    } catch (e11) {
      rh.Pt(e11);
    }
    return null;
  }, Dt(e10) {
    try {
      return JSON.parse(rh.Ot(e10)) || null;
    } catch (e11) {
    }
    return null;
  }, $t(e10, t10) {
    try {
      return null == u || u.sessionStorage.setItem(e10, JSON.stringify(t10)), true;
    } catch (e11) {
      rh.Pt(e11);
    }
    return false;
  }, Lt(e10) {
    try {
      null == u || u.sessionStorage.removeItem(e10);
    } catch (e11) {
      rh.Pt(e11);
    }
  } };
  var rc = class {
    constructor(e10) {
      this._instance = e10;
    }
    get Ir() {
      return this._instance.config;
    }
    get consent() {
      return this.Do() ? 0 : this.Lo;
    }
    isOptedOut() {
      return "always" === this.Ir.cookieless_mode || this.isRejected() || -1 === this.consent && "on_reject" === this.Ir.cookieless_mode;
    }
    isOptedIn() {
      return !this.isOptedOut();
    }
    isExplicitlyOptedOut() {
      return 0 === this.consent;
    }
    isRejected() {
      return 0 === this.consent || -1 === this.consent && this.Ir.opt_out_capturing_by_default;
    }
    optInOut(e10) {
      this.No.$t(this.qo, +!!e10, this.Ir.cookie_expiration, this.Ir.cross_subdomain_cookie, this.Ir.secure_cookie);
    }
    reset() {
      this.No.Lt(this.qo, this.Ir.cross_subdomain_cookie);
    }
    get qo() {
      let { token: e10, opt_out_capturing_cookie_prefix: t10, consent_persistence_name: i10 } = this._instance.config;
      return i10 || (t10 ? t10 + e10 : "__ph_opt_in_out_" + e10);
    }
    get Lo() {
      let e10 = this.No.Ot(this.qo);
      return T(er, e10) ? 1 : T(en, e10) ? 0 : -1;
    }
    get No() {
      let e10 = this.Ir.opt_out_capturing_persistence_type, t10 = "localStorage" === e10 ? s8 : s4, i10 = t10.Et() ? t10 : rl;
      if (!this.jo || this.jo !== i10) {
        this.jo = i10;
        let t11 = "localStorage" === e10 ? s4 : s8;
        t11.Ot(this.qo) && (this.jo.Ot(this.qo) || this.optInOut(T(er, t11.Ot(this.qo))), t11.Lt(this.qo, this.Ir.cross_subdomain_cookie));
      }
      return this.jo;
    }
    Do() {
      return !!this.Ir.respect_dnt && [null == c ? void 0 : c.doNotTrack, null == c ? void 0 : c.msDoNotTrack, w.doNotTrack, null == c ? void 0 : c.globalPrivacyControl].some((e10) => T(er, e10));
    }
  };
  function rd(e10, t10) {
    var i10;
    let s10 = null == e10 || null == (i10 = e10.config) ? void 0 : i10.get_current_url;
    if (!B(s10)) return t10;
    try {
      let e11 = s10(t10);
      return V(e11) && e11 ? e11 : t10;
    } catch (e11) {
      return ik.error("Error in get_current_url, falling back to window.location.href", e11), t10;
    }
  }
  function rp(e10) {
    var t10;
    return e10 instanceof Element && ("__POSTHOG_TOOLBAR__" === e10.id || !!(null == (t10 = e10.closest) ? void 0 : t10.call(e10, ".toolbar-global-fade-container")));
  }
  function rf(e10) {
    return !!e10 && 1 === e10.nodeType;
  }
  function rg(e10, t10) {
    return !!e10 && !!e10.tagName && e10.tagName.toLowerCase() === t10.toLowerCase();
  }
  function rv(e10) {
    return !!e10 && 3 === e10.nodeType;
  }
  function r_(e10) {
    return !!e10 && 11 === e10.nodeType && rf(e10.host);
  }
  function rm(e10) {
    return e10 ? A(e10).split(/\s+/) : [];
  }
  function ry(e10, t10) {
    var i10;
    let s10, r10 = z(s10 = null == u || null == (i10 = u.location) ? void 0 : i10.href) ? void 0 : rd(t10, s10);
    return !!(r10 && e10 && e10.some((e11) => r10.match(e11)));
  }
  function rb(e10) {
    let t10 = "";
    switch (typeof e10.className) {
      case "string":
        t10 = e10.className;
        break;
      case "object":
        t10 = (e10.className && "baseVal" in e10.className ? e10.className.baseVal : null) || e10.getAttribute("class") || "";
        break;
      default:
        t10 = "";
    }
    return rm(t10);
  }
  function rw(e10) {
    return G(e10) ? null : A(e10).split(/(\s+)/).filter((e11) => rW(e11)).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255);
  }
  function rx(e10) {
    let t10 = "";
    return rD(e10) && !rN(e10) && e10.childNodes && e10.childNodes.length && sB(e10.childNodes, function(e11) {
      var i10;
      rv(e11) && e11.textContent && (t10 += null != (i10 = rw(e11.textContent)) ? i10 : "");
    }), A(t10);
  }
  function rk(e10) {
    var t10;
    return z(e10.target) ? e10.srcElement || null : (null == (t10 = e10.target) ? void 0 : t10.shadowRoot) ? e10.composedPath()[0] || null : e10.target || null;
  }
  let rE = ["a", "button", "form", "input", "select", "textarea", "label"];
  function r$(e10, t10) {
    let i10 = e10.matches || e10.matchesSelector || e10.msMatchesSelector || e10.mozMatchesSelector || e10.webkitMatchesSelector || e10.oMatchesSelector;
    try {
      return !!i10 && i10.call(e10, t10);
    } catch (e11) {
      return false;
    }
  }
  function rS(e10, t10) {
    if (z(t10)) return true;
    for (let i10 of e10) if (t10.some((e11) => r$(i10, e11))) return true;
    return false;
  }
  function rI(e10) {
    let t10 = e10.parentNode;
    return !(!t10 || !rf(t10)) && t10;
  }
  let rP = [".ph-no-autocapture", "[data-ph-no-autocapture]"], rF = ["next", "previous", "prev", ">", "<"], rC = [...rF, "+", "-", "\u2212", "\u2013"], rO = (e10, t10) => /[a-z0-9]/i.test(t10) ? e10.includes(t10) : e10 === t10, rT = [".ph-no-rageclick", ".ph-no-capture"], rA = ["", "text", "search", "email", "password", "url", "tel", "number"];
  function rM(e10, t10) {
    var i10, s10, r10;
    let n10, o10, a10;
    if (!u || rR(e10) || (X(t10) ? (n10 = !!t10 && rT, o10 = void 0, a10 = false) : (n10 = null != (i10 = null == t10 ? void 0 : t10.css_selector_ignorelist) ? i10 : rT, o10 = null == t10 ? void 0 : t10.content_ignorelist, a10 = null != (s10 = null == t10 ? void 0 : t10.ignore_text_selection) && s10), false === n10) || a10 && !(!(r10 = e10) || !rf(r10)) && (rg(r10, "textarea") || (rg(r10, "input") ? T(rA, (r10.getAttribute("type") || "").toLowerCase()) : (function(e11) {
      var t11;
      if (e11.isContentEditable) return true;
      let i11 = null == (t11 = e11.getAttribute) ? void 0 : t11.call(e11, "contenteditable");
      return "true" === i11 || "" === i11;
    })(r10)))) return false;
    let { targetElementList: l2 } = rL(e10, false);
    return !(function(e11, t11) {
      let i11;
      if (false === e11 || z(e11)) return false;
      if (true === e11) i11 = rF;
      else {
        if (!j(e11)) return false;
        if (e11.length > 10) return ik.error("[PostHog] content_ignorelist array cannot exceed 10 items. Use css_selector_ignorelist for more complex matching."), false;
        i11 = e11.map((e12) => e12.toLowerCase());
      }
      return t11.some(({ safeText: e12, ariaLabel: t12 }) => i11.some((i12) => rO(e12, i12) || rO(t12, i12)));
    })(o10, l2.map((e11) => {
      var t11;
      return { safeText: rx(e11).toLowerCase(), ariaLabel: (null == (t11 = e11.getAttribute("aria-label")) ? void 0 : t11.toLowerCase().trim()) || "" };
    })) && !rS(l2, n10);
  }
  let rR = (e10) => !e10 || rg(e10, "html") || !rf(e10), rL = (e10, t10) => {
    if (!u || rR(e10)) return { parentIsUsefulElement: false, targetElementList: [] };
    let i10 = false, s10 = [e10], r10 = e10;
    for (; r10.parentNode && !rg(r10, "body"); ) {
      if (r_(r10.parentNode)) {
        s10.push(r10.parentNode.host), r10 = r10.parentNode.host;
        continue;
      }
      let e11 = rI(r10);
      if (!e11) break;
      if (t10 || rE.indexOf(e11.tagName.toLowerCase()) > -1) i10 = true;
      else try {
        let t11 = u.getComputedStyle(e11);
        t11 && "pointer" === t11.getPropertyValue("cursor") && (i10 = true);
      } catch (e12) {
      }
      s10.push(e11), r10 = e11;
    }
    return { parentIsUsefulElement: i10, targetElementList: s10 };
  };
  function rD(e10) {
    let t10 = /* @__PURE__ */ new Set(), i10 = 0;
    for (let s11 = e10; s11.parentNode && !rg(s11, "body"); s11 = s11.parentNode) {
      if (i10++ >= 1e3 || t10.has(s11)) return false;
      t10.add(s11);
      let e11 = rb(s11);
      if (T(e11, "ph-sensitive") || T(e11, "ph-no-capture")) return false;
    }
    if (T(rb(e10), "ph-include")) return true;
    let s10 = e10.type || "";
    if (V(s10)) switch (s10.toLowerCase()) {
      case "hidden":
      case "password":
        return false;
    }
    let r10 = e10.name || e10.id || "";
    return !V(r10) || !/^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(r10.replace(/[^a-zA-Z0-9]/g, ""));
  }
  function rN(e10) {
    return !!(rg(e10, "input") && !["button", "checkbox", "submit", "reset"].includes(e10.type) || rg(e10, "select") || rg(e10, "textarea") || "true" === e10.getAttribute("contenteditable"));
  }
  let rj = RegExp("^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$"), rB = /(^|[^0-9A-Za-z_])([0-9][0-9 -]*[0-9])(?=$|[^0-9A-Za-z_])/g, rq = [16, 15, 14, 13], rH = RegExp("^(\\d{3}-?\\d{2}-?\\d{4})$"), rz = RegExp("(^|[^0-9])((?!000|666)[0-9]{3}-?(?!00)[0-9]{2}-?(?!0000)[0-9]{4})(?=$|([^0-9]))", "g"), rV = /[0-9A-Za-z_]/;
  function rW(e10, t10 = true) {
    return !(G(e10) || V(e10) && (e10 = A(e10), (t10 ? rj.test((e10 || "").replace(/[- ]/g, "")) : (function(e11) {
      let t11;
      for (rB.lastIndex = 0; t11 = rB.exec(e11); ) {
        let e12 = t11[2];
        if (!e12) continue;
        let i10 = e12.replace(/[- ]/g, "");
        for (let e13 = 0; i10.length > e13; e13++) for (let t12 of rq) {
          let s10 = e13 + t12;
          if (i10.length >= s10) {
            let t13 = i10.slice(e13, s10);
            if (rj.test(t13) && (function(e14) {
              let t14 = 0, i11 = false;
              for (let s11 = e14.length - 1; s11 >= 0; s11--) {
                let r10 = e14.charCodeAt(s11) - 48;
                i11 && (r10 *= 2) > 9 && (r10 -= 9), t14 += r10, i11 = !i11;
              }
              return t14 % 10 == 0;
            })(t13)) return true;
          }
        }
      }
      return false;
    })(e10)) || (t10 ? rH.test(e10) : (function(e11) {
      let t11;
      for (rz.lastIndex = 0; t11 = rz.exec(e11); ) {
        let e12 = t11[1], i10 = t11[3];
        if (!(e12 && i10 && rV.test(e12) && rV.test(i10))) return true;
      }
      return false;
    })(e10)))) && true;
  }
  function rU(e10) {
    let t10 = rx(e10);
    return rW(t10 = `${t10} ${(function e11(t11) {
      let i10 = "";
      return t11 && t11.childNodes && t11.childNodes.length && sB(t11.childNodes, function(t12) {
        var s10;
        if (t12 && "span" === (null == (s10 = t12.tagName) ? void 0 : s10.toLowerCase())) try {
          let s11 = rx(t12);
          i10 = `${i10} ${s11}`.trim(), t12.childNodes && t12.childNodes.length && (i10 = `${i10} ${e11(t12)}`.trim());
        } catch (e12) {
          ik.error("[AutoCapture]", e12);
        }
      }), i10;
    })(e10)}`.trim()) ? t10 : "";
  }
  function rG(e10) {
    return e10.replace(/"|\\"/g, '\\"');
  }
  let rK = iE("[Dead Clicks]"), rJ = () => true, rX = (e10) => {
    var t10;
    let i10 = !!(null == (t10 = e10.instance.persistence) ? void 0 : t10.get_property(iW)), s10 = e10.instance.config.capture_dead_clicks;
    return X(s10) ? s10 : !!q(s10) || i10;
  };
  var rY = class {
    get lazyLoadedDeadClicksAutocapture() {
      return this.Bo;
    }
    constructor(e10, t10, i10) {
      this.instance = e10, this.isEnabled = t10, this.onCapture = i10, this.startIfEnabledOrStop();
    }
    onRemoteConfig(e10) {
      if (!e10.ok) return;
      let t10 = e10.config;
      "captureDeadClicks" in t10 && (this.instance.persistence && this.instance.persistence.register({ [iW]: t10.captureDeadClicks }), this.startIfEnabledOrStop());
    }
    startIfEnabledOrStop() {
      this.isEnabled(this) ? this.Ho(() => {
        this.zo();
      }) : this.stop();
    }
    Ho(e10) {
      var t10, i10, s10;
      (null == (t10 = w.__PosthogExtensions__) ? void 0 : t10.initDeadClicksAutocapture) ? e10() : null == (i10 = w.__PosthogExtensions__) || null == (s10 = i10.loadExternalDependency) || s10.call(i10, this.instance, "dead-clicks-autocapture", (t11) => {
        t11 ? rK.error("failed to load script", t11) : e10();
      });
    }
    zo() {
      var e10;
      if (d) {
        if (!this.Bo && (null == (e10 = w.__PosthogExtensions__) ? void 0 : e10.initDeadClicksAutocapture)) {
          let e11 = q(this.instance.config.capture_dead_clicks) ? tb({}, this.instance.config.capture_dead_clicks) : {};
          e11.__onCapture = this.onCapture, this.onCapture && (e11.capture_dead_swipes = false), this.Bo = w.__PosthogExtensions__.initDeadClicksAutocapture(this.instance, e11), this.Bo.start(d), rK.info("starting...");
        }
      } else rK.error("`document` not found. Cannot start.");
    }
    stop() {
      this.Bo && (this.Bo.stop(), this.Bo = void 0, rK.info("stopping..."));
    }
  };
  let rQ = iE("[SegmentIntegration]");
  function rZ(e10, t10, i10 = true) {
    let s10, r10, n10 = e10.config.segment;
    if (!n10) return t10();
    let { analytics: o10, filterProperties: a10 } = B(n10.register) ? { analytics: n10 } : n10;
    s10 = (s11) => {
      let r11 = () => s11.anonymousId() || s0();
      e10.config.get_device_id = r11, i10 && s11.id() && (e10.register({ distinct_id: s11.id(), $device_id: r11() }), e10.persistence.set_property(sh, sO)), ((i11) => {
        o10.register(((e11, t11, { filterProperties: i12 } = {}) => {
          "u" > typeof Promise && Promise.resolve || rQ.warn("This browser does not have Promise support, and can not use the segment integration");
          let s12 = (s13, r12) => {
            if (!r12) return s13;
            let n11 = !!t11 && s13.event.anonymousId === t11 && !s13.event.userId;
            n11 || s13.event.userId || s13.event.anonymousId === e11.get_distinct_id() || (rQ.info("No userId set, resetting PostHog"), e11.reset()), n11 || (t11 = void 0), s13.event.userId && s13.event.userId !== e11.get_distinct_id() && (rQ.info("UserId set, identifying with PostHog"), e11.identify(s13.event.userId));
            let o11 = e11.calculateEventProperties(r12, s13.event.properties);
            if (!G(i12)) {
              let e12 = s13.event.properties || {}, t12 = {};
              for (let i13 of Object.keys(o11)) D.call(e12, i13) || (t12[i13] = o11[i13]);
              let r13 = ((e13, t13) => {
                let i13 = j(e13) ? e13 : [e13], s14 = tb({}, t13);
                for (let e14 of i13) try {
                  if (s14 = e14(s14), G(s14)) return null;
                } catch (e15) {
                  return rQ.error("Error in Segment filterProperties:", e15), null;
                }
                return s14;
              })(i12, t12);
              if (G(r13)) return s13;
              o11 = r13;
            }
            return s13.event.properties = Object.assign({}, o11, s13.event.properties), s13;
          };
          return { name: "PostHog JS", type: "enrichment", version: "1.0.0", isLoaded: () => true, load: () => Promise.resolve(), track: (e12) => s12(e12, e12.event.event), page: (e12) => s12(e12, sR), identify: (e12) => s12(e12, sD), screen: (e12) => s12(e12, "$screen") };
        })(e10, i11, { filterProperties: a10 })).then(() => {
          t10();
        }, (e11) => {
          rQ.error("Failed to register the Segment integration", e11), t10();
        });
      })(i10 ? void 0 : s11.anonymousId() || void 0);
    }, "then" in (r10 = o10.user()) && B(r10.then) ? r10.then(s10) : s10(r10);
  }
  let r0 = "posthog-js";
  function r1(e10, { organization: t10, projectId: i10, prefix: s10, severityAllowList: r10 = ["error"], sendExceptionsToPostHog: n10 = true } = {}) {
    return (o10) => {
      var a10, l2, u2, h2, c2, d2;
      if ("*" !== r10 && !r10.includes(o10.level) || !e10.__loaded) return o10;
      o10.tags || (o10.tags = {});
      let p2 = e10.requestRouter.endpointFor("ui", `/project/${e10.config.token}/person/${e10.get_distinct_id()}`);
      o10.tags["PostHog Person URL"] = p2, e10.sessionRecordingStarted() && (o10.tags["PostHog Recording URL"] = e10.get_session_replay_url({ withTimestamp: true }));
      let f2 = (null == (a10 = o10.exception) ? void 0 : a10.values) || [], g2 = f2.map((e11) => tb(tb({}, e11), {}, { stacktrace: e11.stacktrace ? tb(tb({}, e11.stacktrace), {}, { type: "raw", frames: (e11.stacktrace.frames || []).map((e12) => tb(tb({}, e12), {}, { platform: "web:javascript" })) }) : void 0 })), v2 = { $exception_message: (null == (l2 = f2[0]) ? void 0 : l2.value) || o10.message, $exception_type: null == (u2 = f2[0]) ? void 0 : u2.type, $exception_level: o10.level, $exception_list: g2, $sentry_event_id: o10.event_id, $sentry_exception: o10.exception, $sentry_exception_message: (null == (h2 = f2[0]) ? void 0 : h2.value) || o10.message, $sentry_exception_type: null == (c2 = f2[0]) ? void 0 : c2.type, $sentry_tags: o10.tags };
      return t10 && i10 && (v2.$sentry_url = (s10 || "https://sentry.io/organizations/") + t10 + "/issues/?project=" + i10 + "&query=" + o10.event_id), n10 && (null == (d2 = e10.exceptions) || d2.sendExceptionEvent(v2)), o10;
    };
  }
  var r2 = class {
    constructor(e10, t10, i10, s10, r10, n10) {
      this.name = r0, this.setupOnce = function(o10) {
        o10(r1(e10, { organization: t10, projectId: i10, prefix: s10, severityAllowList: r10, sendExceptionsToPostHog: null == n10 || n10 }));
      };
    }
  }, r3 = class {
    constructor(e10) {
      this.Uo = (e11, t10, i10) => {
        i10 && (i10.noSessionId || i10.activityTimeout || i10.sessionPastMaximumLength || i10.crossTabAdoption) && (ik.info("[PageViewManager] Session rotated, clearing pageview state", { sessionId: e11, changeReason: i10 }), this.Wo = void 0, this._instance.scrollManager.resetContext());
      }, this._instance = e10, this.Vo();
    }
    Vo() {
      var e10;
      this.Go = null == (e10 = this._instance.sessionManager) ? void 0 : e10.onSessionId(this.Uo);
    }
    destroy() {
      var e10;
      null == (e10 = this.Go) || e10.call(this), this.Go = void 0;
    }
    doPageView(e10, t10) {
      var i10;
      let s10 = this.Zo(e10, t10);
      return this.Wo = { pathname: null != (i10 = null == u ? void 0 : u.location.pathname) ? i10 : "", pageViewId: t10, timestamp: e10 }, this._instance.scrollManager.resetContext(), s10;
    }
    doPageLeave(e10) {
      var t10;
      return this.Zo(e10, null == (t10 = this.Wo) ? void 0 : t10.pageViewId);
    }
    doEvent() {
      var e10;
      return { $pageview_id: null == (e10 = this.Wo) ? void 0 : e10.pageViewId };
    }
    Zo(e10, t10) {
      let i10 = this.Wo;
      if (!i10) return { $pageview_id: t10 };
      let s10 = { $pageview_id: t10, $prev_pageview_id: i10.pageViewId }, r10 = this._instance.scrollManager.getContext();
      if (r10 && !this._instance.config.disable_scroll_properties) {
        let { maxScrollHeight: e11, lastScrollY: t11, maxScrollY: i11, maxContentHeight: n10, lastContentY: o10, maxContentY: a10 } = r10;
        if (!(z(e11) || z(t11) || z(i11) || z(n10) || z(o10) || z(a10))) {
          e11 = Math.ceil(e11), t11 = Math.ceil(t11), i11 = Math.ceil(i11), n10 = Math.ceil(n10), o10 = Math.ceil(o10), a10 = Math.ceil(a10);
          let r11 = e11 > 1 ? eh(t11 / e11, 0, 1, ik) : 1, l2 = e11 > 1 ? eh(i11 / e11, 0, 1, ik) : 1, u2 = n10 > 1 ? eh(o10 / n10, 0, 1, ik) : 1, h2 = n10 > 1 ? eh(a10 / n10, 0, 1, ik) : 1;
          s10 = sq(s10, { $prev_pageview_last_scroll: t11, $prev_pageview_last_scroll_percentage: r11, $prev_pageview_max_scroll: i11, $prev_pageview_max_scroll_percentage: l2, $prev_pageview_last_content: o10, $prev_pageview_last_content_percentage: u2, $prev_pageview_max_content: a10, $prev_pageview_max_content_percentage: h2 });
        }
      }
      return i10.pathname && (s10.$prev_pageview_pathname = i10.pathname), i10.timestamp && (s10.$prev_pageview_duration = (e10.getTime() - i10.timestamp.getTime()) / 1e3), s10;
    }
  };
  let r5 = ["flags", "surveys"], r4 = { $people_distinct_id: { exposure: "hidden" }, [iA]: { exposure: "hidden" }, __cmpns: { exposure: "hidden" }, [iN]: { exposure: "hidden" }, [iR]: { exposure: "hidden" }, [iD]: { exposure: "hidden" }, [ij]: { exposure: "event" }, [iB]: { exposure: "hidden" }, [iG]: { exposure: "hidden" }, [iq]: { exposure: "event" }, [iH]: { exposure: "hidden" }, [iz]: { exposure: "event" }, [iV]: { exposure: "event" }, [iW]: { exposure: "event" }, [iU]: { exposure: "hidden" }, [iK]: { exposure: "event" }, [iJ]: { exposure: "hidden" }, $session_recording_enabled_server_side: { exposure: "hidden" }, [iX]: { exposure: "hidden" }, [iY]: { exposure: "event" }, $replay_sample_rate: { exposure: "event", shouldSkipFromEventProperties: (e10) => U(e10) }, $session_past_minimum_duration: { exposure: "event" }, $session_recording_url_trigger_activated_session: { exposure: "event" }, $session_recording_event_trigger_activated_session: { exposure: "event" }, $debug_first_full_snapshot_timestamp: { exposure: "event" }, $sess_rec_flush_size: { exposure: "hidden" }, [iQ]: { exposure: "hidden", storageGroup: "flags" }, [iZ]: { exposure: "hidden", storageGroup: "flags" }, [i0]: { exposure: "hidden" }, [i1]: { exposure: "hidden", storageGroup: "flags" }, [i2]: { exposure: "hidden", storageGroup: "flags" }, [i3]: { exposure: "hidden", storageGroup: "flags", volatile: true }, [i5]: { exposure: "hidden", storageGroup: "flags" }, [i4]: { exposure: "hidden" }, [i6]: { exposure: "hidden" }, [i8]: { exposure: "hidden" }, [i9]: { exposure: "hidden" }, [se]: { exposure: "hidden", storageGroup: "surveys" }, [st]: { exposure: "hidden", storageGroup: "surveys", volatile: true }, [si]: { exposure: "event" }, [ss]: { exposure: "hidden" }, [sr]: { exposure: "hidden" }, [sn]: { exposure: "hidden" }, $product_tours_activated: { exposure: "hidden" }, $product_tours_activated_session: { exposure: "hidden" }, $conversations_widget_session_id: { exposure: "event" }, $conversations_ticket_id: { exposure: "event" }, $conversations_widget_state: { exposure: "event" }, $conversations_user_traits: { exposure: "event" }, [so]: { exposure: "hidden" }, [sa]: { exposure: "hidden" }, [i7]: { exposure: "event" }, [sl]: { exposure: "hidden" }, [su]: { exposure: "hidden", storageGroup: "flags", volatile: true }, [sh]: { exposure: "hidden" }, [sc]: { exposure: "hidden" }, $capture_rate_limit: { exposure: "hidden" }, [sd]: { exposure: "hidden" }, [sp]: { exposure: "hidden" }, [sf]: { exposure: "hidden" }, [sg]: { exposure: "hidden" }, $replay_override_sampling: { exposure: "event" }, $replay_override_linked_flag: { exposure: "event" }, $replay_override_url_trigger: { exposure: "event" }, $replay_override_event_trigger: { exposure: "event" }, [sm]: { exposure: "event" }, [sy]: { exposure: "event" }, [sb]: { exposure: "hidden" }, [sw]: { exposure: "hidden" }, [sx]: { exposure: "hidden" }, [sk]: { exposure: "hidden" }, [sE]: { exposure: "hidden" }, [s$]: { exposure: "hidden" }, [sS]: { exposure: "hidden" }, [sI]: { exposure: "hidden" }, [sP]: { exposure: "hidden" }, $session_recording_start_reason: { exposure: "event" } }, r6 = [["$posthog_sr_group_event_trigger_", { exposure: "hidden" }], ["$posthog_sr_group_url_trigger_", { exposure: "hidden" }], ["$posthog_sr_group_sampling_", { exposure: "hidden" }]], r8 = (e10) => {
    let t10 = r4[e10];
    if (t10) return t10;
    for (let [t11, i10] of r6) if (0 === e10.indexOf(t11)) return i10;
  }, r9 = (e10, t10) => {
    try {
      let i10;
      return JSON.stringify(e10, (e11, t11) => et(t11) ? (null != i10 || (i10 = /* @__PURE__ */ new WeakMap()), i10.has(t11) || i10.set(t11, sW(t11)), i10.get(t11)) : "bigint" == typeof t11 ? t11.toString() : t11, t10);
    } catch (t11) {
      return R(e10);
    }
  }, r7 = (e10) => {
    let t10 = null == d ? void 0 : d.createElement("a");
    return z(t10) ? null : (t10.href = e10, t10);
  }, ne = function(e10, t10) {
    let i10, s10 = ((e10.split("#")[0] || "").split(/\?(.*)/)[1] || "").replace(/^\?+/g, "").split("&");
    for (let e11 = 0; s10.length > e11; e11++) {
      let r10 = s10[e11].split("=");
      if (r10[0] === t10) {
        i10 = r10;
        break;
      }
    }
    if (!j(i10) || 2 > i10.length) return "";
    {
      let e11 = i10[1];
      try {
        e11 = decodeURIComponent(e11);
      } catch (t11) {
        ik.error("Skipping decoding for malformed query param: " + e11);
      }
      return e11.replace(/\+/g, " ");
    }
  }, nt = function(e10, t10, i10) {
    if (!e10 || !t10 || !t10.length) return e10;
    let s10 = e10.split("#"), r10 = s10[1], n10 = (s10[0] || "").split("?"), o10 = n10[1], a10 = n10[0], l2 = (o10 || "").split("&"), u2 = [];
    for (let e11 = 0; l2.length > e11; e11++) {
      let s11 = l2[e11].split("=");
      j(s11) && (t10.includes(s11[0]) ? u2.push(s11[0] + "=" + i10) : u2.push(l2[e11]));
    }
    let h2 = a10;
    return null != o10 && (h2 += "?" + u2.join("&")), null != r10 && (h2 += "#" + r10), h2;
  }, ni = function(e10, t10) {
    let i10 = e10.match(RegExp(t10 + "=([^&]*)"));
    return i10 ? i10[1] : null;
  }, ns = (e10, t10) => e10 >= t10 && y(), nr = (e10, t10, i10, s10) => {
    if (0 === e10) {
      if (y()) {
        let e11 = t10 + 1;
        return e11 === i10 && s10(), e11;
      }
      return t10;
    }
    return 0;
  }, nn = ["gclid", "gclsrc", "dclid", "gbraid", "wbraid", "fbclid", "msclkid", "twclid", "li_fat_id", "igshid", "ttclid", "rdt_cid", "epik", "qclid", "sccid", "oppref", "irclid", "_kx"], no = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gad_source", "mc_cid", ...nn], na = "<masked>", nl = ["li_fat_id"];
  function nu(e10, t10, i10) {
    let s10;
    if (!d) return {};
    let r10 = t10 ? [...nn, ...i10 || []] : [], n10 = nh(nt(d.URL, r10, na), e10);
    return sq((s10 = {}, sB(nl, function(e11) {
      let t11 = sJ(e11);
      s10[e11] = t11 || null;
    }), s10), n10);
  }
  function nh(e10, t10) {
    let i10 = no.concat(t10 || []), s10 = {};
    return sB(i10, function(t11) {
      let i11 = ne(e10, t11);
      s10[t11] = i11 || null;
    }), s10;
  }
  function nc(e10) {
    let t10 = e10 ? 0 === e10.search("https?://(.*)google.([^/?]*)") ? "google" : 0 === e10.search("https?://(.*)bing.com") ? "bing" : 0 === e10.search("https?://(.*)yahoo.com") ? "yahoo" : 0 === e10.search("https?://(.*)duckduckgo.com") ? "duckduckgo" : null : null, i10 = {};
    if (!U(t10)) {
      i10.$search_engine = t10;
      let e11 = d ? ne(d.referrer, "yahoo" != t10 ? "q" : "p") : "";
      e11.length && (i10.ph_keyword = e11);
    }
    return i10;
  }
  function nd() {
    return navigator.language || navigator.userLanguage;
  }
  let np = "$direct";
  function nf() {
    return (null == d ? void 0 : d.referrer) || np;
  }
  function ng(e10, t10, i10 = false) {
    let s10 = e10 ? [...nn, ...t10 || []] : [], r10 = i10 ? tp(null == p ? void 0 : p.href) : null == p ? void 0 : p.href, n10 = null == r10 ? void 0 : r10.substring(0, 1e3);
    return { r: nf().substring(0, 1e3), u: n10 ? nt(n10, s10, na) : void 0 };
  }
  function nv(e10, t10 = false) {
    var i10;
    let { r: s10, u: r10 } = e10, n10 = t10 ? tp(r10) : r10, o10 = { $referrer: s10, $referring_domain: null == s10 ? void 0 : s10 == np ? np : null == (i10 = r7(s10)) ? void 0 : i10.host };
    if (n10) {
      o10.$current_url = n10;
      let e11 = r7(n10);
      o10.$host = null == e11 ? void 0 : e11.host, o10.$pathname = null == e11 ? void 0 : e11.pathname, sq(o10, nh(n10));
    }
    return s10 && sq(o10, nc(s10)), o10;
  }
  function n_() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e10) {
      return;
    }
  }
  let nm = { flags: su, surveys: st }, ny = ["cookie", "localstorage", "localstorage+cookie", "sessionstorage", "memory"], nb = (e10) => `${e10}_cookie_identity_change_pending`, nw = (e10) => {
    let t10 = "", i10 = 0;
    for (let s10 of e10) {
      let e11 = encodeURIComponent(JSON.stringify(s10).slice(1, -1)).length;
      if (i10 + e11 > 1e3) break;
      t10 += s10, i10 += e11;
    }
    return t10;
  }, nx = "main", nk = [iQ, iZ, i1, i2, i3, su, i5, i8], nE = (e10) => -1 !== nk.indexOf(e10), n$ = [iR, iD], nS = (e10) => -1 !== n$.indexOf(e10), nI = (e10, t10) => {
    try {
      return JSON.stringify(e10) === JSON.stringify(t10);
    } catch (i10) {
      return e10 === t10;
    }
  }, nP = (e10) => {
    if (!e10) return {};
    let t10 = JSON.parse(e10);
    return q(t10) ? t10 : {};
  }, nF = (e10, t10) => {
    sB(e10, (i10, s10) => {
      let r10 = r8(s10);
      r10 && "event" !== r10.exposure || {}.hasOwnProperty.call(t10, s10) || delete e10[s10];
    });
  };
  var nC = class {
    constructor(e10, t10, i10 = true, s10 = !e10.cookieless_mode) {
      if (this.Qo = {}, this.Jo = false, this.Ko = false, this.Xo = false, this.Yo = false, this.ta = false, this.ea = /* @__PURE__ */ new Map(), this.ia = false, this.na = false, this.sa = false, this.ra = /* @__PURE__ */ new Set(), this.oa = /* @__PURE__ */ new Set(), this.Ir = e10, this.aa = i10, this.props = {}, this.la = void 0, this.ua = ((e11) => {
        let t11 = "";
        return e11.token && (t11 = e11.token.replace(/\+/g, "PL").replace(/\//g, "SL").replace(/=/g, "EQ")), e11.persistence_name ? "ph_" + e11.persistence_name : "ph_" + t11 + "_posthog";
      })(e10), this.hi = e10.disable_persistence || !!t10, this.No = this.ha(e10), this.Xo = this.ca(e10), this.load(s10), this.da(), e10.debug && ik.info("Persistence loaded", e10.persistence, tb({}, this.props)), this.update_config(e10, e10, t10), this.save(), u) {
        const e11 = () => this.flush();
        sG(u, "beforeunload", e11, { capture: false }), sG(u, "pagehide", e11, { capture: false }), this.va = (e12) => {
          if (this.Jo && (!e12.storageArea || e12.storageArea === (null == u ? void 0 : u.localStorage)) && e12.key) if (e12.key !== this.ua) {
            if (this.Xo) {
              let t11 = r5.find((t12) => e12.key === this.fa(t12));
              t11 && this.pa(e12.key, t11);
            }
          } else this.pa(e12.key, nx);
        }, sG(u, "storage", this.va);
      }
    }
    markCrossTabFeatureFlagChanges(e10) {
      Object.entries(e10).forEach(([e11, t10]) => {
        let i10 = this.ea.get(e11);
        if (!nE(e11) || true === i10) return;
        if (true === t10) return void this.ga(e11, true);
        let s10 = new Set(i10 || []);
        t10.forEach((e12) => s10.add(e12)), s10.size && this.ga(e11, s10);
      });
    }
    onCrossTabFeatureFlagChange(e10) {
      return this.oa.add(e10), () => this.oa.delete(e10);
    }
    destroy() {
      this.va && u && (u.removeEventListener("storage", this.va), this.va = void 0), this.oa.clear();
    }
    pa(e10, t10, i10 = true) {
      let s10, r10;
      if (this.hi) return false;
      try {
        if (r10 = s8.Ot(e10), U(r10)) {
          let e11 = this.ma(t10);
          return e11.storageValue = null, t10 !== nx && (e11.persisted = false), false;
        }
        s10 = nP(r10);
      } catch (e11) {
        return false;
      }
      let n10 = t10 === nx ? s10 : s8.Dt(this.ua);
      if (n10 && this.ya(n10)) return false;
      let o10 = this.ba(s10, t10, i10);
      return t10 === nx && this.Xo && !nI(this._a().main, s10) || this.wa(s10, t10, true, r10), o10;
    }
    ya(e10) {
      let t10 = this.props[iC], i10 = e10[iC];
      return !z(t10) && !z(i10) && t10 !== i10;
    }
    wa(e10, t10, i10, s10) {
      let r10 = this.ma(t10);
      r10.storageValue = s10, t10 !== nx && (r10.persisted = i10);
      try {
        r10.fingerprint = this.ka(e10, t10);
      } catch (e11) {
        r10.fingerprint = void 0;
      }
    }
    ba(e10, t10, i10) {
      let s10 = false;
      return nk.forEach((i11) => {
        var r10;
        let n10 = null == (r10 = r8(i11)) ? void 0 : r10.storageGroup;
        if (t10 === nx && this.Xo && n10 || t10 !== nx && n10 !== t10) return;
        let o10 = i11 in e10, a10 = this.Sa(i11, o10 ? e10[i11] : void 0), l2 = this.ea.has(i11) ? i11 in this.props : o10;
        l2 === i11 in this.props && nI(a10, this.props[i11]) || (l2 ? this.xa(i11, a10, false) : this.Ca(i11, false), s10 = true);
      }), s10 && i10 && this.oa.forEach((e11) => e11()), s10;
    }
    $a() {
      if (!this.Jo) return false;
      try {
        this.sa = false;
        let e10 = s8.Ot(this.ua), t10 = this.ma(nx), i10, s10 = false, r10 = false;
        if (e10 !== t10.storageValue) if (U(e10)) t10.storageValue = null;
        else {
          if (i10 = nP(e10), this.sa = !this.na && this.ya(i10), this.sa) return false;
          r10 = this.ba(i10, nx, false), !this.Xo || nI(this._a().main, i10) ? this.wa(i10, nx, true, e10) : t10.storageValue = e10, s10 = true;
        }
        return this.Xo && r5.forEach((e11) => {
          let t11 = s8.Ot(this.fa(e11)), n10 = this.ma(e11), o10 = i10 || {}, a10 = s10 && nk.some((t12) => {
            var i11;
            return (null == (i11 = r8(t12)) ? void 0 : i11.storageGroup) === e11 && t12 in o10;
          });
          if (t11 === n10.storageValue && !a10) return;
          if (U(t11)) return n10.storageValue = null, n10.persisted = false, void (a10 && (r10 = this.ba(o10, e11, false) || r10));
          let l2 = nP(t11);
          r10 = this.ba(l2, e11, false) || r10, this.wa(l2, e11, true, t11);
        }), r10;
      } catch (e10) {
        return false;
      }
    }
    ga(e10, t10) {
      this.ea.set(e10, t10);
      let i10 = r8(e10);
      (null == i10 ? void 0 : i10.volatile) || (this.ma((this.Xo ? null == i10 ? void 0 : i10.storageGroup : void 0) || nx).fingerprint = void 0, this.Ta(e10));
    }
    Ia() {
      nk.forEach((e10) => this.ea.set(e10, true));
    }
    da() {
      if (this.Jo) try {
        let e10 = s8.Ot(this.ua), t10 = nP(e10);
        this.ma(nx).storageValue = e10, nk.forEach((e11) => {
          var i10;
          let s10 = this.Xo ? null == (i10 = r8(e11)) ? void 0 : i10.storageGroup : void 0, r10 = s10 ? s8.Ot(this.fa(s10)) : null;
          if (s10) {
            let e12 = this.ma(s10);
            e12.storageValue = r10, e12.persisted = !U(r10);
          }
          let n10 = s10 && !U(r10) ? nP(r10) : t10;
          e11 in this.props ? this.Ma(e11, n10[e11], this.props[e11]) : e11 in n10 && this.ga(e11, true);
        });
      } catch (e10) {
      }
    }
    Sa(e10, t10) {
      let i10 = this.ea.get(e10);
      if (!i10) return t10;
      if (true === i10) return this.props[e10];
      if ("$active_feature_flags" === e10) {
        let s11 = new Set(j(t10) ? t10 : []), r11 = new Set(j(this.props[e10]) ? this.props[e10] : []);
        return i10.forEach((e11) => r11.has(e11) ? s11.add(e11) : s11.delete(e11)), Array.from(s11);
      }
      let s10 = q(t10) ? tb({}, t10) : {}, r10 = q(this.props[e10]) ? this.props[e10] : {};
      return i10.forEach((e11) => {
        e11 in r10 ? s10[e11] = r10[e11] : delete s10[e11];
      }), s10;
    }
    Ma(e10, t10, i10) {
      if (!nE(e10)) return;
      let s10 = this.ea.get(e10);
      if (true === s10) return;
      let r10 = t10;
      if (this.Jo) try {
        var n10;
        let t11 = this.Xo ? null == (n10 = r8(e10)) ? void 0 : n10.storageGroup : void 0, i11 = t11 ? this.fa(t11) : this.ua;
        r10 = nP(s8.Ot(i11))[e10];
      } catch (e11) {
      }
      let o10 = new Set(s10 || []);
      if ("$active_feature_flags" === e10) {
        if (!z(t10) && !j(t10) || !z(r10) && !j(r10) || !j(i10)) return void this.ga(e10, true);
        let s11 = new Set(t10 || []), n11 = new Set(r10 || []), a10 = new Set(i10);
        (/* @__PURE__ */ new Set([...s11, ...a10])).forEach((e11) => {
          s11.has(e11) !== a10.has(e11) && o10.add(e11);
        }), o10.forEach((e11) => {
          n11.has(e11) === a10.has(e11) && o10.delete(e11);
        });
      } else {
        if (!q(i10)) return void (nI(r10, i10) ? this.ea.delete(e10) : this.ga(e10, true));
        {
          if (!z(t10) && !q(t10) || z(t10) && H(i10) && z(r10)) return void this.ga(e10, true);
          let s11 = q(t10) ? t10 : {}, n11 = q(r10) ? r10 : {};
          (/* @__PURE__ */ new Set([...Object.keys(s11), ...Object.keys(i10)])).forEach((e11) => {
            e11 in s11 == e11 in i10 && nI(s11[e11], i10[e11]) || o10.add(e11);
          }), o10.forEach((e11) => {
            e11 in n11 == e11 in i10 && nI(n11[e11], i10[e11]) && o10.delete(e11);
          });
        }
      }
      o10.size ? this.ga(e10, o10) : this.ea.delete(e10);
    }
    Ea() {
      var e10;
      let t10 = null == (e10 = this.Ir) ? void 0 : e10.persistence_save_debounce_ms;
      return K(t10) && t10 > 0 ? t10 : 0;
    }
    Pa(e10) {
      if (this.Ir.cookieWinsOnConflict && "localstorage+cookie" === this.Ir.persistence.toLowerCase()) if (e10) try {
        let t10 = ri(e10, this.Ir.cookie_persisted_properties || []), i10 = rr(t10, this.Ir.cookie_persisted_properties || []), s10 = JSON.stringify(t10) + "|" + JSON.stringify(i10), r10 = s4.Ot(this.ua) || void 0;
        r10 && ro(this.ua, r10) === s10 && (this.Ra = s10, this.Aa = r10);
      } catch (e11) {
      }
      else try {
        let e11 = s4.Ot(this.ua) || void 0;
        this.Ra = e11 ? ro(this.ua, e11) : void 0, this.Aa = e11;
      } catch (e11) {
      }
    }
    syncCookieProperties() {
      return this.Fa(this.Ir);
    }
    Fa(e10, t10 = false) {
      let i10, s10;
      if (this.hi && !t10 || this.ta || !e10.cookieWinsOnConflict || "localstorage+cookie" !== e10.persistence.toLowerCase()) return false;
      try {
        i10 = s4.Ot(this.ua) || void 0;
      } catch (e11) {
      }
      if (!i10 || i10 === this.Aa) return false;
      let r10 = ro(this.ua, i10);
      try {
        s10 = rt(JSON.parse(i10));
      } catch (e11) {
        return false;
      }
      if ((s4.Ot(this.ua) || void 0) !== i10) return false;
      this.Ra = r10, this.Aa = i10;
      let n10 = rn(this.ua, i10), o10 = [...s7, ...n10.properties], a10 = {};
      if (Object.keys(s10).forEach((e11) => {
        let t11 = s10[e11];
        (z(t11) || U(t11) || "" === t11 || "$user_state" === e11 && "anonymous" !== t11 && "identified" !== t11) && (a10[e11] = true, delete s10[e11]);
      }), H(s10)) return false;
      let l2 = "distinct_id" in s10 || "anonymous" === s10.$user_state || "identified" === s10.$user_state, u2 = this.props, h2 = u2[iC], c2 = u2[sh], d2 = sq({}, u2);
      [...s7, ...e10.cookie_persisted_properties || []].forEach((e11) => {
        if (-1 !== o10.indexOf(e11) && !(e11 in s10) && !a10[e11] && (l2 || "distinct_id" !== e11 && "$user_state" !== e11)) {
          let t11 = d2[e11];
          (n10.isValid || -1 === s7.indexOf(e11) || false !== t11 && 0 !== t11) && delete d2[e11];
        }
      }), this.props = sq(d2, s10), nk.forEach((e11) => {
        let t11 = e11 in this.props;
        e11 in u2 === t11 && nI(u2[e11], this.props[e11]) || (t11 ? this.Ma(e11, u2[e11], this.props[e11]) : this.ga(e11, true));
      }), !l2 || "$user_state" in s10 || "$user_state" in this.props || this.xa(sh, sC);
      let p2 = this.props[iC], f2 = this.props[sh];
      return l2 && (p2 !== h2 || f2 !== c2) && (this.na = true, this.Yo = true, rh.$t(nb(this.ua), true), this.Ca(i8), this.Ca(iZ), this.Ca(iQ), this.Ca(i1), this.Ca(i2), this.Ca(i3), this.Ca(su), this.Ca(sl), this.Ca(so), "anonymous" !== f2 || "identified" !== c2 && "anonymous" !== s10.$user_state && (z(h2) || p2 === h2) || (nF(this.props, s10), this.Ca(i9)), "identified" === f2 ? this.props.$user_id = p2 : delete this.props.$user_id, this.Ca(iA)), true;
    }
    consumeCookieIdentityChange() {
      let e10 = nb(this.ua), t10 = this.Yo || !!rh.Ot(e10);
      return this.Yo = false, t10 && rh.Lt(e10), t10;
    }
    Oa(e10 = false) {
      return !(this.ta || this.hi && !e10 || !this.Ir.cookieWinsOnConflict || "localstorage+cookie" !== this.Ir.persistence.toLowerCase() || (this.ta = true, 0));
    }
    Da() {
      this.ta && (z(this.La) || (clearTimeout(this.La), this.La = void 0), delete this.Qo[nx], this.Na(true));
    }
    qa(e10 = true) {
      if (this.ta) try {
        e10 ? this.Da() : z(this.La) || (clearTimeout(this.La), this.La = void 0);
      } finally {
        this.ta = false;
      }
    }
    isDisabled() {
      return !!this.hi;
    }
    ha(e10) {
      -1 === ny.indexOf(e10.persistence.toLowerCase()) && (ik.critical("Unknown persistence type " + e10.persistence + "; falling back to localStorage+cookie"), e10.persistence = "localStorage+cookie");
      let t10 = ((e11 = [], t11 = false, i11 = () => false) => {
        let s11 = [...s7, ...e11];
        return tb(tb({}, s8), {}, { Dt(e12) {
          try {
            let n11, o10, a10 = {};
            try {
              a10 = (o10 = s4.Ot(e12) || void 0) ? rt(JSON.parse(o10)) : {};
            } catch (e13) {
            }
            let l2 = JSON.parse(s8.Ot(e12) || "{}");
            if (t11) {
              let t12 = rn(e12, o10), i12 = [...s7, ...t12.properties], u2 = {};
              Object.keys(a10).forEach((e13) => {
                let t13 = a10[e13];
                U(t13) || "" === t13 || "$user_state" === e13 && "anonymous" !== t13 && "identified" !== t13 || (u2[e13] = t13);
              });
              let h2 = "distinct_id" in u2 || "anonymous" === u2.$user_state || "identified" === u2.$user_state;
              if (Object.keys(u2).length > 0) {
                var r11;
                let e13 = l2[iC], n12 = null != (r11 = l2.$user_state) ? r11 : sC;
                s11.forEach((e14) => {
                  if (-1 !== i12.indexOf(e14) && !(e14 in a10) && (h2 || "distinct_id" !== e14 && "$user_state" !== e14)) {
                    let i13 = l2[e14];
                    (t12.isValid || -1 === s7.indexOf(e14) || false !== i13 && 0 !== i13) && delete l2[e14];
                  }
                }), !h2 || "$user_state" in a10 || "$user_state" in l2 || (l2[sh] = sC), h2 && (("distinct_id" in u2 ? u2[iC] : l2[iC]) !== e13 || ("$user_state" in u2 ? u2[sh] : l2[sh]) !== n12) && (s9.forEach((e14) => delete l2[e14]), "identified" === u2.$user_state && "distinct_id" in u2 ? l2.$user_id = u2[iC] : delete l2.$user_id, "identified" !== u2.$user_state && (delete l2[i7], delete l2[i9]), delete l2.__alias);
              }
              n11 = sq(l2, u2);
            } else n11 = sq(a10, l2);
            return i11() || s8.$t(e12, n11), n11;
          } catch (e13) {
          }
          return null;
        }, $t(i12, s12, r11, n11, o10, a10) {
          let l2 = s8.$t(i12, s12, void 0, void 0, a10);
          try {
            let u2 = ri(s12, e11);
            if (Object.keys(u2).length) {
              if (t11) {
                let t12 = i12 + "_cpm", h2 = rr(u2, e11);
                if (s4.$t(t12, h2, r11, n11, o10, a10), s4.Ot(t12) !== JSON.stringify(h2)) {
                  s4.Lt(t12, n11);
                  let e12 = ri(s12);
                  return s4.$t(i12, e12, r11, n11, o10, a10), l2;
                }
              }
              s4.$t(i12, u2, r11, n11, o10, a10);
            }
          } catch (e12) {
            s8.Pt(e12);
          }
          return l2;
        }, Lt(e12, t12) {
          try {
            null == u || u.localStorage.removeItem(e12), s4.Lt(e12, t12), s4.Lt(e12 + "_cpm", t12);
          } catch (e13) {
            s8.Pt(e13);
          }
        } });
      })(e10.cookie_persisted_properties || [], e10.cookieWinsOnConflict, () => !!this.hi), i10, s10 = false, r10 = false, n10 = e10.persistence.toLowerCase();
      return "localstorage" === n10 && s8.Et() ? (i10 = s8, r10 = true) : "localstorage+cookie" === n10 && t10.Et() ? (i10 = t10, r10 = true, s10 = true) : "sessionstorage" === n10 && rh.Et() ? i10 = rh : "memory" === n10 ? i10 = rl : "cookie" === n10 && s4.Et() ? (i10 = s4, s10 = true) : t10.Et() ? (i10 = t10, r10 = true, s10 = true) : s4.Et() ? (i10 = s4, s10 = true) : i10 = rl, this.Jo = r10, this.Ko = s10, i10;
    }
    fa(e10) {
      return `${this.ua}__${e10}`;
    }
    ca(e10) {
      return this.Jo && !!e10.split_storage;
    }
    properties() {
      let e10 = {};
      return sB(this.props, (t10, i10) => {
        let s10 = r8(i10);
        if (!s10 || "event" === s10.exposure) {
          var r10;
          if (null == s10 || null == (r10 = s10.shouldSkipFromEventProperties) ? void 0 : r10.call(s10, t10)) return;
          e10[i10] = t10;
        }
      }), e10;
    }
    load(e10 = false) {
      if (this.hi && !e10) return;
      let t10 = this.Ir.cookieWinsOnConflict && "localstorage+cookie" === this.Ir.persistence.toLowerCase(), i10 = t10 ? s8.Dt(this.ua) : null, s10 = {};
      if (t10) try {
        s10 = rt(s4.Dt(this.ua)), sB(s10, (e11, t11) => {
          (z(e11) || U(e11) || "" === e11) && delete s10[t11];
        });
      } catch (e11) {
      }
      let r10 = this.No.Dt(this.ua);
      if (r10 && (this.props = sq({}, r10)), this.Xo && this.ja(), t10 && r10) {
        var n10, o10;
        let e11 = null == i10 ? void 0 : i10[iC], t11 = null != (n10 = null == i10 ? void 0 : i10.$user_state) ? n10 : sC, a10 = r10[iC], l2 = null != (o10 = r10.$user_state) ? o10 : sC;
        if (a10 !== e11 || l2 !== t11) {
          this.Yo = true, this.hi || rh.$t(nb(this.ua), true);
          let i11 = sq({}, this.props);
          s9.forEach((e12) => delete i11[e12]), "anonymous" !== l2 || "identified" !== t11 && "anonymous" !== s10.$user_state && (z(e11) || a10 === e11) || (nF(i11, s10), delete i11[i9]), this.props = i11;
          let r11 = /* @__PURE__ */ new Set();
          s9.forEach((e12) => {
            var t12;
            let i12 = null == (t12 = r8(e12)) ? void 0 : t12.storageGroup;
            i12 && r11.add(i12);
          }), r11.forEach((e12) => {
            if (this.hi) return;
            let t12 = {};
            sB(this.props, (i12, s11) => {
              var r12;
              (null == (r12 = r8(s11)) ? void 0 : r12.storageGroup) === e12 && (t12[s11] = i12);
            }), H(t12) ? (s8.Lt(this.fa(e12)), this.Qo[e12] = {}) : s8.$t(this.fa(e12), t12) && (this.Qo[e12] = { persisted: true, fingerprint: this.ka(t12, e12) });
          });
        }
      }
      rh.Ot(nb(this.ua)) && (this.Yo = true);
    }
    ja() {
      for (let e10 of r5) {
        let t10 = s8.Dt(this.fa(e10));
        if (t10 && !H(t10)) {
          let i10 = this.ma(e10);
          i10.persisted = true, this.Ba(e10) || (i10.fingerprint = this.ka(t10, e10)), this.Ha(e10, t10) || sq(this.props, t10);
        }
      }
    }
    Ba(e10) {
      return Object.keys(this.props).some((t10) => {
        var i10;
        return (null == (i10 = r8(t10)) ? void 0 : i10.storageGroup) === e10;
      });
    }
    Ha(e10, t10) {
      let i10 = nm[e10];
      if (!i10) return false;
      let s10 = t10[i10], r10 = this.props[i10];
      return K(s10) && K(r10) && r10 > s10;
    }
    refreshKey(e10) {
      var t10;
      if (this.hi || this.ra.has(e10)) return;
      let i10 = this.Xo ? null == (t10 = r8(e10)) ? void 0 : t10.storageGroup : void 0, s10 = i10 ? s8.Dt(this.fa(i10)) : this.No.Dt(this.ua);
      if (s10 && e10 in s10) this.xa(e10, s10[e10], false);
      else {
        if (i10) {
          let t11 = this.No.Dt(this.ua);
          if (t11 && e10 in t11) return void this.xa(e10, t11[e10], false);
        }
        this.Ca(e10, false);
      }
    }
    save() {
      if (this.hi) return;
      let e10 = this.Ea();
      e10 > 0 ? z(this.La) && (this.La = setTimeout(() => {
        this.La = void 0, this.Na();
      }, e10)) : this.Na();
    }
    flush() {
      z(this.La) || (clearTimeout(this.La), this.La = void 0, this.Na());
    }
    Na(e10 = false) {
      if (this.hi || this.ta && !e10) return;
      e10 || (this.syncCookieProperties(), this.Ir.cookieWinsOnConflict && "localstorage+cookie" === this.Ir.persistence.toLowerCase() || n$.forEach((e11) => this.refreshKey(e11)));
      let t10 = !e10 && !this.ia;
      t10 || (this.sa = false);
      let i10 = !!t10 && this.$a();
      if (this.sa) return void (this.Ir.debug && ik.warn("skipping persistence write because storage belongs to a different distinct ID"));
      if (this.Xo) return this.za(), void (i10 && this.oa.forEach((e11) => e11()));
      let s10 = this.Ua(this.No, this.ua, this.props, nx);
      "written" === s10 && this.Pa(this.props), "failed" !== s10 && (this.ea.clear(), this.na = false, this.ra.clear()), i10 && this.oa.forEach((e11) => e11());
    }
    za() {
      let { main: e10, groups: t10 } = this._a(), i10 = this.Ua(this.No, this.ua, e10, nx);
      for (let r10 of ("written" === i10 && this.Pa(e10), "failed" !== i10 && (this.na = false, this.ra.clear(), nk.forEach((e11) => {
        var t11;
        (null == (t11 = r8(e11)) ? void 0 : t11.storageGroup) || this.ea.delete(e11);
      })), r5)) {
        var s10;
        let e11 = t10[r10];
        if (H(e11) && !(null == (s10 = this.Qo[r10]) ? void 0 : s10.persisted)) {
          nk.forEach((e12) => {
            var t11;
            (null == (t11 = r8(e12)) ? void 0 : t11.storageGroup) === r10 && this.ea.delete(e12);
          });
          continue;
        }
        let i11 = this.Ua(s8, this.fa(r10), e11, r10);
        "failed" !== i11 && nk.forEach((e12) => {
          let t11 = r8(e12);
          (null == t11 ? void 0 : t11.storageGroup) !== r10 || "written" !== i11 && t11.volatile || this.ea.delete(e12);
        });
      }
    }
    _a() {
      let e10 = {}, t10 = { flags: {}, surveys: {} };
      return sB(this.props, (i10, s10) => {
        var r10;
        let n10 = null == (r10 = r8(s10)) ? void 0 : r10.storageGroup;
        n10 ? t10[n10][s10] = i10 : e10[s10] = i10;
      }), { main: e10, groups: t10 };
    }
    ka(e10, t10) {
      if (t10 === nx) return JSON.stringify(e10) + "|" + this.Wa + "|" + this.Va + "|" + this.Ga;
      let i10 = {};
      return sB(e10, (e11, t11) => {
        var s10;
        i10[t11] = (null == (s10 = r8(t11)) ? void 0 : s10.volatile) ? "__volatile__" : e11;
      }), JSON.stringify(i10);
    }
    Ua(e10, t10, i10, s10) {
      let r10, n10 = this.ma(s10);
      if (s10 !== nx && !n10.dirty && !z(n10.fingerprint)) return "skipped";
      try {
        if ((r10 = this.ka(i10, s10)) === n10.fingerprint) return n10.dirty = false, "skipped";
      } catch (e11) {
        r10 = void 0;
      }
      return e10.$t(t10, i10, this.Wa, this.Va, this.Ga, this.Ir.debug) ? (n10.dirty = false, s10 !== nx && (n10.persisted = true), z(r10) || (n10.fingerprint = r10), this.Jo && (n10.storageValue = s8.Ot(t10)), "written") : (this.Ir.debug && ik.warn(`failed to persist storage entry "${t10}"; will retry on next save`), "failed");
    }
    remove({ keepGroupEntries: e10 = false } = {}) {
      if (this.Ia(), z(this.La) || (clearTimeout(this.La), this.La = void 0), this.No.Lt(this.ua, false), this.No.Lt(this.ua, true), !e10 && this.aa) for (let e11 of r5) s8.Lt(this.fa(e11));
      e10 ? delete this.Qo[nx] : this.Qo = {}, this.Ra = void 0, this.Aa = void 0;
    }
    clear() {
      this.remove(), this.props = {};
    }
    register_once(e10, t10, i10) {
      if (q(e10)) {
        this.syncCookieProperties(), z(t10) && (t10 = "None"), this.Wa = z(i10) ? this.Za : i10;
        let s10 = false;
        if (sB(e10, (e11, i11) => {
          this.props.hasOwnProperty(i11) && this.props[i11] !== t10 || (this.xa(i11, e11), s10 = true);
        }), s10) return this.save(), true;
      }
      return false;
    }
    register(e10, t10) {
      if (q(e10)) {
        this.syncCookieProperties(), this.Wa = z(t10) ? this.Za : t10;
        let i10 = false;
        if (sB(e10, (t11, s10) => {
          e10.hasOwnProperty(s10) && (this.props[s10] !== t11 || q(t11) || j(t11)) && (this.xa(s10, t11), i10 = true);
        }), i10) return this.save(), true;
      }
      return false;
    }
    unregister(e10) {
      this.syncCookieProperties();
      let t10 = false;
      for (let i10 of "string" == typeof e10 ? [e10] : e10) i10 in this.props && (this.Ca(i10), t10 = true);
      t10 && this.save();
    }
    update_campaign_params() {
      let e10 = null == d ? void 0 : d.URL;
      if (e10 === this.la) return;
      let t10 = nu(this.Ir.custom_campaign_params, this.Ir.mask_personal_data_properties, this.Ir.custom_personal_data_properties), i10 = !H(sV(t10));
      return i10 && this.register(t10), this.la = e10, i10 ? t10 : void 0;
    }
    update_search_keyword() {
      let e10;
      this.register((e10 = null == d ? void 0 : d.referrer) ? nc(e10) : {});
    }
    update_referrer_info() {
      var e10;
      this.register_once({ $referrer: nf(), $referring_domain: (null == d ? void 0 : d.referrer) && (null == (e10 = r7(d.referrer)) ? void 0 : e10.host) || np }, void 0);
    }
    set_initial_person_info() {
      if (this.props.$initial_campaign_params || this.props.$initial_referrer_info) return;
      let e10 = ng(this.Ir.mask_personal_data_properties, this.Ir.custom_personal_data_properties, this.Ir.disable_capture_url_hashes);
      this.register_once({ [sf]: this.Ko ? { r: nw(e10.r), u: e10.u ? nw(e10.u) : void 0 } : e10 }, void 0);
    }
    get_initial_props() {
      let e10 = {};
      sB([sp, sd], (t11) => {
        let i10 = this.props[t11];
        i10 && sB(i10, function(t12, i11) {
          e10["$initial_" + M(i11)] = t12;
        });
      });
      let t10 = this.props[sf];
      return t10 && sq(e10, (function(e11, t11 = false) {
        let i10 = nv(e11, t11), s10 = {};
        return sB(i10, function(e12, t12) {
          s10[`$initial_${M(t12)}`] = e12;
        }), s10;
      })(t10, this.Ir.disable_capture_url_hashes)), e10;
    }
    safe_merge(e10) {
      return sB(this.props, function(t10, i10) {
        i10 in e10 || (e10[i10] = t10);
      }), e10;
    }
    update_config(e10, t10, i10) {
      let s10 = e10.persistence !== t10.persistence, r10 = !((e11, t11) => {
        if (e11.length !== t11.length) return false;
        let i11 = [...e11].sort(), s11 = [...t11].sort();
        return i11.every((e12, t12) => e12 === s11[t12]);
      })(e10.cookie_persisted_properties || [], t10.cookie_persisted_properties || []), n10 = s10 || r10, o10 = e10.cookieWinsOnConflict !== t10.cookieWinsOnConflict, a10 = e10.disable_persistence || !!i10, l2 = !!this.hi && !a10;
      a10 || this.Fa(t10, l2), this.Ir = e10, !a10 && (s10 || r10 || o10) && (this.Ra = void 0, this.Aa = void 0, this.Fa(tb(tb({}, e10), {}, { cookie_persisted_properties: t10.cookie_persisted_properties }), l2));
      let u2 = n10 || o10 ? this.ha(e10) : this.No;
      this.Qa();
      let h2 = this.ca(e10), c2 = n10 || h2 !== this.Xo, d2 = !a10 && (c2 || e10.cross_subdomain_cookie !== this.Va || e10.secure_cookie !== this.Ga) && this.Oa(l2);
      this.ia = c2;
      try {
        if (this.Za = this.Wa = e10.cookie_expiration, this.set_disabled(a10), this.set_cross_subdomain(e10.cross_subdomain_cookie), this.set_secure(e10.secure_cookie), c2) {
          let e11 = this.props;
          this.clear(), this.No = u2, this.Xo = h2, this.props = e11, this.save();
        } else o10 && (this.No = u2, a10 || (delete this.Qo[nx], this.Na()));
      } finally {
        this.ia = false, d2 && this.qa();
      }
    }
    Qa() {
      let e10 = this.props[sf];
      if (!this.Ko || !q(e10) || "string" != typeof e10.r) return;
      let t10 = nw(e10.r), i10 = "string" == typeof e10.u ? nw(e10.u) : e10.u;
      t10 === e10.r && i10 === e10.u || this.xa(sf, tb(tb({}, e10), {}, { r: t10, u: i10 }));
    }
    set_disabled(e10) {
      this.hi = e10, this.hi ? this.remove() : this.save();
    }
    set_cross_subdomain(e10) {
      e10 !== this.Va && (this.Va = e10, this.remove({ keepGroupEntries: true }), this.save());
    }
    set_secure(e10) {
      e10 !== this.Ga && (this.Ga = e10, this.remove({ keepGroupEntries: true }), this.save());
    }
    set_event_timer(e10, t10) {
      let i10 = this.props.__timers || {};
      i10[e10] = t10, this.xa(iN, i10), this.save();
    }
    remove_event_timer(e10) {
      let t10 = this.props.__timers || {}, i10 = t10[e10];
      return z(i10) || (delete t10[e10], this.xa(iN, t10), this.save()), i10;
    }
    get_property(e10) {
      return this.props[e10];
    }
    set_property(e10, t10) {
      this.xa(e10, t10), this.save();
    }
    xa(e10, t10, i10 = true) {
      var s10;
      let r10 = this.props[e10];
      this.props[e10] = t10, i10 && ("distinct_id" !== e10 && "$user_state" !== e10 || r10 === t10 || (this.na = true), nS(e10) && !nI(r10, t10) && this.ra.add(e10), this.Ma(e10, r10, t10), (null == (s10 = r8(e10)) ? void 0 : s10.volatile) || this.Ta(e10));
    }
    Ca(e10, t10 = true) {
      delete this.props[e10], t10 && (nE(e10) && this.ga(e10, true), nS(e10) && this.ra.add(e10), this.Ta(e10));
    }
    Ta(e10) {
      var t10;
      let i10 = null == (t10 = r8(e10)) ? void 0 : t10.storageGroup;
      i10 && (this.ma(i10).dirty = true);
    }
    ma(e10) {
      return this.Qo[e10] || (this.Qo[e10] = {});
    }
  };
  let nO = "gzip-js", nT = "base64", nA = "events", nM = "cancelEvents", nR = "survey shown", nL = "survey dismissed", nD = "survey sent", nN = "popover";
  function nj(e10) {
    let t10 = true;
    return { dispose() {
      if (t10) {
        t10 = false;
        let i10 = e10();
        i10 && B(i10.then) && i10.then(void 0, () => {
        });
      }
    } };
  }
  let nB = iE("[RateLimiter]");
  var nq = class {
    constructor(e10) {
      this.serverLimits = {}, this.lastEventRateLimited = false, this.checkForLimiting = (e11) => {
        let t10 = e11.text;
        if (t10 && t10.length) try {
          (JSON.parse(t10).quota_limited || []).forEach((e12) => {
            nB.info(`${e12 || "events"} is quota limited.`), this.serverLimits[e12] = (/* @__PURE__ */ new Date()).getTime() + 6e4;
          });
        } catch (e12) {
          return void nB.warn(`could not rate limit - continuing. Error: "${null == e12 ? void 0 : e12.message}"`, { text: t10 });
        }
      }, this.instance = e10, this.lastEventRateLimited = this.clientRateLimitContext(true).isRateLimited;
    }
    get captureEventsPerSecond() {
      var e10;
      return (null == (e10 = this.instance.config.rate_limiting) ? void 0 : e10.events_per_second) || 10;
    }
    get captureEventsBurstLimit() {
      var e10;
      return Math.max((null == (e10 = this.instance.config.rate_limiting) ? void 0 : e10.events_burst_limit) || 10 * this.captureEventsPerSecond, this.captureEventsPerSecond);
    }
    clientRateLimitContext(e10 = false) {
      var t10, i10, s10;
      let { captureEventsBurstLimit: r10, captureEventsPerSecond: n10 } = this, o10 = (/* @__PURE__ */ new Date()).getTime(), a10 = null != (t10 = null == (i10 = this.instance.persistence) ? void 0 : i10.get_property("$capture_rate_limit")) ? t10 : { tokens: r10, last: o10 };
      a10.tokens += (o10 - a10.last) / 1e3 * n10, a10.last = o10, a10.tokens > r10 && (a10.tokens = r10);
      let l2 = 1 > a10.tokens;
      if (l2 || e10 || (a10.tokens = Math.max(0, a10.tokens - 1)), l2 && !e10) {
        let e11 = (K(a10.dropped) ? a10.dropped : 0) + 1;
        a10.dropped = e11, !this.lastEventRateLimited && this.Ja(e11) && (a10.dropped = 0);
      }
      return this.lastEventRateLimited = l2, null == (s10 = this.instance.persistence) || s10.set_property("$capture_rate_limit", a10), { isRateLimited: l2, remainingTokens: a10.tokens };
    }
    Ka(e10) {
      let t10 = this.instance.config.property_denylist;
      return !j(t10) || !t10.includes(e10);
    }
    Xa() {
      var e10;
      if (this.Ka("$current_url") && this.Ka("$pathname") && (null == p ? void 0 : p.pathname)) return `${null != (e10 = p.origin) ? e10 : ""}${p.pathname}`;
    }
    Ja(e10) {
      var t10, i10;
      let { captureEventsBurstLimit: s10, captureEventsPerSecond: r10 } = this, n10 = this.Xa(), o10 = this.Ka("$session_id") ? null == (t10 = (i10 = this.instance).get_session_id) ? void 0 : t10.call(i10) : void 0, a10 = [`${e10} event(s) dropped since the last warning`, n10 ? `triggered on ${n10}` : void 0, o10 ? `session ${o10}` : void 0].filter(Boolean).join(", ");
      return !!this.instance.capture("$$client_ingestion_warning", { $$client_ingestion_warning_message: `posthog-js client rate limited: ${a10}. Config is set to ${r10} events per second and ${s10} events burst limit.` }, { skip_client_rate_limiting: true });
    }
    isServerRateLimited(e10) {
      let t10 = this.serverLimits[e10 || "events"] || false;
      return false !== t10 && (/* @__PURE__ */ new Date()).getTime() < t10;
    }
  };
  let nH = iE("[RemoteConfig]");
  var nz = class {
    constructor(e10) {
      this._instance = e10;
    }
    get remoteConfig() {
      var e10;
      return null == (e10 = w._POSTHOG_REMOTE_CONFIG) || null == (e10 = e10[this._instance.config.token]) ? void 0 : e10.config;
    }
    Ya(e10) {
      var t10, i10, s10;
      (null == (t10 = w.__PosthogExtensions__) ? void 0 : t10.loadExternalDependency) ? null == (i10 = w.__PosthogExtensions__) || null == (s10 = i10.loadExternalDependency) || s10.call(i10, this._instance, "remote-config", () => e10(this.remoteConfig)) : e10();
    }
    tl(e10) {
      this._instance._send_request({ method: "GET", url: this._instance.requestRouter.endpointFor("assets", `/array/${this._instance.config.token}/config`), callback: e10 });
    }
    load() {
      try {
        if (this.remoteConfig) return nH.info("Using preloaded remote config", this.remoteConfig), void this.el(this.remoteConfig);
        if (this._instance.il()) return void nH.warn("Remote config is disabled. Falling back to local config.");
        this.Ya((e10) => {
          e10 ? this.el(e10) : (nH.info("No config found after loading remote JS config. Falling back to JSON."), this.tl((e11) => {
            this.el(e11.json, e11);
          }));
        });
      } catch (e10) {
        nH.error("Error loading remote config", e10), this.el();
      }
    }
    el(e10, t10) {
      !e10 && t10 && (0 === t10.statusCode ? t10.error || nH.warn("Failed to fetch remote config from PostHog.") : nH.error("Failed to fetch remote config from PostHog."));
      try {
        this._instance.el(e10 ? { ok: true, config: e10 } : { ok: false });
      } catch (e11) {
        nH.error("Error applying remote config", e11);
      }
      if (false !== (null == e10 ? void 0 : e10.hasFeatureFlags) && !this._instance.config.advanced_disable_feature_flags_on_first_load) try {
        var i10;
        null == (i10 = this._instance.featureFlags) || i10.ensureFlagsLoaded();
      } catch (e11) {
        nH.error("Error loading feature flags", e11);
      }
    }
  }, nV = Uint8Array, nW = Uint16Array, nU = Uint32Array, nG = new nV([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), nK = new nV([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), nJ = new nV([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), nX = function(e10, t10) {
    for (var i10 = new nW(31), s10 = 0; 31 > s10; ++s10) i10[s10] = t10 += 1 << e10[s10 - 1];
    var r10 = new nU(i10[30]);
    for (s10 = 1; 30 > s10; ++s10) for (var n10 = i10[s10]; i10[s10 + 1] > n10; ++n10) r10[n10] = n10 - i10[s10] << 5 | s10;
    return [i10, r10];
  }, nY = nX(nG, 2), nQ = nY[1];
  nY[0][28] = 258, nQ[258] = 28;
  for (var nZ = nX(nK, 0)[1], n0 = new nW(32768), n1 = 0; 32768 > n1; ++n1) {
    var n2 = (43690 & n1) >>> 1 | (21845 & n1) << 1;
    n0[n1] = ((65280 & (n2 = (61680 & (n2 = (52428 & n2) >>> 2 | (13107 & n2) << 2)) >>> 4 | (3855 & n2) << 4)) >>> 8 | (255 & n2) << 8) >>> 1;
  }
  var n3 = function(e10, t10, i10) {
    for (var s10 = e10.length, r10 = 0, n10 = new nW(t10); s10 > r10; ++r10) ++n10[e10[r10] - 1];
    var o10, a10 = new nW(t10);
    for (r10 = 0; t10 > r10; ++r10) a10[r10] = a10[r10 - 1] + n10[r10 - 1] << 1;
    if (i10) {
      o10 = new nW(1 << t10);
      var l2 = 15 - t10;
      for (r10 = 0; s10 > r10; ++r10) if (e10[r10]) for (var u2 = r10 << 4 | e10[r10], h2 = t10 - e10[r10], c2 = a10[e10[r10] - 1]++ << h2, d2 = c2 | (1 << h2) - 1; d2 >= c2; ++c2) o10[n0[c2] >>> l2] = u2;
    } else for (o10 = new nW(s10), r10 = 0; s10 > r10; ++r10) o10[r10] = n0[a10[e10[r10] - 1]++] >>> 15 - e10[r10];
    return o10;
  }, n5 = new nV(288);
  for (n1 = 0; 144 > n1; ++n1) n5[n1] = 8;
  for (n1 = 144; 256 > n1; ++n1) n5[n1] = 9;
  for (n1 = 256; 280 > n1; ++n1) n5[n1] = 7;
  for (n1 = 280; 288 > n1; ++n1) n5[n1] = 8;
  var n4 = new nV(32);
  for (n1 = 0; 32 > n1; ++n1) n4[n1] = 5;
  var n6 = n3(n5, 9, 0), n8 = n3(n4, 5, 0), n9 = function(e10) {
    return (e10 / 8 | 0) + (7 & e10 && 1);
  }, n7 = function(e10, t10, i10) {
    (null == t10 || 0 > t10) && (t10 = 0), (null == i10 || i10 > e10.length) && (i10 = e10.length);
    var s10 = new (e10 instanceof nW ? nW : e10 instanceof nU ? nU : nV)(i10 - t10);
    return s10.set(e10.subarray(t10, i10)), s10;
  }, oe = function(e10, t10, i10) {
    var s10 = t10 / 8 | 0;
    e10[s10] |= i10 <<= 7 & t10, e10[s10 + 1] |= i10 >>> 8;
  }, ot = function(e10, t10, i10) {
    var s10 = t10 / 8 | 0;
    e10[s10] |= i10 <<= 7 & t10, e10[s10 + 1] |= i10 >>> 8, e10[s10 + 2] |= i10 >>> 16;
  }, oi = function(e10, t10) {
    for (var i10 = [], s10 = 0; e10.length > s10; ++s10) e10[s10] && i10.push({ s: s10, f: e10[s10] });
    var r10 = i10.length, n10 = i10.slice();
    if (!r10) return [new nV(0), 0];
    if (1 == r10) {
      var o10 = new nV(i10[0].s + 1);
      return o10[i10[0].s] = 1, [o10, 1];
    }
    i10.sort(function(e11, t11) {
      return e11.f - t11.f;
    }), i10.push({ s: -1, f: 25001 });
    var a10 = i10[0], l2 = i10[1], u2 = 0, h2 = 1, c2 = 2;
    for (i10[0] = { s: -1, f: a10.f + l2.f, l: a10, r: l2 }; h2 != r10 - 1; ) a10 = i10[i10[c2].f > i10[u2].f ? u2++ : c2++], l2 = i10[u2 != h2 && i10[c2].f > i10[u2].f ? u2++ : c2++], i10[h2++] = { s: -1, f: a10.f + l2.f, l: a10, r: l2 };
    var d2 = n10[0].s;
    for (s10 = 1; r10 > s10; ++s10) n10[s10].s > d2 && (d2 = n10[s10].s);
    var p2 = new nW(d2 + 1), f2 = os(i10[h2 - 1], p2, 0);
    if (f2 > t10) {
      s10 = 0;
      var g2 = 0, v2 = f2 - t10, _2 = 1 << v2;
      for (n10.sort(function(e11, t11) {
        return p2[t11.s] - p2[e11.s] || e11.f - t11.f;
      }); r10 > s10; ++s10) {
        var m2 = n10[s10].s;
        if (t10 >= p2[m2]) break;
        g2 += _2 - (1 << f2 - p2[m2]), p2[m2] = t10;
      }
      for (g2 >>>= v2; g2 > 0; ) {
        var y2 = n10[s10].s;
        t10 > p2[y2] ? g2 -= 1 << t10 - p2[y2]++ - 1 : ++s10;
      }
      for (; s10 >= 0 && g2; --s10) {
        var b2 = n10[s10].s;
        p2[b2] == t10 && (--p2[b2], ++g2);
      }
      f2 = t10;
    }
    return [new nV(p2), f2];
  }, os = function(e10, t10, i10) {
    return -1 == e10.s ? Math.max(os(e10.l, t10, i10 + 1), os(e10.r, t10, i10 + 1)) : t10[e10.s] = i10;
  }, or = function(e10) {
    for (var t10 = e10.length; t10 && !e10[--t10]; ) ;
    for (var i10 = new nW(++t10), s10 = 0, r10 = e10[0], n10 = 1, o10 = function(e11) {
      i10[s10++] = e11;
    }, a10 = 1; t10 >= a10; ++a10) if (e10[a10] == r10 && a10 != t10) ++n10;
    else {
      if (!r10 && n10 > 2) {
        for (; n10 > 138; n10 -= 138) o10(32754);
        n10 > 2 && (o10(n10 > 10 ? n10 - 11 << 5 | 28690 : n10 - 3 << 5 | 12305), n10 = 0);
      } else if (n10 > 3) {
        for (o10(r10), --n10; n10 > 6; n10 -= 6) o10(8304);
        n10 > 2 && (o10(n10 - 3 << 5 | 8208), n10 = 0);
      }
      for (; n10--; ) o10(r10);
      n10 = 1, r10 = e10[a10];
    }
    return [i10.subarray(0, s10), t10];
  }, on = function(e10, t10) {
    for (var i10 = 0, s10 = 0; t10.length > s10; ++s10) i10 += e10[s10] * t10[s10];
    return i10;
  }, oo = function(e10, t10, i10) {
    var s10 = i10.length, r10 = n9(t10 + 2);
    e10[r10] = 255 & s10, e10[r10 + 1] = s10 >>> 8, e10[r10 + 2] = 255 ^ e10[r10], e10[r10 + 3] = 255 ^ e10[r10 + 1];
    for (var n10 = 0; s10 > n10; ++n10) e10[r10 + n10 + 4] = i10[n10];
    return 8 * (r10 + 4 + s10);
  }, oa = function(e10, t10, i10, s10, r10, n10, o10, a10, l2, u2, h2) {
    oe(t10, h2++, i10), ++r10[256];
    for (var c2 = oi(r10, 15), d2 = c2[0], p2 = c2[1], f2 = oi(n10, 15), g2 = f2[0], v2 = f2[1], _2 = or(d2), m2 = _2[0], y2 = _2[1], b2 = or(g2), w2 = b2[0], x2 = b2[1], k2 = new nW(19), E2 = 0; m2.length > E2; ++E2) k2[31 & m2[E2]]++;
    for (E2 = 0; w2.length > E2; ++E2) k2[31 & w2[E2]]++;
    for (var $2 = oi(k2, 7), S2 = $2[0], I2 = $2[1], P2 = 19; P2 > 4 && !S2[nJ[P2 - 1]]; --P2) ;
    var F2, C2, O2, T2, A2 = u2 + 5 << 3, M2 = on(r10, n5) + on(n10, n4) + o10, R2 = on(r10, d2) + on(n10, g2) + o10 + 14 + 3 * P2 + on(k2, S2) + (2 * k2[16] + 3 * k2[17] + 7 * k2[18]);
    if (M2 >= A2 && R2 >= A2) return oo(t10, h2, e10.subarray(l2, l2 + u2));
    if (oe(t10, h2, 1 + (M2 > R2)), h2 += 2, M2 > R2) {
      F2 = n3(d2, p2, 0), C2 = d2, O2 = n3(g2, v2, 0), T2 = g2;
      var L2 = n3(S2, I2, 0);
      for (oe(t10, h2, y2 - 257), oe(t10, h2 + 5, x2 - 1), oe(t10, h2 + 10, P2 - 4), h2 += 14, E2 = 0; P2 > E2; ++E2) oe(t10, h2 + 3 * E2, S2[nJ[E2]]);
      h2 += 3 * P2;
      for (var D2 = [m2, w2], N2 = 0; 2 > N2; ++N2) {
        var j2 = D2[N2];
        for (E2 = 0; j2.length > E2; ++E2) oe(t10, h2, L2[B2 = 31 & j2[E2]]), h2 += S2[B2], B2 > 15 && (oe(t10, h2, j2[E2] >>> 5 & 127), h2 += j2[E2] >>> 12);
      }
    } else F2 = n6, C2 = n5, O2 = n8, T2 = n4;
    for (E2 = 0; a10 > E2; ++E2) if (s10[E2] > 255) {
      ot(t10, h2, F2[257 + (B2 = s10[E2] >>> 18 & 31)]), h2 += C2[B2 + 257], B2 > 7 && (oe(t10, h2, s10[E2] >>> 23 & 31), h2 += nG[B2]);
      var B2, q2 = 31 & s10[E2];
      ot(t10, h2, O2[q2]), h2 += T2[q2], q2 > 3 && (ot(t10, h2, s10[E2] >>> 5 & 8191), h2 += nK[q2]);
    } else ot(t10, h2, F2[s10[E2]]), h2 += C2[s10[E2]];
    return ot(t10, h2, F2[256]), h2 + C2[256];
  }, ol = new nU([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), ou = new nV(0), oh = (function() {
    for (var e10 = new nU(256), t10 = 0; 256 > t10; ++t10) {
      for (var i10 = t10, s10 = 9; --s10; ) i10 = (1 & i10 && 3988292384) ^ i10 >>> 1;
      e10[t10] = i10;
    }
    return e10;
  })(), oc = function(e10, t10, i10) {
    for (; i10; ++t10) e10[t10] = i10, i10 >>>= 8;
  };
  let od = !!g || !!f, op = /* @__PURE__ */ new WeakMap(), of = "text/plain", og = 0, ov = false, o_ = (e10, t10) => {
    let [i10, s10] = e10.split("#"), [r10, n10] = i10.split("?");
    if (!n10) return e10;
    let o10 = n10.split("&").filter((e11) => e11.split("=")[0] !== t10).join("&");
    return `${r10}${o10 ? `?${o10}` : ""}${s10 ? `#${s10}` : ""}`;
  }, om = (e10, t10, i10 = true) => {
    var s10;
    let [r10, n10] = e10.split("?"), o10 = tb({}, t10), a10 = null != (s10 = null == n10 ? void 0 : n10.split("&").map((e11) => {
      var t11;
      let [s11, r11] = e11.split("="), n11 = i10 && null != (t11 = o10[s11]) ? t11 : r11;
      return delete o10[s11], `${s11}=${n11}`;
    })) ? s10 : [], l2 = (function(e11, t11 = "&") {
      let i11, s11, r11 = [];
      return sB(e11, function(e12, t12) {
        z(e12) || z(t12) || "undefined" === t12 || (i11 = encodeURIComponent(e12 instanceof File ? e12.name : e12.toString()), s11 = encodeURIComponent(t12), r11[r11.length] = s11 + "=" + i11);
      }), r11.join(t11);
    })(o10);
    return l2 && a10.push(l2), a10.length > 0 ? `${r10}?${a10.join("&")}` : r10;
  }, oy = (e10) => {
    var t10, i10, s10, r10, n10, o10, a10, l2, u2, h2;
    if (e10.nl) return e10.nl;
    let { data: c2, compression: d2 } = e10;
    if (!c2) return;
    if (d2 === nO) {
      let e11 = (t10 = (function(e12) {
        var t11 = e12.length;
        if ("u" > typeof TextEncoder) return new TextEncoder().encode(e12);
        for (var i11 = new nV(e12.length + (e12.length >>> 1)), s11 = 0, r11 = function(e13) {
          i11[s11++] = e13;
        }, n11 = 0; t11 > n11; ++n11) {
          if (s11 + 5 > i11.length) {
            var o11 = new nV(s11 + 8 + (t11 - n11 << 1));
            o11.set(i11), i11 = o11;
          }
          var a11 = e12.charCodeAt(n11);
          128 > a11 ? r11(a11) : (2048 > a11 ? r11(192 | a11 >>> 6) : (a11 > 55295 && 57344 > a11 ? (r11(240 | (a11 = 65536 + (1047552 & a11) | 1023 & e12.charCodeAt(++n11)) >>> 18), r11(128 | a11 >>> 12 & 63)) : r11(224 | a11 >>> 12), r11(128 | a11 >>> 6 & 63)), r11(128 | 63 & a11));
        }
        return n7(i11, 0, s11);
      })(r9(c2)), i10 = { mtime: 0 }, s10 = 4294967295, r10 = { p(e12) {
        for (var t11 = s10, i11 = 0; e12.length > i11; ++i11) t11 = oh[255 & t11 ^ e12[i11]] ^ t11 >>> 8;
        s10 = t11;
      }, d: () => 4294967295 ^ s10 }, n10 = t10.length, r10.p(t10), u2 = (o10 = 10 + (i10.filename && i10.filename.length + 1 || 0), l2 = (function(e12, t11, i11, s11, r11) {
        var n11 = e12.length, o11 = new nV(s11 + n11 + 5 * (1 + Math.floor(n11 / 7e3)) + 8), a11 = o11.subarray(s11, o11.length - 8), l3 = 0;
        if (!t11 || 8 > n11) for (var u3 = 0; n11 >= u3; u3 += 65535) {
          var h3 = u3 + 65535;
          n11 > h3 ? l3 = oo(a11, l3, e12.subarray(u3, h3)) : (a11[u3] = r11, l3 = oo(a11, l3, e12.subarray(u3, n11)));
        }
        else {
          for (var c3 = ol[t11 - 1], d3 = c3 >>> 13, p3 = 8191 & c3, f2 = (1 << i11) - 1, g2 = new nW(32768), v2 = new nW(f2 + 1), _2 = Math.ceil(i11 / 3), m2 = 2 * _2, y2 = function(t12) {
            return (e12[t12] ^ e12[t12 + 1] << _2 ^ e12[t12 + 2] << m2) & f2;
          }, b2 = new nU(25e3), w2 = new nW(288), x2 = new nW(32), k2 = 0, E2 = 0, $2 = (u3 = 0, 0), S2 = 0, I2 = 0; n11 > u3; ++u3) {
            var P2 = y2(u3), F2 = 32767 & u3, C2 = v2[P2];
            if (g2[F2] = C2, v2[P2] = F2, u3 >= S2) {
              var O2 = n11 - u3;
              if ((k2 > 7e3 || $2 > 24576) && O2 > 423) {
                l3 = oa(e12, a11, 0, b2, w2, x2, E2, $2, I2, u3 - I2, l3), $2 = k2 = E2 = 0, I2 = u3;
                for (var T2 = 0; 286 > T2; ++T2) w2[T2] = 0;
                for (T2 = 0; 30 > T2; ++T2) x2[T2] = 0;
              }
              var A2 = 2, M2 = 0, R2 = p3, L2 = F2 - C2 & 32767;
              if (O2 > 2 && P2 == y2(u3 - L2)) for (var D2 = Math.min(d3, O2) - 1, N2 = Math.min(32767, u3), j2 = Math.min(258, O2); N2 >= L2 && --R2 && F2 != C2; ) {
                if (e12[u3 + A2] == e12[u3 + A2 - L2]) {
                  for (var B2 = 0; j2 > B2 && e12[u3 + B2] == e12[u3 + B2 - L2]; ++B2) ;
                  if (B2 > A2) {
                    if (A2 = B2, M2 = L2, B2 > D2) break;
                    var q2 = Math.min(L2, B2 - 2), H2 = 0;
                    for (T2 = 0; q2 > T2; ++T2) {
                      var z2 = u3 - L2 + T2 + 32768 & 32767, V2 = z2 - g2[z2] + 32768 & 32767;
                      V2 > H2 && (H2 = V2, C2 = z2);
                    }
                  }
                }
                L2 += (F2 = C2) - (C2 = g2[F2]) + 32768 & 32767;
              }
              if (M2) {
                b2[$2++] = 268435456 | nQ[A2] << 18 | nZ[M2];
                var W2 = 31 & nQ[A2], U2 = 31 & nZ[M2];
                E2 += nG[W2] + nK[U2], ++w2[257 + W2], ++x2[U2], S2 = u3 + A2, ++k2;
              } else b2[$2++] = e12[u3], ++w2[e12[u3]];
            }
          }
          l3 = oa(e12, a11, r11, b2, w2, x2, E2, $2, I2, u3 - I2, l3), r11 || (l3 = oo(a11, l3, ou));
        }
        return n7(o11, 0, s11 + n9(l3) + 8);
      })(t10, null == i10.level ? 6 : i10.level, null == i10.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(t10.length)))) : 12 + i10.mem, o10, !a10)).length, (function(e12, t11) {
        var i11 = t11.filename;
        if (e12[0] = 31, e12[1] = 139, e12[2] = 8, e12[8] = 2 > t11.level ? 4 : 2 * (9 == t11.level), e12[9] = 3, 0 != t11.mtime && oc(e12, 4, Math.floor(new Date(t11.mtime || Date.now()) / 1e3)), i11) {
          e12[3] = 8;
          for (var s11 = 0; i11.length >= s11; ++s11) e12[s11 + 10] = i11.charCodeAt(s11);
        }
      })(l2, i10), oc(l2, u2 - 8, r10.d()), oc(l2, u2 - 4, n10), l2);
      return { contentType: of, body: e11.buffer.slice(e11.byteOffset, e11.byteOffset + e11.byteLength), estimatedSize: e11.byteLength };
    }
    if (d2 === nT) {
      let e11, t11 = "data=" + encodeURIComponent("string" == typeof (e11 = (h2 = r9(c2)) ? btoa(encodeURIComponent(h2).replace(/%([0-9A-F]{2})/g, (e12, t12) => String.fromCharCode(parseInt(t12, 16)))) : h2) ? e11 : r9(e11));
      return { contentType: "application/x-www-form-urlencoded", body: t11, estimatedSize: new Blob([t11]).size };
    }
    let p2 = r9(c2);
    return { contentType: "application/json", body: p2, estimatedSize: new Blob([p2]).size };
  }, ob = (e10) => {
    var t10;
    let i10, s10 = () => "sendBeacon" === e10.transport ? { url: om(e10.url, { compression: nT }), encodedBody: oy(tb(tb({}, e10), {}, { compression: nT, nl: void 0 })) } : { url: o_(e10.url, "compression"), encodedBody: oy(tb(tb({}, e10), {}, { compression: void 0, nl: void 0 })) };
    try {
      i10 = oy(e10);
    } catch (t11) {
      if (t6(e10.compression, ne(e10.url, "compression"))) return ik.error("Failed to gzip request body, sending uncompressed payload", t11), s10();
      throw t11;
    }
    return !(i10 && t6(e10.compression, ne(e10.url, "compression"))) || ((t10 = i10.body) instanceof ArrayBuffer ? t4(new Uint8Array(t10)) : ArrayBuffer.isView(t10) && t4(new Uint8Array(t10.buffer, t10.byteOffset, t10.byteLength))) ? { url: e10.url, encodedBody: i10 } : (ov = true, s10());
  }, ow = (e10) => {
    try {
      return ob(e10);
    } catch (i10) {
      var t10;
      return ik.error(i10), void (null == (t10 = e10.callback) || t10.call(e10, { statusCode: 0, error: i10 }));
    }
  }, ox = (E = ea(function* (e10) {
    let t10 = yield (function(e11) {
      return ie.apply(this, arguments);
    })(r9(e10.data), k.DEBUG, { rethrow: true });
    if (!t10) return e10;
    let i10 = yield t10.arrayBuffer();
    return tb(tb({}, e10), {}, { nl: { contentType: of, body: i10, estimatedSize: i10.byteLength } });
  }), function(e10) {
    return E.apply(this, arguments);
  }), ok = /Failed to fetch|NetworkError|Load failed/i, oE = (e10) => "TypeError" === (null == e10 ? void 0 : e10.name) && ok.test((null == e10 ? void 0 : e10.message) || ""), o$ = (e10) => {
    try {
      let t10 = (function(e11, t11 = Date.now()) {
        if ("string" != typeof e11 || !e11) return;
        let i10 = e11.trim(), s10 = /^\d+\s*,/.test(i10) ? i10.slice(0, i10.indexOf(",")).trim() : i10;
        if (/^\d+$/.test(s10)) {
          let e12 = 1e3 * Math.min(Number(s10), 300);
          return e12 > 0 ? e12 : void 0;
        }
        if (!/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]*[ ,]/.test(s10)) return;
        let r10 = /^\w{3} \w{3} /.test(s10) ? s10 + " GMT" : s10, n10 = Date.parse(r10) - t11;
        return Number.isFinite(n10) && n10 > 0 ? Math.min(n10, 3e5) : void 0;
      })(e10());
      return z(t10) ? void 0 : Math.min(t10, 3e4);
    } catch (e11) {
      return;
    }
  }, oS = (e10) => {
    let t10 = ow(e10);
    if (!t10) return;
    let i10 = new g();
    op.set(i10, true);
    let { url: s10, encodedBody: r10 } = t10;
    i10.open(e10.method || "GET", s10, true);
    let { contentType: n10, body: o10 } = null != r10 ? r10 : {};
    sB(e10.headers, function(e11, t11) {
      i10.setRequestHeader(t11, e11);
    }), n10 && i10.setRequestHeader("Content-Type", n10), e10.timeout && (i10.timeout = e10.timeout), i10.onreadystatechange = () => {
      if (4 === i10.readyState) {
        var t11;
        let s11 = { statusCode: i10.status, text: i10.responseText };
        if (200 === i10.status) try {
          s11.json = JSON.parse(i10.responseText);
        } catch (e11) {
        }
        null == (t11 = e10.callback) || t11.call(e10, s11, o$(() => i10.getResponseHeader("Retry-After")));
      }
    }, i10.send(o10);
  }, oI = (e10) => {
    let t10 = ow(e10);
    if (!t10) return;
    let { url: i10, encodedBody: s10 } = t10, { contentType: r10, body: n10, estimatedSize: o10 } = null != s10 ? s10 : {}, a10 = new Headers();
    sB(e10.headers, function(e11, t11) {
      a10.append(t11, e11);
    }), r10 && a10.append("Content-Type", r10);
    let l2 = null, u2 = false;
    if (v) {
      let t11 = new v();
      l2 = { signal: t11.signal, timeout: setTimeout(() => {
        var i11;
        u2 = true;
        try {
          t11.abort(td("AbortError", "PostHog request timed out" + ((i11 = e10.timeout) ? ` after ${i11}ms` : "")));
        } catch (e11) {
          c2(e11);
        }
      }, e10.timeout) };
    }
    let h2 = false, c2 = (t11) => {
      var i11;
      h2 || (h2 = true, u2 && "AbortError" === (null == t11 ? void 0 : t11.name) || oE(t11) ? ik.warn(t11) : ik.error(t11), null == (i11 = e10.callback) || i11.call(e10, { statusCode: 0, error: t11 }));
    }, d2 = 0, p2 = () => {
      og -= d2, d2 = 0, l2 && clearTimeout(l2.timeout);
    };
    try {
      let t11 = tb({ method: (null == e10 ? void 0 : e10.method) || "GET", headers: a10, referrerPolicy: "strict-origin", body: n10, signal: null == l2 ? void 0 : l2.signal }, e10.fetchOptions), s11 = null != o10 ? o10 : z(n10) ? 0 : void 0;
      t11.keepalive = "POST" === t11.method && !e10.sl && false !== t11.keepalive && t11.body === n10 && !z(s11) && s11 >= 0 && 52428.8 > og + s11, t11.keepalive && (d2 = s11, og += d2), f(i10, t11).then((t12) => t12.text().then((i11) => {
        var s12;
        if (h2) return;
        let r11 = { statusCode: t12.status, text: i11 };
        if (200 === t12.status) try {
          r11.json = JSON.parse(i11);
        } catch (e11) {
          ik.error(e11);
        }
        h2 = true, p2(), null == (s12 = e10.callback) || s12.call(e10, r11, o$(() => t12.headers.get("Retry-After")));
      })).catch((e11) => {
        p2(), c2(e11);
      }).finally(p2);
    } catch (e11) {
      p2(), c2(e11);
    }
  }, oP = (e10) => {
    try {
      var t10;
      let { url: i10, encodedBody: s10 } = ob(e10), { contentType: r10, body: n10, estimatedSize: o10 } = null != s10 ? s10 : {};
      if (!n10) return;
      let a10 = n10 instanceof Blob ? n10 : new Blob([n10], { type: r10 });
      if (c.sendBeacon(i10, a10)) return;
      let l2 = j(e10.data) ? e10.data : null == (t10 = e10.data) ? void 0 : t10.batch;
      if (j(l2) && l2.length > 1 && (null != o10 ? o10 : 0) > 16384) {
        let t11 = Math.ceil(l2.length / 2), i11 = (t12) => j(e10.data) ? t12 : tb(tb({}, e10.data), {}, { batch: t12 });
        return oP(tb(tb({}, e10), {}, { data: i11(l2.slice(0, t11)) })), void oP(tb(tb({}, e10), {}, { data: i11(l2.slice(t11)) }));
      }
      ik.warn(`Beacon of ~${null != o10 ? o10 : 0} bytes was rejected by the browser, falling back to ${f ? "fetch" : "XHR"}`), f ? oI(tb(tb({}, e10), {}, { sl: true })) : oS(e10);
    } catch (e11) {
      ik.warn("Beacon send failed", e11);
    }
  }, oF = (e10, t10, i10, s10) => {
    let r10 = "query" === s10 ? "POST" === t10 ? "sent_at" : "_" : void 0;
    return om(i10 === nO ? o_(e10, "compression") : e10, tb(tb({}, r10 ? { [r10]: Date.now().toString() } : {}), i10 === nO ? {} : { compression: i10 }));
  }, oC = (o = [], f && o.push({ transport: "fetch", method: oI }), g && o.push({ transport: "XHR", method: oS }), (null == c ? void 0 : c.sendBeacon) && o.push({ transport: "sendBeacon", method: oP }), o), oO = !od && -1 === (null == m ? void 0 : m.indexOf("MSIE")) && -1 === (null == m ? void 0 : m.indexOf("Mozilla"));
  function oT(e10, t10, i10) {
    var s10, r10, n10;
    i10 && (t10 = tb(tb({}, t10), {}, { callback: (e11) => i10(e11) })), e10.__loaded ? oO ? e10.__request_queue.push(t10) : e10.rateLimiter.isServerRateLimited(t10.batchKey) ? t10.fireCallbackOnDrop && (null == (r10 = t10.callback) || r10.call(t10, { statusCode: 429 })) : (t10.transport = t10.transport || e10.config.api_transport, t10.headers = tb(tb({}, e10.config.request_headers), t10.headers), t10.compression = "best-available" === t10.compression ? null != (s10 = e10.compression) ? s10 : t10.compressionFallback : t10.compression, (z(e10.config.disable_beacon) ? e10.config.__preview_disable_beacon : e10.config.disable_beacon) && (t10.disableTransport = ["sendBeacon"]), t10.fetchOptions = t10.fetchOptions || e10.config.fetch_options, ((e11, t11) => {
      var i11, s11, r11, n11, o10, a10;
      let l2, u2, h2 = tb(tb({}, e11), {}, { callback: null != t11 ? t11 : (t12) => {
        var i12;
        return null == (i12 = e11.callback) ? void 0 : i12.call(e11, t12);
      } });
      h2.timeout = h2.timeout || 6e4;
      let c2 = null != (i11 = h2.transport) ? i11 : "fetch";
      "sendBeacon" === c2 && z(h2.compression) && h2.data && (h2.compression = nT), "POST" === h2.method && h2.data && ("capture-body" === h2.timestampMode ? (u2 = (l2 = (j(n11 = h2.data) ? n11 : [n11]).map((e12) => tb(tb({}, e12), e12.timestamp instanceof Date && !isNaN(e12.timestamp.getTime()) ? { timestamp: e12.timestamp.toISOString() } : {})))[0], h2.data = { api_key: null != (o10 = null == u2 || null == (a10 = u2.properties) ? void 0 : a10.token) ? o10 : null == u2 ? void 0 : u2.token, batch: l2, sent_at: (/* @__PURE__ */ new Date()).toISOString() }) : "body" === h2.timestampMode && (h2.data = ((e12, t12 = (/* @__PURE__ */ new Date()).toISOString()) => j(e12) ? e12.map((e13) => tb(tb({}, e13), {}, { sent_at: t12 })) : tb(tb({}, e12), {}, { sent_at: t12 }))(h2.data))), h2.url = oF(h2.url, h2.method, h2.compression, h2.timestampMode);
      let d2 = oC.filter((e12) => !h2.disableTransport || !e12.transport || !h2.disableTransport.includes(e12.transport)), p2 = null != (s11 = null == (r11 = (function(e12, t12) {
        for (let i12 = 0; e12.length > i12; i12++) if (t12(e12[i12])) return e12[i12];
      })(d2, (e12) => e12.transport === c2)) ? void 0 : r11.method) ? s11 : d2[0].method;
      if (!p2) throw Error("No available transport method");
      let f2 = (e12) => {
        try {
          p2(e12);
        } catch (e13) {
          var t12;
          oE(e13) ? ik.warn(e13) : ik.error(e13), null == (t12 = h2.callback) || t12.call(h2, { statusCode: 0, error: e13 });
        }
      };
      "sendBeacon" !== c2 && !h2.preferSyncCompression && h2.data && h2.compression === nO && _ && "u" > typeof Promise && !ov ? ox(h2).then((e12) => {
        f2(e12);
      }).catch((t12) => {
        t8(t12) ? (ov = true, f2(tb(tb({}, h2), {}, { compression: void 0, url: oF(e11.url, e11.method, void 0, e11.timestampMode) }))) : (((e12) => {
          if (!e12 || "object" != typeof e12) return false;
          let t13 = "name" in e12 ? String(e12.name) : "";
          return t8(e12) || t13 === t5;
        })(t12) && (ov = true), f2(h2));
      }) : f2(h2);
    })(t10, (s11, r11) => {
      var n11, o10, a10;
      e10.rateLimiter.checkForLimiting(s11), 400 > s11.statusCode || null == (n11 = (o10 = e10.config).on_request_error) || n11.call(o10, s11), i10 ? i10(s11, r11) : null == (a10 = t10.callback) || a10.call(t10, s11);
    })) : t10.fireCallbackOnDrop && (null == (n10 = t10.callback) || n10.call(t10, { statusCode: 0 }));
  }
  var oA = class {
    constructor(e10, t10) {
      this.rl = true, this.ol = [], this.al = eh((null == t10 ? void 0 : t10.flush_interval_ms) || 3e3, 250, 5e3, ik.createLogger("flush interval"), 3e3), this.ll = e10;
    }
    enqueue(e10) {
      this.ol.push(e10), this.ul || this.hl();
    }
    unload() {
      this.cl();
      let e10 = Object.values(this.ol.length > 0 ? this.dl() : {});
      [...e10.filter((e11) => 0 === e11.url.indexOf("/e")), ...e10.filter((e11) => 0 !== e11.url.indexOf("/e"))].map((e11) => {
        this.vl(e11, "sendBeacon");
      });
    }
    enable() {
      this.rl = false, this.hl();
    }
    hl() {
      this.rl || (this.ul = setTimeout(() => {
        if (this.cl(), this.ol.length > 0) {
          let e10 = this.dl();
          for (let t10 in e10) this.vl(e10[t10]);
        }
      }, this.al));
    }
    vl(e10, t10) {
      try {
        this.ll(e10, t10);
      } catch (e11) {
        ik.error(e11);
      }
    }
    cl() {
      clearTimeout(this.ul), this.ul = void 0;
    }
    dl() {
      let e10 = {};
      return sB(this.ol, (t10) => {
        var i10;
        let s10 = ((t10 ? t10.batchKey : null) || t10.url) + (t10.batchGroup ? `:${t10.batchGroup}` : "");
        z(e10[s10]) && (e10[s10] = tb(tb({}, t10), {}, { data: [] })), null == (i10 = e10[s10].data) || i10.push(t10.data);
      }), this.ol = [], e10;
    }
  };
  let oM = ["retriesPerformedSoFar"];
  var oR = class {
    constructor(e10) {
      this._instance = e10, this.fl = false, this.pl = 3e3, this.ol = [], this.ol = [], this.gl = true, this.resume();
    }
    resume() {
      !z(u) && "onLine" in u.navigator && (this.gl = u.navigator.onLine, this.ml || (this.ml = () => {
        this.gl = true, this.yl();
      }, this.bl = () => {
        this.gl = false;
      }, sG(u, "online", this.ml), sG(u, "offline", this.bl)));
    }
    get length() {
      return this.ol.length;
    }
    retriableRequest(e10, t10) {
      let { retriesPerformedSoFar: i10 } = e10, s10 = it(e10, oM);
      J(i10) && (s10.url = om(s10.url, { retry_count: i10 })), oT(this._instance, t10 ? tb(tb({}, s10), {}, { transport: t10 }) : s10, (e11, t11) => {
        var r10;
        if (200 !== e11.statusCode && (400 > e11.statusCode || e11.statusCode >= 500)) {
          if ((0 === e11.statusCode ? 3 : 10) > (null != i10 ? i10 : 0)) return void this.Ls(tb({ retriesPerformedSoFar: i10 }, s10), t11);
          0 === e11.statusCode && ik.warn(`Request failed before receiving an HTTP response; this can happen due to network issues, CORS, browser blocking, or ad blockers. Stopped retrying after ${null != i10 ? i10 : 0} retries.`);
        }
        null == (r10 = s10.callback) || r10.call(s10, e11);
      });
    }
    Ls(e10, t10) {
      let i10, s10, r10, n10 = e10.retriesPerformedSoFar || 0;
      e10.retriesPerformedSoFar = n10 + 1;
      let o10 = Math.max((r10 = (Math.random() - 0.5) * ((s10 = Math.min(18e5, i10 = 3e3 * Math.pow(2, n10))) - i10 / 2), Math.ceil(s10 + r10)), null != t10 ? t10 : 0), a10 = Date.now() + o10;
      this.ol.push({ retryAt: a10, requestOptions: e10 });
      let l2 = `Enqueued failed request for retry in ${o10}`;
      navigator.onLine || (l2 += " (Browser is offline)"), ik.warn(l2), this.fl || (this.fl = true, this._l());
    }
    _l() {
      (this.wl && clearTimeout(this.wl), 0 === this.ol.length) ? (this.fl = false, this.wl = void 0) : this.wl = setTimeout(() => {
        this.gl && this.ol.length > 0 && this.yl(), this._l();
      }, this.pl);
    }
    yl() {
      let e10 = Date.now(), t10 = [], i10 = this.ol.filter((i11) => e10 > i11.retryAt || (t10.push(i11), false));
      if (this.ol = t10, i10.length > 0) for (let { requestOptions: e11 } of i10) this.retriableRequest(e11);
    }
    unload() {
      for (let { requestOptions: e10 } of (this.wl && (clearTimeout(this.wl), this.wl = void 0), this.fl = false, z(u) || (this.ml && (u.removeEventListener("online", this.ml), this.ml = void 0), this.bl && (u.removeEventListener("offline", this.bl), this.bl = void 0)), this.ol)) try {
        this._instance._send_request(tb(tb({}, e10), {}, { transport: "sendBeacon" }));
      } catch (e11) {
        ik.error(e11);
      }
      this.ol = [];
    }
  }, oL = class {
    constructor(e10) {
      this._instance = e10, this.kl = () => {
        var e11, t10, i10, s10;
        this.Sl || (this.Sl = {});
        let r10 = this.scrollElement(), n10 = this.scrollY(), o10 = r10 ? Math.max(0, r10.scrollHeight - r10.clientHeight) : 0, a10 = n10 + ((null == r10 ? void 0 : r10.clientHeight) || 0), l2 = (null == r10 ? void 0 : r10.scrollHeight) || 0;
        this.Sl.lastScrollY = Math.ceil(n10), this.Sl.maxScrollY = Math.max(n10, null != (e11 = this.Sl.maxScrollY) ? e11 : 0), this.Sl.maxScrollHeight = Math.max(o10, null != (t10 = this.Sl.maxScrollHeight) ? t10 : 0), this.Sl.lastContentY = a10, this.Sl.maxContentY = Math.max(a10, null != (i10 = this.Sl.maxContentY) ? i10 : 0), this.Sl.maxContentHeight = Math.max(l2, null != (s10 = this.Sl.maxContentHeight) ? s10 : 0);
      };
    }
    get xl() {
      return this._instance.config.scroll_root_selector;
    }
    getContext() {
      return this.Sl;
    }
    resetContext() {
      let e10 = this.Sl;
      return this.Sl = void 0, setTimeout(this.kl, 0), e10;
    }
    startMeasuringScrollPosition() {
      sG(u, "scroll", this.kl, { capture: true }), sG(u, "scrollend", this.kl, { capture: true }), sG(u, "resize", this.kl);
    }
    scrollElement() {
      var e10, t10;
      if (this.xl) {
        for (let t11 of j(this.xl) ? this.xl : [this.xl]) {
          let i10 = null == u || null == (e10 = u.document) ? void 0 : e10.querySelector(t11);
          if (i10) return i10;
        }
        return;
      }
      return null == u || null == (t10 = u.document) ? void 0 : t10.documentElement;
    }
    Cl(e10) {
      var t10, i10;
      if (this.xl) {
        let t11 = this.scrollElement();
        return t11 && t11["y" === e10 ? "scrollTop" : "scrollLeft"] || 0;
      }
      return u ? "y" === e10 ? u.scrollY || u.pageYOffset || (null == (t10 = u.document) || null == (t10 = t10.documentElement) ? void 0 : t10.scrollTop) || 0 : u.scrollX || u.pageXOffset || (null == (i10 = u.document) || null == (i10 = i10.documentElement) ? void 0 : i10.scrollLeft) || 0 : 0;
    }
    scrollY() {
      return this.Cl("y");
    }
    scrollX() {
      return this.Cl("x");
    }
  };
  let oD = (e10) => ng(null == e10 ? void 0 : e10.config.mask_personal_data_properties, null == e10 ? void 0 : e10.config.custom_personal_data_properties, null == e10 ? void 0 : e10.config.disable_capture_url_hashes);
  var oN = class {
    constructor(e10, t10, i10, s10) {
      this.qe = (e11) => {
        let t11 = this.$l();
        if (t11 && t11.sessionId === e11) return;
        let i11 = { sessionId: e11, props: this.Tl(this._instance) };
        this.Il.register({ [sc]: i11 });
      }, this._instance = e10, this.Ml = t10, this.Il = i10, this.Tl = s10 || oD, this.Ml.onSessionId(this.qe);
    }
    $l() {
      return this.Il.props[sc];
    }
    getSetOnceProps() {
      var e10;
      let t10 = null == (e10 = this.$l()) ? void 0 : e10.props;
      return t10 ? "r" in t10 ? nv(t10, this._instance.config.disable_capture_url_hashes) : { $referring_domain: t10.referringDomain, $pathname: t10.initialPathName, utm_source: t10.utm_source, utm_campaign: t10.utm_campaign, utm_medium: t10.utm_medium, utm_content: t10.utm_content, utm_term: t10.utm_term } : {};
    }
    getSessionProps() {
      let e10 = {};
      return sB(sV(this.getSetOnceProps()), (t10, i10) => {
        "$current_url" === i10 && (i10 = "url"), e10[`$session_entry_${M(i10)}`] = t10;
      }), e10;
    }
  }, oj = class {
    on(e10, t10) {
      return this.El[e10] || (this.El[e10] = []), this.El[e10].push(t10), () => {
        this.El[e10] = this.El[e10].filter((e11) => e11 !== t10);
      };
    }
    emit(e10, t10) {
      for (let i10 of this.El[e10] || []) i10(t10);
      for (let i10 of this.El["*"] || []) i10(e10, t10);
    }
    constructor() {
      this.El = {};
    }
  };
  let oB = iE("[SessionId]");
  var oq = class {
    on(e10, t10) {
      return this.Pl.on(e10, t10);
    }
    constructor(e10, t10, i10) {
      var s10;
      if (this.Rl = null, this.Al = null, this.Fl = [], this.Ol = void 0, this.Dl = false, this.Pl = new oj(), this.Ll = (e11, t11) => !(!J(e11) || !J(t11)) && Math.abs(e11 - t11) > this.sessionTimeoutMs, !e10.persistence) throw Error("SessionIdManager requires a PostHogPersistence instance");
      if ("always" === e10.config.cookieless_mode) throw Error('SessionIdManager cannot be used with cookieless_mode="always"');
      this.Ir = e10.config, this.Il = e10.persistence, this.je = void 0, this.Xt = void 0, this._sessionStartTimestamp = null, this.Nl = void 0, this._sessionActivityTimestamp = null, this.ql = t10 || s0, this.jl = i10 || s0;
      const r10 = this.Ir.persistence_name || this.Ir.token;
      if (this._sessionTimeoutMs = 1e3 * eh(this.Ir.session_idle_timeout_seconds || 1800, 60, 36e3, oB.createLogger("session_idle_timeout_seconds"), 1800), e10.register({ $configured_session_timeout_ms: this._sessionTimeoutMs }), this.Bl(), this.Hl = "ph_" + r10 + "_window_id", this.zl = "ph_" + r10 + "_primary_window_exists", this.Ul()) {
        const e11 = rh.Dt(this.Hl), t11 = rh.Dt(this.zl);
        e11 && !t11 ? this.je = e11 : rh.Lt(this.Hl), rh.$t(this.zl, true);
      }
      (null == (s10 = this.Ir.bootstrap) ? void 0 : s10.sessionID) && this.setBootstrapSessionId(this.Ir.bootstrap.sessionID), this.Wl();
    }
    get sessionTimeoutMs() {
      return this._sessionTimeoutMs;
    }
    onSessionId(e10) {
      return z(this.Fl) && (this.Fl = []), this.Fl.push(e10), this.Xt && e10(this.Xt, this.je), () => {
        this.Fl = this.Fl.filter((t10) => t10 !== e10);
      };
    }
    Ul() {
      return "memory" !== this.Ir.persistence && !this.Il.hi && rh.Et();
    }
    Vl(e10) {
      e10 !== this.je && (this.je = e10, this.Ul() && rh.$t(this.Hl, e10));
    }
    Gl() {
      return this.je ? this.je : this.Ul() ? rh.Dt(this.Hl) : null;
    }
    Zl(e10) {
      let t10 = this.Rl;
      return !U(t10) && !U(e10) && 5e3 > Math.abs(e10 - t10);
    }
    Ql(e10, t10, i10) {
      let s10 = t10 !== this._sessionActivityTimestamp, r10 = e10 === this.Xt && i10 === this._sessionStartTimestamp;
      this._sessionStartTimestamp = i10, this._sessionActivityTimestamp = t10, this.Xt = e10, r10 && !s10 || r10 && this.Zl(t10) || (this.Rl = t10, this.Il.register({ [iX]: [t10, e10, i10] }));
    }
    Jl() {
      var e10;
      let t10 = null == (e10 = this.Ir) ? void 0 : e10.persistence_save_debounce_ms;
      return J(t10) && t10 > 0;
    }
    Kl() {
      this.Jl() ? this.Il.refreshKey(iX) : (this.Il.flush(), this.Il.load());
    }
    Xl() {
      var e10;
      if (U(this._sessionActivityTimestamp) || this._sessionActivityTimestamp === this.Rl) return;
      this.Kl();
      let [, t10, i10] = this.Yl();
      t10 === this.Xt && i10 === this._sessionStartTimestamp && (this.Rl = this._sessionActivityTimestamp, this.Il.register({ [iX]: [this._sessionActivityTimestamp, null != (e10 = this.Xt) ? e10 : null, this._sessionStartTimestamp] }), this.Il.flush());
    }
    tu() {
      let [e10] = this.Yl();
      return Math.max(J(e10) ? e10 : 0, J(this._sessionActivityTimestamp) ? this._sessionActivityTimestamp : 0);
    }
    eu(e10) {
      return this.Kl(), this.Ll(e10, this.tu());
    }
    Yl() {
      let e10 = this.Il.props[iX];
      return j(e10) && 2 === e10.length && e10.push(e10[0]), e10 || [0, null, 0];
    }
    resetSessionId() {
      this.Rl = null, this.Nl = void 0, clearTimeout(this.iu), this.iu = void 0, this.Ql(null, null, null);
    }
    setBootstrapSessionId(e10, t10 = false) {
      let i10 = ((e11, t11 = (/* @__PURE__ */ new Date()).getTime()) => {
        try {
          let i11 = ((e12) => {
            let t12 = e12.replace(/-/g, "");
            if (32 !== t12.length) throw Error("Not a valid UUID");
            if ("7" !== t12[12]) throw Error("Not a UUIDv7");
            return parseInt(t12.substring(0, 12), 16);
          })(e11);
          return i11 > t11 + 6e4 ? void oB.error("Bootstrap sessionID cannot be in the future") : i11;
        } catch (e12) {
          return void oB.error("Invalid sessionID in bootstrap", e12);
        }
      })(e10);
      return !z(i10) && (t10 ? this.Nl = { sessionId: e10, sessionStartTimestamp: i10 } : this.Ql(e10, (/* @__PURE__ */ new Date()).getTime(), i10), true);
    }
    destroy() {
      this.Dl = true, this.Xl(), clearTimeout(this.iu), this.iu = void 0, this.Ol && u && (u.removeEventListener(sM, this.Ol, { capture: false }), this.Ol = void 0), this.Fl = [];
    }
    Wl() {
      this.Ol = () => {
        this.Xl(), this.Ul() && rh.Lt(this.zl);
      }, sG(u, sM, this.Ol, { capture: false });
    }
    checkAndGetSessionAndWindowId(e10 = false, t10 = null, i10 = false) {
      if ("always" === this.Ir.cookieless_mode) throw Error('checkAndGetSessionAndWindowId should not be called with cookieless_mode="always"');
      let s10 = t10 || (/* @__PURE__ */ new Date()).getTime(), r10 = this.Xt;
      if (i10) this.Al = s10;
      else if (U(this.Al) || this.Al > s10 || s10 - this.Al >= 1e3) {
        var n10, o10;
        null == (n10 = (o10 = this.Il).syncCookieProperties) || n10.call(o10), this.Al = s10;
      }
      let [, a10, l2] = this.Yl(), u2 = !z(r10) && a10 !== r10, h2 = this.tu(), c2 = this.Gl(), d2 = this.Nl, p2 = !!d2 && (d2.sessionStartTimestamp > s10 + 6e4 || s10 - d2.sessionStartTimestamp > 864e5), f2 = d2 ? p2 : J(l2) && Math.abs(s10 - l2) > 864e5, g2 = false, v2 = u2, _2 = !a10 || !!d2, m2 = a10, y2 = !_2 && !e10 && this.Ll(s10, h2);
      if (y2 && ((y2 = this.eu(s10)) || oB.info("cross-tab refresh kept the session alive", { sessionId: a10 }), [, a10, l2] = this.Yl(), y2 || (_2 = !a10 || !!d2)), _2 || y2 || f2) {
        v2 = false;
        let e11 = d2 && !p2;
        a10 = e11 ? d2.sessionId : this.ql(), c2 = this.jl(), oB.info("new session ID assigned", { sessionId: a10, windowId: c2, bootstrapped: !!e11, changeReason: { noSessionId: _2, activityTimeout: y2, sessionPastMaximumLength: f2 } }), l2 = e11 ? d2.sessionStartTimestamp : s10, this.Nl = void 0, g2 = true;
      } else c2 || (c2 = this.jl(), g2 = true), (v2 = v2 || a10 !== m2) && (oB.info("adopted cross-tab session id", { sessionId: a10, windowId: c2 }), g2 = true);
      let b2 = J(h2) && e10 && !f2 ? h2 : s10, w2 = J(l2) ? l2 : (/* @__PURE__ */ new Date()).getTime();
      this.Vl(c2), this.Ql(a10, b2, w2), e10 || this.Bl();
      let x2 = { noSessionId: _2, activityTimeout: y2, sessionPastMaximumLength: f2, crossTabAdoption: v2 };
      return g2 && this.Fl.forEach((e11) => e11(a10, c2, x2)), { sessionId: a10, windowId: c2, sessionStartTimestamp: w2, changeReason: g2 ? x2 : void 0, lastActivityTimestamp: h2 };
    }
    Bl() {
      this.Dl || (clearTimeout(this.iu), this.iu = setTimeout(() => {
        if (!this.Dl) if (this.eu((/* @__PURE__ */ new Date()).getTime())) {
          let e10 = this.Xt;
          this.resetSessionId(), this.Pl.emit("forcedIdleReset", { idleSessionId: e10 });
        } else this.Bl();
      }, 1.1 * this.sessionTimeoutMs));
    }
  };
  let oH = function(e10, t10) {
    if (!e10) return false;
    let i10 = e10.userAgent;
    if (i10 && eu(i10, t10)) return true;
    try {
      let i11 = null == e10 ? void 0 : e10.userAgentData;
      if ((null == i11 ? void 0 : i11.brands) && i11.brands.some((e11) => eu(null == e11 ? void 0 : e11.brand, t10))) return true;
    } catch (e11) {
    }
    return !!e10.webdriver;
  };
  function oz() {
    return (oz = ea(function* () {
      let e10 = null == c ? void 0 : c.userAgentData;
      if (null == e10 ? void 0 : e10.getHighEntropyValues) try {
        let t10 = yield e10.getHighEntropyValues(["model"]), i10 = null == t10 ? void 0 : t10.model;
        return V(i10) && i10.length > 0 ? i10 : void 0;
      } catch (e11) {
        return void ik.info("Unable to resolve $device_model from userAgentData.getHighEntropyValues", e11);
      }
    })).apply(this, arguments);
  }
  function oV(e10) {
    var t10;
    return !!(null == (t10 = e10.conditions) || null == (t10 = t10.events) || null == (t10 = t10.values) ? void 0 : t10.length);
  }
  let oW = (e10, t10) => {
    if (!((e11) => {
      try {
        new RegExp(e11);
      } catch (e12) {
        return false;
      }
      return true;
    })(t10)) return false;
    try {
      return new RegExp(t10).test(e10);
    } catch (e11) {
      return false;
    }
  }, oU = (e10) => e10.toLowerCase(), oG = { exact: (e10, t10) => t10.some((t11) => e10.some((e11) => t11 === e11)), is_not: (e10, t10) => t10.every((t11) => e10.every((e11) => t11 !== e11)), regex: (e10, t10) => t10.some((t11) => e10.some((e11) => oW(t11, e11))), not_regex: (e10, t10) => t10.every((t11) => e10.every((e11) => !oW(t11, e11))), icontains: (e10, t10) => t10.map(oU).some((t11) => e10.map(oU).some((e11) => t11.includes(e11))), not_icontains: (e10, t10) => t10.map(oU).every((t11) => e10.map(oU).every((e11) => !t11.includes(e11))), gt: (e10, t10) => t10.some((t11) => {
    let i10 = parseFloat(t11);
    return !isNaN(i10) && e10.some((e11) => i10 > parseFloat(e11));
  }), lt: (e10, t10) => t10.some((t11) => {
    let i10 = parseFloat(t11);
    return !isNaN(i10) && e10.some((e11) => i10 < parseFloat(e11));
  }) };
  function oK(e10, t10) {
    return !e10 || Object.entries(e10).every(([e11, i10]) => {
      let s10 = null == t10 ? void 0 : t10[e11];
      if (null == s10) return false;
      let r10 = oG[i10.operator];
      return !!r10 && r10(i10.values.map(String), [String(s10)]);
    });
  }
  function oJ(e10, t10, i10) {
    return r9({ distinct_id: e10, userPropertiesToSet: t10, userPropertiesToSetOnce: i10 });
  }
  let oX = "custom", oY = "i.posthog.com", oQ = /^\/static\//, oZ = ["/s/", "/e/", "/i/"];
  var o0 = class {
    constructor(e10) {
      this.nu = {}, this.instance = e10;
    }
    get apiHost() {
      let e10 = this.instance.config.api_host.trim().replace(/\/$/, "");
      return "https://app.posthog.com" === e10 ? "https://us.i.posthog.com" : e10;
    }
    get flagsApiHost() {
      let e10 = this.instance.config.flags_api_host;
      return e10 ? e10.trim().replace(/\/$/, "") : this.apiHost;
    }
    get uiHost() {
      var e10;
      let t10 = null == (e10 = this.instance.config.ui_host) ? void 0 : e10.replace(/\/$/, "");
      return t10 || (t10 = this.apiHost.replace(`.${oY}`, ".posthog.com")), "https://app.posthog.com" === t10 ? "https://us.posthog.com" : t10;
    }
    get region() {
      return this.nu[this.apiHost] || (this.nu[this.apiHost] = /https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? "us" : /https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? "eu" : oX), this.nu[this.apiHost];
    }
    su(e10) {
      if (!oQ.test(e10)) return;
      let t10 = this.instance.config.asset_host;
      return "string" == typeof t10 && t10.trim().replace(/\/$/, "") || void 0;
    }
    ru(e10) {
      let t10 = r7(e10);
      return t10 ? t10.protocol + "//" + t10.host + t10.pathname : void 0;
    }
    ou(e10, t10, i10) {
      if ("ui" === e10) return i10;
      let s10 = i10, r10 = this.instance.config.rewriteRequestPath;
      if (r10) {
        var n10;
        s10 = r10(new URL((null == (n10 = r7(i10)) ? void 0 : n10.href) || i10)).toString();
      }
      if (r10 && "api" === e10 && oZ.some((e11) => 0 === t10.indexOf(e11))) {
        let e11 = this.ru(s10);
        if (e11) {
          let t11 = this.apiHost, i11 = this.au;
          (null == i11 ? void 0 : i11.apiHost) === t11 && i11.rewriteRequestPath === r10 || (i11 = { apiHost: t11, rewriteRequestPath: r10, urls: /* @__PURE__ */ new Set() }, this.au = i11), i11.urls.add(e11);
        }
      }
      return s10;
    }
    isIngestionEndpoint(e10) {
      let t10 = this.au, i10 = this.ru(e10);
      return (null == t10 ? void 0 : t10.apiHost) === this.apiHost && t10.rewriteRequestPath === this.instance.config.rewriteRequestPath && !!i10 && t10.urls.has(i10);
    }
    endpointFor(e10, t10 = "") {
      if (t10 && (t10 = "/" === t10[0] ? t10 : `/${t10}`), "ui" === e10) return this.ou(e10, t10, this.uiHost + t10);
      if ("flags" === e10) return this.ou(e10, t10, this.flagsApiHost + t10);
      if ("assets" === e10) {
        let i11 = this.su(t10);
        if (i11) return this.ou(e10, t10, `${i11}${t10}`);
      }
      if (this.region === oX) return this.ou(e10, t10, this.apiHost + t10);
      let i10 = oY + t10;
      switch (e10) {
        case "assets":
          return this.ou(e10, t10, `https://${this.region}-assets.${i10}`);
        case "api":
          return this.ou(e10, t10, `https://${this.region}.${i10}`);
      }
    }
  };
  let o1 = iE("[Surveys]"), o2 = (e10) => {
    try {
      let t10 = `seenSurvey_${e10.current_iteration && e10.current_iteration > 0 ? `${e10.id}_${e10.current_iteration}` : e10.id}`;
      if (localStorage.getItem(t10)) return;
      localStorage.setItem(t10, "true");
    } catch (e11) {
      o1.error("Failed to persist survey seen state", e11);
    }
  }, o3 = ["popover", "widget", "api"], o5 = { ignoreConditions: false, ignoreDelay: false, displayType: nN }, o4 = iE("[PostHog ExternalIntegrations]"), o6 = { intercom: "intercom-integration", crispChat: "crisp-chat-integration" };
  var o8 = class {
    constructor(e10) {
      this._instance = e10;
    }
    Ho(e10, t10) {
      var i10, s10;
      null == (i10 = w.__PosthogExtensions__) || null == (s10 = i10.loadExternalDependency) || s10.call(i10, this._instance, e10, (e11) => {
        if (e11) return o4.error("failed to load script", e11);
        t10();
      });
    }
    startIfEnabledOrStop() {
      var e10, t10, i10, s10;
      for (let [r10, n10] of Object.entries(null != (e10 = this._instance.config.integrations) ? e10 : {})) !n10 || (null == (t10 = w.__PosthogExtensions__) || null == (t10 = t10.integrations) ? void 0 : t10[r10]) || this.Ho(o6[r10], () => {
        var e11;
        null == (e11 = w.__PosthogExtensions__) || null == (e11 = e11.integrations) || null == (e11 = e11[r10]) || e11.start(this._instance);
      }), !n10 && (null == (i10 = w.__PosthogExtensions__) || null == (i10 = i10.integrations) ? void 0 : i10[r10]) && (null == (s10 = w.__PosthogExtensions__) || null == (s10 = s10.integrations) || null == (s10 = s10[r10]) || s10.stop());
    }
  }, o9 = class {
    constructor(e10, t10) {
      this.A = e10, this.bo = t10, this.lu = /* @__PURE__ */ new Map(), this.To = false;
    }
    add(e10) {
      var t10 = this;
      return ea(function* () {
        if (t10.To) throw Error("Cannot add an extension to a disposed ExtensionRuntime");
        if (t10.lu.has(e10.name)) throw Error(`Browser extension "${e10.name}" is already registered`);
        t10.lu.set(e10.name, e10);
        try {
          let i10 = e10.setup(t10.bo);
          i10 && (yield i10);
        } catch (s10) {
          let i10 = t10.lu.get(e10.name) === e10;
          i10 && t10.lu.delete(e10.name), t10.A.error(`Failed to set up browser extension "${e10.name}"`, s10), i10 && t10.uu(e10);
        }
      })();
    }
    getExtension(e10) {
      return this.lu.get(e10);
    }
    dispose() {
      if (this.To) return;
      this.To = true;
      let e10 = Array.from(this.lu.values()).reverse();
      for (let t10 of (this.lu.clear(), e10)) this.uu(t10);
    }
    uu(e10) {
      try {
        var t10;
        let i10 = null == (t10 = e10.dispose) ? void 0 : t10.call(e10);
        i10 && B(i10.then) && i10.then(void 0, (t11) => {
          this.A.error(`Failed to dispose browser extension "${e10.name}"`, t11);
        });
      } catch (t11) {
        this.A.error(`Failed to dispose browser extension "${e10.name}"`, t11);
      }
    }
  }, o7 = class {
    constructor(e10) {
      this._instance = e10;
    }
    initialize() {
    }
    get(e10) {
      let t10 = this._instance.persistence;
      if ("string" == typeof e10) return null == t10 ? void 0 : t10.get_property(e10);
      let i10 = {};
      for (let s10 of e10) {
        let e11 = null == t10 ? void 0 : t10.get_property(s10);
        z(e11) || (i10[s10] = e11);
      }
      return i10;
    }
    set(e10, t10) {
      var i10;
      null == (i10 = this._instance.persistence) || i10.register("string" == typeof e10 ? { [e10]: t10 } : e10);
    }
    remove(e10) {
      var t10;
      null == (t10 = this._instance.persistence) || t10.unregister(e10);
    }
  };
  let ae = "extensionsRemoteConfig";
  var at = class {
    constructor(e10) {
      this.instance = e10, this.To = false, this.A = ik, this.hu = e10.cu, this.kv = new o7(e10), this.onEvent = (e11) => nj(this.instance.on("eventCaptured", (t10) => {
        try {
          e11({ event: t10.event, properties: t10.properties });
        } catch (e12) {
          this.A.error("Browser extension event listener failed", e12);
        }
      })), this.onRemoteConfig = (e11) => {
        if (this.To) return nj(() => {
        });
        let t10 = (t11) => {
          try {
            e11(t11);
          } catch (e12) {
            this.A.error("Browser extension remote config listener failed", e12);
          }
        }, i10 = this.instance.du.on(ae, t10);
        return this.hu && t10(this.hu), nj(i10);
      }, this.vu = new o9(ik.createLogger("[BrowserExtensions]"), this);
    }
    get logger() {
      return this.A;
    }
    get distinctId() {
      return this.instance.get_distinct_id();
    }
    get anonymousId() {
      var e10;
      return null != (e10 = this.instance.get_property("$device_id")) ? e10 : this.distinctId;
    }
    get deviceId() {
      let e10 = this.instance.get_property(iO);
      return "string" == typeof e10 ? e10 : void 0;
    }
    get library() {
      return { name: k.LIB_NAME, version: k.LIB_VERSION };
    }
    get initialPersonProperties() {
      var e10, t10;
      return null != (e10 = null == (t10 = this.instance.persistence) ? void 0 : t10.get_initial_props()) ? e10 : {};
    }
    get groups() {
      return this.instance.getGroups();
    }
    get session() {
      try {
        var e10, t10, i10, s10;
        let r10 = null == (e10 = this.instance.sessionManager) ? void 0 : e10.checkAndGetSessionAndWindowId(true);
        return { sessionId: null != (t10 = null == r10 ? void 0 : r10.sessionId) ? t10 : "", windowId: null != (i10 = null == r10 ? void 0 : r10.windowId) ? i10 : "", sessionStartTimestamp: null != (s10 = null == r10 ? void 0 : r10.sessionStartTimestamp) ? s10 : 0 };
      } catch (e11) {
        return { sessionId: "", windowId: "", sessionStartTimestamp: 0 };
      }
    }
    get canCapture() {
      return this.instance.is_capturing();
    }
    get projectToken() {
      return this.instance.config.token;
    }
    add(e10) {
      return this.vu.add(e10);
    }
    getExtension(e10) {
      return this.vu.getExtension(e10);
    }
    capture(e10, t10, i10) {
      i10 ? this.instance.capture(e10, t10, { timestamp: i10.timestamp, uuid: i10.uuid, $set: i10.set, $set_once: i10.setOnce }) : this.instance.capture(e10, t10);
    }
    registerDynamicEventProperties(e10) {
      return nj(this.instance.fu(e10));
    }
    handleRemoteConfig(e10) {
      this.To || (this.hu = e10, this.instance.du.emit(ae, e10));
    }
    sendRequest(e10) {
      var t10 = this;
      return ea(function* (e11, i10 = {}) {
        var s10;
        let r10 = t10.instance.requestRouter.endpointFor(null != (s10 = i10.target) ? s10 : "api", e11), n10 = { method: i10.method, url: i10.query ? om(r10, i10.query) : r10, data: i10.body, headers: i10.headers, timeout: i10.timeoutMs, fireCallbackOnDrop: true, transport: i10.transport, compression: i10.compression, compressionFallback: "flags" === i10.target && "best-available" === i10.compression ? F.Base64 : void 0, timestampMode: i10.sentAt };
        return "sendBeacon" === i10.transport ? (t10.instance._send_request(n10), { statusCode: 202 }) : new Promise((e12) => {
          n10.callback = e12, t10.instance._send_request(n10);
        });
      }).apply(this, arguments);
    }
    dispose() {
      this.To || (this.To = true, this.vu.dispose());
    }
  };
  let ai = {}, as = 0, ar = () => {
  }, an = 'Consent opt in/out is not valid with cookieless_mode="always" and will be ignored', ao = "Surveys module not available", aa = "sanitize_properties is deprecated. Use before_send instead", al = "Invalid value for property_denylist config: ", au = ["$recording_status", "$sdk_debug_recording_script_not_loaded", "$sdk_debug_replay_url_trigger_status", "$sdk_debug_replay_event_trigger_status", "$sdk_debug_replay_linked_flag_trigger_status", "$sdk_debug_replay_rrweb_error", "$sdk_debug_replay_internal_buffer_length", "$sdk_debug_replay_flushed_size"], ah = ["$feature_flag_called", "$$heatmap", "$snapshot"], ac = (e10) => "$" === e10.charAt(0) && !T(ah, e10), ad = /^[A-Za-z0-9_-]{1,400}$/, ap = /^fb\.[0-9]+\.[0-9]+\.[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)?$/, af = /^fb\.[0-9]+\.[0-9]+\.[0-9]+$/, ag = ["token", "distinct_id", s_], av = "posthog", a_ = (e10) => {
    var t10;
    let i10;
    return tb({ api_host: "https://us.i.posthog.com", flags_api_host: null, ui_host: null, asset_host: null, token: "", autocapture: true, cross_subdomain_cookie: (function(e11) {
      let t11 = null == e11 ? void 0 : e11.hostname;
      if (!V(t11)) return false;
      let i11 = t11.split(".").slice(-2).join(".");
      for (let e12 of sU) if (i11 === e12) return false;
      return true;
    })(null == d ? void 0 : d.location), persistence: "localStorage+cookie", persistence_name: "", cookie_persisted_properties: [], loaded: ar, save_campaign_params: true, custom_campaign_params: [], custom_blocked_useragents: [], save_referrer: true, capture_pageleave: "if_capture_pageview", defaults: null != e10 ? e10 : "unset", __preview_deferred_init_extensions: false, __preview_external_dependency_versioned_paths: false, __preview_cookie_wins_on_conflict: false, debug: p && V(null == p ? void 0 : p.search) && -1 !== p.search.indexOf("__posthog_debug=true") || false, cookie_expiration: 365, upgrade: false, disable_session_recording: false, disable_persistence: false, disable_web_experiments: true, disable_surveys: false, disable_surveys_automatic_display: false, disable_conversations: false, disable_product_tours: false, disableDeviceModel: false, reuseAnonymousId: false, disable_external_dependency_loading: false, strict_script_versioning: "fallback", enable_recording_console_log: void 0, secure_cookie: "https:" === (null == u || null == (t10 = u.location) ? void 0 : t10.protocol), ip: false, opt_out_capturing_by_default: false, opt_out_persistence_by_default: false, opt_out_useragent_filter: false, opt_out_capturing_persistence_type: "localStorage", consent_persistence_name: null, opt_out_capturing_cookie_prefix: null, opt_in_site_apps: false, property_denylist: [], respect_dnt: false, sanitize_properties: null, request_headers: {}, request_batching: true, properties_string_max_length: 65535, mask_all_element_attributes: false, mask_all_text: false, mask_personal_data_properties: false, custom_personal_data_properties: [], advanced_disable_flags: false, advanced_disable_decide: false, advanced_disable_feature_flags: false, advanced_disable_feature_flags_on_first_load: false, advanced_only_evaluate_survey_feature_flags: false, advanced_feature_flags_dedup_per_session: false, advanced_enable_surveys: false, advanced_disable_toolbar_metrics: false, feature_flag_request_timeout_ms: 3e3, feature_flag_request_max_retries: 1, surveys_request_timeout_ms: 1e4, on_request_error(e11) {
      ik.error("Bad HTTP status: " + e11.statusCode + " " + e11.text);
    }, get_device_id: (e11) => e11, capture_performance: void 0, name: "posthog", bootstrap: {}, disable_compression: false, session_idle_timeout_seconds: 1800, person_profiles: sT, before_send: void 0, get_current_url: void 0, request_queue_config: { flush_interval_ms: 3e3 }, error_tracking: {}, _onCapture: ar }, { rageclick: e10 && e10 >= "2026-05-30" ? { content_ignorelist: rC, ignore_text_selection: true } : !e10 || "2025-11-30" > e10 || { content_ignorelist: true }, capture_pageview: !e10 || "2025-05-24" > e10 || "history_change", session_recording: (i10 = {}, e10 && "unset" !== e10 && ("2025-11-30" > e10 || (i10.strictMinimumDuration = true), "2026-05-30" > e10 || (i10.canvasCapture = { resolutionScale: 0.6 }), "2026-06-25" > e10 || (i10.streamNetworkBody = true), "2026-08-30" > e10 || (i10.captureJsonLd = true)), i10), external_scripts_inject_target: e10 && e10 >= "2026-01-30" ? "head" : "body", internal_or_test_user_hostname: e10 && e10 >= "2026-01-30" ? /^(localhost|127\.0\.0\.1)$/ : void 0, persistence_save_debounce_ms: e10 && e10 >= "2026-05-30" ? 250 : 0, split_storage: !(!e10 || "2026-05-30" > e10), detect_google_search_app: !(!e10 || "2026-05-30" > e10), disable_capture_url_hashes: !(!e10 || "2026-06-25" > e10), cookieWinsOnConflict: !(!e10 || "unset" === e10 || "2026-08-29" > e10) });
  }, am = [["process_person", "person_profiles"], ["xhr_headers", "request_headers"], ["cookie_name", "persistence_name"], ["disable_cookie", "disable_persistence"], ["__preview_disable_beacon", "disable_beacon"], ["store_google", "save_campaign_params"], ["verbose", "debug"], ["__preview_cookie_wins_on_conflict", "cookieWinsOnConflict"]], ay = (e10) => {
    let t10 = {};
    for (let [i11, s11] of am) z(e10[i11]) || (t10[s11] = e10[i11]);
    let i10 = sq({}, t10, e10), s10 = e10.__preview_external_dependency_versioned_paths;
    return z(s10) || (z(e10.strict_script_versioning) && (i10.strict_script_versioning = !!s10), V(s10) && z(e10.asset_host) && (i10.asset_host = s10)), j(e10.property_blacklist) && (z(e10.property_denylist) ? i10.property_denylist = e10.property_blacklist : j(e10.property_denylist) ? i10.property_denylist = [...e10.property_blacklist, ...e10.property_denylist] : ik.error(al + e10.property_denylist)), i10;
  };
  var ab = class {
    constructor() {
      this.__forceAllowLocalhost = false;
    }
    get pu() {
      return this.__forceAllowLocalhost;
    }
    set pu(e10) {
      ik.error("WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"), this.__forceAllowLocalhost = e10;
    }
  }, aw = class e10 {
    gu(e11) {
      if (!e11) return;
      let t10 = this.lu.indexOf(e11);
      -1 !== t10 && this.lu.splice(t10, 1);
    }
    mu(e11, t10) {
      var i10;
      return this.gu(e11), this.lu.push(t10), null == (i10 = t10.initialize) || i10.call(t10), t10;
    }
    yu() {
      return "always" === this.config.cookieless_mode || "on_reject" === this.config.cookieless_mode && this.consent.isRejected();
    }
    bu() {
      let e11, t10, i10;
      if (this._u || this.config.reuseAnonymousId || this.config.segment || this.yu()) return;
      let s10 = "memory" === this.config.persistence || "sessionStorage" === this.config.persistence;
      (s10 || this.config.disable_persistence) && (this.wu || (s10 ? (e11 = `persistence is set to '${this.config.persistence}'`, t10 = "memory" === this.config.persistence ? "on every page load" : "for every new browser tab or window", i10 = "Either set persistence to 'localStorage+cookie', keep this persistence and pass a stable ID through bootstrap.distinctID, or enable reuseAnonymousId.") : (e11 = "persistence is disabled (disable_persistence is true)", t10 = "on every page load", i10 = "Either set disable_persistence to false, keep persistence disabled and pass a stable ID through bootstrap.distinctID, or enable reuseAnonymousId."), this._u = true, console.warn("[PostHog.js]", `${e11} but no bootstrap.distinctID was provided. PostHog will mint a new distinct ID ${t10}, so calling identify() merges a new ID onto the person each time. A person can then pass the distinct-ID limit and its events stop appearing on person pages and the session tab. ${i10}`)));
    }
    ku() {
      let e11 = this.persistence;
      if (!e11 || this.Su) return;
      if (this.yu()) return void ("on_reject" === this.config.cookieless_mode && "$posthog_cookieless" !== this.get_distinct_id() && (this.xu(), this.Cu()));
      if ("$posthog_cookieless" !== this.get_distinct_id()) return;
      this.$u() || e11.load(true);
      let t10 = this.get_distinct_id();
      if (!t10 || "$posthog_cookieless" === t10) {
        let t11 = this.config.get_device_id(s0());
        this.register({ distinct_id: t11, $device_id: t11 }), e11.set_property(sh, sC);
      }
      this.xu();
    }
    get decideEndpointWasHit() {
      var e11, t10;
      return null != (e11 = null == (t10 = this.featureFlags) ? void 0 : t10.hasLoadedFlags) && e11;
    }
    get flagsEndpointWasHit() {
      var e11, t10;
      return null != (e11 = null == (t10 = this.featureFlags) ? void 0 : t10.hasLoadedFlags) && e11;
    }
    constructor() {
      var t10;
      this.Tu = false, this.Iu = false, this.webPerformance = new ab(), this.Mu = false, this.version = k.LIB_VERSION, this.Eu = /* @__PURE__ */ new Set(), this.Pu = "", this.du = new oj(), this.lu = [], this.Ru = [], this.Au = false, this.wu = false, this._u = false, this.Su = false, this._calculate_event_properties = this.calculateEventProperties.bind(this), this.config = a_(), this.SentryIntegration = r2, this.sentryIntegration = (e11) => {
        let t11;
        return t11 = r1(this, e11), { name: r0, processEvent: (e12) => t11(e12) };
      }, this.__request_queue = [], this.__loaded = false, this.analyticsDefaultEndpoint = "/e/", this.Fu = false, this.Ou = null, this.Du = null, this.Lu = null, this.scrollManager = new oL(this), this.pageViewManager = new r3(this), this.rateLimiter = new nq(this), this.requestRouter = new o0(this), this.consent = new rc(this), this.externalIntegrations = new o8(this);
      const i10 = null != (t10 = e10.__defaultExtensionClasses) ? t10 : {};
      this.featureFlags = i10.featureFlags && new i10.featureFlags(this), this.toolbar = i10.toolbar && new i10.toolbar(this), this.surveys = i10.surveys && new i10.surveys(this), this.conversations = i10.conversations && new i10.conversations(this), this.logs = i10.logs && new i10.logs(this), this.metrics = i10.metrics && new i10.metrics(this), this.experiments = i10.experiments && new i10.experiments(this), this.exceptions = i10.exceptions && new i10.exceptions(this), this.people = { set: (e11, t11, i11) => {
        let s10 = V(e11) ? { [e11]: t11 } : e11;
        this.setPersonProperties(s10), null == i11 || i11({});
      }, set_once: (e11, t11, i11) => {
        let s10 = V(e11) ? { [e11]: t11 } : e11;
        this.setPersonProperties(void 0, s10), null == i11 || i11({});
      } }, this.on("eventCaptured", (e11) => ik.info(`send "${null == e11 ? void 0 : e11.event}"`, e11));
    }
    init(t10, i10, s10) {
      if (s10 && s10 !== av) {
        var r10;
        let n10 = null != (r10 = ai[s10]) ? r10 : new e10();
        return n10._init(t10, i10, s10), ai[s10] = n10, ai[av][s10] = n10, n10;
      }
      return this._init(t10, i10, s10);
    }
    _init(e11, t10 = {}, i10) {
      var s10, r10, n10, o10;
      let a10 = V(e11) ? e11.trim() : "";
      if (!a10) return ik.critical("PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"), this;
      if (this.__loaded) return a10 !== (null == (o10 = this.config) ? void 0 : o10.token) ? console.warn("[PostHog.js]", `You have already initialized PostHog with a different project token! Re-initializing is a no-op, so events will keep going to the project this instance was initialized with. To capture into a second project, load PostHog once, then initialize a named instance after the SDK has loaded, e.g. posthog.init('${a10}', { ... }, 'project2')`) : console.warn("[PostHog.js]", "You have already initialized PostHog! Re-initializing is a no-op"), this;
      this.__loaded = true, this.config = a_(t10.defaults), t10.debug = this.Nu(t10.debug), this.qu = t10, this.ju = [], t10.person_profiles ? this.Du = t10.person_profiles : t10.process_person && (this.Du = t10.process_person);
      let l2 = a_(t10.defaults), h2 = ay(t10), c2 = sq({}, l2, h2, { name: i10, token: a10 });
      q(l2.rageclick) && q(h2.rageclick) && (c2.rageclick = sq({}, l2.rageclick, h2.rageclick)), q(l2.session_recording) && q(h2.session_recording) && (c2.session_recording = sq({}, l2.session_recording, h2.session_recording)), this.set_config(c2), this.config.on_xhr_error && ik.error("on_xhr_error is deprecated. Use on_request_error instead"), this.compression = t10.disable_compression ? void 0 : nO;
      let d2 = this.$u(), p2 = !this.yu();
      if (this.persistence = new nC(this.config, d2, true, p2), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new nC(tb(tb({}, this.config), {}, { persistence: "sessionStorage" }), d2, false, p2), this.Pu = "ph_" + (this.config.persistence_name || this.config.token) + "_session_registered_properties", "memory" !== this.config.persistence && !d2 && rh.Et()) {
        let e12 = rh.Dt(this.Pu);
        j(e12) && e12.forEach((e13) => {
          V(e13) && this.Eu.add(e13);
        });
      } else rh.Lt(this.Pu);
      let f2 = tb({}, this.persistence.props), g2 = tb({}, this.sessionPersistence.props);
      this.register({ $initialization_time: (/* @__PURE__ */ new Date()).toISOString() }), this.Bu = new oA((e12, t11) => this.Hu(e12, t11), this.config.request_queue_config), this.zu = new oR(this), this.__request_queue = [];
      let v2 = this.yu();
      v2 || (this.sessionManager = new oq(this), this.sessionPropsManager = new oN(this, this.sessionManager, this.persistence), this.sessionManager.onSessionId((e12, t11, i11) => {
        ((null == i11 ? void 0 : i11.activityTimeout) || (null == i11 ? void 0 : i11.sessionPastMaximumLength) || (null == i11 ? void 0 : i11.crossTabAdoption)) && this.Uu();
      })), this.Wu(), this.config.__preview_deferred_init_extensions ? (ik.info("Deferring extension initialization to improve startup performance"), setTimeout(() => {
        this.Vu(v2);
      }, 0)) : (ik.info("Initializing extensions synchronously"), this.Vu(v2)), k.DEBUG = k.DEBUG || this.config.debug, k.DEBUG && ik.info("Starting in debug mode", { this: this, config: t10, thisC: tb({}, this.config), p: f2, s: g2 }), !this.config.identity_distinct_id || (null == (s10 = t10.bootstrap) ? void 0 : s10.distinctID) || (t10.bootstrap = tb(tb({}, t10.bootstrap), {}, { distinctID: this.config.identity_distinct_id, isIdentifiedID: true }));
      let _2 = null == (r10 = t10.bootstrap) ? void 0 : r10.distinctID;
      if (this.wu = !!_2 && !W(_2), null == (n10 = t10.bootstrap) ? void 0 : n10.distinctID) {
        let e12 = t10.bootstrap.distinctID, i11 = this.get_distinct_id(), s11 = this.persistence.get_property(sh);
        if (t10.bootstrap.isIdentifiedID && null != i11 && i11 !== e12 && "anonymous" === s11) this.identify(e12);
        else if (t10.bootstrap.isIdentifiedID && null != i11 && i11 !== e12 && "identified" === s11) ik.warn("Bootstrap distinctID differs from an already-identified user. The existing identity is preserved. Call reset() before reinitializing if you intend to switch users.");
        else {
          let i12 = this.config.get_device_id(s0()), s12 = t10.bootstrap.isIdentifiedID ? i12 : e12;
          this.persistence.set_property(sh, t10.bootstrap.isIdentifiedID ? sO : sC), this.register({ distinct_id: e12, $device_id: s12 });
        }
      }
      if (v2) this.register_once({ distinct_id: sv, $device_id: null }, "");
      else if (!this.get_distinct_id()) {
        let e12 = this.config.get_device_id(s0());
        this.register_once({ distinct_id: e12, $device_id: e12 }, ""), this.persistence.set_property(sh, sC);
      }
      return sG(u, "onpagehide" in self ? "pagehide" : "unload", this._handle_unload.bind(this), { passive: false }), sG(u, "pageshow", () => {
        var e12;
        this.Tu = false, this.Iu || null == (e12 = this.zu) || e12.resume();
      }), t10.segment ? rZ(this, () => this.Gu()) : this.Gu(), B(this.config._onCapture) && this.config._onCapture !== ar && (ik.warn("onCapture is deprecated. Please use `before_send` instead"), this.on("eventCaptured", (e12) => this.config._onCapture(e12.event, e12))), this.config.ip && ik.warn('The `ip` config option has NO EFFECT AT ALL and has been deprecated. Use a custom transformation or "Discard IP data" project setting instead. See https://posthog.com/tutorials/web-redact-properties#hiding-customer-ip-address for more information.'), this.config.disableDeviceModel || (function() {
        return oz.apply(this, arguments);
      })().then((e12) => {
        e12 && this.register({ [iT]: e12 });
      }).catch(ar), this;
    }
    Zu(e11) {
      return V(e11.name) && B(e11.setup);
    }
    Qu(e11, t10) {
      this.Zu(e11) ? t10.push(() => {
        this.Ju().add(e11).catch(() => {
          var t11;
          return null == (t11 = e11.dispose) ? void 0 : t11.call(e11);
        }).catch((t11) => {
          ik.error(`Failed to dispose browser extension "${e11.name}"`, t11);
        });
      }) : this.lu.push(e11);
    }
    Wu() {
      var t10, i10, s10, r10, n10, o10;
      let a10 = null != (t10 = null == (i10 = this.config.__extensionClasses) ? void 0 : i10.featureFlags) ? t10 : null == (s10 = e10.__defaultExtensionClasses) ? void 0 : s10.featureFlags;
      a10 && (this.featureFlags && this.featureFlags instanceof a10 || (null == (r10 = this.Ku) || r10.call(this), this.Ku = void 0, this.featureFlags = new a10(this)), B(this.featureFlags.onReloading) && B(this.featureFlags.setup) ? this.Ku || (this.Ku = this.featureFlags.onReloading(() => {
        this.du.emit("featureFlagsReloading", true);
      }), this.Ju().add(this.featureFlags)) : null == (n10 = (o10 = this.featureFlags).initialize) || n10.call(o10));
    }
    Vu(t10) {
      var i10, s10, r10, n10, o10, a10, l2;
      let u2 = performance.now(), h2 = tb(tb({}, e10.__defaultExtensionClasses), this.config.__extensionClasses), c2 = [];
      h2.exceptions && this.lu.push(this.exceptions = null != (i10 = this.exceptions) ? i10 : new h2.exceptions(this)), h2.historyAutocapture && this.lu.push(this.historyAutocapture = new h2.historyAutocapture(this)), h2.tracingHeaders && this.lu.push(this.tracingHeaders = new h2.tracingHeaders(this)), h2.siteApps && this.lu.push(this.siteApps = new h2.siteApps(this)), h2.sessionRecording && !t10 && this.lu.push(this.sessionRecording = new h2.sessionRecording(this)), this.config.disable_scroll_properties || c2.push(() => {
        this.scrollManager.startMeasuringScrollPosition();
      }), h2.autocapture && this.Qu(this.autocapture = new h2.autocapture(this), c2), h2.surveys && this.Qu(this.surveys = null != (s10 = this.surveys) ? s10 : new h2.surveys(this), c2), h2.logs && this.Qu(this.logs = null != (r10 = this.logs) ? r10 : new h2.logs(this), c2), h2.metrics && this.lu.push(this.metrics = null != (n10 = this.metrics) ? n10 : new h2.metrics(this)), h2.conversations && this.lu.push(this.conversations = null != (o10 = this.conversations) ? o10 : new h2.conversations(this)), h2.productTours && this.lu.push(this.productTours = new h2.productTours(this)), h2.heatmaps && this.lu.push(this.heatmaps = new h2.heatmaps(this)), h2.webVitalsAutocapture && this.lu.push(this.webVitalsAutocapture = new h2.webVitalsAutocapture(this)), h2.exceptionObserver && this.lu.push(this.exceptionObserver = new h2.exceptionObserver(this)), h2.deadClicksAutocapture && this.lu.push(this.deadClicksAutocapture = new h2.deadClicksAutocapture(this, rX)), h2.toolbar && this.lu.push(this.toolbar = null != (a10 = this.toolbar) ? a10 : new h2.toolbar(this)), h2.experiments && this.lu.push(this.experiments = null != (l2 = this.experiments) ? l2 : new h2.experiments(this)), this.lu.forEach((e11) => {
        e11.initialize && c2.push(() => {
          var t11;
          null == (t11 = e11.initialize) || t11.call(e11);
        });
      }), c2.push(() => {
        if (this.Xu) {
          let e11 = this.Xu;
          this.Xu = void 0, this.lu.forEach((t11) => {
            var i11;
            return null == (i11 = t11.onRemoteConfig) ? void 0 : i11.call(t11, e11);
          });
        }
      }), this.Yu(c2, u2);
    }
    Yu(e11, t10) {
      for (; e11.length > 0; ) {
        if (this.config.__preview_deferred_init_extensions && performance.now() - t10 >= 30 && e11.length > 0) return void setTimeout(() => {
          this.Yu(e11, t10);
        }, 0);
        let i11 = e11.shift();
        if (i11) try {
          i11();
        } catch (e12) {
          ik.error("Error initializing extension:", e12);
        }
      }
      let i10 = Math.round(performance.now() - t10);
      this.register_for_session({ [sm]: this.config.__preview_deferred_init_extensions ? "deferred" : "synchronous", [sy]: i10 }), this.config.__preview_deferred_init_extensions && ik.info(`PostHog extensions initialized (${i10}ms)`);
    }
    el(e11) {
      var t10, i10;
      if (!d || !d.body) return ik.info("document not ready yet, trying again in 500 milliseconds..."), void setTimeout(() => {
        this.el(e11);
      }, 500);
      if (this.config.__preview_deferred_init_extensions && (this.Xu = e11), this.cu = e11, this.compression = void 0, e11.ok) {
        let t11 = e11.config;
        t11.supportedCompression && !this.config.disable_compression && (this.compression = T(t11.supportedCompression, nO) ? nO : T(t11.supportedCompression, nT) ? nT : void 0), (null == (i10 = t11.analytics) ? void 0 : i10.endpoint) && (this.analyticsDefaultEndpoint = t11.analytics.endpoint);
      }
      this.set_config({ person_profiles: this.Du ? this.Du : sT }), null == (t10 = this.th) || t10.handleRemoteConfig(e11), this.lu.forEach((t11) => {
        var i11;
        return null == (i11 = t11.onRemoteConfig) ? void 0 : i11.call(t11, e11);
      });
    }
    Gu() {
      try {
        this.config.loaded(this);
      } catch (e11) {
        ik.critical("`loaded` function failed", e11);
      }
      if (this.eh(), this.config.internal_or_test_user_hostname && (null == p ? void 0 : p.hostname)) {
        let e11 = p.hostname, t10 = this.config.internal_or_test_user_hostname;
        ("string" == typeof t10 ? e11 === t10 : t10.test(e11)) && this.setInternalOrTestUser();
      }
      this.config.capture_pageview && setTimeout(() => {
        (this.consent.isOptedIn() || this.yu()) && this.ih();
      }, 1), this.nh = new nz(this), this.nh.load();
    }
    eh() {
      var e11;
      this.is_capturing() && this.config.request_batching && (null == (e11 = this.Bu) || e11.enable());
    }
    _dom_loaded() {
      this.is_capturing() && sj(this.__request_queue, (e11) => this.Hu(e11)), this.__request_queue = [], this.eh();
    }
    _handle_unload() {
      var e11, t10, i10, s10, r10, n10;
      this.Tu = true, null == (e11 = this.surveys) || null == (t10 = e11.handlePageUnload) || t10.call(e11), null == (i10 = this.metrics) || i10.flush("sendBeacon"), this.config.request_batching ? (this.sh() && this.capture(sL), null == (s10 = this.logs) || s10.flushLogs("sendBeacon"), null == (r10 = this.Bu) || r10.unload(), null == (n10 = this.zu) || n10.unload()) : this.sh() && this.capture(sL, null, { transport: "sendBeacon" });
    }
    _send_request(e11) {
      oT(this, e11);
    }
    Hu(e11, t10) {
      this.zu ? this.zu.retriableRequest(e11, t10) : this._send_request(t10 ? tb(tb({}, e11), {}, { transport: t10 }) : e11);
    }
    _execute_array(e11) {
      as++;
      try {
        let t10, i10 = [], s10 = [], r10 = [];
        sj(e11, (e12) => {
          if (e12) if (t10 = e12[0], j(t10)) r10.push(e12);
          else if (B(e12)) try {
            e12.call(this);
          } catch (t11) {
            ik.error("Error executing queued PostHog call", e12, t11);
          }
          else j(e12) && "alias" === t10 ? i10.push(e12) : j(e12) && -1 !== t10.indexOf("capture") && B(this[t10]) ? r10.push(e12) : s10.push(e12);
        });
        let n10 = function(e12, t11) {
          sj(e12, function(e13) {
            try {
              if (j(e13[0])) {
                let i11 = t11;
                sB(e13, function(e14) {
                  i11 = i11[e14[0]].apply(i11, e14.slice(1));
                });
              } else t11[e13[0]].apply(t11, e13.slice(1));
            } catch (t12) {
              ik.error("Error executing queued PostHog call", e13, t12);
            }
          });
        };
        n10(i10, this), n10(s10, this), n10(r10, this);
      } finally {
        as--;
      }
    }
    push(t10) {
      if (as > 0 && j(t10) && V(t10[0])) {
        let i10 = e10.prototype[t10[0]];
        return void (B(i10) && i10.apply(this, t10.slice(1)));
      }
      this._execute_array([t10]);
    }
    get rh() {
      return { property: iM, persistenceKey: iR, cookieName: "_fbc", pattern: ap, register: (e11, t10) => {
        var i10;
        return null == (i10 = this.persistence) ? void 0 : i10.register({ [iR]: { value: e11, delivered: t10 } });
      }, unregister: () => {
        var e11;
        return null == (e11 = this.persistence) ? void 0 : e11.unregister(iR);
      } };
    }
    get oh() {
      return { property: iL, persistenceKey: iD, cookieName: "_fbp", pattern: af, register: (e11, t10) => {
        var i10;
        return null == (i10 = this.persistence) ? void 0 : i10.register({ [iD]: { value: e11, delivered: t10 } });
      }, unregister: () => {
        var e11;
        return null == (e11 = this.persistence) ? void 0 : e11.unregister(iD);
      } };
    }
    ah(e11) {
      var t10;
      let i10 = null == (t10 = this.persistence) ? void 0 : t10.get_property(e11.persistenceKey);
      return V(i10) && e11.pattern.test(i10) ? { value: i10, delivered: false } : q(i10) && V(i10.value) && e11.pattern.test(i10.value) ? { value: i10.value, delivered: true === i10.delivered } : void 0;
    }
    uh(e11, t10, i10) {
      return t10 === (null == i10 ? void 0 : i10.value) ? { value: t10, pending: !i10.delivered } : (e11.register(t10, false), { value: t10, pending: true });
    }
    hh(e11) {
      if (!this.config.save_campaign_params || this.yu()) return;
      let t10 = sJ(e11.cookieName);
      return V(t10) && e11.pattern.test(t10) ? t10 : void 0;
    }
    dh(e11, t10, i10, s10) {
      if (!this.persistence) return;
      let r10 = this.rh;
      this.persistence.refreshKey(r10.persistenceKey);
      let n10 = this.ah(r10);
      if (s10) return void r10.unregister();
      if (i10) return V(t10) && ap.test(t10) ? this.uh(r10, t10, n10) : void r10.unregister();
      let o10 = V(e11) && ad.test(e11) ? e11 : void 0, a10 = this.hh(r10);
      return a10 && ((e12, t11, i11) => {
        let s11 = e12.split(".");
        if (t11) return s11[3] === t11;
        if (!i11) return true;
        let r11 = i11.value.split(".");
        return s11[3] === r11[3] || Number(s11[2]) > Number(r11[2]);
      })(a10, o10, n10) ? this.uh(r10, a10, n10) : o10 ? (null == n10 ? void 0 : n10.value.split(".")[3]) === o10 ? { value: n10.value, pending: !n10.delivered } : this.uh(r10, `fb.1.${Date.now()}.${o10}`, n10) : n10 ? { value: n10.value, pending: !n10.delivered } : void 0;
    }
    fh(e11, t10, i10) {
      if (!this.persistence) return;
      let s10 = this.oh;
      this.persistence.refreshKey(s10.persistenceKey);
      let r10 = this.ah(s10);
      if (i10) return void s10.unregister();
      if (t10) return V(e11) && af.test(e11) ? this.uh(s10, e11, r10) : void s10.unregister();
      let n10 = this.hh(s10);
      return n10 ? this.uh(s10, n10, r10) : r10 ? { value: r10.value, pending: !r10.delivered } : void 0;
    }
    ph(e11, t10) {
      if (!this.persistence) return;
      this.persistence.refreshKey(e11.persistenceKey);
      let i10 = this.ah(e11);
      (null == i10 ? void 0 : i10.value) !== t10 || i10.delivered || e11.register(t10, true);
    }
    capture(e11, t10, i10) {
      var s10, r10, n10, o10, a10, l2, u2, h2;
      let c2, d2;
      if (!(this.__loaded && this.persistence && this.sessionPersistence && this.Bu)) return void ik.uninitializedWarning("posthog.capture");
      if (!this.is_capturing()) return;
      if (z(e11) || !V(e11)) return void ik.error("No event name provided to posthog.capture");
      if (this.ku(), "$snapshot" === e11 && this.yu()) return;
      let p2 = !this.config.opt_out_useragent_filter && this._is_bot();
      if (p2 && !this.config.__preview_capture_bot_pageviews) return;
      let f2 = (null == i10 ? void 0 : i10.skip_client_rate_limiting) ? void 0 : this.rateLimiter.clientRateLimitContext();
      if (null == f2 ? void 0 : f2.isRateLimited) return void ik.critical("This capture call is ignored due to client rate limiting.");
      (null == t10 ? void 0 : t10.$current_url) && !V(null == t10 ? void 0 : t10.$current_url) && (ik.error("Invalid `$current_url` property provided to `posthog.capture`. Input must be a string. Ignoring provided value."), null == t10 || delete t10.$current_url), "$exception" !== e11 || (null == i10 ? void 0 : i10.gh) || ik.warn("Using `posthog.capture('$exception')` is unreliable because it does not attach required metadata. Use `posthog.captureException(error)` instead, which attaches required metadata automatically."), this.sessionPersistence.update_search_keyword(), this.config.save_campaign_params && (c2 = this.sessionPersistence.update_campaign_params()), this.config.save_referrer && this.sessionPersistence.update_referrer_info(), (this.config.save_campaign_params || this.config.save_referrer) && this.persistence.set_initial_person_info();
      let g2 = /* @__PURE__ */ new Date(), v2 = (null == i10 ? void 0 : i10.timestamp) || g2, _2 = tc(null == i10 ? void 0 : i10.uuid, s0), m2 = { uuid: _2, event: e11, properties: this.calculateEventProperties(e11, t10 || {}, v2, _2) };
      "$pageview" === e11 && this.config.__preview_capture_bot_pageviews && p2 && (m2.event = "$bot_pageview", m2.properties.$browser_type = "bot"), f2 && (m2.properties.$lib_rate_limit_remaining_tokens = f2.remainingTokens);
      let y2 = "$feature_flag_called" === e11 && false === m2.properties.$feature_flag_has_experiment && true === this.get_property("$minimal_flag_called_events");
      (null == i10 ? void 0 : i10.$set) && !y2 && (m2.$set = null == i10 ? void 0 : i10.$set);
      let b2 = q(null == t10 ? void 0 : t10.$set) ? t10.$set : void 0, w2 = j(null == t10 ? void 0 : t10.$unset) ? t10.$unset : [], x2 = (null == i10 ? void 0 : i10.$unset) || [], k2 = (e12) => {
        var t11;
        let s11 = !!(null == i10 ? void 0 : i10.$set) && e12 in i10.$set;
        return { hasProvided: s11 || !!b2 && e12 in b2, provided: s11 ? null == i10 || null == (t11 = i10.$set) ? void 0 : t11[e12] : null == b2 ? void 0 : b2[e12], unset: -1 !== w2.indexOf(e12) || -1 !== x2.indexOf(e12) };
      }, E2 = k2(iM), $2 = k2(iL), S2 = [{ channel: this.rh, hasProvided: E2.hasProvided, update: this.dh(null == c2 ? void 0 : c2.fbclid, E2.provided, E2.hasProvided, E2.unset) }, { channel: this.oh, hasProvided: $2.hasProvided, update: this.fh($2.provided, $2.hasProvided, $2.unset) }];
      for (let { channel: e12, hasProvided: t11, update: i11 } of S2) i11 && true === m2.properties.$process_person_profile && i11.pending && !t11 && !y2 && (m2.$set = tb({ [e12.property]: i11.value }, m2.$set));
      let I2 = null == i10 ? void 0 : i10.$unset;
      I2 && (m2.$unset = I2);
      let P2 = y2 ? void 0 : this.mh(null == i10 ? void 0 : i10.$set_once, e11 !== sN, e11 === sD);
      if (P2 && (m2.$set_once = P2), (null == i10 ? void 0 : i10._noTruncate) || (n10 = this.config.properties_string_max_length, a10 = m2, l2 = (e12) => V(e12) ? e12.slice(0, n10) : e12, d2 = /* @__PURE__ */ new Set(), m2 = (function e12(t11, i11) {
        let s11;
        if (t11 !== Object(t11)) return l2(t11);
        if (!d2.has(t11)) {
          if (d2.add(t11), j(t11)) s11 = [], sj(t11, (t12) => {
            s11.push(e12(t12));
          });
          else {
            let i12 = {};
            sB(et(t11) ? sW(t11) : t11, (t12, s12) => {
              d2.has(t12) || (i12[s12] = e12(t12, s12));
            }), s11 = i12;
          }
          return s11;
        }
      })(a10)), m2.timestamp = v2, z(null == i10 ? void 0 : i10.timestamp) || (m2.properties.$event_time_override_provided = true, m2.properties.$event_time_override_system_time = g2), y2 && (m2.properties = ((e12, t11 = []) => {
        let i11 = {}, s11 = (t12) => {
          void 0 !== e12[t12] && (i11[t12] = e12[t12]);
        };
        return t3.forEach(s11), t11.forEach(s11), i11;
      })(m2.properties, ag)), e11 === nL || e11 === nD) {
        let i11, s11 = null == t10 ? void 0 : t10.$survey_id, r11 = null == t10 ? void 0 : t10.$survey_iteration;
        o2({ id: s11, current_iteration: r11 }), m2.$set = tb(tb({}, m2.$set), {}, { [(u2 = { id: s11, current_iteration: r11 }, h2 = e11 === nD ? "responded" : "dismissed", i11 = `$survey_${h2}/${u2.id}`, u2.current_iteration && u2.current_iteration > 0 && (i11 = `$survey_${h2}/${u2.id}/${u2.current_iteration}`), i11)]: true });
      } else e11 === nR && (m2.$set = tb(tb({}, m2.$set), {}, { $survey_last_seen_date: (/* @__PURE__ */ new Date()).toISOString() }));
      if ("product tour shown" === e11) {
        let e12 = null == t10 ? void 0 : t10.$product_tour_type;
        e12 && (m2.$set = tb(tb({}, m2.$set), {}, { [`$product_tour_last_seen_date/${e12}`]: (/* @__PURE__ */ new Date()).toISOString() }));
      }
      let F2 = tb(tb({}, m2.properties.$set), m2.$set);
      if (H(F2) || this.setPersonPropertiesForFlags(F2), !G(this.config.before_send)) {
        let e12 = this.Os(m2);
        if (!e12) return;
        (m2 = e12).uuid = tc(m2.uuid, s0);
      }
      this.sessionRecording && !this.Au && ac(e11) && (this.Au = true, setTimeout(() => this.Au = false, 3e4));
      let C2 = S2.filter(({ channel: e12, update: t11 }) => {
        var i11, s11, r11;
        let n11 = null != (i11 = null == (s11 = m2.$set) ? void 0 : s11[e12.property]) ? i11 : q(null == (r11 = m2.properties) ? void 0 : r11.$set) ? m2.properties.$set[e12.property] : void 0;
        return (null == t11 ? void 0 : t11.pending) && n11 === t11.value;
      });
      this.du.emit("eventCaptured", m2);
      let O2 = null != (s10 = null == i10 ? void 0 : i10._url) ? s10 : this.requestRouter.endpointFor("api", this.analyticsDefaultEndpoint), T2 = "recordings" === (null == i10 ? void 0 : i10._batchKey) || /\/s\/(?:\?|$)/.test(O2), A2 = tb(tb(tb({ method: "POST", url: O2, data: m2, compression: "best-available", preferSyncCompression: null == i10 ? void 0 : i10.send_instantly, timestampMode: T2 ? "body" : "capture-body", batchKey: null == i10 ? void 0 : i10._batchKey }, T2 && (null == (r10 = m2.properties) ? void 0 : r10.$session_id) ? { batchGroup: m2.properties.$session_id + (m2.properties.$window_id ? `-${m2.properties.$window_id}` : "") } : {}), (null == i10 ? void 0 : i10.transport) ? { transport: i10.transport } : {}), C2.length ? { fireCallbackOnDrop: true, callback: (e12) => {
        if (e12.statusCode >= 200 && 300 > e12.statusCode) for (let { channel: e13, update: t11 } of C2) this.ph(e13, t11.value);
      } } : {});
      if (!this.config.request_batching || i10 && !(null == i10 ? void 0 : i10._batchKey) || (null == i10 ? void 0 : i10.send_instantly) || C2.length) {
        let e12;
        !A2.transport && !A2.callback && H(null != (o10 = this.config.request_headers) ? o10 : {}) && this.Tu && (e12 = "sendBeacon"), this.Hu(A2, e12);
      } else this.Bu.enqueue(A2);
      return m2;
    }
    _addCaptureHook(e11) {
      return this.on("eventCaptured", (t10) => e11(t10.event, t10));
    }
    getExtension(e11) {
      var t10;
      return null == (t10 = this.th) ? void 0 : t10.getExtension(e11);
    }
    Ju() {
      var e11;
      return null != (e11 = this.th) ? e11 : this.th = new at(this);
    }
    fu(e11) {
      this.Ru.push(e11);
      let t10 = true;
      return () => {
        if (!t10) return;
        t10 = false;
        let i10 = this.Ru.indexOf(e11);
        -1 !== i10 && this.Ru.splice(i10, 1);
      };
    }
    yh(e11 = true) {
      var t10, i10, s10;
      return !!(null == (t10 = this.persistence) ? void 0 : t10.consumeCookieIdentityChange()) && (this.Lu = null, "anonymous" === this.persistence.get_property("$user_state") && (null == (s10 = this.sessionPersistence) || s10.clear(), this.Eu.clear(), this.bh()), null == (i10 = this.featureFlags) || i10.reset(), e11 && this.reloadFeatureFlags(), true);
    }
    calculateEventProperties(e11, t10, i10, s10, r10) {
      let n10;
      if (i10 = i10 || /* @__PURE__ */ new Date(), !this.persistence || !this.sessionPersistence) return t10;
      this.ku(), this.persistence.syncCookieProperties(), this.yh();
      let o10 = r10 ? void 0 : this.persistence.remove_event_timer(e11), a10 = tb({}, t10);
      if (a10.token = this.config.token, a10.$config_defaults = this.config.defaults, this.yu() && (a10[s_] = true), "$snapshot" === e11) {
        let e12 = tb(tb({}, this.persistence.properties()), this.sessionPersistence.properties());
        return a10.distinct_id = e12.distinct_id, (!V(a10.distinct_id) && !K(a10.distinct_id) || W(a10.distinct_id)) && ik.error("Invalid distinct_id for replay event. This indicates a bug in your implementation"), a10;
      }
      let l2 = (function(e12, t11, i11, s11 = false) {
        var r11, n11, o11, a11;
        let l3, h3;
        if (!m) return {};
        let c3 = e12 ? [...nn, ...t11 || []] : [], [d2, f3] = te(m), [g3, v3] = (function(e13) {
          for (let t12 = 0; tr.length > t12; t12++) {
            let [i12, s12, r12] = tr[t12], n12 = e13.match(i12);
            if (n12) {
              let t13 = r12 && e13.match(r12) || n12;
              return [s12, (null == t13 ? void 0 : t13[1]) || ""];
            }
          }
          return ["", ""];
        })(m), _3 = (null == (l3 = "u" > typeof navigator ? navigator : void 0) ? void 0 : l3.brave) ? { brave: true } : {}, y3 = {};
        z(i11) || (y3.detectGoogleSearchApp = i11);
        let b3 = {}, w2 = null == (r11 = navigator) || null == (r11 = r11.userAgentData) ? void 0 : r11.platform, x2 = null == (n11 = navigator) ? void 0 : n11.maxTouchPoints, E2 = null == u || null == (o11 = u.screen) ? void 0 : o11.width, $2 = null == u || null == (a11 = u.screen) ? void 0 : a11.height, S2 = null == u ? void 0 : u.devicePixelRatio;
        z(w2) || (b3.userAgentDataPlatform = w2), z(x2) || (b3.maxTouchPoints = x2), z(E2) || (b3.screenWidth = E2), z($2) || (b3.screenHeight = $2), z(S2) || (b3.devicePixelRatio = S2);
        let I2 = sq(sV({ $os: d2, $os_version: f3, $browser: e6(m, navigator.vendor, _3, y3), $webview_app: g3, $webview_app_version: v3, $device: tt(m), $device_type: ti(m, b3), $timezone: n_(), $timezone_offset: (function() {
          try {
            return (/* @__PURE__ */ new Date()).getTimezoneOffset();
          } catch (e13) {
            return;
          }
        })() }), { $current_url: nt(s11 ? tp(null == p ? void 0 : p.href) : null == p ? void 0 : p.href, c3, na), $host: null == p ? void 0 : p.host, $pathname: null == p ? void 0 : p.pathname, $raw_user_agent: m.length > 1e3 ? m.substring(0, 997) + "..." : m, $browser_version: e9(m, navigator.vendor, _3, y3), $browser_language: nd(), $browser_language_prefix: "string" == typeof (h3 = nd()) ? h3.split("-")[0] : void 0, $screen_height: null == u ? void 0 : u.screen.height, $screen_width: null == u ? void 0 : u.screen.width, $viewport_height: null == u ? void 0 : u.innerHeight, $viewport_width: null == u ? void 0 : u.innerWidth, $lib: k.LIB_NAME, $lib_version: k.LIB_VERSION, $insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10), $time: Date.now() / 1e3 });
        return k.SDK_DIST_CHANNEL && (I2.$sdk_dist_channel = k.SDK_DIST_CHANNEL), I2;
      })(this.config.mask_personal_data_properties, this.config.custom_personal_data_properties, this.config.detect_google_search_app, this.config.disable_capture_url_hashes);
      if (this.sessionManager) {
        let { sessionId: e12, windowId: t11 } = this.sessionManager.checkAndGetSessionAndWindowId(r10, i10.getTime(), true);
        a10.$session_id = e12, a10.$window_id = t11;
      }
      this.sessionPropsManager && sq(a10, this.sessionPropsManager.getSessionProps());
      try {
        var h2;
        if (this.sessionRecording) {
          let t11 = this.sessionRecording.sdkDebugProperties, i11 = !this.Au && ac(e11);
          for (let e12 in t11) (i11 || T(au, e12)) && (a10[e12] = t11[e12]);
        }
        a10.$sdk_debug_retry_queue_size = null == (h2 = this.zu) ? void 0 : h2.length;
      } catch (e12) {
        a10.$sdk_debug_error_capturing_properties = String(e12);
      }
      if (this.requestRouter.region === oX && (a10.$lib_custom_api_host = this.config.api_host), n10 = "$pageview" !== e11 || r10 ? "$pageleave" !== e11 || r10 ? this.pageViewManager.doEvent() : this.pageViewManager.doPageLeave(i10) : this.pageViewManager.doPageView(i10, s10), a10 = sq(a10, n10), "$pageview" === e11 && d && (a10.title = d.title), !z(o10)) {
        let e12 = i10.getTime() - o10;
        a10.$duration = parseFloat((e12 / 1e3).toFixed(3));
      }
      m && this.config.opt_out_useragent_filter && (a10.$browser_type = this._is_bot() ? "bot" : "browser");
      let c2 = this.persistence.properties(), f2 = this.sessionPersistence.properties(), g2 = a10.$groups, v2 = c2.$groups;
      q(g2) && !H(g2) && (a10.$groups = tb(tb({}, q(v2) ? v2 : {}), g2)), sB(["$referrer", "$referring_domain"], (e12) => {
        e12 in c2 && delete f2[e12];
      });
      let _2 = {};
      if (this.Ru.length > 0) for (let e12 of this.Ru.slice()) try {
        sq(_2, e12());
      } catch (e13) {
        ik.error("Failed to produce browser extension event properties", e13);
      }
      (a10 = sq({}, l2, c2, f2, tb(tb({}, _2), a10))).$is_identified = this._isIdentified(), j(this.config.property_denylist) ? sB(this.config.property_denylist, function(e12) {
        delete a10[e12];
      }) : ik.error(al + this.config.property_denylist + " or property_blacklist config: " + this.config.property_blacklist);
      let y2 = this.config.sanitize_properties;
      y2 && (ik.error(aa), a10 = y2(a10, e11));
      let b2 = this._h();
      return a10.$process_person_profile = b2, b2 && !r10 && this.wh("_calculate_event_properties"), a10;
    }
    mh(e11, t10 = true, i10 = false) {
      var s10;
      if (!this.persistence || !this._h() || this.Mu && !i10) return e11;
      let r10 = sq({}, this.persistence.get_initial_props(), (null == (s10 = this.sessionPropsManager) ? void 0 : s10.getSetOnceProps()) || {}, e11 || {}), n10 = this.config.sanitize_properties;
      return n10 && (ik.error(aa), r10 = n10(r10, "$set_once")), t10 && (this.Mu = true), H(r10) ? void 0 : r10;
    }
    register(e11, t10) {
      var i10;
      null == (i10 = this.persistence) || i10.register(e11, t10);
    }
    register_once(e11, t10, i10) {
      var s10;
      null == (s10 = this.persistence) || s10.register_once(e11, t10, i10);
    }
    register_for_session(e11) {
      var t10, i10;
      null == (t10 = this.persistence) || t10.syncCookieProperties(), this.yh(), null == (i10 = this.sessionPersistence) || i10.register(e11), Object.keys(e11).forEach((e12) => this.Eu.add(e12)), this.bh();
    }
    unregister(e11) {
      var t10;
      null == (t10 = this.persistence) || t10.unregister(e11);
    }
    unregister_for_session(e11) {
      var t10;
      null == (t10 = this.sessionPersistence) || t10.unregister(e11), this.Eu.delete(e11), this.bh();
    }
    kh(e11, t10) {
      this.register({ [e11]: t10 });
    }
    Uu() {
      this.Eu.forEach((e11) => {
        var t10;
        null == (t10 = this.sessionPersistence) || t10.unregister(e11);
      }), this.Eu.clear(), this.bh();
    }
    bh() {
      var e11;
      if (!this.Pu) return;
      if ("memory" === this.config.persistence || (null == (e11 = this.sessionPersistence) ? void 0 : e11.hi) || !rh.Et()) return void rh.Lt(this.Pu);
      let t10 = [];
      this.Eu.forEach((e12) => t10.push(e12)), t10.length > 0 ? rh.$t(this.Pu, t10) : rh.Lt(this.Pu);
    }
    getFeatureFlag(e11, t10) {
      var i10;
      return null == (i10 = this.featureFlags) ? void 0 : i10.getFeatureFlag(e11, t10);
    }
    getFeatureFlagPayload(e11) {
      var t10;
      return null == (t10 = this.featureFlags) ? void 0 : t10.getFeatureFlagPayload(e11);
    }
    getFeatureFlagResult(e11, t10) {
      var i10;
      return null == (i10 = this.featureFlags) ? void 0 : i10.getFeatureFlagResult(e11, t10);
    }
    getAllFeatureFlags() {
      var e11, t10;
      return null != (e11 = null == (t10 = this.featureFlags) ? void 0 : t10.getAllFeatureFlags()) ? e11 : [];
    }
    isFeatureEnabled(e11, t10) {
      var i10, s10;
      return null != (i10 = null == (s10 = this.featureFlags) ? void 0 : s10.isFeatureEnabled(e11, t10)) ? i10 : null == t10 ? void 0 : t10.defaultValue;
    }
    reloadFeatureFlags() {
      var e11;
      null == (e11 = this.featureFlags) || e11.reloadFeatureFlags();
    }
    updateFlags(e11, t10, i10) {
      var s10;
      null == (s10 = this.featureFlags) || s10.updateFlags(e11, t10, i10);
    }
    updateEarlyAccessFeatureEnrollment(e11, t10, i10) {
      var s10;
      null == (s10 = this.featureFlags) || s10.updateEarlyAccessFeatureEnrollment(e11, t10, i10);
    }
    getEarlyAccessFeatures(e11, t10 = false, i10) {
      var s10;
      return null == (s10 = this.featureFlags) ? void 0 : s10.getEarlyAccessFeatures(e11, t10, i10);
    }
    on(e11, t10) {
      return this.du.on(e11, t10);
    }
    onFeatureFlags(e11) {
      return this.featureFlags ? this.featureFlags.onFeatureFlags(e11) : (e11([], {}, { errorsLoading: true }), () => {
      });
    }
    onSurveysLoaded(e11) {
      return this.surveys ? this.surveys.onSurveysLoaded(e11) : (e11([], { isLoaded: false, error: ao }), () => {
      });
    }
    onSessionId(e11) {
      var t10, i10;
      return null != (t10 = null == (i10 = this.sessionManager) ? void 0 : i10.onSessionId(e11)) ? t10 : () => {
      };
    }
    getSurveys(e11, t10 = false) {
      this.surveys ? this.surveys.getSurveys(e11, t10) : e11([], { isLoaded: false, error: ao });
    }
    getActiveMatchingSurveys(e11, t10 = false) {
      this.surveys ? this.surveys.getActiveMatchingSurveys(e11, t10) : e11([], { isLoaded: false, error: ao });
    }
    onActiveMatchingSurveysChanged(e11) {
      return this.surveys ? this.surveys.onActiveMatchingSurveysChanged(e11) : (e11([], { isLoaded: false, error: ao }), () => {
      });
    }
    renderSurvey(e11, t10) {
      var i10;
      null == (i10 = this.surveys) || i10.renderSurvey(e11, t10);
    }
    displaySurvey(e11, t10 = o5) {
      var i10;
      null == (i10 = this.surveys) || i10.displaySurvey(e11, t10);
    }
    cancelPendingSurvey(e11) {
      var t10;
      null == (t10 = this.surveys) || t10.cancelPendingSurvey(e11);
    }
    canRenderSurvey(e11) {
      var t10, i10;
      return null != (t10 = null == (i10 = this.surveys) ? void 0 : i10.canRenderSurvey(e11)) ? t10 : { visible: false, disabledReason: ao };
    }
    canRenderSurveyAsync(e11, t10 = false) {
      var i10, s10;
      return null != (i10 = null == (s10 = this.surveys) ? void 0 : s10.canRenderSurveyAsync(e11, t10)) ? i10 : Promise.resolve({ visible: false, disabledReason: ao });
    }
    Sh(e11) {
      return !e11 || W(e11) ? (ik.critical("Unique user id has not been set in posthog.identify"), false) : "$posthog_cookieless" === e11 ? (ik.critical(`The string "${e11}" was set in posthog.identify which indicates an error. This ID is only used as a sentinel value.`), false) : !["distinct_id", "distinctid"].includes(e11.toLowerCase()) && !["undefined", "null"].includes(e11.toLowerCase()) || (ik.critical(`The string "${e11}" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.`), false);
    }
    identify(e11, t10, i10) {
      if (!this.__loaded || !this.persistence) return ik.uninitializedWarning("posthog.identify");
      if (K(e11) && (e11 = e11.toString(), ik.warn("The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string.")), !this.Sh(e11) || !this.wh("posthog.identify")) return;
      this.ku();
      let s10 = this.get_distinct_id(), r10 = this.persistence.syncCookieProperties() && this.get_distinct_id() !== s10, n10 = this.yh(false), o10 = this.persistence.Oa(), a10 = false;
      try {
        let s11 = this.get_distinct_id();
        this.register({ $user_id: e11 }), this.get_property("$device_id") || this.register_once({ $had_persisted_distinct_id: true, $device_id: s11 }, ""), e11 !== s11 && e11 !== this.get_property("__alias") && (this.unregister(iA), this.register({ distinct_id: e11 }));
        let o11 = (this.persistence.get_property("$user_state") || "anonymous") === sC, u2 = e11 !== s11, h2 = !u2 && o11;
        if (u2 && o11) {
          var l2;
          let r11 = this.config.reuseAnonymousId ? { distinct_id: e11 } : { distinct_id: e11, $anon_distinct_id: s11 };
          this.persistence.set_property(sh, sO), this.setPersonPropertiesForFlags({ $set: t10 || {}, $set_once: i10 || {} }, false), this.config.cookieWinsOnConflict && this.persistence.Da(), this.capture("$identify", r11, { $set: t10 || {}, $set_once: i10 || {} }) && (this.Lu = oJ(e11, t10, i10)), null == (l2 = this.featureFlags) || l2.setAnonymousDistinctId(this.config.reuseAnonymousId ? void 0 : s11);
        } else if (h2) {
          this.persistence.set_property(sh, sO);
          let s12 = t10 || {}, r11 = i10 || {};
          this.setPersonPropertiesForFlags({ $set: s12, $set_once: r11 }, false), this.config.cookieWinsOnConflict && this.persistence.Da(), this.capture("$set", { $set: s12, $set_once: r11 }) && (this.Lu = oJ(e11, t10, i10));
        } else (t10 || i10) && this.setPersonProperties(t10, i10);
        u2 || r10 || n10 ? (this.reloadFeatureFlags(), this.featureFlags ? this.featureFlags.resetFlagCallReported() : this.unregister(so)) : h2 && (t10 || i10) && this.reloadFeatureFlags(), a10 = true;
      } finally {
        o10 && this.persistence.qa(a10);
      }
    }
    setPersonProperties(e11, t10) {
      if (!e11 && !t10 || !this.wh("posthog.setPersonProperties")) return;
      let i10 = oJ(this.get_distinct_id(), e11, t10);
      this.Lu !== i10 ? (this.setPersonPropertiesForFlags({ $set: e11 || {}, $set_once: t10 || {} }, true), this.capture("$set", { $set: e11 || {}, $set_once: t10 || {} }) && (this.Lu = i10)) : ik.info("A duplicate setPersonProperties call was made with the same properties. It has been ignored.");
    }
    unsetPersonProperties(e11) {
      var t10;
      let i10 = (j(e11) ? e11 : [e11]).filter((e12) => V(e12) && e12.length > 0);
      0 !== i10.length && this.wh("posthog.unsetPersonProperties") && (null == (t10 = this.featureFlags) || t10.unsetPersonPropertiesForFlags(i10, true), this.capture("$set", { $unset: i10 }), this.Lu = null);
    }
    group(e11, t10, i10) {
      var s10;
      if (!e11 || !t10) return void ik.error("posthog.group requires a group type and group key");
      null == (s10 = this.persistence) || s10.syncCookieProperties(), this.yh();
      let r10 = this.getGroups(), n10 = r10[e11] !== t10;
      if (n10 && this.resetGroupPropertiesForFlags(e11), this.register({ $groups: tb(tb({}, r10), {}, { [e11]: t10 }) }), (n10 || i10) && this._h()) {
        let s11 = { $group_type: e11, $group_key: t10 };
        i10 && (s11.$group_set = i10), this.capture(sN, s11);
      }
      i10 && this.setGroupPropertiesForFlags({ [e11]: i10 }), n10 && !i10 && this.reloadFeatureFlags();
    }
    resetGroups() {
      this.register({ $groups: {} }), this.resetGroupPropertiesForFlags(), this.reloadFeatureFlags();
    }
    setPersonPropertiesForFlags(e11, t10 = true) {
      var i10;
      null == (i10 = this.featureFlags) || i10.setPersonPropertiesForFlags(e11, t10);
    }
    resetPersonPropertiesForFlags(e11 = true) {
      var t10;
      null == (t10 = this.featureFlags) || t10.resetPersonPropertiesForFlags(e11);
    }
    setGroupPropertiesForFlags(e11, t10 = true) {
      var i10;
      this.wh("posthog.setGroupPropertiesForFlags") && (null == (i10 = this.featureFlags) || i10.setGroupPropertiesForFlags(e11, t10));
    }
    resetGroupPropertiesForFlags(e11) {
      var t10;
      null == (t10 = this.featureFlags) || t10.resetGroupPropertiesForFlags(e11);
    }
    reset(e11) {
      let t10 = X(e11) ? e11 : null == e11 ? void 0 : e11.resetDeviceID, i10 = X(e11) || null == e11 ? void 0 : e11.bootstrap;
      this.xh(t10, false, i10);
    }
    xh(e11, t10 = false, i10) {
      var s10, r10, n10, o10, a10, l2, u2, h2, c2, d2, p2, f2, g2, v2, _2, m2, y2, b2, w2, x2, k2;
      if (ik.info("reset"), !this.__loaded) return ik.uninitializedWarning("posthog.reset");
      let E2 = null == i10 ? void 0 : i10.sessionID;
      this.config.bootstrap = i10 || (null == (s10 = this.qu) ? void 0 : s10.bootstrap) || {}, null == (r10 = this.featureFlags) || null == (n10 = r10.updateConfig) || n10.call(r10, this.config, this.il());
      let $2 = this.get_property(iO), S2 = this.get_property(iT), I2 = this.get_property(iJ);
      null == (o10 = this.sessionRecording) || o10.flushBeforeIdentityReset();
      let P2 = this.is_capturing();
      t10 || this.consent.reset(), t10 || !P2 || this.is_capturing() || console.warn("[PostHog.js]", "reset() cleared the stored consent, and capturing is now off because of `opt_out_capturing_by_default`. Call opt_in_capturing() again, and prefer calling reset() before opting in rather than after.");
      let F2 = null == (a10 = this.persistence) || null == (l2 = a10.Oa) ? void 0 : l2.call(a10), C2 = this.Su;
      this.Su = C2 || t10;
      let O2 = false;
      try {
        if (null == (u2 = this.persistence) || u2.clear(), null == (h2 = this.sessionPersistence) || h2.clear(), this.Eu.clear(), this.bh(), z(I2) || null == (m2 = this.persistence) || m2.register({ $session_recording_remote_config: I2 }), null == (c2 = this.surveys) || c2.reset(), null == (d2 = this.featureFlags) || d2.reset(), null == (p2 = this.conversations) || p2.reset(), null == (f2 = this.logs) || f2.reset(), null == (g2 = this.metrics) || g2.reset(), null == (v2 = this.persistence) || v2.set_property("$user_state", "anonymous"), null == (_2 = this.sessionManager) || _2.resetSessionId(), this.Lu = null, "always" === this.config.cookieless_mode) this.register_once({ distinct_id: sv, $device_id: null }, "");
        else {
          let t11 = this.config.get_device_id(s0());
          this.register_once({ distinct_id: t11, $device_id: e11 ? t11 : $2 }, ""), e11 || z(S2) || this.register({ [iT]: S2 });
        }
        if (this.register({ $last_posthog_reset: (/* @__PURE__ */ new Date()).toISOString() }, 1), i10 && (i10.distinctID && !this.yu() && (null == (w2 = this.persistence) || w2.set_property("$user_state", i10.isIdentifiedID ? "identified" : "anonymous"), this.register({ distinct_id: i10.distinctID })), null == (y2 = this.featureFlags) || y2.initialize(), !G(E2) && !(null == (b2 = this.sessionManager) ? void 0 : b2.setBootstrapSessionId(E2, true)))) {
          let e12 = tb({}, i10);
          delete e12.sessionID, this.config.bootstrap = e12;
        }
        delete this.config.identity_distinct_id, delete this.config.identity_hash, delete this.config.identity_claims, O2 = true;
      } finally {
        this.Su = C2, F2 && (null == (x2 = this.persistence) || null == (k2 = x2.qa) || k2.call(x2, O2));
      }
      this.reloadFeatureFlags();
    }
    shutdown(e11) {
      var t10 = this;
      return ea(function* () {
        var e12, i10, s10, r10, n10, o10, a10, l2, u2;
        if (t10.__loaded) {
          t10.Iu = true, t10.Ju().dispose(), null == (e12 = t10.sessionRecording) || e12.dispose(), null == (i10 = t10.logs) || i10.flushLogs("sendBeacon"), null == (s10 = t10.metrics) || s10.flush("sendBeacon"), null == (r10 = t10.metrics) || r10.dispose(), null == (n10 = t10.Bu) || n10.unload(), null == (o10 = t10.zu) || o10.unload();
          try {
            null == (u2 = t10.featureFlags) || u2.destroy();
          } catch (e13) {
            ik.error("Error while destroying feature flags", e13);
          }
          null == (a10 = t10.persistence) || a10.destroy(), null == (l2 = t10.sessionPersistence) || l2.destroy();
        } else ik.uninitializedWarning("posthog.shutdown");
      })();
    }
    setIdentity(e11, t10) {
      var i10;
      delete this.config.identity_claims, this.config.identity_distinct_id = e11, this.config.identity_hash = t10, this.alias(e11), null == (i10 = this.conversations) || i10.Ch();
    }
    clearIdentity() {
      var e11;
      delete this.config.identity_distinct_id, delete this.config.identity_hash, delete this.config.identity_claims, null == (e11 = this.conversations) || e11.$h();
    }
    get_distinct_id() {
      return this.get_property("distinct_id");
    }
    getGroups() {
      return this.get_property("$groups") || {};
    }
    get_session_id() {
      var e11, t10;
      return null != (e11 = null == (t10 = this.sessionManager) ? void 0 : t10.checkAndGetSessionAndWindowId(true).sessionId) ? e11 : "";
    }
    get_session_replay_url(e11) {
      if (!this.sessionManager) return "";
      let { sessionId: t10, sessionStartTimestamp: i10 } = this.sessionManager.checkAndGetSessionAndWindowId(true), s10 = this.requestRouter.endpointFor("ui", `/project/${this.config.token}/replay/${t10}`);
      if ((null == e11 ? void 0 : e11.withTimestamp) && i10) {
        var r10;
        let t11 = null != (r10 = e11.timestampLookBack) ? r10 : 10;
        if (!i10) return s10;
        s10 += `?t=${Math.max(Math.floor(((/* @__PURE__ */ new Date()).getTime() - i10) / 1e3) - t11, 0)}`;
      }
      return s10;
    }
    alias(e11, t10) {
      return e11 === this.get_property("$people_distinct_id") ? (ik.critical("Attempting to create alias for existing People user - aborting."), -2) : this.wh("posthog.alias") ? (z(t10) && (t10 = this.get_distinct_id()), e11 !== t10 ? (this.kh(iA, e11), this.capture("$create_alias", { alias: e11, distinct_id: t10 })) : (ik.warn("alias matches current distinct_id - skipping api call."), this.identify(e11), -1)) : void 0;
    }
    set_config(e11) {
      let t10 = tb({}, this.config);
      if (q(e11)) {
        var i10, s10, r10, n10, o10, a10, l2, u2, h2, c2, d2, p2, f2, g2, v2, _2, m2;
        sq(this.config, ay(e11));
        let y2 = this.$u();
        if (this.persistence) {
          let e12 = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence;
          (e12 && this.sessionPersistence !== this.persistence && (null == (g2 = this.sessionPersistence) || g2.remove(), null == (v2 = this.sessionPersistence) || v2.destroy()), this.persistence.update_config(this.config, t10, y2), e12) ? this.sessionPersistence = this.persistence : this.sessionPersistence === this.persistence ? this.sessionPersistence = new nC(tb(tb({}, this.config), {}, { persistence: "sessionStorage" }), y2, false) : null == (_2 = this.sessionPersistence) || _2.update_config(tb(tb({}, this.config), {}, { persistence: "sessionStorage" }), tb(tb({}, t10), {}, { persistence: "sessionStorage" }), y2);
        }
        let b2 = this.Nu(this.config.debug);
        X(b2) && (this.config.debug = b2), X(this.config.debug) && (this.config.debug ? (k.DEBUG = true, s8.Et() && s8.$t("ph_debug", true), ik.info("set_config", { config: e11, oldConfig: t10, newConfig: tb({}, this.config) })) : (k.DEBUG = false, s8.Et() && s8.Lt("ph_debug"))), null == (i10 = this.featureFlags) || null == (s10 = i10.updateConfig) || s10.call(i10, this.config, this.il()), null == (r10 = this.exceptionObserver) || r10.onConfigChange(), null == (n10 = this.exceptions) || n10.onConfigChange(), null == (o10 = this.metrics) || o10.onConfigChange(), null == (a10 = this.sessionRecording) || a10.startIfEnabledOrStop(), null == (l2 = this.tracingHeaders) || l2.startIfEnabledOrStop(), null == (u2 = this.autocapture) || u2.startIfEnabled(), null == (h2 = this.heatmaps) || h2.startIfEnabled(), ("capture_pageview" in e11 || "disable_capture_url_hashes" in e11) && (null == (m2 = this.historyAutocapture) || m2.startIfEnabledOrStop()), null == (c2 = this.exceptionObserver) || c2.startIfEnabledOrStop(), null == (d2 = this.deadClicksAutocapture) || d2.startIfEnabledOrStop(), null == (p2 = this.surveys) || p2.loadIfEnabled(), this.xu(), null == (f2 = this.externalIntegrations) || f2.startIfEnabledOrStop(), !t10.segment && this.config.segment && this.persistence && rZ(this, ar, false);
      }
    }
    _overrideSDKInfo(e11, t10) {
      k.LIB_NAME = e11, k.LIB_VERSION = t10;
    }
    startSessionRecording(e11) {
      var t10, i10, s10, r10, n10;
      let o10 = true === e11, a10 = { sampling: o10 || !!(null == e11 ? void 0 : e11.sampling), linked_flag: o10 || !!(null == e11 ? void 0 : e11.linked_flag), url_trigger: o10 || !!(null == e11 ? void 0 : e11.url_trigger), event_trigger: o10 || !!(null == e11 ? void 0 : e11.event_trigger) };
      Object.values(a10).some(Boolean) && (null == (t10 = this.sessionManager) || t10.checkAndGetSessionAndWindowId(), a10.sampling && (null == (i10 = this.sessionRecording) || i10.overrideSampling()), a10.linked_flag && (null == (s10 = this.sessionRecording) || s10.overrideLinkedFlag()), a10.url_trigger && (null == (r10 = this.sessionRecording) || r10.overrideTrigger("url")), a10.event_trigger && (null == (n10 = this.sessionRecording) || n10.overrideTrigger("event"))), this.set_config({ disable_session_recording: false });
    }
    stopSessionRecording() {
      this.set_config({ disable_session_recording: true });
    }
    sessionRecordingStarted() {
      var e11;
      return !!(null == (e11 = this.sessionRecording) ? void 0 : e11.started);
    }
    captureException(e11, t10) {
      try {
        if (!this.exceptions) return;
        let i10 = this.exceptions.buildProperties(e11, { handled: true, syntheticException: Error("PostHog syntheticException") });
        return this.exceptions.sendExceptionEvent(tb(tb({}, i10), t10));
      } catch (e12) {
        return;
      }
    }
    addExceptionStep(e11, t10) {
      var i10;
      null == (i10 = this.exceptions) || i10.addExceptionStep(e11, t10);
    }
    captureLog(e11) {
      var t10;
      null == (t10 = this.logs) || t10.captureLog(e11);
    }
    get logger() {
      var t10, i10;
      return null != (t10 = null == (i10 = this.logs) ? void 0 : i10.logger) ? t10 : e10.Th;
    }
    startExceptionAutocapture(e11) {
      this.set_config({ capture_exceptions: null == e11 || e11 });
    }
    stopExceptionAutocapture() {
      this.set_config({ capture_exceptions: false });
    }
    loadToolbar(e11) {
      var t10, i10;
      return null != (t10 = null == (i10 = this.toolbar) ? void 0 : i10.loadToolbar(e11)) && t10;
    }
    get_property(e11) {
      var t10;
      return null == (t10 = this.persistence) ? void 0 : t10.props[e11];
    }
    getSessionProperty(e11) {
      var t10;
      return null == (t10 = this.sessionPersistence) ? void 0 : t10.props[e11];
    }
    toString() {
      var e11;
      let t10 = null != (e11 = this.config.name) ? e11 : av;
      return t10 !== av && (t10 = "posthog." + t10), t10;
    }
    _isIdentified() {
      var e11, t10;
      return "identified" === (null == (e11 = this.persistence) ? void 0 : e11.get_property("$user_state")) || "identified" === (null == (t10 = this.sessionPersistence) ? void 0 : t10.get_property("$user_state"));
    }
    _h() {
      var e11, t10;
      return !("never" === this.config.person_profiles || "identified_only" === this.config.person_profiles && !this._isIdentified() && H(this.getGroups()) && !(null == (e11 = this.persistence) || null == (e11 = e11.props) ? void 0 : e11.__alias) && !(null == (t10 = this.persistence) || null == (t10 = t10.props) ? void 0 : t10.$epp));
    }
    sh() {
      return true === this.config.capture_pageleave || "if_capture_pageview" === this.config.capture_pageleave && !!this.config.capture_pageview;
    }
    createPersonProfile() {
      this._h() || this.wh("posthog.createPersonProfile") && this.setPersonProperties({}, {});
    }
    setInternalOrTestUser() {
      this.wh("posthog.setInternalOrTestUser") && this.setPersonProperties({ $internal_or_test_user: true });
    }
    wh(e11) {
      return "never" === this.config.person_profiles ? (ik.error(e11 + ' was called, but process_person is set to "never". This call will be ignored.'), false) : (this.bu(), this.kh(sg, true), true);
    }
    $u() {
      if ("always" === this.config.cookieless_mode) return true;
      let e11 = this.consent.isOptedOut();
      return this.config.disable_persistence || e11 && !(!this.config.opt_out_persistence_by_default && "on_reject" !== this.config.cookieless_mode);
    }
    xu() {
      var e11, t10, i10, s10, r10;
      let n10 = this.$u();
      return this.is_capturing() || null == (i10 = this.logs) || i10.Ih(), (null == (e11 = this.persistence) ? void 0 : e11.hi) !== n10 && (null == (s10 = this.persistence) || s10.set_disabled(n10)), (null == (t10 = this.sessionPersistence) ? void 0 : t10.hi) !== n10 && (null == (r10 = this.sessionPersistence) || r10.set_disabled(n10)), this.bh(), n10;
    }
    opt_in_capturing(t10) {
      var i10, s10, r10, n10, o10, a10, l2, u2, h2, c2, d2;
      if ("always" !== this.config.cookieless_mode) {
        if (this.yu()) {
          null == (s10 = this.sessionRecording) || s10.dispose({ discardBufferedEvents: true }), this.xh(true, true), null == (r10 = this.sessionManager) || r10.destroy(), null == (n10 = this.pageViewManager) || n10.destroy(), this.sessionManager = new oq(this), this.pageViewManager = new r3(this), this.persistence && (this.sessionPropsManager = new oN(this, this.sessionManager, this.persistence));
          let t11 = null != (o10 = null == (a10 = this.config.__extensionClasses) ? void 0 : a10.sessionRecording) ? o10 : null == (l2 = e10.__defaultExtensionClasses) ? void 0 : l2.sessionRecording;
          t11 && (this.sessionRecording = this.mu(this.sessionRecording, new t11(this)), this.cu && (null == (u2 = this.sessionRecording) || null == (h2 = u2.onRemoteConfig) || h2.call(u2, this.cu)));
        }
        this.consent.optInOut(true), this.xu(), this.eh(), null == (i10 = this.sessionRecording) || i10.startIfEnabledOrStop(), "on_reject" == this.config.cookieless_mode && (null == (c2 = this.surveys) || c2.loadIfEnabled()), (z(null == t10 ? void 0 : t10.captureEventName) || (null == t10 ? void 0 : t10.captureEventName)) && this.capture(null != (d2 = null == t10 ? void 0 : t10.captureEventName) ? d2 : "$opt_in", null == t10 ? void 0 : t10.captureProperties, { send_instantly: true }), this.config.capture_pageview && this.ih();
      } else ik.warn(an);
    }
    opt_out_capturing() {
      "always" !== this.config.cookieless_mode ? (this.consent.optInOut(false), this.xu(), "on_reject" === this.config.cookieless_mode && this.Cu()) : ik.warn(an);
    }
    Cu() {
      var e11, t10;
      let i10 = this.sessionRecording;
      null == i10 || i10.dispose({ discardBufferedEvents: true }), "$posthog_cookieless" !== this.get_distinct_id() && this.xh(true, true), this.register({ distinct_id: sv, $device_id: null }), this.gu(i10), this.sessionRecording = void 0, null == (e11 = this.sessionManager) || e11.destroy(), null == (t10 = this.pageViewManager) || t10.destroy(), this.sessionManager = void 0, this.sessionPropsManager = void 0, this.config.capture_pageview && this.ih(), this.eh();
    }
    has_opted_in_capturing() {
      return this.consent.isOptedIn();
    }
    has_opted_out_capturing() {
      return this.consent.isOptedOut();
    }
    get_explicit_consent_status() {
      let e11 = this.consent.consent;
      return 1 === e11 ? "granted" : 0 === e11 ? "denied" : "pending";
    }
    is_capturing() {
      return !this.Su && ("always" === this.config.cookieless_mode || ("on_reject" === this.config.cookieless_mode ? this.consent.isRejected() || this.consent.isOptedIn() : !this.has_opted_out_capturing()));
    }
    clear_opt_in_out_capturing() {
      this.consent.reset(), this.xu();
    }
    _is_bot() {
      return c ? oH(c, this.config.custom_blocked_useragents) : void 0;
    }
    ih() {
      d && ("visible" === d.visibilityState ? this.Fu || (this.Fu = true, this.capture(sR, { title: d.title }, { send_instantly: true }), this.Ou && (d.removeEventListener(sA, this.Ou), this.Ou = null)) : this.Ou || (this.Ou = this.ih.bind(this), sG(d, sA, this.Ou)));
    }
    debug(e11) {
      false === e11 ? (null == u || u.console.log("You've disabled debug mode."), this.set_config({ debug: false })) : (null == u || u.console.log("You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."), this.set_config({ debug: true }));
    }
    il() {
      var e11, t10;
      let i10, s10, r10 = this.qu || {};
      return "advanced_disable_flags" in r10 ? !!r10.advanced_disable_flags : false !== this.config.advanced_disable_flags ? !!this.config.advanced_disable_flags : true === this.config.advanced_disable_decide ? (ik.warn("Config field 'advanced_disable_decide' is deprecated. Please use 'advanced_disable_flags' instead. The old field will be removed in a future major version."), true) : (t10 = "advanced_disable_decide", i10 = (e11 = "advanced_disable_flags") in r10 && !G(r10[e11]), s10 = t10 in r10 && !G(r10[t10]), i10 ? r10[e11] : !!s10 && (ik && ik.warn(`Config field '${t10}' is deprecated. Please use '${e11}' instead. The old field will be removed in a future major version.`), r10[t10]));
    }
    Os(e11) {
      var t10;
      if (G(this.config.before_send)) return e11;
      let i10 = Object.keys(null != (t10 = e11.properties) ? t10 : {}).filter(Q), s10 = j(this.config.before_send) ? this.config.before_send : [this.config.before_send], r10 = e11;
      for (let t11 of s10) try {
        if (r10 = t11(r10), G(r10)) {
          let t12 = `Event '${e11.event}' was rejected in beforeSend function`;
          return Y(e11.event) ? ik.warn(`${t12}. This can cause unexpected behavior.`) : ik.info(t12), null;
        }
        r10.properties && !H(r10.properties) || ik.warn(`Event '${e11.event}' has no properties after beforeSend function, this is likely an error.`);
      } catch (t12) {
        return ik.error(`Error in beforeSend function for event '${e11.event}':`, t12), null;
      }
      for (let t11 of i10) if (r10.properties && G(r10.properties[t11])) return ik.warn(`Event '${e11.event}' had its '${t11}' property removed in a beforeSend function. This property is required for ingestion, so the event will be dropped.`), null;
      return r10;
    }
    getPageViewId() {
      var e11;
      return null == (e11 = this.pageViewManager.Wo) ? void 0 : e11.pageViewId;
    }
    captureTraceFeedback(e11, t10) {
      this.capture("$ai_feedback", { $ai_trace_id: String(e11), $ai_feedback_text: t10 });
    }
    captureTraceMetric(e11, t10, i10) {
      this.capture("$ai_metric", { $ai_trace_id: String(e11), $ai_metric_name: t10, $ai_metric_value: String(i10) });
    }
    Nu(e11) {
      let t10 = X(e11) && !e11, i10 = s8.Et() && "true" === s8.Ot("ph_debug");
      return !t10 && (!!i10 || e11);
    }
  };
  aw.__defaultExtensionClasses = {}, aw.Th = { trace: a = () => {
  }, debug: a, info: a, warn: a, error: a, fatal: a }, (function(e10, t10) {
    for (let i10 = 0; t10.length > i10; i10++) e10.prototype[t10[i10]] = sz(e10.prototype[t10[i10]]);
  })(aw, ["identify"]);
  var ax = class {
    constructor(e10) {
      this.disabled = false === e10;
      const t10 = q(e10) ? e10 : {};
      this.thresholdPx = t10.threshold_px || 30, this.timeoutMs = t10.timeout_ms || 1e3, this.clickCount = t10.click_count || 3, this.clicks = [];
    }
    isRageClick(e10, t10, i10) {
      if (this.disabled) return false;
      let s10 = this.clicks[this.clicks.length - 1];
      if (s10 && Math.abs(e10 - s10.x) + Math.abs(t10 - s10.y) < this.thresholdPx && this.timeoutMs > i10 - s10.timestamp) {
        if (this.clicks.push({ x: e10, y: t10, timestamp: i10 }), this.clicks.length === this.clickCount) return true;
      } else this.clicks = [{ x: e10, y: t10, timestamp: i10 }];
      return false;
    }
  };
  let ak = "$copy_autocapture", aE = iE("[AutoCapture]");
  function a$(e10, t10) {
    return t10.length > e10 ? t10.slice(0, e10) + "..." : t10;
  }
  var aS = class {
    do() {
      this.vo = void 0, clearTimeout(this.fo), this.fo = void 0;
    }
    po(e10) {
      var t10;
      if (!rD(e10)) return true;
      let i10 = null != (t10 = this.mo().css_selector_ignorelist) ? t10 : rP, s10 = /* @__PURE__ */ new Set(), r10 = e10;
      for (; r10; ) {
        if (s10.size >= 1e3 || s10.has(r10)) return true;
        s10.add(r10);
        let e11 = r10, t11 = rb(e11);
        if (T(t11, "ph-no-capture") || T(t11, "ph-sensitive") || rN(e11) || i10.some((t12) => r$(e11, t12))) return true;
        let n10 = r10.parentNode;
        r10 = r_(n10) ? n10.host : n10 && rf(n10) ? n10 : null;
      }
      return false;
    }
    yo(e10) {
      if (!this.isEnabled || "pointercancel" === e10.type) return void this.do();
      if ("pointerdown" === e10.type) {
        var t10;
        this.do();
        let i11 = rk(e10);
        return void (e10.isPrimary && 0 === e10.button && !e10.ctrlKey && i11 && rf(i11) && (this.vo = { target: i11, excluded: this.po(i11), id: e10.pointerId, x: e10.clientX, y: e10.clientY, released: false, distinctId: null == (t10 = this.bo) ? void 0 : t10.distinctId }));
      }
      let i10 = this.vo;
      i10 && (e10.pointerId !== i10.id || Math.abs(e10.clientX - i10.x) > 5 || Math.abs(e10.clientY - i10.y) > 5 ? this.do() : "pointerup" === e10.type && (i10.released = true, this.fo = setTimeout(() => this.do(), 0)));
    }
    _o(e10) {
      var t10, i10;
      let s10 = this.vo;
      this.do();
      let r10 = rk(e10);
      if ((null == s10 ? void 0 : s10.released) && s10.target.isConnected && s10.distinctId === (null == (t10 = this.bo) ? void 0 : t10.distinctId) && e10.pointerId === s10.id && (e10.detail > 0 || "touch" === e10.pointerType || "pen" === e10.pointerType) && 0 === e10.button && 5 >= Math.abs(e10.clientX - s10.x) && 5 >= Math.abs(e10.clientY - s10.y) && r10 && (rg(r10, "html") || rg(r10, "body"))) {
        if (s10.excluded) return null;
        let e11 = null != (i10 = this.mo().css_selector_ignorelist) ? i10 : rP;
        return [r10, null == d ? void 0 : d.documentElement, null == d ? void 0 : d.body].some((t11) => {
          if (!t11) return false;
          let i11 = rb(t11);
          return T(i11, "ph-no-capture") || T(i11, "ph-sensitive") || !rD(t11) || rN(t11) || e11.some((e12) => r$(t11, e12));
        }) ? null : s10.target;
      }
    }
    constructor(e10) {
      this.wo = e10, this.name = "autocapture", this.ko = false, this.So = null, this.xo = false, this.Co = /* @__PURE__ */ new Map(), this.$o = false, this.Ir = { enabled: false, rageclick: false, maskAllElementAttributes: false, maskAllText: false, disableCaptureUrlHashes: false, remoteRequestsDisabled: false }, this.To = false, this.wo.refresh(this.Ir), this.rageclicks = new ax(this.Ir.rageclick), this.Io = null;
    }
    setup(e10) {
      this.Mo(), this.bo = e10;
      let t10 = e10.onRemoteConfig(this.onRemoteConfig.bind(this));
      this.To ? t10.dispose() : (this.Eo = t10, this.startIfEnabled());
    }
    dispose() {
      var e10;
      this.To || (this.To = true, this.bo = void 0, null == (e10 = this.Eo) || e10.dispose(), this.Eo = void 0, this.Co.clear(), this.Io = null, this.Po());
    }
    mo() {
      return this.wo.refresh(this.Ir), this.Ir;
    }
    Mo() {
      var e10, t10;
      return this.mo(), this.Ir.url_allowlist = null == (e10 = this.Ir.url_allowlist) ? void 0 : e10.map((e11) => new RegExp(e11)), this.Ir.url_ignorelist = null == (t10 = this.Ir.url_ignorelist) ? void 0 : t10.map((e11) => new RegExp(e11)), this.Ir;
    }
    Ro() {
      if (!this.isBrowserSupported()) return void aE.info("Disabling Automatic Event Collection because this browser is not supported");
      if (!u || !d) return;
      let e10 = this.Ao = (e11) => {
        e11 = e11 || (null == u ? void 0 : u.event);
        try {
          if ("blur" === e11.type) return void this.do();
          if (0 === e11.type.indexOf("pointer")) return void this.yo(e11);
          let t10 = "click" === e11.type ? this._o(e11) : void 0;
          if (U(t10)) return;
          this.Fo(e11, "$autocapture", t10);
        } catch (e12) {
          aE.error("Failed to capture event", e12);
        }
      };
      if (sG(u, "blur", e10), sG(d, "submit", e10, { capture: true }), sG(d, "change", e10, { capture: true }), sG(d, "click", e10, { capture: true }), sB(["pointerdown", "pointermove", "pointerup", "pointercancel"], (t10) => {
        sG(d, t10, e10, { capture: true });
      }), this.mo().capture_copied_text) {
        let e11 = this.Oo = (e12) => {
          e12 = e12 || (null == u ? void 0 : u.event);
          try {
            this.Fo(e12, ak);
          } catch (e13) {
            aE.error("Failed to capture clipboard event", e13);
          }
        };
        sG(d, "copy", e11, { capture: true }), sG(d, "cut", e11, { capture: true }), sG(d, "paste", e11, { capture: true });
      }
    }
    Po() {
      this.do(), this.Ao && (null == u || u.removeEventListener("blur", this.Ao), sB(["pointerdown", "pointermove", "pointerup", "pointercancel"], (e10) => {
        null == d || d.removeEventListener(e10, this.Ao, true);
      }), null == d || d.removeEventListener("submit", this.Ao, true), null == d || d.removeEventListener("change", this.Ao, true), null == d || d.removeEventListener("click", this.Ao, true), this.Ao = void 0), this.Oo && (null == d || d.removeEventListener("copy", this.Oo, true), null == d || d.removeEventListener("cut", this.Oo, true), null == d || d.removeEventListener("paste", this.Oo, true), this.Oo = void 0), this.ko = false;
    }
    startIfEnabled() {
      this.isEnabled || this.do(), !this.To && this.bo && this.isEnabled && !this.ko && (this.Ro(), this.ko = true);
    }
    onRemoteConfig(e10) {
      var t10;
      if (this.To) return;
      if (this.xo = true, !e10.ok) return void this.startIfEnabled();
      let i10 = e10.config;
      i10.elementsChainAsString && (this.$o = i10.elementsChainAsString);
      let s10 = i10.autocapture_opt_out;
      X(s10) && (null == (t10 = this.bo) || t10.kv.set("$autocapture_disabled_server_side", s10), this.So = s10), this.startIfEnabled();
    }
    setElementSelectors(e10, t10 = this) {
      if (this.To) return;
      e10.size ? this.Co.set(t10, new Set(e10)) : this.Co.delete(t10);
      let i10 = /* @__PURE__ */ new Set();
      this.Co.forEach((e11) => {
        e11.forEach((e12) => i10.add(e12));
      }), this.Io = i10;
    }
    getElementSelectors(e10, t10) {
      var i10;
      let s10 = [];
      return null == (i10 = this.Io) || i10.forEach((i11) => {
        let r10 = null == d ? void 0 : d.querySelectorAll(i11);
        null == r10 || r10.forEach((r11) => {
          e10 !== r11 && t10 !== r11 || T(s10, i11) || s10.push(i11);
        });
      }), s10;
    }
    get isEnabled() {
      var e10, t10;
      if (this.To) return false;
      let i10 = null == (e10 = this.bo) ? void 0 : e10.kv.get(ij), s10 = this.So, r10 = this.mo();
      if (!r10.remoteRequestsDisabled && !this.xo) return false;
      let n10 = r10.remoteRequestsDisabled && !this.xo;
      if (U(s10) && !X(i10) && !n10) return false;
      let o10 = null != (t10 = this.So) ? t10 : !!i10;
      return !!r10.enabled && !o10;
    }
    Fo(e10, t10 = "$autocapture", i10) {
      var s10, r10, n10, o10;
      if (!this.isEnabled) return void this.do();
      let a10 = i10 || rk(e10);
      rv(a10) && (a10 = a10.parentNode || null);
      let l2 = this.Mo();
      "$autocapture" === t10 && "click" === e10.type && e10 instanceof MouseEvent && l2.rageclick && (null == (s10 = this.rageclicks) ? void 0 : s10.isRageClick(e10.clientX, e10.clientY, e10.timeStamp || (/* @__PURE__ */ new Date()).getTime())) && rM(a10, l2.rageclick) && this.Fo(e10, "$rageclick", i10);
      let h2 = t10 === ak, c2 = h2 ? tb(tb({}, l2), {}, { dom_event_allowlist: void 0 }) : l2;
      if (a10 && (function(e11, t11, i11, s11, r11, n11) {
        var o11;
        if (!u || rR(e11) || (null == i11 ? void 0 : i11.url_allowlist) && !ry(i11.url_allowlist, n11) || (null == i11 ? void 0 : i11.url_ignorelist) && ry(i11.url_ignorelist, n11)) return false;
        if (null == i11 ? void 0 : i11.dom_event_allowlist) {
          let e12 = i11.dom_event_allowlist;
          if (e12 && !e12.some((e13) => t11.type === e13)) return false;
        }
        let { parentIsUsefulElement: a11, targetElementList: l3 } = rL(e11, s11);
        if (!(function(e12, t12) {
          let i12 = null == t12 ? void 0 : t12.element_allowlist;
          if (z(i12)) return true;
          for (let t13 of e12) if (i12.some((e13) => t13.tagName.toLowerCase() === e13)) return true;
          return false;
        })(l3, i11) || !rS(l3, null == i11 ? void 0 : i11.css_selector_allowlist) || rS(l3, null != (o11 = null == i11 ? void 0 : i11.css_selector_ignorelist) ? o11 : rP)) return false;
        try {
          let i12 = u.getComputedStyle(e11);
          if (i12 && "pointer" === i12.getPropertyValue("cursor") && "click" === t11.type) return true;
        } catch (e12) {
        }
        let h3 = e11.tagName.toLowerCase();
        switch (h3) {
          case "html":
            return false;
          case "form":
            return (r11 || ["submit"]).indexOf(t11.type) >= 0;
          case "input":
          case "select":
          case "textarea":
            return (r11 || ["change", "click"]).indexOf(t11.type) >= 0;
          default:
            return a11 ? (r11 || ["click"]).indexOf(t11.type) >= 0 : (r11 || ["click"]).indexOf(t11.type) >= 0 && (rE.indexOf(h3) > -1 || "true" === e11.getAttribute("contenteditable"));
        }
      })(a10, e10, c2, h2, h2 ? ["copy", "cut", "paste"] : void 0, { config: { get_current_url: l2.getCurrentUrl } })) {
        let { props: i11, explicitNoCapture: s11, target: h3 } = (function(e11, { e: t11, maskAllElementAttributes: i12, maskAllText: s12, elementAttributeIgnoreList: r11, elementsChainAsString: n11, disableCaptureUrlHashes: o11 }) {
          var a11, l3, h4, c4;
          if (!rf(e11)) return { props: {} };
          let d2 = [e11], p2 = /* @__PURE__ */ new Set([e11]), f2 = e11;
          for (; f2.parentNode && !rg(f2, "body") && 1e3 > d2.length; ) {
            if (r_(f2.parentNode)) {
              let e12 = f2.parentNode.host;
              if (p2.has(e12)) break;
              p2.add(e12), d2.push(e12), f2 = e12;
              continue;
            }
            if (!rf(f2.parentNode) || p2.has(f2.parentNode)) break;
            p2.add(f2.parentNode), d2.push(f2.parentNode), f2 = f2.parentNode;
          }
          let g2 = "click" === t11.type && "http://www.w3.org/2000/svg" === e11.namespaceURI ? d2.findIndex((e12) => rg(e12, "button") || rg(e12, "a")) : -1;
          g2 > 0 && (s12 = s12 || d2.slice(0, g2 + 1).some((e12) => !rD(e12) || rN(e12)));
          let v2 = [], _2 = {}, m2, y2 = false, b2 = false;
          if (sB(d2, (e12) => {
            let t12 = rD(e12);
            if (rg(e12, "a") && !i12 && !(null == r11 ? void 0 : r11.includes("href"))) {
              let i13 = e12.getAttribute("href");
              y2 = !!(t12 && i13 && rW(i13)) && (o11 ? tp(i13) : i13);
            }
            T(rb(e12), "ph-no-capture") && (b2 = true), v2.push((function(e13, t13, i13, s13, r12 = false) {
              let n12 = e13.tagName.toLowerCase(), o12 = { tag_name: n12 };
              rE.indexOf(n12) > -1 && !i13 && (o12.$el_text = "a" === n12.toLowerCase() || "button" === n12.toLowerCase() ? a$(1024, rU(e13)) : a$(1024, rx(e13)));
              let a12 = rb(e13);
              t13 || (null == s13 ? void 0 : s13.includes("class")) || 0 >= a12.length || (o12.classes = a12.filter(function(e14) {
                return "" !== e14;
              })), sB(e13.attributes, function(i14) {
                var n13;
                if ((!rN(e13) || -1 !== ["name", "id", "class", "aria-label"].indexOf(i14.name)) && !(null == s13 ? void 0 : s13.includes(i14.name)) && !t13 && rW(i14.value) && (!V(n13 = i14.name) || "_ngcontent" !== n13.substring(0, 10) && "_nghost" !== n13.substring(0, 7))) {
                  let e14 = i14.value;
                  "class" === i14.name && (e14 = rm(e14).join(" ")), o12["attr__" + i14.name] = a$(1024, "href" === i14.name && r12 ? tp(e14) : e14);
                }
              });
              let l4 = 1, u2 = 1, h5 = e13;
              for (; h5 = (function(e14) {
                if (e14.previousElementSibling) return e14.previousElementSibling;
                let t14 = e14;
                do
                  t14 = t14.previousSibling;
                while (t14 && !rf(t14));
                return t14;
              })(h5); ) l4++, h5.tagName === e13.tagName && u2++;
              return o12.nth_child = l4, o12.nth_of_type = u2, o12;
            })(e12, i12, s12, r11, o11)), sB((function(e13) {
              if (!rD(e13)) return {};
              let t13 = {};
              return sB(e13.attributes, function(e14) {
                if (e14.name && 0 === e14.name.indexOf("data-ph-capture-attribute")) {
                  let i13 = e14.name.replace("data-ph-capture-attribute-", ""), s13 = e14.value;
                  i13 && s13 && rW(s13) && (t13[i13] = s13);
                }
              }), t13;
            })(e12), (e13, t13) => {
              ({}).hasOwnProperty.call(_2, t13) || (_2[t13] = e13);
            });
          }), b2) return { props: {}, explicitNoCapture: b2 };
          if (g2 > 0 && (e11 = d2[g2], v2.splice(0, g2)), s12 || (v2[0].$el_text = rg(e11, "a") || rg(e11, "button") ? rU(e11) : rx(e11)), y2) {
            v2[0].attr__href = y2;
            let e12 = null == (h4 = r7(y2)) ? void 0 : h4.host, t12 = null == u || null == (c4 = u.location) ? void 0 : c4.host;
            e12 && t12 && e12 !== t12 && (m2 = y2);
          }
          return { props: sq({ $event_type: t11.type, $ce_version: 1 }, n11 ? {} : { $elements: v2 }, { $elements_chain: j(v2) ? v2.map((e12) => {
            var t12, i13;
            let s13 = { text: null == (t12 = e12.$el_text) ? void 0 : t12.slice(0, 400), tag_name: e12.tag_name, href: null == (i13 = e12.attr__href) ? void 0 : i13.slice(0, 2048), attr_class: (function(e13) {
              let t13 = e13.attr__class;
              if (t13) return j(t13) ? t13 : rm(t13);
            })(e12), attr_id: e12.attr__id, nth_child: e12.nth_child, nth_of_type: e12.nth_of_type, attributes: {} };
            return sH(e12).filter(([e13]) => 0 === e13.indexOf("attr__")).forEach(([e13, t13]) => s13.attributes[e13] = t13), s13;
          }).map((e12) => {
            var t12, i13;
            let s13 = "";
            if (e12.tag_name && (s13 += e12.tag_name), e12.attr_class) for (let t13 of (e12.attr_class.sort(), e12.attr_class)) s13 += `.${t13.replace(/"/g, "")}`;
            let r12 = tb(tb(tb(tb({}, e12.text ? { text: e12.text } : {}), {}, { "nth-child": null != (t12 = e12.nth_child) ? t12 : 0, "nth-of-type": null != (i13 = e12.nth_of_type) ? i13 : 0 }, e12.href ? { href: e12.href } : {}), e12.attr_id ? { attr_id: e12.attr_id } : {}), e12.attributes), n12 = {};
            return sH(r12).sort(([e13], [t13]) => t13 > e13 ? -1 : +(e13 > t13)).forEach(([e13, t13]) => n12[rG(e13.toString())] = rG(t13.toString())), s13 += ":", s13 += sH(n12).map(([e13, t13]) => `${e13}="${t13}"`).join("");
          }).join(";") : "" }, (null == (a11 = v2[0]) ? void 0 : a11.$el_text) ? { $el_text: null == (l3 = v2[0]) ? void 0 : l3.$el_text } : {}, m2 && "click" === t11.type ? { $external_click_url: m2 } : {}, _2), target: e11 };
        })(a10, { e: e10, maskAllElementAttributes: l2.maskAllElementAttributes, maskAllText: l2.maskAllText, elementAttributeIgnoreList: l2.element_attribute_ignorelist, elementsChainAsString: this.$o, disableCaptureUrlHashes: l2.disableCaptureUrlHashes });
        if (s11) return false;
        let c3 = this.getElementSelectors(a10, h3);
        if (c3 && c3.length > 0 && (i11.$element_selectors = c3), t10 === ak) {
          let t11 = e10.type || "clipboard";
          if ("paste" !== t11) {
            let e11 = null == u || null == (n10 = u.getSelection()) ? void 0 : n10.toString(), t12 = rw(e11);
            if (!t12) return false;
            i11.$selected_content = t12, i11.$clipboard_text_length = null != (o10 = null == e11 ? void 0 : e11.length) ? o10 : 0;
          }
          i11.$copy_type = t11;
        }
        return null == (r10 = this.bo) || r10.capture(t10, i11), true;
      }
    }
    isBrowserSupported() {
      return B(null == d ? void 0 : d.querySelectorAll);
    }
  }, aI = class {
    constructor(e10) {
      this._instance = e10;
    }
    refresh(e10) {
      let t10 = this._instance.config, i10 = q(t10.autocapture) ? t10.autocapture : void 0;
      e10.enabled = !!t10.autocapture, e10.rageclick = t10.rageclick, e10.maskAllElementAttributes = t10.mask_all_element_attributes, e10.maskAllText = t10.mask_all_text, e10.disableCaptureUrlHashes = t10.disable_capture_url_hashes, e10.getCurrentUrl = t10.get_current_url, e10.remoteRequestsDisabled = this._instance.il(), e10.url_allowlist = null == i10 ? void 0 : i10.url_allowlist, e10.url_ignorelist = null == i10 ? void 0 : i10.url_ignorelist, e10.dom_event_allowlist = null == i10 ? void 0 : i10.dom_event_allowlist, e10.element_allowlist = null == i10 ? void 0 : i10.element_allowlist, e10.css_selector_allowlist = null == i10 ? void 0 : i10.css_selector_allowlist, e10.css_selector_ignorelist = null == i10 ? void 0 : i10.css_selector_ignorelist, e10.element_attribute_ignorelist = null == i10 ? void 0 : i10.element_attribute_ignorelist, e10.capture_copied_text = null == i10 ? void 0 : i10.capture_copied_text;
    }
  };
  let aP = iE("[ExceptionAutocapture]"), aF = () => {
  }, aC = (e10) => {
    var t10;
    if (B(e10)) return null != (t10 = e10.__posthog_layer__) ? t10 : e10.__rrweb_layer__;
  };
  function aO(e10, t10, i10) {
    try {
      if (!(t10 in e10)) return aF;
      let s10 = { next: e10[t10] }, r10 = i10(function(...e11) {
        return s10.next.apply(this, e11);
      });
      return B(r10) && (r10.prototype = r10.prototype || {}, Object.defineProperties(r10, { __posthog_wrapped__: { enumerable: false, value: true }, __posthog_layer__: { enumerable: false, value: s10 } })), e10[t10] = r10, () => {
        if (e10[t10] === r10) return void (e10[t10] = s10.next);
        let i11 = e10[t10], n10 = aC(i11);
        for (; n10; ) {
          if (n10.next === r10) return void (n10.next = s10.next);
          i11 = n10.next, n10 = aC(i11);
        }
      };
    } catch (e11) {
      return aF;
    }
  }
  let aT = iE("[TracingHeaders]"), aA = iE("[Web Vitals]"), aM = ["CLS", "FCP", "INP", "LCP"], aR = ["INP", "LCP"], aL = ["interactionTarget", "interactionType", "inputDelay", "processingDuration", "presentationDelay", "loadState", "target", "url", "timeToFirstByte", "resourceLoadDelay", "resourceLoadDuration", "elementRenderDelay", "largestShiftTarget", "largestShiftTime", "largestShiftValue", "firstByteToFCP"], aD = "disabled", aN = "lazy_loading", aj = iE("[SessionRecording]"), aB = [sb, sw, sx, sk, sE, s$, sS, sI, sP], aq = iE("[Heatmaps]");
  function aH(e10) {
    return q(e10) && "clientX" in e10 && "clientY" in e10 && K(e10.clientX) && K(e10.clientY);
  }
  let az = iE("[Product Tours]"), aV = (e10) => {
    var t10;
    return !e10.config.disable_product_tours && !!(null == (t10 = e10.persistence) ? void 0 : t10.get_property(iU));
  }, aW = ["$set_once", "$set"], aU = iE("[SiteApps]"), aG = "Error while initializing PostHog app with config id ", aK = (e10, t10) => (null == e10 ? void 0 : e10.then) ? e10.then(t10) : t10(e10), aJ = "SDK is not enabled or survey functionality is not yet loaded", aX = "Disabled. Not loading surveys.";
  var aY = class {
    constructor(e10, t10) {
      this.wo = e10, this.Mh = t10, this.name = "surveys", this._surveyEventReceiver = null, this._surveyManager = null, this.Eh = false, this.Ph = false, this.Rh = [], this.Ah = [], this.Fh = null, this.Oh = null, this.To = false, this.Dh = /* @__PURE__ */ new Set(), this.onRemoteConfig = (e11) => {
        if (this.To || this.Ir.disableSurveys) return;
        if (!e11.ok) return this.Ph = true, this.Lh({ isLoaded: false, error: "Remote config unavailable. Not loading surveys." }), o1.warn("Remote config unavailable. Not loading surveys.");
        let t11 = e11.config.surveys;
        if (G(t11)) return o1.warn("Flags not loaded yet. Not loading surveys.");
        this.Nh = X(t11) ? t11 : t11.length > 0, o1.info(`flags response received, isSurveysEnabled: ${this.Nh}`), this.loadIfEnabled();
      }, this.Lh = (e11) => {
        this.Ah.slice().forEach((t11) => this.qh(t11, e11));
      };
    }
    setup(e10) {
      if (!this.To) return this.jh = e10, aK(e10.kv.initialize(), () => {
        if (this.jh !== e10 || this.To) return;
        this.jh = void 0, this.bo = e10;
        let t10 = e10.onRemoteConfig(this.onRemoteConfig);
        this.To ? t10.dispose() : (this.Eo = t10, this.loadIfEnabled());
      });
    }
    dispose() {
      var e10, t10, i10, s10, r10;
      this.To || (this.To = true, this.jh = void 0, this.bo = void 0, null == (e10 = this.Eo) || e10.dispose(), this.Eo = void 0, null == (t10 = this._surveyEventReceiver) || t10.dispose(), this._surveyEventReceiver = null, null == (i10 = this._surveyManager) || null == (s10 = i10.dispose) || s10.call(i10), this._surveyManager = null, this.Rh = [], this.Ah.forEach((e11) => {
        e11.active = false;
      }), this.Ah = [], null == (r10 = this.Bh) || r10.call(this), this.Bh = void 0, this.Fh = null, this.Dh.forEach((e11) => clearTimeout(e11)), this.Dh.clear());
    }
    get Ir() {
      return this.wo.get();
    }
    initialize() {
      this.loadIfEnabled();
    }
    reset() {
      var e10, t10, i10;
      null == (e10 = this._surveyManager) || null == (t10 = e10.clearInMemoryInProgressSurveyState) || t10.call(e10);
      try {
        null == (i10 = this._surveyEventReceiver) || i10.reset(), localStorage.removeItem("lastSeenSurveyDate");
        let e11 = [];
        for (let t11 = 0; t11 < localStorage.length; t11++) {
          let i11 = localStorage.key(t11);
          ((null == i11 ? void 0 : i11.startsWith("seenSurvey_")) || (null == i11 ? void 0 : i11.startsWith("inProgressSurvey_"))) && e11.push(i11);
        }
        e11.forEach((e12) => localStorage.removeItem(e12));
      } catch (e11) {
      }
      this.Lh();
    }
    loadIfEnabled() {
      if (this.To || !this.bo) return;
      let e10 = this.Ir;
      if (this._surveyManager) return;
      if (this.Eh) return void o1.info("Already initializing surveys, skipping...");
      if (e10.disableSurveys) return void o1.info(aX);
      if (e10.cookielessMode && this.wo.isOptedOut()) return void o1.info("Not loading surveys in cookieless mode without consent.");
      let t10 = this.wo.getExtensions();
      if (!t10) return void this.Hh("PostHog Extensions not found.");
      if (z(this.Nh) && !e10.advancedEnableSurveys) return;
      let i10 = this.Nh || e10.advancedEnableSurveys;
      this.Eh = true, this.Ph = false;
      try {
        let e11 = t10.generateSurveys;
        if (e11) return this.zh(e11, i10), void (this.Eh = false);
        let s10 = t10.loadExternalDependency;
        if (!s10) return this.Hh(sF), void (this.Eh = false);
        s10((e12) => {
          try {
            if (this.To) return;
            let t11 = this.wo.getExtensions();
            !e12 && (null == t11 ? void 0 : t11.generateSurveys) ? this.zh(t11.generateSurveys, i10) : this.Hh("Could not load surveys script", e12);
          } finally {
            this.Eh = false;
          }
        });
      } catch (e11) {
        throw this.Eh = false, this.Hh("Error initializing surveys", e11), e11;
      }
    }
    zh(e10, t10) {
      var i10, s10;
      if (this.To) return;
      this._surveyManager = e10(t10), this._surveyEventReceiver = this.wo.createEventReceiver(this.Lh);
      let r10 = null == (i10 = null != (s10 = this.bo) ? s10 : this.Mh) ? void 0 : i10.kv.get(se);
      r10 && this.Uh(r10), o1.info("Surveys loaded successfully"), this.Wh(), this.Lh(), this.Vh({ isLoaded: true });
    }
    Hh(e10, t10) {
      this.Ph = true, o1.error(e10, t10), this.Lh({ isLoaded: false, error: e10 }), this.Vh({ isLoaded: false, error: e10 });
    }
    onSurveysLoaded(e10) {
      return this.Rh.push(e10), this._surveyManager && this.Vh({ isLoaded: true }), () => {
        this.Rh = this.Rh.filter((t10) => t10 !== e10);
      };
    }
    getSurveys(e10, t10 = false) {
      var i10;
      let s10 = null != (i10 = this.bo) ? i10 : this.Mh;
      if (!s10 || this.To) return;
      if (this.Ir.disableSurveys) return o1.info(aX), e10([]);
      let r10 = s10.kv.get(se);
      if (r10 && !t10) return e10(r10, { isLoaded: true }), void (this.Gh() && this.getSurveys(() => {
      }, true));
      if (this.Fh) return void this.Fh.then(({ surveys: t11, context: i11 }) => {
        this.To || e10(t11, i11);
      }).catch((e11) => o1.error("Error in survey callback", e11));
      let n10 = this.Zh("/api/surveys/", { method: "GET", query: { token: s10.projectToken }, sentAt: "query", timeoutMs: this.Ir.requestTimeoutMs }).then((e11) => {
        try {
          return this.Qh(s10, e11);
        } catch (e12) {
          return o1.error("Error processing surveys response", e12), this.Qh(s10, { statusCode: 0, error: e12 });
        }
      }, (e11) => this.Qh(s10, { statusCode: 0, error: e11 }));
      this.Fh = n10;
      let o10 = () => {
        this.Fh === n10 && (this.Fh = null);
      };
      n10.then((t11) => {
        o10(), this.To || (this.Lh(t11.context), e10(t11.surveys, t11.context));
      }, o10).catch((e11) => o1.error("Error in survey callback", e11));
    }
    Zh(e10, t10) {
      let i10 = this.bo;
      return i10 ? i10.sendRequest(e10, t10) : new Promise((e11) => e11({ statusCode: 0, error: Error(aJ) }));
    }
    Qh(e10, t10) {
      if (this.To) return { surveys: [], context: { isLoaded: false, error: aJ } };
      let i10 = t10.statusCode;
      if (200 !== i10 || !t10.json) {
        let e11 = `Surveys API could not be loaded, status: ${i10}`;
        return 0 !== i10 ? o1.error(e11) : t10.error || o1.warn(e11), this.Oh = Date.now(), { surveys: [], context: { isLoaded: false, error: e11 } };
      }
      this.Oh = null;
      let s10 = t10.json.surveys || [];
      return e10.kv.set({ [se]: s10, [st]: Date.now() }), this.Uh(s10), { surveys: s10, context: { isLoaded: true } };
    }
    Uh(e10) {
      var t10;
      let i10 = e10.filter((e11) => {
        var t11;
        return !(!e11.start_date || e11.end_date) && (oV(e11) || !!(null == (t11 = e11.conditions) || null == (t11 = t11.actions) || null == (t11 = t11.values) ? void 0 : t11.length));
      });
      null == (t10 = this._surveyEventReceiver) || t10.replace(i10);
    }
    Gh() {
      return this.Jh() && !this.Fh && !this.Kh();
    }
    Jh() {
      var e10, t10;
      let i10 = null == (e10 = null != (t10 = this.bo) ? t10 : this.Mh) ? void 0 : e10.kv.get(st);
      return K(i10) && Date.now() - i10 > 3e5;
    }
    Kh() {
      return K(this.Oh) && 3e5 > Date.now() - this.Oh;
    }
    markSurveyAsSeen(e10, t10) {
      var i10;
      o2({ id: e10, current_iteration: null != (i10 = null == t10 ? void 0 : t10.iteration) ? i10 : null });
      try {
        localStorage.setItem("lastSeenSurveyDate", (/* @__PURE__ */ new Date()).toISOString());
      } catch (e11) {
      }
      this.Lh();
    }
    Vh(e10) {
      for (let t10 of this.Rh) try {
        if (!e10.isLoaded) return t10([], e10);
        this.getSurveys(t10);
      } catch (e11) {
        o1.error("Error in survey callback", e11);
      }
    }
    getActiveMatchingSurveys(e10, t10 = false) {
      if (!G(this._surveyManager)) return this._surveyManager.getActiveMatchingSurveys(e10, t10);
      o1.warn("init was not called");
    }
    onActiveMatchingSurveysChanged(e10) {
      var t10, i10;
      if (this.To) return () => {
      };
      let s10 = { callback: e10, active: true, revision: 0 };
      this.Ah.push(s10), this.Wh();
      let r10 = null == (t10 = null != (i10 = this.bo) ? i10 : this.Mh) ? void 0 : t10.kv.get(se);
      return !this.Ir.disableSurveys && (this._surveyManager || !this.Ph || this.Eh) && (r10 || G(this.Oh) || this.Fh) ? this._surveyManager && this.qh(s10) : this.qh(s10, { isLoaded: false }), () => {
        var e11;
        s10.active = false, this.Ah = this.Ah.filter((e12) => e12 !== s10), 0 === this.Ah.length && (null == (e11 = this.Bh) || e11.call(this), this.Bh = void 0);
      };
    }
    Wh() {
      var e10, t10;
      this._surveyManager && this.Ah.length > 0 && (null != this.Bh || (this.Bh = null == (e10 = (t10 = this.wo).onMatchingConditionsChanged) ? void 0 : e10.call(t10, this.Lh)));
    }
    qh(e10, t10) {
      if (this.To || !e10.active) return;
      let i10 = ++e10.revision, s10 = (s11) => {
        if (!this.To && e10.active && i10 === e10.revision) try {
          let i11 = null != t10 ? t10 : { isLoaded: true }, r10 = JSON.stringify([s11, i11]);
          if (r10 === e10.lastResult) return;
          e10.lastResult = r10, e10.callback(s11, i11);
        } catch (e11) {
          o1.error("Error in active matching surveys callback", e11);
        }
      };
      try {
        t10 && !t10.isLoaded ? s10([]) : this.getActiveMatchingSurveys(s10);
      } catch (e11) {
        o1.error("Error in active matching surveys callback", e11);
      }
    }
    Xh(e10) {
      let t10 = null;
      return this.getSurveys((i10) => {
        var s10;
        t10 = null != (s10 = i10.find((t11) => t11.id === e10)) ? s10 : null;
      }), t10;
    }
    Yh(e10) {
      if (G(this._surveyManager)) return { eligible: false, reason: aJ };
      let t10 = "string" == typeof e10 ? this.Xh(e10) : e10;
      return t10 ? this._surveyManager.checkSurveyEligibility(t10) : { eligible: false, reason: "Survey not found" };
    }
    tc(e10) {
      if (!this.wo.isCapturing()) return { eligible: false, reason: "PostHog is not capturing, so a survey response cannot be recorded" };
      if (G(this._surveyManager)) return { eligible: false, reason: aJ };
      let t10 = "string" == typeof e10 ? this.Xh(e10) : e10;
      return t10 ? this._surveyManager.checkSurveyRenderability(t10) : { eligible: false, reason: "Survey not found" };
    }
    canRenderSurvey(e10) {
      if (G(this._surveyManager)) return o1.warn("init was not called"), { visible: false, disabledReason: aJ };
      let t10 = this.tc(e10);
      return { visible: t10.eligible, disabledReason: t10.reason };
    }
    canRenderSurveyAsync(e10, t10) {
      return G(this._surveyManager) ? (o1.warn("init was not called"), Promise.resolve({ visible: false, disabledReason: aJ })) : new Promise((i10) => {
        this.getSurveys((t11) => {
          var s10;
          let r10 = null != (s10 = t11.find((t12) => t12.id === e10)) ? s10 : null;
          if (r10) {
            let e11 = this.tc(r10);
            i10({ visible: e11.eligible, disabledReason: e11.reason });
          } else i10({ visible: false, disabledReason: "Survey not found" });
        }, t10);
      });
    }
    renderSurvey(e10, t10, i10) {
      var s10;
      if (!this.wo.isCapturing()) return;
      if (G(this._surveyManager)) return void o1.warn("init was not called");
      let r10 = "string" == typeof e10 ? this.Xh(e10) : e10;
      if (!(null == r10 ? void 0 : r10.id)) return void o1.warn("Survey not found");
      if (!o3.includes(r10.type)) return void o1.warn(`Surveys of type ${r10.type} cannot be rendered in the app`);
      let n10 = null == d ? void 0 : d.querySelector(t10);
      if (n10) {
        if (null == (s10 = r10.appearance) ? void 0 : s10.surveyPopupDelaySeconds) {
          o1.info(`Rendering survey ${r10.id} with delay of ${r10.appearance.surveyPopupDelaySeconds} seconds`);
          let e11 = setTimeout(() => {
            var t11, s11;
            this.Dh.delete(e11), !this.To && this.wo.isCapturing() && (o1.info(`Rendering survey ${r10.id} with delay of ${null == (t11 = r10.appearance) ? void 0 : t11.surveyPopupDelaySeconds} seconds`), null == (s11 = this._surveyManager) || s11.renderSurvey(r10, n10, i10), o1.info(`Survey ${r10.id} rendered`));
          }, 1e3 * r10.appearance.surveyPopupDelaySeconds);
          return void this.Dh.add(e11);
        }
        this._surveyManager.renderSurvey(r10, n10, i10);
      } else o1.warn("Survey element not found");
    }
    displaySurvey(e10, t10) {
      var i10;
      if (!this.wo.isCapturing()) return;
      if (G(this._surveyManager)) return void o1.warn("init was not called");
      let s10 = this.Xh(e10);
      if (!s10) return void o1.warn("Survey not found");
      let r10 = s10;
      if ((null == (i10 = s10.appearance) ? void 0 : i10.surveyPopupDelaySeconds) && t10.ignoreDelay && (r10 = tb(tb({}, s10), {}, { appearance: tb(tb({}, s10.appearance), {}, { surveyPopupDelaySeconds: 0 }) })), t10.displayType !== nN && t10.initialResponses && o1.warn("initialResponses is only supported for popover surveys. prefill will not be applied."), false === t10.ignoreConditions) {
        let e11 = this.Yh(s10);
        if (!e11.eligible) return void o1.warn("Survey is not eligible to be displayed: ", e11.reason);
      }
      "inline" !== t10.displayType ? this._surveyManager.handlePopoverSurvey(r10, t10) : this.renderSurvey(r10, t10.selector, t10.properties);
    }
    cancelPendingSurvey(e10) {
      G(this._surveyManager) ? o1.warn("init was not called") : this._surveyManager.cancelSurvey(e10);
    }
    handlePageUnload() {
      var e10, t10;
      null == (e10 = this._surveyManager) || null == (t10 = e10.handlePageUnload) || t10.call(e10);
    }
  };
  function aQ(e10, t10, i10) {
    if (G(e10)) return false;
    switch (i10) {
      case "exact":
        return e10 === t10;
      case "contains":
        return RegExp(t10.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/_/g, ".").replace(/%/g, ".*"), "i").test(e10);
      case "regex":
        try {
          return new RegExp(t10).test(e10);
        } catch (e11) {
          return false;
        }
      default:
        return false;
    }
  }
  var aZ = class {
    constructor(e10) {
      this._instance = e10, this.ec = /* @__PURE__ */ new Set(), this.nc = /* @__PURE__ */ new Set(), this.sc = new oj(), this.rc = (e11, t10) => this.oc(e11, t10) && this.ac(e11, t10) && this.lc(e11, t10) && this.uc(e11, t10), this.oc = (e11, t10) => !(null == t10 ? void 0 : t10.event) || (null == e11 ? void 0 : e11.event) === (null == t10 ? void 0 : t10.event);
    }
    init() {
      var e10, t10;
      z(null == (e10 = this._instance) ? void 0 : e10._addCaptureHook) || (this.hc = null == (t10 = this._instance) ? void 0 : t10._addCaptureHook((e11, t11) => {
        this.on(e11, t11);
      }));
    }
    dispose() {
      var e10, t10;
      null == (e10 = this.hc) || e10.call(this), this.hc = void 0, null == (t10 = this._instance) || null == (t10 = t10.autocapture) || t10.setElementSelectors(/* @__PURE__ */ new Set(), this), this.sc = new oj();
    }
    register(e10) {
      var t10, i10;
      if (!z(null == (t10 = this._instance) ? void 0 : t10._addCaptureHook) && (e10.forEach((e11) => {
        var t11;
        this.ec.add(e11), null == (t11 = e11.steps) || t11.forEach((e12) => {
          this.nc.add((null == e12 ? void 0 : e12.event) || "");
        });
      }), null == (i10 = this._instance) ? void 0 : i10.autocapture)) {
        let e11 = /* @__PURE__ */ new Set();
        this.ec.forEach((t11) => {
          var i11;
          null == (i11 = t11.steps) || i11.forEach((t12) => {
            (null == t12 ? void 0 : t12.selector) && e11.add(t12.selector);
          });
        }), this._instance.autocapture.setElementSelectors(e11, this);
      }
    }
    replace(e10) {
      this.ec.clear(), this.nc.clear(), this.register(e10);
    }
    on(e10, t10) {
      null != t10 && 0 != e10.length && (this.nc.has(e10) || this.nc.has(t10.event)) && this.ec.forEach((e11) => {
        this.cc(t10, e11) && this.sc.emit("actionCaptured", e11.name);
      });
    }
    dc(e10) {
      this.onAction("actionCaptured", (t10) => e10(t10));
    }
    cc(e10, t10) {
      if (null == (null == t10 ? void 0 : t10.steps)) return false;
      for (let i10 of t10.steps) if (this.rc(e10, i10)) return true;
      return false;
    }
    onAction(e10, t10) {
      return this.sc.on(e10, t10);
    }
    ac(e10, t10) {
      if (null == t10 ? void 0 : t10.url) {
        var i10;
        let s10 = null == e10 || null == (i10 = e10.properties) ? void 0 : i10.$current_url;
        if (!s10 || "string" != typeof s10 || !aQ(s10, t10.url, t10.url_matching || "contains")) return false;
      }
      return true;
    }
    lc(e10, t10) {
      return !!this.vc(e10, t10) && !!this.fc(e10, t10) && !!this.gc(e10, t10);
    }
    vc(e10, t10) {
      var i10;
      let s10;
      if (!(null == t10 ? void 0 : t10.href)) return true;
      let r10 = this.mc(e10);
      if (r10.length > 0) return r10.some((e11) => aQ(e11.href, t10.href, t10.href_matching || "exact"));
      let n10 = (null == e10 || null == (i10 = e10.properties) ? void 0 : i10.$elements_chain) || "";
      return !!n10 && aQ((s10 = n10.match(/(?::|")href="(.*?)"/)) ? s10[1] : "", t10.href, t10.href_matching || "exact");
    }
    fc(e10, t10) {
      var i10, s10, r10, n10;
      if (!(null == t10 ? void 0 : t10.text)) return true;
      let o10 = this.mc(e10);
      if (o10.length > 0) return o10.some((e11) => aQ(e11.text, t10.text, t10.text_matching || "exact") || aQ(e11.$el_text, t10.text, t10.text_matching || "exact"));
      let a10 = (null == e10 || null == (n10 = e10.properties) ? void 0 : n10.$elements_chain) || "";
      return !!a10 && (i10 = (function(e11) {
        let t11, i11 = [], s11 = /(?::|")text="(.*?)"/g;
        for (; !G(t11 = s11.exec(e11)); ) i11.includes(t11[1]) || i11.push(t11[1]);
        return i11;
      })(a10), s10 = t10.text, r10 = t10.text_matching || "exact", i10.some((e11) => aQ(e11, s10, r10)));
    }
    gc(e10, t10) {
      var i10, s10;
      if (!(null == t10 ? void 0 : t10.selector)) return true;
      let r10 = null == e10 || null == (i10 = e10.properties) ? void 0 : i10.$element_selectors;
      if (null == r10 ? void 0 : r10.includes(t10.selector)) return true;
      let n10 = (null == e10 || null == (s10 = e10.properties) ? void 0 : s10.$elements_chain) || "";
      if (t10.selector_regex && n10) try {
        return new RegExp(t10.selector_regex).test(n10);
      } catch (e11) {
      }
      return false;
    }
    mc(e10) {
      var t10;
      return null == (null == e10 || null == (t10 = e10.properties) ? void 0 : t10.$elements) ? [] : null == e10 ? void 0 : e10.properties.$elements;
    }
    uc(e10, t10) {
      return !(null == t10 ? void 0 : t10.properties) || 0 === t10.properties.length || oK(t10.properties.reduce((e11, t11) => {
        let i10 = j(t11.value) ? t11.value.map(String) : null != t11.value ? [String(t11.value)] : [];
        return e11[t11.key] = { values: i10, operator: t11.operator || "exact" }, e11;
      }, {}), null == e10 ? void 0 : e10.properties);
    }
  }, a0 = class {
    constructor(e10, t10) {
      var i10, s10;
      this.yc = [], this._instance = e10, this.bc = t10, this._c = /* @__PURE__ */ new Map(), this.wc = /* @__PURE__ */ new Map(), this.kc = /* @__PURE__ */ new Map(), this.Sc = null == (i10 = this._instance) || null == (s10 = i10.onSessionId) ? void 0 : s10.call(i10, (e11) => this.xc(e11));
    }
    Cc(e10) {
      return false;
    }
    $c() {
      return null;
    }
    Tc(e10) {
    }
    Ic() {
    }
    Mc(e10, t10) {
      return !!e10 && oK(e10.propertyFilters, null == t10 ? void 0 : t10.properties);
    }
    Ec(e10, t10) {
      let i10 = /* @__PURE__ */ new Map();
      return e10.forEach((e11) => {
        var s10;
        null == (s10 = e11.conditions) || null == (s10 = s10[t10]) || null == (s10 = s10.values) || s10.forEach((t11) => {
          if (null == t11 ? void 0 : t11.name) {
            let s11 = i10.get(t11.name) || [];
            s11.push(e11.id), i10.set(t11.name, s11);
          }
        });
      }), i10;
    }
    Pc(e10, t10, i10) {
      let s10 = (i10 === nA ? this._c : this.wc).get(e10), r10 = [];
      return this.Rc((e11) => {
        r10 = e11.filter((e12) => null == s10 ? void 0 : s10.includes(e12.id));
      }), r10.filter((s11) => {
        var r11;
        let n10 = null == (r11 = s11.conditions) || null == (r11 = r11[i10]) || null == (r11 = r11.values) ? void 0 : r11.find((t11) => t11.name === e10);
        return this.Mc(n10, t10);
      });
    }
    register(e10) {
      this.Ac(e10, false);
    }
    replace(e10) {
      this.Ac(e10, true);
    }
    Ac(e10, t10) {
      var i10;
      z(null == (i10 = this._instance) ? void 0 : i10._addCaptureHook) || (this.Fc(e10, t10), this.Oc(e10, t10));
    }
    Oc(e10, t10) {
      var i10;
      let s10 = e10.filter((e11) => {
        var t11;
        return null == (t11 = e11.conditions) || null == (t11 = t11.actions) || null == (t11 = t11.values) ? void 0 : t11.length;
      });
      if (t10 && this.kc.clear(), 0 === s10.length) return void (t10 && (null == (i10 = this.Dc) || i10.replace([])));
      this.Dc || (this.Dc = new aZ(this._instance), this.Dc.init(), this.Dc.dc((e11) => this.onAction(e11)));
      let r10 = [];
      s10.forEach((e11) => {
        var t11;
        null == (t11 = e11.conditions) || null == (t11 = t11.actions) || t11.values.forEach((t12) => {
          if (r10.push(t12), t12.name) {
            var i11;
            let s11 = null != (i11 = this.kc.get(t12.name)) ? i11 : [];
            s11.includes(e11.id) || s11.push(e11.id), this.kc.set(t12.name, s11);
          }
        });
      }), t10 ? this.Dc.replace(r10) : this.Dc.register(r10);
    }
    Lc(e10, t10) {
      t10.forEach((t11, i10) => {
        var s10;
        let r10 = null != (s10 = e10.get(i10)) ? s10 : [];
        t11.forEach((e11) => {
          r10.includes(e11) || r10.push(e11);
        }), e10.set(i10, r10);
      });
    }
    Fc(e10, t10) {
      var i10;
      let s10 = e10.filter((e11) => {
        var t11, i11;
        return (null == (t11 = e11.conditions) ? void 0 : t11.events) && (null == (i11 = e11.conditions) || null == (i11 = i11.events) || null == (i11 = i11.values) ? void 0 : i11.length) > 0;
      }), r10 = e10.filter((e11) => {
        var t11, i11;
        return (null == (t11 = e11.conditions) ? void 0 : t11.cancelEvents) && (null == (i11 = e11.conditions) || null == (i11 = i11.cancelEvents) || null == (i11 = i11.values) ? void 0 : i11.length) > 0;
      }), n10 = this.Ec(e10, nA), o10 = this.Ec(e10, nM);
      t10 ? (this._c = n10, this.wc = o10) : (this.Lc(this._c, n10), this.Lc(this.wc, o10)), (0 !== s10.length || 0 !== r10.length || e10.some((e11) => {
        var t11;
        return null == (t11 = e11.conditions) || null == (t11 = t11.actions) || null == (t11 = t11.values) ? void 0 : t11.length;
      })) && (null != this.hc || (this.hc = null == (i10 = this._instance) ? void 0 : i10._addCaptureHook((e11, t11) => {
        this.onEvent(e11, t11);
      })));
    }
    onEvent(e10, t10) {
      var i10, s10;
      let r10 = this.Nc(), n10 = (null == t10 || null == (i10 = t10.properties) ? void 0 : i10.$survey_id) || (null == t10 || null == (s10 = t10.properties) ? void 0 : s10.$product_tour_id);
      if (n10 && this.getActivatedIds().includes(n10)) {
        let i11 = this.qc(e10, n10, t10);
        if ("consume" === i11) return r10.info("event consumed activated item, removing it", { event: e10, itemId: n10 }), void this.jc([n10]);
        if ("persist" === i11) return r10.info("shown item promoted to persisted activation", { event: e10, itemId: n10 }), this.Bc(n10), void this.Hc([n10]);
      }
      if (this.wc.has(e10)) {
        let i11 = this.Pc(e10, t10, nM);
        i11.length > 0 && (r10.info("cancel event matched, cancelling items", { event: e10, itemsToCancel: i11.map((e11) => e11.id) }), this.jc(i11.map((e11) => e11.id)), i11.forEach((e11) => this.zc(e11.id)));
      }
      if (!this._c.has(e10)) return;
      r10.info("event name matched", { event: e10, eventPayload: t10, items: this._c.get(e10) });
      let o10 = this.Pc(e10, t10, nA);
      this.Uc(o10.map((e11) => e11.id));
    }
    onAction(e10) {
      this.kc.has(e10) && this.Uc(this.kc.get(e10) || []);
    }
    Uc(e10) {
      var t10, i10;
      if (0 === e10.length) return;
      let s10 = !!(null == (t10 = this._instance) || null == (i10 = t10.get_session_id) ? void 0 : i10.call(t10)), r10 = [];
      for (let t11 of e10) s10 && this.Cc(t11) ? this.Bc(t11) && this.Wc(t11) : r10.push(t11);
      r10.length > 0 && (this.yc = [.../* @__PURE__ */ new Set([...this.yc, ...r10])]), this.Nc().info("updating activated items", { activatedItems: this.getActivatedIds() }), this.Vc();
    }
    Bc(e10) {
      this.yc = this.yc.filter((t11) => t11 !== e10);
      let t10 = this.Gc();
      return !t10.includes(e10) && (this.Zc([...t10, e10]), this.Qc(), true);
    }
    jc(e10) {
      let t10 = new Set(e10);
      this.yc = this.yc.filter((e11) => !t10.has(e11));
      let i10 = this.Jc(), s10 = i10.filter((e11) => !t10.has(e11));
      s10.length !== i10.length && (this.Zc(s10), 0 === s10.length && this.Kc()), this.Hc(e10), this.Vc();
    }
    Vc() {
      try {
        var e10;
        null == (e10 = this.bc) || e10.call(this);
      } catch (e11) {
        this.Nc().error("Error while handling activated items change", e11);
      }
    }
    Xc() {
      var e10;
      let t10 = this.$c();
      if (!t10) return {};
      let i10 = null == (e10 = this._instance) || null == (e10 = e10.persistence) ? void 0 : e10.props[t10];
      return i10 && "object" == typeof i10 ? i10 : {};
    }
    Wc(e10) {
      if (!this.$c()) return;
      let t10 = this.Xc();
      this.Tc(tb(tb({}, t10), {}, { [e10]: Date.now() }));
    }
    Hc(e10) {
      if (!this.$c()) return;
      let t10 = this.Xc(), i10 = {}, s10 = false;
      for (let [r10, n10] of Object.entries(t10)) e10.includes(r10) ? s10 = true : i10[r10] = n10;
      s10 && (H(i10) ? this.Ic() : this.Tc(i10));
    }
    Yc() {
      this.$c() && this.Ic();
    }
    getActivationTimestamp(e10) {
      if (!this.Gc().includes(e10)) return;
      let t10 = this.Xc()[e10];
      return K(t10) ? t10 : void 0;
    }
    Jc() {
      var e10;
      let t10 = this.td();
      return (null == (e10 = this._instance) || null == (e10 = e10.persistence) ? void 0 : e10.props[t10]) || [];
    }
    Gc() {
      var e10, t10, i10;
      let s10 = this.Jc();
      if (0 === s10.length) return [];
      let r10 = null == (e10 = this._instance) || null == (e10 = e10.persistence) ? void 0 : e10.props[this.ed()], n10 = null == (t10 = this._instance) || null == (i10 = t10.get_session_id) ? void 0 : i10.call(t10);
      return n10 && r10 === n10 ? s10 : [];
    }
    Qc() {
      var e10, t10;
      let i10 = null == (e10 = this._instance) || null == (t10 = e10.get_session_id) ? void 0 : t10.call(e10);
      i10 && this.nd(i10);
    }
    Kc() {
      this.sd();
    }
    xc(e10) {
      var t10;
      let i10 = null == (t10 = this._instance) || null == (t10 = t10.persistence) ? void 0 : t10.props[this.ed()];
      if (i10 && i10 !== e10) {
        let e11 = this.Jc(), t11 = this.Xc();
        e11.length > 0 && (this.Zc([]), e11.filter((e12) => K(t11[e12])).forEach((e12) => this.zc(e12))), this.Kc(), this.Yc(), e11.length > 0 && this.Vc();
      }
    }
    getActivatedIds() {
      return [.../* @__PURE__ */ new Set([...this.Gc(), ...this.yc])].filter((e10) => !this.rd(e10));
    }
    dispose() {
      var e10, t10, i10;
      null == (e10 = this.Sc) || e10.call(this), this.Sc = void 0, null == (t10 = this.hc) || t10.call(this), this.hc = void 0, null == (i10 = this.Dc) || i10.dispose(), this.Dc = void 0;
    }
    reset() {
      this.yc = [], this.Jc().length > 0 && this.Zc([]), this.Kc(), this.Yc(), this.Vc();
    }
    getEventToItemsMap() {
      return this._c;
    }
    od() {
      return this.Dc;
    }
  }, a1 = class extends a0 {
    constructor(e10, t10) {
      super(e10, t10);
    }
    td() {
      return si;
    }
    ed() {
      return ss;
    }
    $c() {
      return sr;
    }
    Tc(e10) {
      var t10;
      null == (t10 = this._instance) || null == (t10 = t10.persistence) || t10.register({ $surveys_activated_timestamps: e10 });
    }
    Ic() {
      var e10;
      null == (e10 = this._instance) || null == (e10 = e10.persistence) || e10.unregister("$surveys_activated_timestamps");
    }
    Cc(e10) {
      var t10;
      let i10;
      this.Rc((t11) => {
        i10 = t11.find((t12) => t12.id === e10);
      });
      let s10 = null == i10 || null == (t10 = i10.appearance) ? void 0 : t10.surveyPopupDelaySeconds;
      return K(s10) && s10 > 0;
    }
    ad() {
      return nR;
    }
    Rc(e10) {
      var t10;
      null == (t10 = this._instance) || t10.getSurveys(e10);
    }
    zc(e10) {
      var t10;
      null == (t10 = this._instance) || t10.cancelPendingSurvey(e10);
    }
    Nc() {
      return o1;
    }
    Zc(e10) {
      var t10;
      null == (t10 = this._instance) || null == (t10 = t10.persistence) || t10.register({ $surveys_activated: e10 });
    }
    nd(e10) {
      var t10;
      null == (t10 = this._instance) || null == (t10 = t10.persistence) || t10.register({ $surveys_activated_session: e10 });
    }
    sd() {
      var e10;
      null == (e10 = this._instance) || null == (e10 = e10.persistence) || e10.unregister("$surveys_activated_session");
    }
    rd() {
      return false;
    }
    qc(e10, t10, i10) {
      var s10, r10, n10;
      let o10;
      return e10 === nD && false === (null == i10 || null == (s10 = i10.properties) ? void 0 : s10.$survey_completed) ? "ignore" : (this.Rc((e11) => {
        o10 = e11.find((e12) => e12.id === t10);
      }), !o10 || oV(r10 = o10) && (null == (n10 = r10.conditions) || null == (n10 = n10.events) ? void 0 : n10.repeatedActivation) || "always" === r10.schedule ? e10 === nR ? "consume" : "ignore" : e10 === nR ? "persist" : e10 === nL || e10 === nD ? "consume" : "ignore");
    }
    getSurveys() {
      return this.getActivatedIds();
    }
    getEventToSurveys() {
      return this.getEventToItemsMap();
    }
  }, a2 = class {
    constructor(e10) {
      this._instance = e10;
    }
    initialize() {
    }
    get(e10) {
      if ("string" == typeof e10) return this._instance.get_property(e10);
      let t10 = {};
      for (let i10 of e10) {
        let e11 = this._instance.get_property(i10);
        z(e11) || (t10[i10] = e11);
      }
      return t10;
    }
    set(e10, t10) {
      this._instance.register("string" == typeof e10 ? { [e10]: t10 } : e10);
    }
    remove(e10) {
      "string" != typeof e10 ? e10.forEach((e11) => this._instance.unregister(e11)) : this._instance.unregister(e10);
    }
  }, a3 = class {
    constructor(e10) {
      this._instance = e10;
    }
    get() {
      let e10 = this._instance.config;
      return { disableSurveys: e10.disable_surveys, cookielessMode: !!e10.cookieless_mode, advancedEnableSurveys: e10.advanced_enable_surveys, requestTimeoutMs: e10.surveys_request_timeout_ms };
    }
    isOptedOut() {
      return this._instance.consent.isOptedOut();
    }
    isCapturing() {
      return this._instance.is_capturing();
    }
    getExtensions() {
      let e10 = null == w ? void 0 : w.__PosthogExtensions__;
      if (!e10) return;
      let { generateSurveys: t10, loadExternalDependency: i10 } = e10;
      return { generateSurveys: t10 ? (e11) => t10(this._instance, e11) : void 0, loadExternalDependency: i10 ? (e11) => i10(this._instance, "surveys", e11) : void 0 };
    }
    createEventReceiver(e10) {
      return new a1(this._instance, e10);
    }
    onMatchingConditionsChanged(e10) {
      let t10 = this._instance._addCaptureHook((t11) => {
        "$pageview" !== t11 && t11 !== nR && t11 !== nL && t11 !== nD || e10();
      }), i10 = () => e10();
      sG(u, "PHSurveyShown", i10);
      let s10 = false, r10 = this._instance.onFeatureFlags(() => {
        s10 && e10();
      });
      return s10 = true, () => {
        s10 = false, t10(), r10(), null == u || u.removeEventListener("PHSurveyShown", i10);
      };
    }
  };
  let a5 = (null == u ? void 0 : u.location) ? ni(u.location.hash, "__posthog") || ni(location.hash, "state") : null, a4 = "_postHogToolbarParams", a6 = iE("[Toolbar]"), a8 = iE("[FeatureFlags]");
  var a9 = class {
    constructor(e10, t10 = false) {
      this.ld = false, this.update(e10, t10);
    }
    update(e10, t10) {
      var i10, s10, r10, n10, o10, a10, l2, u2;
      this.ud = { bootstrap: { featureFlags: null != (i10 = null == (s10 = e10.bootstrap) ? void 0 : s10.featureFlags) ? i10 : void 0, featureFlagPayloads: null != (r10 = null == (n10 = e10.bootstrap) ? void 0 : n10.featureFlagPayloads) ? r10 : void 0 }, remoteRequestsDisabled: t10, featureFlagsDisabled: !!e10.advanced_disable_feature_flags, onlyEvaluateSurveyFeatureFlags: !!e10.advanced_only_evaluate_survey_feature_flags, deduplicateCallsPerSession: !!e10.advanced_feature_flags_dedup_per_session, cacheTtlMs: e10.feature_flag_cache_ttl_ms, refreshIntervalMs: null != (o10 = e10.remote_config_refresh_interval_ms) ? o10 : 3e5, idleRefreshBackoff: z(e10.remote_config_refresh_interval_ms), requestTimeoutMs: e10.feature_flag_request_timeout_ms, requestMaxRetries: Math.max(0, null != (a10 = e10.feature_flag_request_max_retries) ? a10 : 1), compression: e10.disable_compression ? void 0 : "best-available", evaluationContexts: null != (l2 = null != (u2 = e10.evaluation_contexts) ? u2 : e10.evaluation_environments) ? l2 : [], flagKeys: j(e10.flag_keys) ? e10.flag_keys : void 0 }, !e10.evaluation_environments || e10.evaluation_contexts || this.ld || (a8.warn("evaluation_environments is deprecated. Use evaluation_contexts instead. evaluation_environments will be removed in a future version."), this.ld = true), z(e10.flag_keys) || j(e10.flag_keys) || a8.error("Invalid flag_keys found:", e10.flag_keys, "Expected array of non-empty strings");
    }
    get() {
      return this.ud;
    }
  };
  let a7 = iE("[FeatureFlags]"), le = iE("[FeatureFlags]", { debugEnabled: true }), lt = `" failed. Feature flags didn't load in time.`, li = [502, 504], ls = ["click", "keydown", "wheel", "touchstart", "pointerdown"], lr = "connection_error", ln = (e10) => {
    let t10 = {};
    for (let i10 = 0; e10.length > i10; i10++) t10[e10[i10]] = true;
    return t10;
  }, lo = (e10) => {
    let t10 = {};
    for (let [i10, s10] of sH(e10 || {})) s10 && (t10[i10] = s10);
    return t10;
  }, la = (e10) => et(e10) && ("RangeError" === e10.name && 0 === e10.message.indexOf("Maximum call stack size exceeded") || "InternalError" === e10.name && "too much recursion" === e10.message), ll = iE("[Error tracking]"), lu = "webkit-masked-url:", lh = [{ value: "isolatedAPI.contexts.topHostname", exact: false }, { value: "No response from target", exact: true }], lc = ["chrome-extension://", "moz-extension://", "safari-extension:", "safari-web-extension:", lu], ld = ["__firefox__", "__gCrWeb"], lp = "Refusing to render web experiment since the viewer is a likely bot", lf = { icontains: (e10, t10) => t10.toLowerCase().indexOf(e10.toLowerCase()) > -1, not_icontains: (e10, t10) => -1 === t10.toLowerCase().indexOf(e10.toLowerCase()), regex: (e10, t10) => oW(t10, e10), not_regex: (e10, t10) => !oW(t10, e10), exact: (e10, t10) => t10 === e10, is_not: (e10, t10) => t10 !== e10 }, lg = iE("[Conversations]"), lv = "Conversations not available yet.";
  function l_(e10, t10) {
    var i10, s10, r10, n10, o10, a10, l2;
    let u2 = null != (i10 = null == e10 ? void 0 : e10.flushIntervalMs) ? i10 : 3e3, h2 = null != (s10 = null == e10 ? void 0 : e10.maxBufferSize) ? s10 : 100, d2 = (null == t10 ? void 0 : t10.consoleCapture) ? void 0 : null != (r10 = null == e10 ? void 0 : e10.maxLogsPerInterval) ? r10 : 1e3, p2 = z(d2) ? Math.max(h2, 2048) : Math.max(h2, d2), f2 = tb(tb({}, (function() {
      var e11, t11;
      let i11, s11 = "", r11 = "";
      try {
        let e12 = null == c ? void 0 : c.userAgent;
        e12 && ([s11, r11] = te(e12));
      } catch (e12) {
      }
      return e11 = s11, t11 = r11, tb(tb({}, (i11 = (function(e12) {
        if (e12) return {}.hasOwnProperty.call(iu, e12) ? iu[e12] : e12;
      })(e11)) ? { "os.name": i11 } : {}), t11 ? { "os.version": t11 } : {});
    })()), null == e10 ? void 0 : e10.resourceAttributes);
    return { serviceName: null != (n10 = null != (o10 = null == f2 ? void 0 : f2["service.name"]) ? o10 : null == e10 ? void 0 : e10.serviceName) ? n10 : null == t10 ? void 0 : t10.serviceNameDefault, serviceVersion: null != (a10 = null == f2 ? void 0 : f2["service.version"]) ? a10 : null == e10 ? void 0 : e10.serviceVersion, environment: null != (l2 = null == f2 ? void 0 : f2["deployment.environment"]) ? l2 : null == e10 ? void 0 : e10.environment, resourceAttributes: f2, beforeSend: null == e10 ? void 0 : e10.beforeSend, flushIntervalMs: u2, maxBufferSize: h2, maxQueueSize: p2, maxBatchRecordsPerPost: 100, rateCapWindowMs: u2, maxLogsPerInterval: d2, backgroundFlushBudgetMs: 0, terminationFlushBudgetMs: 0 };
  }
  let lm = ["debug", "log", "warn", "error", "info"], ly = (e10) => {
    for (; null == e10 ? void 0 : e10.__rrweb_original__; ) e10 = e10.__rrweb_original__;
    return e10;
  }, lb = "console", lw = "__posthogHandledLogsRequestError", lx = (e10, t10) => {
    let i10 = e10 instanceof Error ? e10 : Error(t10);
    return i10[lw] = true, i10;
  }, lk = (e10) => !!e10 && "object" == typeof e10 && true === e10[lw], lE = iE("[NetworkMetrics]"), l$ = () => {
    var e10;
    return (null == u || null == (e10 = u.performance) ? void 0 : e10.now) ? u.performance.now() : Date.now();
  }, lS = { "http:": 80, "https:": 443 }, lI = /* @__PURE__ */ new Set(["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"]), lP = (e10, t10) => {
    var i10;
    let s10 = String(t10);
    return { method: String(e10).toUpperCase(), url: (null == (i10 = r7(s10)) ? void 0 : i10.href) || s10 };
  }, lF = (e10, t10, i10, s10, r10, n10, o10 = false) => {
    try {
      var a10, l2, u2;
      let h2, c2 = r10();
      if (!c2) return;
      let d2 = i10 || void 0, p2 = l$() - s10, f2 = r7(t10.url);
      if (f2 && "http:" !== f2.protocol && "https:" !== f2.protocol) return;
      let g2 = { url: (null == f2 ? void 0 : f2.href) || t10.url, method: t10.method }, v2 = B(c2.name) ? c2.name(g2) : V(c2.name) ? c2.name : "http.client.request.duration";
      if (!v2) return;
      let _2 = o10 && !d2 ? void 0 : d2 ? 400 > d2 ? void 0 : String(d2) : (null == n10 ? void 0 : n10.name) || "_OTHER", m2 = tb(tb(tb(tb(tb({}, (u2 = g2.method, h2 = lI.has(u2) ? u2 : "_OTHER", tb({ "http.request.method": h2 }, "_OTHER" === h2 && u2 !== h2 ? { "http.request.method_original": u2 } : {}))), f2 ? { "server.address": f2.hostname.startsWith("[") && f2.hostname.endsWith("]") ? f2.hostname.slice(1, -1) : f2.hostname, "server.port": Number(f2.port) || lS[f2.protocol], "url.scheme": f2.protocol.slice(0, -1), "url.template": f2.pathname.split("/").map((e11) => /^\d+$/.test(e11) || e11.length >= 8 && /^[0-9a-f-]*\d[0-9a-f-]*$/i.test(e11) ? ":id" : e11).join("/") } : {}), d2 ? { "http.response.status_code": d2 } : {}), _2 ? { "error.type": _2 } : {}), null == (a10 = c2.attributes) ? void 0 : a10.call(c2, g2, { status: d2, durationMs: p2 }));
      null == (l2 = e10.metrics) || l2.histogram(v2, p2, { unit: "ms", attributes: m2 });
    } catch (e11) {
      lE.error("Failed to record network metric", e11);
    }
  }, lC = () => {
  }, lO = { featureFlags: class {
    constructor(e10) {
      this.name = "featureFlags", this.hd = false, this.featureFlagEventHandlers = [], this.A = a7, this.dd = {}, this.vd = {}, this.fd = [], this.pd = false, this.gd = false, this.md = 0, this.yd = false, this.bd = false, this._d = false, this.wd = false, this.kd = 0, this.Sd = false, this.rn = () => {
        let e11 = this.xd();
        this.kd = 0, e11 && this.reloadFeatureFlags();
      }, this.Cd = () => {
        var e11, t10;
        let i10 = this.$d, s10 = null != (e11 = this.Td) ? e11 : i10;
        z(i10) || z(s10) || this.Ir.remoteRequestsDisabled || !d || "hidden" === d.visibilityState || Date.now() - (null != (t10 = this.Id) ? t10 : 0) < s10 || (this.Td = this.Sd || !this.Ir.idleRefreshBackoff ? i10 : Math.min(2 * s10, 36e5), this.Sd = false, this.reloadFeatureFlags(), this.Md());
      }, this.Ed = () => {
        this.Sd && this.Td === this.$d || this.Pd();
      }, this.sn = () => {
        "visible" === (null == d ? void 0 : d.visibilityState) && this.Pd();
      }, "get" in e10 ? this.wo = e10 : (this._instance = e10, this.Rd = new a9(e10.config, e10.il()), this.wo = this.Rd);
    }
    updateConfig(e10, t10) {
      var i10;
      null == (i10 = this.Rd) || i10.update(e10, t10), this.bo && this.Ad();
    }
    setup(e10) {
      return this.jh = e10, this.A = e10.logger.createLogger("[FeatureFlags]"), aK(e10.kv.initialize(), () => {
        this.jh === e10 && (this.jh = void 0, this.bo = e10, this.Fd(e10));
      });
    }
    Fd(e10) {
      var t10;
      if (this.bo === e10) return u && sG(u, "online", this.rn), this.Ad(), this.Od = e10.registerDynamicEventProperties(() => this.Dd() ? this.dd : this.vd), this.Ld = null == (t10 = this._instance) || null == (t10 = t10.persistence) ? void 0 : t10.onCrossTabFeatureFlagChange(() => {
        this.Nd(), this.qd(), this.jd();
      }), this.qd(), this.initialize();
    }
    Pd() {
      this.Sd = true, this.Td = this.$d, this.Cd();
    }
    Ad() {
      let e10 = this.Ir.refreshIntervalMs, t10 = !this.Ir.remoteRequestsDisabled && d && !z(e10) && e10 > 0 ? e10 : void 0;
      this.Ir.idleRefreshBackoff || (this.Td = t10), t10 !== this.$d && (this.Bd(), z(t10) || (this.$d = t10, this.Td = t10, this.Md(), (null == d ? void 0 : d.addEventListener) && (sG(d, sA, this.sn), sj(ls, (e11) => {
        sG(d, e11, this.Ed, { capture: true });
      }))));
    }
    Md() {
      z(this.$d) || (z(this.Hd) || clearInterval(this.Hd), this.Id = Date.now(), this.Hd = setInterval(this.Cd, this.$d));
    }
    Bd() {
      var e10;
      z(this.Hd) || (clearInterval(this.Hd), this.Hd = void 0, null == d || null == (e10 = d.removeEventListener) || e10.call(d, "visibilitychange", this.sn), sj(ls, (e11) => {
        var t10;
        null == d || null == (t10 = d.removeEventListener) || t10.call(d, e11, this.Ed, { capture: true });
      })), this.$d = void 0, this.Td = void 0, this.Sd = false, this.Id = void 0;
    }
    destroy() {
      this.zd();
    }
    dispose() {
      this.zd();
    }
    zd() {
      var e10, t10;
      this.Bd(), this.md++, this.bd = false, this.jh = void 0, this.bo && (this.Ud(), null == (e10 = this.Od) || e10.dispose(), this.Od = void 0, null == (t10 = this.Ld) || t10.call(this), this.Ld = void 0, this.fd = [], null == u || u.removeEventListener("online", this.rn), this.bo = void 0);
    }
    get Ir() {
      return this.wo.get();
    }
    Wd(e10) {
      var t10;
      return this.Vd && e10 in this.Vd ? this.Vd[e10] : null == (t10 = this.bo) ? void 0 : t10.kv.get(e10);
    }
    Nd() {
      return !!this.Vd && (this.Vd = void 0, true);
    }
    Gd() {
      var e10;
      return !z(null == (e10 = this.bo) ? void 0 : e10.kv.get("$enabled_feature_flags")) && this.Nd();
    }
    $t(e10) {
      this.Zd(() => {
        var t10;
        return null == (t10 = this.bo) ? void 0 : t10.kv.set(e10);
      });
    }
    Qd(e10, t10, i10) {
      var s10;
      if (!(null == (s10 = this._instance) ? void 0 : s10.persistence) || !e10.$enabled_feature_flags) return;
      let r10 = this.Wd("$enabled_feature_flags") || {}, n10 = e10.$enabled_feature_flags || {}, o10 = t10.flags || t10.featureFlags, a10 = t10.flags ? Object.entries(t10.flags).filter(([, e11]) => !(null == e11 ? void 0 : e11.failed)).map(([e11]) => e11) : [], l2 = !!t10.errorsWhileComputingFlags && !!t10.flags, u2 = l2 ? a10 : i10 && !j(o10) ? Object.keys(o10 || {}) : Array.from(/* @__PURE__ */ new Set([...Object.keys(r10), ...Object.keys(n10)])), h2 = this.Wd("$feature_flag_payloads") || {}, c2 = e10.$feature_flag_payloads || {}, d2 = l2 || i10 ? u2 : Array.from(/* @__PURE__ */ new Set([...Object.keys(h2), ...Object.keys(c2)])), p2 = !l2 && !i10, f2 = !!p2 || u2, g2 = { [iZ]: f2, [iQ]: f2, [i2]: !!p2 || d2 };
      for (let t11 of (e10.$feature_flag_details && (g2[i1] = f2), [i3, su, i5])) z(e10[t11]) || (g2[t11] = true);
      this._instance.persistence.markCrossTabFeatureFlagChanges(g2);
    }
    Lt(e10) {
      this.Zd(() => {
        var t10;
        return null == (t10 = this.bo) ? void 0 : t10.kv.remove(e10);
      });
    }
    Zd(e10) {
      try {
        e10();
      } catch (e11) {
        this.A.error("Failed to update feature flag persistence", e11);
      }
    }
    qd() {
      let e10 = {};
      for (let t11 of [iZ, i2, i3, i4]) {
        let i11 = this.Wd(t11);
        z(i11) || (e10[t11] = i11);
      }
      this.dd = e10;
      let t10 = tb({}, e10), i10 = this.Wd(iQ);
      if (i10) for (let [e11, s10] of Object.entries(i10)) t10[`$feature/${e11}`] = s10;
      this.vd = t10;
    }
    Dd() {
      let e10 = this.Ir.cacheTtlMs;
      if (!e10 || 0 >= e10) return false;
      let t10 = this.Wd(su);
      return "number" != typeof t10 || Date.now() - t10 > e10;
    }
    Jd() {
      return !!this.Dd() && (this.wd || this.gd || (this.wd = true, this.A.warn("Feature flag cache is stale, triggering refresh..."), this.reloadFeatureFlags()), true);
    }
    Kd() {
      let e10 = this.Ir.evaluationContexts;
      return (null == e10 ? void 0 : e10.length) ? e10.filter((e11) => {
        let t10 = e11 && "string" == typeof e11 && e11.trim().length > 0;
        return t10 || this.A.error("Invalid evaluation context found:", e11, "Expected non-empty string"), t10;
      }) : [];
    }
    Xd() {
      let e10 = this.Ir.flagKeys;
      if (!z(e10)) return e10.filter((e11) => {
        let t10 = e11 && "string" == typeof e11 && e11.trim().length > 0;
        return t10 || this.A.error("Invalid flag key found:", e11, "Expected non-empty string"), t10;
      });
    }
    initialize() {
      var e10, t10, i10, s10;
      let r10 = this.Ir, n10 = null != (e10 = null == (t10 = r10.bootstrap) ? void 0 : t10.featureFlags) ? e10 : {};
      if (Object.keys(n10).length) {
        let e11 = null != (i10 = null == (s10 = r10.bootstrap) ? void 0 : s10.featureFlagPayloads) ? i10 : {}, t11 = Object.keys(n10).filter((e12) => !z(n10[e12])).reduce((e12, t12) => (e12[t12] = n10[t12], e12), {}), o10 = Object.keys(e11).filter((e12) => t11[e12]).reduce((t12, i11) => (t12[i11] = e11[i11], t12), {});
        return this.Yd({ featureFlags: t11, featureFlagPayloads: o10 }, void 0, { persist: false });
      }
    }
    updateFlags(e10, t10, i10) {
      var s10, r10;
      let n10 = (null == i10 ? void 0 : i10.merge) && null != (s10 = this.Wd("$enabled_feature_flags")) ? s10 : {}, o10 = (null == i10 ? void 0 : i10.merge) && null != (r10 = this.Wd("$feature_flag_payloads")) ? r10 : {}, a10 = tb(tb({}, n10), e10), l2 = tb(tb({}, o10), t10), u2 = {};
      for (let [e11, t11] of Object.entries(a10)) u2[e11] = { key: e11, enabled: t1(t11), variant: t2(t11), reason: void 0, metadata: z(null == l2 ? void 0 : l2[e11]) ? void 0 : { id: 0, version: void 0, description: void 0, payload: l2[e11] } };
      this.Yd({ flags: u2 });
    }
    get hasLoadedFlags() {
      return this.pd;
    }
    getFlags() {
      return Object.keys(this.getFlagVariants());
    }
    getFlagsWithDetails() {
      let e10 = this.Wd(i1), t10 = this.Wd(i4), i10 = this.Wd(i6);
      if (!i10 && !t10) return e10 || {};
      let s10 = sq({}, e10 || {});
      for (let e11 of [.../* @__PURE__ */ new Set([...Object.keys(i10 || {}), ...Object.keys(t10 || {})])]) {
        var r10, n10;
        let o10 = s10[e11], a10 = null == t10 ? void 0 : t10[e11], l2 = z(a10) ? null != (r10 = null == o10 ? void 0 : o10.enabled) && r10 : !!a10, u2 = z(a10) ? null == o10 ? void 0 : o10.variant : "string" == typeof a10 ? a10 : void 0, h2 = null == i10 ? void 0 : i10[e11], c2 = tb(tb({}, o10), {}, { enabled: l2, variant: l2 ? null != u2 ? u2 : null == o10 ? void 0 : o10.variant : void 0 });
        l2 !== (null == o10 ? void 0 : o10.enabled) && (c2.original_enabled = null == o10 ? void 0 : o10.enabled), u2 !== (null == o10 ? void 0 : o10.variant) && (c2.original_variant = null == o10 ? void 0 : o10.variant), h2 && (c2.metadata = tb(tb({}, null == o10 ? void 0 : o10.metadata), {}, { payload: h2, original_payload: null == o10 || null == (n10 = o10.metadata) ? void 0 : n10.payload })), s10[e11] = c2;
      }
      return this.hd || (this.A.warn(" Overriding feature flag details!", { flagDetails: e10, overriddenPayloads: i10, finalDetails: s10 }), this.hd = true), s10;
    }
    getAllFeatureFlags() {
      let e10 = this.getFlagVariants(), t10 = this.getFlagPayloads();
      return Object.keys(e10).map((i10) => {
        let s10 = e10[i10];
        return { key: i10, enabled: t1(s10), variant: t2(s10), payload: t0(t10[i10]) };
      });
    }
    getFlagVariants() {
      let e10 = this.Wd(iQ), t10 = this.Wd(i4);
      if (!t10) return e10 || {};
      let i10 = sq({}, e10 || {}), s10 = Object.keys(t10);
      for (let e11 = 0; s10.length > e11; e11++) i10[s10[e11]] = t10[s10[e11]];
      return this.hd || (this.A.warn(" Overriding feature flags!", { enabledFlags: e10, overriddenFlags: t10, finalFlags: i10 }), this.hd = true), i10;
    }
    getFlagPayloads() {
      let e10 = this.Wd(i2), t10 = this.Wd(i6);
      if (!t10) return e10 || {};
      let i10 = sq({}, e10 || {}), s10 = Object.keys(t10);
      for (let e11 = 0; s10.length > e11; e11++) i10[s10[e11]] = t10[s10[e11]];
      return this.hd || (this.A.warn(" Overriding feature flag payloads!", { flagPayloads: e10, overriddenPayloads: t10, finalPayloads: i10 }), this.hd = true), i10;
    }
    reloadFeatureFlags() {
      this.yd || this.Ir.featureFlagsDisabled || this.xd() || (this.gd && (this.bd = true), this.tv || (this.fd.slice().forEach((e10) => {
        try {
          e10();
        } catch (e11) {
          this.A.error("Error while running feature flags reloading callback", e11);
        }
      }), this.tv = setTimeout(() => {
        this.ev();
      }, 5)));
    }
    Ud() {
      clearTimeout(this.tv), this.tv = void 0;
    }
    onReloading(e10) {
      return this.fd.push(e10), () => {
        this.fd = this.fd.filter((t10) => t10 !== e10);
      };
    }
    ensureFlagsLoaded() {
      this.pd || this.gd || this.tv || this.reloadFeatureFlags();
    }
    setAnonymousDistinctId(e10) {
      this.$anon_distinct_id = e10;
    }
    setReloadingPaused(e10) {
      this.yd = e10;
    }
    resetFlagCallReported() {
      this.Lt(so);
    }
    ev(e10) {
      this.Ud();
      let t10 = this.bo;
      if (!t10 || this.Ir.remoteRequestsDisabled || this.xd()) return;
      if (this.gd) return void (this.bd = true);
      let i10 = { token: t10.projectToken, distinct_id: t10.distinctId, groups: t10.groups, $anon_distinct_id: this.$anon_distinct_id, person_properties: tb(tb(tb({}, t10.initialPersonProperties), this.Wd("$stored_person_properties") || {}), {}, { $lib: t10.library.name, $lib_version: t10.library.version }), group_properties: this.Wd(i9), timezone: n_() };
      z(t10.deviceId) || (i10.$device_id = t10.deviceId), ((null == e10 ? void 0 : e10.disableFlags) || this.Ir.featureFlagsDisabled) && (i10.disable_flags = true);
      let s10 = this.Kd();
      s10.length && (i10.evaluation_contexts = s10);
      let r10 = this.Xd();
      z(r10) || (i10.flag_keys = r10);
      let n10 = this.Ir.onlyEvaluateSurveyFeatureFlags, o10 = "/flags/?v=2" + (n10 ? "&only_evaluate_survey_feature_flags=true" : ""), a10 = this.md;
      this.gd = true;
      let l2 = () => {
        this.bd && (this.bd = false, this.ev());
      }, u2 = (e11) => {
        var t11, s11;
        let r11 = null != (t11 = e11.json) ? t11 : {}, o11 = 200 !== e11.statusCode;
        if (this.gd = false, a10 !== this.md) return void l2();
        if (this.iv(e11.statusCode), o11 || this.bd || (this.$anon_distinct_id = void 0), i10.disable_flags && !this.bd) return;
        this._d = !o11;
        let u3 = [];
        e11.error ? u3.push(e11.error instanceof Error && "AbortError" === e11.error.name ? "timeout" : e11.error instanceof Error ? lr : "unknown_error") : 200 !== e11.statusCode && u3.push(`api_error_${e11.statusCode}`), r11.errorsWhileComputingFlags && u3.push("errors_while_computing_flags");
        let h3 = !!(null == (s11 = r11.quotaLimited) ? void 0 : s11.includes("feature_flags"));
        h3 && u3.push("quota_limited"), this.$t({ [sl]: u3 }), h3 ? this.A.warn("You have hit your feature flags quota limit, and will not be able to load feature flags until the quota is reset.  Please visit https://posthog.com/docs/billing/limits-alerts to learn more.") : i10.disable_flags || this.Yd(r11, o11, { partialResponse: n10 }), l2();
      }, h2 = (e11) => {
        this.gd = false, a10 === this.md && (this.$t({ [sl]: [lr] }), this.A.error("Feature flag request failed", e11), this.Gd() && this.jd(true)), l2();
      }, c2 = this.Ir.requestMaxRetries, d2 = () => c2 > 0 && a10 === this.md, p2 = () => {
        if (a10 !== this.md || !this.bo || this.Ir.remoteRequestsDisabled) return this.gd = false, void l2();
        try {
          t10.sendRequest(o10, { target: "flags", method: "POST", body: i10, compression: this.Ir.compression, sentAt: "body", timeoutMs: this.Ir.requestTimeoutMs }).then((e11) => {
            (li.includes(e11.statusCode) || 0 === e11.statusCode && e11.error instanceof Error && "AbortError" === e11.error.name) && d2() ? (c2--, setTimeout(p2, 500)) : u2(e11);
          }).catch(h2);
        } catch (e11) {
          h2(e11);
        }
      };
      p2();
    }
    xd() {
      return ns(this.kd, 3);
    }
    iv(e10) {
      this.kd = nr(e10, this.kd, 3, () => this.A.warn("Feature flag requests are failing before receiving an HTTP response; this can happen due to network issues, CORS, browser blocking, or ad blockers. Stopped refreshing feature flags; will try again when connectivity changes."));
    }
    getFeatureFlag(e10, t10 = {}) {
      var i10;
      if (t10.fresh && !this._d) return;
      if (!(this.pd || this.getFlags() && this.getFlags().length > 0)) return void this.A.warn('getFeatureFlag for key "' + e10 + lt);
      if (this.Jd()) return;
      let s10 = this.getFeatureFlagResult(e10, t10);
      return null != (i10 = null == s10 ? void 0 : s10.variant) ? i10 : null == s10 ? void 0 : s10.enabled;
    }
    getFeatureFlagDetails(e10) {
      return this.getFlagsWithDetails()[e10];
    }
    getFeatureFlagPayload(e10) {
      let t10 = this.getFeatureFlagResult(e10, { send_event: false });
      return null == t10 ? void 0 : t10.payload;
    }
    getFeatureFlagResult(e10, t10 = {}) {
      var i10, s10, r10, n10, o10, a10, l2, u2, h2, c2, d2, p2, f2, g2;
      if (t10.fresh && !this._d) return;
      if (!(this.pd || this.getFlags() && this.getFlags().length > 0)) return void this.A.warn('getFeatureFlagResult for key "' + e10 + lt);
      if (this.Jd()) return;
      let v2 = this.getFlagVariants(), _2 = e10 in v2, m2 = v2[e10], y2 = this.getFlagPayloads()[e10], b2 = String(m2), w2 = this.Wd("$feature_flag_request_id") || void 0, x2 = this.Wd("$feature_flag_evaluated_at") || void 0, k2, E2 = this.Wd("$flag_call_reported") || {};
      if (this.Ir.deduplicateCallsPerSession) {
        let e11 = null == (i10 = this.bo) ? void 0 : i10.session.sessionId, t11 = this.Wd(sa);
        e11 && e11 !== t11 && (E2 = {}, k2 = e11);
      }
      if (!t10.send_event && "send_event" in t10) k2 && this.$t({ [so]: E2, [sa]: k2 });
      else if (e10 in E2 && E2[e10].includes(b2)) k2 && this.$t({ [so]: E2, [sa]: k2 });
      else {
        j(E2[e10]) ? E2[e10].push(b2) : E2[e10] = [b2], this.$t(tb({ [so]: E2 }, k2 ? { [sa]: k2 } : {}));
        let t11 = this.getFeatureFlagDetails(e10), i11 = [...null != (s10 = this.Wd("$feature_flag_errors")) ? s10 : []];
        z(m2) && i11.push("flag_missing");
        let v3 = { $feature_flag: e10, $feature_flag_response: m2, $feature_flag_payload: null != y2 ? y2 : null, $feature_flag_request_id: w2, $feature_flag_evaluated_at: x2, $feature_flag_bootstrapped_response: null != (r10 = null == (n10 = this.Ir.bootstrap) || null == (n10 = n10.featureFlags) ? void 0 : n10[e10]) ? r10 : null, $feature_flag_bootstrapped_payload: null != (o10 = null == (a10 = this.Ir.bootstrap) || null == (a10 = a10.featureFlagPayloads) ? void 0 : a10[e10]) ? o10 : null, $used_bootstrap_value: !this._d };
        z(null == t11 || null == (l2 = t11.metadata) ? void 0 : l2.has_experiment) || (v3.$feature_flag_has_experiment = t11.metadata.has_experiment), z(null == t11 || null == (u2 = t11.metadata) ? void 0 : u2.version) || (v3.$feature_flag_version = t11.metadata.version);
        let _3 = null != (h2 = null == t11 || null == (c2 = t11.reason) ? void 0 : c2.description) ? h2 : null == t11 || null == (d2 = t11.reason) ? void 0 : d2.code;
        _3 && (v3.$feature_flag_reason = _3), (null == t11 || null == (p2 = t11.metadata) ? void 0 : p2.id) && (v3.$feature_flag_id = t11.metadata.id), z(null == t11 ? void 0 : t11.original_variant) && z(null == t11 ? void 0 : t11.original_enabled) || (v3.$feature_flag_original_response = z(t11.original_variant) ? t11.original_enabled : t11.original_variant), (null == t11 || null == (f2 = t11.metadata) ? void 0 : f2.original_payload) && (v3.$feature_flag_original_payload = null == t11 || null == (g2 = t11.metadata) ? void 0 : g2.original_payload), i11.length && (v3.$feature_flag_error = i11.join(",")), this.nv(v3);
      }
      return _2 ? { key: e10, enabled: !!m2, variant: "string" == typeof m2 ? m2 : void 0, payload: t0(y2) } : void 0;
    }
    nv(e10) {
      try {
        var t10;
        null == (t10 = this.bo) || t10.capture("$feature_flag_called", e10);
      } catch (e11) {
        this.A.error("Failed to capture feature flag call", e11);
      }
    }
    getRemoteConfigPayload(e10, t10) {
      this.sv(e10, t10);
    }
    sv(e10, t10) {
      var i10 = this;
      return ea(function* () {
        let s10, r10 = i10.bo;
        if (!r10) return;
        let n10 = { distinct_id: r10.distinctId, token: r10.projectToken, person_properties: { $lib: r10.library.name, $lib_version: r10.library.version } }, o10 = i10.Kd();
        o10.length && (n10.evaluation_contexts = o10);
        let a10 = i10.Xd();
        z(a10) || (n10.flag_keys = a10);
        try {
          var l2;
          let t11 = null == (l2 = (yield r10.sendRequest("/flags/?v=2", { target: "flags", method: "POST", body: n10, compression: i10.Ir.compression, sentAt: "body", timeoutMs: i10.Ir.requestTimeoutMs })).json) ? void 0 : l2.featureFlagPayloads;
          s10 = (null == t11 ? void 0 : t11[e10]) || void 0;
        } catch (e11) {
          return void i10.A.error("Remote config feature flag request failed", e11);
        }
        try {
          t10(s10);
        } catch (e11) {
          i10.A.error("Remote config feature flag callback failed", e11);
        }
      })();
    }
    isFeatureEnabled(e10, t10 = {}) {
      if (t10.fresh && !this._d) return t10.defaultValue;
      if (!(this.pd || this.getFlags() && this.getFlags().length > 0)) return this.A.warn('isFeatureEnabled for key "' + e10 + lt), t10.defaultValue;
      let i10 = this.getFeatureFlag(e10, t10);
      return z(i10) ? t10.defaultValue : !!i10;
    }
    addFeatureFlagsHandler(e10) {
      this.featureFlagEventHandlers.push(e10);
    }
    removeFeatureFlagsHandler(e10) {
      this.featureFlagEventHandlers = this.featureFlagEventHandlers.filter((t10) => t10 !== e10);
    }
    receivedFeatureFlags(e10, t10, i10) {
      this.Yd(e10, t10, i10);
    }
    Yd(e10, t10, i10) {
      if (!this.bo) return;
      this.pd = true;
      let s10 = ((e11, t11 = {}, i11 = {}, s11 = {}, r10, n10 = a7) => {
        let o10 = ((e12, t12) => {
          let i12 = e12.flags;
          if (i12) {
            let t13 = Object.fromEntries(Object.keys(i12).map((e13) => {
              var t14;
              return [e13, null != (t14 = i12[e13].variant) ? t14 : i12[e13].enabled];
            })), s12 = Object.fromEntries(Object.keys(i12).filter((e13) => i12[e13].enabled).filter((e13) => {
              var t14;
              return !z(null == (t14 = i12[e13].metadata) ? void 0 : t14.payload);
            }).map((e13) => {
              var t14;
              return [e13, null == (t14 = i12[e13].metadata) ? void 0 : t14.payload];
            }));
            return tb(tb({}, e12), {}, { featureFlags: t13, featureFlagPayloads: s12 });
          }
          return e12.featureFlags && t12.warn("Using an older version of the feature flags endpoint. Please upgrade your PostHog server to the latest version"), e12;
        })(e11, n10), a10 = o10.flags, l2 = o10.featureFlags, u2 = o10.featureFlagPayloads;
        if (!l2) return;
        let h2 = e11.requestId, c2 = e11.evaluatedAt;
        if (j(l2)) {
          n10.warn("v1 of the feature flags endpoint is deprecated. Please use the latest version.");
          let e12 = {};
          if (l2) for (let t12 = 0; l2.length > t12; t12++) e12[l2[t12]] = true;
          return { [iZ]: l2, [iQ]: e12, [i5]: false };
        }
        let d2 = l2, p2 = u2, f2 = a10;
        if (null == r10 ? void 0 : r10.partialResponse) {
          let e12 = Object.keys(d2), r11 = p2 || {};
          d2 = tb(tb({}, t11), d2), p2 = tb(tb({}, i11), r11), e12.forEach((e13) => {
            e13 in r11 || null == p2 || delete p2[e13];
          }), f2 = tb(tb({}, s11), f2);
        } else if (e11.errorsWhileComputingFlags) if (a10) {
          let e12 = new Set(Object.keys(a10).filter((e13) => {
            var t12;
            return !(null == (t12 = a10[e13]) ? void 0 : t12.failed);
          }));
          d2 = tb(tb({}, t11), Object.fromEntries(Object.entries(d2).filter(([t12]) => e12.has(t12))));
          let r11 = Object.fromEntries(Object.entries(p2 || {}).filter(([t12]) => e12.has(t12)));
          p2 = tb(tb({}, i11), r11), e12.forEach((e13) => {
            e13 in r11 || null == p2 || delete p2[e13];
          }), f2 = tb(tb({}, s11), Object.fromEntries(Object.entries(f2 || {}).filter(([t12]) => e12.has(t12))));
        } else d2 = tb(tb({}, t11), d2), p2 = tb(tb({}, i11), p2), f2 = tb(tb({}, s11), f2);
        return tb(tb({ [iZ]: Object.keys(lo(d2)), [iQ]: d2 || {}, [i2]: p2 || {}, [i1]: f2 || {}, [i5]: true === e11.minimalFlagCalledEvents }, h2 ? { [i3]: h2 } : {}), c2 ? { [su]: c2 } : {});
      })(e10, this.getFlagVariants(), this.getFlagPayloads(), this.getFlagsWithDetails(), i10, this.A);
      if (s10) if (false === (null == i10 ? void 0 : i10.persist)) {
        let e11 = !z(this.bo.kv.get(iQ));
        this.Vd = s10, e11 || this.$t(s10);
      } else this.Nd(), this.Qd(s10, e10, !!(null == i10 ? void 0 : i10.partialResponse)), this.$t(s10);
      else t10 && this.Gd();
      t10 || (this.wd = false), this.jd(t10);
    }
    override(e10, t10 = false) {
      this.A.warn("override is deprecated. Please use overrideFeatureFlags instead."), this.overrideFeatureFlags({ flags: e10, suppressWarning: t10 });
    }
    overrideFeatureFlags(e10) {
      this.rv(e10);
    }
    rv(e10) {
      if (this.bo) {
        if (false === e10) return this.Lt([i4, i6]), this.jd(), void le.info("All overrides cleared");
        if (j(e10)) return this.$t({ [i4]: ln(e10) }), this.jd(), void le.info("Flag overrides set", { flags: e10 });
        if (e10 && "object" == typeof e10 && ("flags" in e10 || "payloads" in e10)) {
          var t10;
          this.hd = !!(null != (t10 = e10.suppressWarning) && t10);
          let i10 = {}, s10 = e10.flags, r10 = e10.payloads;
          return s10 && (i10[i4] = j(s10) ? ln(s10) : s10), r10 && (i10[i6] = r10), Object.keys(i10).length && this.$t(i10), false === s10 && false === r10 ? this.Lt([i4, i6]) : false === s10 ? this.Lt(i4) : false === r10 && this.Lt(i6), this.jd(), false === s10 ? le.info("Flag overrides cleared") : s10 && le.info("Flag overrides set", { flags: s10 }), void (false === r10 ? le.info("Payload overrides cleared") : r10 && le.info("Payload overrides set", { payloads: r10 }));
        }
        if (e10 && "object" == typeof e10) return this.$t({ [i4]: e10 }), this.jd(), void le.info("Flag overrides set", { flags: e10 });
        this.A.warn("Invalid overrideOptions provided to overrideFeatureFlags", { overrideOptions: e10 });
      } else this.A.warn("posthog.featureFlags.overrideFeatureFlags called before feature flags were ready");
    }
    onFeatureFlags(e10) {
      if (this.addFeatureFlagsHandler(e10), this.pd) {
        let { flags: t10, flagVariants: i10 } = this.ov();
        try {
          e10(t10, i10);
        } catch (e11) {
          this.A.error("Error while running feature flags callback", e11);
        }
      }
      return () => this.removeFeatureFlagsHandler(e10);
    }
    updateEarlyAccessFeatureEnrollment(e10, t10, i10) {
      var s10, r10;
      let n10 = (this.Wd("$early_access_features") || []).find((t11) => t11.flagKey === e10), o10 = { [`$feature_enrollment/${e10}`]: t10 }, a10 = { $feature_flag: e10, $feature_enrollment: t10, $set: o10 };
      n10 && (a10.$early_access_feature_name = n10.name), i10 && (a10.$feature_enrollment_stage = i10);
      let l2 = tb(tb({}, this.getFlagVariants()), {}, { [e10]: t10 });
      null == (s10 = this._instance) || null == (s10 = s10.persistence) || s10.markCrossTabFeatureFlagChanges({ $active_feature_flags: [e10], $enabled_feature_flags: [e10], $stored_person_properties: Object.keys(o10) }), this.$t({ [iZ]: Object.keys(lo(l2)), [iQ]: l2, [i8]: tb(tb({}, this.Wd("$stored_person_properties") || {}), o10) }), this.jd();
      try {
        null == (r10 = this.bo) || r10.capture("$feature_enrollment_update", a10);
      } catch (e11) {
        this.A.error("Failed to capture early access feature enrollment", e11);
      }
    }
    getEarlyAccessFeatures(e10, t10 = false, i10) {
      let s10 = this.Wd(i0);
      !s10 || t10 ? this.av(e10, i10) : e10(s10);
    }
    av(e10, t10) {
      var i10 = this;
      return ea(function* () {
        let s10, r10 = i10.bo;
        if (!r10) return;
        let n10 = t10 ? `&${t10.map((e11) => `stage=${e11}`).join("&")}` : "";
        try {
          let e11 = yield r10.sendRequest(`/api/early_access_features/?token=${r10.projectToken}${n10}`, { target: "api", method: "GET", sentAt: "query" });
          if (!e11.json) return;
          s10 = e11.json.earlyAccessFeatures, i10.$t({ [i0]: s10 });
        } catch (e11) {
          return void i10.A.error("Early access feature request failed", e11);
        }
        try {
          e10(s10);
        } catch (e11) {
          i10.A.error("Early access feature callback failed", e11);
        }
      })();
    }
    ov() {
      let e10 = this.getFlags(), t10 = this.getFlagVariants();
      return { flags: e10.filter((e11) => t10[e11]), flagVariants: Object.keys(t10).filter((e11) => t10[e11]).reduce((e11, i10) => (e11[i10] = t10[i10], e11), {}) };
    }
    jd(e10) {
      this.qd();
      let { flags: t10, flagVariants: i10 } = this.ov();
      this.featureFlagEventHandlers.forEach((s10) => {
        try {
          s10(t10, i10, { errorsLoading: e10 });
        } catch (e11) {
          this.A.error("Error while running feature flags callback", e11);
        }
      });
    }
    setPersonPropertiesForFlags(e10, t10 = true) {
      this.lv(e10, t10);
    }
    lv(e10, t10 = true) {
      let i10 = this.Wd("$stored_person_properties") || {}, s10 = (null == e10 ? void 0 : e10.$set) || ((null == e10 ? void 0 : e10.$set_once) ? {} : e10), r10 = null == e10 ? void 0 : e10.$set_once, n10 = {};
      if (r10) for (let e11 in r10) ({}).hasOwnProperty.call(r10, e11) && (e11 in i10 || (n10[e11] = r10[e11]));
      this.$t({ [i8]: tb(tb(tb({}, i10), n10), s10) }), t10 && this.reloadFeatureFlags();
    }
    unsetPersonPropertiesForFlags(e10, t10 = true) {
      let i10 = tb({}, this.Wd("$stored_person_properties") || {});
      e10.forEach((e11) => {
        delete i10[e11];
      }), this.$t({ [i8]: i10 }), t10 && this.reloadFeatureFlags();
    }
    resetPersonPropertiesForFlags(e10 = true) {
      this.Lt(i8), e10 && this.reloadFeatureFlags();
    }
    setGroupPropertiesForFlags(e10, t10 = true) {
      let i10 = this.Wd("$stored_group_properties") || {}, s10 = tb({}, i10);
      for (let t11 of Object.keys(e10)) s10[t11] = tb(tb({}, i10[t11]), e10[t11]);
      this.$t({ [i9]: s10 }), t10 && this.reloadFeatureFlags();
    }
    resetGroupPropertiesForFlags(e10) {
      if (e10) {
        let t10 = this.Wd("$stored_group_properties") || {};
        this.$t({ [i9]: tb(tb({}, t10), {}, { [e10]: {} }) });
      } else this.Lt(i9);
    }
    reset() {
      this.md++, this.bd = false, this.dd = {}, this.vd = {}, this.Vd = void 0, this.pd = false, this.yd = false, this._d = false, this.$anon_distinct_id = void 0, this.Ud(), this.hd = false, this.kd = 0;
    }
  } }, lT = tb({ productTours: class {
    get Il() {
      return this._instance.persistence;
    }
    constructor(e10) {
      this.Tf = null, this.If = null, this._instance = e10;
    }
    initialize() {
      this.loadIfEnabled();
    }
    onRemoteConfig(e10) {
      if (!e10.ok) return;
      let t10 = e10.config;
      if ("productTours" in t10) {
        var i10, s10;
        if (this.Il && this.Il.register({ [iU]: !!t10.productTours }), !aV(this._instance)) return !this.Tf && G(null == (i10 = this.Il) ? void 0 : i10.props.ph_product_tours) || az.info("product tours disabled; stopping and clearing cached tours"), null == (s10 = this.Tf) || s10.stop(), this.Tf = null, void this.clearCache();
        this.loadIfEnabled();
      }
    }
    loadIfEnabled() {
      !this.Tf && aV(this._instance) && this.Ho(() => this.Mf());
    }
    Ho(e10) {
      var t10, i10, s10;
      (null == (t10 = w.__PosthogExtensions__) ? void 0 : t10.generateProductTours) ? e10() : null == (i10 = w.__PosthogExtensions__) || null == (s10 = i10.loadExternalDependency) || s10.call(i10, this._instance, "product-tours", (t11) => {
        t11 ? az.error("Could not load product tours script", t11) : e10();
      });
    }
    Mf() {
      var e10;
      !this.Tf && (null == (e10 = w.__PosthogExtensions__) ? void 0 : e10.generateProductTours) && (this.Tf = w.__PosthogExtensions__.generateProductTours(this._instance, true));
    }
    getProductTours(e10, t10 = false) {
      if (j(this.If) && !t10) return void e10(this.If, { isLoaded: true });
      let i10 = this.Il;
      if (i10) {
        let s10 = i10.props[sn];
        if (j(s10) && !t10) return this.If = s10, void e10(s10, { isLoaded: true });
      }
      this._instance._send_request({ url: this._instance.requestRouter.endpointFor("api", `/api/product_tours/?token=${this._instance.config.token}`), method: "GET", timestampMode: "query", callback: (t11) => {
        if (!aV(this._instance)) return void e10([], { isLoaded: true });
        let s10 = t11.statusCode;
        if (200 !== s10 || !t11.json) {
          let i11 = `Product Tours API could not be loaded, status: ${s10}`;
          return 0 === s10 ? t11.error || az.warn(i11) : az.error(i11), void e10([], { isLoaded: false, error: i11 });
        }
        let r10 = j(t11.json.product_tours) ? t11.json.product_tours : [];
        this.If = r10, i10 && i10.register({ [sn]: r10 }), e10(r10, { isLoaded: true });
      } });
    }
    getActiveProductTours(e10) {
      G(this.Tf) ? e10([], { isLoaded: false, error: "Product tours not loaded" }) : this.Tf.getActiveProductTours(e10);
    }
    showProductTour(e10) {
      var t10;
      null == (t10 = this.Tf) || t10.showTourById(e10);
    }
    previewTour(e10) {
      this.Tf ? this.Tf.previewTour(e10) : this.Ho(() => {
        var t10;
        this.Mf(), null == (t10 = this.Tf) || t10.previewTour(e10);
      });
    }
    dismissProductTour() {
      var e10;
      null == (e10 = this.Tf) || e10.dismissTour("user_clicked_skip");
    }
    nextStep() {
      var e10;
      null == (e10 = this.Tf) || e10.nextStep();
    }
    previousStep() {
      var e10;
      null == (e10 = this.Tf) || e10.previousStep();
    }
    clearCache() {
      var e10;
      this.If = null, null == (e10 = this.Il) || e10.unregister("ph_product_tours");
    }
    resetTour(e10) {
      var t10;
      null == (t10 = this.Tf) || t10.resetTour(e10);
    }
    resetAllTours() {
      var e10;
      null == (e10 = this.Tf) || e10.resetAllTours();
    }
    cancelPendingTour(e10) {
      var t10;
      null == (t10 = this.Tf) || t10.cancelPendingTour(e10);
    }
  } }, lO), lA = tb({ surveys: class extends aY {
    constructor(e10) {
      super(new a3(e10), { get projectToken() {
        return e10.config.token;
      }, kv: new a2(e10) }), this._instance = e10;
    }
    Zh(e10, t10) {
      let i10 = t10.query ? om(e10, t10.query) : e10;
      return new Promise((e11) => {
        var s10;
        this._instance._send_request({ method: t10.method, url: this._instance.requestRouter.endpointFor(null != (s10 = t10.target) ? s10 : "api", i10), data: t10.body, headers: t10.headers, timeout: t10.timeoutMs, fireCallbackOnDrop: true, transport: t10.transport, compression: t10.compression, timestampMode: t10.sentAt, callback: e11 });
      });
    }
  } }, lO), lM = tb({ experiments: class e10 {
    get Ir() {
      return this._instance.config;
    }
    constructor(t10) {
      this._instance = t10, this.getWebExperimentsAndEvaluateDisplayLogic = (t11 = false) => {
        this.getWebExperiments((t12) => {
          e10.Jf("retrieved web experiments from the server"), this.Kf = /* @__PURE__ */ new Map(), t12.forEach((t13) => {
            if (t13.feature_flag_key) {
              var i10;
              this.Kf && (e10.Jf("setting flag key ", t13.feature_flag_key, " to web experiment ", t13), null == (i10 = this.Kf) || i10.set(t13.feature_flag_key, t13));
              let s10 = this._instance.getFeatureFlag(t13.feature_flag_key);
              V(s10) && t13.variants[s10] && this.Xf(t13.name, s10, t13.variants[s10].transforms);
            } else if (t13.variants) for (let i11 in t13.variants) {
              let s10 = t13.variants[i11];
              e10.Yf(s10, this._instance) && this.Xf(t13.name, i11, s10.transforms);
            }
          });
        }, t11);
      }, this._instance.onFeatureFlags((e11) => {
        this.onFeatureFlags(e11);
      });
    }
    initialize() {
    }
    onFeatureFlags(t10) {
      if (this._is_bot()) e10.Jf(lp);
      else if (!this.Ir.disable_web_experiments) {
        if (G(this.Kf)) return this.Kf = /* @__PURE__ */ new Map(), this.loadIfEnabled(), void this.previewWebExperiment();
        e10.Jf("applying feature flags", t10), t10.forEach((e11) => {
          var t11, i10;
          if (this.Kf && (null == (t11 = this.Kf) ? void 0 : t11.has(e11))) {
            let t12 = this._instance.getFeatureFlag(e11), s10 = null == (i10 = this.Kf) ? void 0 : i10.get(e11);
            t12 && (null == s10 ? void 0 : s10.variants[t12]) && this.Xf(s10.name, t12, s10.variants[t12].transforms);
          }
        });
      }
    }
    previewWebExperiment() {
      let t10 = e10.getWindowLocation();
      if (null == t10 ? void 0 : t10.search) {
        let i10 = ne(null == t10 ? void 0 : t10.search, "__experiment_id"), s10 = ne(null == t10 ? void 0 : t10.search, "__experiment_variant");
        i10 && s10 && (e10.Jf(`previewing web experiments ${i10} && ${s10}`), this.getWebExperiments((e11) => {
          this.tp(parseInt(i10), s10, e11);
        }, false, true));
      }
    }
    loadIfEnabled() {
      this.Ir.disable_web_experiments || this.getWebExperimentsAndEvaluateDisplayLogic();
    }
    getWebExperiments(e11, t10, i10) {
      if (this.Ir.disable_web_experiments && !i10) return e11([]);
      let s10 = this._instance.get_property("$web_experiments");
      if (s10 && !t10) return e11(s10);
      this._instance._send_request({ url: this._instance.requestRouter.endpointFor("api", `/api/web_experiments/?token=${this.Ir.token}`), method: "GET", timestampMode: "query", callback: (t11) => e11(200 === t11.statusCode && t11.json && t11.json.experiments || []) });
    }
    tp(t10, i10, s10) {
      let r10 = s10.filter((e11) => e11.id === t10);
      r10 && r10.length > 0 && (e10.Jf(`Previewing web experiment [${r10[0].name}] with variant [${i10}]`), this.Xf(r10[0].name, i10, r10[0].variants[i10].transforms));
    }
    static Yf(t10, i10) {
      return !G(t10.conditions) && e10.ep(t10, i10) && e10.np(t10);
    }
    static ep(t10, i10) {
      var s10, r10, n10, o10;
      if (G(t10.conditions) || G(null == (s10 = t10.conditions) ? void 0 : s10.url)) return true;
      let a10 = e10.getWindowLocation();
      if (a10) {
        let e11 = rd(i10, a10.href);
        return !(null == (r10 = t10.conditions) ? void 0 : r10.url) || lf[null != (n10 = null == (o10 = t10.conditions) ? void 0 : o10.urlMatchType) ? n10 : "icontains"](t10.conditions.url, e11);
      }
      return false;
    }
    static getWindowLocation() {
      return null == u ? void 0 : u.location;
    }
    static np(e11) {
      var t10, i10, s10, r10, n10, o10, a10, l2, u2;
      if (G(e11.conditions) || G(null == (t10 = e11.conditions) ? void 0 : t10.utm)) return true;
      let h2 = nu();
      if (h2.utm_source) {
        let t11 = !(null == (i10 = e11.conditions) || null == (i10 = i10.utm) ? void 0 : i10.utm_campaign) || (null == (s10 = e11.conditions) || null == (s10 = s10.utm) ? void 0 : s10.utm_campaign) == h2.utm_campaign, c2 = !(null == (r10 = e11.conditions) || null == (r10 = r10.utm) ? void 0 : r10.utm_source) || (null == (n10 = e11.conditions) || null == (n10 = n10.utm) ? void 0 : n10.utm_source) == h2.utm_source, d2 = !(null == (o10 = e11.conditions) || null == (o10 = o10.utm) ? void 0 : o10.utm_medium) || (null == (a10 = e11.conditions) || null == (a10 = a10.utm) ? void 0 : a10.utm_medium) == h2.utm_medium, p2 = !(null == (l2 = e11.conditions) || null == (l2 = l2.utm) ? void 0 : l2.utm_term) || (null == (u2 = e11.conditions) || null == (u2 = u2.utm) ? void 0 : u2.utm_term) == h2.utm_term;
        return t11 && d2 && p2 && c2;
      }
      return false;
    }
    static Jf(e11, ...t10) {
      ik.info(`[WebExperiments] ${e11}`, t10);
    }
    Xf(t10, i10, s10) {
      this._is_bot() ? e10.Jf(lp) : "control" !== i10 ? s10.forEach((s11) => {
        if (s11.selector) {
          var r10;
          e10.Jf(`applying transform of variant ${i10} for experiment ${t10} `, s11);
          let n10 = null == (r10 = document) ? void 0 : r10.querySelectorAll(s11.selector);
          null == n10 || n10.forEach((e11) => {
            s11.html && (e11.innerHTML = s11.html), s11.css && e11.setAttribute("style", s11.css);
          });
        }
      }) : e10.Jf("Control variants leave the page unmodified.");
    }
    _is_bot() {
      return c && this._instance ? oH(c, this.Ir.custom_blocked_useragents) : void 0;
    }
  } }, lO);
  aw.__defaultExtensionClasses = tb({}, tb(tb(tb(tb(tb(tb(tb(tb(tb(tb(tb(tb(tb({}, lO), { sessionRecording: class {
    get Ir() {
      return this._instance.config;
    }
    get Il() {
      return this._instance.persistence;
    }
    get started() {
      var e10;
      return !!(null == (e10 = this.uv) ? void 0 : e10.isStarted);
    }
    get status() {
      var e10, t10;
      return "awaiting_config" === this.hv || "missing_config" === this.hv ? this.hv : null != (e10 = null == (t10 = this.uv) ? void 0 : t10.status) ? e10 : this.hv;
    }
    constructor(e10) {
      if (this._instance = e10, this._forceAllowLocalhostNetworkCapture = false, this.hv = aD, this.dv = void 0, this.vv = false, this.Je = (() => {
        var e11, t10;
        if (!(null == d ? void 0 : d.visibilityState) || "visible" === d.visibilityState) return true;
        let i10 = null == u || null == (e11 = u.performance) || null == (t10 = e11.getEntriesByType) ? void 0 : t10.call(e11, "visibility-state");
        return !(null == i10 ? void 0 : i10.length) || i10.some((e12) => "visible" === e12.name);
      })(), this.sn = () => {
        var e11, t10;
        "visible" === (null == d ? void 0 : d.visibilityState) && (this.Je = true, null == (e11 = this.uv) || null == (t10 = e11.setDocumentWasEverVisible) || t10.call(e11, true));
      }, !this._instance.sessionManager) throw aj.error("started without valid sessionManager"), Error("[SessionRecording] started without valid sessionManager. This is a bug.");
      if ("always" === this.Ir.cookieless_mode) throw Error('[SessionRecording] cannot be used with cookieless_mode="always"');
      (null == d ? void 0 : d.addEventListener) && sG(d, "visibilitychange", this.sn);
    }
    initialize() {
      this.startIfEnabledOrStop();
    }
    dispose({ discardBufferedEvents: e10 = false } = {}) {
      var t10;
      this.vv = true, null == d || null == (t10 = d.removeEventListener) || t10.call(d, "visibilitychange", this.sn), e10 ? this.fv(true) : this.stopRecording();
    }
    get pv() {
      var e10;
      let t10 = !!(null == (e10 = this._instance.get_property("$session_recording_remote_config")) ? void 0 : e10.enabled), i10 = !this.Ir.disable_session_recording, s10 = this.Ir.disable_session_recording || this._instance.consent.isOptedOut();
      return u && t10 && i10 && !s10;
    }
    startIfEnabledOrStop(e10) {
      var t10;
      if (this.vv || this.pv && (null == (t10 = this.uv) ? void 0 : t10.isStarted)) return;
      let i10 = !z(Object.assign) && !z(Array.from);
      this.pv && i10 ? (this.gv(e10), aj.info("starting")) : (this.hv = aD, this.stopRecording());
    }
    gv(e10) {
      var t10, i10, s10, r10;
      if (this.pv) if ("awaiting_config" !== this.hv && "missing_config" !== this.hv && (this.hv = aN), (null == w || null == (t10 = w.__PosthogExtensions__) || null == (t10 = t10.rrweb) ? void 0 : t10.record) && (null == (i10 = w.__PosthogExtensions__) ? void 0 : i10.initSessionRecording)) this.mv(e10);
      else {
        let t11 = this._instance.sessionManager;
        null == (s10 = w.__PosthogExtensions__) || null == (r10 = s10.loadExternalDependency) || r10.call(s10, this._instance, this.yv, (i11) => {
          if (!this.vv && this.pv && this._instance.sessionManager === t11) return i11 ? (this._instance.register_for_session({ $sdk_debug_recording_script_not_loaded: true }), aj.error("could not load recorder", i11)) : void this.mv(e10);
          this.hv = "disabled";
        });
      }
    }
    stopRecording() {
      var e10, t10;
      null == (e10 = this.dv) || e10.call(this), this.dv = void 0, null == (t10 = this.uv) || t10.stop();
    }
    fv(e10 = false) {
      var t10, i10;
      null == (t10 = this.dv) || t10.call(this), this.dv = void 0, null == (i10 = this.uv) || i10.discard({ discardProducerEvents: e10 });
    }
    bv() {
      var e10, t10;
      null == (e10 = this.Il) || e10.unregister("$session_is_sampled"), null == (t10 = this.Il) || t10.unregister("$replay_sample_rate");
    }
    _v(e10, t10) {
      if (G(e10)) return null;
      let i10 = K(e10) ? e10 : parseFloat(e10);
      return "number" != typeof i10 || !Number.isFinite(i10) || 0 > i10 || i10 > 1 ? (aj.warn(`${t10} must be between 0 and 1. Ignoring invalid value:`, e10), null) : i10;
    }
    wv(e10) {
      if (this.Il) {
        var t10, i10;
        let s10 = this.Il, r10 = () => {
          var t11;
          let i11 = false === e10.sessionRecording ? void 0 : e10.sessionRecording, r11 = this._v(null == (t11 = this.Ir.session_recording) ? void 0 : t11.sampleRate, "session_recording.sampleRate"), n10 = this._v(null == i11 ? void 0 : i11.sampleRate, "remote config sampleRate"), o10 = null != r11 ? r11 : n10;
          G(o10) && this.bv();
          let a10 = null == i11 ? void 0 : i11.minimumDurationMilliseconds;
          s10.register({ [iJ]: tb(tb({ cache_timestamp: Date.now(), enabled: !!i11 }, i11), {}, { networkPayloadCapture: tb({ capturePerformance: e10.capturePerformance }, null == i11 ? void 0 : i11.networkPayloadCapture), canvasRecording: { enabled: null == i11 ? void 0 : i11.recordCanvas, fps: null == i11 ? void 0 : i11.canvasFps, quality: null == i11 ? void 0 : i11.canvasQuality }, sampleRate: o10, minimumDurationMilliseconds: z(a10) ? null : a10, endpoint: null == i11 ? void 0 : i11.endpoint, triggerMatchType: null == i11 ? void 0 : i11.triggerMatchType, masking: null == i11 ? void 0 : i11.masking, urlTriggers: null == i11 ? void 0 : i11.urlTriggers, version: null == i11 ? void 0 : i11.version, triggerGroups: null == i11 ? void 0 : i11.triggerGroups }) });
        };
        r10(), null == (t10 = this.dv) || t10.call(this), this.dv = null == (i10 = this._instance.sessionManager) ? void 0 : i10.onSessionId(r10);
      }
    }
    onRemoteConfig(e10) {
      let t10 = e10.ok ? e10.config : void 0;
      return t10 && "sessionRecording" in t10 ? false === t10.sessionRecording ? (this.wv(t10), void this.fv()) : (this.wv(t10), void this.startIfEnabledOrStop()) : ("awaiting_config" === this.hv && (this.hv = "missing_config", this._instance.register_for_session({ [sw]: true }), aj.warn("config refresh failed, recording will not start until page reload")), void this.startIfEnabledOrStop());
    }
    log(e10, t10 = "log") {
      var i10;
      (null == (i10 = this.uv) ? void 0 : i10.log) ? this.uv.log(e10, t10) : aj.warn("log called before recorder was ready");
    }
    get yv() {
      var e10, t10;
      let i10 = null == (e10 = this._instance) || null == (e10 = e10.persistence) ? void 0 : e10.get_property(iJ);
      return (null == i10 || null == (t10 = i10.scriptConfig) ? void 0 : t10.script) || "lazy-recorder";
    }
    Sv() {
      let e10, t10 = this._instance.get_property(iJ);
      if (!t10) return false;
      try {
        e10 = "object" == typeof t10 ? t10 : JSON.parse(t10);
      } catch (e11) {
        return aj.warn("persisted remote config for session recording is invalid and will be ignored", e11), false;
      }
      return !G(e10.cache_timestamp) && 36e5 >= Date.now() - e10.cache_timestamp;
    }
    mv(e10) {
      var t10, i10, s10, r10;
      if (!this.vv && this.pv && this._instance.sessionManager) {
        if (!(null == (t10 = w.__PosthogExtensions__) ? void 0 : t10.initSessionRecording)) return aj.warn("Called on script loaded before session recording is available. This can be caused by adblockers."), void this._instance.register_for_session({ [sb]: true });
        if (this.uv || (this.uv = null == (r10 = w.__PosthogExtensions__) ? void 0 : r10.initSessionRecording(this._instance, this.Je), this.uv._forceAllowLocalhostNetworkCapture = this._forceAllowLocalhostNetworkCapture), !this.Sv()) {
          if ("missing_config" === this.hv || "awaiting_config" === this.hv) return;
          return this.hv = "awaiting_config", aj.info("persisted remote config is stale, requesting fresh config before starting"), void new nz(this._instance).load();
        }
        this.hv = aN, null == (i10 = (s10 = this.uv).setDocumentWasEverVisible) || i10.call(s10, this.Je), this.uv.start(e10);
      } else this.hv = aD;
    }
    onRRwebEmit(e10) {
      var t10, i10;
      null == (t10 = this.uv) || null == (i10 = t10.onRRwebEmit) || i10.call(t10, e10);
    }
    overrideLinkedFlag() {
      var e10, t10;
      this.uv || null == (t10 = this.Il) || t10.register({ $replay_override_linked_flag: true }), null == (e10 = this.uv) || e10.overrideLinkedFlag();
    }
    overrideSampling() {
      var e10, t10;
      this.uv || null == (t10 = this.Il) || t10.register({ $replay_override_sampling: true }), null == (e10 = this.uv) || e10.overrideSampling();
    }
    overrideTrigger(e10) {
      var t10, i10;
      this.uv || null == (i10 = this.Il) || i10.register({ ["url" === e10 ? "$replay_override_url_trigger" : "$replay_override_event_trigger"]: true }), null == (t10 = this.uv) || t10.overrideTrigger(e10);
    }
    get sdkDebugProperties() {
      var e10, t10;
      let i10 = {};
      for (let e11 of aB) {
        let s10 = null == (t10 = this._instance.sessionPersistence) ? void 0 : t10.get_property(e11);
        z(s10) || (i10[e11] = s10);
      }
      return tb(tb({}, i10), (null == (e10 = this.uv) ? void 0 : e10.sdkDebugProperties) || { $recording_status: this.status });
    }
    tryAddCustomEvent(e10, t10) {
      var i10;
      return !!(null == (i10 = this.uv) ? void 0 : i10.tryAddCustomEvent(e10, t10));
    }
    flushBeforeIdentityReset() {
      var e10, t10;
      null == (e10 = this.uv) || null == (t10 = e10.flushBeforeIdentityReset) || t10.call(e10);
    }
  } }), { autocapture: class extends aS {
    constructor(e10) {
      super(new aI(e10)), this.instance = e10;
    }
  }, historyAutocapture: class {
    constructor(e10) {
      this.xv = false, this._instance = e10, this.Cv = this.$v();
    }
    initialize() {
      this.startIfEnabled();
    }
    get isEnabled() {
      let e10 = this.Tv();
      return !!(e10.path || e10.search || this.Iv(e10));
    }
    startIfEnabled() {
      this.isEnabled && (ik.info("History API monitoring enabled, starting..."), this.monitorHistoryChanges());
    }
    startIfEnabledOrStop() {
      this.stop(), this.Cv = this.$v(), this.startIfEnabled();
    }
    stop() {
      this.Mv && this.Mv(), this.Mv = void 0, this.Ev && this.Ev(), this.Ev = void 0, ik.info("History API monitoring stopped");
    }
    monitorHistoryChanges() {
      u && u.history && (this.Pv("pushState"), this.Pv("replaceState"), this.Rv(), this.Iv() && this.Av());
    }
    Pv(e10) {
      var t10;
      if (!u || (null == (t10 = u.history[e10]) ? void 0 : t10.__posthog_wrapped__)) return;
      let i10 = this;
      aO(u.history, e10, (t11) => function(s10, r10, n10) {
        var o10;
        i10.Fv(n10) && i10.Ov(), t11.call(this, s10, r10, n10), i10.Dv(e10, !i10.xv && "popstate" !== (null == u || null == (o10 = u.event) ? void 0 : o10.type));
      });
    }
    $v() {
      let e10 = null == u ? void 0 : u.location;
      if (null == e10 ? void 0 : e10.pathname) return { pathname: e10.pathname, search: e10.search, hash: e10.hash };
    }
    Tv() {
      let e10 = this._instance.config.capture_pageview;
      return "history_change" === e10 ? { path: true } : q(e10) ? e10 : {};
    }
    Iv(e10 = this.Tv()) {
      return !!e10.hash && !this._instance.config.disable_capture_url_hashes;
    }
    Lv(e10) {
      let t10 = this.Tv(), i10 = this.Cv;
      return !(!i10 || !(t10.path && e10.pathname !== i10.pathname || t10.search && e10.search !== i10.search || this.Iv(t10) && e10.hash !== i10.hash));
    }
    Dv(e10, t10 = false) {
      try {
        t10 || this.Ov();
        let i10 = this.$v();
        if (!i10) return;
        if (this.Lv(i10)) {
          let i11 = () => this._instance.capture(sR, { navigation_type: e10 });
          t10 ? (this.Nv = i11, Promise.resolve().then(() => this.Ov())) : i11();
        }
        this.Cv = i10;
      } catch (t11) {
        ik.error(`Error capturing ${e10} pageview`, t11);
      }
    }
    Fv(e10) {
      var t10, i10;
      return !(G(e10) || !u) && (null == (t10 = r7(String(e10))) ? void 0 : t10.href) !== (null == (i10 = u.location) ? void 0 : i10.href);
    }
    Ov() {
      let e10 = this.Nv;
      if (e10) {
        this.Nv = void 0, this.xv = true;
        try {
          e10();
        } catch (e11) {
          ik.error("Error capturing deferred pageview", e11);
        } finally {
          this.xv = false;
        }
        this.Cv = this.$v();
      }
    }
    Rv() {
      if (this.Mv) return;
      let e10 = () => {
        this.Dv("popstate");
      };
      sG(u, "popstate", e10), this.Mv = () => {
        u && u.removeEventListener("popstate", e10);
      };
    }
    Av() {
      if (this.Ev) return;
      let e10 = () => {
        this.Dv("hashchange");
      };
      sG(u, "hashchange", e10), this.Ev = () => {
        u && u.removeEventListener("hashchange", e10);
      };
    }
  }, heatmaps: class {
    get Ir() {
      return this.instance.config;
    }
    constructor(e10) {
      var t10;
      this.qv = false, this.ko = false, this.jv = null, this.instance = e10, this.qv = !!(null == (t10 = this.instance.persistence) ? void 0 : t10.props[iB]), this.rageclicks = new ax(e10.config.rageclick);
    }
    initialize() {
      this.startIfEnabled();
    }
    get flushIntervalMilliseconds() {
      let e10 = 5e3;
      return q(this.Ir.capture_heatmaps) && this.Ir.capture_heatmaps.flush_interval_milliseconds && (e10 = this.Ir.capture_heatmaps.flush_interval_milliseconds), e10;
    }
    get isEnabled() {
      return G(this.Ir.capture_heatmaps) ? G(this.Ir.enable_heatmaps) ? this.qv : this.Ir.enable_heatmaps : false !== this.Ir.capture_heatmaps;
    }
    startIfEnabled() {
      if (this.isEnabled) this.ko || (aq.info("starting..."), this.Bv(), this.sn());
      else {
        var e10;
        clearInterval(null != (e10 = this.jv) ? e10 : void 0), this.Hv(), this.getAndClearBuffer();
      }
    }
    onRemoteConfig(e10) {
      if (!e10.ok) return;
      let t10 = e10.config;
      if (!("heatmaps" in t10)) return;
      let i10 = !!t10.heatmaps;
      this.instance.persistence && this.instance.persistence.register({ [iB]: i10 }), this.qv = i10, this.startIfEnabled();
    }
    getAndClearBuffer() {
      let e10 = this.Rt;
      return this.Rt = void 0, e10;
    }
    zv(e10) {
      aH(e10.originalEvent) && this.Mr(e10.originalEvent, "deadclick");
    }
    sn() {
      this.jv && clearInterval(this.jv), this.jv = "visible" === (null == d ? void 0 : d.visibilityState) ? setInterval(this.yl.bind(this), this.flushIntervalMilliseconds) : null;
    }
    Bv() {
      u && d && (this.Uv = this.yl.bind(this), sG(u, sM, this.Uv), this.Wv = (e10) => this.Mr(e10 || (null == u ? void 0 : u.event)), sG(d, "click", this.Wv, { capture: true }), this.Vv = (e10) => this.Gv(e10 || (null == u ? void 0 : u.event)), sG(d, "mousemove", this.Vv, { capture: true }), this.Zv = new rY(this.instance, rJ, this.zv.bind(this)), this.Zv.startIfEnabledOrStop(), this.Qv = this.sn.bind(this), sG(d, sA, this.Qv), this.ko = true);
    }
    Hv() {
      var e10;
      u && d && (this.Uv && u.removeEventListener(sM, this.Uv), this.Wv && d.removeEventListener("click", this.Wv, { capture: true }), this.Vv && d.removeEventListener("mousemove", this.Vv, { capture: true }), this.Qv && d.removeEventListener(sA, this.Qv), clearTimeout(this.Jv), null == (e10 = this.Zv) || e10.stop(), this.ko = false);
    }
    Kv(e10, t10) {
      let i10 = this.instance.scrollManager.scrollY(), s10 = this.instance.scrollManager.scrollX(), r10 = this.instance.scrollManager.scrollElement(), n10 = (function(e11, t11, i11) {
        let s11 = e11;
        for (; s11 && rf(s11) && !rg(s11, "body"); ) {
          let e12;
          if (s11 === i11) break;
          try {
            var r11, n11, o10;
            e12 = null == (r11 = null != (n11 = null == (o10 = s11.ownerDocument) ? void 0 : o10.defaultView) ? n11 : u) ? void 0 : r11.getComputedStyle(s11).position;
          } catch (e13) {
            break;
          }
          if (T(t11, e12)) return true;
          s11 = rI(s11);
        }
        return false;
      })(rk(e10), ["fixed", "sticky"], r10);
      return { x: e10.clientX + (n10 ? 0 : s10), y: e10.clientY + (n10 ? 0 : i10), target_fixed: n10, type: t10 };
    }
    Mr(e10, t10 = "click") {
      var i10;
      if (rp(e10.target) || !aH(e10)) return;
      let s10 = this.Kv(e10, t10);
      (null == (i10 = this.rageclicks) ? void 0 : i10.isRageClick(e10.clientX, e10.clientY, (/* @__PURE__ */ new Date()).getTime())) && rM(rk(e10), this.instance.config.rageclick) && this.Zs(tb(tb({}, s10), {}, { type: "rageclick" })), this.Zs(s10);
    }
    Gv(e10) {
      !rp(e10.target) && aH(e10) && (clearTimeout(this.Jv), this.Jv = setTimeout(() => {
        this.Zs(this.Kv(e10, "mousemove"));
      }, 500));
    }
    Zs(e10) {
      if (!u) return;
      let t10 = this.Ir.disable_capture_url_hashes ? tp(u.location.href) : u.location.href, i10 = this.Ir.custom_personal_data_properties, s10 = nt(t10, this.Ir.mask_personal_data_properties ? [...nn, ...i10 || []] : [], na);
      this.Rt = this.Rt || {}, this.Rt[s10] || (this.Rt[s10] = []), this.Rt[s10].push(e10);
    }
    yl() {
      this.Rt && !H(this.Rt) && this.instance.capture("$$heatmap", { $heatmap_data: this.getAndClearBuffer() });
    }
  }, deadClicksAutocapture: rY, webVitalsAutocapture: class {
    constructor(e10) {
      var t10;
      this._instance = e10, this.qv = false, this.ko = false, this.Rt = { navigationKey: void 0, url: void 0, metrics: [], firstMetricTimestamp: void 0 }, this.Xv = () => {
        clearTimeout(this.Yv), this.Yv = void 0, 0 !== this.Rt.metrics.length && (this._instance.capture("$web_vitals", tb({ $current_url: this.Rt.url }, this.Rt.metrics.reduce((e11, t11) => tb(tb({}, e11), {}, { [`$web_vitals_${t11.name}_event`]: tb({}, t11), [`$web_vitals_${t11.name}_value`]: t11.value }), {}))), this.Rt = { navigationKey: void 0, url: void 0, metrics: [], firstMetricTimestamp: void 0 });
      }, this.tf = (e11) => {
        var t11;
        if (this.Rt = this.Rt || { navigationKey: void 0, url: void 0, metrics: [], firstMetricTimestamp: void 0 }, G(null == e11 ? void 0 : e11.name) || G(null == e11 ? void 0 : e11.value)) return void aA.error("Invalid metric received", e11);
        let i10 = "string" == typeof e11.navigationURL ? e11.navigationURL : void 0, s10 = this.ef(i10);
        if (z(s10)) return;
        let r10 = K(e11.navigationId) || "string" == typeof e11.navigationId ? `navigation:${e11.navigationId}` : `url:${s10}`;
        if (this.if && e11.value >= this.if) return void aA.error("Ignoring metric with value >= " + this.if, e11);
        this.Rt.navigationKey !== r10 && (this.Xv(), this.Yv = setTimeout(this.Xv, this.flushToCaptureTimeoutMs)), z(this.Rt.navigationKey) && (this.Rt.navigationKey = r10, this.Rt.url = s10), this.Rt.firstMetricTimestamp = z(this.Rt.firstMetricTimestamp) ? Date.now() : this.Rt.firstMetricTimestamp;
        let n10 = null == (t11 = this._instance.sessionManager) ? void 0 : t11.checkAndGetSessionAndWindowId(true), o10 = tb(tb(tb({}, e11), i10 ? { navigationURL: s10 } : {}), {}, { $current_url: s10, timestamp: Date.now() });
        if (delete o10.entries, q(e11.attribution) && this.attributionMetrics.indexOf(e11.name) > -1) {
          let t12 = {};
          for (let i11 of aL) {
            let s11 = "url" === i11 && "string" == typeof e11.attribution[i11] ? this.ef(e11.attribution[i11]) : e11.attribution[i11];
            z(s11) || (t12[i11] = s11);
          }
          o10.attribution = t12;
        } else delete o10.attribution;
        z(n10) || (o10.$session_id = n10.sessionId, o10.$window_id = n10.windowId), this.Rt.metrics.push(o10), this.Rt.metrics.length === this.allowedMetrics.length && this.Xv();
      }, this.nf = () => {
        if (this.ko) return;
        let e11, t11, i10, s10, r10 = false, n10 = w.__PosthogExtensions__, o10 = null == n10 ? void 0 : n10.postHogWebVitalsCallbacksByFlavor, a10 = (null == o10 ? void 0 : o10[this.sf]) || ("web-vitals" === this.sf && z(o10) ? null == n10 ? void 0 : n10.postHogWebVitalsCallbacks : void 0);
        if (!z(a10)) {
          let n11 = a10.withoutAttribution, o11 = this.attributionMetrics;
          r10 = !z(n11), e11 = o11.indexOf("LCP") > -1 ? a10.onLCP : (null == n11 ? void 0 : n11.onLCP) || a10.onLCP, t11 = o11.indexOf("CLS") > -1 ? a10.onCLS : (null == n11 ? void 0 : n11.onCLS) || a10.onCLS, i10 = o11.indexOf("FCP") > -1 ? a10.onFCP : (null == n11 ? void 0 : n11.onFCP) || a10.onFCP, s10 = o11.indexOf("INP") > -1 ? a10.onINP : (null == n11 ? void 0 : n11.onINP) || a10.onINP;
        }
        if (!(e11 && t11 && i10 && s10)) return void aA.error("web vitals callbacks not loaded - not starting");
        let l2 = { reportSoftNavs: this.useSoftNavs }, u2 = r10 && this.attributionMetrics.indexOf("INP") > -1 ? tb(tb({}, l2), {}, { includeProcessedEventEntries: false }) : l2;
        this.allowedMetrics.indexOf("LCP") > -1 && e11(this.tf.bind(this), l2), this.allowedMetrics.indexOf("CLS") > -1 && t11(this.tf.bind(this), l2), this.allowedMetrics.indexOf("FCP") > -1 && i10(this.tf.bind(this), l2), this.allowedMetrics.indexOf("INP") > -1 && s10(this.tf.bind(this), u2), this.ko = true;
      }, this.qv = !!(null == (t10 = this._instance.persistence) ? void 0 : t10.props[iV]), this.startIfEnabled();
    }
    get rf() {
      return this._instance.config.capture_performance;
    }
    get allowedMetrics() {
      var e10, t10;
      let i10 = q(this.rf) ? null == (e10 = this.rf) ? void 0 : e10.web_vitals_allowed_metrics : void 0;
      return G(i10) ? (null == (t10 = this._instance.persistence) ? void 0 : t10.props.$web_vitals_allowed_metrics) || aM : i10;
    }
    get flushToCaptureTimeoutMs() {
      return (q(this.rf) ? this.rf.web_vitals_delayed_flush_ms : void 0) || 5e3;
    }
    get attributionMetrics() {
      let e10 = q(this.rf) ? this.rf.web_vitals_attribution : void 0;
      return X(e10) ? e10 ? aM : [] : j(e10) ? e10 : aR;
    }
    get useAttribution() {
      return this.attributionMetrics.length > 0;
    }
    get useSoftNavs() {
      let e10 = q(this.rf) ? this.rf.__preview_web_vitals_soft_navs : void 0;
      return null != e10 && e10;
    }
    get if() {
      let e10 = q(this.rf) && K(this.rf.__web_vitals_max_value) ? this.rf.__web_vitals_max_value : 9e5;
      return e10 > 0 && 6e4 >= e10 ? 9e5 : e10;
    }
    get isEnabled() {
      let e10 = null == p ? void 0 : p.protocol;
      if ("http:" !== e10 && "https:" !== e10) return aA.info("Web Vitals are disabled on non-http/https protocols"), false;
      let t10 = q(this.rf) ? this.rf.web_vitals : X(this.rf) ? this.rf : void 0;
      return X(t10) ? t10 : this.qv;
    }
    startIfEnabled() {
      this.isEnabled && !this.ko && (aA.info("enabled, starting..."), this.Ho(this.nf));
    }
    onRemoteConfig(e10) {
      if (!e10.ok) return;
      let t10 = e10.config;
      if (!("capturePerformance" in t10)) return;
      let i10 = q(t10.capturePerformance) && !!t10.capturePerformance.web_vitals, s10 = q(t10.capturePerformance) ? t10.capturePerformance.web_vitals_allowed_metrics : void 0;
      this._instance.persistence && (this._instance.persistence.register({ [iV]: i10 }), this._instance.persistence.register({ [iK]: s10 })), this.qv = i10, this.startIfEnabled();
    }
    get sf() {
      return this.useSoftNavs ? this.useAttribution ? "web-vitals-with-attribution-soft-navs" : "web-vitals-soft-navs" : this.useAttribution ? "web-vitals-with-attribution" : "web-vitals";
    }
    Ho(e10) {
      var t10;
      let i10 = w.__PosthogExtensions__, s10 = this.sf, r10 = null == i10 ? void 0 : i10.postHogWebVitalsCallbacksByFlavor;
      (null == r10 ? void 0 : r10[s10]) || "web-vitals" === s10 && z(r10) && (null == i10 ? void 0 : i10.postHogWebVitalsCallbacks) ? e10() : null == i10 || null == (t10 = i10.loadExternalDependency) || t10.call(i10, this._instance, s10, (t11) => {
        t11 ? aA.error("failed to load script", t11) : e10();
      });
    }
    ef(e10) {
      let t10 = e10 || (null == u ? void 0 : u.location.href);
      if (!t10) return void aA.error("Could not determine current URL");
      let i10 = this._instance.config.disable_capture_url_hashes ? tp(t10) : t10, s10 = this._instance.config.custom_personal_data_properties;
      return nt(i10, this._instance.config.mask_personal_data_properties ? [...nn, ...s10 || []] : [], na);
    }
  } }), { exceptionObserver: class {
    constructor(e10) {
      var t10;
      this.nf = () => {
        var e11;
        if (!u || !this.isEnabled || !(null == (e11 = w.__PosthogExtensions__) ? void 0 : e11.errorWrappingFunctions)) return;
        let t11 = w.__PosthogExtensions__.errorWrappingFunctions.wrapOnError, i10 = w.__PosthogExtensions__.errorWrappingFunctions.wrapUnhandledRejection, s10 = w.__PosthogExtensions__.errorWrappingFunctions.wrapConsoleError;
        try {
          !this.af && this.Ir.capture_unhandled_errors && (this.af = t11(this.captureException.bind(this))), !this.lf && this.Ir.capture_unhandled_rejections && (this.lf = i10(this.captureException.bind(this))), !this.uf && this.Ir.capture_console_errors && (this.uf = s10(this.captureException.bind(this)));
        } catch (e12) {
          aP.error("failed to start", e12), this.hf();
        }
      }, this._instance = e10, this.cf = !!(null == (t10 = this._instance.persistence) ? void 0 : t10.props[iq]), this.wt = new ec(tb(tb({}, (function(e11 = {}) {
        var t11, i10, s10, r10;
        return { refillRate: null != (t11 = null != (i10 = e11.exceptionRateLimiterRefillRate) ? i10 : e11.__exceptionRateLimiterRefillRate) ? t11 : 1, bucketSize: null != (s10 = null != (r10 = e11.exceptionRateLimiterBucketSize) ? r10 : e11.__exceptionRateLimiterBucketSize) ? s10 : 10 };
      })(this._instance.config.error_tracking)), {}, { refillInterval: 1e4, A: aP })), this.Ir = this.df(), this.startIfEnabledOrStop();
    }
    df() {
      let e10 = this._instance.config.capture_exceptions, t10 = { capture_unhandled_errors: false, capture_unhandled_rejections: false, capture_console_errors: false };
      return q(e10) ? t10 = tb(tb({}, t10), e10) : (z(e10) ? this.cf : e10) && (t10 = tb(tb({}, t10), {}, { capture_unhandled_errors: true, capture_unhandled_rejections: true })), t10;
    }
    get isEnabled() {
      return this.Ir.capture_console_errors || this.Ir.capture_unhandled_errors || this.Ir.capture_unhandled_rejections;
    }
    startIfEnabledOrStop() {
      this.isEnabled ? (aP.info("enabled"), this.hf(), this.Ho(this.nf)) : this.hf();
    }
    Ho(e10) {
      var t10, i10, s10;
      (null == (t10 = w.__PosthogExtensions__) ? void 0 : t10.errorWrappingFunctions) ? e10() : null == (i10 = w.__PosthogExtensions__) || null == (s10 = i10.loadExternalDependency) || s10.call(i10, this._instance, "exception-autocapture", (t11) => {
        if (t11) return aP.error("failed to load script", t11);
        e10();
      });
    }
    hf() {
      var e10, t10, i10;
      null == (e10 = this.af) || e10.call(this), this.af = void 0, null == (t10 = this.lf) || t10.call(this), this.lf = void 0, null == (i10 = this.uf) || i10.call(this), this.uf = void 0;
    }
    onRemoteConfig(e10) {
      if (!e10.ok) return;
      let t10 = e10.config;
      "autocaptureExceptions" in t10 && (this.cf = !!t10.autocaptureExceptions, this._instance.persistence && this._instance.persistence.register({ [iq]: this.cf }), this.Ir = this.df(), this.startIfEnabledOrStop());
    }
    onConfigChange() {
      this.Ir = this.df();
    }
    captureException(e10) {
      try {
        var t10, i10, s10;
        let r10 = null != (t10 = null == e10 || null == (i10 = e10.$exception_list) || null == (i10 = i10[0]) ? void 0 : i10.type) ? t10 : "Exception";
        if (this.wt.consumeRateLimit(r10)) return void aP.info("Skipping exception capture because of client rate limiting.", { exception: r10 });
        null == (s10 = this._instance.exceptions) || s10.sendExceptionEvent(e10);
      } catch (e11) {
      }
    }
  }, exceptions: class {
    constructor(e10) {
      var t10, i10;
      this.vf = [], this.ff = new tw([new tD(), new tG(), new tj(), new tN(), new tW(), new tV(), new tq(), new tU()], /* @__PURE__ */ (function(e11, ...t11) {
        return (i11, s10 = 0) => {
          let r10 = [], n10 = i11.split("\n"), o10 = Math.min(n10.length, s10 + 1e3), a10 = [];
          for (let i12 = s10; o10 > i12; i12++) {
            let s11 = n10[i12];
            if (s11.length > 1024) continue;
            let o11 = tA.test(s11) ? s11.replace(tA, "$1") : s11;
            if (!o11.match(/\S*Error: /)) {
              for (let i13 of t11) {
                let t12 = i13(o11, e11);
                if (t12) {
                  r10.push(t12);
                  let e12 = (function(e13) {
                    for (let t13 = 1; 10 >= t13; t13++) {
                      let i14 = e13.length - 2 * t13;
                      if (0 > i14) break;
                      let s12 = true;
                      for (let r11 = 0; t13 > r11; r11++) if (!tM(e13[i14 + r11], e13[i14 + t13 + r11])) {
                        s12 = false;
                        break;
                      }
                      if (s12) {
                        for (let s13 = 0; t13 > s13; s13++) e13[i14 + s13] = e13[i14 + t13 + s13];
                        return e13.length = i14 + t13, { start: i14, length: t13 };
                      }
                    }
                  })(r10);
                  if (e12) {
                    for (let t13 = a10.length - 1; t13 >= 0; t13--) {
                      let i14 = a10[t13];
                      if (e12.start >= i14.start + i14.length) break;
                      a10.pop();
                    }
                    a10.push(e12);
                  }
                  break;
                }
              }
              if ((function(e12, t12) {
                let i13 = t12[0], s12 = e12.length - (i13 ? tR(e12, i13) : 0);
                for (let i14 of t12) s12 -= tL(e12, i14);
                return s12;
              })(r10, a10) >= 50) break;
            }
          }
          let l2 = [...a10].sort((e12, t12) => t12.start - e12.start), u2 = l2[l2.length - 1];
          if (u2) {
            let e12 = tR(r10, u2);
            for (let t12 of (r10.splice(u2.start - e12, e12), l2)) t12.start -= e12;
          }
          for (let e12 of l2) !(function(e13, t12) {
            let i12 = t12.start + t12.length, s11 = tL(e13, t12);
            s11 && e13.splice(i12 + s11 === e13.length ? i12 : t12.start, s11);
          })(r10, e12);
          return a10.some((e12) => 0 === e12.start && r10.length === e12.length) && (function(e12) {
            let t12 = e12.map((e13) => `${e13.function}|${e13.filename}|${e13.lineno}|${e13.colno}|${e13.module}`), i12 = 0;
            for (let e13 = 1; t12.length > e13; e13++) (function(e14, t13, i13) {
              for (let s11 = 0; e14.length > s11; s11++) {
                let r11 = e14[(t13 + s11) % e14.length], n11 = e14[(i13 + s11) % e14.length];
                if (r11 !== n11) return n11 > r11;
              }
              return false;
            })(t12, e13, i12) && (i12 = e13);
            e12.push(...e12.splice(0, i12));
          })(r10), (function(e12) {
            if (!e12.length) return [];
            let t12 = Array.from(e12);
            return t12.reverse(), t12.slice(0, 50).map((e13) => tb(tb({}, e13), {}, { filename: e13.filename || (t12[t12.length - 1] || {}).filename, function: e13.function || "?" }));
          })(r10);
        };
      })("web:javascript", tF, tT)), this._instance = e10, this.vf = null != (t10 = null == (i10 = this._instance.persistence) ? void 0 : i10.get_property("$error_tracking_suppression_rules")) ? t10 : [], this.pf = tQ(this.gf()), this.mf = new tZ(this.pf);
    }
    onConfigChange() {
      this.pf = tQ(this.gf()), this.mf.setConfig(this.pf);
    }
    onRemoteConfig(e10) {
      var t10, i10, s10;
      if (!e10.ok) return;
      let r10 = e10.config;
      if (!("errorTracking" in r10)) return;
      let n10 = null != (t10 = null == (i10 = r10.errorTracking) ? void 0 : i10.suppressionRules) ? t10 : [], o10 = null == (s10 = r10.errorTracking) ? void 0 : s10.captureExtensionExceptions;
      this.vf = n10, this._instance.persistence && this._instance.persistence.register({ [iH]: this.vf, [iz]: o10 });
    }
    get yf() {
      var e10;
      let t10 = !!this._instance.get_property(iz), i10 = this._instance.config.error_tracking.captureExtensionExceptions;
      return null != (e10 = null != i10 ? i10 : t10) && e10;
    }
    buildProperties(e10, t10) {
      return this.ff.buildFromUnknown(e10, { syntheticException: null == t10 ? void 0 : t10.syntheticException, mechanism: { handled: null == t10 ? void 0 : t10.handled } });
    }
    addExceptionStep(e10, t10) {
      if (this.pf.enabled) try {
        if (!V(e10) || 0 === e10.trim().length) return void ll.warn("Ignoring exception step because message must be a non-empty string");
        let { sanitizedProperties: i10, droppedKeys: s10 } = (function(e11) {
          if (!e11) return { sanitizedProperties: {}, droppedKeys: [] };
          let t11 = [];
          return { sanitizedProperties: Object.keys(e11).reduce((i11, s11) => (tX.has(s11) ? t11.push(s11) : i11[s11] = e11[s11], i11), {}), droppedKeys: t11 };
        })(this.bf(t10));
        s10.length > 0 && ll.warn("Ignoring reserved exception step fields", { droppedKeys: s10 }), this.mf.add(tb({ [tK]: e10, [tJ]: (/* @__PURE__ */ new Date()).toISOString() }, i10));
      } catch (e11) {
        ll.error("Failed to add exception step. Ignoring breadcrumb.", e11);
      }
    }
    sendExceptionEvent(e10) {
      try {
        let t10, i10 = e10.$exception_list;
        if (this._f(i10)) {
          if (this.wf(i10)) return this.kf("Exception dropped: matched a suppression rule"), void ll.info("Skipping exception capture because a suppression rule matched");
          if (!this.yf && this.Sf(i10)) return this.kf("Exception dropped: thrown by a browser extension"), void ll.info("Skipping exception capture because it was thrown by an extension");
          if (!this.yf && this.xf(i10)) return this.kf("Exception dropped: thrown by an injected browser script"), void ll.info("Skipping exception capture because it was thrown by an injected browser script");
          if (!this._instance.config.error_tracking.__capturePostHogExceptions && this.Cf(i10)) return this.kf("Exception dropped: thrown by the PostHog SDK"), void ll.info("Skipping exception capture because it was thrown by the PostHog SDK");
        }
        let s10 = this.pf.enabled && G(e10.$exception_steps) ? this.$f(e10) : e10, r10 = (t10 = globalThis._posthogReleaseId, "string" == typeof t10 && t10.length > 0 ? t10 : void 0);
        r10 && (s10.$release_id = r10);
        try {
          let e11 = this._instance.capture("$exception", s10, { _noTruncate: true, _batchKey: "exceptionEvent", gh: true });
          return e11 && this.mf.clear(), e11;
        } catch (e11) {
          return la(e11) || ll.error("Failed to capture exception event. Dropping this exception.", e11), void this.mf.clear();
        }
      } catch (e11) {
        return void (la(e11) || ll.error("Failed to process exception event. Ignoring this exception.", e11));
      }
    }
    $f(e10) {
      try {
        let t10 = this.mf.getAttachable();
        return 0 === t10.length ? e10 : tb(tb({}, e10), {}, { $exception_steps: t10 });
      } catch (t10) {
        return ll.error("Failed to read buffered exception steps. Capturing exception without steps.", t10), e10;
      }
    }
    kf(e10) {
      this.pf.enabled && this.mf.add({ [tK]: e10, [tJ]: (/* @__PURE__ */ new Date()).toISOString() });
    }
    bf(e10) {
      return q(e10) ? tb({}, e10) : {};
    }
    gf() {
      var e10, t10;
      return null != (e10 = null == (t10 = this._instance.config.error_tracking) ? void 0 : t10.exception_steps) ? e10 : {};
    }
    wf(e10) {
      if (0 === e10.length) return false;
      try {
        let t10 = e10.reduce((e11, { type: t11, value: i10 }) => (V(t11) && t11.length > 0 && e11.$exception_types.push(t11), V(i10) && i10.length > 0 && e11.$exception_values.push(i10), e11), { $exception_types: [], $exception_values: [] });
        return this.vf.some((e11) => {
          let i10 = e11.values.map((e12) => {
            let i11 = oG[e12.operator], s10 = t10[e12.key];
            if (!i11 || !s10) return false;
            let r10 = j(e12.value) ? e12.value : [e12.value];
            return r10.length > 0 && i11(r10, s10);
          });
          return "OR" === e11.type ? i10.some(Boolean) : i10.every(Boolean);
        });
      } catch (e11) {
        return ll.warn("Failed to evaluate suppression rules. Capturing the exception.", e11), false;
      }
    }
    Sf(e10) {
      let t10 = e10.flatMap((e11) => {
        var t11, i11;
        return null != (t11 = null == (i11 = e11.stacktrace) ? void 0 : i11.frames) ? t11 : [];
      }), i10 = t10.filter(({ filename: e11 }) => !!e11 && lc.some((t11) => e11.startsWith(t11)));
      return 0 !== i10.length && (!i10.every(({ filename: e11 }) => !!e11 && e11.startsWith(lu)) || e10.some(({ type: e11, value: t11 }) => "NoResponse" === e11 || V(t11) && lh.some(({ value: e12, exact: i11 }) => i11 ? t11 === e12 : t11.includes(e12))) && !t10.some(({ in_app: e11, filename: t11 }) => e11 && !(null == t11 ? void 0 : t11.startsWith(lu))));
    }
    xf(e10) {
      return e10.some(({ value: e11 }) => V(e11) && ld.some((t10) => e11.includes(t10)));
    }
    Cf(e10) {
      if (e10.length > 0) {
        var t10, i10, s10, r10;
        let n10 = null != (t10 = null == (i10 = e10[0].stacktrace) ? void 0 : i10.frames) ? t10 : [], o10 = n10[n10.length - 1];
        return null != (s10 = null == o10 || null == (r10 = o10.filename) ? void 0 : r10.includes("posthog.com/static")) && s10;
      }
      return false;
    }
    _f(e10) {
      return !G(e10) && j(e10);
    }
  } }), lT), { siteApps: class {
    constructor(e10) {
      this._instance = e10, this.Ef = 0, this.Pf = [], this.apps = {};
    }
    get isEnabled() {
      return !!this._instance.config.opt_in_site_apps;
    }
    Rf(e10, t10) {
      if (!t10) return;
      let i10 = this.globalsForEvent(t10);
      this.Pf.push(i10), this.Pf.length > 1e3 && (this.Pf = this.Pf.slice(10));
    }
    get siteAppLoaders() {
      var e10;
      return null == (e10 = w._POSTHOG_REMOTE_CONFIG) || null == (e10 = e10[this._instance.config.token]) ? void 0 : e10.siteApps;
    }
    initialize() {
      if (this.isEnabled) {
        let e10 = this._instance._addCaptureHook(this.Rf.bind(this));
        this.Af = () => {
          e10(), this.Pf = [], this.Af = void 0;
        };
      }
    }
    globalsForEvent(e10) {
      var t10, i10, s10, r10, n10, o10, a10;
      if (!e10) throw Error("Event payload is required");
      let l2 = {}, u2 = this._instance.get_property("$groups") || [];
      for (let [e11, t11] of Object.entries(this._instance.get_property("$stored_group_properties") || {})) l2[e11] = { id: u2[e11], type: e11, properties: t11 };
      let { $set_once: h2, $set: c2 } = e10;
      return { event: tb(tb({}, it(e10, aW)), {}, { properties: tb(tb(tb({}, e10.properties), c2 ? { $set: tb(tb({}, null != (t10 = null == (i10 = e10.properties) ? void 0 : i10.$set) ? t10 : {}), c2) } : {}), h2 ? { $set_once: tb(tb({}, null != (s10 = null == (r10 = e10.properties) ? void 0 : r10.$set_once) ? s10 : {}), h2) } : {}), elements_chain: null != (n10 = null == (o10 = e10.properties) ? void 0 : o10.$elements_chain) ? n10 : "", distinct_id: null == (a10 = e10.properties) ? void 0 : a10.distinct_id }), person: { properties: this._instance.get_property("$stored_person_properties") }, groups: l2 };
    }
    Ff(e10) {
      var t10;
      let i10 = null == (t10 = e10.tagName) ? void 0 : t10.toLowerCase();
      return "style" === i10 && this._instance.config.prepare_external_dependency_stylesheet ? this._instance.config.prepare_external_dependency_stylesheet(e10) || (aU.error("prepare_external_dependency_stylesheet returned null"), null) : "script" === i10 && this._instance.config.prepare_external_dependency_script ? this._instance.config.prepare_external_dependency_script(e10) || (aU.error("prepare_external_dependency_script returned null"), null) : e10;
    }
    Of() {
      var e10, t10, i10, s10, r10, n10, o10, a10;
      if (!this._instance.config.prepare_external_dependency_stylesheet && !this._instance.config.prepare_external_dependency_script) return () => {
      };
      let l2 = null == d ? void 0 : d.defaultView, u2 = null == l2 || null == (e10 = l2.Node) ? void 0 : e10.prototype;
      if (!l2 || !u2) return () => {
      };
      if (this.Ef++, this.Df) return this.Lf();
      let h2 = [], c2 = this, p2 = /* @__PURE__ */ new WeakSet(), f2 = (e11, t11, i11) => {
        if (!(null == e11 ? void 0 : e11[t11])) return;
        let s11 = e11[t11];
        e11[t11] = i11(s11), h2.push(() => {
          e11[t11] = s11;
        });
      }, g2 = (e11) => {
        if (p2.has(e11)) return e11;
        let t11 = c2.Ff(e11);
        return t11 && p2.add(t11), t11;
      }, v2 = (e11) => e11.map((e12) => "string" == typeof e12 ? e12 : g2(e12)).filter((e12) => !U(e12));
      return f2(u2, "appendChild", (e11) => function(t11) {
        let i11 = g2(t11);
        return i11 ? e11.call(this, i11) : t11;
      }), f2(u2, "insertBefore", (e11) => function(t11, i11) {
        let s11 = g2(t11);
        return s11 ? e11.call(this, s11, i11) : t11;
      }), f2(u2, "replaceChild", (e11) => function(t11, i11) {
        let s11 = g2(t11);
        return s11 ? e11.call(this, s11, i11) : i11;
      }), [null == (t10 = l2.Element) ? void 0 : t10.prototype, null == (i10 = l2.Document) ? void 0 : i10.prototype, null == (s10 = l2.DocumentFragment) ? void 0 : s10.prototype].forEach((e11) => {
        f2(e11, "append", (e12) => function(...t11) {
          return e12.apply(this, v2(t11));
        }), f2(e11, "prepend", (e12) => function(...t11) {
          return e12.apply(this, v2(t11));
        });
      }), [null == (r10 = l2.Element) ? void 0 : r10.prototype, null == (n10 = l2.CharacterData) ? void 0 : n10.prototype, null == (o10 = l2.DocumentType) ? void 0 : o10.prototype].forEach((e11) => {
        f2(e11, "before", (e12) => function(...t11) {
          return e12.apply(this, v2(t11));
        }), f2(e11, "after", (e12) => function(...t11) {
          return e12.apply(this, v2(t11));
        }), f2(e11, "replaceWith", (e12) => function(...t11) {
          let i11 = v2(t11);
          return t11.length && !i11.length ? void 0 : e12.apply(this, i11);
        });
      }), f2(null == (a10 = l2.Element) ? void 0 : a10.prototype, "insertAdjacentElement", (e11) => function(t11, i11) {
        let s11 = g2(i11);
        return s11 ? e11.call(this, t11, s11) : null;
      }), this.Df = () => {
        h2.forEach((e11) => e11()), this.Df = void 0;
      }, this.Lf();
    }
    Lf() {
      let e10 = false;
      return () => {
        var t10;
        e10 || (e10 = true, this.Ef--, 0 === this.Ef && (null == (t10 = this.Df) || t10.call(this)));
      };
    }
    Nf(e10, t10 = true) {
      let i10 = this.Of();
      try {
        let s10 = e10(i10);
        return t10 && i10(), s10;
      } catch (e11) {
        throw i10(), e11;
      }
    }
    setupSiteApp(e10) {
      let t10 = this.apps[e10.id], i10 = () => {
        var i11;
        !t10.errored && this.Pf.length && (aU.info(`Processing ${this.Pf.length} events for site app with id ${e10.id}`), this.Pf.forEach((e11) => this.Nf(() => {
          var i12;
          return null == (i12 = t10.processEvent) ? void 0 : i12.call(t10, e11);
        })), t10.processedBuffer = true), Object.values(this.apps).every((e11) => e11.processedBuffer || e11.errored) && (null == (i11 = this.Af) || i11.call(this));
      }, s10 = false, r10 = (r11) => {
        t10.errored = !r11, t10.loaded = true, aU.info(`Site app with id ${e10.id} ${r11 ? "loaded" : "errored"}`), s10 && i10();
      };
      try {
        let { processEvent: i11 } = this.Nf((t11) => e10.init({ posthog: this._instance, callback(e11) {
          t11(), r10(e11);
        } }), false);
        i11 && (t10.processEvent = i11), s10 = true;
      } catch (t11) {
        aU.error(aG + e10.id, t11), r10(false);
      }
      if (s10 && t10.loaded) try {
        i10();
      } catch (i11) {
        aU.error(`Error while processing buffered events PostHog app with config id ${e10.id}`, i11), t10.errored = true;
      }
    }
    qf() {
      let e10 = this.siteAppLoaders || [];
      for (let t10 of e10) this.apps[t10.id] = { id: t10.id, loaded: false, errored: false, processedBuffer: false };
      for (let t10 of e10) this.setupSiteApp(t10);
    }
    jf(e10) {
      if (0 === Object.keys(this.apps).length) return;
      let t10 = this.globalsForEvent(e10);
      for (let i10 of Object.values(this.apps)) try {
        this.Nf(() => {
          var e11;
          return null == (e11 = i10.processEvent) ? void 0 : e11.call(i10, t10);
        });
      } catch (t11) {
        aU.error(`Error while processing event ${e10.event} for site app ${i10.id}`, t11);
      }
    }
    onRemoteConfig(e10) {
      var t10, i10, s10, r10, n10;
      if (null == (t10 = this.siteAppLoaders) ? void 0 : t10.length) return this.isEnabled ? (this.qf(), void this._instance.on("eventCaptured", (e11) => this.jf(e11))) : void aU.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
      if (null == (i10 = this.Af) || i10.call(this), !e10.ok) return;
      let o10 = e10.config;
      if (null == (s10 = o10.siteApps) ? void 0 : s10.length) if (this.isEnabled) for (let { id: e11, url: t11 } of o10.siteApps) w[`__$$ph_site_app_${e11}`] = this._instance, null == (r10 = w.__PosthogExtensions__) || null == (n10 = r10.loadSiteApp) || n10.call(r10, this._instance, t11, (t12) => {
        if (t12) return aU.error(aG + e11, t12);
      });
      else aU.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
    }
  } }), lA), { tracingHeaders: class {
    constructor(e10) {
      this._instance = e10, this.Bf = void 0, this.Hf = void 0, this.zf = void 0, this.nf = () => {
        var e11, t10;
        let i10 = this.Uf();
        i10 ? (z(this.Bf) && (this.Bf = null == (e11 = w.__PosthogExtensions__) || null == (e11 = e11.tracingHeadersPatchFns) ? void 0 : e11._patchXHR(i10, () => this._instance.get_distinct_id(), this._instance.sessionManager)), z(this.Hf) && (this.Hf = null == (t10 = w.__PosthogExtensions__) || null == (t10 = t10.tracingHeadersPatchFns) ? void 0 : t10._patchFetch(i10, () => this._instance.get_distinct_id(), this._instance.sessionManager))) : this.hf();
      };
    }
    initialize() {
      this.startIfEnabledOrStop();
    }
    Ho(e10) {
      var t10, i10, s10;
      (null == (t10 = w.__PosthogExtensions__) ? void 0 : t10.tracingHeadersPatchFns) ? e10() : null == (i10 = w.__PosthogExtensions__) || null == (s10 = i10.loadExternalDependency) || s10.call(i10, this._instance, "tracing-headers", (t11) => {
        if (t11) return aT.error("failed to load script", t11);
        e10();
      });
    }
    Wf() {
      var e10, t10;
      return null != (e10 = null != (t10 = this._instance.config.tracing_headers) ? t10 : this._instance.config.addTracingHeaders) ? e10 : this._instance.config.__add_tracing_headers;
    }
    Uf() {
      let e10 = this.Wf();
      return j(e10) ? (j(this.zf) ? this.zf.splice(0, this.zf.length, ...e10) : this.zf = [...e10], e10.length > 0 ? this.zf : void 0) : (j(this.zf) && this.zf.splice(0), this.zf = e10 || void 0, this.zf);
    }
    hf() {
      var e10, t10;
      null == (e10 = this.Bf) || e10.call(this), null == (t10 = this.Hf) || t10.call(this), this.Bf = void 0, this.Hf = void 0;
    }
    startIfEnabledOrStop() {
      this.Uf() ? this.Ho(this.nf) : this.hf();
    }
  } }), { toolbar: class {
    constructor(e10) {
      this.instance = e10;
    }
    Vf(e10) {
      w.ph_toolbar_state = e10;
    }
    Gf() {
      var e10;
      return null != (e10 = w.ph_toolbar_state) ? e10 : 0;
    }
    initialize() {
      return this.maybeLoadToolbar();
    }
    maybeLoadToolbar(e10, t10, i10) {
      var s10, r10;
      if (sK(this.instance.config) || !u || !d) return false;
      e10 = null != (s10 = e10) ? s10 : u.location, i10 = null != (r10 = i10) ? r10 : u.history;
      try {
        let s11;
        if (!t10) {
          try {
            u.localStorage.setItem("test", "test"), u.localStorage.removeItem("test");
          } catch (e11) {
            return false;
          }
          t10 = null == u ? void 0 : u.localStorage;
        }
        let r11 = a5 || ni(e10.hash, "__posthog") || ni(e10.hash, "state"), n10 = r11 ? tf(() => JSON.parse(atob(decodeURIComponent(r11)))) || tf(() => JSON.parse(decodeURIComponent(r11))) : null;
        return n10 && "ph_authorize" === n10.action ? ((s11 = n10).source = "url", s11 && Object.keys(s11).length > 0 && (n10.desiredHash ? e10.hash = n10.desiredHash : i10 ? i10.replaceState(i10.state, "", e10.pathname + e10.search) : e10.hash = "")) : ((s11 = JSON.parse(t10.getItem(a4) || "{}")).source = "localstorage", delete s11.userIntent), !(!s11.token || this.instance.config.token !== s11.token || (this.loadToolbar(s11), 0));
      } catch (e11) {
        return false;
      }
    }
    Zf(e10) {
      let t10 = w.ph_load_toolbar || w.ph_load_editor;
      !G(t10) && B(t10) ? t10(e10, this.instance) : a6.warn("No toolbar load function found");
    }
    loadToolbar(e10) {
      let t10 = !!(null == d ? void 0 : d.getElementById("__POSTHOG_TOOLBAR__"));
      if (!u || t10) return false;
      let i10 = "custom" === this.instance.requestRouter.region && this.instance.config.advanced_disable_toolbar_metrics, s10 = tb(tb({ token: this.instance.config.token }, e10), {}, { apiURL: this.instance.requestRouter.endpointFor("ui") }, i10 ? { instrument: false } : {});
      if (u.localStorage.setItem(a4, JSON.stringify(tb(tb({}, s10), {}, { source: void 0 }))), 2 === this.Gf()) this.Zf(s10);
      else if (0 === this.Gf()) {
        var r10, n10;
        this.Vf(1), null == (r10 = w.__PosthogExtensions__) || null == (n10 = r10.loadExternalDependency) || n10.call(r10, this.instance, "toolbar", (e11) => {
          e11 ? (a6.error("[Toolbar] Failed to load", e11), this.Vf(0)) : (this.Vf(2), this.Zf(s10));
        }), sG(u, "turbolinks:load", () => {
          this.Vf(0), this.loadToolbar(s10);
        });
      }
      return true;
    }
    Qf(e10) {
      return this.loadToolbar(e10);
    }
    maybeLoadEditor(e10, t10, i10) {
      return this.maybeLoadToolbar(e10, t10, i10);
    }
  } }), lM), { conversations: class {
    constructor(e10) {
      this._instance = e10, this.sp = void 0, this._conversationsManager = null, this.rp = false, this.ne = null, this.op = false;
    }
    initialize() {
      this.loadIfEnabled();
    }
    onRemoteConfig(e10) {
      if (this._instance.config.disable_conversations || (this.ap = e10.ok, !e10.ok)) return;
      let t10 = e10.config.conversations;
      G(t10) || (X(t10) ? this.sp = t10 : (this.sp = t10.enabled, this.ne = t10), this.loadIfEnabled());
    }
    reset() {
      var e10;
      null == (e10 = this._conversationsManager) || e10.reset(), this._conversationsManager = null, this.sp = void 0, this.ne = null, this.ap = void 0, this.op = false;
    }
    loadIfEnabled() {
      if (this._conversationsManager || this.rp || this._instance.config.disable_conversations || sK(this._instance.config) || this._instance.config.cookieless_mode && this._instance.consent.isOptedOut()) return;
      let e10 = null == w ? void 0 : w.__PosthogExtensions__;
      if (e10 && !z(this.sp) && this.sp) if (this.ne && this.ne.token) {
        this.rp = true;
        try {
          let t10 = e10.initConversations;
          if (t10) return this.lp(t10), void (this.rp = false);
          let i10 = e10.loadExternalDependency;
          if (!i10) return void this.up(sF);
          i10(this._instance, "conversations", (t11) => {
            t11 || !e10.initConversations ? this.up("Could not load conversations script", t11) : this.lp(e10.initConversations), this.rp = false;
          });
        } catch (e11) {
          this.up("Error initializing conversations", e11), this.rp = false;
        }
      } else lg.error("Conversations enabled but missing token in remote config.");
    }
    lp(e10) {
      if (this.ne) try {
        this._conversationsManager = e10(this.ne, this._instance), this.op = false, lg.info("Conversations loaded successfully");
      } catch (e11) {
        this.up("Error completing conversations initialization", e11);
      }
      else lg.error("Cannot complete initialization: remote config is null");
    }
    up(e10, t10) {
      lg.error(e10, t10), this._conversationsManager = null, this.rp = false, this.op = true;
    }
    show() {
      this._conversationsManager ? this._conversationsManager.show() : lg.warn("Conversations not loaded yet.");
    }
    hide() {
      this._conversationsManager && this._conversationsManager.hide();
    }
    isAvailable() {
      return true === this.sp && !U(this._conversationsManager);
    }
    getUnavailableReason() {
      return this.isAvailable() ? null : this._instance.config.disable_conversations ? "disabled_by_config" : sK(this._instance.config) ? "disabled_for_toolbar" : this._instance.config.cookieless_mode && this._instance.consent.isOptedOut() ? "consent_opted_out" : false === this.ap ? "remote_config_failed" : z(this.sp) ? this.ap ? "disabled_in_project" : "remote_config_pending" : this.sp ? G(this.ne) || !this.ne.token ? "missing_token" : (null == w ? void 0 : w.__PosthogExtensions__) ? this.rp ? "initializing" : this.op ? "load_failed" : "not_loaded" : "extensions_unavailable" : "disabled_in_project";
    }
    isVisible() {
      var e10, t10;
      return null != (e10 = null == (t10 = this._conversationsManager) ? void 0 : t10.isVisible()) && e10;
    }
    sendMessage(e10, t10, i10) {
      var s10 = this;
      return ea(function* () {
        return s10._conversationsManager ? s10._conversationsManager.sendMessage(e10, t10, i10) : (lg.warn(lv), null);
      })();
    }
    getMessages(e10, t10) {
      var i10 = this;
      return ea(function* () {
        return i10._conversationsManager ? i10._conversationsManager.getMessages(e10, t10) : (lg.warn(lv), null);
      })();
    }
    markAsRead(e10) {
      var t10 = this;
      return ea(function* () {
        return t10._conversationsManager ? t10._conversationsManager.markAsRead(e10) : (lg.warn(lv), null);
      })();
    }
    getTickets(e10) {
      var t10 = this;
      return ea(function* () {
        return t10._conversationsManager ? t10._conversationsManager.getTickets(e10) : (lg.warn(lv), null);
      })();
    }
    requestRestoreLink(e10) {
      var t10 = this;
      return ea(function* () {
        return t10._conversationsManager ? t10._conversationsManager.requestRestoreLink(e10) : (lg.warn(lv), null);
      })();
    }
    restoreFromToken(e10) {
      var t10 = this;
      return ea(function* () {
        return t10._conversationsManager ? t10._conversationsManager.restoreFromToken(e10) : (lg.warn(lv), null);
      })();
    }
    restoreFromUrlToken() {
      var e10 = this;
      return ea(function* () {
        return e10._conversationsManager ? e10._conversationsManager.restoreFromUrlToken() : (lg.warn(lv), null);
      })();
    }
    getCurrentTicketId() {
      var e10, t10;
      return null != (e10 = null == (t10 = this._conversationsManager) ? void 0 : t10.getCurrentTicketId()) ? e10 : null;
    }
    getWidgetSessionId() {
      var e10, t10;
      return null != (e10 = null == (t10 = this._conversationsManager) ? void 0 : t10.getWidgetSessionId()) ? e10 : null;
    }
    Ch() {
      var e10;
      null == (e10 = this._conversationsManager) || e10.setIdentity();
    }
    $h() {
      var e10;
      null == (e10 = this._conversationsManager) || e10.clearIdentity();
    }
  } }), { logs: class {
    constructor(e10) {
      var t10;
      this._instance = e10, this.name = "logs", this.hp = false, this.cp = false, this.dp = false, this.A = iE("[logs]"), this.vp = tb(tb({}, this.A), {}, { error: (...e11) => {
        e11.some(lk) || this.A.error(...e11);
      } }), this.ol = [], this.fp = [], this.kd = 0, this.To = false, this.pp = [], this.gp = [], this.mp = false, this.yp = false, this.bp = () => {
        var e11, t11;
        this.To || (this.kd = 0, null == (e11 = this._p) || e11.onReconnect(), null == (t11 = this.wp) || t11.onReconnect());
      }, this._instance && (null == (t10 = this._instance.config.logs) ? void 0 : t10.captureConsoleLogs) && (this.hp = true), u && sG(u, "online", this.bp);
    }
    kp(e10, t10, i10, s10) {
      var r10;
      let n10 = l_(null == (r10 = this._instance) || null == (r10 = r10.config) ? void 0 : r10.logs, i10);
      return [new i_(this.Sp(e10, t10), n10, this.vp, () => this.xp(), (e11) => e11(), void 0, s10), n10];
    }
    Cp() {
      var e10, t10;
      let i10 = null == (e10 = this._instance) || null == (e10 = e10.config) ? void 0 : e10.logs;
      return this._p && this.$p === i10 || (null == (t10 = this._p) || t10.reset(), this.$p = i10, [this._p, this.Tp] = this.kp(() => this.ol, (e11) => {
        this.ol = e11;
      })), this._p;
    }
    Ip() {
      var e10, t10;
      let i10 = null == (e10 = this._instance) || null == (e10 = e10.config) ? void 0 : e10.logs;
      return this.wp && this.Mp === i10 || (null == (t10 = this.wp) || t10.reset(), this.Mp = i10, [this.wp, this.Ep] = this.kp(() => this.fp, (e11) => {
        this.fp = e11;
      }, { serviceNameDefault: "posthog-browser-logs", consoleCapture: true }, lb)), this.wp;
    }
    setup(e10) {
      var t10;
      if (this.To) return;
      this.bo = e10, (null == (t10 = this._instance) || null == (t10 = t10.config) || null == (t10 = t10.logs) ? void 0 : t10.captureConsoleLogs) && (this.hp = true), (this.hp || this.Pp() && this.Rp()) && this.Ap();
      let i10 = false, s10 = e10.onRemoteConfig((e11) => {
        var t11;
        i10 = e11.ok && true === (null == (t11 = e11.config.logs) ? void 0 : t11.captureConsoleLogs), this.onRemoteConfig(e11);
      });
      this.To ? s10.dispose() : (this.Eo = s10, i10 || this.loadIfEnabled());
    }
    dispose() {
      var e10, t10, i10, s10;
      this.To || (this.To = true, this.Fp(), null == (e10 = this.Eo) || e10.dispose(), this.Eo = void 0, this.bo = void 0, this.dp = false, null == u || u.removeEventListener("online", this.bp), null == (t10 = this.Op) || t10.call(this), this.Op = void 0, null == (i10 = this._p) || i10.reset(), null == (s10 = this.wp) || s10.reset());
    }
    onRemoteConfig(e10) {
      var t10, i10;
      if (this.To) return;
      let s10 = e10.ok ? null == (t10 = e10.config.logs) ? void 0 : t10.captureConsoleLogs : void 0;
      G(s10) ? this.Dp() : (null == (i10 = this._instance) || null == (i10 = i10.persistence) || i10.register({ $logs_capture_enabled_server_side: !!s10 }), s10 ? (this.hp = true, this.cp || this.Ap(), this.loadIfEnabled()) : this.Dp());
    }
    reset() {
      var e10, t10, i10, s10;
      this.Fp(), null == (e10 = this._p) || e10.clearQueue(), this.ol = [], null == (t10 = this._p) || t10.reset(), null == (i10 = this.wp) || i10.clearQueue(), this.fp = [], null == (s10 = this.wp) || s10.reset(), this.kd = 0;
    }
    captureLog(e10) {
      this.To || this.Cp().captureLog(e10);
    }
    captureConsoleLog(e10) {
      this.To || this.Ip().captureLog(e10);
    }
    captureBufferedConsoleLog(e10, t10, i10) {
      this.To || this.Ip().captureLog(e10, { context: t10, occurredAtMs: i10 });
    }
    Rp() {
      var e10;
      return !!(null == (e10 = this._instance) || null == (e10 = e10.persistence) || null == (e10 = e10.props) ? void 0 : e10[iG]);
    }
    Pp() {
      var e10, t10, i10;
      return !(null == (e10 = this._instance) || null == (t10 = e10.il) ? void 0 : t10.call(e10)) || !!(null == (i10 = w._POSTHOG_REMOTE_CONFIG) || null == (i10 = i10[this._instance.config.token]) ? void 0 : i10.config);
    }
    Ih() {
      var e10;
      this.Fp(), null == (e10 = this.wp) || e10.clearQueue(), this.fp = [];
    }
    Dp() {
      this.hp || this.Fp();
    }
    Ap() {
      var e10;
      if (this.mp || !(null == w ? void 0 : w.console)) return;
      let t10 = l_(null == (e10 = this._instance) || null == (e10 = e10.config) ? void 0 : e10.logs).maxBufferSize, i10 = true;
      for (let e11 of (this.gp.push(() => {
        i10 = false;
      }), lm)) {
        let s10;
        try {
          s10 = ly(w.console[e11]);
        } catch (e12) {
          continue;
        }
        s10 && this.gp.push(aO(w.console, e11, (r10) => {
          let n10 = (...s11) => {
            try {
              i10 && this.Lp(e11, s11, t10);
            } catch (e12) {
            }
            return r10.apply(w.console, s11);
          };
          return n10.__rrweb_original__ = s10, n10;
        }));
      }
      this.mp = true, this.Np = setTimeout(() => {
        this.Fp();
      }, 3e4);
    }
    Lp(e10, t10, i10) {
      var s10;
      if (this.mp && !this.yp && 0 !== t10.length) if (null == (s10 = this._instance) ? void 0 : s10.is_capturing()) {
        if (i10 > this.pp.length) {
          this.yp = true;
          try {
            this.pp.push({ level: e10, args: t10, occurredAtMs: Date.now(), context: this.xp() });
          } finally {
            this.yp = false;
          }
        }
      } else this.Fp();
    }
    Fp() {
      if (this.pp = [], this.mp) {
        for (let e10 of (this.mp = false, this.Np && (clearTimeout(this.Np), this.Np = void 0), this.gp)) e10();
        this.gp = [];
      }
    }
    qp() {
      let e10 = this.pp;
      return this.Fp(), e10;
    }
    get logger() {
      return this.jp || (this.jp = { trace: (e10, t10) => this.captureLog({ body: e10, level: "trace", attributes: t10 }), debug: (e10, t10) => this.captureLog({ body: e10, level: "debug", attributes: t10 }), info: (e10, t10) => this.captureLog({ body: e10, level: "info", attributes: t10 }), warn: (e10, t10) => this.captureLog({ body: e10, level: "warn", attributes: t10 }), error: (e10, t10) => this.captureLog({ body: e10, level: "error", attributes: t10 }), fatal: (e10, t10) => this.captureLog({ body: e10, level: "fatal", attributes: t10 }) }), this.jp;
    }
    flushLogs(e10) {
      e10 ? this.Bp(e10) : (this._p && this._p.flush().catch((e11) => this.Hp(e11)), this.wp && this.wp.flush().catch((e11) => this.Hp(e11)));
    }
    Hp(e10) {
      lk(e10) || this.A.error("PostHog logs flush failed:", e10);
    }
    loadIfEnabled() {
      if (this.To || !this.hp || this.cp || this.dp) return;
      let e10 = null == w ? void 0 : w.__PosthogExtensions__;
      if (!e10) return this.A.error("PostHog Extensions not found."), void this.Fp();
      let t10 = e10.loadExternalDependency;
      if (!t10) return this.A.error(sF), void this.Fp();
      this.dp = true;
      try {
        t10(this._instance, "logs", (t11) => {
          if (this.dp = false, this.To || !this.hp) return;
          let i10 = e10.logs;
          if (!t11 && (null == i10 ? void 0 : i10.initializeLogs)) {
            var s10, r10, n10;
            let e11 = this.qp();
            this.Op = i10.initializeLogs(null != (s10 = this.bo) ? s10 : this._instance), this.cp = true, e11.length > 0 && (null == (r10 = i10.replayConsoleBuffer) || r10.call(i10, null != (n10 = this.bo) ? n10 : this._instance, e11));
          } else this.A.error("Could not load logs script", t11), this.Fp();
        });
      } catch (e11) {
        throw this.dp = false, e11;
      }
    }
    Sp(e10, t10) {
      let i10 = this._instance;
      return { get isDisabled() {
        return false;
      }, get optedOut() {
        return !i10.is_capturing();
      }, getPersistedProperty: (t11) => t11 === P.LogsQueue ? e10() : void 0, setPersistedProperty(e11, i11) {
        e11 === P.LogsQueue && t10(null != i11 ? i11 : []);
      }, js: (e11) => this.js(e11), getLibraryId: () => k.LIB_NAME, getLibraryVersion: () => k.LIB_VERSION };
    }
    js(e10) {
      return new Promise((t10) => {
        if (ns(this.kd, 3)) return void t10({ kind: "fatal", error: lx(void 0, "logs endpoint is unreachable, dropping batch") });
        let i10 = false, s10 = (e11) => {
          i10 || (i10 = true, clearTimeout(r10), t10(e11));
        }, r10 = setTimeout(() => {
          this.A.warn("Logs request timed out before receiving a response"), s10({ kind: "retry-later", error: lx(void 0, "logs request timed out") });
        }, 9e4);
        this._instance._send_request({ method: "POST", url: this.zp(), data: e10, compression: "best-available", batchKey: "logs", fireCallbackOnDrop: true, callback: (e11) => {
          let t11 = e11.statusCode;
          if (this.Up(t11), t11 >= 200 && 300 > t11) s10({ kind: "ok" });
          else if (413 === t11) s10({ kind: "too-large" });
          else if (0 !== t11 && 408 !== t11 && 429 !== t11 && 500 > t11) s10({ kind: "fatal", error: Error(`logs request failed with status ${t11}`) });
          else {
            var i11;
            0 === t11 ? (e11.error || this.A.warn("Logs request failed before receiving an HTTP response"), s10({ kind: "retry-later", error: lx(e11.error, "logs request failed before receiving an HTTP response") })) : s10({ kind: "retry-later", error: null != (i11 = e11.error) ? i11 : Error(`logs request failed with status ${t11}`) });
          }
        } });
      });
    }
    Up(e10) {
      (0 !== e10 || this._instance.__loaded) && (this.kd = nr(e10, this.kd, 3, () => this.A.warn("Log requests are failing before receiving an HTTP response; this can happen due to network issues, CORS, browser blocking, or ad blockers. Stopped sending logs; will try again when connectivity changes.")));
    }
    Bp(e10) {
      this.ol.length > 0 && this.Wp(e10, this.ol, this.Tp, k.LIB_NAME, (e11) => {
        this.ol = e11;
      }), this.fp.length > 0 && this.Wp(e10, this.fp, this.Ep, lb, (e11) => {
        this.fp = e11;
      });
    }
    Wp(e10, t10, i10, s10, r10) {
      if (0 === t10.length) return;
      let n10 = t10.map((e11) => e11.record);
      r10([]);
      let o10 = id(n10, io(i10, k.LIB_NAME, k.LIB_VERSION), s10, k.LIB_VERSION);
      this._instance._send_request({ method: "POST", url: this.zp(), data: o10, compression: "best-available", batchKey: "logs", transport: e10 });
    }
    zp() {
      return this._instance.requestRouter.endpointFor("api", "/i/v1/logs") + "?token=" + encodeURIComponent(this._instance.config.token);
    }
    xp() {
      var e10;
      let t10 = {};
      if (t10.distinctId = this._instance.get_distinct_id(), this._instance.sessionManager) {
        let { sessionId: e11, windowId: i10, sessionStartTimestamp: s10, lastActivityTimestamp: r10 } = this._instance.sessionManager.checkAndGetSessionAndWindowId(true);
        t10.sessionId = e11, t10.windowId = i10, G(s10) || (t10.sessionStartTimestamp = s10), G(r10) || (t10.lastActivityTimestamp = r10);
      }
      if ((null == w || null == (e10 = w.location) ? void 0 : e10.href) && (t10.currentUrl = this._instance.config.disable_capture_url_hashes ? tp(w.location.href) : w.location.href), this._instance.featureFlags) {
        let e11 = this._instance.featureFlags.getFlags();
        e11 && e11.length > 0 && (t10.activeFeatureFlags = e11);
      }
      return t10;
    }
  } }), { metrics: class {
    constructor(e10) {
      this._instance = e10, this.A = iE("[metrics]"), this.To = false;
    }
    initialize() {
      this.onConfigChange();
    }
    onConfigChange() {
      var e10, t10;
      let i10, s10, r10, n10;
      if (this.To) return;
      let o10 = !!(null == (e10 = this._instance.config.metrics) ? void 0 : e10.network);
      o10 && !this.Vp ? this.Vp = (t10 = this._instance, i10 = true, s10 = () => {
        var e11;
        let s11;
        return i10 ? true === (s11 = null == (e11 = t10.config.metrics) ? void 0 : e11.network) ? {} : s11 || void 0 : void 0;
      }, r10 = B(null == u ? void 0 : u.fetch) ? aO(u, "fetch", (e11) => function(...i11) {
        let r11 = l$(), n11 = e11.apply(this, i11);
        if (!s10()) return n11;
        try {
          var o11, a10, l2;
          let [e12, u2] = i11, h2 = lP(null != (o11 = null != (a10 = null == u2 ? void 0 : u2.method) ? a10 : null == e12 ? void 0 : e12.method) ? o11 : "GET", null != (l2 = null == e12 ? void 0 : e12.url) ? l2 : e12);
          return n11.then((e13) => (lF(t10, h2, null == e13 ? void 0 : e13.status, r11, s10, void 0, true), e13), (e13) => {
            throw lF(t10, h2, void 0, r11, s10, e13), e13;
          });
        } catch (e12) {
          return lE.error("Failed to observe fetch", e12), n11;
        }
      }) : lC, n10 = ((e11, t11) => {
        var i11;
        let s11 = null == u || null == (i11 = u.XMLHttpRequest) ? void 0 : i11.prototype;
        if (!s11) return lC;
        let r11 = /* @__PURE__ */ new WeakMap(), n11 = aO(s11, "open", (e12) => function(...t12) {
          try {
            op.has(this) || r11.set(this, lP(t12[0], t12[1]));
          } catch (e13) {
            lE.error("Failed to observe XHR open", e13);
          }
          return e12.apply(this, t12);
        }), o11 = aO(s11, "send", (i12) => function(...s12) {
          let n12;
          try {
            let i13 = r11.get(this);
            if (i13 && t11()) {
              let s13 = l$();
              n12 = () => {
                this.removeEventListener("loadend", n12), lF(e11, i13, this.status, s13, t11);
              }, sG(this, "loadend", n12);
            }
          } catch (e12) {
            lE.error("Failed to observe XHR send", e12);
          }
          try {
            return i12.apply(this, s12);
          } catch (e12) {
            throw n12 && this.removeEventListener("loadend", n12), e12;
          }
        });
        return () => {
          n11(), o11();
        };
      })(t10, s10), () => {
        i10 = false, r10(), n10();
      }) : !o10 && this.Vp && (this.Vp(), this.Vp = void 0);
    }
    Cp() {
      var e10, t10, i10, s10, r10, n10, o10;
      let a10, l2 = null == (e10 = this._instance) || null == (e10 = e10.config) ? void 0 : e10.metrics;
      return this._p && this.$p === l2 || (null == (t10 = this._p) || t10.reset(), this.$p = l2, this._p = new iw(this.Sp(), { serviceName: null != (i10 = null == (a10 = null == l2 ? void 0 : l2.resourceAttributes) ? void 0 : a10["service.name"]) ? i10 : null == l2 ? void 0 : l2.serviceName, serviceVersion: null != (s10 = null == a10 ? void 0 : a10["service.version"]) ? s10 : null == l2 ? void 0 : l2.serviceVersion, environment: null != (r10 = null == a10 ? void 0 : a10["deployment.environment"]) ? r10 : null == l2 ? void 0 : l2.environment, resourceAttributes: a10, beforeSend: null == l2 ? void 0 : l2.beforeSend, flushIntervalMs: null != (n10 = null == l2 ? void 0 : l2.flushIntervalMs) ? n10 : 1e4, maxSeriesPerFlush: null != (o10 = null == l2 ? void 0 : l2.maxSeriesPerFlush) ? o10 : 1e3 }, this.A)), this._p;
    }
    count(e10, t10 = 1, i10) {
      this.Cp().count(e10, t10, i10);
    }
    gauge(e10, t10, i10) {
      this.Cp().gauge(e10, t10, i10);
    }
    histogram(e10, t10, i10) {
      this.Cp().histogram(e10, t10, i10);
    }
    flush(e10) {
      if (!this._p) return Promise.resolve();
      if (e10) {
        let t10 = this._p.drainWindow();
        return t10 && this.Ys(t10, e10), Promise.resolve();
      }
      return this._p.flush().catch((e11) => this.A.error("PostHog metrics flush failed:", e11));
    }
    reset() {
      var e10;
      null == (e10 = this._p) || e10.reset();
    }
    dispose() {
      var e10, t10;
      this.To = true, null == (e10 = this.Vp) || e10.call(this), this.Vp = void 0, null == (t10 = this._p) || t10.reset();
    }
    Sp() {
      let e10 = this._instance, t10 = this;
      return { get isDisabled() {
        return false;
      }, get optedOut() {
        return !e10.is_capturing();
      }, Ys: (e11) => t10.Ys(e11), getLibraryId: () => k.LIB_NAME, getLibraryVersion: () => k.LIB_VERSION };
    }
    Ys(e10, t10) {
      return new Promise((i10) => {
        let s10 = false, r10 = (e11) => {
          s10 || (s10 = true, clearTimeout(n10), i10(e11));
        }, n10 = setTimeout(() => r10({ kind: "retry-later", error: Error("metrics request timed out") }), 9e4);
        this._instance._send_request(tb(tb({ method: "POST", url: this.Gp(), data: e10, compression: "best-available", batchKey: "metrics" }, t10 && { transport: t10 }), {}, { fireCallbackOnDrop: true, callback(e11) {
          let t11 = e11.statusCode;
          if (t11 >= 200 && 300 > t11) r10({ kind: "ok" });
          else if (413 === t11) r10({ kind: "too-large" });
          else if (0 !== t11 && 408 !== t11 && 429 !== t11 && 500 > t11) r10({ kind: "fatal", error: Error(`metrics request failed with status ${t11}`) });
          else {
            var i11;
            r10({ kind: "retry-later", error: null != (i11 = e11.error) ? i11 : Error(`metrics request failed with status ${t11}`) });
          }
        } }));
      });
    }
    Gp() {
      return this._instance.requestRouter.endpointFor("api", "/i/v1/metrics") + "?token=" + encodeURIComponent(this._instance.config.token);
    }
  } }));
  let lR = (k.SDK_DIST_CHANNEL = "npm", l = ai[av] = new aw(), (function() {
    function e10() {
      e10.done || (e10.done = true, oO = false, sB(ai, function(e11) {
        e11._dom_loaded();
      }));
    }
    (null == d ? void 0 : d.addEventListener) ? "complete" === d.readyState ? e10() : sG(d, "DOMContentLoaded", e10, { capture: false }) : u && ik.error("Browser doesn't support `document.addEventListener` so PostHog couldn't be initialized");
  })(), l);
  e.s(["default", 0, lR]);
}]);
