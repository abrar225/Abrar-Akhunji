import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MathUtils } from 'three';
import ErrorBoundary from '../components/ErrorBoundary';

const colors = ['#e6fa8d', '#f59bb6', '#dcd9f5'];
const tracks = [0, 1, 2, 3, 4];

function Boards({ active, rotation }) {
  const group = useRef(null);
  const plates = useRef([]);
  const invalidate = useThree(state => state.invalidate);

  useEffect(() => { invalidate(); }, [active, invalidate]);
  useEffect(() => {
    function resume() { if (!document.hidden) invalidate(); }
    document.addEventListener('visibilitychange', resume);
    return () => document.removeEventListener('visibilitychange', resume);
  }, [invalidate]);
  useFrame(({ camera }, elapsed) => {
    if (document.hidden) return;
    const delta = Math.min(elapsed, .04);
    const sculpture = group.current;
    const spin = rotation.current.spin;
    let moving = Math.abs(sculpture.rotation.y - spin) > .001;
    sculpture.rotation.y = MathUtils.damp(sculpture.rotation.y, spin, 9, delta);
    camera.position.y = 4.1 + rotation.current.elevation;
    camera.lookAt(0, 0, 0);

    plates.current.forEach((plate, index) => {
      const targetY = (1 - index) * .58 + (index === active ? .35 : 0);
      const targetX = index === active ? .52 : 0;
      moving ||= Math.abs(plate.position.y - targetY) > .003 || Math.abs(plate.position.x - targetX) > .003;
      plate.position.y = MathUtils.damp(plate.position.y, targetY, 9, delta);
      plate.position.x = MathUtils.damp(plate.position.x, targetX, 9, delta);
    });
    if (moving) invalidate();
  });

  return <>
    <hemisphereLight args={['#fffaf0', '#2637c7', 2.3]} />
    <directionalLight color="#fffaf0" intensity={2.6} position={[-4, 6, 5]} />
    <group ref={group}>
      {colors.map((color, index) => <group key={color}
        ref={element => { plates.current[index] = element; }}
        position={[0, (1 - index) * .58, 0]}>
        <mesh>
          <boxGeometry args={[3.8, .13, 2.5]} />
          <meshStandardMaterial color={color} roughness={.62} emissive="#2637c7" emissiveIntensity={index === active ? .19 : .04} />
        </mesh>
        {tracks.map(track => <group key={track}>
          <mesh position={[0, .076, -.94 + track * .46]} rotation-z={Math.PI / 2}>
            <cylinderGeometry args={[.022, .022, 3.5, 7]} />
            <meshStandardMaterial color="#2637c7" roughness={.47} />
          </mesh>
          <mesh position={[-1.36 + track * .67, .15, index === 1 ? .48 : -.38]}>
            <boxGeometry args={[.36, .15, .48]} />
            <meshStandardMaterial color="#2637c7" roughness={.47} />
          </mesh>
        </group>)}
      </group>)}
    </group>
  </>;
}

export default function Assembly({ active }) {
  const host = useRef(null);
  const wake = useRef(null);
  const rotation = useRef({ spin: 0, elevation: 0 });
  const drag = useRef(null);

  function start(event) {
    if (event.pointerType !== 'mouse') return;
    drag.current = { x: event.clientX, y: event.clientY, ...rotation.current };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function move(event) {
    const origin = drag.current;
    if (!origin) return;
    rotation.current.spin = origin.spin + (event.clientX - origin.x) * .008;
    rotation.current.elevation = MathUtils.clamp(origin.elevation + (event.clientY - origin.y) * .015, -2.3, 2.1);
    wake.current?.();
  }

  return <div className="patch-assembly" ref={host} aria-hidden="true" onPointerDown={start} onPointerMove={move}
    onLostPointerCapture={() => { drag.current = null; }}>
    <ErrorBoundary fallback={() => null}>
      <Canvas frameloop="demand" dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        camera={{ fov: 35, near: .1, far: 40, position: [5.2, 4.1, 6.5] }}
        onCreated={({ invalidate }) => {
          if (host.current) host.current.dataset.ready = 'true';
          wake.current = invalidate;
        }}>
        <Boards active={active} rotation={rotation} />
      </Canvas>
    </ErrorBoundary>
  </div>;
}
