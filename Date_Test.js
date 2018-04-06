var moment = require('moment');

var Current_Time = moment().format('YYYY-MM-DD H:m:s');
var Previous_Time = moment().subtract(30, 'seconds').format('YYYY-MM-DD H:m:s');
console.log(Current_Time);
console.log(Previous_Time);
