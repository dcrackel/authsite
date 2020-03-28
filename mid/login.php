<?php

include('connectdb.php');
include('funtoken.php');

//"9284125a5994274493ad63e2e2cfd40d"
$uId = $_GET['uId'];
$hash = $_GET['p'];
$error = false;

if (strlen($hash) < 3){ 
    $jsonObj= array('person_id' => '0', 'first_SCA' => '', 'rank_id' => 0);
    echo "[" . json_encode($jsonObj) . "]";
    $error = true;
}

if (!$error){
    $funToken = new FunToken;
    //$token = $funToken->makeToken($uId);
    //echo "TOKEN ||" . $token . "||";
    // $password = sha1(SALT.$_POST["password"]);
    // $sqlcode = mysql_query("UPDATE person SET password='".$password."' WHERE id=".$uId);
    //UPDATE person SET hash=MD5('') WHERE person_id= xxxx

    //$sql = mysql_query("SELECT p.person_id, a.type_id as rank_id, p.first_SCA FROM person p, authorization a where email = '$uId' AND hash = '$hash' AND p.person_id = a.person_id");
    $sql = mysql_query("SELECT p.person_id, p.first_SCA, IFNULL((SELECT type_id FROM authorization a where person_id = p.person_id and (type_id = 46 or type_id = 47) LIMIT 1), 0) as rank_id
    FROM person p, authorization a where email = '$uId' AND hash = '$hash'  AND p.person_id = a.person_id");
    //echo $sql;  

    $jsonObj= array();
    while($result=mysql_fetch_object($sql))
    {
      $jsonObj[] = $result;
    }

    $final_res =json_encode($jsonObj);
    
    $arr = json_decode($final_res, TRUE);
    $arr[] = array('person_id' => '1', 'first_SCA' => 'token', 'rank_id' => $funToken->makeToken($uId));
    $json = json_encode($arr);
    
    echo $json;
}

?>
