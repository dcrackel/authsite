<?php

include('connectdb.php');

$personId = $_GET['pId'];
//$sqlcode = mysql_query("SELECT auth_id, person_id, a.type_id, issued, status_id, rank_id, note, at.category_id, type, category, expire_date, fu.id, fu.date, fu.id, fu.marshal1_id, fu.marshal2_id, fu.partner_id, fu.path FROM authorization a, auth_type at, auth_category ac, file_upload fu WHERE a.deleted = 0 and person_id = $personId AND a.type_id = at.type_id AND a.auth_id = fu.authid AND at.category_id = ac.category_id order by at.category_id , a.type_id");

$sqlcode = mysql_query("SELECT auth_id, person_id, a.type_id, issued, status_id, rank_id, note, at.category_id, type, category, expire_date FROM authorization a, auth_type at, auth_category ac WHERE a.deleted = 0 and person_id = $personId AND a.type_id = at.type_id AND at.category_id = ac.category_id order by at.category_id , a.type_id");

$jsonObj= array();
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}


$final_res =json_encode($jsonObj) ;
echo $final_res;

?>