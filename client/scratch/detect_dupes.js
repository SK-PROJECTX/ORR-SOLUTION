const fs = require('fs');

function findDuplicates(content) {
    const lines = content.split('\n');
    const stack = [{}]; // stack of objects at each level
    const errors = [];

    lines.forEach((line, index) => {
        const lineNum = index + 1;
        
        // Match keys like "key:" or "'key':" or '"key":'
        const keyMatch = line.match(/^\s*['"]?([a-zA-Z0-9_]+)['"]?:\s*({|\[|'|"|`|[0-9]|true|false|null)/);
        
        // Track braces to know when objects end
        const openBraces = (line.match(/{/g) || []).length;
        const closeBraces = (line.match(/}/g) || []).length;

        if (keyMatch) {
            const key = keyMatch[1];
            const currentObj = stack[stack.length - 1];
            
            if (currentObj[key]) {
                errors.push(`Duplicate key "${key}" found on line ${lineNum} (previous on line ${currentObj[key]})`);
            } else {
                currentObj[key] = lineNum;
            }
        }

        // Push new objects onto stack
        for (let i = 0; i < openBraces; i++) {
            stack.push({});
        }
        // Pop objects off stack
        for (let i = 0; i < closeBraces; i++) {
            if (stack.length > 1) stack.pop();
        }
    });

    return errors;
}

const enPath = process.argv[2];
const content = fs.readFileSync(enPath, 'utf8');
const duplicates = findDuplicates(content);

if (duplicates.length > 0) {
    console.log(duplicates.join('\n'));
} else {
    console.log('No duplicates found!');
}
