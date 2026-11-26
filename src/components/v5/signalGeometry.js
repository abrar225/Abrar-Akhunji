export const SIGNAL_RINGS = 144;
export const SIGNAL_SIDES = 28;

export function signalPoint(ring, side) {
  const t = ring / SIGNAL_RINGS * Math.PI * 2;
  const angle = side / SIGNAL_SIDES * Math.PI * 2;
  const radius = 1.23 + .48 * Math.cos(3 * t);
  const tube = .31 + .1 * Math.sin(3 * t + .4);
  const edge = radius + tube * Math.cos(angle);
  return [
    edge * Math.cos(2 * t),
    edge * Math.sin(2 * t),
    .59 * Math.sin(3 * t) + tube * Math.sin(angle),
  ];
}

export function signalTone(ring, side) {
  const light = .5 + .5 * Math.sin(side / SIGNAL_SIDES * Math.PI * 2 + 1.8);
  const highlight = (ring > 45 && ring < 74) || (ring > 106 && ring < 119);
  const shade = highlight ? [190, 213, 159] : [112, 160, 241];
  return shade.map((value) => Math.round(value + (255 - value) * light));
}
