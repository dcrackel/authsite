<?php
    $hostname="localhost:3306";
    $username="marshaldbmidreal"; //marshaldbmidreal_authsite rocco_auths
    $password="Cando@123"; //Dr4g0nMidrealm! Dr4g0n
    $dbname="marshald_marshaldb"; //marshald_marshaldb rocco_auths

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