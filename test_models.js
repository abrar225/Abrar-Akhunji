import fs from 'fs';

const API_KEY = "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";

async function testModels() {
  console.log("Fetching all models from OpenRouter...");
  
  let models = [];
  try {
    const res = await fetch("https://openrouter.ai/api/v1/models");
    const data = await res.json();
    models = data.data.filter(m => m.id.includes("free"));
    console.log(`Found ${models.length} free models. Testing them now (this might take a minute)...`);
  } catch (e) {
    console.error("Error fetching models:", e);
    return;
  }

  const workingModels = [];

  // Test models in batches of 3 to avoid rate limits
  const batchSize = 3;
  for (let i = 0; i < models.length; i += batchSize) {
    const batch = models.slice(i, i + batchSize);
    
    const promises = batch.map(async (model) => {
      try {
        const req = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: model.id,
            messages: [{ role: "user", content: "Hi" }]
          }),
          signal: AbortSignal.timeout(5000) // 5s timeout
        });
        
        if (req.ok) {
          const res = await req.json();
          if (res && res.choices && res.choices.length > 0) {
            console.log(`✅ [SUCCESS] ${model.id}`);
            return model.id;
          }
        } else {
          console.log(`❌ [FAILED] ${model.id} (Status: ${req.status})`);
        }
      } catch (e) {
        console.log(`❌ [FAILED] ${model.id} (${e.name === 'AbortError' ? 'Timeout' : 'Error'})`);
      }
      return null;
    });

    const results = await Promise.all(promises);
    results.filter(r => r !== null).forEach(r => workingModels.push(r));
    
    // Add a small delay between batches
    if (i + batchSize < models.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log("\n--- TEST COMPLETE ---");
  console.log(`Found ${workingModels.length} working free models:`);
  console.log(JSON.stringify(workingModels, null, 2));

  fs.writeFileSync('working_models.json', JSON.stringify(workingModels, null, 2));
  console.log("Saved working models to working_models.json");
}

testModels();
