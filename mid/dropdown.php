<?php

include('connectdb.php');

$something = $_GET['s'];

//old query, can be removed.
//$sqlcode = mysql_query("Select first_SCA as name, '0' as type, person_id as id FROM person where first_SCA like '%$something%'");

$sqlcode = mysql_query("Select concat(first_SCA, ' ', last_SCA) as name, '0' as type, person_id as id FROM person where first_SCA like '%$something%' or last_SCA like '%$something%'");

$jsonObj= array();
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}

$sqlcode = mysql_query("Select branch as name, '1' as type, group_id as id FROM branch where branch like '%$something%'");
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}

$sqlcode = mysql_query("SELECT region as name, '2' as type, region_id as id FROM region where region like '%$something%'");
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}


$final_res =json_encode($jsonObj) ;
echo $final_res;

?>