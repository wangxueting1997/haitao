<?php
    header('content-type:text/html;charset=utf-8');
    include "./conn.php";
          
    if(isset($_POST['username'])){
        $username = $_REQUEST['username'];
        
        $result=$conn->query("select * from wreg where username = '$username'");
        if($result->fetch_assoc()){
            echo true;
        }else{
            echo false;
        }
      
    }
    
    if(isset($_POST['submit'])){
        $username = $_REQUEST['username'];
        $userpass = $_REQUEST['userpass'];
        $repass =$_REQUEST['repass'];
        $phone=$_REQUEST['phone'];
            
        $insertUser = "INSERT INTO wreg VALUES(null,'$username','$userpass','$repass','$phone')";
        $res1 = $conn->query($insertUser);
        
       

    }


?>