const { error } = require('console');
const fs = require('fs');

fs.unlink("JatuFile.txt", (err) => {
    if(err) {
        console.log("Eroor : ", error);
    }
    else {
        console.log("File Delete Successfully........!");
        
    }
})

/*
const fs = require('fs');
fs.unlink(target, (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
        console.error('temp.txt does not exist.');
    } 
    else {
        console.error('Error deleting temp.txt:', err.message);
    }
    return;
  }
    console.log('temp.txt deleted successfully.');
});
*/