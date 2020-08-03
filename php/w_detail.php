<?php

    header('content-type:text/html;charset=utf-8');

    include "./conn.php";

    if(isset($_GET['sid'])){
        $id = $_GET['sid'];
        $sql = "select * from wgoodslist where sid = $id";
        $res = $conn->query($sql);
        
        echo json_encode($res->fetch_assoc());

    }

?>
