"use strict"

const DateTimeModule = require('date-and-time');
const MySQLModule = require('mysql');

var CurrentTime = new Date();
var Current_Time = DateTimeModule.format(CurrentTime, 'YYYY/MM/DD HH:mm:ss');

let PreviousTime = new Date();
let Previous_Time = DateTimeModule.addSeconds(PreviousTime, -5, 'YYYY/MM/DD HH:mm:ss');

var jje = DateTimeModule.parse(Previous_Time, 'YYYY-MM-DD HH:mm:ss')

console.log(jje);

Current_Time = '' + Current_Time;
Previous_Time = '' + Previous_Time;

console.log(Current_Time);
console.log(Previous_Time);
