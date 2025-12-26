const { cp } = require('fs');
const os = require('os');
// // console.log(os);

console.log("Os Type : ", os.type());
console.log("Os Release : ", os.release());
console.log("Os Platform : ", os.platform());
console.log("Os Architecture : ", os.arch());





function convertToGB(bytes) {
    return (bytes / (1024  * 1024 * 1024)).toFixed(2);
}

console.log("Total Memory : ", convertToGB(os.totalmem));
console.log("Free Memory : ", convertToGB(os.freemem));




const sec = os.uptime();
const hours = (sec / (3600)).toFixed(2);

console.log("Currently logged-in user in operating System : ", hours);

const cpus = os.cpus();
console.log(cpus);

console.log(" CPU Length : ", cpus.length);

cpus.forEach((core, index) => {
    console.log(`Core ${index+1} Model : `, core.model);   
});


const info = os.userInfo();
console.log("User  Info : ", info);



const network = os.networkInterfaces();
console.log("CPU Network InterFace : ", network);


const version = os.version();
console.log("OS Version : ", version);


const homeDir = os.homedir();
console.log('Home Directory:', homeDir);

const machine = os.machine();
console.log("Os Machine Type : ", machine);

