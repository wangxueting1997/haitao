<?php
    header('content-type:text/html;charset=utf-8');

    include "./conn.php";
    $sql= 'select * from wgoodslist';
    $res = $conn->query($sql);

    $arr = array();
       for($i = 0;$i<$res->num_rows;$i++){
           $arr[$i]= $res->fetch_assoc();
       }
    echo json_encode($arr);


?>