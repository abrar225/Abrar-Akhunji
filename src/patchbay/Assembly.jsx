import { useEffect, useRef } from 'react';
import {
  BoxGeometry, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight, MathUtils,
  Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, WebGLRenderer,
} from 'three';

export default function Assembly({ active }) {
  const host = useRef(null);
  const selected = useRef(active);
  const wake = useRef(null);
  useEffect(() => {
    selected.current = active;
    wake.current?.();
  }, [active]);

  useEffect(() => {
    const element = host.current;
    const canvas = element.querySelector('canvas');
    if (!window.WebGL2RenderingContext) return;
    const gl = canvas.getContext('webgl2', { antialias:true, alpha:true, powerPreference:'low-power' });
    if (!gl) return;
    const renderer = new WebGLRenderer({ canvas, context:gl, alpha:true, antialias:true });
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));
    const scene = new Scene();
    const camera = new PerspectiveCamera(35,1,.1,40);
    camera.position.set(5.2,4.1,6.5);
    camera.lookAt(0,0,0);
    const sculpture = new Group();
    scene.add(sculpture);
    scene.add(new HemisphereLight('#fffaf0','#2637c7',2.3));
    const sun = new DirectionalLight('#fffaf0',2.6);
    sun.position.set(-4,6,5);
    scene.add(sun);
    const board = new BoxGeometry(3.8,.13,2.5);
    const component = new BoxGeometry(.36,.15,.48);
    const wire = new CylinderGeometry(.022,.022,3.5,7);
    const pads = [
      new MeshStandardMaterial({color:'#e6fa8d',roughness:.61}),
      new MeshStandardMaterial({color:'#f59bb6',roughness:.55}),
      new MeshStandardMaterial({color:'#dcd9f5',roughness:.67}),
    ];
    const traces = new MeshStandardMaterial({color:'#2637c7',roughness:.47});
    const plates = pads.map((material,index)=>{
      const plate = new Group();
      plate.add(new Mesh(board,material));
      for(let n=0;n<5;n+=1){
        const trace=new Mesh(wire,traces);
        trace.position.set(0,.076,-.94+n*.46);
        trace.rotation.z=Math.PI/2;
        plate.add(trace);
        const chip=new Mesh(component,traces);
        chip.position.set(-1.36+n*.67,.15,index===1 ? .48 : -.38);
        plate.add(chip);
      }
      plate.position.y=(1-index)*.56;
      sculpture.add(plate);
      return plate;
    });
    let frame=0;
    let last=0;
    let visible=false;
    let spin=0;
    let angle=0;
    let drag;
    let elevation=0;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const base = new Color('#2637c7');

    function render(now) {
      frame=0;
      if (!visible || document.hidden) return;
      const delta = Math.min(.04,(now-last)/1000 || .016);
      last=now;
      let moving=Math.abs(spin-angle)>.001;
      angle=reduced.matches ? spin : MathUtils.damp(angle,spin,7,delta);
      sculpture.rotation.y=angle;
      for (const [index,plate] of plates.entries()){
        const activePlate=selected.current===index;
        const target=(1-index)*.58+(activePlate ? .35 : 0);
        const slide=activePlate ? .52 : 0;
        moving ||= Math.abs(plate.position.y-target)>.003 || Math.abs(plate.position.x-slide)>.003;
        plate.position.y=reduced.matches ? target : MathUtils.damp(plate.position.y,target,7,delta);
        plate.position.x=reduced.matches ? slide : MathUtils.damp(plate.position.x,slide,7,delta);
        pads[index].emissive.copy(base).multiplyScalar(activePlate ? .19 : .04);
      }
      camera.position.y=4.1+elevation;
      camera.lookAt(0,0,0);
      renderer.render(scene,camera);
      element.dataset.ready='true';
      if(moving && !reduced.matches) schedule();
    }
    function schedule(){ if(!frame) frame=requestAnimationFrame(render); }
    function resize(){
      const {width,height}=element.getBoundingClientRect();
      if (!height || !width) return;
      renderer.setSize(width,height,false);
      camera.aspect=width/height;
      camera.updateProjectionMatrix();
      schedule();
    }
    function start(event){
      if(event.pointerType!=='mouse') return;
      drag={x:event.clientX, y:event.clientY, spin, elevation};
      canvas.setPointerCapture(event.pointerId);
    }
    function move(event){
      if(!drag) return;
      spin=drag.spin+(event.clientX-drag.x)*.008;
      elevation=MathUtils.clamp(drag.elevation+(event.clientY-drag.y)*.015,-2.3,2.1);
      schedule();
    }
    function stop(){drag=null;}
    const resizeObserver=new ResizeObserver(resize);
    resizeObserver.observe(element);
    const viewObserver=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;schedule();});
    viewObserver.observe(element);
    canvas.addEventListener('pointerdown',start);
    canvas.addEventListener('pointermove',move);
    canvas.addEventListener('lostpointercapture',stop);
    document.addEventListener('visibilitychange',schedule);
    reduced.addEventListener('change',schedule);
    wake.current=schedule;
    resize();
    return ()=>{
      wake.current=null;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewObserver.disconnect();
      canvas.removeEventListener('pointerdown',start);
      canvas.removeEventListener('pointermove',move);
      canvas.removeEventListener('lostpointercapture',stop);
      document.removeEventListener('visibilitychange',schedule);
      reduced.removeEventListener('change',schedule);
      board.dispose();
      component.dispose();
      wire.dispose();
      traces.dispose();
      pads.forEach(material=>material.dispose());
      renderer.dispose();
      delete element.dataset.ready;
    };
  },[]);

  return <div className="patch-assembly" ref={host} aria-hidden="true"><canvas /></div>;
}
