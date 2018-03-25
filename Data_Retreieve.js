const MySQLModule = require('mysql');
const DateTimeModule = require('date-and-time');

const Database_Connection = MySQLModule.createConnection({host: '10.0.0.11', user: 'Station_1', password: 'Marc0715', database: 'Air_Pollution_Project'});

var Time = new Date();
var Current_Time = DateTimeModule.format(Time, 'YYYY/MM/DD HH:mm:ss');
console.log("Current Time:", Current_Time);
var Previous_Time = DateTimeModule.addSeconds(Time, -10);
console.log("Previous Time:", Previous_Time);

Database_Connection.connect();
Database_Connection.query('SELECT * FROM Air_Pollution_Project.Air_Pollution_Reading_Record WHERE Time_Of_Record > '+Previous_Time+' AND Time_Of_Record <= '+Current_Time+'', function(error, results) {
  if (error) {
    console.log("An errror has occured", error.stack);
  } else {
    console.log("Raw Data From The Past 10 Seconds:");
    console.log(results);
  }
});