<?php
    $hostname="localhost";
    $username="rocco";
    $password="M1dr34lm";
    $dbname="rocco_auths";

	$personId = $_GET['pId'];
	$authid = $_GET['aId'];
	$addfunction = $_GET['aFn'];
	$usernote = $_GET['user'];

	$year2  = mktime(0, 0, 0, date("m"),   date("d"),   date("Y")+2);
	$expireDate = date("Y-m-d", $year2);
	$today = date("Y-m-d h:i");

	//echo 'personId ' . $personId  . ' authid ' . $authid . ' addfunction ' . $addfunction . ' usernote ' . $usernote;

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	if (strpos($addfunction,'1') !== false) {
		$sql = "insert into authorization (person_id, type_id, issued, status_id, note, expire_date) VALUES ($personId, $authid, '$today', 1, 'updated by: $usernote', '$expireDate')";
	}

	if (strpos($addfunction,'0') !== false) {
		$sql = "delete from authorization where person_id = $personId AND type_id = $authid";
	}


	if ($conn->query($sql) === TRUE) {
		$final_res =json_encode("Complete") ;
	} else {
		$final_res =json_encode("Error: " . $sql . "<br>" . $conn->error) ;
	}

	$conn->close();
	echo $final_res;

?>

