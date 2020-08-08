// reg
// 引入模块
import {
    $ajaxpromise,
    objtostring,
    $
} from './moulib/regmod.js';

// 获取元素
let username = $('.username');
let userpass = $('.userpass');
let repass = $('.repass');
let phone = $('.phone');
let surema = $('.surema');
let regma = $('.regma');
let regBtn = $('.regBtn');

let oSpans = document.querySelectorAll('span');

//用户名 onblur 
let userflag = true;
username.onblur = function () {
    if (this.value !== '') {
        let userReg = /^[a-zA-Z0-9]{6,14}$/g
        if (userReg.test(this.value)) {
            oSpans[0].innerHTML = 'YES';
            oSpans[0].style.color = 'green';
            userflag = true;
        } else {
            oSpans[0].innerHTML = '格式错误';
            oSpans[0].style.color = 'red';
            userflag = false;
        }
    } else {
        oSpans[0].innerHTML = '用户名不能为空';
        oSpans[0].style.color = 'red';
        userflag = false;
    }
    // 满足输入条件后端查询用户名是否存在
    if (userflag) {
        $ajaxpromise({
            // url: `http://localhost/haitao/php/w_reg.php`,
            url:'http://10.31.163.85/haitao/php/w_reg.php',
            data: {
                username: username.value
            },
            type: 'post'
        }).then(function (d) {
            if (d) {
                oSpans[0].innerHTML = '用户名已存在';
                oSpans[0].style.color = 'red';
            } else {
                oSpans[0].innerHTML = '用户名可用';
                oSpans[0].style.color = 'green';
            }
        })
    }
}

// 密码 oninput
let passflag = true;
let oSafe = $('.safe').children;
userpass.oninput = function () {
    if (this.value.length >= 6 && this.value.length <= 12) {
        let passReg1 = /[0-9]+/;
        let passReg2 = /[a-zA-Z]+/;
        let passReg3 = /[\W\_]+/;
        let count = 0;
        if (passReg1.test(this.value)) {
            count++;
        }
        if (passReg2.test(this.value)) {
            count++;
        }
        if (passReg3.test(this.value)) {
            count++;
        }
        switch (count) {
            case 1:
                oSafe[2].style.backgroundColor = '#ccc';
                oSafe[1].style.backgroundColor = '#ccc';
                oSafe[0].style.backgroundColor = 'red';
                passflag = false;
                break;
            case 2:
                oSafe[2].style.backgroundColor = '#ccc';
                oSafe[0].style.backgroundColor = '#ccc';
                oSafe[1].style.backgroundColor = 'yellow';
                passflag = true;
                break;
            case 3:
                oSafe[0].style.backgroundColor = '#ccc';
                oSafe[1].style.backgroundColor = '#ccc';
                oSafe[2].style.backgroundColor = 'green';
                passflag = true;
                break;
        }
    } else {
        oSpans[1].innerHTML = '请按照要求输入密码';
        oSpans[1].style.color = 'red';
        passflag = false;
    }
}
userpass.onblur = function () {
    if (this.value !== '' && passflag === true) {
        oSpans[1].innerHTML = 'YES';
        oSpans[1].style.color = 'green';

    } else {
        oSpans[1].innerHTML = '密码不能为空';
        oSpans[1].style.color = 'red';
        passflag === false;
    }
}

// 确认密码 
let repassflag = true;
repass.onblur = function () {
    if (this.value === userpass.value) {
        oSpans[2].innerHTML = 'YES';
        oSpans[2].style.color = 'green';
        repassflag = true;
    } else {
        oSpans[2].innerHTML = '请和密码保持一致';
        oSpans[2].style.color = 'red';
        repassflag = false;
    }
}

// 手机号码验证 onblur
let phoneflag = true;
phone.onblur = function () {
    if (this.value !== '') {
        let userReg = /^1[35789]\d{9}$/;
        if (userReg.test(this.value)) {
            oSpans[3].innerHTML = 'YES';
            oSpans[3].style.color = 'green';
            phoneflag = true;
        } else {
            oSpans[3].innerHTML = '格式错误';
            oSpans[3].style.color = 'red';
            phoneflag = false;
        }
    } else {
        oSpans[0].innerHTML = '手机号码不能为空';
        oSpans[0].style.color = 'red';
        phoneflag = false;
    }
}

// 验证码
function YZM(yznum) {
    let arr = [];
    for (let i = 48; i <= 57; i++) {
        arr.push(String.fromCharCode(i));
    }
    for (let i = 65; i <= 90; i++) {
        arr.push(String.fromCharCode(i));
    }
    let yzm = '';
    for (let i = 1; i <= yznum; i++) {
        let ranindex = parseInt(Math.random() * arr.length);
        if (ranindex > 9) {
            let bool = Math.random() > 0.5 ? true : false;
            if (bool) {
                yzm += arr[ranindex].toLocaleLowerCase();
            } else {
                yzm += arr[ranindex];
            }
        } else {
            yzm += arr[ranindex];
        }
    }
    return yzm;
}
regma.innerHTML = YZM(5);
regma.onclick=function(){
    regma.innerHTML = YZM(5);
}
let yzmflag = true;
surema.onblur = function () {
    if (this.value === regma.innerHTML) {
        oSpans[4].innerHTML = '验证码正确';
        oSpans[4].style.color = 'green';
        yzmflag = true;
    } else {
        oSpans[4].innerHTML = '请输入正确的验证码';
        oSpans[4].style.color = 'red';
        yzmflag = false;
    }
}

// 同意协议 CheckBox
let checkok = $('#checkbox');
let checkflag = true;


// 注册按钮
regBtn.onclick = function () {
    if (!checkok.checked) {
        checkflag = false;
    } else {
        checkflag = true;
    }
    // alert(1)
    if (userflag && passflag && repassflag && phoneflag && yzmflag && checkflag) {
        $ajaxpromise({
            // url: `http://localhost/haitao/php/w_reg.php`,
            url:'http://10.31.163.85/haitao/php/w_reg.php',
            data: {
                username: username.value,
                userpass: userpass.value,
                phone: phone.value,
                repass: repass.value,
                submit: true
            },
            type: 'post'
        }).then(function () {
            alert('注册成功');
            location.href = 'http://10.31.163.85/haitao/src/w_login.html';
        })

    }
}


