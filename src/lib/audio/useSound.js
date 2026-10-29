import { useSyncExternalStore } from 'react';
import { siteAudio } from './siteAudio';
export const useSound=()=>useSyncExternalStore(siteAudio.subscribe,siteAudio.getSnapshot,siteAudio.getSnapshot);
