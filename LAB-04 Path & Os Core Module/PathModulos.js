const path = require("path");
const os = require("os");

// 1) Write a Node.js program that prints the directory name, file name, file extension, and full 
// path of the code file. (A) 
console.log("Directory Name: ", __dirname);
console.log("File Name: ", __filename);
console.log("File Extension: ", path.extname(__filename));
console.log("Base of File Name: ", path.basename(__filename));
console.log("Base of Directory Name: ", path.basename(__dirname));


// 2) Create a program that joins "users", "arjun", "documents", "project" into a single path using 
// path.join(). (A) 
console.log("using join:", path.join("users", "arjun", "document", "project"));


// 3) Write a program to fix the path="//folder//subfolder////file.txt" using path.normalize() and 
// display the clean normalised path. (A)
const wrongPath = "//folder//subfolder////file.txt";
const rightPath = path.normalize(wrongPath);
console.log("Wrong Path: ", wrongPath);
console.log("Right Path: ", rightPath);


// 4) Write a program that checks whether the given path is absolute or relative paths. (A) 
const absolutePath = __filename;
const relativePath = "Lab_4\index.js"; 

function checkAbsolutePath(filePath) {
    if(path.isAbsolute(filePath)) console.log("Absolute Path");
    else console.log("Relative Path");
}
checkAbsolutePath(absolutePath);
checkAbsolutePath(relativePath);


// 5) Write a Node.js program that uses path.resolve() to convert "folder", "subfolder", "app.js" 
// into an absolute path. Print the final resolved path. (A) 
// console.log(path.resolve());
console.log(path.resolve("folder", "subfolder", "app.js"));


// 6) Write a program that prints: (A) 
// • Operating system name 
// • Release version 
// • Platform 
// • Architecture 
console.log(os);
console.log(os.type());
console.log(os.release());
console.log(os.platform());
console.log(os.arch());


// 7) Write a program that prints the total memory and free memory in GB (B)
console.log("7 --------------------->");

console.log(os.freemem());
console.log(os.totalmem());

function bytesINTOgb(memory) {
    return (memory / (1024 * 1024 * 1024)).toFixed(2);
}

console.log("Total in GB = ", bytesINTOgb(os.totalmem()));
console.log("Free memory in GB = ", bytesINTOgb(os.freemem()));


// 8) Write a Node.js program that prints details about the currently logged-in user in operating system. (B)
console.log("8 --------------------->");
console.log(os.userInfo());
console.log((os.userInfo()).username);


// 9) Write a program that prints how long the system has been running (uptime) in seconds and in hours. (B)
console.log("9 --------------------->");
console.log(os.uptime());


// 10) Write a Node.js program that prints: (B)
// • Number of CPU cores
// • Model name of each core
// • Network interface details
console.log("10 --------------------->");
console.log(os.cpus());
(os.cpus()).forEach((core, index) => {
    console.log(`${index + 1}`, core.model);
})

