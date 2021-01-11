<?php
$servername = "localhost";
$database = "marshaldb";
$username = "phpuser";
//$password = "*F2522CB42A96F352415FDEFDDC77876CE027E9C9"; //"dragon4u!";
$password = "dragon4u!";

$con = mysqli_connect($servername,$username,$password,$database);

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  exit();
}

// Perform query
if ($result = mysqli_query($con, "SELECT * FROM person")) {
  echo "Returned rows are: " . mysqli_num_rows($result);
  // Free result set
  mysqli_free_result($result);
}

mysqli_close($con);

?>
