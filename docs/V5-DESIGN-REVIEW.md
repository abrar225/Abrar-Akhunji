# Signal Field · Version 5 design review

The review uses the pinned releases in the [version manifest](../versions/manifest.json). It is a source-based critique of the shipped layouts, interaction code, and project paths. At review time the four archive URLs on the public domain returned 404 responses.

## What each version taught us

| Version | What worked | Where a recruiter could lose the thread | V5 response |
| --- | --- | --- | --- |
| 1 · Serif Studio | Oversized serif typography and personal editorial writing made the site feel authored. Selected work, experience, education, and skills were recognizable categories. | About preceded selected work in the homepage flow. The custom cursor, floating dock, 3D background, and chat all asked for attention before the portfolio established a clear hierarchy of evidence. | Put the name, role, résumé, and work entry on the first screen. Let the surrounding interface stay quiet enough for the type to lead. |
| 2 · Terminal Pulse | The CyberTerminal, keyboard shortcuts, sound, and project modals gave an engineering portfolio a coherent technical personality. The separate blog gave long-form work room. | The terminal hid its interactions behind a launcher or shortcut. Project modals made the details part of an interaction state, which gave an individual build a weaker destination. Sound and custom interaction increased the number of cues competing for attention. | Use ordinary, visible navigation and stable case-study URLs. Keep sound out of the page chrome and reserve expressive motion for the transitions that orient the visitor. |
| 3 · Halide Signal | The staged ASCII hero and optical styling built anticipation. Direct work and résumé actions, the separate hiring route, and the blog platform gave the experience more substance. | “Engineer of Intelligent Systems” set a mood but left the visitor to translate it into a discipline. The animated foreground, staged typography, and interactive river all consumed attention that could go to a product or decision. | State the role and output in plain language. Let the point sculpture provide the spectacle. Use direct links for project and hiring paths. |
| 4 · Build Room | The guided 3D room made the projects feel like objects. The strongest sequence was problem, interface, architecture, and delivery evidence. The contribution city and Agents at Work gave curious visitors reasons to stay. | The sticky world, scene phases, camera controls, and inspection states rewarded exploration. They also lengthened the path from portfolio arrival to an engineering decision. Some chapters used scale and scroll distance that worked better on desktop. | Keep the 3D work in an independent stage. Put project switching, the architecture preview, and source links directly in the document flow. Keep Agents at Work available as a dedicated experience. |

## Where Contact Sheet split

The outgoing V5 applied its blue contact sheet and editorial chrome only at the root path. The work index, case studies, blog, and other pages mounted the older V4 navigation, effects, and footer. Signal Field uses one header, navigation model, page palette, and footer across the React routes. The dedicated Agents at Work entry and static 404 use the same visual language.

## Motion direction

The original Three.js sculpture is built from a parametric point cloud. It responds to the pointer, can pause, and stops drawing continuously offscreen or in a hidden tab. Its still render provides the same composition for reduced motion, data saving, and WebGL fallback. GSAP introduces the homepage identity. The project image lift and short selection transitions signal changes without taking over scroll.

- Cuetone’s compact menu and separate showreel suggest a clear distinction between orienting visitors and giving them a performance. [Cuetone](https://cuetone.co.nz/)
- Huxley Saga pairs a title sequence and cinematic product cards. The useful principle is to give the opening a strong identity and give the work its own visual beat. [Awwwards](https://www.awwwards.com/sites/huxley-saga)
- React Bits and PixelFX were reference catalogs for scoped effects. The implementation uses the repository’s existing GSAP, Three.js, and Lucide dependencies and draws its own geometry. [React Bits](https://reactbits.dev/) · [PixelFX](https://github.com/patch-gg/pixelfx)
