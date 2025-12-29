const fs = require('fs');

fs.copyFile('Source.txt', 'Backup.txt', (err) => {
    if(err) {
        console.log("Error File Copying...!");
    }
    else {
        console.log("source.txt was copied to backup.txt successfully.");
        
    }
})