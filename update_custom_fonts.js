const fs = require('fs');
const file = 'pencil-new.pen';
const targetIds = ['KKMXU', '31gqB', 'UpllT'];
let data = JSON.parse(fs.readFileSync(file, 'utf8'));

let updatedCount = 0;

function traverse(node, insideTarget) {
  let isTarget = insideTarget || targetIds.includes(node.id);
  
  if (isTarget && node.type === 'text') {
    if (node.fontFamily !== 'pretendardGOV') {
        node.fontFamily = 'pretendardGOV';
        updatedCount++;
    }
  }
  
  if (node.children) {
    node.children.forEach(child => traverse(child, isTarget));
  }
}

data.children.forEach(child => traverse(child, false));

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Updated ' + updatedCount + ' text nodes to pretendardGOV.');
