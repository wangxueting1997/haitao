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
            if(alldata[i].sid === sid){
                // console.log(alldata[i]);
                str += `
                        <ul>
                            <li>
                                <input type="checkbox">
                                <a href="#"><img src="${alldata[i].url}" alt=""></a>
                            </li>
                            <li>
                                <h2>${alldata[i].title}</h2>
                                <p>包装规格:4片*2</p>
                            </li>
                            <li>
                                <strong>${alldata[i].price}</strong>
                            </li>
                            <li>
                                <div>
                                    <a href="#" class="jian">-</a>
                                    <a href="#" class="jia">+</a>
                                    <input type="text" value="${num}" class="num">
                                </div>
                            </li>
                            <li>
                                <strong>${(num * alldata[i].price).toFixed(2)}</strong>
                            </li>
                            <li>
                                <a href="#">删除</a>
                            </li>
                        </ul>
                `;
            }           
        }
        $('.pro').innerHTML+=str;

    })
}
