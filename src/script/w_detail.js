
// 引入模块
import {
    $ajaxpromise,
    objtostring,
    $,
    cookie
} from './moulib/regmod.js'


// 商品详情渲染
let sid = location.search.split('?')[1].split('=')[1];
// console.log(sid);
$ajaxpromise({
    url: 'http://localhost/haitao/php/w_detail.php',
    data: {
        sid: sid
    }
}).then(function (data) {
    let res = JSON.parse(data);
    // console.log(res);

    $('.goods_nav').innerHTML += res.title;
    $('.spic img').src = res.url;
    $('.goodstit').innerHTML = res.title;
    $('.priBox em').innerHTML = res.price;
    $('.priBox i').innerHTML = '指导价： ￥' + res.delprice;
    $('.goodsadd').innerHTML = res.goodsadd;
    $('.pinpai').innerHTML = res.goodsadd;
    $('.bf img').src = res.url;


    let piclisturl = res.piclisturl;
    let urlarr = piclisturl.split(',');
    // console.log(urlarr);
    // 渲染图片列表，当前展出图片加 actli 的类名 class="actli"
    let str = '';
    for (let i = 0; i < urlarr.length; i++) {
        str += `
        <li><img src="${urlarr[i]}" alt="" ></li>
        `;
    }
    $('.picul ul').innerHTML += str;
})

// cookie
let arrsid = [];
let arrnum = [];
function ctoarr() {
    if (cookie.get('cookiesid') && cookie.get('cookienum')) {
        arrsid = cookie.get('cookiesid').split(',');
        arrnum = cookie.get('cookienum').split(',');
    } else {
        arrsid = [];
        arrnum = [];
    }
}

// 点击 加入购物车 按钮就存入cookie
$('.gouBtn').onclick = function () {
    ctoarr();
    if (arrsid.indexOf(sid) === -1) {
        arrsid.push(sid);
        arrnum.push($(".count").value);

        cookie.set('cookiesid', arrsid.toString(), 7);
        cookie.set('cookienum', arrnum.toString(), 7);
    } else {
        let index = arrsid.indexOf(sid);
        arrnum[index] = parseInt(arrnum[index]) + parseInt($(".count").value);
        cookie.set('cookienum', arrnum.toString(), 7);
    }
    alert('成功加入购物车');
}

// jia jian 数量的加减
$('.jia').onclick = function () {
    $('.count').value++;
    if ( $('.count').value >= 999) {
        $('.count').value = 999;
   }
}
$('.jian').onclick = function () {
    $('.count').value--;
    if ( $('.count').value <= 1) {
         $('.count').value = 1;
    }
}

// 数量框不能输数字以外的字符   
$('.count').onchange = function () {
    let reg1 = /^\d{1,3}$/;
    if (!(reg1.test($('.count').value))) {
        alert('请输入999以内的数字');
        $('.count').value = '1';
    }
    // return false;    
}
// 放大镜--小图放大会糊糊的
class Scale {
    constructor() {
        this.spic = $('.spic');
        this.sf = $('.sf');
        this.bf = $('.bf');
        this.bpic = $('.bpic');
        this.wrap = $('.wrap');

        this.picul = $('.picul ul');
        this.picli = $('.picul ul li');
        this.len = 0;
    }
    init() {
        this.spic.onmouseover = function () {
            // 小放的出现会让move事件有点卡顿，原网站也是没有小放的框的，所以确定位置后就把小放隐形了
            // $('.sf').style.visibility = 'visible';
            $('.bf').style.visibility = 'visible';
        }
        let widthsf = this.bf.offsetWidth * this.spic.offsetWidth / this.bpic.offsetWidth;
        let heightsf = this.bf.offsetHeight * this.spic.offsetHeight / this.bpic.offsetHeight;
        this.sf.style.width = widthsf + 'px';
        this.sf.style.height = heightsf + 'px';

        this.ratio = this.bpic.offsetWidth / this.spic.offsetWidth;
        this.bf.onmousemove = (ev) => {
            var ev = ev || window.event;
            let left1 = ev.pageX - this.spic.offsetLeft - this.bf.offsetLeft - this.sf.offsetWidth / 2;
            let top1 = ev.pageY - this.spic.offsetTop - this.bf.offsetHeight / 2 - this.sf.offsetHeight / 2;

            if (left1 < 0) {
                left1 = 0;
            } else if (left1 >= this.spic.offsetWidth - this.sf.offsetWidth) {
                left1 = this.spic.offsetWidth - this.sf.offsetWidth;
            }
            if (top1 < 0) {
                top1 = 0;
            } else if (top1 >= this.spic.offsetHeight - this.sf.offsetHeight) {
                top1 = this.spic.offsetHeight - this.sf.offsetHeight;
            }
            this.sf.style.left = left1 + 'px';
            this.sf.style.top = top1 + 'px';

            this.bpic.style.left = -this.ratio * left1 + 'px';
            this.bpic.style.top = -this.ratio * top1 + 'px';

        }
        this.bf.onmouseout = function () {
            $('.bf').style.visibility = 'hidden';
        }
        this.picchange();
    }
    // 当前展出图片加 actli 的类名 class="actli"
    // 利用循环ul的孩子让所有li的类名先清除，再添加当前展出图片的类名
    picchange() {
        this.picul.onclick = function (ev) {
            var ev = ev || window.event;
            let allLi = ev.target.parentNode.parentNode.children;
            if (ev.target.parentNode.nodeName === "LI") {
                $('.spic img').src = ev.target.src;
                $('.bf img').src = ev.target.src;
                for (let i = 0; i < allLi.length; i++) {
                    allLi[i].className = '';
                }
                ev.target.parentNode.className += 'actli';
            }
        }
    }
}
new Scale().init();



