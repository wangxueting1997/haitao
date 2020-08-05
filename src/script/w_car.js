// 引入模块
import {
    $ajaxpromise,
    objtostring,
    $,
    cookie
} from './moulib/regmod.js'



//获取cookie部分
if (cookie.get('cookiesid') && cookie.get('cookienum')) {
    let arrsid = cookie.get('cookiesid').split(',');
    let arrnum = cookie.get('cookienum').split(',');
    for (let i = 0; i < arrsid.length; i++) {
        renderCoo(arrsid[i], arrnum[i]);
    }
    // console.log(arrsid);
    // console.log(arrnum);

    let prosum = 0;
    let oPro = $('.pro');
    let allchoose = $('#allchoose');

    // 点击全选按钮就全选

    allchoose.onclick = function (ev) {
        var ev = ev || window.event;
        let prochecks = $('.prochoose', true);
        for (let i = 0; i < prochecks.length; i++) {
            prochecks[i].checked = allchoose.checked;
        }
        let proallpri = $('.proallpri', true);
        for (let i = 0; i < arrnum.length; i++) {
            prosum += parseFloat(proallpri[i].innerHTML)
        }
        $('.sumprice').innerHTML = '￥' + prosum;

    }
    // 渲染出来每条商品记录框的 点击事件
    // 包括：数量加减、输入框数量变化、删除功能、及对应的cookie变化
   
    oPro.onclick = function (ev) {
        // console.log(ev.target);

        let proallpri = $('.proallpri', true);
        let alldanjia = $('.danjia', true);
        let allinputs = $('.prochoose', true);

        var ev = ev || window.event;
        let numpar = ev.target.parentNode;
        let coulsid = ev.target.parentNode.parentNode.parentNode.className;
        // 数量加
        if (ev.target.className === 'jia') {
            numpar.children[2].value++;
            if (numpar.children[2].value >= 999) {
                numpar.children[2].value = 999;
            }
            let index = arrsid.indexOf(coulsid);
            arrnum[index] = parseInt(numpar.children[2].value);
            cookie.set('cookienum', arrnum.toString(), 7);
            let alldanjia = $('.danjia', true);
            proallpri[index].innerHTML = (alldanjia[index].innerHTML) * arrnum[index];

            if (allinputs[index].checked) {
                prosum += parseFloat((alldanjia[index].innerHTML));
                $('.sumprice').innerHTML = '￥' + prosum;
            } else {
                prosum += parseFloat((alldanjia[index].innerHTML));
            }
        }
        // 数量减
        if (ev.target.className === 'jian') {
            numpar.children[2].value--;
            if (numpar.children[2].value <= 1) {
                numpar.children[2].value = 1;
            }
            let index = arrsid.indexOf(coulsid);
            arrnum[index] = parseInt(numpar.children[2].value);
            cookie.set('cookienum', arrnum.toString(), 7);
            let alldanjia = $('.danjia', true);
            proallpri[index].innerHTML = (alldanjia[index].innerHTML) * arrnum[index];

            if (allinputs[index].checked) {
                prosum -= parseFloat((alldanjia[index].innerHTML));
                $('.sumprice').innerHTML = '￥' + prosum;
            } else {
                prosum -= parseFloat((alldanjia[index].innerHTML));
            }
        }
        // 数量输入框
        if (ev.target.className === 'num') {
            let numtar = ev.target;
            let oldnumval = numtar.value;
            // console.log(oldnumval);
            numtar.onchange = function () {
                let reg1 = /^\d{1,3}$/;
                if (!(reg1.test(numtar.value))) {
                    alert('请输入999以内的数字');
                    numtar.value = '1';
                    numtar.focus();
                }

                let index = arrsid.indexOf(coulsid);
                arrnum[index] = parseInt(numpar.children[2].value);
                cookie.set('cookienum', arrnum.toString(), 7);
                let alldanjia = $('.danjia', true);
                proallpri[index].innerHTML = (alldanjia[index].innerHTML) * arrnum[index];

                // bug : 必须要先选中复选框再调节input值才能正常
                // 先调节input的值会乱七八糟

                if (allinputs[index].checked) {
                    prosum -= parseFloat((alldanjia[index].innerHTML) * oldnumval);
                    prosum += parseFloat((alldanjia[index].innerHTML) * arrnum[index]);
                    $('.sumprice').innerHTML = '￥' + prosum;

                } else {
                    prosum = parseFloat((alldanjia[index].innerHTML) * oldnumval)
                    prosum -= parseFloat((alldanjia[index].innerHTML) * oldnumval);
                    prosum += parseFloat((alldanjia[index].innerHTML) * arrnum[index]);
                }
                // console.log(prosum);
            }
        }
        // 删除本条商品记录
        if (ev.target.className === 'delproul') {
            let delpar = ev.target.parentNode.parentNode;
            delpar.remove();
            let delsid = delpar.className;
            let delindex = arrsid.indexOf(delsid);
            arrsid.splice(delindex, 1);
            arrnum.splice(delindex, 1);
            cookie.set('cookiesid', arrsid.toString(), 7);
            cookie.set('cookienum', arrnum.toString(), 7);
        }
        // 点击按钮 和全选之间的关联    
        if (ev.target.className === 'prochoose') {
            // 单个按钮和全选的关系
            let allflag = true;
            // let allinputs = $('.prochoose', true);
            for (let k = 0; k < allinputs.length; k++) {
                if (!(allinputs[k].checked)) {
                    allflag = false;
                    continue;
                }
            }
            if (allflag) {
                allchoose.checked = true;
            } else {
                allchoose.checked = false;
            }
            // 按钮选中做金额变化
            let choosepar = ev.target.parentNode.parentNode;
            let choosesid = choosepar.className;
            let chooseindex = arrsid.indexOf(choosesid);
            let choosenum = arrnum[chooseindex];

            let allnuminputs = $('.num', true);
            console.log(allnuminputs[chooseindex].value);
            if (ev.target.checked) {
                if (allnuminputs[chooseindex].value !== choosenum) {
                    prosum = (alldanjia[chooseindex].innerHTML) * choosenum;
                    // prosum += (alldanjia[chooseindex].innerHTML) * choosenum;
                    // prosum += parseFloat(proallpri[chooseindex].innerHTML);
                    $('.sumprice').innerHTML = '￥' + prosum;
                } else {
                    prosum += parseFloat(proallpri[chooseindex].innerHTML);
                    $('.sumprice').innerHTML = '￥' + prosum;
                }
            } else {
                prosum -= (alldanjia[chooseindex].innerHTML) * choosenum;
                // prosum -= parseFloat(proallpri[chooseindex].innerHTML);
                $('.sumprice').innerHTML = '￥' + prosum;

            }
        }
    }
}

