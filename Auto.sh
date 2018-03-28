echo "-----Executing Auto.sh File!-----"
cd
cd Project/Air_Pollution_Monitoring/
echo "-----Reset local git copy-----"
git reset --hard HEAD
echo "-----git pull-----"
git pull
echo "-----Installing 'mysql' module-----"
npm install mysql
echo "-----Installing 'serialport' module-----"
npm install serialport
echo "-----Installing 'date-and-time' module-----"
npm install date-and-time
clear
sudo apt-get screen
screen
node Sensor_Output.js
