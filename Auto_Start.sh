echo "#####--Executing Modules_Update.sh--#####"
echo "-----Reset Local Git Files-----"
git reset --hard HEAD
git pull
echo "-----Installing 'mysql' module-----"
npm install mysql
echo "-----Installing 'serialport' module-----"
npm install serialport
echo "-----Installing 'random-number' module-----"
npm install random-number
echo "-----Installing 'moment' module-----"
npm install moment
echo "-----Starting up the server-----"
node Sensor_Output.js
