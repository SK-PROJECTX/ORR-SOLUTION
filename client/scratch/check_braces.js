const fs = require('fs');
const content = fs.readFileSync('/Users/mac/Desktop/ORR-SOLUTION/client/lib/i18n/translations/en.ts', 'utf8');

let braces = 0;
let brackets = 0;
let line = 1;
let inString = null;

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  const nextChar = content[i+1];

  if (char === '\n') {
    line++;
  }

  if (inString) {
    if (char === inString && content[i-1] !== '\\') {
      inString = null;
    }
    continue;
  }

  if (char === "'" || char === '"' || char === '`') {
    inString = char;
    continue;
  }

  // Skip comments
  if (char === '/' && nextChar === '/') {
    while (content[i] !== '\n' && i < content.length) i++;
    line++;
    continue;
  }

  if (char === '{') braces++;
  if (char === '}') braces--;
  if (char === '[') brackets++;
  if (char === ']') brackets--;

  if (braces < 0) {
    console.log(`Brace underflow at line ${line}`);
    // braces = 0; // reset to find more?
  }
}

console.log(`Final count: braces=${braces}, brackets=${brackets}`);
