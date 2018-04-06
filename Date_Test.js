var MomentModule = require('moment');

var Current_Time = MomentModule().format('YYYY-MM-DD H:m:s');
var Previous_Time = MomentModule().subtract(30, 'seconds').format('YYYY-MM-DD H:m:s');
console.log(Current_Time);
console.log(Previous_Time);
