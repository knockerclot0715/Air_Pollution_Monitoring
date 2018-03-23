"use strict";

const SerialPortModule = require("serialport");
const DateTimeModule = require('date-and-time');
const MySQLModule = require('mysql');

const SerialPort = new SerialPortModule("/dev/ttyUSB0", {baudRate: 9600});
const Database_Connection = MySQLModule.createConnection({host: '10.0.0.254', user: 'Station', password: 'Marc0715', database: 'Air_Pollution_Project'});

Database_Connection.connect();

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
  Database_Connection.query('INSERT IGNORE INTO Air_Pollution_Reading_Record (Station_ID, Air_Pollution_Reading_Value) VALUES ('+Station_ID+', '+Air_Pollution_Reading+')');
  console.log("--------------------");
});
