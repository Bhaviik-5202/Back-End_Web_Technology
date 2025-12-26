const child_process = require('child_process');
console.log(child_process);

const { exec } = require("child_process");

// -----------------------------
// 1) Write a Node.js program using child_process.exec() to run the shell command to check the 
// current version of node. (A) 
// OR child_process.exec() -> Check Node version (callback)
// -----------------------------
console.log("---- exec() -> node -v ----");
exec('node -v', (error, stdout, stderr) => {
    if (error) {
        console.error("exec() Error:", error.message);
        return;
    }
    if (stderr) {
        console.error("exec() Stderr:", stderr);
    }
    console.log("Node version (exec):", stdout.trim());
});