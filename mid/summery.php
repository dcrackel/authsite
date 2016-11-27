<?php

include('connectdb.php');

$sqlcode = mysql_query("select Count(*) as tots, ac.category_id, r.region_id from person p, authorization a, branch b, region r, auth_type autht, auth_category ac where p.person_id = a.person_id and p.group_id = b.group_id and b.region_id = r.region_id and a.type_id = autht.type_id and autht.category_id = ac.category_id group by ac.category_id, r.region_id");

$jsonObj= array();
while($result=mysql_fetch_object($sqlcode))
{
  $jsonObj[] = $result;
}

$final_res =json_encode($jsonObj) ;
echo $final_res;

?>