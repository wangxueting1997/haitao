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
        
        if($res1){
            // echo 'alert("注册成功");location.href="http://localhost/haitao/src/w_login.html";';
            // header('location:http://localhost/haitao/src/w_login.html');
            // echo '<script>alert("注册成功");</script>';
            // echo 'alert("注册成功");';
            echo true;

        }
        else{
            // header('location:http://localhost/haitao/src/w_reg.html');
            echo false;
        }

    }


?>