
var QueryResults = [];

const MySQLModule = require('mysql');
const DateTimeModule = require('date-and-time');

const Database_Connection = MySQLModule.createConnection({host: '10.0.0.11', user: 'Station_1', password: 'Marc0715', database: 'Air_Pollution_Project'});

var Time = new Date();
//var Current_Time = DateTimeModule.format(Time, 'YYYY-MM-DD HH:mm:ss');
var Current_Time = "'2018-03-25 05:00:09'";
console.log("Current Time:", Current_Time);
//var Previous_Time = DateTimeModule.addSeconds(Time, -10, 'YYYY-MM-DD HH:mm:ss');
var Previous_Time = "'2018-03-25 05:00:00'";
console.log("Previous Time:", Previous_Time);

Database_Connection.connect();

Database_Connection.query('SELECT Air_Pollution_Reading_Value FROM Air_Pollution_Reading_Record WHERE Time_Of_Record > '+Previous_Time+' AND Time_Of_Record <= '+Current_Time+'', function(error, result) {
  if (error) {
    console.log("An error has occured", error.stack);
  } else {
    console.log("Raw data from the past 10 seconds");
    var Queried_Results = result;
    console.log(Queried_Results);
    var Results = Object.keys(Queried_Results);
    console.log(Results);
  }
});



/*

// Node.js MySQL SELECT FROM query Example
// include mysql module
var mysql = require('mysql');

// create a connection variable with the required details
var con = mysql.createConnection({
  host: "10.0.0.11",    // ip address of server running mysql
  user: "Station_1",    // user name to your mysql database
  password: "Marc0715",    // corresponding password
  database: "Air_Pollution_Project" // use the specified database
});


// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("SELECT Air_Pollution_Reading_Value FROM Air_Pollution_Reading_Record", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    // iterate for all the rows in result
    Object.keys(result).forEach(function(key) {
      var row = result[key];
      console.log(row.Air_Pollution_Reading_Record);
    });
  });
});
*/
