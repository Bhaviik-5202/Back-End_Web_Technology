const fs = require('fs');

if(fs.existsSync('config.json')) {
console.log('config.json exists in current directory.');
} 
else {
  console.log('config.json does NOT exist in current directory.');
}