// login

// 引入模块
import {
    $ajaxpromise,
    objtostring,
    $
} from './moulib/regmod.js';

let username = $('.username');
let userpass = $('.userpass');
let repass = $('.repass');
let surema = $('.surema');
let regBtn = $('.regBtn');
let oSpans = document.querySelectorAll('span');

regBtn.onclick = function () {
    $ajaxpromise({
        url: `http://localhost/haitao/php/w_login.php`,
        data: {
            username: username.value,
            userpass: userpass.value,
        },
        type: 'post'
    }).then(function (d) {
        if (d) {
            alert('登录成功');
            location.href='http://localhost/haitao/src/w_head.html';
        } else {
            alert('请重新登录');           
        }
    })
}