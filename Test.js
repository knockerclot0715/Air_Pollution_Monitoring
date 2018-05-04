"use strict";

const SerialPortModule = require("serialport");

const SerialPort = new SerialPortModule("/dev/ttyUSB0", {baudRate: 9600});

SerialPort.on('data', function(Data) {
  console.log(Data);
  break;
});
