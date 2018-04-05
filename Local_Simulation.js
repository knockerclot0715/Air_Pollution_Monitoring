"use strict"

const DateTimeModule = require('date-and-time');
const MySQLModule = require('mysql');
const RandomNumberModule = require('random-number');

const options = {
  integer: true,
  min: 0,
  max: 999
}

var Time = new Date();
var Current_Time = DateTimeModule.format(Time, 'YYYY/MM/DD HH:mm:ss');

var Air_Pollution_Reading = RandomNumberModule(options);

console.log("Current Time:", Current_Time);
console.log("Air Pollution Reading:", Air_Pollution_Reading);
Data_Insert(0, Current_Time, Air_Pollution_Reading);

function Data_Insert(Station_ID_Source, Current_Time_Source, Air_Pollution_Reading_Source) {
  Current_Time_Source = "'"+ Current_Time_Source +"'";
  const Database_Connection = MySQLModule.createConnection({host: '127.0.0.1', user: 'root', password: 'Marc0715', database: 'Air_Pollution_Project'});
  Database_Connection.connect(function(error) {
    if (error) {
      console.log("Failed to connect to the database");
      console.log(error);
      return;
    }
  });
  Database_Connection.query('INSERT IGNORE INTO Air_Pollution_Reading_Record (Station_ID, Air_Pollution_Reading_Value, Time_Of_Record) VALUES ('+Station_ID_Source+', '+Air_Pollution_Reading_Source+', '+Current_Time_Source+')');
  Database_Connection.end();
}
