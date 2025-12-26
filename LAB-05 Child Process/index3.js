// 3) Write a program to print current working directory using nodes. (B) 

const path = require('path');

console.log('Current working directory :', process.cwd());
console.log('Script directory :', __dirname);
console.log('Basename of cwd:', path.basename(process.cwd()));


