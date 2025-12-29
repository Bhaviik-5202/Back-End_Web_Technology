const child_process = require('child_process');
const { spawn } = require('child_process');

// ------------------------
// (2) Write a program that uses child_process.spawn() to run the command to print files and 
// folders of current directory. (B) 
// OR spawn() → Show files & folders (Windows cmd)
// ------------------------
const cmd = child_process.spawn('cmd', ['/c', 'dir']);

cmd.stdout.on("data", (data) => {
    console.log("Files & Folders:\n", data.toString());
});

cmd.stderr.on("data", (data) => {
    console.log("Error:", data.toString());
});