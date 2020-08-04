// 列表渲染

// 引入模块
import {
    $ajaxpromise,
    objtostring,
    $,
} from './moulib/regmod.js'

let array_default = [];
let array = [];
let prev = null;
let next = null;


let oPage = $('.page');
window.onload=function(){
    $ajaxpromise({
        // url: 'http://localhost/haitao/php/w_getdata.php',
        url: 'http://localhost/haitao/php/w_listdata.php',
        data: {
            page: $('.pageact span').innerHTML
        }
    }).then(function (data) {
        let res = JSON.parse(data);
        let prisheng = [];
        let prisid = [];
        let priobj = {
        }
        let str = '';
        for (let i = 0; i < res.length; i++) {

            prisheng.push(res[i].price);
            priobj[i] = prisheng[i];
            str += `
            <li class="listlis">
                <a href="./w_detail.html?id=${res[i].sid}">
                    <img src="" class='lazy' alt="" data-src="${res[i].url}">
                    <h3>${res[i].title}</h3>
                    <p>${res[i].goodsadd}</p>
                    <div>
                        <span class="price">￥${res[i].price}</span><del> ￥${res[i].delprice} </del>
                        <a href="#"><button>加入购物车</button></a>
                    </div>
                    <em>评价：${res[i].commont}条</em>
                </a>
            </li>
            `;
        }

        $('.goodslist ul').innerHTML = str;
        lazy();
        function lazy() {
            let allimg = document.querySelectorAll('img');
            for (let i = 3; i < 7; i++) {
                allimg[i].src = allimg[i].getAttribute('data-src');
            }
            let _stop = 0;
            window.onscroll = function () {
                _stop = document.body.scrollTop || document.documentElement.scrollTop;
                var winHeight = window.innerHeight;
                for (let i = 7; i < allimg.length; i++) {
                    if (_stop > allimg[i].offsetTop - winHeight) {
                        allimg[i].src = allimg[i].getAttribute('data-src');
                    }
                }
            }
        }
    })
}



oPage.onclick = function (ev) {
    var ev = ev || window.event;
    $('.pageact span').innerHTML = ev.target.innerHTML;

    $ajaxpromise({
        // url: 'http://localhost/haitao/php/w_getdata.php',
        url: 'http://localhost/haitao/php/w_listdata.php',
        data: {
            page: $('.pageact span').innerHTML
        }
    }).then(function (data) {
        // console.log(JSON.parse(data));
        let res = JSON.parse(data);


        let prisheng = [];
        let prisid = [];
        let priobj = {
        }
        let str = '';
        for (let i = 0; i < res.length; i++) {

            prisheng.push(res[i].price);
            priobj[i] = prisheng[i];
            str += `
            <li class="listlis">
                <a href="./w_detail.html?id=${res[i].sid}">
                    <img src="" class='lazy' alt="" data-src="${res[i].url}">
                    <h3>${res[i].title}</h3>
                    <p>${res[i].goodsadd}</p>
                    <div>
                        <span class="price">￥${res[i].price}</span><del> ￥${res[i].delprice} </del>
                        <a href="#"><button>加入购物车</button></a>
                    </div>
                    <em>评价：${res[i].commont}条</em>
                </a>
            </li>
            `;
        }

        $('.goodslist ul').innerHTML = str;
        lazy();

        // 懒加载
        function lazy() {
            let allimg = document.querySelectorAll('img');
            for (let i = 3; i < 7; i++) {
                allimg[i].src = allimg[i].getAttribute('data-src');
            }
            let _stop = 0;
            window.onscroll = function () {
                _stop = document.body.scrollTop || document.documentElement.scrollTop;
                var winHeight = window.innerHeight;
                for (let i = 7; i < allimg.length; i++) {
                    if (_stop > allimg[i].offsetTop - winHeight) {
                        allimg[i].src = allimg[i].getAttribute('data-src');
                    }
                }
            }
        }

        // 排序
        array_default = [];
        array = [];
        prev = null;
        next = null;


        let allLis = $('.listlis', true);
        // let allprice = $('.goodslist ul .price', true);
        let allprice = $('.listlis .price', true);
        console.log(allprice);
        for (let k = 0; k < allLis.length; k++) {
            array[k] = allLis[k];
            array_default[k] = allLis[k];
        }

        // 默认情况下
        $('.arrdefault').onclick = function () {
            for (let j = 0; j < array_default.length; j++) {
                $('.goodslist ul').appendChild(array_default[j]);
            }
        }
        // 升序
        $('.prisheng').onclick = function () {
            for (let i = 0; i < array.length ; i++) {
                for (let j = i; j < array.length ; j++) {
                    // console.log(array);
                    prev = parseFloat(allprice[i].innerHTML.substring(1));
                    next = parseFloat(allprice[j].innerHTML.substring(1));
                    if (prev > next) {
                        // array[j]=(allprice[j].parentNode.parentNode.parentNode);  
                        let temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                }
            }
            for (let k = 0; k < array.length - 1; k++) {
                // console.log(array[k]);
                $('.goodslist ul').appendChild(array[k]);
            }
        }
    })
}






