<?php

include('connectdb.php');

$uId = $_GET['uId'];
$hash = $_GET['p'];


//$sql = mysql_query("SELECT p.person_id, a.type_id as rank_id, p.first_SCA FROM person p, authorization a where email = '$uId' AND hash = '$hash' AND p.person_id = a.person_id");
$sql = mysql_query("SELECT p.person_id, p.first_SCA, IFNULL((SELECT type_id FROM authorization a where person_id = p.person_id and (type_id = 46 or type_id = 47)), 0) as rank_id
FROM person p, authorization a where email = '$uId' AND hash = '$hash' AND p.person_id = a.person_id");
//echo $sql;

// $password = sha1(SALT.$_POST["password"]);
// $sqlcode = mysql_query("UPDATE users SET password='".$password."' WHERE id=".$uId);
//UPDATE person SET hash=MD5('') WHERE person_id= xxxx

$jsonObj= array();
while($result=mysql_fetch_object($sql))
{
  $jsonObj[] = $result;
}


$final_res =json_encode($jsonObj) ;
echo $final_res;

?>
