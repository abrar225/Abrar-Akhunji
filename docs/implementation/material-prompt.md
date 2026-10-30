# Original material generation

Generated with the built-in image-generation tool for the Build Room design. Prompt intent: an original seamless, fine ivory paper-grain texture in mineral white (#EEF1ED), evenly lit, with no objects, writing, symbols, branding, vignette or directional shadows. The output was visually inspected before use as a decorative material; it contains no project evidence.

The editable source is `public/assets/build-room/materials/paper-source.png`; the optimized derivative is `paper.webp`. The original tool output was `/Users/abrarakhunji/.codex/generated_images/01a17e81-2d5c-7de0-8e2c-19984b150cc3/exec-d9bdebca-0068-42f4-8ccf-5667ee447783.png`.

All product screens and the portrait are authentic source images recorded in the asset manifest, not generated evidence. Live geometry is authored in `src/lib/build-room/sceneFactory.js`. Run `npm run assets:render` while the local Vite server is running, then `npm run assets:optimize`, to regenerate posters, the model, social images and provenance metadata. The renderer uses the same materials and camera definitions as the live site. The exported GLB preserves the separately named moving nodes and omits screenshot texture maps; the live scene supplies those textures explicitly.
