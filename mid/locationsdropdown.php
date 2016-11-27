<?php

include('connectdb.php');

$jsonObj= array();

$sqlcode = mysql_query("SELECT group_id, branch, branch_type FROM branch Order By branch");
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}

$final_res =json_encode($jsonObj) ;
echo $final_res;

?>