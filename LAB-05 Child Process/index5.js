// 5) Create a new URL object with base, then append pathname and query, also print the final 
// URL. (B)

const url = require('url');
const myURL = new URL('https://darshanums.in');

myURL.pathname = '/ums/back-end';

myURL.searchParams.append("id", "418");
myURL.searchParams.append("name", "bhavik");


console.log("Final URL : ", myURL);
console.log("Serialized URL : ", myURL.toString());

