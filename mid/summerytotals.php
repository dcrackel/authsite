
<?php

include('connectdb.php');

$sqlcode = mysql_query("CREATE TEMPORARY TABLE IF NOT EXISTS marshald_marshaldb.table2 AS (SELECT count(*), b.region_id, c.category_id, a.person_id, a.expire_date FROM authorization a join auth_type autht on a.type_id = autht.type_id join auth_category c on autht.category_id = c.category_id join person p on p.person_id = a.person_id join branch b on b.group_id = p.group_id where current_date < a.expire_date group by b.region_id, c.category_id, a.person_id, p.deleted = 0);");
$sqlcode2 = mysql_query("Select count(*) as tots, region_id, category_id from table2 group by region_id, category_id;");

$jsonObj= array();

$res = mysql_query($sqlcode);
while($result=mysql_fetch_object($sqlcode2))
{
  $jsonObj[] = $result;
}

$final_res =json_encode($jsonObj) ;
echo $final_res;

?>

