"use strict";

const SerialPortModule = require("serialport");
const MySQLModule = require('mysql');
const MomentModule = require('moment');
const PiInfo = require('piinfo');

const SerialPort = new SerialPortModule("/dev/ttyUSB0", {baudRate: 9600});
const Station_Serial_ID = '\"' + PiInfo.serial() + '\"';

SerialPort.on('data', function(Data) {
  var Data = Data.toString('hex').match(/.{1,2}/g);
  var LowBitRate = parseInt(Data[2], 16);
  var HighBitRate = parseInt(Data[3], 16);
  var Air_Pollution_Reading = (HighBitRate * 256 + LowBitRate) / 10;

  console.log("Current Time: " + MomentModule().format('YYYY-MM-DD HH:mm:ss'));
  console.log("Station's Serial ID: " + Station_Serial_ID);
  console.log("Air Pollution Reading: " + Air_Pollution_Reading);
  Data_Insert(Station_Serial_ID, Air_Pollution_Reading);
  console.log("--------------------");
});

function Data_Insert(Station_Serial_Source, Air_Pollution_Reading) {
  const Database_Connection = MySQLModule.createConnection({host: '10.0.0.11', user: 'Station_1', password: 'Marc0715', database: 'Air_Pollution_Project'});
  Database_Connection.connect(function(error) {
    if (error) {
      console.log("Failed to connect to the database");
      console.log(error.red);
      return;
    }
  });
  Database_Connection.query('INSERT IGNORE INTO Air_Pollution_Reading_Record (Station_Serial_ID, Air_Pollution_Reading) VALUES ('+Station_Serial_Source+', '+Air_Pollution_Reading+')');
  Database_Connection.end();
}
