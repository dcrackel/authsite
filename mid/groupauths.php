<?php

include('connectdb.php');

$locationId = $_GET['lId'];
$regionId = $_GET['rId'];


if ($locationId == 0) {
	$sqlcode = mysql_query("SELECT p.person_id, first_SCA, last_SCA, autht.category_id, a.type_id from person p, authorization a, branch b, region r, auth_type autht, auth_category ac where p.deleted = 0 and p.person_id = a.person_id and p.group_id = b.group_id and b.region_id = r.region_id and a.type_id = autht.type_id and autht.category_id = ac.category_id and b.region_id = $regionId ORDER BY p.person_id, category_id, a.type_id");
} else {
	$sqlcode = mysql_query("SELECT p.person_id, first_SCA, last_SCA, autht.category_id, a.type_id FROM person p, authorization a, auth_type autht WHERE p.deleted = 0 and group_id = $locationId AND p.person_id = a.person_id AND a.type_id = autht.type_id ORDER BY p.person_id, category_id, a.type_id");
}

$jsonObj= array();
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}


$final_res =json_encode($jsonObj) ;
echo $final_res;

?>