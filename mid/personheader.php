<?php

include('connectdb.php');

$personId = $_GET['pId'];
$sqlcode = mysql_query("SELECT person_id, login, first_legal, last_legal, first_SCA, last_SCA, member_number, p.group_id, birthdate, phone, address1, address2, city, state, zip, country, email, b.branch, pie, r.region, p.person_note FROM person p, branch b, region r WHERE person_id = $personId AND p.group_id = b.group_id and b.region_id = r.region_id");

$jsonObj= array();
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}
$final_res =json_encode($jsonObj) ;
echo $final_res;

?>