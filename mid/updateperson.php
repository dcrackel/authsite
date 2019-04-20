<?php
    include('properties.php');

	$pid = $_GET['pId'];
	$editfirstname = $_GET['editfirstname'];
	$editfirstlast = $_GET['editfirstlast'];
	$legalfirst = $_GET['legalfirst'];
	$legallast = $_GET['legallast'];
	$membernumber = $_GET['membernumber'];
	$bod = $_GET['bod'];
	$phonenum = $_GET['phonenum'];
	$email = $_GET['email'];
	$address1 = $_GET['address1'];
	$address2 = $_GET['address2'];
	$city = $_GET['city'];
	$state = $_GET['state'];
	$zip = $_GET['zip'];
	$hash = $_GET['passhash'];
	$gip = $_GET['groupid'];
	$pie = $_GET['pietext'];
	$addhash = "";
	$groupid = "";
	$ziptext = "";

	//echo 'personId ' . $personId  . ' authid ' . $authid . ' addfunction ' . $addfunction . ' usernote ' . $usernote;

	// Create connection
	$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
    
    $editfirstname = mysqli_real_escape_string($conn, $editfirstname);
    $editfirstlast = mysqli_real_escape_string($conn, $editfirstlast);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	if ($zip != "")
	{
		$ziptext = ", zip=" . $zip;
	}


	if ($hash != "")
	{
		$addhash = ", hash='" . $hash ."'";
	}

	if ($gip != "")
	{
		if (gip != "0") $groupid = ", group_id=" . $gip;
	}

	//birthdate=$bod,
	$sql = "UPDATE person SET first_legal='$legalfirst',last_legal='$legallast',first_SCA='$editfirstname',last_SCA='$editfirstlast',member_number=$membernumber,phone='$phonenum',address1='$address1',address2='$address2',city='$city',state='$state',email='$email',birthdate='$bod', pie='$pie' $ziptext $groupid $addhash WHERE person_id = $pid;";
	//$sql = mysql_real_escape_string($sql);

    if (strlen($editfirstname) > 2) {
        if ($conn->query($sql) === TRUE) {
            $final_res = 0;
        } else {
            $final_res =json_encode("Error: " . $sql . "<br>" . $conn->error . "<br>" . $pid) ;
        }
    }

	$conn->close();
	echo $final_res;

?>
