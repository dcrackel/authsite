<?php

include('connectdb.php');

$locationId = $_GET['lId'];
$regionId = $_GET['rId'];

if ($locationId == 0) {
	$sqlcode = mysql_query("select r.region_id as group_id, r.region as branch, '0' as region_id, 'Middle Kingdom' as region from region r where r.region_id = $regionId");
} else {
	$sqlcode = mysql_query("select group_id, branch, b.region_id, region from branch b, region r where group_id = $locationId AND b.region_id = r.region_id");
}

$jsonObj= array();
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}


$final_res =json_encode($jsonObj) ;
echo $final_res;

?>