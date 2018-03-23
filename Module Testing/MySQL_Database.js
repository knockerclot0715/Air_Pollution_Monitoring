var MySQLModule = require('mysql');
var SleepModule = require('sleep');

var MySQL_Connection = MySQLModule.createConnection({host: '10.0.0.254', user: 'Station', password: 'Marc0715', database: 'Air_Pollution_Project'});

MySQL_Connection.connect();
SleepModule.sleep(1);
MySQL_Connection.query('INSERT INTO Air_Pollution_Reading_Record (Station_ID, Air_Pollution_Reading_Value) VALUES (2, 666)');
MySQL_Connection.end();
