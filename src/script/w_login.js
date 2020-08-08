// login

// 引入模块
import {
    $ajaxpromise,
    objtostring,
    $,
    cookie
} from './moulib/regmod.js';

let username = $('.username');
let userpass = $('.userpass');
let regBtn = $('.regBtn');

let checkrem = $('#checkbox');
console.log(checkrem);

if(cookie.get('username')){
    username.value=cookie.get('username');
    if(cookie.get('userpass')){
        userpass.value=cookie.get('userpass');
    }
}


regBtn.onclick = function () {
    $ajaxpromise({
        // url: `http://localhost/haitao/php/w_login.php`,
        url:'http://10.31.163.85/haitao/php/w_login.php',
        data: {
            username: username.value,
            userpass: userpass.value,
        },
        type: 'post'
    }).then(function (d) {
        if (d) {
            if (checkrem.checked) {
                cookie.set('username', username.value, 7);
                cookie.set('userpass', userpass.value, 7);
            } else {
                cookie.set('username', username.value, 7);
                cookie.remove('userpass');
            }
            document.cookie = `islogin=true;path=/`;

            // alert('登录成功');
            // location.href = 'http://localhost/haitao/src/w_head.html';
            location.href='http://10.31.163.85/haitao/src/w_head.html';
        } else {
            alert('请重新登录');
        }
    })
}