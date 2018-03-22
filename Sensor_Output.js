"use strict";


const SerialPortModule = require("serialport");
const MySQLModule = require("mysql");
const DateTimeModule = require('date-and-time');

const SerialPort = new SerialPortModule("/dev/ttyUSB0", {baudRate: 9600});

SerialPort.on('data', function(Data) {

  //Settings for serial data conversion and extraction
  var Data = Data.toString('hex').match(/.{1,2}/g);
  var LowBitRate = parseInt(Data[2], 16);
  var HighBitRate = parseInt(Data[3], 16);
  var Air_Pollution_Reading = (HighBitRate * 256 + LowBitRate) / 10;

  //Settings for current time
  let Time = new Date();
  var Current_Time = DateTimeModule.format(Time, 'YYYY/MM/DD HH:mm:ss');

  //output pm2.5 reading and the current time
  console.log("Current Time:", Current_Time);
  console.log("Air Pollution Reading:", Air_Pollution_Reading);
  console.log("--------------------");
});
