<?php

include('connectdb.php');

$regionId = $_GET['rId'];
$sqlcode = mysql_query("SELECT p.person_id, p.First_SCA, p.last_SCA, b.group_id, b.branch, r.region, atype.category_id, acat.category, a.expire_date FROM `person` p, `branch` b, `region` r, `authorization` a, `auth_type` type, `auth_category` acat WHERE p.person_id = a.person_id and p.group_id = b.group_id and b.region_id = r.region_id and r.region_id = $regionId and a.type_id = atype.type_id and atype.category_id = acat.category_id GROUP BY p.person_id, type.category_id HAVING MAX(expire_date) Order By r.region, b.branch, p.First_SCA, atype.category_id");

$jsonObj= array();
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}

$final_res =json_encode($jsonObj) ;
echo $final_res;

?>
