<?php
include('connectdb.php');

$regionId = $_GET['rId'];
$authTypeId = $_GET['aId'];
$sqlcode = "";

//$sqlcode = mysql_query("SELECT p.person_id, p.first_legal, p.last_legal, p.first_SCA, p.last_SCA, b.branch, r.region, auc.category, a.expire_date, aut.type, auc.category_id, aut.type_id FROM authorization a, person p, branch b, auth_type aut, auth_category auc, region r WHERE p.deleted = 0 and p.person_id = a.person_id and p.group_id = b.group_id and a.type_id = aut.type_id and aut.category_id = auc.category_id and b.region_id = r.region_id and r.region_id = $regionId and aut.category_id = $authTypeId ORDER BY p.person_id");

if ($authTypeId == "1"){
    $sqlcode = mysql_query("SELECT `person_id`, COUNT(CASE WHEN `type_id` = 37 THEN 1 ELSE null END) AS '37', COUNT(CASE WHEN `type_id` = 38 THEN 1 ELSE null END) AS '38', COUNT(CASE WHEN `type_id` = 39 THEN 1 ELSE null END) AS '39',  COUNT(CASE WHEN `type_id` = 40 THEN 1 ELSE null END) AS '40', COUNT(CASE WHEN `type_id` = 41 THEN 1 ELSE null END) AS '41', COUNT(CASE WHEN `type_id` = 42 THEN 1 ELSE null END) AS '42', COUNT(CASE WHEN `type_id` = 43 THEN 1 ELSE null END) AS '43', COUNT(CASE WHEN `type_id` = 44 THEN 1 ELSE null END) AS '44', COUNT(CASE WHEN `type_id` = 45 THEN 1 ELSE null END) AS '45', COUNT(CASE WHEN `type_id` = 46 THEN 1 ELSE null END) AS '46', COUNT(CASE WHEN `type_id` = 47 THEN 1 ELSE null END) AS '47', COUNT(CASE WHEN `type_id` = 51 THEN 1 ELSE null END) AS '51', COUNT(CASE WHEN `type_id` = 53 THEN 1 ELSE null END) AS '53' FROM `authorization` GROUP BY `person_id`");
}

if ($authTypeId == "3"){
    $sqlcode = mysql_query("SELECT `person_id`, COUNT(CASE WHEN `type_id` = 1 THEN 1 ELSE null END) AS '1', COUNT(CASE WHEN `type_id` = 2 THEN 1 ELSE null END) AS '2', COUNT(CASE WHEN `type_id` = 3 THEN 1 ELSE null END) AS '3',  COUNT(CASE WHEN `type_id` = 4 THEN 1 ELSE null END) AS '4', COUNT(CASE WHEN `type_id` = 5 THEN 1 ELSE null END) AS '5', COUNT(CASE WHEN `type_id` = 6 THEN 1 ELSE null END) AS '6', COUNT(CASE WHEN `type_id` = 9 THEN 1 ELSE null END) AS '9', COUNT(CASE WHEN `type_id` = 10 THEN 1 ELSE null END) AS '10', COUNT(CASE WHEN `type_id` = 11 THEN 1 ELSE null END) AS '11' FROM `authorization` GROUP BY `person_id`");
}

if ($authTypeId == "5"){
    $sqlcode = mysql_query("SELECT `person_id`, COUNT(CASE WHEN `type_id` = 12 THEN 1 ELSE null END) AS '12', COUNT(CASE WHEN `type_id` = 15 THEN 1 ELSE null END) AS '15', COUNT(CASE WHEN `type_id` = 16 THEN 1 ELSE null END) AS '16',  COUNT(CASE WHEN `type_id` = 17 THEN 1 ELSE null END) AS '17', COUNT(CASE WHEN `type_id` = 18 THEN 1 ELSE null END) AS '18', COUNT(CASE WHEN `type_id` = 19 THEN 1 ELSE null END) AS '19', COUNT(CASE WHEN `type_id` = 20 THEN 1 ELSE null END) AS '20', COUNT(CASE WHEN `type_id` = 52 THEN 1 ELSE null END) AS '52' FROM `authorization` GROUP BY `person_id`");
}

if ($authTypeId == "6"){
    $sqlcode = mysql_query("SELECT `person_id`, COUNT(CASE WHEN `type_id` = 22 THEN 1 ELSE null END) AS '22', COUNT(CASE WHEN `type_id` = 23 THEN 1 ELSE null END) AS '23', COUNT(CASE WHEN `type_id` = 24 THEN 1 ELSE null END) AS '24',  COUNT(CASE WHEN `type_id` = 25 THEN 1 ELSE null END) AS '25', COUNT(CASE WHEN `type_id` = 26 THEN 1 ELSE null END) AS '26', COUNT(CASE WHEN `type_id` = 27 THEN 1 ELSE null END) AS '27', COUNT(CASE WHEN `type_id` = 28 THEN 1 ELSE null END) AS '28', COUNT(CASE WHEN `type_id` = 29 THEN 1 ELSE null END) AS '29' FROM `authorization` GROUP BY `person_id`");
}

if ($authTypeId == "7"){
    $sqlcode = mysql_query("SELECT `person_id`, COUNT(CASE WHEN `type_id` = 54 THEN 1 ELSE null END) AS '54' FROM `authorization` GROUP BY `person_id`");
}

if ($authTypeId == "8"){
    $sqlcode = mysql_query("SELECT `person_id`, COUNT(CASE WHEN `type_id` = 30 THEN 1 ELSE null END) AS '30', COUNT(CASE WHEN `type_id` = 31 THEN 1 ELSE null END) AS '31', COUNT(CASE WHEN `type_id` = 32 THEN 1 ELSE null END) AS '32',  COUNT(CASE WHEN `type_id` = 33 THEN 1 ELSE null END) AS '33', COUNT(CASE WHEN `type_id` = 34 THEN 1 ELSE null END) AS '34', COUNT(CASE WHEN `type_id` = 35 THEN 1 ELSE null END) AS '35', COUNT(CASE WHEN `type_id` = 36 THEN 1 ELSE null END) AS '36' FROM `authorization` GROUP BY `person_id`");
}

$jsonObj= array();
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}

$final_res =json_encode($jsonObj) ;
echo $final_res;

?>
