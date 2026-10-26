import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const outputPath = path.resolve('public/images/blog/flashmap-flow-map-speculative-decoding/hero.jpg');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Caveat:wght@700&family=Inter:wght@400;600;800&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    background-color: #0A0E17;
    background-image: 
      linear-gradient(to right, rgba(22, 32, 50, 0.45) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(22, 32, 50, 0.45) 1px, transparent 1px);
    background-size: 20px 20px;
    color: #E2E8F0;
    font-family: 'Fira Code', monospace;
    position: relative;
  }

  /* Header Stamp */
  .header-stamp {
    position: absolute;
    top: 40px;
    left: 50px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    z-index: 10;
  }

  .stamp-tag {
    font-size: 13px;
    letter-spacing: 2.5px;
    color: #00F5FF;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .stamp-tag::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #00F5FF;
    border-radius: 50%;
    box-shadow: 0 0 10px #00F5FF;
  }

  .stamp-title {
    font-family: 'Inter', sans-serif;
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: #FFFFFF;
    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  }

  .stamp-subtitle {
    font-size: 14px;
    color: #94A3B8;
  }

  /* Pinned Sticky Note */
  .sticky-note {
    position: absolute;
    top: 36px;
    right: 60px;
    width: 380px;
    background: #FEF08A;
    color: #1E293B;
    padding: 20px 24px;
    border-radius: 3px;
    box-shadow: -5px 15px 30px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.2);
    transform: rotate(2.2deg);
    z-index: 20;
    border: 1px solid rgba(0,0,0,0.08);
  }

  .sticky-pin {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 24px;
    background: radial-gradient(circle at 35% 35%, #EF4444, #991B1B);
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0,0,0,0.4);
  }

  .sticky-pin::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 6px;
    height: 6px;
    background: rgba(255,255,255,0.7);
    border-radius: 50%;
  }

  .sticky-tag {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #854D0E;
    margin-bottom: 8px;
    text-transform: uppercase;
  }

  .sticky-text {
    font-family: 'Caveat', cursive;
    font-size: 21px;
    line-height: 1.35;
    color: #0F172A;
    font-weight: 700;
  }

  /* Main 3-Column Architecture Canvas */
  .canvas-grid {
    position: absolute;
    top: 155px;
    left: 50px;
    right: 50px;
    bottom: 120px;
    display: grid;
    grid-template-columns: 1fr 1.3fr 1fr;
    gap: 30px;
  }

  .col-card {
    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
  }

  .col-card.laser-crimson {
    border: 1px solid rgba(255, 51, 102, 0.4);
    box-shadow: 0 0 25px rgba(255, 51, 102, 0.12), inset 0 0 15px rgba(255, 51, 102, 0.05);
  }

  .col-card.electric-cyan {
    border: 1px solid rgba(0, 245, 255, 0.4);
    box-shadow: 0 0 30px rgba(0, 245, 255, 0.14), inset 0 0 20px rgba(0, 245, 255, 0.05);
  }

  .col-card.amber-mint {
    border: 1px solid rgba(0, 230, 118, 0.4);
    box-shadow: 0 0 25px rgba(0, 230, 118, 0.12), inset 0 0 15px rgba(0, 230, 118, 0.05);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
    padding-bottom: 12px;
    border-bottom: 1px dashed rgba(255,255,255,0.1);
  }

  .card-badge {
    font-size: 11px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 4px;
    letter-spacing: 1px;
  }

  .badge-red {
    background: rgba(255, 51, 102, 0.18);
    color: #FF3366;
    border: 1px solid #FF3366;
  }

  .badge-cyan {
    background: rgba(0, 245, 255, 0.18);
    color: #00F5FF;
    border: 1px solid #00F5FF;
  }

  .badge-mint {
    background: rgba(0, 230, 118, 0.18);
    color: #00E676;
    border: 1px solid #00E676;
  }

  .card-stage-title {
    font-size: 17px;
    font-weight: 700;
    color: #FFFFFF;
    font-family: 'Inter', sans-serif;
  }

  .card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .module-box {
    background: rgba(10, 14, 23, 0.85);
    border-radius: 8px;
    padding: 14px 16px;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .module-label {
    font-size: 11px;
    color: #64748B;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }

  .module-value {
    font-size: 13.5px;
    font-weight: 600;
    color: #F1F5F9;
    line-height: 1.4;
  }

  .chalk-box {
    background: rgba(10, 14, 23, 0.95);
    border: 1px dashed rgba(226, 232, 240, 0.3);
    border-radius: 8px;
    padding: 14px 16px;
    font-family: 'Fira Code', monospace;
    font-size: 13px;
    color: #E2E8F0;
    line-height: 1.5;
  }

  .chalk-highlight-red {
    color: #FF3366;
    font-weight: 700;
  }

  .chalk-highlight-cyan {
    color: #00F5FF;
    font-weight: 700;
  }

  .chalk-highlight-mint {
    color: #00E676;
    font-weight: 700;
  }

  .chalk-highlight-amber {
    color: #FFB000;
    font-weight: 700;
  }

  .decay-bar-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 6px;
  }

  .decay-row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11.5px;
  }

  .decay-label {
    width: 60px;
    color: #94A3B8;
  }

  .decay-bar-bg {
    flex: 1;
    height: 12px;
    background: rgba(255,255,255,0.06);
    border-radius: 3px;
    overflow: hidden;
  }

  .decay-bar-fill-red {
    height: 100%;
    background: linear-gradient(90deg, #FF3366, #EF4444);
    border-radius: 3px;
  }

  .decay-bar-fill-mint {
    height: 100%;
    background: linear-gradient(90deg, #00E676, #10B981);
    border-radius: 3px;
  }

  .decay-val {
    width: 48px;
    text-align: right;
    font-weight: 700;
  }

  /* Highway indicators */
  .highway-bar {
    position: absolute;
    bottom: 50px;
    left: 50px;
    right: 50px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 0 20px;
  }

  .highway-step {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    font-weight: 600;
  }

  .step-num {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 800;
  }

  .step-num.cyan { background: #00F5FF; color: #0A0E17; }
  .step-num.amber { background: #FFB000; color: #0A0E17; }
  .step-num.mint { background: #00E676; color: #0A0E17; }
  .step-num.red { background: #FF3366; color: #FFFFFF; }

  .highway-arrow {
    color: #475569;
    font-size: 14px;
  }

  /* Telemetry Chip */
  .telemetry-chip {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(0, 230, 118, 0.15);
    border: 1px solid #00E676;
    border-radius: 20px;
    padding: 6px 16px;
    color: #00E676;
    font-size: 12px;
    font-weight: 700;
    box-shadow: 0 0 15px rgba(0, 230, 118, 0.2);
  }

  .telemetry-chip span {
    color: #FFFFFF;
    font-weight: 500;
  }
</style>
</head>
<body>

  <!-- Top Left Stamp -->
  <div class="header-stamp">
    <div class="stamp-tag">[ ABRAR.DEV // ARCHITECTURAL SCHEMATIC ]</div>
    <div class="stamp-title">FLASHMAP: FLOW MAP SPECULATIVE DECODING</div>
    <div class="stamp-subtitle">Continuous Flow Matching Drafter // Joint Positional Coupling // arXiv:2610.24365</div>
  </div>

  <!-- Pinned Sticky Note -->
  <div class="sticky-note">
    <div class="sticky-pin"></div>
    <div class="sticky-tag">Senior Architect Rule</div>
    <div class="sticky-text">
      "Factorized block drafting is a trap. Independent position sampling ignores token correlations, killing acceptance after token 2. Continuous Flow Maps model the joint distribution in 1 forward pass!"
    </div>
  </div>

  <!-- Canvas Grid: 3 Columns -->
  <div class="canvas-grid">

    <!-- Column 1: The Trap (Laser Crimson) -->
    <div class="col-card laser-crimson">
      <div class="card-header">
        <span class="card-stage-title">① The Architectural Trap</span>
        <span class="card-badge badge-red">FACTORIZATION COLLAPSE</span>
      </div>
      <div class="card-body">
        <div class="module-box">
          <div class="module-label">Baseline Block Diffusion (DFlash)</div>
          <div class="module-value">
            Assumes conditional independence across block positions:
          </div>
        </div>

        <div class="chalk-box">
          <span class="chalk-highlight-red">p(y₁...yₖ | h) ≈ ∏ p(yᵢ | h)</span><br><br>
          <span style="color:#94A3B8;">// Fatal flaw: ignores Cov(yᵢ, yⱼ)</span><br>
          Token 2: <span class="chalk-highlight-mint">"def calculate_"</span> [OK]<br>
          Token 3: <span class="chalk-highlight-red">"(x):"</span> [FAIL: expected "total(x):"]<br>
          Token 4: <span class="chalk-highlight-red">"pass"</span> [REJECTED CASCADE]
        </div>

        <div class="module-box">
          <div class="module-label">Suffix Decay Acceptance Profile</div>
          <div class="decay-bar-container">
            <div class="decay-row">
              <span class="decay-label">Pos 1</span>
              <div class="decay-bar-bg"><div class="decay-bar-fill-red" style="width: 88%;"></div></div>
              <span class="decay-val" style="color: #FF3366;">88%</span>
            </div>
            <div class="decay-row">
              <span class="decay-label">Pos 3</span>
              <div class="decay-bar-bg"><div class="decay-bar-fill-red" style="width: 48%;"></div></div>
              <span class="decay-val" style="color: #FF3366;">48%</span>
            </div>
            <div class="decay-row">
              <span class="decay-label">Pos 6</span>
              <div class="decay-bar-bg"><div class="decay-bar-fill-red" style="width: 18%;"></div></div>
              <span class="decay-val" style="color: #FF3366;">18%</span>
            </div>
          </div>
        </div>

        <div class="module-box" style="border-color: rgba(255,51,102,0.3);">
          <div class="module-label" style="color:#FF3366;">Bottleneck Outcome</div>
          <div class="module-value" style="font-size:12px;">
            Target LLM rejects 65%+ of draft block; mean accepted length stalls at &lt; 2.6 tokens.
          </div>
        </div>
      </div>
    </div>

    <!-- Column 2: Continuous Flow Map Engine (Electric Cyan) -->
    <div class="col-card electric-cyan">
      <div class="card-header">
        <span class="card-stage-title">② FlashMap Flow Engine</span>
        <span class="card-badge badge-cyan">ODE VECTOR FIELD</span>
      </div>
      <div class="card-body">
        <div class="module-box">
          <div class="module-label">Target Hidden State & Shared Noise</div>
          <div class="module-value">
            <span class="chalk-highlight-cyan">h_target</span> ∈ ℝ^(L×d) &nbsp;+&nbsp; <span class="chalk-highlight-amber">z₀ ∼ 𝒩(0, I)</span> ∈ ℝ^(K×d)
          </div>
        </div>

        <div class="chalk-box">
          <span style="color:#94A3B8;">// Continuous Flow Matching ODE:</span><br>
          <span class="chalk-highlight-cyan">dz_t / dt = v_θ(z_t, t | h_target)</span><br><br>
          <span style="color:#94A3B8;">// 1-Step Euler Integration (t: 0 → 1):</span><br>
          <span class="chalk-highlight-mint">z₁ = z₀ + v_θ(z₀, 0 | h_target)</span><br><br>
          <span style="color:#94A3B8;">// Flow Matching Loss:</span><br>
          <span class="chalk-highlight-amber">ℒ_FM = 𝔼 || v_θ(z_t, t|h) - (x₁ - x₀) ||²</span>
        </div>

        <div class="module-box">
          <div class="module-label">Non-Causal Multi-Position Coupling</div>
          <div class="module-value" style="font-size:12.5px;">
            Bidirectional cross-attention links all <span class="chalk-highlight-cyan">K=8 positions</span> during the ODE step. Position 4 conditions directly on Position 3 in latent space.
          </div>
        </div>

        <div class="module-box">
          <div class="module-label">FlashMap Acceptance Profile</div>
          <div class="decay-bar-container">
            <div class="decay-row">
              <span class="decay-label">Pos 1</span>
              <div class="decay-bar-bg"><div class="decay-bar-fill-mint" style="width: 93%;"></div></div>
              <span class="decay-val" style="color: #00E676;">93%</span>
            </div>
            <div class="decay-row">
              <span class="decay-label">Pos 3</span>
              <div class="decay-bar-bg"><div class="decay-bar-fill-mint" style="width: 86%;"></div></div>
              <span class="decay-val" style="color: #00E676;">86%</span>
            </div>
            <div class="decay-row">
              <span class="decay-label">Pos 6</span>
              <div class="decay-bar-bg"><div class="decay-bar-fill-mint" style="width: 74%;"></div></div>
              <span class="decay-val" style="color: #00E676;">74%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Column 3: Lossless Verification & Output (Emerald Mint / Amber) -->
    <div class="col-card amber-mint">
      <div class="card-header">
        <span class="card-stage-title">③ Lossless Verification</span>
        <span class="card-badge badge-mint">TARGET REJECTION SAMPLING</span>
      </div>
      <div class="card-body">
        <div class="module-box">
          <div class="module-label">Target Model Verification Pass</div>
          <div class="module-value">
            Target LLM evaluates all K proposed tokens in parallel using Tree Attention.
          </div>
        </div>

        <div class="chalk-box">
          <span style="color:#94A3B8;">// Modified Rejection Sampling:</span><br>
          <span class="chalk-highlight-mint">α_k = min(1, P_target(y_k) / P_draft(y_k))</span><br><br>
          <span style="color:#94A3B8;">// Lossless Invariant:</span><br>
          <span class="chalk-highlight-amber">P_accepted(y) ≡ P_target(y)</span><br>
          Zero perplexity degradation.<br>
          Zero distribution drift.
        </div>

        <div class="module-box">
          <div class="module-label">Inference Engine Integration</div>
          <div class="module-value" style="font-size:12.5px;">
            Plugs into <span class="chalk-highlight-cyan">vLLM</span> and <span class="chalk-highlight-mint">SGLang</span>.<br>
            Reuses target KV cache in place.<br>
            Zero auxiliary drafter KV memory overhead.
          </div>
        </div>

        <div class="module-box" style="border-color: rgba(0,230,118,0.3); background: rgba(0,230,118,0.06);">
          <div class="module-label" style="color:#00E676;">Production Benchmark</div>
          <div class="module-value" style="color:#FFFFFF; font-weight:700; font-size:15px;">
            Up to 6.1× Speedup // MATL: 4.92 tok/step
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- Bottom Data Highway & Telemetry Chip -->
  <div class="highway-bar">
    <div class="highway-step">
      <div class="step-num cyan">1</div>
      <span>Target Hidden State</span>
    </div>
    <div class="highway-arrow">⟶</div>
    <div class="highway-step">
      <div class="step-num cyan">2</div>
      <span>Shared Gaussian Noise</span>
    </div>
    <div class="highway-arrow">⟶</div>
    <div class="highway-step">
      <div class="step-num amber">3</div>
      <span>ODE Velocity Vector Field</span>
    </div>
    <div class="highway-arrow">⟶</div>
    <div class="highway-step">
      <div class="step-num mint">4</div>
      <span>Coupled K-Token Block</span>
    </div>
    <div class="highway-arrow">⟶</div>
    <div class="highway-step">
      <div class="step-num mint">5</div>
      <span>Parallel Verification</span>
    </div>

    <div class="telemetry-chip">
      ⚡ BENCHMARK: <span>6.1x Lossless Acceleration | MATL 4.92 tok/step | 0% Suffix Decay | p99 ITL &lt; 14ms</span>
    </div>
  </div>

</body>
</html>`;

async function renderHero() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });

  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  // Wait for Google Fonts to load
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: outputPath,
    type: 'jpeg',
    quality: 95
  });

  await browser.close();
  console.log('✅ Hero image generated successfully at:', outputPath);
}

renderHero().catch(err => {
  console.error('❌ Failed to generate hero image:', err);
  process.exit(1);
});
