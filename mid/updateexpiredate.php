<?php
    $hostname="localhost:3306";
    $username="marshaldbmidreal"; //marshaldbmidreal_authsite rocco_auths
    $password="Cando@123"; //Dr4g0nMidrealm! Dr4g0n
    $dbname="marshald_marshaldb"; //marshald_marshaldb rocco_auths

	$pId = $_GET['pId'];
	$tId = $_GET['tId'];
	$expire = $_GET['e'];

	//echo 'pId:' . $pId  . ' tid:' . $tId . ' e:' . $expire;

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	//marshal card
	if ($tId == 1) {
		$sql = "UPDATE authorization SET expire_date= '$expire' WHERE person_id = $pId AND type_id IN(37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47)";
	}

	//armored card
	if ($tId == 3) {
		$sql = "UPDATE authorization SET expire_date= '$expire' WHERE person_id = $pId AND type_id IN(1, 2, 3, 4, 5, 6, 9, 10, 11)";
	}

	//rapier card
	if ($tId == 5) {
		$sql = "UPDATE authorization SET expire_date= '$expire' WHERE person_id = $pId AND type_id IN(12, 16, 15, 17, 18, 19, 20, 21)";
	}

	//youth card
	if ($tId == 6) {
		$sql = "UPDATE authorization SET expire_date= '$expire' WHERE person_id = $pId AND type_id IN(22, 23, 24, 25, 26, 27, 28, 29)";
	}

	//horsey card
	if ($tId == 8) {
		$sql = "UPDATE authorization SET expire_date= '$expire' WHERE person_id = $pId AND type_id IN(30, 31, 32, 33, 34, 35, 36)";
	}

	if ($conn->query($sql) === TRUE) {
		$final_res =json_encode("Complete") ;
	} else {
		$final_res =json_encode("Error with expire_date: " . $sql . " " . $conn->error) ;
	}

	$conn->close();
	echo $final_res;

?>

