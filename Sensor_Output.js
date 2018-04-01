"use strict";

const SerialPortModule = require("serialport");
const DateTimeModule = require('date-and-time');
const MySQLModule = require('mysql');

const SerialPort = new SerialPortModule("/dev/ttyUSB0", {baudRate: 9600});

SerialPort.on('data', function(Data) {
  const Station_ID = 1;

  //Settings for serial data conversion and extraction
  var Data = Data.toString('hex').match(/.{1,2}/g);
  var LowBitRate = parseInt(Data[2], 16);
  var HighBitRate = parseInt(Data[3], 16);
  var Air_Pollution_Reading = (HighBitRate * 256 + LowBitRate) / 10;

  //Settings for current time
  var Time = new Date();
  var Current_Time = DateTimeModule.format(Time, 'YYYY/MM/DD HH:mm:ss');

  //output pm2.5 reading and the current time
  console.log("Current Time:", Current_Time);
  console.log("Air Pollution Reading:", Air_Pollution_Reading);
  Data_Insert(Station_ID, Current_Time, Air_Pollution_Reading);
  console.log("--------------------");
});

function Data_Insert(Station_ID_Source, Current_Time_Source, Air_Pollution_Reading_Source) {
  Current_Time_Source = "'"+ Current_Time_Source +"'";
  const Database_Connection = MySQLModule.createConnection({host: '10.0.0.11', user: 'Station_1', password: 'Marc0715', database: 'Air_Pollution_Project'});
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
