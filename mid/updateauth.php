<?php
    $hostname="localhost";
    $username="rocco";
    $password="M1dr34lm";
    $dbname="rocco_auths";

	$authid = $_GET['aId'];
	$authnote = $_GET['authnote'];
	$issued = $_GET['iss'];

	//echo 'authid ' . $authid  . ' note ' . $note . ' issued ' . $issued;

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$sql = "update authorization set `note` = '$authnote', issued = '$issued' where auth_id = $authid";

	if ($conn->query($sql) === TRUE) {
		$final_res =json_encode($authnote);
	} else {
		$final_res =json_encode("Error: " . $sql . "<br>" . $conn->error) ;
	}

	$conn->close();
	echo $final_res;

?>
