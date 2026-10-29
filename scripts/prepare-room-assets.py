from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
from fontTools.ttLib import TTFont
import json
root=Path('public/assets/build-room')
for p in (root/'posters').glob('*.png'):
 im=Image.open(p).convert('RGBA');im.save(p.with_suffix('.webp'),quality=83)
for name in ['display-bold','body-regular']:
 font=TTFont(root/'fonts'/f'{name}.woff2');font.flavor=None;font.save(f'/tmp/zero-{name}.ttf')
font=ImageFont.truetype('/tmp/zero-display-bold.ttf',76);body=ImageFont.truetype('/tmp/zero-body-regular.ttf',27)
data=json.loads(Path('src/data/portfolio.json').read_text())
for p in [None]+data['projects']:
 im=Image.new('RGB',(1200,630),'#e8ebe2');d=ImageDraw.Draw(im)
 path=root/'posters/room-light-desktop.png' if p is None else Path('public'+p['image'])
 # Existing CLI vector is rendered with CairoSVG only for the social image.
 if path.suffix=='.svg':
  raw=Image.open(root/'posters/room-light-desktop.png').convert('RGBA');source=Image.new('RGBA',raw.size,'#e8ebe2');source.alpha_composite(raw);source=source.convert('RGB')
 else:
  raw=Image.open(path).convert('RGBA');source=Image.new('RGBA',raw.size,'#e8ebe2');source.alpha_composite(raw);source=source.convert('RGB')
 source.thumbnail((590,460));im.paste(source,(600+(590-source.width)//2,(630-source.height)//2))
 title='Zero to built.' if p is None else p['title'];words=title.split();lines=[];line=''
 for w in words:
  test=(line+' '+w).strip()
  if d.textlength(test,font=font)>535 and line:lines.append(line);line=w
  else:line=test
 lines.append(line)
 d.text((48,55),'Abrar Akhunji',fill='#2548f4',font=body)
 for i,l in enumerate(lines):d.text((48,150+i*85),l,fill='#20251f',font=font)
 d.text((48,548),'AI & Full-Stack Engineer',fill='#20251f',font=body)
 im.save(root/('og-home.jpg' if p is None else 'og-'+p['slug']+'.jpg'),quality=85)
p=Path('src/data/portfolio.json');data['projects'][0]['media']={'mp4':'/assets/build-room/products/fixo-flow-tour.mp4','webm':'/assets/build-room/products/fixo-flow-tour.webm','captions':'/assets/build-room/products/fixo-flow-tour.vtt'};p.write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n')
(root/'products/fixo-flow-tour.vtt').write_text('WEBVTT\n\n00:00.000 --> 00:04.000\nActual Fixo Flow writing styles screen. Interface tour from screenshots; not live recognition.\n\n00:04.000 --> 00:08.000\nActual preferences interface. English dictation preview. Consult the source for limitations.\n')
print('11 social images and tour metadata generated')
