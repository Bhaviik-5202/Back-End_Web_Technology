const fs = require('fs');

fs.mkdir('my-data', (err) => {
    if(err) {
        if( err.code == 'EEXIST') {
            console.log("Already Folder Created");
        }
        else {
            console.log("Error : ", err);
        }
    }
    else {
        console.log("Folder Create Successfully...!");
        
    }

})