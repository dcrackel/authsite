<?php
    include('connectdb.php');

	$personId = $_GET['pId'];
	$authid = $_GET['aId'];
	$usernote = $_GET['user'];

	$year2  = mktime(0, 0, 0, date("m"),   date("d"),   date("Y")+2);
	$expireDate = date("Y-m-d", $year2);
	$today = date("Y-m-d h:i");

    $sqlcode = mysql_query("SELECT `addOrRemoveAuth`($personId, $authid, '$usernote', '$expireDate');");

    $jsonObj= array();
    while($result=mysql_fetch_object($sqlcode))
    {
      $jsonObj[] = $result;
    }

    $final_res =json_encode($jsonObj) ;
    echo "[{}]";
?>

