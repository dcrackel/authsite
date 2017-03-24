<?php
include('connectdb.php');


$personId = $_GET['pId'];
$sqlcode = mysql_query("SELECT person_note from person WHERE person_id = $personId and deleted = 0;");

$jsonObj= array();
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}


$final_res = json_encode($jsonObj) ;
echo $final_res;

?>