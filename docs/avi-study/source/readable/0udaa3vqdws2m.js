(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 14589, (e) => {
  e.v({ count: "floating-phones-module__BcNwCq__count", counter: "floating-phones-module__BcNwCq__counter", credits: "floating-phones-module__BcNwCq__credits", draw: "floating-phones-module__BcNwCq__draw", edge: "floating-phones-module__BcNwCq__edge", edgeRight: "floating-phones-module__BcNwCq__edgeRight", fade: "floating-phones-module__BcNwCq__fade", glow: "floating-phones-module__BcNwCq__glow", hint: "floating-phones-module__BcNwCq__hint", index: "floating-phones-module__BcNwCq__index", kicker: "floating-phones-module__BcNwCq__kicker", letter: "floating-phones-module__BcNwCq__letter", loader: "floating-phones-module__BcNwCq__loader", mark: "floating-phones-module__BcNwCq__mark", nav: "floating-phones-module__BcNwCq__nav", notes: "floating-phones-module__BcNwCq__notes", page: "floating-phones-module__BcNwCq__page", rise: "floating-phones-module__BcNwCq__rise", "rise-soft": "floating-phones-module__BcNwCq__rise-soft", rows: "floating-phones-module__BcNwCq__rows", rule: "floating-phones-module__BcNwCq__rule", skip: "floating-phones-module__BcNwCq__skip", squiggle: "floating-phones-module__BcNwCq__squiggle", stage: "floating-phones-module__BcNwCq__stage", title: "floating-phones-module__BcNwCq__title", turn: "floating-phones-module__BcNwCq__turn", veil: "floating-phones-module__BcNwCq__veil", views: "floating-phones-module__BcNwCq__views", watch: "floating-phones-module__BcNwCq__watch", word: "floating-phones-module__BcNwCq__word" });
}, 15756, (e) => {
  "use strict";
  var a = e.i(43476), t = e.i(22016), i = e.i(71645), r = e.i(90072), s = e.i(8560), n = r;
  function o(e2) {
    let a2, t2, i2, s2 = -1, n2 = 0;
    for (let r2 = 0; r2 < e2.length; ++r2) {
      let o3 = e2[r2];
      if (void 0 === a2 && (a2 = o3.array.constructor), a2 !== o3.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
      if (void 0 === t2 && (t2 = o3.itemSize), t2 !== o3.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
      if (void 0 === i2 && (i2 = o3.normalized), i2 !== o3.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
      if (-1 === s2 && (s2 = o3.gpuType), s2 !== o3.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
      n2 += o3.count * t2;
    }
    let o2 = new a2(n2), c2 = new r.BufferAttribute(o2, t2, i2), l2 = 0;
    for (let a3 = 0; a3 < e2.length; ++a3) {
      let i3 = e2[a3];
      if (i3.isInterleavedBufferAttribute) {
        let e3 = l2 / t2;
        for (let a4 = 0, r2 = i3.count; a4 < r2; a4++) for (let r3 = 0; r3 < t2; r3++) {
          let t3 = i3.getComponent(a4, r3);
          c2.setComponent(a4 + e3, r3, t3);
        }
      } else o2.set(i3.array, l2);
      l2 += i3.count * t2;
    }
    return void 0 !== s2 && (c2.gpuType = s2), c2;
  }
  function c(e2, a2) {
    if (a2 === r.TrianglesDrawMode) return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), e2;
    if (a2 !== r.TriangleFanDrawMode && a2 !== r.TriangleStripDrawMode) return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", a2), e2;
    {
      let t2 = e2.getIndex();
      if (null === t2) {
        let a3 = [], i3 = e2.getAttribute("position");
        if (void 0 === i3) return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), e2;
        for (let e3 = 0; e3 < i3.count; e3++) a3.push(e3);
        e2.setIndex(a3), t2 = e2.getIndex();
      }
      let i2 = t2.count - 2, s2 = [];
      if (a2 === r.TriangleFanDrawMode) for (let e3 = 1; e3 <= i2; e3++) s2.push(t2.getX(0)), s2.push(t2.getX(e3)), s2.push(t2.getX(e3 + 1));
      else for (let e3 = 0; e3 < i2; e3++) e3 % 2 == 0 ? (s2.push(t2.getX(e3)), s2.push(t2.getX(e3 + 1)), s2.push(t2.getX(e3 + 2))) : (s2.push(t2.getX(e3 + 2)), s2.push(t2.getX(e3 + 1)), s2.push(t2.getX(e3)));
      s2.length / 3 !== i2 && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
      let n2 = e2.clone();
      return n2.setIndex(s2), n2.clearGroups(), n2;
    }
  }
  class l extends n.Loader {
    constructor(e2) {
      super(e2), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e3) {
        return new f(e3);
      }), this.register(function(e3) {
        return new m(e3);
      }), this.register(function(e3) {
        return new j(e3);
      }), this.register(function(e3) {
        return new M(e3);
      }), this.register(function(e3) {
        return new S(e3);
      }), this.register(function(e3) {
        return new x(e3);
      }), this.register(function(e3) {
        return new w(e3);
      }), this.register(function(e3) {
        return new v(e3);
      }), this.register(function(e3) {
        return new k(e3);
      }), this.register(function(e3) {
        return new u(e3);
      }), this.register(function(e3) {
        return new T(e3);
      }), this.register(function(e3) {
        return new g(e3);
      }), this.register(function(e3) {
        return new A(e3);
      }), this.register(function(e3) {
        return new R(e3);
      }), this.register(function(e3) {
        return new h(e3);
      }), this.register(function(e3) {
        return new E(e3);
      }), this.register(function(e3) {
        return new y(e3);
      });
    }
    load(e2, a2, t2, i2) {
      let r2, s2 = this;
      if ("" !== this.resourcePath) r2 = this.resourcePath;
      else if ("" !== this.path) {
        let a3 = n.LoaderUtils.extractUrlBase(e2);
        r2 = n.LoaderUtils.resolveURL(a3, this.path);
      } else r2 = n.LoaderUtils.extractUrlBase(e2);
      this.manager.itemStart(e2);
      let o2 = function(a3) {
        i2 ? i2(a3) : console.error(a3), s2.manager.itemError(e2), s2.manager.itemEnd(e2);
      }, c2 = new n.FileLoader(this.manager);
      c2.setPath(this.path), c2.setResponseType("arraybuffer"), c2.setRequestHeader(this.requestHeader), c2.setWithCredentials(this.withCredentials), c2.load(e2, function(t3) {
        try {
          s2.parse(t3, r2, function(t4) {
            a2(t4), s2.manager.itemEnd(e2);
          }, o2);
        } catch (e3) {
          o2(e3);
        }
      }, t2, o2);
    }
    setDRACOLoader(e2) {
      return this.dracoLoader = e2, this;
    }
    setKTX2Loader(e2) {
      return this.ktx2Loader = e2, this;
    }
    setMeshoptDecoder(e2) {
      return this.meshoptDecoder = e2, this;
    }
    register(e2) {
      return -1 === this.pluginCallbacks.indexOf(e2) && this.pluginCallbacks.push(e2), this;
    }
    unregister(e2) {
      return -1 !== this.pluginCallbacks.indexOf(e2) && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e2), 1), this;
    }
    parse(e2, a2, t2, i2) {
      let r2, s2 = {}, n2 = {}, o2 = new TextDecoder();
      if ("string" == typeof e2) r2 = JSON.parse(e2);
      else if (e2 instanceof ArrayBuffer) if (o2.decode(new Uint8Array(e2, 0, 4)) === _) {
        try {
          s2[d.KHR_BINARY_GLTF] = new F(e2);
        } catch (e3) {
          i2 && i2(e3);
          return;
        }
        r2 = JSON.parse(s2[d.KHR_BINARY_GLTF].content);
      } else r2 = JSON.parse(o2.decode(e2));
      else r2 = e2;
      if (void 0 === r2.asset || r2.asset.version[0] < 2) {
        i2 && i2(Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
        return;
      }
      let c2 = new Y(r2, { path: a2 || this.resourcePath || "", crossOrigin: this.crossOrigin, requestHeader: this.requestHeader, manager: this.manager, ktx2Loader: this.ktx2Loader, meshoptDecoder: this.meshoptDecoder });
      c2.fileLoader.setRequestHeader(this.requestHeader);
      for (let e3 = 0; e3 < this.pluginCallbacks.length; e3++) {
        let a3 = this.pluginCallbacks[e3](c2);
        a3.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), n2[a3.name] = a3, s2[a3.name] = true;
      }
      if (r2.extensionsUsed) for (let e3 = 0; e3 < r2.extensionsUsed.length; ++e3) {
        let a3 = r2.extensionsUsed[e3], t3 = r2.extensionsRequired || [];
        switch (a3) {
          case d.KHR_MATERIALS_UNLIT:
            s2[a3] = new p();
            break;
          case d.KHR_DRACO_MESH_COMPRESSION:
            s2[a3] = new C(r2, this.dracoLoader);
            break;
          case d.KHR_TEXTURE_TRANSFORM:
            s2[a3] = new H();
            break;
          case d.KHR_MESH_QUANTIZATION:
            s2[a3] = new O();
            break;
          default:
            t3.indexOf(a3) >= 0 && void 0 === n2[a3] && console.warn('THREE.GLTFLoader: Unknown extension "' + a3 + '".');
        }
      }
      c2.setExtensions(s2), c2.setPlugins(n2), c2.parse(t2, i2);
    }
    parseAsync(e2, a2) {
      let t2 = this;
      return new Promise(function(i2, r2) {
        t2.parse(e2, a2, i2, r2);
      });
    }
  }
  function b() {
    let e2 = {};
    return { get: function(a2) {
      return e2[a2];
    }, add: function(a2, t2) {
      e2[a2] = t2;
    }, remove: function(a2) {
      delete e2[a2];
    }, removeAll: function() {
      e2 = {};
    } };
  }
  let d = { KHR_BINARY_GLTF: "KHR_binary_glTF", KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression", KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual", KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat", KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion", KHR_MATERIALS_IOR: "KHR_materials_ior", KHR_MATERIALS_SHEEN: "KHR_materials_sheen", KHR_MATERIALS_SPECULAR: "KHR_materials_specular", KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission", KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence", KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy", KHR_MATERIALS_UNLIT: "KHR_materials_unlit", KHR_MATERIALS_VOLUME: "KHR_materials_volume", KHR_TEXTURE_BASISU: "KHR_texture_basisu", KHR_TEXTURE_TRANSFORM: "KHR_texture_transform", KHR_MESH_QUANTIZATION: "KHR_mesh_quantization", KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength", EXT_MATERIALS_BUMP: "EXT_materials_bump", EXT_TEXTURE_WEBP: "EXT_texture_webp", EXT_TEXTURE_AVIF: "EXT_texture_avif", EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression", EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing" };
  class h {
    constructor(e2) {
      this.parser = e2, this.name = d.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
    }
    _markDefs() {
      let e2 = this.parser, a2 = this.parser.json.nodes || [];
      for (let t2 = 0, i2 = a2.length; t2 < i2; t2++) {
        let i3 = a2[t2];
        i3.extensions && i3.extensions[this.name] && void 0 !== i3.extensions[this.name].light && e2._addNodeRef(this.cache, i3.extensions[this.name].light);
      }
    }
    _loadLight(e2) {
      let a2, t2 = this.parser, i2 = "light:" + e2, r2 = t2.cache.get(i2);
      if (r2) return r2;
      let s2 = t2.json, o2 = ((s2.extensions && s2.extensions[this.name] || {}).lights || [])[e2], c2 = new n.Color(16777215);
      void 0 !== o2.color && c2.setRGB(o2.color[0], o2.color[1], o2.color[2], n.LinearSRGBColorSpace);
      let l2 = void 0 !== o2.range ? o2.range : 0;
      switch (o2.type) {
        case "directional":
          (a2 = new n.DirectionalLight(c2)).target.position.set(0, 0, -1), a2.add(a2.target);
          break;
        case "point":
          (a2 = new n.PointLight(c2)).distance = l2;
          break;
        case "spot":
          (a2 = new n.SpotLight(c2)).distance = l2, o2.spot = o2.spot || {}, o2.spot.innerConeAngle = void 0 !== o2.spot.innerConeAngle ? o2.spot.innerConeAngle : 0, o2.spot.outerConeAngle = void 0 !== o2.spot.outerConeAngle ? o2.spot.outerConeAngle : Math.PI / 4, a2.angle = o2.spot.outerConeAngle, a2.penumbra = 1 - o2.spot.innerConeAngle / o2.spot.outerConeAngle, a2.target.position.set(0, 0, -1), a2.add(a2.target);
          break;
        default:
          throw Error("THREE.GLTFLoader: Unexpected light type: " + o2.type);
      }
      return a2.position.set(0, 0, 0), Q(a2, o2), void 0 !== o2.intensity && (a2.intensity = o2.intensity), a2.name = t2.createUniqueName(o2.name || "light_" + e2), r2 = Promise.resolve(a2), t2.cache.add(i2, r2), r2;
    }
    getDependency(e2, a2) {
      if ("light" === e2) return this._loadLight(a2);
    }
    createNodeAttachment(e2) {
      let a2 = this, t2 = this.parser, i2 = t2.json.nodes[e2], r2 = (i2.extensions && i2.extensions[this.name] || {}).light;
      return void 0 === r2 ? null : this._loadLight(r2).then(function(e3) {
        return t2._getNodeRef(a2.cache, r2, e3);
      });
    }
  }
  class p {
    constructor() {
      this.name = d.KHR_MATERIALS_UNLIT;
    }
    getMaterialType() {
      return n.MeshBasicMaterial;
    }
    extendParams(e2, a2, t2) {
      let i2 = [];
      e2.color = new n.Color(1, 1, 1), e2.opacity = 1;
      let r2 = a2.pbrMetallicRoughness;
      if (r2) {
        if (Array.isArray(r2.baseColorFactor)) {
          let a3 = r2.baseColorFactor;
          e2.color.setRGB(a3[0], a3[1], a3[2], n.LinearSRGBColorSpace), e2.opacity = a3[3];
        }
        void 0 !== r2.baseColorTexture && i2.push(t2.assignTexture(e2, "map", r2.baseColorTexture, n.SRGBColorSpace));
      }
      return Promise.all(i2);
    }
  }
  class u {
    constructor(e2) {
      this.parser = e2, this.name = d.KHR_MATERIALS_EMISSIVE_STRENGTH;
    }
    extendMaterialParams(e2, a2) {
      let t2 = this.parser.json.materials[e2];
      if (!t2.extensions || !t2.extensions[this.name]) return Promise.resolve();
      let i2 = t2.extensions[this.name].emissiveStrength;
      return void 0 !== i2 && (a2.emissiveIntensity = i2), Promise.resolve();
    }
  }
  class f {
    constructor(e2) {
      this.parser = e2, this.name = d.KHR_MATERIALS_CLEARCOAT;
    }
    getMaterialType(e2) {
      let a2 = this.parser.json.materials[e2];
      return a2.extensions && a2.extensions[this.name] ? n.MeshPhysicalMaterial : null;
    }
    extendMaterialParams(e2, a2) {
      let t2 = this.parser, i2 = t2.json.materials[e2];
      if (!i2.extensions || !i2.extensions[this.name]) return Promise.resolve();
      let r2 = [], s2 = i2.extensions[this.name];
      if (void 0 !== s2.clearcoatFactor && (a2.clearcoat = s2.clearcoatFactor), void 0 !== s2.clearcoatTexture && r2.push(t2.assignTexture(a2, "clearcoatMap", s2.clearcoatTexture)), void 0 !== s2.clearcoatRoughnessFactor && (a2.clearcoatRoughness = s2.clearcoatRoughnessFactor), void 0 !== s2.clearcoatRoughnessTexture && r2.push(t2.assignTexture(a2, "clearcoatRoughnessMap", s2.clearcoatRoughnessTexture)), void 0 !== s2.clearcoatNormalTexture && (r2.push(t2.assignTexture(a2, "clearcoatNormalMap", s2.clearcoatNormalTexture)), void 0 !== s2.clearcoatNormalTexture.scale)) {
        let e3 = s2.clearcoatNormalTexture.scale;
        a2.clearcoatNormalScale = new n.Vector2(e3, e3);
      }
      return Promise.all(r2);
    }
  }
  class m {
    constructor(e2) {
      this.parser = e2, this.name = d.KHR_MATERIALS_DISPERSION;
    }
    getMaterialType(e2) {
      let a2 = this.parser.json.materials[e2];
      return a2.extensions && a2.extensions[this.name] ? n.MeshPhysicalMaterial : null;
    }
    extendMaterialParams(e2, a2) {
      let t2 = this.parser.json.materials[e2];
      if (!t2.extensions || !t2.extensions[this.name]) return Promise.resolve();
      let i2 = t2.extensions[this.name];
      return a2.dispersion = void 0 !== i2.dispersion ? i2.dispersion : 0, Promise.resolve();
    }
  }
  class g {
    constructor(e2) {
      this.parser = e2, this.name = d.KHR_MATERIALS_IRIDESCENCE;
    }
    getMaterialType(e2) {
      let a2 = this.parser.json.materials[e2];
      return a2.extensions && a2.extensions[this.name] ? n.MeshPhysicalMaterial : null;
    }
    extendMaterialParams(e2, a2) {
      let t2 = this.parser, i2 = t2.json.materials[e2];
      if (!i2.extensions || !i2.extensions[this.name]) return Promise.resolve();
      let r2 = [], s2 = i2.extensions[this.name];
      return void 0 !== s2.iridescenceFactor && (a2.iridescence = s2.iridescenceFactor), void 0 !== s2.iridescenceTexture && r2.push(t2.assignTexture(a2, "iridescenceMap", s2.iridescenceTexture)), void 0 !== s2.iridescenceIor && (a2.iridescenceIOR = s2.iridescenceIor), void 0 === a2.iridescenceThicknessRange && (a2.iridescenceThicknessRange = [100, 400]), void 0 !== s2.iridescenceThicknessMinimum && (a2.iridescenceThicknessRange[0] = s2.iridescenceThicknessMinimum), void 0 !== s2.iridescenceThicknessMaximum && (a2.iridescenceThicknessRange[1] = s2.iridescenceThicknessMaximum), void 0 !== s2.iridescenceThicknessTexture && r2.push(t2.assignTexture(a2, "iridescenceThicknessMap", s2.iridescenceThicknessTexture)), Promise.all(r2);
    }
  }
  class x {
    constructor(e2) {
      this.parser = e2, this.name = d.KHR_MATERIALS_SHEEN;
    }
    getMaterialType(e2) {
      let a2 = this.parser.json.materials[e2];
      return a2.extensions && a2.extensions[this.name] ? n.MeshPhysicalMaterial : null;
    }
    extendMaterialParams(e2, a2) {
      let t2 = this.parser, i2 = t2.json.materials[e2];
      if (!i2.extensions || !i2.extensions[this.name]) return Promise.resolve();
      let r2 = [];
      a2.sheenColor = new n.Color(0, 0, 0), a2.sheenRoughness = 0, a2.sheen = 1;
      let s2 = i2.extensions[this.name];
      if (void 0 !== s2.sheenColorFactor) {
        let e3 = s2.sheenColorFactor;
        a2.sheenColor.setRGB(e3[0], e3[1], e3[2], n.LinearSRGBColorSpace);
      }
      return void 0 !== s2.sheenRoughnessFactor && (a2.sheenRoughness = s2.sheenRoughnessFactor), void 0 !== s2.sheenColorTexture && r2.push(t2.assignTexture(a2, "sheenColorMap", s2.sheenColorTexture, n.SRGBColorSpace)), void 0 !== s2.sheenRoughnessTexture && r2.push(t2.assignTexture(a2, "sheenRoughnessMap", s2.sheenRoughnessTexture)), Promise.all(r2);
    }
  }
  class w {
    constructor(e2) {
      this.parser = e2, this.name = d.KHR_MATERIALS_TRANSMISSION;
    }
    getMaterialType(e2) {
      let a2 = this.parser.json.materials[e2];
      return a2.extensions && a2.extensions[this.name] ? n.MeshPhysicalMaterial : null;
    }
    extendMaterialParams(e2, a2) {
      let t2 = this.parser, i2 = t2.json.materials[e2];
      if (!i2.extensions || !i2.extensions[this.name]) return Promise.resolve();
      let r2 = [], s2 = i2.extensions[this.name];
      return void 0 !== s2.transmissionFactor && (a2.transmission = s2.transmissionFactor), void 0 !== s2.transmissionTexture && r2.push(t2.assignTexture(a2, "transmissionMap", s2.transmissionTexture)), Promise.all(r2);
    }
  }
  class v {
    constructor(e2) {
      this.parser = e2, this.name = d.KHR_MATERIALS_VOLUME;
    }
    getMaterialType(e2) {
      let a2 = this.parser.json.materials[e2];
      return a2.extensions && a2.extensions[this.name] ? n.MeshPhysicalMaterial : null;
    }
    extendMaterialParams(e2, a2) {
      let t2 = this.parser, i2 = t2.json.materials[e2];
      if (!i2.extensions || !i2.extensions[this.name]) return Promise.resolve();
      let r2 = [], s2 = i2.extensions[this.name];
      a2.thickness = void 0 !== s2.thicknessFactor ? s2.thicknessFactor : 0, void 0 !== s2.thicknessTexture && r2.push(t2.assignTexture(a2, "thicknessMap", s2.thicknessTexture)), a2.attenuationDistance = s2.attenuationDistance || 1 / 0;
      let o2 = s2.attenuationColor || [1, 1, 1];
      return a2.attenuationColor = new n.Color().setRGB(o2[0], o2[1], o2[2], n.LinearSRGBColorSpace), Promise.all(r2);
    }
  }
  class k {
    constructor(e2) {
      this.parser = e2, this.name = d.KHR_MATERIALS_IOR;
    }
    getMaterialType(e2) {
      let a2 = this.parser.json.materials[e2];
      return a2.extensions && a2.extensions[this.name] ? n.MeshPhysicalMaterial : null;
    }
    extendMaterialParams(e2, a2) {
      let t2 = this.parser.json.materials[e2];
      if (!t2.extensions || !t2.extensions[this.name]) return Promise.resolve();
      let i2 = t2.extensions[this.name];
      return a2.ior = void 0 !== i2.ior ? i2.ior : 1.5, Promise.resolve();
    }
  }
  class T {
    constructor(e2) {
      this.parser = e2, this.name = d.KHR_MATERIALS_SPECULAR;
    }
    getMaterialType(e2) {
      let a2 = this.parser.json.materials[e2];
      return a2.extensions && a2.extensions[this.name] ? n.MeshPhysicalMaterial : null;
    }
    extendMaterialParams(e2, a2) {
      let t2 = this.parser, i2 = t2.json.materials[e2];
      if (!i2.extensions || !i2.extensions[this.name]) return Promise.resolve();
      let r2 = [], s2 = i2.extensions[this.name];
      a2.specularIntensity = void 0 !== s2.specularFactor ? s2.specularFactor : 1, void 0 !== s2.specularTexture && r2.push(t2.assignTexture(a2, "specularIntensityMap", s2.specularTexture));
      let o2 = s2.specularColorFactor || [1, 1, 1];
      return a2.specularColor = new n.Color().setRGB(o2[0], o2[1], o2[2], n.LinearSRGBColorSpace), void 0 !== s2.specularColorTexture && r2.push(t2.assignTexture(a2, "specularColorMap", s2.specularColorTexture, n.SRGBColorSpace)), Promise.all(r2);
    }
  }
  class R {
    constructor(e2) {
      this.parser = e2, this.name = d.EXT_MATERIALS_BUMP;
    }
    getMaterialType(e2) {
      let a2 = this.parser.json.materials[e2];
      return a2.extensions && a2.extensions[this.name] ? n.MeshPhysicalMaterial : null;
    }
    extendMaterialParams(e2, a2) {
      let t2 = this.parser, i2 = t2.json.materials[e2];
      if (!i2.extensions || !i2.extensions[this.name]) return Promise.resolve();
      let r2 = [], s2 = i2.extensions[this.name];
      return a2.bumpScale = void 0 !== s2.bumpFactor ? s2.bumpFactor : 1, void 0 !== s2.bumpTexture && r2.push(t2.assignTexture(a2, "bumpMap", s2.bumpTexture)), Promise.all(r2);
    }
  }
  class A {
    constructor(e2) {
      this.parser = e2, this.name = d.KHR_MATERIALS_ANISOTROPY;
    }
    getMaterialType(e2) {
      let a2 = this.parser.json.materials[e2];
      return a2.extensions && a2.extensions[this.name] ? n.MeshPhysicalMaterial : null;
    }
    extendMaterialParams(e2, a2) {
      let t2 = this.parser, i2 = t2.json.materials[e2];
      if (!i2.extensions || !i2.extensions[this.name]) return Promise.resolve();
      let r2 = [], s2 = i2.extensions[this.name];
      return void 0 !== s2.anisotropyStrength && (a2.anisotropy = s2.anisotropyStrength), void 0 !== s2.anisotropyRotation && (a2.anisotropyRotation = s2.anisotropyRotation), void 0 !== s2.anisotropyTexture && r2.push(t2.assignTexture(a2, "anisotropyMap", s2.anisotropyTexture)), Promise.all(r2);
    }
  }
  class j {
    constructor(e2) {
      this.parser = e2, this.name = d.KHR_TEXTURE_BASISU;
    }
    loadTexture(e2) {
      let a2 = this.parser, t2 = a2.json, i2 = t2.textures[e2];
      if (!i2.extensions || !i2.extensions[this.name]) return null;
      let r2 = i2.extensions[this.name], s2 = a2.options.ktx2Loader;
      if (!s2) if (!(t2.extensionsRequired && t2.extensionsRequired.indexOf(this.name) >= 0)) return null;
      else throw Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return a2.loadTextureImage(e2, r2.source, s2);
    }
  }
  class M {
    constructor(e2) {
      this.parser = e2, this.name = d.EXT_TEXTURE_WEBP;
    }
    loadTexture(e2) {
      let a2 = this.name, t2 = this.parser, i2 = t2.json, r2 = i2.textures[e2];
      if (!r2.extensions || !r2.extensions[a2]) return null;
      let s2 = r2.extensions[a2], n2 = i2.images[s2.source], o2 = t2.textureLoader;
      if (n2.uri) {
        let e3 = t2.options.manager.getHandler(n2.uri);
        null !== e3 && (o2 = e3);
      }
      return t2.loadTextureImage(e2, s2.source, o2);
    }
  }
  class S {
    constructor(e2) {
      this.parser = e2, this.name = d.EXT_TEXTURE_AVIF;
    }
    loadTexture(e2) {
      let a2 = this.name, t2 = this.parser, i2 = t2.json, r2 = i2.textures[e2];
      if (!r2.extensions || !r2.extensions[a2]) return null;
      let s2 = r2.extensions[a2], n2 = i2.images[s2.source], o2 = t2.textureLoader;
      if (n2.uri) {
        let e3 = t2.options.manager.getHandler(n2.uri);
        null !== e3 && (o2 = e3);
      }
      return t2.loadTextureImage(e2, s2.source, o2);
    }
  }
  class E {
    constructor(e2) {
      this.name = d.EXT_MESHOPT_COMPRESSION, this.parser = e2;
    }
    loadBufferView(e2) {
      let a2 = this.parser.json, t2 = a2.bufferViews[e2];
      if (!t2.extensions || !t2.extensions[this.name]) return null;
      {
        let e3 = t2.extensions[this.name], i2 = this.parser.getDependency("buffer", e3.buffer), r2 = this.parser.options.meshoptDecoder;
        if (!r2 || !r2.supported) if (!(a2.extensionsRequired && a2.extensionsRequired.indexOf(this.name) >= 0)) return null;
        else throw Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return i2.then(function(a3) {
          let t3 = e3.byteOffset || 0, i3 = e3.byteLength || 0, s2 = e3.count, n2 = e3.byteStride, o2 = new Uint8Array(a3, t3, i3);
          return r2.decodeGltfBufferAsync ? r2.decodeGltfBufferAsync(s2, n2, o2, e3.mode, e3.filter).then(function(e4) {
            return e4.buffer;
          }) : r2.ready.then(function() {
            let a4 = new ArrayBuffer(s2 * n2);
            return r2.decodeGltfBuffer(new Uint8Array(a4), s2, n2, o2, e3.mode, e3.filter), a4;
          });
        });
      }
    }
  }
  class y {
    constructor(e2) {
      this.name = d.EXT_MESH_GPU_INSTANCING, this.parser = e2;
    }
    createNodeMesh(e2) {
      let a2 = this.parser.json, t2 = a2.nodes[e2];
      if (!t2.extensions || !t2.extensions[this.name] || void 0 === t2.mesh) return null;
      for (let e3 of a2.meshes[t2.mesh].primitives) if (e3.mode !== P.TRIANGLES && e3.mode !== P.TRIANGLE_STRIP && e3.mode !== P.TRIANGLE_FAN && void 0 !== e3.mode) return null;
      let i2 = t2.extensions[this.name].attributes, r2 = [], s2 = {};
      for (let e3 in i2) r2.push(this.parser.getDependency("accessor", i2[e3]).then((a3) => (s2[e3] = a3, s2[e3])));
      return r2.length < 1 ? null : (r2.push(this.parser.createNodeMesh(e2)), Promise.all(r2).then((e3) => {
        let a3 = e3.pop(), t3 = a3.isGroup ? a3.children : [a3], i3 = e3[0].count, r3 = [];
        for (let e4 of t3) {
          let a4 = new n.Matrix4(), t4 = new n.Vector3(), o2 = new n.Quaternion(), c2 = new n.Vector3(1, 1, 1), l2 = new n.InstancedMesh(e4.geometry, e4.material, i3);
          for (let e5 = 0; e5 < i3; e5++) s2.TRANSLATION && t4.fromBufferAttribute(s2.TRANSLATION, e5), s2.ROTATION && o2.fromBufferAttribute(s2.ROTATION, e5), s2.SCALE && c2.fromBufferAttribute(s2.SCALE, e5), l2.setMatrixAt(e5, a4.compose(t4, o2, c2));
          for (let a5 in s2) if ("_COLOR_0" === a5) {
            let e5 = s2[a5];
            l2.instanceColor = new n.InstancedBufferAttribute(e5.array, e5.itemSize, e5.normalized);
          } else "TRANSLATION" !== a5 && "ROTATION" !== a5 && "SCALE" !== a5 && e4.geometry.setAttribute(a5, s2[a5]);
          n.Object3D.prototype.copy.call(l2, e4), this.parser.assignFinalMaterial(l2), r3.push(l2);
        }
        return a3.isGroup ? (a3.clear(), a3.add(...r3), a3) : r3[0];
      }));
    }
  }
  let _ = "glTF";
  class F {
    constructor(e2) {
      this.name = d.KHR_BINARY_GLTF, this.content = null, this.body = null;
      const a2 = new DataView(e2, 0, 12), t2 = new TextDecoder();
      if (this.header = { magic: t2.decode(new Uint8Array(e2.slice(0, 4))), version: a2.getUint32(4, true), length: a2.getUint32(8, true) }, this.header.magic !== _) throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
      if (this.header.version < 2) throw Error("THREE.GLTFLoader: Legacy binary file detected.");
      const i2 = this.header.length - 12, r2 = new DataView(e2, 12);
      let s2 = 0;
      for (; s2 < i2; ) {
        const a3 = r2.getUint32(s2, true);
        s2 += 4;
        const i3 = r2.getUint32(s2, true);
        if (s2 += 4, 1313821514 === i3) {
          const i4 = new Uint8Array(e2, 12 + s2, a3);
          this.content = t2.decode(i4);
        } else if (5130562 === i3) {
          const t3 = 12 + s2;
          this.body = e2.slice(t3, t3 + a3);
        }
        s2 += a3;
      }
      if (null === this.content) throw Error("THREE.GLTFLoader: JSON content not found.");
    }
  }
  class C {
    constructor(e2, a2) {
      if (!a2) throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
      this.name = d.KHR_DRACO_MESH_COMPRESSION, this.json = e2, this.dracoLoader = a2, this.dracoLoader.preload();
    }
    decodePrimitive(e2, a2) {
      let t2 = this.json, i2 = this.dracoLoader, r2 = e2.extensions[this.name].bufferView, s2 = e2.extensions[this.name].attributes, o2 = {}, c2 = {}, l2 = {};
      for (let e3 in s2) o2[K[e3] || e3.toLowerCase()] = s2[e3];
      for (let a3 in e2.attributes) {
        let i3 = K[a3] || a3.toLowerCase();
        if (void 0 !== s2[a3]) {
          let r3 = t2.accessors[e2.attributes[a3]], s3 = q[r3.componentType];
          l2[i3] = s3.name, c2[i3] = true === r3.normalized;
        }
      }
      return a2.getDependency("bufferView", r2).then(function(e3) {
        return new Promise(function(a3, t3) {
          i2.decodeDracoFile(e3, function(e4) {
            for (let a4 in e4.attributes) {
              let t4 = e4.attributes[a4], i3 = c2[a4];
              void 0 !== i3 && (t4.normalized = i3);
            }
            a3(e4);
          }, o2, l2, n.LinearSRGBColorSpace, t3);
        });
      });
    }
  }
  class H {
    constructor() {
      this.name = d.KHR_TEXTURE_TRANSFORM;
    }
    extendTexture(e2, a2) {
      return (void 0 === a2.texCoord || a2.texCoord === e2.channel) && void 0 === a2.offset && void 0 === a2.rotation && void 0 === a2.scale || (e2 = e2.clone(), void 0 !== a2.texCoord && (e2.channel = a2.texCoord), void 0 !== a2.offset && e2.offset.fromArray(a2.offset), void 0 !== a2.rotation && (e2.rotation = a2.rotation), void 0 !== a2.scale && e2.repeat.fromArray(a2.scale), e2.needsUpdate = true), e2;
    }
  }
  class O {
    constructor() {
      this.name = d.KHR_MESH_QUANTIZATION;
    }
  }
  class L extends n.Interpolant {
    constructor(e2, a2, t2, i2) {
      super(e2, a2, t2, i2);
    }
    copySampleValue_(e2) {
      let a2 = this.resultBuffer, t2 = this.sampleValues, i2 = this.valueSize, r2 = e2 * i2 * 3 + i2;
      for (let e3 = 0; e3 !== i2; e3++) a2[e3] = t2[r2 + e3];
      return a2;
    }
    interpolate_(e2, a2, t2, i2) {
      let r2 = this.resultBuffer, s2 = this.sampleValues, n2 = this.valueSize, o2 = 2 * n2, c2 = 3 * n2, l2 = i2 - a2, b2 = (t2 - a2) / l2, d2 = b2 * b2, h2 = d2 * b2, p2 = e2 * c2, u2 = p2 - c2, f2 = -2 * h2 + 3 * d2, m2 = h2 - d2, g2 = 1 - f2, x2 = m2 - d2 + b2;
      for (let e3 = 0; e3 !== n2; e3++) {
        let a3 = s2[u2 + e3 + n2], t3 = s2[u2 + e3 + o2] * l2, i3 = s2[p2 + e3 + n2], c3 = s2[p2 + e3] * l2;
        r2[e3] = g2 * a3 + x2 * t3 + f2 * i3 + m2 * c3;
      }
      return r2;
    }
  }
  let G = new n.Quaternion();
  class N extends L {
    interpolate_(e2, a2, t2, i2) {
      let r2 = super.interpolate_(e2, a2, t2, i2);
      return G.fromArray(r2).normalize().toArray(r2), r2;
    }
  }
  let P = { POINTS: 0, LINES: 1, LINE_LOOP: 2, LINE_STRIP: 3, TRIANGLES: 4, TRIANGLE_STRIP: 5, TRIANGLE_FAN: 6 }, q = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array }, B = { 9728: n.NearestFilter, 9729: n.LinearFilter, 9984: n.NearestMipmapNearestFilter, 9985: n.LinearMipmapNearestFilter, 9986: n.NearestMipmapLinearFilter, 9987: n.LinearMipmapLinearFilter }, I = { 33071: n.ClampToEdgeWrapping, 33648: n.MirroredRepeatWrapping, 10497: n.RepeatWrapping }, D = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 }, K = { POSITION: "position", NORMAL: "normal", TANGENT: "tangent", TEXCOORD_0: "uv", TEXCOORD_1: "uv1", TEXCOORD_2: "uv2", TEXCOORD_3: "uv3", COLOR_0: "color", WEIGHTS_0: "skinWeight", JOINTS_0: "skinIndex" }, z = { scale: "scale", translation: "position", rotation: "quaternion", weights: "morphTargetInfluences" }, U = { CUBICSPLINE: void 0, LINEAR: n.InterpolateLinear, STEP: n.InterpolateDiscrete };
  function W(e2, a2, t2) {
    for (let i2 in t2.extensions) void 0 === e2[i2] && (a2.userData.gltfExtensions = a2.userData.gltfExtensions || {}, a2.userData.gltfExtensions[i2] = t2.extensions[i2]);
  }
  function Q(e2, a2) {
    void 0 !== a2.extras && ("object" == typeof a2.extras ? Object.assign(e2.userData, a2.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + a2.extras));
  }
  function V(e2) {
    let a2 = "", t2 = Object.keys(e2).sort();
    for (let i2 = 0, r2 = t2.length; i2 < r2; i2++) a2 += t2[i2] + ":" + e2[t2[i2]] + ";";
    return a2;
  }
  function X(e2) {
    switch (e2) {
      case Int8Array:
        return 1 / 127;
      case Uint8Array:
        return 1 / 255;
      case Int16Array:
        return 1 / 32767;
      case Uint16Array:
        return 1 / 65535;
      default:
        throw Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
    }
  }
  let J = new n.Matrix4();
  class Y {
    constructor(e2 = {}, a2 = {}) {
      this.json = e2, this.extensions = {}, this.plugins = {}, this.options = a2, this.cache = new b(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
      let t2 = false, i2 = -1, r2 = false, s2 = -1;
      if ("u" > typeof navigator) {
        const e3 = navigator.userAgent;
        t2 = true === /^((?!chrome|android).)*safari/i.test(e3);
        const a3 = e3.match(/Version\/(\d+)/);
        i2 = t2 && a3 ? parseInt(a3[1], 10) : -1, s2 = (r2 = e3.indexOf("Firefox") > -1) ? e3.match(/Firefox\/([0-9]+)\./)[1] : -1;
      }
      "u" < typeof createImageBitmap || t2 && i2 < 17 || r2 && s2 < 98 ? this.textureLoader = new n.TextureLoader(this.options.manager) : this.textureLoader = new n.ImageBitmapLoader(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new n.FileLoader(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), "use-credentials" === this.options.crossOrigin && this.fileLoader.setWithCredentials(true);
    }
    setExtensions(e2) {
      this.extensions = e2;
    }
    setPlugins(e2) {
      this.plugins = e2;
    }
    parse(e2, a2) {
      let t2 = this, i2 = this.json, r2 = this.extensions;
      this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(e3) {
        return e3._markDefs && e3._markDefs();
      }), Promise.all(this._invokeAll(function(e3) {
        return e3.beforeRoot && e3.beforeRoot();
      })).then(function() {
        return Promise.all([t2.getDependencies("scene"), t2.getDependencies("animation"), t2.getDependencies("camera")]);
      }).then(function(a3) {
        let s2 = { scene: a3[0][i2.scene || 0], scenes: a3[0], animations: a3[1], cameras: a3[2], asset: i2.asset, parser: t2, userData: {} };
        return W(r2, s2, i2), Q(s2, i2), Promise.all(t2._invokeAll(function(e3) {
          return e3.afterRoot && e3.afterRoot(s2);
        })).then(function() {
          for (let e3 of s2.scenes) e3.updateMatrixWorld();
          e2(s2);
        });
      }).catch(a2);
    }
    _markDefs() {
      let e2 = this.json.nodes || [], a2 = this.json.skins || [], t2 = this.json.meshes || [];
      for (let t3 = 0, i2 = a2.length; t3 < i2; t3++) {
        let i3 = a2[t3].joints;
        for (let a3 = 0, t4 = i3.length; a3 < t4; a3++) e2[i3[a3]].isBone = true;
      }
      for (let a3 = 0, i2 = e2.length; a3 < i2; a3++) {
        let i3 = e2[a3];
        void 0 !== i3.mesh && (this._addNodeRef(this.meshCache, i3.mesh), void 0 !== i3.skin && (t2[i3.mesh].isSkinnedMesh = true)), void 0 !== i3.camera && this._addNodeRef(this.cameraCache, i3.camera);
      }
    }
    _addNodeRef(e2, a2) {
      void 0 !== a2 && (void 0 === e2.refs[a2] && (e2.refs[a2] = e2.uses[a2] = 0), e2.refs[a2]++);
    }
    _getNodeRef(e2, a2, t2) {
      if (e2.refs[a2] <= 1) return t2;
      let i2 = t2.clone(), r2 = (e3, a3) => {
        let t3 = this.associations.get(e3);
        for (let [i3, s2] of (null != t3 && this.associations.set(a3, t3), e3.children.entries())) r2(s2, a3.children[i3]);
      };
      return r2(t2, i2), i2.name += "_instance_" + e2.uses[a2]++, i2;
    }
    _invokeOne(e2) {
      let a2 = Object.values(this.plugins);
      a2.push(this);
      for (let t2 = 0; t2 < a2.length; t2++) {
        let i2 = e2(a2[t2]);
        if (i2) return i2;
      }
      return null;
    }
    _invokeAll(e2) {
      let a2 = Object.values(this.plugins);
      a2.unshift(this);
      let t2 = [];
      for (let i2 = 0; i2 < a2.length; i2++) {
        let r2 = e2(a2[i2]);
        r2 && t2.push(r2);
      }
      return t2;
    }
    getDependency(e2, a2) {
      let t2 = e2 + ":" + a2, i2 = this.cache.get(t2);
      if (!i2) {
        switch (e2) {
          case "scene":
            i2 = this.loadScene(a2);
            break;
          case "node":
            i2 = this._invokeOne(function(e3) {
              return e3.loadNode && e3.loadNode(a2);
            });
            break;
          case "mesh":
            i2 = this._invokeOne(function(e3) {
              return e3.loadMesh && e3.loadMesh(a2);
            });
            break;
          case "accessor":
            i2 = this.loadAccessor(a2);
            break;
          case "bufferView":
            i2 = this._invokeOne(function(e3) {
              return e3.loadBufferView && e3.loadBufferView(a2);
            });
            break;
          case "buffer":
            i2 = this.loadBuffer(a2);
            break;
          case "material":
            i2 = this._invokeOne(function(e3) {
              return e3.loadMaterial && e3.loadMaterial(a2);
            });
            break;
          case "texture":
            i2 = this._invokeOne(function(e3) {
              return e3.loadTexture && e3.loadTexture(a2);
            });
            break;
          case "skin":
            i2 = this.loadSkin(a2);
            break;
          case "animation":
            i2 = this._invokeOne(function(e3) {
              return e3.loadAnimation && e3.loadAnimation(a2);
            });
            break;
          case "camera":
            i2 = this.loadCamera(a2);
            break;
          default:
            if (!(i2 = this._invokeOne(function(t3) {
              return t3 != this && t3.getDependency && t3.getDependency(e2, a2);
            }))) throw Error("Unknown type: " + e2);
        }
        this.cache.add(t2, i2);
      }
      return i2;
    }
    getDependencies(e2) {
      let a2 = this.cache.get(e2);
      if (!a2) {
        let t2 = this;
        a2 = Promise.all((this.json[e2 + ("mesh" === e2 ? "es" : "s")] || []).map(function(a3, i2) {
          return t2.getDependency(e2, i2);
        })), this.cache.add(e2, a2);
      }
      return a2;
    }
    loadBuffer(e2) {
      let a2 = this.json.buffers[e2], t2 = this.fileLoader;
      if (a2.type && "arraybuffer" !== a2.type) throw Error("THREE.GLTFLoader: " + a2.type + " buffer type is not supported.");
      if (void 0 === a2.uri && 0 === e2) return Promise.resolve(this.extensions[d.KHR_BINARY_GLTF].body);
      let i2 = this.options;
      return new Promise(function(e3, r2) {
        t2.load(n.LoaderUtils.resolveURL(a2.uri, i2.path), e3, void 0, function() {
          r2(Error('THREE.GLTFLoader: Failed to load buffer "' + a2.uri + '".'));
        });
      });
    }
    loadBufferView(e2) {
      let a2 = this.json.bufferViews[e2];
      return this.getDependency("buffer", a2.buffer).then(function(e3) {
        let t2 = a2.byteLength || 0, i2 = a2.byteOffset || 0;
        return e3.slice(i2, i2 + t2);
      });
    }
    loadAccessor(e2) {
      let a2 = this, t2 = this.json, i2 = this.json.accessors[e2];
      if (void 0 === i2.bufferView && void 0 === i2.sparse) {
        let e3 = D[i2.type], a3 = q[i2.componentType], t3 = true === i2.normalized, r3 = new a3(i2.count * e3);
        return Promise.resolve(new n.BufferAttribute(r3, e3, t3));
      }
      let r2 = [];
      return void 0 !== i2.bufferView ? r2.push(this.getDependency("bufferView", i2.bufferView)) : r2.push(null), void 0 !== i2.sparse && (r2.push(this.getDependency("bufferView", i2.sparse.indices.bufferView)), r2.push(this.getDependency("bufferView", i2.sparse.values.bufferView))), Promise.all(r2).then(function(e3) {
        let r3, s2, o2 = e3[0], c2 = D[i2.type], l2 = q[i2.componentType], b2 = l2.BYTES_PER_ELEMENT, d2 = b2 * c2, h2 = i2.byteOffset || 0, p2 = void 0 !== i2.bufferView ? t2.bufferViews[i2.bufferView].byteStride : void 0, u2 = true === i2.normalized;
        if (p2 && p2 !== d2) {
          let e4 = Math.floor(h2 / p2), t3 = "InterleavedBuffer:" + i2.bufferView + ":" + i2.componentType + ":" + e4 + ":" + i2.count, d3 = a2.cache.get(t3);
          d3 || (r3 = new l2(o2, e4 * p2, i2.count * p2 / b2), d3 = new n.InterleavedBuffer(r3, p2 / b2), a2.cache.add(t3, d3)), s2 = new n.InterleavedBufferAttribute(d3, c2, h2 % p2 / b2, u2);
        } else r3 = null === o2 ? new l2(i2.count * c2) : new l2(o2, h2, i2.count * c2), s2 = new n.BufferAttribute(r3, c2, u2);
        if (void 0 !== i2.sparse) {
          let a3 = D.SCALAR, t3 = q[i2.sparse.indices.componentType], r4 = i2.sparse.indices.byteOffset || 0, b3 = i2.sparse.values.byteOffset || 0, d3 = new t3(e3[1], r4, i2.sparse.count * a3), h3 = new l2(e3[2], b3, i2.sparse.count * c2);
          null !== o2 && (s2 = new n.BufferAttribute(s2.array.slice(), s2.itemSize, s2.normalized)), s2.normalized = false;
          for (let e4 = 0, a4 = d3.length; e4 < a4; e4++) {
            let a5 = d3[e4];
            if (s2.setX(a5, h3[e4 * c2]), c2 >= 2 && s2.setY(a5, h3[e4 * c2 + 1]), c2 >= 3 && s2.setZ(a5, h3[e4 * c2 + 2]), c2 >= 4 && s2.setW(a5, h3[e4 * c2 + 3]), c2 >= 5) throw Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
          }
          s2.normalized = u2;
        }
        return s2;
      });
    }
    loadTexture(e2) {
      let a2 = this.json, t2 = this.options, i2 = a2.textures[e2].source, r2 = a2.images[i2], s2 = this.textureLoader;
      if (r2.uri) {
        let e3 = t2.manager.getHandler(r2.uri);
        null !== e3 && (s2 = e3);
      }
      return this.loadTextureImage(e2, i2, s2);
    }
    loadTextureImage(e2, a2, t2) {
      let i2 = this, r2 = this.json, s2 = r2.textures[e2], o2 = r2.images[a2], c2 = (o2.uri || o2.bufferView) + ":" + s2.sampler;
      if (this.textureCache[c2]) return this.textureCache[c2];
      let l2 = this.loadImageSource(a2, t2).then(function(a3) {
        a3.flipY = false, a3.name = s2.name || o2.name || "", "" === a3.name && "string" == typeof o2.uri && false === o2.uri.startsWith("data:image/") && (a3.name = o2.uri);
        let t3 = (r2.samplers || {})[s2.sampler] || {};
        return a3.magFilter = B[t3.magFilter] || n.LinearFilter, a3.minFilter = B[t3.minFilter] || n.LinearMipmapLinearFilter, a3.wrapS = I[t3.wrapS] || n.RepeatWrapping, a3.wrapT = I[t3.wrapT] || n.RepeatWrapping, a3.generateMipmaps = !a3.isCompressedTexture && a3.minFilter !== n.NearestFilter && a3.minFilter !== n.LinearFilter, i2.associations.set(a3, { textures: e2 }), a3;
      }).catch(function() {
        return null;
      });
      return this.textureCache[c2] = l2, l2;
    }
    loadImageSource(e2, a2) {
      let t2 = this.json, i2 = this.options;
      if (void 0 !== this.sourceCache[e2]) return this.sourceCache[e2].then((e3) => e3.clone());
      let r2 = t2.images[e2], s2 = self.URL || self.webkitURL, o2 = r2.uri || "", c2 = false;
      if (void 0 !== r2.bufferView) o2 = this.getDependency("bufferView", r2.bufferView).then(function(e3) {
        c2 = true;
        let a3 = new Blob([e3], { type: r2.mimeType });
        return o2 = s2.createObjectURL(a3);
      });
      else if (void 0 === r2.uri) throw Error("THREE.GLTFLoader: Image " + e2 + " is missing URI and bufferView");
      let l2 = Promise.resolve(o2).then(function(e3) {
        return new Promise(function(t3, r3) {
          let s3 = t3;
          true === a2.isImageBitmapLoader && (s3 = function(e4) {
            let a3 = new n.Texture(e4);
            a3.needsUpdate = true, t3(a3);
          }), a2.load(n.LoaderUtils.resolveURL(e3, i2.path), s3, void 0, r3);
        });
      }).then(function(e3) {
        var a3;
        return true === c2 && s2.revokeObjectURL(o2), Q(e3, r2), e3.userData.mimeType = r2.mimeType || ((a3 = r2.uri).search(/\.jpe?g($|\?)/i) > 0 || 0 === a3.search(/^data\:image\/jpeg/) ? "image/jpeg" : a3.search(/\.webp($|\?)/i) > 0 || 0 === a3.search(/^data\:image\/webp/) ? "image/webp" : a3.search(/\.ktx2($|\?)/i) > 0 || 0 === a3.search(/^data\:image\/ktx2/) ? "image/ktx2" : "image/png"), e3;
      }).catch(function(e3) {
        throw console.error("THREE.GLTFLoader: Couldn't load texture", o2), e3;
      });
      return this.sourceCache[e2] = l2, l2;
    }
    assignTexture(e2, a2, t2, i2) {
      let r2 = this;
      return this.getDependency("texture", t2.index).then(function(s2) {
        if (!s2) return null;
        if (void 0 !== t2.texCoord && t2.texCoord > 0 && ((s2 = s2.clone()).channel = t2.texCoord), r2.extensions[d.KHR_TEXTURE_TRANSFORM]) {
          let e3 = void 0 !== t2.extensions ? t2.extensions[d.KHR_TEXTURE_TRANSFORM] : void 0;
          if (e3) {
            let a3 = r2.associations.get(s2);
            s2 = r2.extensions[d.KHR_TEXTURE_TRANSFORM].extendTexture(s2, e3), r2.associations.set(s2, a3);
          }
        }
        return void 0 !== i2 && (s2.colorSpace = i2), e2[a2] = s2, s2;
      });
    }
    assignFinalMaterial(e2) {
      let a2 = e2.geometry, t2 = e2.material, i2 = void 0 === a2.attributes.tangent, r2 = void 0 !== a2.attributes.color, s2 = void 0 === a2.attributes.normal;
      if (e2.isPoints) {
        let e3 = "PointsMaterial:" + t2.uuid, a3 = this.cache.get(e3);
        a3 || (a3 = new n.PointsMaterial(), n.Material.prototype.copy.call(a3, t2), a3.color.copy(t2.color), a3.map = t2.map, a3.sizeAttenuation = false, this.cache.add(e3, a3)), t2 = a3;
      } else if (e2.isLine) {
        let e3 = "LineBasicMaterial:" + t2.uuid, a3 = this.cache.get(e3);
        a3 || (a3 = new n.LineBasicMaterial(), n.Material.prototype.copy.call(a3, t2), a3.color.copy(t2.color), a3.map = t2.map, this.cache.add(e3, a3)), t2 = a3;
      }
      if (i2 || r2 || s2) {
        let e3 = "ClonedMaterial:" + t2.uuid + ":";
        i2 && (e3 += "derivative-tangents:"), r2 && (e3 += "vertex-colors:"), s2 && (e3 += "flat-shading:");
        let a3 = this.cache.get(e3);
        a3 || (a3 = t2.clone(), r2 && (a3.vertexColors = true), s2 && (a3.flatShading = true), i2 && (a3.normalScale && (a3.normalScale.y *= -1), a3.clearcoatNormalScale && (a3.clearcoatNormalScale.y *= -1)), this.cache.add(e3, a3), this.associations.set(a3, this.associations.get(t2))), t2 = a3;
      }
      e2.material = t2;
    }
    getMaterialType() {
      return n.MeshStandardMaterial;
    }
    loadMaterial(e2) {
      let a2, t2 = this, i2 = this.json, r2 = this.extensions, s2 = i2.materials[e2], o2 = {}, c2 = s2.extensions || {}, l2 = [];
      if (c2[d.KHR_MATERIALS_UNLIT]) {
        let e3 = r2[d.KHR_MATERIALS_UNLIT];
        a2 = e3.getMaterialType(), l2.push(e3.extendParams(o2, s2, t2));
      } else {
        let i3 = s2.pbrMetallicRoughness || {};
        if (o2.color = new n.Color(1, 1, 1), o2.opacity = 1, Array.isArray(i3.baseColorFactor)) {
          let e3 = i3.baseColorFactor;
          o2.color.setRGB(e3[0], e3[1], e3[2], n.LinearSRGBColorSpace), o2.opacity = e3[3];
        }
        void 0 !== i3.baseColorTexture && l2.push(t2.assignTexture(o2, "map", i3.baseColorTexture, n.SRGBColorSpace)), o2.metalness = void 0 !== i3.metallicFactor ? i3.metallicFactor : 1, o2.roughness = void 0 !== i3.roughnessFactor ? i3.roughnessFactor : 1, void 0 !== i3.metallicRoughnessTexture && (l2.push(t2.assignTexture(o2, "metalnessMap", i3.metallicRoughnessTexture)), l2.push(t2.assignTexture(o2, "roughnessMap", i3.metallicRoughnessTexture))), a2 = this._invokeOne(function(a3) {
          return a3.getMaterialType && a3.getMaterialType(e2);
        }), l2.push(Promise.all(this._invokeAll(function(a3) {
          return a3.extendMaterialParams && a3.extendMaterialParams(e2, o2);
        })));
      }
      true === s2.doubleSided && (o2.side = n.DoubleSide);
      let b2 = s2.alphaMode || "OPAQUE";
      if ("BLEND" === b2 ? (o2.transparent = true, o2.depthWrite = false) : (o2.transparent = false, "MASK" === b2 && (o2.alphaTest = void 0 !== s2.alphaCutoff ? s2.alphaCutoff : 0.5)), void 0 !== s2.normalTexture && a2 !== n.MeshBasicMaterial && (l2.push(t2.assignTexture(o2, "normalMap", s2.normalTexture)), o2.normalScale = new n.Vector2(1, 1), void 0 !== s2.normalTexture.scale)) {
        let e3 = s2.normalTexture.scale;
        o2.normalScale.set(e3, e3);
      }
      if (void 0 !== s2.occlusionTexture && a2 !== n.MeshBasicMaterial && (l2.push(t2.assignTexture(o2, "aoMap", s2.occlusionTexture)), void 0 !== s2.occlusionTexture.strength && (o2.aoMapIntensity = s2.occlusionTexture.strength)), void 0 !== s2.emissiveFactor && a2 !== n.MeshBasicMaterial) {
        let e3 = s2.emissiveFactor;
        o2.emissive = new n.Color().setRGB(e3[0], e3[1], e3[2], n.LinearSRGBColorSpace);
      }
      return void 0 !== s2.emissiveTexture && a2 !== n.MeshBasicMaterial && l2.push(t2.assignTexture(o2, "emissiveMap", s2.emissiveTexture, n.SRGBColorSpace)), Promise.all(l2).then(function() {
        let i3 = new a2(o2);
        return s2.name && (i3.name = s2.name), Q(i3, s2), t2.associations.set(i3, { materials: e2 }), s2.extensions && W(r2, i3, s2), i3;
      });
    }
    createUniqueName(e2) {
      let a2 = n.PropertyBinding.sanitizeNodeName(e2 || "");
      return a2 in this.nodeNamesUsed ? a2 + "_" + ++this.nodeNamesUsed[a2] : (this.nodeNamesUsed[a2] = 0, a2);
    }
    loadGeometries(e2) {
      let a2 = this, t2 = this.extensions, i2 = this.primitiveCache, r2 = [];
      for (let s2 = 0, o2 = e2.length; s2 < o2; s2++) {
        let o3 = e2[s2], c2 = (function(e3) {
          let a3, t3 = e3.extensions && e3.extensions[d.KHR_DRACO_MESH_COMPRESSION];
          if (a3 = t3 ? "draco:" + t3.bufferView + ":" + t3.indices + ":" + V(t3.attributes) : e3.indices + ":" + V(e3.attributes) + ":" + e3.mode, void 0 !== e3.targets) for (let t4 = 0, i3 = e3.targets.length; t4 < i3; t4++) a3 += ":" + V(e3.targets[t4]);
          return a3;
        })(o3), l2 = i2[c2];
        if (l2) r2.push(l2.promise);
        else {
          let e3;
          e3 = o3.extensions && o3.extensions[d.KHR_DRACO_MESH_COMPRESSION] ? (function(e4) {
            return t2[d.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e4, a2).then(function(t3) {
              return Z(t3, e4, a2);
            });
          })(o3) : Z(new n.BufferGeometry(), o3, a2), i2[c2] = { primitive: o3, promise: e3 }, r2.push(e3);
        }
      }
      return Promise.all(r2);
    }
    loadMesh(e2) {
      let a2 = this, t2 = this.json, i2 = this.extensions, r2 = t2.meshes[e2], s2 = r2.primitives, o2 = [];
      for (let e3 = 0, a3 = s2.length; e3 < a3; e3++) {
        var l2;
        let a4 = void 0 === s2[e3].material ? (void 0 === (l2 = this.cache).DefaultMaterial && (l2.DefaultMaterial = new n.MeshStandardMaterial({ color: 16777215, emissive: 0, metalness: 1, roughness: 1, transparent: false, depthTest: true, side: n.FrontSide })), l2.DefaultMaterial) : this.getDependency("material", s2[e3].material);
        o2.push(a4);
      }
      return o2.push(a2.loadGeometries(s2)), Promise.all(o2).then(function(t3) {
        let o3 = t3.slice(0, t3.length - 1), l3 = t3[t3.length - 1], b2 = [];
        for (let t4 = 0, d3 = l3.length; t4 < d3; t4++) {
          let d4, h2 = l3[t4], p2 = s2[t4], u2 = o3[t4];
          if (p2.mode === P.TRIANGLES || p2.mode === P.TRIANGLE_STRIP || p2.mode === P.TRIANGLE_FAN || void 0 === p2.mode) true === (d4 = true === r2.isSkinnedMesh ? new n.SkinnedMesh(h2, u2) : new n.Mesh(h2, u2)).isSkinnedMesh && d4.normalizeSkinWeights(), p2.mode === P.TRIANGLE_STRIP ? d4.geometry = c(d4.geometry, n.TriangleStripDrawMode) : p2.mode === P.TRIANGLE_FAN && (d4.geometry = c(d4.geometry, n.TriangleFanDrawMode));
          else if (p2.mode === P.LINES) d4 = new n.LineSegments(h2, u2);
          else if (p2.mode === P.LINE_STRIP) d4 = new n.Line(h2, u2);
          else if (p2.mode === P.LINE_LOOP) d4 = new n.LineLoop(h2, u2);
          else if (p2.mode === P.POINTS) d4 = new n.Points(h2, u2);
          else throw Error("THREE.GLTFLoader: Primitive mode unsupported: " + p2.mode);
          Object.keys(d4.geometry.morphAttributes).length > 0 && (function(e3, a3) {
            if (e3.updateMorphTargets(), void 0 !== a3.weights) for (let t5 = 0, i3 = a3.weights.length; t5 < i3; t5++) e3.morphTargetInfluences[t5] = a3.weights[t5];
            if (a3.extras && Array.isArray(a3.extras.targetNames)) {
              let t5 = a3.extras.targetNames;
              if (e3.morphTargetInfluences.length === t5.length) {
                e3.morphTargetDictionary = {};
                for (let a4 = 0, i3 = t5.length; a4 < i3; a4++) e3.morphTargetDictionary[t5[a4]] = a4;
              } else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
            }
          })(d4, r2), d4.name = a2.createUniqueName(r2.name || "mesh_" + e2), Q(d4, r2), p2.extensions && W(i2, d4, p2), a2.assignFinalMaterial(d4), b2.push(d4);
        }
        for (let t4 = 0, i3 = b2.length; t4 < i3; t4++) a2.associations.set(b2[t4], { meshes: e2, primitives: t4 });
        if (1 === b2.length) return r2.extensions && W(i2, b2[0], r2), b2[0];
        let d2 = new n.Group();
        r2.extensions && W(i2, d2, r2), a2.associations.set(d2, { meshes: e2 });
        for (let e3 = 0, a3 = b2.length; e3 < a3; e3++) d2.add(b2[e3]);
        return d2;
      });
    }
    loadCamera(e2) {
      let a2, t2 = this.json.cameras[e2], i2 = t2[t2.type];
      return i2 ? ("perspective" === t2.type ? a2 = new n.PerspectiveCamera(n.MathUtils.radToDeg(i2.yfov), i2.aspectRatio || 1, i2.znear || 1, i2.zfar || 2e6) : "orthographic" === t2.type && (a2 = new n.OrthographicCamera(-i2.xmag, i2.xmag, i2.ymag, -i2.ymag, i2.znear, i2.zfar)), t2.name && (a2.name = this.createUniqueName(t2.name)), Q(a2, t2), Promise.resolve(a2)) : void console.warn("THREE.GLTFLoader: Missing camera parameters.");
    }
    loadSkin(e2) {
      let a2 = this.json.skins[e2], t2 = [];
      for (let e3 = 0, i2 = a2.joints.length; e3 < i2; e3++) t2.push(this._loadNodeShallow(a2.joints[e3]));
      return void 0 !== a2.inverseBindMatrices ? t2.push(this.getDependency("accessor", a2.inverseBindMatrices)) : t2.push(null), Promise.all(t2).then(function(e3) {
        let t3 = e3.pop(), i2 = [], r2 = [];
        for (let s2 = 0, o2 = e3.length; s2 < o2; s2++) {
          let o3 = e3[s2];
          if (o3) {
            i2.push(o3);
            let e4 = new n.Matrix4();
            null !== t3 && e4.fromArray(t3.array, 16 * s2), r2.push(e4);
          } else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', a2.joints[s2]);
        }
        return new n.Skeleton(i2, r2);
      });
    }
    loadAnimation(e2) {
      let a2 = this.json, t2 = this, i2 = a2.animations[e2], r2 = i2.name ? i2.name : "animation_" + e2, s2 = [], o2 = [], c2 = [], l2 = [], b2 = [];
      for (let e3 = 0, a3 = i2.channels.length; e3 < a3; e3++) {
        let a4 = i2.channels[e3], t3 = i2.samplers[a4.sampler], r3 = a4.target, n2 = r3.node, d2 = void 0 !== i2.parameters ? i2.parameters[t3.input] : t3.input, h2 = void 0 !== i2.parameters ? i2.parameters[t3.output] : t3.output;
        void 0 !== r3.node && (s2.push(this.getDependency("node", n2)), o2.push(this.getDependency("accessor", d2)), c2.push(this.getDependency("accessor", h2)), l2.push(t3), b2.push(r3));
      }
      return Promise.all([Promise.all(s2), Promise.all(o2), Promise.all(c2), Promise.all(l2), Promise.all(b2)]).then(function(e3) {
        let a3 = e3[0], s3 = e3[1], o3 = e3[2], c3 = e3[3], l3 = e3[4], b3 = [];
        for (let e4 = 0, i3 = a3.length; e4 < i3; e4++) {
          let i4 = a3[e4], r3 = s3[e4], n2 = o3[e4], d3 = c3[e4], h2 = l3[e4];
          if (void 0 === i4) continue;
          i4.updateMatrix && i4.updateMatrix();
          let p2 = t2._createAnimationTracks(i4, r3, n2, d3, h2);
          if (p2) for (let e5 = 0; e5 < p2.length; e5++) b3.push(p2[e5]);
        }
        let d2 = new n.AnimationClip(r2, void 0, b3);
        return Q(d2, i2), d2;
      });
    }
    createNodeMesh(e2) {
      let a2 = this.json, t2 = this, i2 = a2.nodes[e2];
      return void 0 === i2.mesh ? null : t2.getDependency("mesh", i2.mesh).then(function(e3) {
        let a3 = t2._getNodeRef(t2.meshCache, i2.mesh, e3);
        return void 0 !== i2.weights && a3.traverse(function(e4) {
          if (e4.isMesh) for (let a4 = 0, t3 = i2.weights.length; a4 < t3; a4++) e4.morphTargetInfluences[a4] = i2.weights[a4];
        }), a3;
      });
    }
    loadNode(e2) {
      let a2 = this.json.nodes[e2], t2 = this._loadNodeShallow(e2), i2 = [], r2 = a2.children || [];
      for (let e3 = 0, a3 = r2.length; e3 < a3; e3++) i2.push(this.getDependency("node", r2[e3]));
      let s2 = void 0 === a2.skin ? Promise.resolve(null) : this.getDependency("skin", a2.skin);
      return Promise.all([t2, Promise.all(i2), s2]).then(function(e3) {
        let a3 = e3[0], t3 = e3[1], i3 = e3[2];
        null !== i3 && a3.traverse(function(e4) {
          e4.isSkinnedMesh && e4.bind(i3, J);
        });
        for (let e4 = 0, i4 = t3.length; e4 < i4; e4++) a3.add(t3[e4]);
        return a3;
      });
    }
    _loadNodeShallow(e2) {
      let a2 = this.json, t2 = this.extensions, i2 = this;
      if (void 0 !== this.nodeCache[e2]) return this.nodeCache[e2];
      let r2 = a2.nodes[e2], s2 = r2.name ? i2.createUniqueName(r2.name) : "", o2 = [], c2 = i2._invokeOne(function(a3) {
        return a3.createNodeMesh && a3.createNodeMesh(e2);
      });
      return c2 && o2.push(c2), void 0 !== r2.camera && o2.push(i2.getDependency("camera", r2.camera).then(function(e3) {
        return i2._getNodeRef(i2.cameraCache, r2.camera, e3);
      })), i2._invokeAll(function(a3) {
        return a3.createNodeAttachment && a3.createNodeAttachment(e2);
      }).forEach(function(e3) {
        o2.push(e3);
      }), this.nodeCache[e2] = Promise.all(o2).then(function(a3) {
        let o3;
        if ((o3 = true === r2.isBone ? new n.Bone() : a3.length > 1 ? new n.Group() : 1 === a3.length ? a3[0] : new n.Object3D()) !== a3[0]) for (let e3 = 0, t3 = a3.length; e3 < t3; e3++) o3.add(a3[e3]);
        if (r2.name && (o3.userData.name = r2.name, o3.name = s2), Q(o3, r2), r2.extensions && W(t2, o3, r2), void 0 !== r2.matrix) {
          let e3 = new n.Matrix4();
          e3.fromArray(r2.matrix), o3.applyMatrix4(e3);
        } else void 0 !== r2.translation && o3.position.fromArray(r2.translation), void 0 !== r2.rotation && o3.quaternion.fromArray(r2.rotation), void 0 !== r2.scale && o3.scale.fromArray(r2.scale);
        if (i2.associations.has(o3)) {
          if (void 0 !== r2.mesh && i2.meshCache.refs[r2.mesh] > 1) {
            let e3 = i2.associations.get(o3);
            i2.associations.set(o3, { ...e3 });
          }
        } else i2.associations.set(o3, {});
        return i2.associations.get(o3).nodes = e2, o3;
      }), this.nodeCache[e2];
    }
    loadScene(e2) {
      let a2 = this.extensions, t2 = this.json.scenes[e2], i2 = this, r2 = new n.Group();
      t2.name && (r2.name = i2.createUniqueName(t2.name)), Q(r2, t2), t2.extensions && W(a2, r2, t2);
      let s2 = t2.nodes || [], o2 = [];
      for (let e3 = 0, a3 = s2.length; e3 < a3; e3++) o2.push(i2.getDependency("node", s2[e3]));
      return Promise.all(o2).then(function(e3) {
        for (let a3 = 0, t3 = e3.length; a3 < t3; a3++) r2.add(e3[a3]);
        return i2.associations = ((e4) => {
          let a3 = /* @__PURE__ */ new Map();
          for (let [e5, t3] of i2.associations) (e5 instanceof n.Material || e5 instanceof n.Texture) && a3.set(e5, t3);
          return e4.traverse((e5) => {
            let t3 = i2.associations.get(e5);
            null != t3 && a3.set(e5, t3);
          }), a3;
        })(r2), r2;
      });
    }
    _createAnimationTracks(e2, a2, t2, i2, r2) {
      let s2, o2 = [], c2 = e2.name ? e2.name : e2.uuid, l2 = [];
      switch (z[r2.path] === z.weights ? e2.traverse(function(e3) {
        e3.morphTargetInfluences && l2.push(e3.name ? e3.name : e3.uuid);
      }) : l2.push(c2), z[r2.path]) {
        case z.weights:
          s2 = n.NumberKeyframeTrack;
          break;
        case z.rotation:
          s2 = n.QuaternionKeyframeTrack;
          break;
        case z.translation:
        case z.scale:
          s2 = n.VectorKeyframeTrack;
          break;
        default:
          s2 = 1 === t2.itemSize ? n.NumberKeyframeTrack : n.VectorKeyframeTrack;
      }
      let b2 = void 0 !== i2.interpolation ? U[i2.interpolation] : n.InterpolateLinear, d2 = this._getArrayFromAccessor(t2);
      for (let e3 = 0, t3 = l2.length; e3 < t3; e3++) {
        let t4 = new s2(l2[e3] + "." + z[r2.path], a2.array, d2, b2);
        "CUBICSPLINE" === i2.interpolation && this._createCubicSplineTrackInterpolant(t4), o2.push(t4);
      }
      return o2;
    }
    _getArrayFromAccessor(e2) {
      let a2 = e2.array;
      if (e2.normalized) {
        let e3 = X(a2.constructor), t2 = new Float32Array(a2.length);
        for (let i2 = 0, r2 = a2.length; i2 < r2; i2++) t2[i2] = a2[i2] * e3;
        a2 = t2;
      }
      return a2;
    }
    _createCubicSplineTrackInterpolant(e2) {
      e2.createInterpolant = function(e3) {
        return new (this instanceof n.QuaternionKeyframeTrack ? N : L)(this.times, this.values, this.getValueSize() / 3, e3);
      }, e2.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;
    }
  }
  function Z(e2, a2, t2) {
    let i2 = a2.attributes, r2 = [];
    for (let a3 in i2) {
      let s2 = K[a3] || a3.toLowerCase();
      s2 in e2.attributes || r2.push((function(a4, i3) {
        return t2.getDependency("accessor", a4).then(function(a5) {
          e2.setAttribute(i3, a5);
        });
      })(i2[a3], s2));
    }
    if (void 0 !== a2.indices && !e2.index) {
      let i3 = t2.getDependency("accessor", a2.indices).then(function(a3) {
        e2.setIndex(a3);
      });
      r2.push(i3);
    }
    return n.ColorManagement.workingColorSpace !== n.LinearSRGBColorSpace && "COLOR_0" in i2 && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${n.ColorManagement.workingColorSpace}" not supported.`), Q(e2, a2), !(function(e3, a3, t3) {
      let i3 = a3.attributes, r3 = new n.Box3();
      if (void 0 === i3.POSITION) return;
      {
        let e4 = t3.json.accessors[i3.POSITION], a4 = e4.min, s3 = e4.max;
        if (void 0 === a4 || void 0 === s3) return console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
        if (r3.set(new n.Vector3(a4[0], a4[1], a4[2]), new n.Vector3(s3[0], s3[1], s3[2])), e4.normalized) {
          let a5 = X(q[e4.componentType]);
          r3.min.multiplyScalar(a5), r3.max.multiplyScalar(a5);
        }
      }
      let s2 = a3.targets;
      if (void 0 !== s2) {
        let e4 = new n.Vector3(), a4 = new n.Vector3();
        for (let i4 = 0, r4 = s2.length; i4 < r4; i4++) {
          let r5 = s2[i4];
          if (void 0 !== r5.POSITION) {
            let i5 = t3.json.accessors[r5.POSITION], s3 = i5.min, n2 = i5.max;
            if (void 0 !== s3 && void 0 !== n2) {
              if (a4.setX(Math.max(Math.abs(s3[0]), Math.abs(n2[0]))), a4.setY(Math.max(Math.abs(s3[1]), Math.abs(n2[1]))), a4.setZ(Math.max(Math.abs(s3[2]), Math.abs(n2[2]))), i5.normalized) {
                let e5 = X(q[i5.componentType]);
                a4.multiplyScalar(e5);
              }
              e4.max(a4);
            } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
          }
        }
        r3.expandByVector(e4);
      }
      e3.boundingBox = r3;
      let o2 = new n.Sphere();
      r3.getCenter(o2.center), o2.radius = r3.min.distanceTo(r3.max) / 2, e3.boundingSphere = o2;
    })(e2, a2, t2), Promise.all(r2).then(function() {
      return void 0 !== a2.targets ? (function(e3, a3, t3) {
        let i3 = false, r3 = false, s2 = false;
        for (let e4 = 0, t4 = a3.length; e4 < t4; e4++) {
          let t5 = a3[e4];
          if (void 0 !== t5.POSITION && (i3 = true), void 0 !== t5.NORMAL && (r3 = true), void 0 !== t5.COLOR_0 && (s2 = true), i3 && r3 && s2) break;
        }
        if (!i3 && !r3 && !s2) return Promise.resolve(e3);
        let n2 = [], o2 = [], c2 = [];
        for (let l2 = 0, b2 = a3.length; l2 < b2; l2++) {
          let b3 = a3[l2];
          if (i3) {
            let a4 = void 0 !== b3.POSITION ? t3.getDependency("accessor", b3.POSITION) : e3.attributes.position;
            n2.push(a4);
          }
          if (r3) {
            let a4 = void 0 !== b3.NORMAL ? t3.getDependency("accessor", b3.NORMAL) : e3.attributes.normal;
            o2.push(a4);
          }
          if (s2) {
            let a4 = void 0 !== b3.COLOR_0 ? t3.getDependency("accessor", b3.COLOR_0) : e3.attributes.color;
            c2.push(a4);
          }
        }
        return Promise.all([Promise.all(n2), Promise.all(o2), Promise.all(c2)]).then(function(a4) {
          let t4 = a4[0], n3 = a4[1], o3 = a4[2];
          return i3 && (e3.morphAttributes.position = t4), r3 && (e3.morphAttributes.normal = n3), s2 && (e3.morphAttributes.color = o3), e3.morphTargetsRelative = true, e3;
        });
      })(e2, a2.targets, t2) : e2;
    });
  }
  var $ = (function() {
    var e2, a2 = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0, 0, 5, 3, 1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11]), t2 = new Uint8Array([32, 0, 65, 2, 1, 106, 34, 33, 3, 128, 11, 4, 13, 64, 6, 253, 10, 7, 15, 116, 127, 5, 8, 12, 40, 16, 19, 54, 20, 9, 27, 255, 113, 17, 42, 67, 24, 23, 146, 148, 18, 14, 22, 45, 70, 69, 56, 114, 101, 21, 25, 63, 75, 136, 108, 28, 118, 29, 73, 115]);
    if ("object" != typeof WebAssembly) return { supported: false };
    var i2 = WebAssembly.validate(a2) ? s2("b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q:6dkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq:p9sqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:N8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhlaicefhodnaeTmbadTmbalc;WFbGglcjdalcjd6EhwcbhDinawaeaD9RaDawfae6Egqcsfglc9WGgkci2hxakcethmalcl4cifcd4hPabaDad2fhsakc;ab6hzcbhHincbhOaohAdndninaraA9RaP6meavcj;cbfaOak2fhCaAaPfhocbhidnazmbarao9Rc;Gb6mbcbhlinaCalfhidndndndndnaAalco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklbaoczfhokdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklzaoczfhokdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklaaoczfhokdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaoclfaYpQbfaXc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaocwfaYpQbfaXc:q:yjjbfRbbfhoxekaiaopbbbpkl8Waoczfhokalc;abfhialcjefak0meaihlarao9Rc;Fb0mbkkdnaiak9pmbaici4hlinarao9RcK6miaCaifhXdndndndndnaAaico4fRbbalcoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpkbbxikaXaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaXaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaXaopbbbpkbbaoczfhokalcdfhlaiczfgiak6mbkkaoTmeaohAaOcefgOclSmdxbkkc9:hoxlkdnakTmbavcjdfaHfhiavaHfpbdbhYcbhXinaiavcj;cbfaXfglpblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLalakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEalamfpblbg3cep9Ta3aQp9op9Hp9rg3alaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfhiaXczfgXak6mbkkaHclfgHad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfgDae6mbkkcbc99arao9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk::seHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:wPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiaeciGgvcitgdfcbcaad9R;8kbaiabalcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaialciGgecdtgdVcbc;abad9R;8kbaiabavcdtfgvad;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkavaiad;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb") : s2("b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q:Odkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq;w8Wqdbk;esezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9Uc;WFbGgocjdaocjd6EhDaicefhocbhqdnindndndnaeaq9nmbaDaeaq9RaqaDfae6Egkcsfglcl4cifcd4hxalc9WGgmTmecbhPawcjdfhsaohzinaraz9Rax6mvarazaxfgo9RcK6mvczhlcbhHinalgic9WfgOawcj;cbffhldndndndndnazaOco4fRbbaHcoG4ciGPlbedibkal9cb83ibalcwf9cb83ibxikalaoRblaoRbbgOco4gAaAciSgAE86bbawcj;cbfaifglcGfaoclfaAfgARbbaOcl4ciGgCaCciSgCE86bbalcVfaAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc7faAaCfgARbbaOciGgOaOciSgOE86bbalctfaAaOfgARbbaoRbegOco4gCaCciSgCE86bbalc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc93faAaCfgARbbaOciGgOaOciSgOE86bbalc94faAaOfgARbbaoRbdgOco4gCaCciSgCE86bbalc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc97faAaCfgARbbaOciGgOaOciSgOE86bbalc98faAaOfgORbbaoRbigoco4gAaAciSgAE86bbalc99faOaAfgORbbaocl4ciGgAaAciSgAE86bbalc9:faOaAfgORbbaocd4ciGgAaAciSgAE86bbalcufaOaAfglRbbaociGgoaociSgoE86bbalaofhoxdkalaoRbwaoRbbgOcl4gAaAcsSgAE86bbawcj;cbfaifglcGfaocwfaAfgARbbaOcsGgOaOcsSgOE86bbalcVfaAaOfgORbbaoRbegAcl4gCaCcsSgCE86bbalc7faOaCfgORbbaAcsGgAaAcsSgAE86bbalctfaOaAfgORbbaoRbdgAcl4gCaCcsSgCE86bbalc91faOaCfgORbbaAcsGgAaAcsSgAE86bbalc4faOaAfgORbbaoRbigAcl4gCaCcsSgCE86bbalc93faOaCfgORbbaAcsGgAaAcsSgAE86bbalc94faOaAfgORbbaoRblgAcl4gCaCcsSgCE86bbalc95faOaCfgORbbaAcsGgAaAcsSgAE86bbalc96faOaAfgORbbaoRbvgAcl4gCaCcsSgCE86bbalc97faOaCfgORbbaAcsGgAaAcsSgAE86bbalc98faOaAfgORbbaoRbogAcl4gCaCcsSgCE86bbalc99faOaCfgORbbaAcsGgAaAcsSgAE86bbalc9:faOaAfgORbbaoRbrgocl4gAaAcsSgAE86bbalcufaOaAfglRbbaocsGgoaocsSgoE86bbalaofhoxekalao8Pbb83bbalcwfaocwf8Pbb83bbaoczfhokdnaiam9pmbaHcdfhHaiczfhlarao9RcL0mekkaiam6mvaoTmvdnakTmbawaPfRbbhHawcj;cbfhlashiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkkascefhsaohzaPcefgPad9hmbxikkcbc99arao9Radcaadca0ESEhoxlkaoaxad2fhCdnakmbadhlinaoTmlarao9Rax6mlaoaxfhoalcufglmbkaChoxekcbhmawcjdfhAinarao9Rax6miawamfRbbhHawcj;cbfhlaAhiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkaAcefhAaoaxfhoamcefgmad9hmbkaChokabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqaombkc9:hoxekc9:hokavcj;ebf8Kjjjjbaok;cseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklzNbb"), r2 = WebAssembly.instantiate(i2, {}).then(function(a3) {
      (e2 = a3.instance).exports.__wasm_call_ctors();
    });
    function s2(e3) {
      for (var a3 = new Uint8Array(e3.length), i3 = 0; i3 < e3.length; ++i3) {
        var r3 = e3.charCodeAt(i3);
        a3[i3] = r3 > 96 ? r3 - 97 : r3 > 64 ? r3 - 39 : r3 + 4;
      }
      for (var s3 = 0, i3 = 0; i3 < e3.length; ++i3) a3[s3++] = a3[i3] < 60 ? t2[a3[i3]] : (a3[i3] - 60) * 64 + a3[++i3];
      return a3.buffer.slice(0, s3);
    }
    function n2(e3, a3, t3, i3, r3, s3, n3) {
      var o3 = e3.exports.sbrk, c3 = i3 + 3 & -4, l3 = o3(c3 * r3), b3 = o3(s3.length), d3 = new Uint8Array(e3.exports.memory.buffer);
      d3.set(s3, b3);
      var h2 = a3(l3, i3, r3, b3, s3.length);
      if (0 == h2 && n3 && n3(l3, c3, r3), t3.set(d3.subarray(l3, l3 + i3 * r3)), o3(l3 - o3(0)), 0 != h2) throw Error("Malformed buffer data: " + h2);
    }
    var o2 = { NONE: "", OCTAHEDRAL: "meshopt_decodeFilterOct", QUATERNION: "meshopt_decodeFilterQuat", EXPONENTIAL: "meshopt_decodeFilterExp" }, c2 = { ATTRIBUTES: "meshopt_decodeVertexBuffer", TRIANGLES: "meshopt_decodeIndexBuffer", INDICES: "meshopt_decodeIndexSequence" }, l2 = [], b2 = 0;
    function d2(e3) {
      var a3 = e3.data;
      if (!a3.id) return self.close();
      self.ready.then(function(e4) {
        try {
          var t3 = new Uint8Array(a3.count * a3.size);
          n2(e4, e4.exports[a3.mode], t3, a3.count, a3.size, a3.source, e4.exports[a3.filter]), self.postMessage({ id: a3.id, count: a3.count, action: "resolve", value: t3 }, [t3.buffer]);
        } catch (e5) {
          self.postMessage({ id: a3.id, count: a3.count, action: "reject", value: e5 });
        }
      });
    }
    return { ready: r2, supported: true, useWorkers: function(e3) {
      for (var a3 = new Blob(["self.ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(i2) + "]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = " + d2.name + ";" + n2.toString() + d2.toString()], { type: "text/javascript" }), t3 = URL.createObjectURL(a3), r3 = l2.length; r3 < e3; ++r3) l2[r3] = (function(e4) {
        var a4 = { object: new Worker(e4), pending: 0, requests: {} };
        return a4.object.onmessage = function(e5) {
          var t4 = e5.data;
          a4.pending -= t4.count, a4.requests[t4.id][t4.action](t4.value), delete a4.requests[t4.id];
        }, a4;
      })(t3);
      for (var r3 = e3; r3 < l2.length; ++r3) l2[r3].object.postMessage({});
      l2.length = e3, URL.revokeObjectURL(t3);
    }, decodeVertexBuffer: function(a3, t3, i3, r3, s3) {
      n2(e2, e2.exports.meshopt_decodeVertexBuffer, a3, t3, i3, r3, e2.exports[o2[s3]]);
    }, decodeIndexBuffer: function(a3, t3, i3, r3) {
      n2(e2, e2.exports.meshopt_decodeIndexBuffer, a3, t3, i3, r3);
    }, decodeIndexSequence: function(a3, t3, i3, r3) {
      n2(e2, e2.exports.meshopt_decodeIndexSequence, a3, t3, i3, r3);
    }, decodeGltfBuffer: function(a3, t3, i3, r3, s3, l3) {
      n2(e2, e2.exports[c2[s3]], a3, t3, i3, r3, e2.exports[o2[l3]]);
    }, decodeGltfBufferAsync: function(a3, t3, i3, s3, d3) {
      return l2.length > 0 ? (function(e3, a4, t4, i4, r3) {
        for (var s4 = l2[0], n3 = 1; n3 < l2.length; ++n3) l2[n3].pending < s4.pending && (s4 = l2[n3]);
        return new Promise(function(n4, o3) {
          var c3 = new Uint8Array(t4), l3 = ++b2;
          s4.pending += e3, s4.requests[l3] = { resolve: n4, reject: o3 }, s4.object.postMessage({ id: l3, count: e3, size: a4, source: c3, mode: i4, filter: r3 }, [c3.buffer]);
        });
      })(a3, t3, i3, c2[s3], o2[d3]) : r2.then(function() {
        var r3 = new Uint8Array(a3 * t3);
        return n2(e2, e2.exports[c2[s3]], r3, a3, t3, i3, e2.exports[o2[d3]]), r3;
      });
    } };
  })(), ee = r;
  class ea extends ee.Scene {
    constructor() {
      super();
      const e2 = new ee.BoxGeometry();
      e2.deleteAttribute("uv");
      const a2 = new ee.MeshStandardMaterial({ side: ee.BackSide }), t2 = new ee.MeshStandardMaterial(), i2 = new ee.PointLight(16777215, 900, 28, 2);
      i2.position.set(0.418, 16.199, 0.3), this.add(i2);
      const r2 = new ee.Mesh(e2, a2);
      r2.position.set(-0.757, 13.219, 0.717), r2.scale.set(31.713, 28.305, 28.591), this.add(r2);
      const s2 = new ee.InstancedMesh(e2, t2, 6), n2 = new ee.Object3D();
      n2.position.set(-10.906, 2.009, 1.846), n2.rotation.set(0, -0.195, 0), n2.scale.set(2.328, 7.905, 4.651), n2.updateMatrix(), s2.setMatrixAt(0, n2.matrix), n2.position.set(-5.607, -0.754, -0.758), n2.rotation.set(0, 0.994, 0), n2.scale.set(1.97, 1.534, 3.955), n2.updateMatrix(), s2.setMatrixAt(1, n2.matrix), n2.position.set(6.167, 0.857, 7.803), n2.rotation.set(0, 0.561, 0), n2.scale.set(3.927, 6.285, 3.687), n2.updateMatrix(), s2.setMatrixAt(2, n2.matrix), n2.position.set(-2.017, 0.018, 6.124), n2.rotation.set(0, 0.333, 0), n2.scale.set(2.002, 4.566, 2.064), n2.updateMatrix(), s2.setMatrixAt(3, n2.matrix), n2.position.set(2.291, -0.756, -2.621), n2.rotation.set(0, -0.286, 0), n2.scale.set(1.546, 1.552, 1.496), n2.updateMatrix(), s2.setMatrixAt(4, n2.matrix), n2.position.set(-2.193, -0.369, -5.547), n2.rotation.set(0, 0.516, 0), n2.scale.set(3.875, 3.487, 2.986), n2.updateMatrix(), s2.setMatrixAt(5, n2.matrix), this.add(s2);
      const o2 = new ee.Mesh(e2, et(50));
      o2.position.set(-16.116, 14.37, 8.208), o2.scale.set(0.1, 2.428, 2.739), this.add(o2);
      const c2 = new ee.Mesh(e2, et(50));
      c2.position.set(-16.109, 18.021, -8.207), c2.scale.set(0.1, 2.425, 2.751), this.add(c2);
      const l2 = new ee.Mesh(e2, et(17));
      l2.position.set(14.904, 12.198, -1.832), l2.scale.set(0.15, 4.265, 6.331), this.add(l2);
      const b2 = new ee.Mesh(e2, et(43));
      b2.position.set(-0.462, 8.89, 14.52), b2.scale.set(4.38, 5.441, 0.088), this.add(b2);
      const d2 = new ee.Mesh(e2, et(20));
      d2.position.set(3.235, 11.486, -12.541), d2.scale.set(2.5, 2, 0.1), this.add(d2);
      const h2 = new ee.Mesh(e2, et(100));
      h2.position.set(0, 20, 0), h2.scale.set(1, 0.1, 1), this.add(h2);
    }
    dispose() {
      let e2 = /* @__PURE__ */ new Set();
      for (let a2 of (this.traverse((a3) => {
        a3.isMesh && (e2.add(a3.geometry), e2.add(a3.material));
      }), e2)) a2.dispose();
    }
  }
  function et(e2) {
    return new ee.MeshLambertMaterial({ color: 0, emissive: 16777215, emissiveIntensity: e2 });
  }
  var ei = e.i(65785), er = e.i(14589);
  let es = new r.Vector3(1.32, 0.5, 0.55), en = new r.Vector3(0.78, 1.05, 0.5), eo = new r.Euler(-0.5, 0.42, -0.36), ec = new r.Euler(-0.2, 0.2, -0.16), el = "#0b0b0c", eb = (e2, a2 = 0, t2 = 1) => Math.min(t2, Math.max(a2, e2)), ed = (e2, a2, t2) => eb((e2 - a2) / (t2 - a2)), eh = (e2) => 1 - (1 - e2) ** 3, ep = (e2) => e2 < 0.5 ? 4 * e2 ** 3 : 1 - (-2 * e2 + 2) ** 3 / 2, eu = (e2) => {
    let a2 = 43758.5453 * Math.sin(127.1 * e2);
    return a2 - Math.floor(a2);
  }, ef = (e2) => Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(e2);
  e.s(["FloatingPhones", 0, function({ reels: e2, madeHow: n2 }) {
    let c2, b2 = (0, i.useRef)(null), d2 = (0, i.useRef)(null), h2 = (0, i.useRef)(null), [p2, u2] = (0, i.useState)(0), [f2, m2] = (0, i.useState)(0), [g2, x2] = (0, i.useState)("loading"), [w2, v2] = (0, i.useState)(false), k2 = (0, i.useRef)(() => {
    }), T2 = (0, i.useRef)(() => {
    }), R2 = (0, i.useRef)(() => {
    }), A2 = e2.length;
    (0, i.useEffect)(() => {
      let a2 = b2.current, t2 = d2.current, i2 = h2.current, n3 = matchMedia("(prefers-reduced-motion: reduce)").matches, c3 = new s.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      c3.setPixelRatio(Math.min(1.5, devicePixelRatio || 1)), c3.toneMapping = r.ACESFilmicToneMapping, c3.toneMappingExposure = 1.1, a2.appendChild(c3.domElement);
      let p3 = new r.Scene(), f3 = new s.PMREMGenerator(c3), g3 = f3.fromScene(new ea(), 0.04).texture;
      p3.environment = g3;
      let w3 = new r.DirectionalLight("#fff4ea", 1.6);
      w3.position.set(-4, 6, 8), p3.add(w3);
      let j3 = new r.PerspectiveCamera(28, 1, 0.05, 100), M3 = new r.Group();
      p3.add(M3);
      let S3 = getComputedStyle(a2), E3 = { serif: S3.getPropertyValue("--font-serif").trim() || "Georgia, serif", mono: S3.getPropertyValue("--font-mono").trim() || "monospace" }, y3 = { duo: 0, pro: 0, covers: 0, title: 0 }, _3 = () => m2(eb(0.42 * y3.duo + 0.38 * y3.pro + y3.covers / A2 * 0.12 + 0.08 * y3.title)), F3 = new l().setMeshoptDecoder($), C2 = new r.TextureLoader(), H2 = false, O2 = document.createElement("canvas");
      O2.width = 690, O2.height = 1e3;
      let L2 = document.createElement("canvas");
      L2.width = 2002, L2.height = 1400;
      let G2 = new r.CanvasTexture(O2), N2 = new r.CanvasTexture(L2);
      for (let e10 of [G2, N2]) e10.flipY = false, e10.colorSpace = r.SRGBColorSpace, e10.anisotropy = 8;
      let P2 = new Image(), q2 = false;
      P2.onload = () => {
        H2 || (q2 = true, y3.title = 1, _3(), D2(), z2(0));
      }, P2.onerror = () => {
        y3.title = 1, _3();
      }, P2.src = "/lab/phones/title.webp";
      let B2 = (e10, a3, t3, i3 = 1, r2 = 0.5, s2 = 0.5) => {
        if (!q2) {
          e10.fillStyle = el, e10.fillRect(0, 0, a3, t3);
          return;
        }
        let n4 = Math.max(a3 / P2.width, t3 / P2.height) * i3, o2 = P2.width * n4, c4 = P2.height * n4;
        e10.drawImage(P2, (a3 - o2) * r2, (t3 - c4) * s2, o2, c4);
      }, I2 = (e10, a3, t3, i3) => {
        let r2 = e10.createLinearGradient(0, 0, 0, t3);
        i3.forEach(([e11, a4]) => r2.addColorStop(e11, `rgba(8,6,8,${a4})`)), e10.fillStyle = r2, e10.fillRect(0, 0, a3, t3);
      }, D2 = () => {
        let e10 = O2.getContext("2d"), a3 = O2.width, t3 = O2.height, i3 = /* @__PURE__ */ new Date();
        B2(e10, a3, t3, 1, 0.62, 0.5), I2(e10, a3, t3, [[0, 0.45], [0.45, 0.1], [1, 0.55]]), e10.fillStyle = "#f6f1ea", e10.textAlign = "center", e10.font = `400 26px ${E3.mono}`, e10.globalAlpha = 0.8, e10.fillText(i3.toLocaleDateString("en", { weekday: "long", day: "numeric", month: "long" }).toUpperCase(), a3 / 2, 150), e10.globalAlpha = 1, e10.font = `400 230px ${E3.serif}`, e10.fillText(i3.toLocaleTimeString("en", { hour: "numeric", minute: "2-digit", hour12: false }), a3 / 2, 370), e10.font = `italic 400 40px ${E3.serif}`, e10.globalAlpha = 0.85, e10.fillText("Floating Phones", a3 / 2, t3 - 120), e10.globalAlpha = 1, G2.needsUpdate = true;
      }, K2 = e2.reduce((e10, a3) => e10 + a3.stats.views, 0), z2 = (e10) => {
        let a3 = L2.getContext("2d"), t3 = L2.width, i3 = L2.height, r2 = t3 / 1430, s2 = eh(ed(e10, 0, 0.7));
        a3.fillStyle = el, a3.fillRect(0, 0, t3, i3), a3.globalAlpha = s2, B2(a3, t3, i3, 1.08 - 0.08 * s2), a3.globalAlpha = 1, I2(a3, t3, i3, [[0, 0.35], [0.5, 0.12], [0.78, 0.2], [1, 0.7]]), a3.fillStyle = "#f6f1ea", a3.textAlign = "center", a3.shadowColor = "rgba(0,0,0,.35)", a3.shadowBlur = 40 * r2;
        let n4 = (a4) => eh(ed(e10, a4, a4 + 0.4));
        a3.globalAlpha = 0.85 * n4(0.15), a3.font = `400 ${22 * r2}px ${E3.mono}`, a3.fillText("A V I   V A S H I S H T A   P R E S E N T S", t3 / 2, 285 * r2 + 10 * r2 * (1 - n4(0.15))), a3.globalAlpha = n4(0.3);
        let o2 = 455 * r2 + 18 * r2 * (1 - n4(0.3));
        a3.font = `400 ${168 * r2}px ${E3.serif}`;
        let c4 = "Floating ", l2 = a3.measureText(c4).width;
        a3.font = `italic 400 ${168 * r2}px ${E3.serif}`;
        let b3 = "Phones", d3 = a3.measureText(b3).width;
        a3.textAlign = "left", a3.font = `400 ${168 * r2}px ${E3.serif}`, a3.fillText(c4, t3 / 2 - (l2 + d3) / 2, o2), a3.font = `italic 400 ${168 * r2}px ${E3.serif}`, a3.fillText(b3, t3 / 2 - (l2 + d3) / 2 + l2, o2), a3.textAlign = "center", a3.globalAlpha = 0.9 * n4(0.45), a3.font = `italic 400 ${40 * r2}px ${E3.serif}`, a3.fillText(`${A2} Reels, 2026`, t3 / 2, 572 * r2 + 10 * r2 * (1 - n4(0.45))), a3.shadowBlur = 0, a3.globalAlpha = 0.7 * n4(0.6), a3.font = `400 ${15 * r2}px ${E3.mono}`, a3.fillText(`A FILM BY AVI VASHISHTA    ${A2} REELS    ${ef(K2).toUpperCase()} VIEWS    MADE WITH CLAUDE AND CODEX`, t3 / 2, i3 - 110 * r2), a3.globalAlpha = 0.5 * n4(0.7), a3.font = `400 ${13 * r2}px ${E3.mono}`, a3.fillText("NOW SHOWING ON INSTAGRAM", t3 / 2, i3 - 82 * r2), a3.globalAlpha = 1, N2.needsUpdate = true;
      };
      document.fonts?.ready.then(() => {
        H2 || (D2(), z2(0));
      }), D2(), z2(0);
      let U2 = new r.Group(), W2 = new r.Group(), Q2 = new r.Group();
      U2.add(W2), W2.add(Q2), U2.visible = false, p3.add(U2);
      let V2 = null, X2 = null, J2 = null, Y2 = { closed: new r.Vector3(), open: new r.Vector3() }, Z2 = 1, ee2 = 0, et2 = -1, ei2 = (e10) => {
        V2 && X2 && e10 !== et2 && (et2 = e10, V2.time = 2 * e10, X2.update(0));
      };
      F3.load("/lab/phones/duo.glb", (e10) => {
        if (H2) return;
        (J2 = e10.scene).traverse((e11) => {
          if (!e11.isMesh) return;
          let a4 = e11.material.name;
          "C_SW_Screen_Outer" === a4 && (e11.material = new r.MeshBasicMaterial({ map: G2, toneMapped: false })), "C_StarWhite_Screen_Inner" === a4 && (e11.material = new r.MeshBasicMaterial({ map: N2, toneMapped: false })), e11.frustumCulled = false;
        }), (V2 = (X2 = new r.AnimationMixer(J2)).clipAction(e10.animations[0])).play(), V2.paused = true;
        let a3 = new r.Box3();
        ei2(0), J2.updateMatrixWorld(true), a3.setFromObject(J2, true), a3.getCenter(Y2.open), ei2(1), J2.updateMatrixWorld(true), a3.setFromObject(J2, true), a3.getCenter(Y2.closed), Z2 = a3.max.y - a3.min.y, Q2.add(J2), U2.visible = true, ee2 = performance.now(), y3.duo = 1, _3();
      }, (e10) => {
        e10.total && (y3.duo = e10.loaded / e10.total, _3());
      });
      let er2 = e2.map((e10, a3) => ({ seed: 0.618 * a3 % 1, flip: 0 })), em = { w: 0.5, h: 1.025 }, eg = 0.46, ex = false, ew = new r.MeshStandardMaterial({ color: "#000000", roughness: 0.12, metalness: 0, transparent: true, opacity: 0.22, blending: r.AdditiveBlending, depthWrite: false, envMapIntensity: 0.8 }), ev = new r.MeshBasicMaterial(), ek = null, eT = (e10) => {
        e10.flipY = false, e10.colorSpace = r.SRGBColorSpace;
        let a3 = eg / (9 / 16);
        return e10.repeat.set(a3, 1), e10.offset.set((1 - a3) / 2, 0), e10;
      }, eR = (e10, a3) => {
        e10.screen && (e10.screen.map = a3, e10.screen.color.set("#ffffff"), e10.screen.needsUpdate = true);
      };
      F3.load("/lab/phones/pro-max.glb", (e10) => {
        if (H2) return;
        let a3 = (function(e11, a4) {
          e11.updateMatrixWorld(true);
          let t4 = new r.Group(), i4 = /* @__PURE__ */ new Map();
          for (let { material: s3, geometries: n5 } of (e11.traverse((e12) => {
            if (!e12.isMesh) return;
            let s4 = e12.material, n6 = e12.geometry.clone().applyMatrix4(e12.matrixWorld);
            if (s4.name === a4) {
              let e13 = new r.Mesh(n6, s4);
              e13.name = "screen", t4.add(e13);
              return;
            }
            let o2 = `${s4.uuid}|${Object.keys(n6.attributes).sort().join(",")}|${+!!n6.index}`, c5 = i4.get(o2) ?? { material: s4, geometries: [] };
            c5.geometries.push(n6), i4.set(o2, c5);
          }), i4.values())) {
            let e12 = n5.length > 1 ? (function(e13, a5 = false) {
              let t5 = null !== e13[0].index, i5 = new Set(Object.keys(e13[0].attributes)), s4 = new Set(Object.keys(e13[0].morphAttributes)), n6 = {}, c5 = {}, l2 = e13[0].morphTargetsRelative, b3 = new r.BufferGeometry(), d3 = 0;
              for (let r2 = 0; r2 < e13.length; ++r2) {
                let o2 = e13[r2], h3 = 0;
                if (t5 !== (null !== o2.index)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + r2 + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
                for (let e14 in o2.attributes) {
                  if (!i5.has(e14)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + r2 + '. All geometries must have compatible attributes; make sure "' + e14 + '" attribute exists among all geometries, or in none of them.'), null;
                  void 0 === n6[e14] && (n6[e14] = []), n6[e14].push(o2.attributes[e14]), h3++;
                }
                if (h3 !== i5.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + r2 + ". Make sure all geometries have the same number of attributes."), null;
                if (l2 !== o2.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + r2 + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
                for (let e14 in o2.morphAttributes) {
                  if (!s4.has(e14)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + r2 + ".  .morphAttributes must be consistent throughout all geometries."), null;
                  void 0 === c5[e14] && (c5[e14] = []), c5[e14].push(o2.morphAttributes[e14]);
                }
                if (a5) {
                  let e14;
                  if (t5) e14 = o2.index.count;
                  else {
                    if (void 0 === o2.attributes.position) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + r2 + ". The geometry must have either an index or a position attribute"), null;
                    e14 = o2.attributes.position.count;
                  }
                  b3.addGroup(d3, e14, r2), d3 += e14;
                }
              }
              if (t5) {
                let a6 = 0, t6 = [];
                for (let i6 = 0; i6 < e13.length; ++i6) {
                  let r2 = e13[i6].index;
                  for (let e14 = 0; e14 < r2.count; ++e14) t6.push(r2.getX(e14) + a6);
                  a6 += e13[i6].attributes.position.count;
                }
                b3.setIndex(t6);
              }
              for (let e14 in n6) {
                let a6 = o(n6[e14]);
                if (!a6) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e14 + " attribute."), null;
                b3.setAttribute(e14, a6);
              }
              for (let e14 in c5) {
                let a6 = c5[e14][0].length;
                if (0 === a6) break;
                b3.morphAttributes = b3.morphAttributes || {}, b3.morphAttributes[e14] = [];
                for (let t6 = 0; t6 < a6; ++t6) {
                  let a7 = [];
                  for (let i7 = 0; i7 < c5[e14].length; ++i7) a7.push(c5[e14][i7][t6]);
                  let i6 = o(a7);
                  if (!i6) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e14 + " morphAttribute."), null;
                  b3.morphAttributes[e14].push(i6);
                }
              }
              return b3;
            })(n5) : n5[0];
            e12 ? t4.add(new r.Mesh(e12, s3)) : n5.forEach((e13) => t4.add(new r.Mesh(e13, s3)));
          }
          return t4;
        })(e10.scene, "COLOUR_Cherry_Screen"), t3 = new r.Box3().setFromObject(a3), i3 = t3.getSize(new r.Vector3()), s2 = t3.getCenter(new r.Vector3()), n4 = 2.05 / i3.y;
        em = { w: i3.x * n4 / 2, h: 1.025 };
        let c4 = a3.getObjectByName("screen");
        if (c4) {
          c4.geometry.computeBoundingBox();
          let e11 = c4.geometry.boundingBox;
          eg = (e11.max.x - e11.min.x) / (e11.max.y - e11.min.y);
        }
        ek = new r.BoxGeometry(i3.x * n4, 2.05, i3.z * n4 * 4), er2.forEach((e11, t4) => {
          let i4 = new r.Group(), o2 = a3.clone(true);
          o2.scale.setScalar(n4), o2.position.copy(s2).multiplyScalar(-n4);
          let c5 = new r.MeshBasicMaterial({ color: "#111111", toneMapped: false }), l2 = o2.getObjectByName("screen");
          if (l2) {
            l2.material = c5;
            let e12 = new r.Mesh(l2.geometry, ew);
            e12.position.z = 2e-4, e12.renderOrder = 2, l2.add(e12);
          }
          let b3 = new r.Mesh(ek, ev);
          b3.visible = false, b3.userData.index = t4, i4.add(o2, b3), i4.visible = false, M3.add(i4), e11.group = i4, e11.hit = b3, e11.screen = c5, e11.poster && eR(e11, eT(e11.poster));
        }), ex = true, y3.pro = 1, _3();
      }, (e10) => {
        e10.total && (y3.pro = e10.loaded / e10.total, _3());
      }), e2.forEach((e10, a3) => C2.load(e10.poster, (e11) => {
        if (H2) return;
        let t3 = er2[a3];
        t3.poster = e11, t3.screen && !t3.videoTexture && eR(t3, eT(e11)), y3.covers++, _3();
      }));
      let eA = (a3, t3) => {
        let i3 = er2[a3];
        if (i3.group) {
          if (!t3) return void i3.video?.pause();
          if (!i3.video) {
            let t4 = document.createElement("video");
            Object.assign(t4, { muted: true, loop: true, playsInline: true, preload: "auto", src: e2[a3].preview }), t4.addEventListener("playing", () => {
              i3.videoTexture || (i3.videoTexture = eT(new r.VideoTexture(t4)), eR(i3, i3.videoTexture));
            }), i3.video = t4;
          }
          document.hidden || i3.video.play().catch(() => {
          });
        }
      }, ej = 0, eM = 0, eS = 1, eE = 1, ey = 1, e_ = 10, eF = es.clone(), eC = () => {
        ej = a2.clientWidth, eM = a2.clientHeight, c3.setSize(ej, eM), j3.aspect = ej / eM;
        let e10 = Math.tan(r.MathUtils.degToRad(j3.fov / 2));
        e_ = Math.max(2.05 / (0.9 * e10), 1 / (1.1 * e10 * j3.aspect)), j3.position.set(0, 0, e_), j3.updateProjectionMatrix(), eE = (ey = 2 * e_ * e10) * j3.aspect, eS = eM / ey, eF.copy(j3.aspect < 0.8 ? en : es), M3.position.set(0, j3.aspect < 0.8 ? 0 : 0.05, 0);
      };
      eC();
      let eH = new ResizeObserver(eC);
      eH.observe(a2);
      let eO = 0, eL = 0, eG = 0, eN = 0, eP = 0, eq = 0, eB = false, eI = -1, eD = 0, eK = -1, ez = 0, eU = 0, eW = performance.now(), eQ = null, eV = null, eX = "loading", eJ = -1, eY = Math.PI, eZ = Math.PI, e$ = false, e0 = false, e9 = new r.Vector2(-9, -9), e1 = new r.Raycaster();
      k2.current = (e10) => {
        eO = eb(Math.round(e10), 0, A2 - 1), eG = 0;
      }, T2.current = () => {
        ez && (ez = Math.min(ez, performance.now() - 4400));
      }, R2.current = (e10) => {
        e$ = e10;
      };
      let e8 = new r.Vector3(), e22 = new r.Euler(), e4 = new r.Quaternion(), e6 = new r.Quaternion(), e5 = new r.Quaternion(), e3 = new r.Vector3(0, 1, 0), e7 = new r.Vector3(), ae = (e10) => {
        let a3 = e10.clone().project(j3);
        return new r.Vector2((a3.x + 1) / 2 * ej, (1 - a3.y) / 2 * eM);
      }, aa = () => {
        e1.setFromCamera(e9, j3);
        let e10 = e1.intersectObjects(er2.flatMap((e11) => e11.group?.visible && e11.hit ? [e11.hit] : []), false)[0];
        return e10 ? e10.object.userData.index : -1;
      }, at = (e10) => {
        let s2 = Math.min(0.05, (e10 - eW) / 1e3);
        eW = e10;
        let o2 = e10 / 1e3;
        !ez && ex && y3.covers >= A2 && y3.title && J2 && e10 - ee2 > 1e3 * !n3 && (ez = n3 ? e10 - 4400 : e10, D2(), eZ = eY);
        let l2 = ez ? (e10 - ez) / 1e3 : -1, b3 = l2 < 0 ? "loading" : l2 < 4.4 - 0.5 ? "intro" : "ready";
        b3 !== eX && (eX = b3, x2(b3));
        let d3 = "ready" === eX, h3 = l2 < 0 ? 0 : ed(l2, 2.75, 3.45) ** 3;
        if (J2 && U2.visible) {
          let a3 = eh(eb((e10 - ee2) / 900)), t3 = l2 < 0 ? 0 : ep(ed(l2, 0, 1));
          ez || (eY = Math.PI + (n3 ? 0 : 0.42 * Math.sin(0.8 * o2)));
          let s3 = ez ? eZ + (2 * Math.PI - eZ) * t3 : eY, c4 = l2 < 0 ? 0 : ep(ed(l2, 0.85, 1.75));
          ei2(1 - c4);
          let b4 = l2 < 0 ? 0 : ed(l2, 1.4, 2.2);
          Math.round(60 * b4) !== eJ && (eJ = Math.round(60 * b4), z2(b4)), b4 >= 1 && !e0 && (e0 = true, z2(1), i2.style.backgroundImage = `url(${L2.toDataURL("image/jpeg", 0.9)})`);
          let d4 = Math.min(2.0909999999999997 / Z2, 0.8 * eE / 0.168116);
          W2.scale.setScalar(d4 * (0.6 + 0.4 * a3)), Q2.position.copy(Y2.closed).lerp(Y2.open, c4).multiplyScalar(-1), U2.rotation.set(-0.1 * (1 - t3), s3, -0.05 * (1 - t3)), U2.position.set(0, (n3 ? 0 : 0.05 * Math.sin(1.3 * o2)) * (1 - t3), 0), U2.updateMatrixWorld(true), e7.set(0, 0.05885, 26e-4), J2.localToWorld(e7);
          let p4 = Math.tan(r.MathUtils.degToRad(j3.fov / 2)), u3 = W2.scale.x, f5 = Math.min(0.1109 * u3, 0.1586 * u3 / j3.aspect) / (2 * p4);
          j3.position.set(e7.x * h3, e7.y * h3, e_ + (e7.z + f5 - e_) * h3), h3 >= 1 && (U2.visible = false, j3.position.set(0, 0, e_));
        }
        let f4 = l2 < 0 ? 0 : eh(ed(l2, 3.45, 3.45 + 0.9)), m3 = l2 >= 3.45 && !n3 ? 1 - f4 : 0;
        i2.style.opacity = String(Math.round(100 * m3) / 100), i2.style.transform = `scale(${(1 + 0.18 * f4).toFixed(3)})`, eL += (eO - eL) * (1 - Math.exp(-(6.5 * s2))), (n3 || 5e-4 > Math.abs(eO - eL)) && (eL = eO);
        let g4 = d3 && !eQ ? aa() : -1;
        g4 !== eK && (eK = g4, a2.style.cursor = g4 >= 0 ? "pointer" : "", g4 >= 0 ? eV = { index: g4, at: e10, out: 0 } : eV && !eV.out && (eV.out = e10));
        let w4 = eb(Math.round(eL), 0, A2 - 1);
        er2.forEach((e11, a3) => {
          if (!e11.group) return;
          let t3 = a3 - eL, i3 = Math.abs(t3), r2 = l2 < 0 ? 0 : n3 ? 1 : eh(ed(l2, 3.45 + 0.08 * Math.min(i3, 5), 3.45 + 0.08 * Math.min(i3, 5) + 1.3)), c4 = r2 > 0 && t3 > -2.2 && t3 < 4.6;
          if (e11.group.visible = c4, !c4) return;
          let b4 = 1 - eb(i3), d4 = n3 ? 0 : 0.045 * Math.sin(0.9 * o2 + 1.7 * a3), h4 = ep(ed(-t3, 1.2, 2.2));
          e8.copy(eF).multiplyScalar(t3), e8.z += 0.35 * b4 - 1.6 * h4 - 3 * (1 - r2), e8.y += d4 - 0.6 * (1 - r2), e6.setFromEuler(eo), e5.setFromEuler(ec), e4.copy(e6).slerp(e5, ep(b4)), n3 || (e22.set(0.03 * Math.sin(0.7 * o2 + a3), 0.04 * Math.sin(0.5 * o2 + 2 * a3), 0.025 * Math.sin(0.6 * o2 + 1.3 * a3)), e6.setFromEuler(e22), e4.multiply(e6));
          let p4 = ep(ed(t3, 1.3, 2.4));
          e11.flip += ((a3 === w4 && e$ ? 1 : 0) - e11.flip) * (1 - Math.exp(-s2 * (n3 ? 99 : 5)));
          let u3 = Math.PI * (p4 + e11.flip + (1 - r2));
          u3 && (e6.setFromAxisAngle(e3, u3), e4.multiply(e6)), e11.group.scale.setScalar((0.9 + 0.1 * b4) * (1 - h4) * (0.7 + 0.3 * r2)), e11.group.position.copy(e8), e11.group.quaternion.copy(e4);
        });
        let k3 = l2 > 3.85 && 0.3 > Math.abs(eL - w4) && !e$ && !document.hidden ? w4 : -1;
        k3 !== eI && (eI >= 0 && eA(eI, false), k3 >= 0 && eA(k3, true), eI = k3), w4 !== eD && (eD = w4, u2(w4), e$ && (e$ = false, v2(false)));
        let T3 = eV ? er2[eV.index].group : void 0;
        if (eV && T3) {
          T3.updateMatrixWorld();
          let a3 = ae(T3.localToWorld(new r.Vector3(0, 0, 0))), i3 = ae(T3.localToWorld(new r.Vector3(em.w, 0, 0))).sub(a3), s3 = ae(T3.localToWorld(new r.Vector3(0, -em.h, 0))).sub(a3), c4 = n3 ? 0 : Math.floor(e10 / 85);
          t2.setAttribute("d", (function(e11, a4, t3, i4, r2, s4) {
            let n4 = eu(31 * i4 + r2), o3 = eu(57 * i4 + 3.1 * r2), c5 = eu(13 * i4 + 7.7 * r2), l4 = 2.2 + 0.25 * n4, b5 = s4 + 0.5 * o3, d4 = "";
            for (let i5 = 0; i5 <= 220; i5++) {
              let r3 = i5 / 220, s5 = b5 + r3 * l4 * Math.PI * 2, h4 = 1 + 0.05 * Math.sin(r3 * l4 * Math.PI * 0.9 + 6 * c5) + (-0.07 * (1 - ed(r3, 0, 0.06)) + 0.06 * ed(r3, 0.94, 1)) + (0.03 * Math.sin(3 * s5 + 9 * n4) + 0.018 * Math.sin(7 * s5 + 9 * o3) + 8e-3 * Math.sin(17 * s5 + 9 * c5)), p4 = Math.cos(s5), u3 = Math.sin(s5), f5 = Math.sign(p4) * Math.abs(p4) ** 0.66 * 1.22 * h4, m4 = Math.sign(u3) * Math.abs(u3) ** 0.66 * 1.09 * h4;
              d4 += `${i5 ? "L" : "M"}${(e11.x + a4.x * f5 + t3.x * m4).toFixed(1)} ${(e11.y + a4.y * f5 + t3.y * m4).toFixed(1)}`;
            }
            return d4;
          })(a3, i3, s3, er2[eV.index].seed, c4, n3 ? 0 : 0.9 * o2));
          let l3 = n3 ? 1 : eh(eb((e10 - eV.at) / 650)), b4 = eV.out ? n3 ? 1 : ep(eb((e10 - eV.out) / 350)) : 0;
          t2.style.strokeDashoffset = String(b4 ? -b4 * l3 : 1 - l3), t2.style.strokeWidth = String(Math.max(1.1, 0.0125 * eS)), b4 >= 1 && (eV = null, t2.setAttribute("d", ""));
        }
        c3.render(p3, j3), eU = requestAnimationFrame(at);
      };
      eU = requestAnimationFrame(at);
      let ai = (e10) => {
        if (e10.ctrlKey || e10.metaKey || (e10.preventDefault(), "ready" !== eX)) return;
        let a3 = 1 === e10.deltaMode ? 16 : 2 === e10.deltaMode ? innerHeight : 1, t3 = (Math.abs(e10.deltaY) >= Math.abs(e10.deltaX) ? e10.deltaY : e10.deltaX) * a3, i3 = e10.timeStamp, r2 = Math.abs(t3);
        i3 - eP > 160 && (eN = 0, eB = false), eB && r2 > 2 * eq + 8 && (eB = false), eP = i3, eq = r2, eB || 40 > Math.abs(eN += t3) || (k2.current(Math.round(eO) + Math.sign(eN)), eN = 0, eB = true);
      }, ar = (e10) => {
        let t3 = a2.getBoundingClientRect();
        e9.set((e10.clientX - t3.left) / t3.width * 2 - 1, -(2 * ((e10.clientY - t3.top) / t3.height)) + 1);
      }, as = (e10) => {
        0 === e10.button && "ready" === eX && (ar(e10), eQ = { x: e10.clientX, y: e10.clientY, from: eO, moved: false });
      }, an = (e10) => {
        if ("mouse" === e10.pointerType && (e10.target === c3.domElement ? ar(e10) : e9.set(-9, -9)), !eQ) return;
        let a3 = e10.clientX - eQ.x, t3 = e10.clientY - eQ.y;
        Math.hypot(a3, t3) > 6 && (eQ.moved = true), eO = eb(eQ.from - (a3 - t3) / 300, -0.35, A2 - 0.65);
      }, ao = (a3) => {
        if (!eQ) return;
        let t3 = eQ.moved;
        if (eQ = null, t3) {
          eO = eb(Math.round(eO), 0, A2 - 1);
          return;
        }
        ar(a3);
        let i3 = aa();
        "mouse" !== a3.pointerType && e9.set(-9, -9), i3 < 0 || (i3 === Math.round(eL) ? window.open(e2[i3].href, "_blank", "noopener,noreferrer") : k2.current(i3));
      }, ac = (e10) => {
        "Escape" === e10.key ? T2.current() : "ready" !== eX || e10.target instanceof Element && e10.target.closest("input, textarea") || (("ArrowRight" === e10.key || "ArrowDown" === e10.key) && (e10.preventDefault(), k2.current(Math.round(eO) + 1)), ("ArrowLeft" === e10.key || "ArrowUp" === e10.key) && (e10.preventDefault(), k2.current(Math.round(eO) - 1)));
      }, al = () => {
        document.hidden && eI >= 0 && (eA(eI, false), eI = -1);
      };
      return addEventListener("wheel", ai, { passive: false }), a2.addEventListener("pointerdown", as), addEventListener("pointermove", an), addEventListener("pointerup", ao), addEventListener("pointercancel", ao), addEventListener("keydown", ac), document.addEventListener("visibilitychange", al), () => {
        H2 = true, cancelAnimationFrame(eU), eH.disconnect(), removeEventListener("wheel", ai), a2.removeEventListener("pointerdown", as), removeEventListener("pointermove", an), removeEventListener("pointerup", ao), removeEventListener("pointercancel", ao), removeEventListener("keydown", ac), document.removeEventListener("visibilitychange", al), er2.forEach((e10) => {
          e10.video?.pause(), e10.video?.removeAttribute("src"), e10.video?.load(), e10.poster?.dispose(), e10.videoTexture?.dispose(), e10.screen?.dispose();
        }), p3.traverse((e10) => {
          e10.isMesh && (e10.geometry.dispose(), (Array.isArray(e10.material) ? e10.material : [e10.material]).forEach((e11) => {
            Object.values(e11).forEach((e12) => {
              e12 instanceof r.Texture && e12.dispose();
            }), e11.dispose();
          }));
        }), ek?.dispose(), ev.dispose(), G2.dispose(), N2.dispose(), ew.dispose(), g3.dispose(), f3.dispose(), c3.dispose(), c3.domElement.remove();
      };
    }, [e2, A2]);
    let j2 = e2[p2], M2 = j2.stats, S2 = (function(e3, a2 = 900) {
      let [t2, r2] = (0, i.useState)(e3), s2 = (0, i.useRef)(e3);
      return (0, i.useEffect)(() => {
        let t3 = performance.now(), i2 = s2.current, n3 = 0, o2 = (c3) => {
          let l2 = matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : eh(eb((c3 - t3) / a2)), b3 = Math.round(i2 + (e3 - i2) * l2);
          s2.current = b3, r2(b3), l2 < 1 && (n3 = requestAnimationFrame(o2));
        };
        return n3 = requestAnimationFrame(o2), () => cancelAnimationFrame(n3);
      }, [e3, a2]), t2;
    })(M2.views), E2 = Math.round(100 * f2), y2 = (e3) => String(e3 + 1).padStart(2, "0"), _2 = [{ label: "Saved", lines: [ef(M2.saves), "times"] }, { label: "Liked by", lines: [`1 in ${Math.max(1, Math.round(M2.views / M2.likes))}`, "people who watched"] }, { label: "Shared", lines: [ef(M2.shares), "times"] }], F2 = 0;
    return (0, a.jsxs)("main", { className: er.default.page, "data-phase": g2, style: { "--world": ei.WORLDS[j2.world].color }, children: [(0, a.jsx)("div", { className: er.default.glow, "aria-hidden": "true" }), (0, a.jsx)("div", { ref: b2, className: er.default.stage, "aria-hidden": "true" }), (0, a.jsx)("svg", { className: er.default.squiggle, "aria-hidden": "true", children: (0, a.jsx)("path", { ref: d2, pathLength: 1 }) }), (0, a.jsx)("div", { ref: h2, className: er.default.veil, "aria-hidden": "true" }), (0, a.jsxs)("div", { className: er.default.loader, children: [(0, a.jsx)("span", { className: er.default.edge, children: "Avi Vashishta" }), (0, a.jsxs)("span", { className: er.default.count, role: "progressbar", "aria-label": "Loading the phones and Reels", "aria-valuenow": E2, "aria-valuemin": 0, "aria-valuemax": 100, children: ["Loading ", (0, a.jsx)("b", { children: String(E2).padStart(3, "0") })] }), (0, a.jsx)("span", { className: `${er.default.edge} ${er.default.edgeRight}`, children: "Reels, 2026" }), (0, a.jsx)("button", { type: "button", className: er.default.skip, onClick: () => T2.current(), disabled: "intro" !== g2, children: "Skip intro" })] }), (0, a.jsxs)("nav", { className: er.default.nav, "aria-label": "Floating phones", children: [(0, a.jsx)(t.default, { href: "/", className: er.default.mark, children: "Avi." }), (0, a.jsx)("span", { children: "Lab" }), (0, a.jsx)("b", { children: "Floating phones" })] }), (0, a.jsxs)("section", { className: er.default.credits, "aria-live": "polite", children: [(0, a.jsxs)("p", { className: er.default.kicker, children: ["N\xB0 ", y2(p2), " ", (0, a.jsx)("i", { children: "of" }), " ", y2(A2 - 1)] }, `k${p2}`), (0, a.jsx)("h1", { className: er.default.title, "aria-label": j2.title, "data-long": j2.title.length > 28 ? "" : void 0, children: j2.title.split(" ").map((e3, t2) => (0, a.jsxs)("span", { "aria-hidden": "true", children: [t2 > 0 && " ", (0, a.jsx)("span", { className: er.default.word, children: [...e3].map((e4, t3) => (0, a.jsx)("span", { className: er.default.letter, style: { "--i": F2++ }, children: e4 }, t3)) })] }, t2)) }, p2), (0, a.jsx)("span", { className: er.default.rule }, `r${p2}`), (0, a.jsxs)("dl", { className: er.default.rows, children: [(0, a.jsxs)("div", { children: [(0, a.jsx)("dt", { children: "World" }), (0, a.jsxs)("dd", { children: [(0, a.jsx)("i", {}), ei.WORLDS[j2.world].label.toLowerCase()] })] }), (0, a.jsxs)("div", { children: [(0, a.jsx)("dt", { children: "Posted" }), (0, a.jsx)("dd", { children: (c2 = j2.date, (/* @__PURE__ */ new Date(`${c2.slice(0, 4)}-${c2.slice(4, 6)}-01T12:00:00`)).toLocaleDateString("en", { month: "long", year: "numeric" })) })] }), (0, a.jsxs)("div", { children: [(0, a.jsx)("dt", { children: "Likes" }), (0, a.jsx)("dd", { children: M2.likes.toLocaleString("en") })] }), (0, a.jsxs)("div", { children: [(0, a.jsx)("dt", { children: "Comments" }), (0, a.jsx)("dd", { children: M2.comments.toLocaleString("en") })] })] }, `rows${p2}`)] }), (0, a.jsxs)("div", { className: er.default.views, children: [(0, a.jsx)("small", { children: "Views on Instagram" }), (0, a.jsx)("strong", { children: S2.toLocaleString("en") })] }), (0, a.jsxs)("div", { className: er.default.counter, children: [(0, a.jsx)("button", { type: "button", "aria-label": "Previous Reel", disabled: 0 === p2, onClick: () => k2.current(p2 - 1), children: "\u2190" }), (0, a.jsxs)("span", { "aria-hidden": "true", children: [y2(p2), " ", (0, a.jsx)("i", { children: "/" }), " ", y2(A2 - 1)] }), (0, a.jsx)("button", { type: "button", "aria-label": "Next Reel", disabled: p2 === A2 - 1, onClick: () => k2.current(p2 + 1), children: "\u2192" })] }), (0, a.jsxs)("button", { type: "button", className: er.default.turn, "aria-pressed": w2, onClick: () => {
      R2.current(!w2), v2(!w2);
    }, children: [(0, a.jsx)("span", { "aria-hidden": "true", children: "\u21BB" }), " ", w2 ? "Turn to the screen" : "Turn it around"] }), (0, a.jsx)("ol", { className: er.default.index, "aria-label": "All Reels", children: e2.map((e3, t2) => (0, a.jsx)("li", { "data-active": t2 === p2 ? "" : void 0, children: (0, a.jsxs)("button", { type: "button", onClick: () => k2.current(t2), "aria-current": t2 === p2 ? "true" : void 0, children: [(0, a.jsx)("span", { children: y2(t2) }), e3.title] }) }, e3.id)) }), (0, a.jsx)("div", { className: er.default.notes, children: _2.map((e3, t2) => (0, a.jsxs)("p", { style: { "--i": t2 }, children: [(0, a.jsx)("small", { children: e3.label }), (0, a.jsxs)("span", { children: [e3.lines[0], (0, a.jsx)("br", {}), e3.lines[1]] })] }, e3.label)) }, `notes${p2}`), (0, a.jsx)("p", { className: er.default.hint, children: "Scroll, drag or click a phone" }), (0, a.jsx)("a", { className: er.default.watch, href: j2.href, target: "_blank", rel: "noopener noreferrer", children: "Watch on Instagram \u2197" }), (0, a.jsx)("ol", { className: "sr-only", children: e2.map((e3, t2) => (0, a.jsx)("li", { children: (0, a.jsxs)("a", { href: e3.href, target: "_blank", rel: "noopener noreferrer", onFocus: () => k2.current(t2), children: [e3.title, ", ", ef(e3.stats.views), " views"] }) }, e3.id)) }), n2] });
  }], 15756);
}]);
