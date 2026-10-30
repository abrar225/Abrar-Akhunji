(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,19910,e=>{e.v({count:"made-of-dots-module__wPNgza__count",hint:"made-of-dots-module__wPNgza__hint",home:"made-of-dots-module__wPNgza__home",label:"made-of-dots-module__wPNgza__label",loader:"made-of-dots-module__wPNgza__loader",name:"made-of-dots-module__wPNgza__name",page:"made-of-dots-module__wPNgza__page",ring:"made-of-dots-module__wPNgza__ring",role:"made-of-dots-module__wPNgza__role",stage:"made-of-dots-module__wPNgza__stage"})},39407,e=>{"use strict";var t=e.i(43476),a=e.i(22016),n=e.i(71645),o=e.i(90072),i=e.i(8560),r=e.i(19910);let l=`
  attribute vec3 aNormal;
  attribute float aPart;
  attribute float aRand;
  uniform float uTime, uAssemble, uSize, uGlint, uShine;
  uniform vec2 uHead;
  uniform vec3 uLight, uRingCenter;
  uniform float uRingRadius;
  varying float vBright, vGlint, vAlpha;

  mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }
  mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1., 0., 0., 0., c, s, 0., -s, c); }
  float hash(float n) { return fract(sin(n) * 43758.5453); }

  void main() {
    vec3 home = position * 2e-4;
    vec3 n = aNormal;

    // The head turns on the neck; the shoulders follow a little.
    float head = smoothstep(-1.5, -.8, home.y);
    mat3 turn = rotY(uHead.x * (.25 + .75 * head)) * rotX(uHead.y * head);
    vec3 pivot = vec3(0., -1.1, 0.);
    home = turn * (home - pivot) + pivot;
    n = turn * n;

    // Breathing: every dot drifts a hair along its normal on its own clock.
    home += n * sin(uTime * 1.4 + aRand * 60.) * .006;

    // The entrance: dots leave the loader ring in a sweep and arc forward into place.
    float r2 = hash(aRand * 91.7);
    float t = clamp((uAssemble - aRand * .45) / .55, 0., 1.);
    float e = t < .5 ? 4. * t * t * t : 1. - pow(-2. * t + 2., 3.) / 2.;
    float ang = aRand * 6.2831853;
    vec3 start = uRingCenter + vec3(cos(ang), sin(ang), 0.) * uRingRadius * (1. + (r2 - .5) * .06);
    vec3 p = mix(start, home, e);
    float arc = sin(e * 3.1415926);
    p += vec3(sin(aRand * 40. + uTime * .3), cos(aRand * 31.), .9 + r2 * 1.4) * arc * .45;

    vec4 world = modelMatrix * vec4(p, 1.);
    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;

    // Light: a soft key from the top left, the cursor's light up close, and a rim.
    vec3 wn = normalize(mat3(modelMatrix) * n);
    vec3 toLight = uLight - world.xyz;
    float lit = max(dot(wn, normalize(toLight)), 0.) / (1. + dot(toLight, toLight) * .32);
    float key = max(dot(wn, normalize(vec3(-.5, .6, .7))), 0.);
    float facing = (viewMatrix * vec4(wn, 0.)).z;
    float rim = pow(1. - abs(facing), 3.);
    // Mostly an even grey, like a scan: the shape comes from the outline, the light only adds to it.
    float b = .3 + key * .14 + lit * 1.5 + rim * .12;
    b *= mix(.55, 1., smoothstep(-.3, .25, facing)); // the far side of the head a little darker
    float specs = step(1.5, aPart);
    b *= 1. - specs * .1;
    b *= .7 + r2 * .5; // no two dots quite alike
    // A glint runs across the specs every few seconds.
    vGlint = specs * smoothstep(.09, 0., abs(position.x * 2e-4 - uGlint));
    b += vGlint * 1.2;
    // The shine: once everyone has landed, one band of light sweeps down the bust from the top left.
    float band = home.y - home.x * .5 - uShine;
    float shine = exp(-band * band * 4.);
    b += shine * 1.3;
    vBright = b;
    vAlpha = mix(.75, 1., e);

    float size = uSize * (.45 + r2 * r2 * 1.3) * (1. + shine * .6);
    gl_PointSize = size / -mv.z;
  }
`,s=`
  uniform vec3 uInk, uBlue;
  varying float vBright, vGlint, vAlpha;
  void main() {
    vec2 c = gl_PointCoord - .5;
    float r = length(c);
    if (r > .5) discard;
    float a = exp(-r * r * 16.) * vAlpha; // soft, like a lens, not a hard pixel
    gl_FragColor = vec4(mix(uInk, uBlue, clamp(vGlint, 0., 1.) * .7) * vBright * a, 1.);
  }
`,u=`
  attribute float aRand;
  uniform float uTime, uSize, uOn;
  varying float vB;
  void main() {
    vec3 p = position;
    p.y = mod(p.y + uTime * (.03 + aRand * .05) + 6., 12.) - 6.;
    p.x += sin(uTime * .2 + aRand * 40.) * .15;
    vec4 mv = modelViewMatrix * vec4(p, 1.);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (.5 + aRand) / -mv.z;
    vB = (.1 + aRand * .18) * uOn;
  }
`,d=`
  uniform vec3 uInk;
  varying float vB;
  void main() {
    float r = length(gl_PointCoord - .5);
    if (r > .5) discard;
    gl_FragColor = vec4(uInk * vB * exp(-r * r * 16.), 1.);
  }
`,m=`
  uniform float uSize, uOn;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uOn / -mv.z;
  }
`,c=`
  void main() {
    float r = length(gl_PointCoord - .5) * 2.;
    float core = smoothstep(.14, .08, r);
    float glow = exp(-r * 4.) * .45 + exp(-r * 12.) * .7;
    gl_FragColor = vec4(vec3(core + glow), 1.);
  }
`;e.s(["MadeOfDots",0,function({madeHow:e}){let h=(0,n.useRef)(null),[f,v]=(0,n.useState)(0),[g,p]=(0,n.useState)("loading"),[w,b]=(0,n.useState)(!1);(0,n.useEffect)(()=>{let e=h.current;if(!e)return;let t=matchMedia("(prefers-reduced-motion: reduce)").matches,a=new AbortController,n=!1,r=0,f=()=>{};return(async()=>{try{let h=await fetch("/lab/dots/avi.bin",{signal:a.signal});if(!h.ok||!h.body)throw Error(String(h.status));let g=Number(h.headers.get("content-length"))||0,w=h.body.getReader(),b=[],x=0;for(;;){let{done:e,value:t}=await w.read();if(e)break;b.push(t),x+=t.length,v(g?x/g:Math.min(.95,x/67e4))}let _=new Uint8Array(x),y=0;for(let e of b)_.set(e,y),y+=e.length;if(v(1),await new Promise(e=>setTimeout(e,380*!t)),n)return;f=function(e,t,a,n){let h=new DataView(t).getUint32(0,!0),f=new Int16Array(t,4,3*h),v=new Int8Array(t,4+6*h,3*h),g=new Uint8Array(t,4+9*h,h),p=new Float32Array(h);for(let e=0;e<h;e++)p[e]=Math.random();let w=new o.BufferGeometry;w.setAttribute("position",new o.BufferAttribute(f,3)),w.setAttribute("aNormal",new o.BufferAttribute(v,3,!0)),w.setAttribute("aPart",new o.BufferAttribute(g,1)),w.setAttribute("aRand",new o.BufferAttribute(p,1));let b=new i.WebGLRenderer({antialias:!1,powerPreference:"high-performance"}),x=Math.min(devicePixelRatio,2);b.setPixelRatio(x),e.appendChild(b.domElement);let _=new o.Scene,y=new o.PerspectiveCamera(30,1,.1,100),A=new o.Vector3(0,-.15,0),M=getComputedStyle(e),P=(e,t)=>new o.Color(M.getPropertyValue(e).trim()||t);b.setClearColor(P("--color-night","#1a1a1c"));let R={uTime:{value:0},uAssemble:{value:+!!a},uSize:{value:26*x},uGlint:{value:-9},uShine:{value:99},uHead:{value:new o.Vector2},uLight:{value:new o.Vector3(-1.4,1.2,1.6)},uRingCenter:{value:new o.Vector3},uRingRadius:{value:1},uInk:{value:P("--color-paper","#f3f3f1")},uBlue:{value:P("--color-tech","#2f55ff")}},S=new o.Points(w,new o.ShaderMaterial({vertexShader:l,fragmentShader:s,uniforms:R,transparent:!0,depthWrite:!1,blending:o.AdditiveBlending}));S.frustumCulled=!1,_.add(S);let z={uSize:{value:240*x},uOn:{value:0}},B=new o.BufferGeometry;B.setAttribute("position",new o.Float32BufferAttribute([0,0,0],3));let C=new o.Points(B,new o.ShaderMaterial({vertexShader:m,fragmentShader:c,uniforms:z,transparent:!0,depthWrite:!1,blending:o.AdditiveBlending}));C.frustumCulled=!1,_.add(C);let N=new Float32Array(2700),T=new Float32Array(900);for(let e=0;e<900;e++)N.set([(Math.random()-.5)*18,(Math.random()-.5)*12,-6+8*Math.random()],3*e),T[e]=Math.random();let k=new o.BufferGeometry;k.setAttribute("position",new o.BufferAttribute(N,3)),k.setAttribute("aRand",new o.BufferAttribute(T,1));let L={uTime:R.uTime,uSize:{value:22*x},uOn:{value:+!!a},uInk:R.uInk},j=new o.Points(k,new o.ShaderMaterial({vertexShader:u,fragmentShader:d,uniforms:L,transparent:!0,depthWrite:!1,blending:o.AdditiveBlending}));j.frustumCulled=!1,_.add(j);let V=()=>{let t=e.clientWidth,a=e.clientHeight;b.setSize(t,a,!1),y.aspect=t/a;let n=Math.tan(o.MathUtils.degToRad(15)),i=Math.max(2.35/n,1.7/(n*y.aspect));y.position.set(0,A.y,i),y.lookAt(A),y.updateProjectionMatrix();let r=2*i*n/a;R.uRingCenter.value.set(0,A.y,0),R.uRingRadius.value=92*r};V();let G=new ResizeObserver(V);G.observe(e);let O=new o.Vector2,F=new o.Vector2,I=-1,E=!1,H=new o.Raycaster,U=new o.Plane(new o.Vector3(0,0,1),-2.6),W=new o.Vector3(-1.4,1.2,1.5),q=t=>{let a=e.getBoundingClientRect();O.set((t.clientX-a.left)/a.width*2-1,-(2*((t.clientY-a.top)/a.height))+1),E="touch"===t.pointerType,I=performance.now()},X=()=>{I=-1};e.addEventListener("pointermove",q),e.addEventListener("pointerdown",q),e.addEventListener("pointerleave",X);let Y=performance.now(),D=Y,K=!1,J=Y+4600,Q=e=>{r=requestAnimationFrame(Q);let t=Math.min(.05,(e-D)/1e3);D=e;let i=(e-Y)/1e3;R.uTime.value=a?0:i,a||(R.uAssemble.value=Math.min(1,i/2.6));let l=R.uAssemble.value;!K&&l>.55&&(K=!0,n());let s=e=>1-Math.exp(-t*e);if(I<0||E&&e-I>1500?(W.set(1.9*Math.sin(.45*i),.5+.8*Math.cos(.33*i),2.6),F.lerp(new o.Vector2(.35*Math.sin(.45*i),.12*Math.cos(.33*i)),s(1.5))):(H.setFromCamera(O,y),H.ray.intersectPlane(U,W),F.lerp(new o.Vector2(.5*O.x,.18*O.y),s(3))),a&&F.set(0,0),R.uLight.value.lerp(W,s(a?60:5)),C.position.copy(R.uLight.value),R.uHead.value.set(F.x,-F.y),z.uOn.value+=(Math.min(1,1.6*l)-z.uOn.value)*s(4),L.uOn.value+=(1-L.uOn.value)*s(.8),!a){let e=(i-2.3400000000000003)/2.2;R.uShine.value=e<0||e>1?99:2.8-(1-(1-e)**2)*7.4}if(!a&&e>J){let t=(e-J)/900;R.uGlint.value=-.9+1.8*t,t>1&&(J=e+4200,R.uGlint.value=-9)}b.render(_,y)};return r=requestAnimationFrame(Q),()=>{cancelAnimationFrame(r),G.disconnect(),e.removeEventListener("pointermove",q),e.removeEventListener("pointerdown",q),e.removeEventListener("pointerleave",X),w.dispose(),B.dispose(),k.dispose(),S.material.dispose(),C.material.dispose(),j.material.dispose(),b.dispose(),b.domElement.remove()}}(e,_.buffer,t,()=>p("ready"))}catch(e){n||(console.error(e),b(!0))}})(),()=>{n=!0,a.abort(),f()}},[]);let x=Math.round(100*f);return(0,t.jsxs)("main",{className:r.default.page,"data-phase":g,children:[(0,t.jsx)("div",{ref:h,className:r.default.stage,"aria-hidden":"true"}),(0,t.jsxs)("div",{className:r.default.loader,role:"progressbar","aria-label":"Loading the dots","aria-valuenow":x,"aria-valuemin":0,"aria-valuemax":100,children:[(0,t.jsx)("svg",{viewBox:"-110 -110 220 220",className:r.default.ring,children:Array.from({length:96},(e,a)=>{let n=a/96*Math.PI*2-Math.PI/2;return(0,t.jsx)("circle",{cx:+(92*Math.cos(n)).toFixed(2),cy:+(92*Math.sin(n)).toFixed(2),r:1.6,"data-on":a/96<f||void 0},a)})}),(0,t.jsx)("span",{className:r.default.count,children:w?"Could not load":String(x).padStart(3,"0")}),(0,t.jsx)("span",{className:r.default.label,children:w?"Refresh to try again":"66,000 dots"})]}),(0,t.jsx)(a.default,{href:"/",className:r.default.home,children:"Avi."}),(0,t.jsx)("h1",{className:r.default.name,children:"Avi Vashishta"}),(0,t.jsx)("p",{className:r.default.role,children:"Builds cool things with AI"}),(0,t.jsx)("p",{className:r.default.hint,children:"Move the light"}),e]})}])}]);