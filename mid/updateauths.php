<?php
    include('properties.php');

	$personId = $_GET['pId'];

	$year2  = mktime(0, 0, 0, date("m"),   date("d"),   date("Y")+2);
	$expireDate = date("Y-m-d", $year2);
	$today = date("Y-m-d h:i");

	//echo 'personId ' . $personId  . ' authid ' . $authid . ' addfunction ' . $addfunction . ' usernote ' . $usernote;

	// Create connection
	$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$sql = "update marshald_marshaldb.authorization set expire_date = '$today' where auth_id = 17312"; //person_id = $personId and 
    echo $sql;

	if ($conn->query($sql) === TRUE) {
		$final_res =json_encode("Complete") ;
	} else {
		$final_res =json_encode("Error: " . $sql . "<br>" . $conn->error) ;
	}

	$conn->close();
	echo $final_res;

?>

