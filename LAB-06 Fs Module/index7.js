const fs = require("fs");

fs.readdir("my-data", (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }
  console.log("Files in the directory:", files);

  files.forEach((file) => {
    console.log(`Processing file: ${file}`);
  });
});
