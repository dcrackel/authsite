<?php
include('connectdb.php');

$regionId = $_GET['rId'];
$authTypeId = $_GET['aId'];
$sqlcode = "";

//$sqlcode = mysql_query("SELECT p.person_id, p.first_legal, p.last_legal, p.first_SCA, p.last_SCA, b.branch, r.region, auc.category, a.expire_date, aut.type, auc.category_id, aut.type_id FROM authorization a, person p, branch b, auth_type aut, auth_category auc, region r WHERE p.deleted = 0 and p.person_id = a.person_id and p.group_id = b.group_id and a.type_id = aut.type_id and aut.category_id = auc.category_id and b.region_id = r.region_id and r.region_id = $regionId and aut.category_id = $authTypeId ORDER BY p.person_id");

if ($authTypeId == "1"){
    $sqlcode = mysql_query("CALL `marshalAuthsByPerson`($regionId);");
}
if ($authTypeId == "3"){
    $sqlcode = mysql_query("CALL `armoredAuthsByPerson`($regionId);");
}
if ($authTypeId == "5"){
    $sqlcode = mysql_query("CALL `rapierAuthsByPerson`($regionId);");
}
if ($authTypeId == "6"){
    $sqlcode = mysql_query("CALL `youthAuthsByPerson`($regionId);");
}
if ($authTypeId == "7"){
    $sqlcode = mysql_query("CALL `coursingAuthsByPerson`($regionId);");
}
if ($authTypeId == "8"){
    $sqlcode = mysql_query("CALL `equestrianAuthsByPerson`($regionId);");
}

$jsonObj= array();
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}

$final_res =json_encode($jsonObj) ;
echo $final_res;

?>
