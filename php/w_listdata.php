<?php
    include "./conn.php";

    
    // 后端定好每页多少条数据记录，
    // 总记录数除以每页多少条数据，得到一共多少页数据
    // 由前端ajax传入页码数，按照页码查询对应的数据记录，返回给前端

    $pagesize = 12;
    $sql = "select * from wgoodslist";
    $result = $conn->query($sql);
    $num = $result->num_rows;
    $pagenum = ceil($num / $pagesize);

    if(isset($_GET['page'])){
        $pagevalue =$_GET['page'];
    }else{
        $pagevalue=1;
    }
    $page = ($pagevalue-1) * $pagesize;

    //limit接收一个或者两个数字参数(整数)
    //参1：数据开始位置的索引(从0开始)，偏移量
    //参2：返回的记录集数目。
    $sql2 = "select * from wgoodslist limit $page,$pagesize";
    $res2 = $conn->query($sql2);

    $arr = array();
    for($i=0;$i<$res2->num_rows;$i++){
        $arr[$i]=$res2->fetch_assoc();
    }
    echo json_encode($arr);


?>