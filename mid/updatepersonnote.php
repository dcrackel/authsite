<?php
    $hostname="localhost:3306";
    $username="marshaldbmidreal"; //marshaldbmidreal_authsite rocco_auths
    $password="Cando@123"; //Dr4g0nMidrealm! Dr4g0n
    $dbname="marshald_marshaldb"; //marshald_marshaldb rocco_auths

	$pId = $_GET['pId'];
	$txt = $_GET['txt'];
	//echo 'pId:' . $pId  . ' tid:' . $tId . ' e:' . $expire;

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);


	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$sql = "UPDATE person SET person_note = '$txt' WHERE person_id = $pId";

	if ($conn->query($sql) === TRUE) {
		$final_res = 0;
	} else {
		$final_res = json_encode("Error with updatePersonNote: " . $sql . " " . $conn->error);
	}

	$conn->close();
	echo $final_res;

?>