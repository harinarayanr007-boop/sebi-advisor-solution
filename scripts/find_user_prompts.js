const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/harin/.gemini/antigravity/brain/f42cdeb9-74d3-44da-afb0-e82d4fe2eac5/.system_generated/logs/transcript.jsonl'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  try {
    const data = JSON.parse(line);
    if (data.type === 'USER_INPUT') {
      const text = typeof data.content === 'string' ? data.content : JSON.stringify(data.content);
      console.log(`[STEP ${data.step_index}]: ${text.slice(0, 150)}`);
    }
  } catch(e) {}
});
