// 4) Write a program that parses the given URL, Print protocol, hostname, pathname, and query 
// parameters separately. (A) 

const url = require('url');

const inputURL = "https://darshanums.in:8090/StudentPanel/STU_Student/STU_Student_ProfileView.aspx?id=418&name=bhavik";

const parse = url.parse(inputURL, true);

console.log("URL : ", parse.href);
console.log("Protocol : ", parse.protocol);
console.log("HostName : ", parse.hostname);
console.log("PathName : ", parse.pathname);
console.log("PortCode : ", parse.port);
console.log("Query : ", parse.query);
