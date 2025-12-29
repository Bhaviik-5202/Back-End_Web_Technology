const { error } = require('console');
const fs = require('fs');

fs.readFile("Data.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err.message);
        return;
    }
    else {
        console.log("File Contant : ", data);
    }
})

// Extra Qustion (Add Image)
// fs.readFile('myImage.jpeg', (err, data) => {
//   if (err) throw err;
//   console.log('Image size:', data.length, 'bytes');
  
// });