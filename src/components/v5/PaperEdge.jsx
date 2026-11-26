const edges = {
  torn: 'M0 39 29 31 59 43 91 24 127 30 162 23 190 27 213 12 249 15 270 24 310 13 347 21 381 16 425 31 466 27 501 43 532 36 570 46 607 30 641 35 682 23 724 37 760 28 787 38 836 29 870 40 913 24 941 36 980 24 1021 35 1061 42 1105 34 1156 44 1180 34 1227 37 1268 23 1304 28 1329 17 1368 23 1409 12 1440 20',
  wave: 'M0 48 C103 48 173 17 261 31 S426 56 522 34 676 9 762 26 897 54 1004 32 1153 14 1237 28 1377 48 1440 28',
};

export function PaperEdge({ kind = 'torn' }) {
  const path = edges[kind];
  return (
    <svg className={`signal-paper-edge signal-paper-edge-${kind}`} viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden="true">
      <path d={`${path} L1440 64 H0 Z`} fill="currentColor" />
      <path className="signal-perforation" d={path} pathLength="100" fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
