<?php

include('connectdb.php');

$groupId = $_GET['gId'];
$sqlcode = mysql_query("Select region from branch b, region r where b.region_id = r.region_id and b.group_id = $groupId");

$jsonObj= array();
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}
$final_res =json_encode($jsonObj) ;
echo $final_res;

?>