echo "Executing Auto.sh File!"
cd
cd Project/Air_Pollution_Monitoring/
echo "Installing 'mysql' module"
npm install mysql
echo "Installing 'serialport' module"
npm install serialport
echo "Installing 'date-and-time' module"
npm install date-and-time
node Sensor_Output.js
