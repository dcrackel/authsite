<?php
//include('properties.php');
$servername = "localhost";
$database = "marshaldb";
$username = "phpuser";
$password = "dragon4u!";

    //$con=mysql_connect($dbhost,$dbuser,$dbpass);
    //mysql_select_db($dbname,$con) or die ("Cannot connect the Database");
    //mysql_query("SET NAMES 'utf8'",$con);

$con = mysqli_connect($servername,$username,$password,$database);
if (mysqli_connect_errno()) {
  echo "Failed: " . mysqli_connect_error();
  exit();
}

if ($result = mysqli_query($con, "SET NAMES 'utf8'")) {
  mysqli_free_result($result);
}

//mysqli_close($con);

?>