//渲染部分，获得全部数据，遍历数据，sid作比较找到那一条数据 字符串拼接
function renderCoo(sid, num) {
    $ajaxpromise({
        url: 'http://localhost/haitao/php/w_getdata.php'
    }).then(function (data) {
        let alldata = JSON.parse(data);
        // console.log(alldata);


        let str = '';
        for (let i = 0; i < alldata.length; i++) {
            if (alldata[i].sid === sid) {
                // console.log(alldata[i]);
                str += `
                        <ul class="${alldata[i].sid}">
                            <li>
                                <input type="checkbox" class="prochoose">
                                <a href="javascript:;"><img src="${alldata[i].url}" alt=""></a>
                            </li>
                            <li>
                                <h2>${alldata[i].title}</h2>
                                <p>出产品牌 : ${alldata[i].goodsadd}</p>
                            </li>
                            <li>
                                <strong class="danjia">${alldata[i].price}</strong>
                            </li>
                            <li>
                                <div>
                                    <a href="javascript:;" class="jian">-</a>
                                    <a href="javascript:;" class="jia">+</a>
                                    <input type="text" value="${num}" class="num">
                                </div>
                            </li>
                            <li>
                                <strong class="proallpri">${(num * alldata[i].price)}</strong>
                            </li>
                            <li>
                                <a href="javascript:;" class="delproul">删除</a>
                            </li>
                        </ul>
                `;
            }
        }
        $('.pro').innerHTML += str;
    })
}
