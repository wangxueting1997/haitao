// 列表渲染

// 引入模块
import {
    $ajaxpromise,
    objtostring,
    $
} from './moulib/regmod.js'

$ajaxpromise({
    url: 'http://localhost/haitao/php/w_getdata.php',

}).then(function (data) {
    console.log(JSON.parse(data));
    let res = JSON.parse(data);
   
    let prisheng = [];
    let prisid = [];           
    let priobj = {
    }
    let str = '';
    for (let i = 0; i < res.length; i++) {

        prisheng.push(res[i].price);
        priobj[i]=prisheng[i];

            str += `
            <li>
                <a href="./w_detail.html?id=${res[i].sid}">
                    <img src="" class='lazy' alt="" data-src="${res[i].url}">
                    <h3>${res[i].title}</h3>
                    <p>${res[i].goodsadd}</p>
                    <div>
                        <span>￥${res[i].price}</span><del> ￥${res[i].delprice} </del>
                        <a href="#"><button>加入购物车</button></a>
                    </div>
                    <em>评价：${res[i].commont}条</em>
                </a>
            </li>
            `;
        }
              
    document.querySelector('.goodslist ul').innerHTML = str;

   



    // 懒加载
    let allimg = document.querySelectorAll('img');
    for (let i = 3; i < 7; i++) {
        allimg[i].src = allimg[i].getAttribute('data-src');
    }
    window.onscroll = function () {
        var _stop = document.body.scrollTop || document.documentElement.scrollTop;
        var winHeight = window.innerHeight;
        for (let i = 7; i < allimg.length; i++) {
            if (allimg[i].offsetTop <= _stop + winHeight) {
                allimg[i].src = allimg[i].getAttribute('data-src');
            }
        }
    }

    // 排序




})






