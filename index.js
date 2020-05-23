const yaml = require('js-yaml');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path')

// Get document, or throw exception on error
try {
    const doc = yaml.safeLoad(readFileSync(path.resolve(__dirname, 'src/list.yml'), 'utf8'));
    console.log(doc)
    writeFileSync(path.resolve(__dirname, 'public/list.json'), JSON.stringify(doc));
} catch (e) {
    console.error(e);
}