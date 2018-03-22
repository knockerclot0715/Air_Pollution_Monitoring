"use strict";

console.log("Hi");

const SerialPortModule = require("serialport");
const Moment = require("moment");
const MySQL = require("mysql");

const SerialPort = new SerialPort("/dev/ttyUSB0", {baudrate: 9600});
const DatabaseConnection = MySQL.createConnection({host: "10.0.0.11", user: "Station", password: "Marc0715", database: "Air_Pollution_Reading_Record"});

while (true) {
  SerialPort.on("Serial Data:", data);
  var Data = data.toString('hex').match(/.{1,2}/g);
  var LowBitRate = parseInt(Data[2], 16);
  var HighBitRate = parseInt(Data[3], 16);
  var Air_Pollution_Reading = (HighBitRate * 256 + LowBitRate) / 10;
  var CurrentTime = moment("00:00:00", "hh:mm:ss");
  console.log("Current Time:", CurrentTime);
  console.log("Current PM2.5 Reading", Air_Pollution_Reading);
  DatabaseConnection.connect(function(Error) {
    if (Error) {
      console.log("Failed To Connect To The Database");
      console.error(Error.stack);
      return;
    } else {
      console.log("Connected To The Database");
    }
  });
  DatabaseConnection.end();
  console.log("-----------------");
};
