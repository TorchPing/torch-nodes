const yaml = require("js-yaml");
const got = require("got");
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

// Get document, or throw exception on error
// Exit on 1 to stop CI
let doc = [];
try {
  doc = yaml.safeLoad(
    readFileSync(path.resolve(__dirname, "src/list.yml"), "utf8")
  );
  console.log("object read: ", doc);
} catch (e) {
  console.error(e);
  process.exit(1);
}

// Test server's connectivity
const responses = doc.map((e) => {
  return got(e.address).then((res) => {
    return {
      address: e.address,
      response: res.body,
    };
  });
});

// Write file on all success
Promise.all(responses)
  .then((values) => {
    console.log("nice, everyone looks healthy:  ", values);
    writeFileSync(
      path.resolve(__dirname, "public/list.json"),
      JSON.stringify(doc)
    );
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
