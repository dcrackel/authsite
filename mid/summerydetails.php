<?php

include('connectdb.php');

$categoryId = $_GET['cId'];
$sqlcode = mysql_query("select Count(*) as tots, autht.type_id, autht.type from person p, authorization a, branch b, region r, auth_type autht, auth_category ac where p.person_id = a.person_id and p.group_id = b.group_id and b.region_id = r.region_id and a.type_id = autht.type_id and autht.category_id = ac.category_id and ac.category_id = $categoryId AND autht.type_id != 47 AND autht.type_id != 45 AND autht.type_id != 49 AND autht.type_id != 50 AND autht.type_id != 53 AND autht.type_id != 54 and current_date < a.expire_date group by autht.type_id order by tots desc");

$jsonObj= array();
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}

$final_res =json_encode($jsonObj) ;
echo $final_res;

?>
