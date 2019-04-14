<?php
include('connectdb.php');

$regionId = $_GET['rId'];
$authTypeId = $_GET['aId'];
$sqlcode = "";

//$sqlcode = mysql_query("SELECT p.person_id, p.first_legal, p.last_legal, p.first_SCA, p.last_SCA, b.branch, r.region, auc.category, a.expire_date, aut.type, auc.category_id, aut.type_id FROM authorization a, person p, branch b, auth_type aut, auth_category auc, region r WHERE p.deleted = 0 and p.person_id = a.person_id and p.group_id = b.group_id and a.type_id = aut.type_id and aut.category_id = auc.category_id and b.region_id = r.region_id and r.region_id = $regionId and aut.category_id = $authTypeId ORDER BY p.person_id");


if ($authTypeId == "3"){
    $sqlcode = mysql_query("SELECT `person_id`, COUNT(CASE WHEN `type_id` = 1 THEN 1 ELSE null END) AS '1', COUNT(CASE WHEN `type_id` = 2 THEN 1 ELSE null END) AS '2', COUNT(CASE WHEN `type_id` = 3 THEN 1 ELSE null END) AS '3',  COUNT(CASE WHEN `type_id` = 4 THEN 1 ELSE null END) AS '4', COUNT(CASE WHEN `type_id` = 5 THEN 1 ELSE null END) AS '5', COUNT(CASE WHEN `type_id` = 6 THEN 1 ELSE null END) AS '6', COUNT(CASE WHEN `type_id` = 9 THEN 1 ELSE null END) AS '9', COUNT(CASE WHEN `type_id` = 10 THEN 1 ELSE null END) AS '10', COUNT(CASE WHEN `type_id` = 11 THEN 1 ELSE null END) AS '11' FROM `authorization` GROUP BY `person_id`");
}

$jsonObj= array();
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}

$final_res =json_encode($jsonObj) ;
echo $final_res;

?>
