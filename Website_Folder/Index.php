<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Online PM2.5 Monitoring Platform | Home</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
    $(document).ready(function () {
      var timer = setInterval(
        function(){
          $("#Refresh").load("Index.php #Refresh");
        }, 1000
      );
    });
    </script>
  </head>
  <body>
    <div id="Refresh">
      <?php
      $Database_Connection = mysqli_connect("10.0.0.2", "Station_Test", "Station_Test", "Air_Pollution_Project", 3307);
      if (!$Database_Connection) {
        echo "Failed To Connect To The Database";
        die(mysqli_connect_error());
      }
      $Query_Results = mysqli_query($Database_Connection, "SELECT Air_Pollution_Reading FROM Air_Pollution_Reading_Record ORDER BY Time_Of_Record DESC LIMIT 1;");
      $Row = $Query_Results->fetch_assoc();
      if ($Row['Air_Pollution_Reading'] < 50) {
        echo "Current Reading: " . '<span style="color: #01FF45;">'.$Row["Air_Pollution_Reading"].'</span>';
      } elseif ($Row['Air_Pollution_Reading'] < 100) {
        echo '<span style="color: #FFDD2F;">'.$Row["Air_Pollution_Reading"].'</span>';
      } else {
        echo '<span style="color: #FF2F2F;">'.$Row["Air_Pollution_Reading"].'</span>';
      }
      ?>
    </div>
  </body>
</html>
