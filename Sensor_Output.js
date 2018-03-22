"use strict";


const SerialPortModule = require("serialport");
const MomentModule = require("moment");
const MySQLModule = require("mysql");

const SerialPort = new SerialPortModule("/dev/ttyUSB0", {baudRate: 9600});


SerialPort.on('data', function(Data) {
  var Data = Data.toString('hex').match(/.{1,2}/g);
  var LowBitRate = parseInt(Data[2], 16);
  var HighBitRate = parseInt(Data[3], 16);
  var Air_Pollution_Reading = (HighBitRate * 256 + LowBitRate) / 10;
  console.log("Air Pollution Reading:", Air_Pollution_Reading);
});
