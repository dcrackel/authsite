<?php

include('connectdb.php');
include('funtoken.php');

$personId = $_GET['pId'];
$token = $_GET['t'];

echo $token;

//$valid = $funToken->validateToken($token);
//echo $valid;

//if ($valid) {
//    echo "Token is invalid";
//}

//if ($valid) {
    $sqlcode = mysql_query("SELECT person_id, login, first_legal, last_legal, first_SCA, last_SCA, member_number, p.group_id, birthdate, phone, address1, address2, city, state, zip, country, email, b.branch, pie, r.region, p.person_note, p.has_waiver FROM person p, branch b, region r WHERE p.deleted = 0 and person_id = $personId AND p.group_id = b.group_id and b.region_id = r.region_id");

    $jsonObj= array();
    while($result=mysql_fetch_object($sqlcode))
    {
      $jsonObj[] = $result;
    }
    $final_res =json_encode($jsonObj) ;
    
    //$arr = json_decode($final_res, TRUE);
    //$arr[] = array('person_id' => '1', 'first_SCA' => 'token', 'last_SCA' => $funToken->makeToken($uId));
    //$json = json_encode($arr);
    echo $final_res;
//} 

?>