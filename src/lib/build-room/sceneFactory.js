import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const ROOT = '/assets/build-room/';
export const PRODUCT_IDS = ['fixo-flow', 'packetlark', 'framecast-studio'];
export const CAMERA_POSES = {
  hero: { position: [7.6, 5.8, 12.6], target: [-4.0, .95, 0] },
  brief: { position: [6.8, 7.5, 10], target: [-3.2, 1.0, 0] },
  work: { position: [0, 4.6, 13.6], target: [0, 1.2, 0] },
  inspect: { position: [5.5, 5.6, 9.6], target: [-1.8, 1.7, 0] },
  contact: { position: [5, 6, 11], target: [0, .7, 0] },
};

function makeTexture(draw, width = 1024, height = 128) {
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  draw(canvas.getContext('2d'), width, height);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Editable sculpture shared by the live workshop, its GLB, and still views. */
export function createBuildRoom(renderer, { theme = 'light', mobile = false, invalidate = () => {} } = {}) {
  const scene = new THREE.Scene(), model = new THREE.Group(); model.name = 'SoftwareWorkshop'; scene.add(model);
  const resources = new Set(); let disposed = false;
  const mat = (color, metalness = 0, roughness = .5) => {
    const material = new THREE.MeshStandardMaterial({ color, metalness, roughness }); resources.add(material); return material;
  };
  const aluminium = mat('#b8c3c7', .85, .25), cobalt = mat('#2548f4', .35, .3), ink = mat('#20251f', .2, .38);
  const chalk = mat('#e8ebe2', .08, .55), rubber = mat('#262b2c', .05, .85), copper = mat('#ac593e', .6, .3);
  const saffron = mat('#e5b54c', .35, .36), paper = mat('#f6f3e7', 0, .9), tape = mat('#594c3b', .12, .65);
  const tableMat = mat('#d1d7d2', .45, .48);
  const red = mat('#e94235', .1, .35); red.emissive.set('#e94235'); red.emissiveIntensity = .3;
  const geometryCache = new Map();
  function geometry(key, create) {
    if (!geometryCache.has(key)) { const value = create(); geometryCache.set(key, value); resources.add(value); }
    return geometryCache.get(key);
  }
  function mesh(name, shape, material, pos, parent = model) {
    const object = new THREE.Mesh(shape, material); object.position.set(...pos); object.name = name;
    object.castShadow = true; object.receiveShadow = true; parent.add(object); return object;
  }
  function box(name, size, pos, material, parent = model, radius = .04) {
    const r = Math.min(radius, ...size.map(s => s / 3));
    return mesh(name, geometry(`b:${size}:${r}`, () => new RoundedBoxGeometry(...size, 2, r)), material, pos, parent);
  }
  function cylinder(name, radius, height, pos, material, parent = model) {
    return mesh(name, geometry(`c:${radius}:${height}`, () => new THREE.CylinderGeometry(radius, radius, height, mobile ? 20 : 32)), material, pos, parent);
  }
  function disc(name, radius, depth, pos, material, parent) {
    const object = cylinder(name, radius, depth, pos, material, parent); object.rotation.x = Math.PI / 2; return object;
  }
  function ring(name, radius, tube, pos, material, parent) {
    return mesh(name, geometry(`r:${radius}:${tube}`, () => new THREE.TorusGeometry(radius, tube, 8, mobile ? 24 : 40)), material, pos, parent);
  }
  function rod(name, a, b, radius, material, parent) {
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b), delta = end.clone().sub(start);
    const object = cylinder(name, radius, delta.length(), start.clone().add(end).multiplyScalar(.5).toArray(), material, parent);
    object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize()); return object;
  }
  function cable(name, points, material, parent, radius = .035) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    const shape = new THREE.TubeGeometry(curve, mobile ? 20 : 32, radius, 6, false); resources.add(shape);
    return mesh(name, shape, material, [0, 0, 0], parent);
  }
  function inscription(text, size, pos, parent, color = '#20251f', bg = '#e8ebe2') {
    const map = makeTexture((ctx, w, h) => {
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h); ctx.fillStyle = color;
      ctx.font = '600 42px "Instrument Sans", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, w / 2, h / 2);
    });
    const material = new THREE.MeshBasicMaterial({ map, toneMapped: false }); resources.add(map); resources.add(material);
    return box(text, size, pos, material, parent, .002);
  }
  function screws(points, parent) {
    const shape = geometry('screw', () => new THREE.CylinderGeometry(.034, .034, .014, 10));
    const batch = new THREE.InstancedMesh(shape, aluminium, points.length); batch.name = 'CaptiveFasteners';
    const dummy = new THREE.Object3D(); dummy.rotation.x = Math.PI / 2;
    points.forEach((p, i) => { dummy.position.set(...p); dummy.updateMatrix(); batch.setMatrixAt(i, dummy.matrix); }); parent.add(batch);
  }

  // The same guide rail ties the otherwise different objects into one workshop.
  box('Workbench', [mobile ? 3.5 : 10.5, .23, 2.7], [0, -.3, .05], tableMat, model, .1);
  box('InsetFrontEdge', [mobile ? 3.1 : 10.1, .045, .04], [0, -.2, 1.42], ink);
  for (const x of (mobile ? [-1.45, 1.45] : [-4.75, 4.75])) for (const z of [-.85, .85]) box('RubberFoot', [.38, .16, .45], [x, -.48, z], rubber, model, .07);
  for (const z of [-.79, .79]) {
    box('PrecisionRail', [mobile ? 3.2 : 10.2, .2, .13], [0, -.03, z], aluminium);
    box('CobaltGuide', [mobile ? 3.2 : 10.2, .035, .025], [0, .095, z + .07], cobalt);
  }
  const rollerShape = geometry('roller', () => { const g = new THREE.CylinderGeometry(.085, .085, 1.5, 12); g.rotateX(Math.PI / 2); return g; });
  const rollerCount = mobile ? 10 : 30;
  const rollers = new THREE.InstancedMesh(rollerShape, aluminium, rollerCount); rollers.name = 'GuideRollers';
  const matrix = new THREE.Matrix4();
  for (let i = 0; i < rollerCount; i++) { matrix.makeTranslation((mobile ? -1.48 : -4.78) + i * .33, .045, 0); rollers.setMatrixAt(i, matrix); } rollers.castShadow = true; model.add(rollers);
  inscription('ABRAR AKHUNJI  /  SOFTWARE WORKSHOP', [mobile ? 2.8 : 3.4, .18, .014], [0, -.3, 1.414], model);

  const trays = [], screenPivots = [], layerGroups = [], screenMaterials = [];
  const layerNames = [
    ['Capture', 'Local inference', 'Application integration'],
    ['Interface', 'HTTP engine', 'Workspace files'],
    ['Scene composition', 'Native media', 'Encoded outputs'],
  ];
  PRODUCT_IDS.forEach((id, i) => {
    const tray = new THREE.Group(); tray.name = `Tray_${id}`; tray.userData.projectId = id; tray.position.set((i - 1) * 3.1, .35, 0); model.add(tray); trays.push(tray);
    box('MachinedCarriage', [2.65, .13, 1.6], [0, -.06, 0], aluminium, tray, .055);
    for (const x of [-1.1, 1.1]) { const wheel = cylinder('GuideWheel', .145, .13, [x, -.07, .83], i === 0 ? cobalt : i === 1 ? ink : saffron, tray); wheel.rotation.x = Math.PI / 2; }
    const pivot = new THREE.Group(); pivot.name = `Instrument_${id}`; pivot.position.set(0, .18, -.25); tray.add(pivot); screenPivots.push(pivot);
    const screenMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false }); resources.add(screenMaterial); screenMaterials.push(screenMaterial);
    const display = (size, pos) => {
      const object = box(`Screen_${id}`, size, pos, screenMaterial, pivot, .004); object.userData.screenAsset = `products/${id}.webp`; return object;
    };
    if (i === 0) {
      // Voice becomes language: a reel-to-reel instrument, with the actual app below it.
      box('RecorderHousing', [2.25, 1.77, .56], [0, .94, .02], cobalt, pivot, .11);
      box('RecorderFace', [2.09, 1.59, .025], [0, .95, .316], ink, pivot, .055);
      for (const x of [-.55, .55]) {
        disc('TapePack', .465, .055, [x, 1.55, .355], tape, pivot);
        ring('ReelFlange', .42, .034, [x, 1.55, .4], chalk, pivot);
        disc('ReelHub', .11, .09, [x, 1.55, .42], aluminium, pivot);
        for (let n = 0; n < 3; n++) {
          const a = n * Math.PI * 2 / 3, spoke = box('ReelSpoke', [.09, .34, .028], [x + Math.sin(a) * .225, 1.55 + Math.cos(a) * .225, .41], chalk, pivot, .025);
          spoke.rotation.z = -a;
        }
      }
      cable('TapePath', [[-.55, 1.13, .37], [-.35, .98, .37], [.35, .98, .37], [.55, 1.13, .37]], tape, pivot, .018);
      const waveformMap = makeTexture((ctx, w, h) => {
        ctx.fillStyle = '#20251f'; ctx.fillRect(0, 0, w, h); ctx.strokeStyle = '#e8ebe2'; ctx.lineWidth = 5;
        for (let n = 0; n < 34; n++) {
          const amplitude = 5 + 20 * Math.abs(Math.sin(n * 1.71) * Math.cos(n * .43));
          ctx.beginPath(); ctx.moveTo(12 + n * 14, h / 2 - amplitude); ctx.lineTo(12 + n * 14, h / 2 + amplitude); ctx.stroke();
        }
      }, 512, 64);
      const waveformMaterial = new THREE.MeshBasicMaterial({ map: waveformMap, toneMapped: false }); resources.add(waveformMap); resources.add(waveformMaterial);
      box('VoiceWaveform', [.85, .075, .012], [0, 1.065, .39], waveformMaterial, pivot, .003);
      box('DisplayRecess', [1.87, .73, .035], [0, .57, .334], aluminium, pivot);
      display([1.76, .65, .012], [0, .57, .36]);
      for (const x of [-.66, -.3, .06]) box('TransportKey', [.23, .1, .14], [x, .08, .38], chalk, pivot, .018);
      disc('RecordButton', .065, .035, [.43, .08, .43], red, pivot);
      disc('GainDial', .12, .09, [.82, .08, .42], aluminium, pivot);
      inscription('Fixo Flow', [1.24, .13, .014], [0, -.065, .816], tray, '#e8ebe2', '#2548f4');
      screws([[-.99, .2, .35], [.99, .2, .35], [-.99, 1.68, .35], [.99, 1.68, .35]], pivot);
    } else if (i === 1) {
      // Requests and responses travel through a patchbay, rather than a second laptop.
      box('PatchbayCabinet', [2.32, 1.94, .64], [0, .98, .01], chalk, pivot, .09);
      box('PatchbayFace', [2.11, 1.71, .035], [0, 1.01, .35], ink, pivot, .035);
      box('DisplayRecess', [1.98, 1.09, .025], [0, 1.26, .377], aluminium, pivot);
      display([1.87, .98, .012], [0, 1.26, .395]);
      inscription('PacketLark / request → response', [1.9, .13, .014], [0, .66, .402], pivot, '#e8ebe2', '#20251f');
      for (const x of [-.78, -.26, .26, .78]) {
        ring('PatchSocket', .075, .025, [x, .45, .402], aluminium, pivot);
        disc('SocketInterior', .048, .013, [x, .45, .393], rubber, pivot);
      }
      cable('RequestPatch', [[-.78, .45, .43], [-.8, .13, .75], [.23, .06, .78], [.26, .45, .43]], copper, pivot, .045);
      cable('ResponsePatch', [[-.26, .45, .44], [-.18, .15, .66], [.83, .22, .68], [.78, .45, .44]], cobalt, pivot, .04);
      for (const x of [-.78, .26]) disc('PatchPlug', .065, .14, [x, .45, .48], copper, pivot);
      for (const x of [-.26, .78]) disc('PatchPlug', .06, .12, [x, .45, .48], cobalt, pivot);
      inscription('SEND   /   INSPECT   /   REPEAT', [1.7, .13, .013], [0, .11, .36], pivot, '#e8ebe2', '#20251f');
      screws([[-1, .25, .4], [1, .25, .4], [-1, 1.79, .4], [1, 1.79, .4]], pivot);
    } else {
      // One composition, two deliverables: landscape display and a separate portrait frame.
      box('CapturePlinth', [2.4, .23, 1.12], [0, .03, .02], ink, pivot, .055);
      rod('CaptureMast', [.36, .17, -.18], [.36, 1.26, -.18], .075, aluminium, pivot);
      disc('TiltJoint', .14, .32, [.36, 1.3, -.15], ink, pivot);
      box('LandscapeFrame', [2.17, 1.45, .18], [.1, 1.47, .04], saffron, pivot, .07);
      box('LandscapeBezel', [2.01, 1.3, .03], [.1, 1.47, .144], ink, pivot, .035);
      display([1.88, 1.17, .012], [.1, 1.47, .169]);
      const portraitFrame = new THREE.Group(); portraitFrame.name = 'PortraitCaptureFrame'; portraitFrame.position.set(-.91, .55, .49); portraitFrame.rotation.y = -.14; pivot.add(portraitFrame);
      for (const x of [-.33, .33]) box('PortraitFrameSide', [.075, 1.36, .085], [x, .68, 0], saffron, portraitFrame, .02);
      for (const y of [.04, 1.32]) box('PortraitFrameEdge', [.7, .075, .085], [0, y, 0], saffron, portraitFrame, .02);
      inscription('9:16', [.34, .11, .014], [0, 1.325, .05], portraitFrame, '#20251f', '#e5b54c');
      inscription('16:9', [.38, .11, .014], [.82, 2.18, .05], pivot, '#20251f', '#e5b54c');
      box('TallyLight', [.18, .055, .08], [.1, 2.225, .05], red, pivot, .02);
      inscription('Framecast Studio', [1.55, .15, .014], [.12, .1, .591], pivot, '#e8ebe2', '#20251f');
      box('TimelineRail', [1.8, .04, .16], [.05, .18, .16], aluminium, pivot);
      box('TimelinePlayhead', [.08, .07, .2], [.48, .23, .16], saffron, pivot);
      screws([[-.89, .89, .164], [1.08, .89, .164], [-.89, 2.05, .164], [1.08, 2.05, .164]], pivot);
    }
    // These labels name software responsibilities; the physical layers are a metaphor.
    const layers = new THREE.Group(); layers.name = `EngineeringLayers_${id}`; layers.visible = false; tray.add(layers); layerGroups.push(layers);
    [ink, aluminium, i === 0 ? cobalt : i === 1 ? copper : saffron].forEach((material, n) => {
      box(`SoftwareLayer_${n}`, [2.07, .075, 1.25], [0, .22 + n * .25, 0], material, layers, .025);
      inscription(layerNames[i][n], [1.83, .13, .012], [0, .23 + n * .25, .637], layers, n === 0 ? '#e8ebe2' : '#20251f', n === 0 ? '#20251f' : '#e8ebe2');
    });
  });

  const blank = box('ProblemBrief', [.9, .015, 1.2], [-4.5, .18, -.03], paper); blank.rotation.y = -.14; blank.visible = !mobile;
  box('BriefClip', [.21, .07, .1], [-4.5, .225, -.51], ink);
  const lamp = new THREE.Group(); lamp.name = 'InspectionLamp'; lamp.position.set(4.45, -.1, -.91); lamp.visible = !mobile; model.add(lamp);
  cylinder('LampFoot', .32, .1, [0, 0, 0], ink, lamp);
  rod('LampStem', [0, .05, 0], [0, 2.6, -.1], .043, aluminium, lamp);
  const joint = new THREE.Group(); joint.name = 'LampPivot'; joint.position.set(0, 2.6, -.1); lamp.add(joint);
  rod('LampArm', [0, 0, 0], [-1.1, .58, .1], .045, aluminium, joint);
  const shadeShape = new THREE.CylinderGeometry(.1, .33, .4, 24); resources.add(shadeShape);
  const shade = mesh('InspectionShade', shadeShape, cobalt, [-1.18, .44, .1], joint); shade.rotation.z = -.4;
  const glow = mat('#fff4d2'); glow.emissive.set('#ffe7a1'); glow.emissiveIntensity = 1;
  cylinder('InspectionDiffuser', .265, .015, [-1.26, .255, .1], glow, joint);
  const spot = new THREE.SpotLight('#fff0d3', 25, 14, .65, .7, 1); spot.position.set(3, 3, -1); spot.target.position.set(0, .5, 0); scene.add(spot, spot.target);
  const shelf = new THREE.Group(); shelf.name = 'ArchiveShelf'; shelf.visible = false; model.add(shelf);
  box('ArchiveBoard', [4, .1, 1.1], [-3, .3, -1.5], aluminium, shelf);
  const empty = new THREE.Group(); empty.name = 'EmptyContactTray'; empty.visible = false; model.add(empty);
  box('EmptyTray', [2.6, .1, 1.5], [0, .35, 0], aluminium, empty);
  box('NextBrief', [1.5, .02, 1.1], [0, .43, 0], paper, empty);
  const env = new RoomEnvironment(), pmrem = new THREE.PMREMGenerator(renderer), environment = pmrem.fromScene(env, .04);
  scene.environment = environment.texture; env.dispose(); pmrem.dispose();
  const ambient = new THREE.HemisphereLight('#ffffff', '#7c8580', 1.8); scene.add(ambient);
  const sun = new THREE.DirectionalLight('#fffaf0', 3); sun.position.set(-3, 8, 6); sun.castShadow = !mobile;
  sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 6, bottom: -6 }); sun.shadow.normalBias = .025; scene.add(sun);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), mat('#e8ebe2', 0, 1)); resources.add(floor.geometry);
  floor.rotation.x = -Math.PI / 2; floor.position.y = -.57; floor.receiveShadow = true; scene.add(floor);
  // A transparent contact shadow survives when the surrounding page hides the floor.
  const shadowMap = makeTexture((ctx, w, h) => {
    const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    gradient.addColorStop(0, 'rgba(17,25,23,.27)'); gradient.addColorStop(.55, 'rgba(17,25,23,.12)'); gradient.addColorStop(1, 'rgba(17,25,23,0)');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h);
  }, 256, 256);
  const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowMap, transparent: true, depthWrite: false, toneMapped: false }); resources.add(shadowMap); resources.add(shadowMaterial);
  const shadowShape = new THREE.PlaneGeometry(mobile ? 5 : 14, 5); resources.add(shadowShape);
  const contactShadow = mesh('ContactShadow', shadowShape, shadowMaterial, [0, -.565, .1]); contactShadow.rotation.x = -Math.PI / 2; contactShadow.castShadow = false; contactShadow.receiveShadow = false;
  const textures = [], loader = new THREE.TextureLoader();
  const ready = Promise.all(PRODUCT_IDS.map((id, i) => new Promise(resolve => {
    loader.load(`${ROOT}products/${id}.webp`, texture => {
      if (disposed) { texture.dispose(); resolve(); return; }
      texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy()); textures.push(texture);
      screenMaterials[i].map = texture; screenMaterials[i].needsUpdate = true; invalidate(); resolve();
    }, undefined, () => resolve());
  })));
  function setTheme(next) {
    const dark = next === 'dark'; scene.background = new THREE.Color(dark ? '#1b252b' : '#e8ebe2'); floor.material.color.copy(scene.background);
    tableMat.color.set(dark ? '#47545a' : '#d1d7d2'); ambient.intensity = dark ? 1.3 : 1.8; sun.intensity = dark ? 2 : 3; spot.intensity = dark ? 32 : 25;
    shadowMaterial.opacity = dark ? .45 : 1; renderer.toneMappingExposure = dark ? 1 : 1.08; invalidate();
  }
  setTheme(theme);
  function dispose() { disposed = true; environment.dispose(); for (const t of textures) t.dispose(); for (const r of resources) r.dispose(); }
  return { scene, floor, model, trays, screenPivots, layerGroups, screenMaterials, lamp: joint, spot, sun, empty, shelf, ready, setTheme, dispose };
}
