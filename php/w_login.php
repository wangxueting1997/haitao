<?php
include "conn.php";

// if(isset($_POST['name']) && isset($_POST['pass'])){
    $name = $_POST['username'];
    $pass = $_POST['userpass'];
    $result = $conn->query("select * from wreg where username = '$name' and userpass ='$pass'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
// }
