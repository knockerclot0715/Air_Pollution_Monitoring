echo "#####--Executing Modules_Update.sh--#####"
echo "-----Reset Local Git Files-----"
git reset --hard HEAD
git pull
echo "-----Installing 'mysql' module-----"
npm install mysql
echo "-----Installing 'serialport' module-----"
npm install serialport
echo "-----Installing 'date-and-time' module-----"
npm install date-and-time
echo "-----Installing 'random-number' module-----"
npm install random-number
echo "-----Starting up the server-----"
node Sensor_Output.js
