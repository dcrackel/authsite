<?php
    $hostname="localhost:3306";
    $username="marshaldbmidreal"; //marshaldbmidreal_authsite rocco_auths
    $password="Cando@123"; //Dr4g0nMidrealm! Dr4g0n
    $dbname="marshald_marshaldb"; //marshald_marshaldb rocco_auths

	$personId = $_GET['pId'];
	$scaName = $_GET['scaName'];
    $scaLast = $_GET['scaLast'];
	$addfunction = $_GET['aFn'];
    $user = $_GET['user'];

	$today = date("Y-m-d H:i:s");

	//echo 'personId ' . $personId  . ' authid ' . $authid . ' addfunction ' . $addfunction . ' usernote ' . $usernote;
	// Create connection
	//$conn = new mysqli($servername, $username, $password, $dbname);
    $conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	if (strpos($addfunction,'1') !== false) {
		$sql = "insert into person (first_SCA, last_SCA, member_number, addedon) VALUES ('$scaName','$scaLast', '99999999', '$today');";
        //$result = mysqli_query($conn, $sql, MYSQLI_USE_RESULT)
		if ($conn->query($sql) === TRUE) {
			//$final_res =json_encode("<tag>Complete</tag>") ;
			$final_res = $conn->insert_id;
		} else {
			$final_res =json_encode("Error1: " . $sql . " " . $conn->error);
		}

	}

	if (strpos($addfunction,'0') !== false) {
		//$sql = "delete from authorization where person_id = $personId;";
        $sql = "update authorization set deleted = 1, deleted_by = '" . $user . "' where person_id = " .$personId .";";

		if ($conn->query($sql) === TRUE) {
			$final_res = 0;
		} else {
			$final_res =json_encode("Error2: " . $sql . " " . $conn->error) ;
		}

		//$sql = "delete from person where person_id = $personId;";
        $sql = "update person set deleted = 1, deleted_by = '" . $user . "' where person_id = " .$personId .";";
		if ($conn->query($sql) === TRUE) {
			$final_res = $final_res + 1;
		} else {
			$final_res =json_encode("Error3: " . $sql . " " . $conn->error) ;
		}

	}

	$conn->close();
	echo $final_res;

?>
