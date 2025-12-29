const { error } = require('console');
const fs = require('fs');

const res = "This is Line Add To OutPut..!";
fs.appendFile("Output.txt", res, (err) => {
    if(err) {
        console.log("Error : ", error);
    }
    else {
        console.log("Data Add Complete In Output.txt File");
        
    }
})