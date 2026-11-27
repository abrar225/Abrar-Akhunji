import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const knot = [
  [-1,.46],[-.73,1],[-.32,.9],[-.07,.05],
  [.14,-.77],[.4,-1],[.7,-.57],
  [1.1,.06],[.71,.48],[.35,.4],
  [-.05,.3],[.42,-.5],[1,-.36],
];
const rectangle = [
  [-1,-1],[-.35,-1],[.35,-1],[1,-1],
  [1,-.35],[1,.35],[1,1],
  [.35,1],[-.35,1],[-1,1],
  [-1,.35],[-1,-.35],[-1,-1],
];

function spline(points) {
  const [first, ...controls] = points;
  return `M${first.join(' ')}C${controls.map(point => point.join(' ')).join(' ')}`;
}

export default function Ribbon({ story, hero, work, proof, route, image }) {
  const elements = useRef(null);
  const inputs = useRef(route);
  useLayoutEffect(() => {
    inputs.current = route;
    elements.current.dispatchEvent(new Event('patchroute'));
  }, [route]);

  useEffect(() => {
    const svg = elements.current;
    const root = story.current;
    const paths = [...svg.querySelectorAll('[data-ribbon-stroke]')];
    const mask = svg.querySelector('[data-ribbon-mask]');
    const photo = svg.querySelector('image');
    const routeState = { value: inputs.current };
    const field = hero.current;
    const animation = gsap.matchMedia();

    animation.add('(prefers-reduced-motion: no-preference)', () => {
      root.dataset.ribbon = 'motion';
      const timeline = { progress: 0 };
      const follow = gsap.quickTo(routeState, 'value', { duration: .32, ease: 'power3.out', onUpdate: draw });
      const movement = { force: 0, pointer: 0 };
      let release;
      let bounds;

      function measure() {
        const box = svg.getBoundingClientRect();
        const target = proof.current.getBoundingClientRect();
        const heroBox = field.getBoundingClientRect();
        const workBox = work.current.getBoundingClientRect();
        bounds = {
          width: box.width, height: box.height, small: box.width < 820,
          x: target.left + target.width / 2,
          y: target.top - workBox.top + target.height / 2 + 70,
          photoWidth: target.width, photoHeight: target.height,
          heroHeight: heroBox.height,
        };
        if (bounds.width && bounds.height) svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
      }

      function draw() {
        if (!bounds?.width) return;
        const blend = (a,b,t) => gsap.utils.interpolate(a,b,t);
        const clamp = gsap.utils.clamp(0,1);
        const s = timeline.progress;
        const { force, pointer } = movement;
        const travel = gsap.parseEase('power2.inOut')(clamp((s - .25) / .65));
        const square = gsap.parseEase('power3.inOut')(clamp((s - .38) / .61));
        const wave = Math.sin(Math.PI * s);
        const { width, height, small, photoWidth, photoHeight } = bounds;
        const widthHalf = blend(width * (small ? .337 : .197), photoWidth / 2, square);
        const heightHalf = blend(height * (small ? .123 : .252), photoHeight / 2, square);
        const cx = blend(width * (small ? .5 : .73) + pointer * 18 - wave * width * (small ? 0 : .095), bounds.x, travel);
        const cy = blend(bounds.heroHeight * (small ? .74 : .50) - wave * height * .11, bounds.y, travel)
          + (1 - square) * force * (small ? 11 : 26);
        const points = knot.map(([x,y], i) => [
          Math.round(cx + widthHalf * blend(x, rectangle[i][0], square)),
          Math.round(cy + heightHalf * blend(y + Math.sin(i * .94) * (.27 * routeState.value + wave * .09),rectangle[i][1],square)),
        ]);
        const d = spline(points);
        paths.forEach(path => path.setAttribute('d',d));
        mask.setAttribute('d', d + 'Z');
        const media = { x: cx - widthHalf, y: cy - heightHalf, width: widthHalf * 2, height: heightHalf * 2 };
        for (const [name, value] of Object.entries(media)) photo.setAttribute(name, value);
        photo.style.opacity = gsap.parseEase('power2.in')(clamp((square - .35) / .65));
        svg.style.opacity = clamp((1 - s) / .033);
        svg.style.setProperty('--ribbon-flat', square);
        root.style.setProperty('--proof-visibility', clamp((s - .962) / .035));
        root.style.setProperty('--paper-tension', wave * (1 + force * .23));
        root.style.setProperty('--note-visibility', clamp((.69 - s) / .13));
        field.style.setProperty('--field-current', force * .6 + routeState.value * .38 + pointer * .62);
      }

      const updateRoute = () => follow(inputs.current);
      const tween = gsap.to(timeline, {
        progress: 1, ease: 'none', onUpdate: draw,
        scrollTrigger: {
          trigger: root, start: 'top 58px', endTrigger: work.current, end: 'top 70px', scrub: .17,
          onUpdate(self) {
            const speed = self.getVelocity();
            if (Math.abs(speed) < 20) return;
            movement.force = gsap.utils.clamp(-1, 1, speed / 1550);
            release?.kill();
            release = gsap.to(movement, { force: 0, duration: .28, ease: 'power2.out', onUpdate: draw });
          },
          onRefresh() { measure(); draw(); },
        },
      });
      const resize = new ResizeObserver(() => { measure(); draw(); });
      resize.observe(root);
      resize.observe(proof.current);
      svg.addEventListener('patchroute',updateRoute);
      const desktop = gsap.matchMedia();
      desktop.add('(hover: hover) and (pointer: fine)', () => {
        const easePointer = gsap.quickTo(movement,'pointer',{ duration:.36,ease:'power3.out',onUpdate:draw });
        const onPointer = event => {
          if (event.pointerType !== 'mouse') return;
          const bounds = field.getBoundingClientRect();
          easePointer((event.clientX - bounds.left) / bounds.width * 2 - 1);
        };
        const resetPointer = () => easePointer(0);
        field.addEventListener('pointermove',onPointer,{passive:true});
        field.addEventListener('pointerleave',resetPointer);
        return () => {
          field.removeEventListener('pointermove',onPointer);
          field.removeEventListener('pointerleave',resetPointer);
          easePointer.tween.kill();
          movement.pointer = 0;
        };
      });
      measure();
      draw();

      return () => {
        tween.scrollTrigger?.kill();
        release?.kill();
        gsap.killTweensOf(routeState);
        resize.disconnect();
        desktop.revert();
        svg.removeEventListener('patchroute',updateRoute);
        delete root.dataset.ribbon;
        root.style.removeProperty('--proof-visibility');
        root.style.removeProperty('--paper-tension');
        root.style.removeProperty('--note-visibility');
        field.style.removeProperty('--field-current');
      };
    }, root);
    return () => animation.revert();
  }, [story, hero, work, proof]);

  return <svg className="patch-ribbon" ref={elements} aria-hidden="true" preserveAspectRatio="none">
    <defs>
      <clipPath id="patch-ribbon-aperture"><path data-ribbon-mask="" /></clipPath>
      <linearGradient id="patch-ribbon-face" x2=".7" y2="1"><stop stopColor="var(--route-light)"/><stop offset=".45" stopColor="var(--route-shadow)"/><stop offset=".66" stopColor="var(--route-light)"/><stop offset="1" stopColor="var(--route-shadow)"/></linearGradient>
    </defs>
    <image href={image} clipPath="url(#patch-ribbon-aperture)" preserveAspectRatio="xMidYMid meet" style={{opacity:0}} />
    <path data-ribbon-stroke="" className="patch-ribbon-shadow" transform="translate(5 12)"/>
    <path data-ribbon-stroke="" className="patch-ribbon-edge"/>
    <path data-ribbon-stroke="" className="patch-ribbon-face"/>
    <path data-ribbon-stroke="" className="patch-ribbon-crease" transform="translate(2 -3)"/>
  </svg>;
}
