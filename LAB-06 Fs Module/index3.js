const { error } = require('console');
const fs = require('fs');

fs.writeFile('Output.txt', "Hello, From Output File...!", (err) => {
    if(err) {
        console.log("Error : ", err.message);
    }
    else {
        console.log("File Create Successfully..!");
    }
})