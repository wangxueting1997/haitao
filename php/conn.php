<?php
    header('content-type:text/html;charset=utf-8');

    header('Access-Control-Allow-Origin:*');//任意域名访问
    header('Access-Control-Allow-Method:POST,GET');//允许的请求方式

    define('HOSTNAME','localhost');
    define('USERNAME','root');
    define('PASSWORD','root');
    define('DBNAME','js2004');

    $conn = new mysqli(HOSTNAME,USERNAME,PASSWORD,DBNAME);
    if($conn->connect_error){
        die('数据库连接失败'.$conn->connect_error);
    }