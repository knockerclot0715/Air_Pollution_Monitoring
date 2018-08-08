<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
    $Database_Connection = mysqli_connect("10.0.0.2", "Station_Test", "Station_Test", "Air_Pollution_Project", 3307);
    if ($Database_Connection) {
      $Time_Data = [];
      $Reading_Data = [];
      $Query_Results = mysqli_query($Database_Connection, "SELECT Air_Pollution_Reading AS 'Reading', DATE_FORMAT(Time_Of_Record, '%Y-%m-%d %H') AS 'Time' FROM Air_Pollution_Reading_Record GROUP BY DATE_FORMAT(Time_Of_Record, '%Y-%m-%d %H') ORDER BY Time_Of_Record DESC LIMIT 24;");
      if ($Query_Results->num_rows > 0) {
        while ($Row = $Query_Results->fetch_assoc()) {
          $Time = $Row["Time"] . ":00:00";
          $Reading = $Row["Reading"];
          $Time_Data[] = $Time;
          $Reading_Data[] = $Reading;
        }
      }
    } else {
      echo "Failed To Connect To The Database" . '<br>';
      die(mysqli_connect_error());
    }
    mysqli_close($connect);
    $Time_Data_String = "";
    for($i = 0; $i < count($Time_Data)-1; $i++) {
    	$Time_Data_String .= "'" . $Time_Data[$i] . "', ";
    }
    $Time_Data_String .= "'" . $Time_Data[count($Time_Data)-1] . "'";

    $Reading_Data_String = "";
    for($i = 0; $i < count($Reading_Data)-1; $i++) {
    	$Reading_Data_String .= $Reading_Data[$i] . ", ";
    }
    $Reading_Data_String .= $Reading_Data[count($Reading_Data)-1];
    ?>
    <div id='chart'>
      <script>
      var data = [{
        x: [<?php echo $Time_Data_String; ?>],
        y: [<?php echo $Reading_Data_String; ?>],
        type: 'scatter'
      }];
      Plotly.newPlot('chart', data);
      </script>
    </div>
  </body>
</html>
