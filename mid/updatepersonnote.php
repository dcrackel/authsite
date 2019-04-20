<?php
    include('properties.php');

	$pId = $_GET['pId'];
	$txt = $_GET['txt'];
	//echo 'pId:' . $pId  . ' tid:' . $tId . ' e:' . $expire;

	// Create connection
	$con = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	// Check connection
	if ($con->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$sql = "UPDATE person SET person_note = '$txt' WHERE person_id = $pId";
    $result=mysql_fetch_object($sql);
    echo $result;
        
	if ($con->query($sql) === TRUE) {
		$final_res = 0;
	} else {
		$final_res = json_encode("Error with updatePersonNote: " . $sql . " " . $con->error);
	}

	$con->close();
	echo $final_res;
?>
