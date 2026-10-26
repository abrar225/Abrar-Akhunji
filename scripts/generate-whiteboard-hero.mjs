import { chromium } from 'playwright';
import path from 'path';

const outputPath = path.resolve('public/images/blog/flashmap-flow-map-speculative-decoding/hero.jpg');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Caveat:wght@600;700&family=Fira+Code:wght@500;600;700&family=Inter:wght@700;800&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    background-color: #14161E;
    color: #E2E8F0;
    font-family: 'Architects Daughter', cursive, sans-serif;
    position: relative;
  }

  /* Faint blackboard grid */
  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
  }

  /* Chalk dust and eraser smudges */
  .chalk-smudge-1 {
    position: absolute;
    top: 120px;
    left: 450px;
    width: 600px;
    height: 350px;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 50%, transparent 80%);
    transform: rotate(-12deg);
    pointer-events: none;
  }

  .chalk-smudge-2 {
    position: absolute;
    bottom: 100px;
    right: 300px;
    width: 700px;
    height: 400px;
    background: radial-gradient(ellipse at center, rgba(0, 245, 255, 0.03) 0%, rgba(255, 215, 0, 0.02) 40%, transparent 75%);
    transform: rotate(8deg);
    pointer-events: none;
  }

  /* Main SVG Canvas for Rough.js */
  #rough-svg {
    position: absolute;
    inset: 0;
    width: 1920px;
    height: 1080px;
    pointer-events: none;
    z-index: 2;
  }

  /* Content Overlay */
  .board-content {
    position: absolute;
    inset: 0;
    z-index: 10;
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
  }

  /* Blackboard Header */
  .board-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 25px;
  }

  .board-title-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .board-lab-tag {
    font-family: 'Fira Code', monospace;
    font-size: 13px;
    letter-spacing: 2px;
    color: #94A3B8;
    text-transform: uppercase;
  }

  .board-title {
    font-family: 'Caveat', cursive;
    font-size: 44px;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: 0.5px;
    text-shadow: 0 0 12px rgba(255,255,255,0.3);
  }

  .board-subtitle {
    font-family: 'Fira Code', monospace;
    font-size: 14px;
    color: #00F5FF;
    letter-spacing: 1px;
  }

  /* Two Hand-Placed Sticky Notes */
  .sticky-yellow {
    position: absolute;
    top: 35px;
    right: 380px;
    width: 320px;
    background: #FEF08A;
    color: #1E293B;
    padding: 18px 20px;
    box-shadow: 0 12px 25px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.2);
    transform: rotate(-2.8deg);
    z-index: 50;
    border-radius: 2px;
  }

  .sticky-yellow::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: radial-gradient(circle at 35% 35%, #EF4444, #991B1B);
    border-radius: 50%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.4);
  }

  .sticky-blue {
    position: absolute;
    top: 40px;
    right: 50px;
    width: 300px;
    background: #BAE6FD;
    color: #0F172A;
    padding: 18px 20px;
    box-shadow: 0 12px 25px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.2);
    transform: rotate(2.2deg);
    z-index: 50;
    border-radius: 2px;
  }

  .sticky-blue::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: radial-gradient(circle at 35% 35%, #0284C7, #0369A1);
    border-radius: 50%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.4);
  }

  .sticky-text {
    font-family: 'Caveat', cursive;
    font-size: 20px;
    line-height: 1.35;
    font-weight: 700;
  }

  /* Three Columns Architecture Container */
  .columns-container {
    display: grid;
    grid-template-columns: 1fr 1.35fr 1fr;
    gap: 36px;
    flex: 1;
    margin-top: 5px;
  }

  .col-box {
    display: flex;
    flex-direction: column;
    padding: 24px 22px;
    position: relative;
  }

  .col-title {
    font-family: 'Caveat', cursive;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .col-subtitle {
    font-family: 'Fira Code', monospace;
    font-size: 11.5px;
    margin-bottom: 16px;
    letter-spacing: 0.5px;
  }

  /* Color themes for chalk columns */
  .col-white .col-title { color: #FFFFFF; text-shadow: 0 0 8px rgba(255,255,255,0.4); }
  .col-white .col-subtitle { color: #94A3B8; }

  .col-cyan .col-title { color: #00F5FF; text-shadow: 0 0 10px rgba(0,245,255,0.4); }
  .col-cyan .col-subtitle { color: #38BDF8; }

  .col-yellow .col-title { color: #FFD700; text-shadow: 0 0 10px rgba(255,215,0,0.4); }
  .col-yellow .col-subtitle { color: #FCD34D; }

  /* Chalk items inside columns */
  .chalk-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px dashed rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    padding: 12px 14px;
    margin-bottom: 14px;
    font-family: 'Fira Code', monospace;
    font-size: 12.5px;
  }

  .token-slots-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    margin-top: 8px;
  }

  .token-slot {
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.04);
    border-radius: 4px;
    padding: 6px 4px;
    text-align: center;
    font-family: 'Fira Code', monospace;
    font-size: 11px;
    color: #E2E8F0;
  }

  .token-slot.active {
    border-color: #00F5FF;
    color: #00F5FF;
    background: rgba(0, 245, 255, 0.08);
  }

  /* Math chalk box */
  .math-chalk {
    font-family: 'Caveat', cursive;
    font-size: 25px;
    line-height: 1.4;
    color: #FFFFFF;
    background: rgba(0, 0, 0, 0.25);
    border: 1px dashed rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    padding: 14px 18px;
    margin-top: 10px;
    text-shadow: 0 0 6px rgba(255,255,255,0.25);
  }

  .math-cyan { color: #00F5FF; text-shadow: 0 0 8px rgba(0,245,255,0.3); }
  .math-yellow { color: #FFD700; text-shadow: 0 0 8px rgba(255,215,0,0.3); }
  .math-red { color: #FF3366; text-shadow: 0 0 8px rgba(255,51,102,0.3); }

  /* Flow velocity diagram */
  .flow-viz {
    margin: 10px 0;
    padding: 10px;
    background: rgba(0, 245, 255, 0.03);
    border-radius: 6px;
    border: 1px solid rgba(0, 245, 255, 0.15);
    font-family: 'Fira Code', monospace;
    font-size: 12px;
  }

  .flow-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0;
  }

  /* Telemetry Chip at bottom right */
  .board-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    padding-top: 12px;
    border-top: 1px dashed rgba(255, 255, 255, 0.12);
  }

  .board-notes {
    font-family: 'Caveat', cursive;
    font-size: 21px;
    color: #94A3B8;
  }

  .telemetry-chip {
    font-family: 'Fira Code', monospace;
    font-size: 12px;
    font-weight: 700;
    color: #10B981;
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid #10B981;
    padding: 6px 16px;
    border-radius: 20px;
    box-shadow: 0 0 12px rgba(16, 185, 129, 0.25);
  }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/rough.js/3.1.0/rough.js"></script>
</head>
<body>

  <div class="grid-overlay"></div>
  <div class="chalk-smudge-1"></div>
  <div class="chalk-smudge-2"></div>

  <!-- SVG for Rough.js Hand-Drawn Excalidraw-like Chalk Lines -->
  <svg id="rough-svg"></svg>

  <div class="board-content">
    
    <!-- Header -->
    <div class="board-header">
      <div class="board-title-group">
        <div class="board-lab-tag">// SYSTEMS RESEARCH WHITEBOARD — STANFORD / USC / FLATIRON</div>
        <div class="board-title">FlashMap: Flow Map Speculative Decoding</div>
        <div class="board-subtitle">Continuous Flow Matching ODEs vs. Factorized Block Diffusion Suffix Decay</div>
      </div>
    </div>

    <!-- Sticky Notes -->
    <div class="sticky-yellow">
      <div class="sticky-text">
        ⚠️ Warning: Factorized block drafting ignores token covariance Cov(y_i, y_j), causing catastrophic suffix decay after token 2!
      </div>
    </div>

    <div class="sticky-blue">
      <div class="sticky-text">
        💡 Tip: 1-step straight-path Euler ODE eliminates drafter KV cache while delivering 6.1x lossless speedup.
      </div>
    </div>

    <!-- 3 Columns Architecture -->
    <div class="columns-container">

      <!-- Column 1: Left (White Chalk) -->
      <div class="col-box col-white" id="box-col-1">
        <div class="col-title">① Context & Noise Prior</div>
        <div class="col-subtitle">Target Hidden State + Gaussian Base Latent</div>

        <div class="chalk-card">
          <span style="color:#94A3B8;">Target Context History:</span><br>
          <strong style="color:#FFF;">h_target ∈ ℝ^(L × d_model)</strong><br>
          <span style="color:#64748B;">[Zero Drafter KV Cache Footprint]</span>
        </div>

        <div class="chalk-card">
          <span style="color:#94A3B8;">Base Noise Prior:</span><br>
          <strong style="color:#00F5FF;">z₀ ∼ 𝒩(0, I) ∈ ℝ^(K × d_model)</strong>
          <div class="token-slots-grid">
            <div class="token-slot">z₀[1]</div>
            <div class="token-slot">z₀[2]</div>
            <div class="token-slot">z₀[3]</div>
            <div class="token-slot">z₀[4]</div>
            <div class="token-slot">z₀[5]</div>
            <div class="token-slot">z₀[6]</div>
            <div class="token-slot">z₀[7]</div>
            <div class="token-slot">z₀[8]</div>
          </div>
        </div>

        <div class="math-chalk">
          <span class="math-red">The Factorization Trap:</span><br>
          p(y₁:K | h) ≈ ∏ p(y_k | h) 💥<br>
          <span style="font-size: 19px; color: #94A3B8;">Suffix decay: Acceptance drops from 88% down to 18% at pos 6.</span>
        </div>
      </div>

      <!-- Column 2: Center (Vivid Cyan Chalk) -->
      <div class="col-box col-cyan" id="box-col-2">
        <div class="col-title">② Continuous Flow Map Drafter</div>
        <div class="col-subtitle">ODE Velocity Field with Non-Causal Token Coupling</div>

        <div class="chalk-card" style="border-color: rgba(0,245,255,0.3); background: rgba(0,245,255,0.02);">
          <span style="color:#38BDF8;">Continuous Vector Field Network:</span><br>
          <strong style="color:#00F5FF;">v_θ(z_t, t | h_target) : ℝ^(K×d) → ℝ^(K×d)</strong><br>
          <span style="color:#94A3B8;">Bidirectional cross & self-attention over all K slots</span>
        </div>

        <div class="math-chalk">
          <span class="math-cyan">1-Step Euler ODE Integration:</span><br>
          dz_t / dt = v_θ(z_t, t | h_target)<br>
          z₁ = z₀ + v_θ(z₀, 0 | h_target)<br><br>
          <span class="math-yellow">Flow Matching Loss Objective:</span><br>
          ℒ_FM = 𝔼_{t, x₀, x₁} ‖ v_θ(z_t, t | h) - (x₁ - x₀) ‖²
        </div>

        <div class="flow-viz">
          <div class="flow-row">
            <span style="color:#94A3B8;">Pos 1..3:</span>
            <span style="color:#00F5FF;">"def calculate_" ➔ "_total"</span>
            <span style="color:#10B981;">[93% Acc]</span>
          </div>
          <div class="flow-row">
            <span style="color:#94A3B8;">Pos 4..6:</span>
            <span style="color:#00F5FF;">"(items):" ➔ "\\n return"</span>
            <span style="color:#10B981;">[74% Acc]</span>
          </div>
          <div class="flow-row">
            <span style="color:#94A3B8;">Pos 7..8:</span>
            <span style="color:#00F5FF;">"sum(items)" ➔ "\\n"</span>
            <span style="color:#10B981;">[61% Acc]</span>
          </div>
        </div>
      </div>

      <!-- Column 3: Right (Electric Yellow Chalk) -->
      <div class="col-box col-yellow" id="box-col-3">
        <div class="col-title">③ Target Speculative Verification</div>
        <div class="col-subtitle">Batched Lossless Rejection Sampling on Target LLM</div>

        <div class="chalk-card" style="border-color: rgba(255,215,0,0.3); background: rgba(255,215,0,0.02);">
          <span style="color:#FCD34D;">Verification Forward Pass:</span><br>
          <strong style="color:#FFD700;">Target LLM evaluates all K candidate tokens</strong><br>
          <span style="color:#94A3B8;">FlashInfer Tree-Attention Kernel (1 batch)</span>
        </div>

        <div class="math-chalk">
          <span class="math-yellow">Distribution Preservation:</span><br>
          α_k = min(1, P_target(y_k) / P_draft(y_k))<br><br>
          <span style="color:#10B981;">P_accepted(y) ≡ P_target(y)</span><br>
          <span style="font-size: 19px; color: #E2E8F0;">Mathematically lossless. Zero perplexity drift.</span>
        </div>

        <div class="chalk-card" style="margin-top: 10px;">
          <span style="color:#94A3B8;">Production Deployment:</span><br>
          • Plugs into <strong style="color:#00F5FF;">vLLM</strong> & <strong style="color:#10B981;">SGLang</strong><br>
          • Reuses PagedAttention target KV cache<br>
          • <strong style="color:#FFD700;">MATL: 4.92 tokens/step (6.1x Speedup)</strong>
        </div>
      </div>

    </div>

    <!-- Board Footer -->
    <div class="board-footer">
      <div class="board-notes">
        ✏️ Schematic by Abrar Akhunji // abrarakhunji.com // arXiv:2610.24365 Speculative Decoding
      </div>
      <div class="telemetry-chip">
        ⚡ BENCHMARK: 6.12× Wall-Clock Speedup | MATL 4.92 tok/step | 0% Suffix Decay | p99 ITL &lt; 14ms
      </div>
    </div>

  </div>

  <script>
    window.addEventListener('DOMContentLoaded', () => {
      const svg = document.getElementById('rough-svg');
      const rc = rough.svg(svg);

      // Function to draw rough rectangle around elements
      function drawRoughBox(x, y, w, h, color, fillStyle = 'none') {
        const node = rc.rectangle(x, y, w, h, {
          roughness: 1.5,
          bowing: 1.8,
          stroke: color,
          strokeWidth: 2.2,
          fill: fillStyle !== 'none' ? color : undefined,
          fillStyle: fillStyle,
          fillWeight: 0.5,
          hachureGap: 8
        });
        svg.appendChild(node);
      }

      // Draw hand-drawn borders for Column 1, 2, 3
      // Left Box
      drawRoughBox(55, 125, 560, 840, 'rgba(255, 255, 255, 0.45)');

      // Center Box (Vivid Cyan)
      drawRoughBox(645, 125, 625, 840, '#00F5FF');

      // Right Box (Electric Yellow)
      drawRoughBox(1300, 125, 565, 840, '#FFD700');

      // Connecting Chalk Arrows
      // Arrow from Col 1 to Col 2
      const arrow1 = rc.line(615, 380, 645, 380, { stroke: '#00F5FF', strokeWidth: 3, roughness: 1.5 });
      const arrow1Head1 = rc.line(635, 372, 645, 380, { stroke: '#00F5FF', strokeWidth: 3 });
      const arrow1Head2 = rc.line(635, 388, 645, 380, { stroke: '#00F5FF', strokeWidth: 3 });
      svg.appendChild(arrow1);
      svg.appendChild(arrow1Head1);
      svg.appendChild(arrow1Head2);

      // Arrow from Col 2 to Col 3
      const arrow2 = rc.line(1270, 380, 1300, 380, { stroke: '#FFD700', strokeWidth: 3, roughness: 1.5 });
      const arrow2Head1 = rc.line(1290, 372, 1300, 380, { stroke: '#FFD700', strokeWidth: 3 });
      const arrow2Head2 = rc.line(1290, 388, 1300, 380, { stroke: '#FFD700', strokeWidth: 3 });
      svg.appendChild(arrow2);
      svg.appendChild(arrow2Head1);
      svg.appendChild(arrow2Head2);

      // Feedback verification loop arrow at the bottom
      const loop = rc.curve([[1450, 890], [1300, 930], [950, 930], [600, 930], [350, 890]], {
        stroke: '#10B981',
        strokeWidth: 2,
        roughness: 1.8
      });
      svg.appendChild(loop);
    });
  </script>
</body>
</html>`;

async function renderWhiteboard() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });

  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: outputPath,
    type: 'jpeg',
    quality: 95
  });

  await browser.close();
  console.log('✅ Research Whiteboard hero image rendered successfully at:', outputPath);
}

renderWhiteboard().catch(err => {
  console.error('❌ Failed to render whiteboard:', err);
  process.exit(1);
});
