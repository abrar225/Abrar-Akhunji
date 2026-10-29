from pathlib import Path
from PIL import Image
import json,hashlib
root=Path('public/assets/build-room');entries=[]
for p in sorted(root.rglob('*')):
 if not p.is_file() or p.name=='manifest.json':continue
 rel=p.relative_to(root).as_posix();row={'path':'/assets/build-room/'+rel,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()}
 if p.suffix.lower() in ['.jpg','.png','.webp']:
  with Image.open(p) as im:row['dimensions']=[im.width,im.height]
 if rel.startswith('posters/') or rel.startswith('og-'):row.update(source='Original shared Three.js Build Room model and actual project captures',purpose='Responsive scene fallback' if rel.startswith('posters/') else 'Social image',theme='dark' if '-dark-' in rel else 'light')
 elif rel.startswith('materials/'):row.update(source='Built-in image generation; prompt saved in docs/implementation/material-prompt.md',purpose='Original mineral paper surface',theme='light')
 elif 'packetlark' in rel:row.update(source='https://github.com/abrar225/packetlark/blob/main/assets/preview.png',purpose='Actual repository product preview',theme='product')
 elif 'fixo-flow' in rel:row.update(source='https://github.com/abrar225/FixoFlow/tree/main/docs/images',purpose='Actual product capture or explicitly labelled screenshot interface tour',theme='product')
 elif 'framecast' in rel:row.update(source='Local Framecast development capture: research/completion-pass/editor-wide.png',purpose='Actual development interface, not a public release',theme='product')
 elif rel.startswith('fonts/'):row.update(source='Google Fonts; OFL license files included',purpose='Self-hosted font subset',theme='shared')
 elif rel=='portrait.webp':row.update(source='Existing public/images/myimg.webp',purpose='Authentic portrait derivative',theme='shared')
 else:row.update(source='Original procedural geometry in src/lib/build-room/sceneFactory.js',purpose='Reusable model or render measurements',theme='shared')
 entries.append(row)
(root/'manifest.json').write_text(json.dumps({'version':1,'generated':'2026-10-28','assets':entries},indent=2)+'\n')
print(len(entries),'assets documented')
