const fs = require('fs');
const file = 'pencil-new.pen';
let data = JSON.parse(fs.readFileSync(file, 'utf8'));

let updatedCount = 0;

function traverse(node) {
  if (node.type === 'text' && node.fontFamily === 'pretendard-gov') {
    node.fontFamily = 'Pretendard GOV';
    updatedCount++;
  }
  if (node.children) {
    node.children.forEach(child => traverse(child));
  }
}

data.children.forEach(child => traverse(child));

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Fixed ' + updatedCount + ' text nodes to Pretendard GOV.');
