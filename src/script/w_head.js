
// 引入模块
import {
    $ajaxpromise,
    objtostring,
    $
} from './moulib/regmod.js'

// 获取数据渲染
$ajaxpromise({
    url: 'http://localhost/haitao/php/w_getdata.php',

}).then(function (data) {
    // console.log(JSON.parse(data));
    let res = JSON.parse(data);
    let str = `
        <div class="kuanli">
        <a href="./w_detail.html?id=${res[0].sid}">            
                <img src="${res[0].url}" alt="">
            </a>
        </div>
    `;
    let str2 = '';
    for (let i = 1; i < 7; i++) {
        // console.log(res[i]);
        str += `       
            <li>
                <a href="./w_detail.html?id=${res[i].sid}">
                    <img src="${res[i].url}" alt="">
                    <h3>${res[i].title}</h3>
                    <p>
                    <span>￥${res[i].price}</span><del> ￥${res[i].delprice} </del>
                    </p>
                </a>
            </li>               
        `;
    }
    // 渲染右边热卖排行榜
    for (let i = 7; i < 12; i++) {
        // console.log(res[i].title);
        str2 += `
        <li>
            <a href="./w_detail.html?id=${res[i].sid}">
                <div class="con_rl">
                    <span>NO.${res[i].sid - 7}</span>
                    <img src="${res[i].url}" alt="">
                </div>
                <div class="con_rr">
                    <h4>${res[i].title}</h4>
                    <p>
                        <span>￥${res[i].price}</span><del> ￥${res[i].delprice} </del>
                    </p>
                </div>
            </a>
        </li>
        `;
    }

    // 让相同的类名都渲染
    let $str1html = $('.con_l', true);
    let $str2html = $('.con_r ul', true);

    for (let value of $str1html) {
        value.innerHTML += str;
    }
    for (let value of $str2html) {
        value.innerHTML += str2;
    }
})

// 滚动条超过700时，会出现 顶部悬浮、回到顶部、楼梯效果（锚点）
window.onscroll = function () {
    var _s = document.documentElement.scrollTop || document.body.scrollTop;
    if (_s >= 700) {
        $('.topho-wrap').style.display = 'block';
        $('.bactop').style.display = 'block';
        $('.floor').style.display = 'block';
    } else {
        $('.topho-wrap').style.display = 'none';
        $('.bactop').style.display = 'none';
        $('.floor').style.display = 'none';

    }
    // 回到顶部
    $('.bactop').onclick = () => {
        let timer = setInterval(() => {
            _s -= 10;
            if (_s <= 0) {
                _s = 0;
                clearInterval(timer);
            }
            document.documentElement.scrollTop = document.body.scrollTop = _s;

        })
    }
}

// 二级菜单
var $menuli = $('.menu ul li', true);
var $listli = $('.list .ele', true);
// 对menu的每个li加事件，然后list显示
for (let i = 0; i < $menuli.length; i++) {
    $menuli[i].onmouseover = function () {
        $('.list').style.display = 'block';
        for (let k = 0; k < $listli.length; k++) {
            $listli[k].style.display = 'none';
        }
        $listli[i].style.display = 'block';
        // 让隐形菜单出现时跟着滚动条变化--但是，我做的有问题，加了z-index还是会被挡住
        var _s = document.documentElement.scrollTop || document.body.scrollTop;
        if (_s > $('.menu').offsetTop) {
            $('.list').style.top = (_s + $('.menu').offsetTop) - $('.menu h2').offsetHeight + 'px';
        } else {
            $('.list').style.top = 0 + 'px';
        }
    }
}
$('.menu').onmouseout = function () {
    $('.list').style.display = 'none';
}
$('.list').onmouseover = function () {
    $('.list').style.display = 'block';
}
$('.list').onmouseout = function () {
    $('.list').style.display = 'none';
}

// 鼠标滑过 底边框变红色
// $('.con').onmouseover = function (ev) {
//     var ev = ev || window.event;
//     let allLi = ev.target.parentNode.children;
//     if (ev.target.nodeName === "LI") {
//         for (let i = 0; i < allLi.length; i++) {
//             allLi[i].style.borderBottom = `1px solid #ccc`;
//         }
//         ev.target.style.borderBottom = `1px solid #e73743`;
       
//     }
// }

// 轮播图

let oImgs = $('.imgBox').children;
let oDians = $('.dian').children;
let oLeft = $('.left1');
let oRight = $('.right1');

// 先将所有样式去除
// 将index对应的点点添加样式，以及图片显示

function lunChange() {
    for (let i = 0; i < oDians.length; i++) {
        oDians[i].className = '';
        oImgs[i].style.display = 'none';
    }
    oImgs[index].style.display = 'block';
    oDians[index].className = 'light';
}
var index = null;
var timer = null;
var autotimer = null;

$('.dian').onmouseover = function (ev) {
    var ev = ev || window.event;
    if (ev.target.nodeName === "LI") {
        for (let i = 0; i < oDians.length; i++) {
            oDians[i].className = '';
            oImgs[i].style.display = 'none';
            if (oDians[i] === ev.target) {
                oImgs[i].style.display = 'block';
                index = i;
            }
        }
    }
    // console.log(index);
    // lunChange();
    timer = setInterval(() => {
        lunChange();
    }, 200);
}
$('.dian').onmouseout = function () {
    clearInterval(timer);
}
oLeft.onclick = function () {
    index--;
    if (index < 0) {
        index = oDians.length - 1;
    }
    lunChange();
}
oRight.onclick = function () {
    index++;
    if (index > oDians.length - 1) {
        index = 0;
    }
    lunChange();
}
autotimer = setInterval(() => {
    oRight.onclick();
}, 3000);
// 鼠标悬浮时，停止自动播放，显示箭头
$('.lunbo').onmouseover = function () {
    clearTimeout(autotimer);
    $('.left1').style.display = 'block';
    $('.right1').style.display = 'block';
}
$('.lunbo').onmouseout = function () {
    autotimer = setInterval(() => {
        oRight.onclick();
    }, 3000);
}

// 面向对象写轮播图，，，等做完再来试一下
// class Lun{
//     constructor(oImgs,oDians,oLeft,oRight){
//         this.oImgs=oImgs;
//         this.oDians=oDians;
//         this.oLeft=oLeft;
//         this.oRight=oRight;
//     }
//     lunChange(){
//         for (let i = 0; i < oDians.length; i++) {
//             oDians[i].className = '';
//             oImgs[i].style.display = 'none';        
//         }
//         oImgs[index].style.display = 'block';
//         oDians[index].className = 'light';
//     }

// }
// new Lun().lunChange();

