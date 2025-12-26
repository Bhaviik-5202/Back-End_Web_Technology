const { error } = require('console');
const fs = require('fs');

console.log('Before sync read');
try {
    const res = fs.readFileSync('Data.txt', 'utf8')
    console.log("Contents Of Info : ", res.toString());
}
catch {
    console.error("Error : ", error);
}

console.log('After sync read');




/*
const fs = require('fs');
const res = fs.readFileSync('index2.js', 'utf8', (err, data) => {
    if (err) {
        console.log("Error : ", error.message);
    }
    else {
        console.log("File Contant : ", data);
        
    }
})
console.log("File Contant : ", res.toString());
*/
