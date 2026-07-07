const fs = require('fs');

let code = fs.readFileSync('src/App.jsx', 'utf8');

let counter = 0;
// Replace <section>...</section>
let newCode = code.replace(/<section([\s\S]*?)<\/section>/g, (match, p1) => {
    counter++;
    return `<StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={\`\${module?.id}-sec-\${${counter}}\`}>\n      <section${p1}</section>\n    </StarableBlock>`;
});

fs.writeFileSync('src/App.jsx', newCode);
console.log(`Wrapped ${counter} sections.`);
