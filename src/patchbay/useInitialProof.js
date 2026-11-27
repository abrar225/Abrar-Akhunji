import { useEffect, useState } from 'react';

export function useInitialProof(image) {
  const [pending, setPending] = useState(() => {
    try { return !sessionStorage.getItem('patchbay-arrived'); } catch { return true; }
  });
  useEffect(() => {
    if (!pending) return;
    const proof = new Image();
    proof.src = image;
    const finish = () => {
      setPending(false);
      try { sessionStorage.setItem('patchbay-arrived', '1'); } catch { /* optional */ }
    };
    const deadline = setTimeout(finish, 2000);
    let available = true;
    Promise.allSettled([proof.decode(), document.fonts.load('700 1rem "Patch Display"')]).then(() => {
      if (available) finish();
    });
    return () => {
      available = false;
      clearTimeout(deadline);
    };
  }, [image, pending]);
  return [pending, () => {
    setPending(false);
    try { sessionStorage.setItem('patchbay-arrived', '1'); } catch { /* optional */ }
  }];
}
