const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/harin/.gemini/antigravity/brain/f42cdeb9-74d3-44da-afb0-e82d4fe2eac5/.system_generated/logs/transcript.jsonl'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  try {
    const data = JSON.parse(line);
    if (data.step_index >= 4245 && data.step_index <= 4265 && data.type === 'USER_INPUT') {
      console.log('--- USER INPUT STEP ' + data.step_index + ' ---');
      console.log(data.content);
    }
  } catch(e) {}
});
