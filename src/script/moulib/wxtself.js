
// 获取元素
function $(selector, all) {
    if (!all) {
        return document.querySelector(selector); //单个
    } else {
        return document.querySelectorAll(selector) //多个
    }
}

// ajaxpromise

// 对象转字符串，并且用&连接
function objtostring(obj) {
    let arr = [];
    for (let i in obj) {
        arr.push(i + '=' + obj[i]);
    }
    return arr.join('&')
}
// ajaxpromise
// function $ajaxpromise(option) {
//     let promise = new Promise((resolve, reject) => {
//         let ajax = new XMLHttpRequest();
//         // type
//         option.type = option.type || 'get';
//         // url
//         if (!option.url) {
//             throw new Error('Please send api');
//         }
//         // data
//         if (option.data) {
//             if (Object.prototype.toString.call(option.data).slice(8, -1) === 'Object') {
//                 option.data = objtostring(option.data);
//             }
//         }
//         // data & get:
//         if (option.data && option.type === 'get') {
//             option.url += '?' + option.data;
//         }
//         // async
//         if (option.async === false || option.async === 'false') {
//             option.async = false;
//         } else {
//             option.async = true;
//         }
//         ajax.open(option.type, option.url, option.async);
//         // data & post:
//         if (option.data && option.type === 'post') {
//             ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
//             ajax.send(option.data);
//         } else {
//             ajax.send();
//         }
//         // async = true
//         if (option.async) {
//             ajax.onreadystatechange = function () {
//                 if (ajax.readyState === 4) {
//                     if (ajax.status === 200) {
//                         resolve(ajax.responseText);
//                     } else {
//                         reject('wrong api')
//                     }
//                 }
//             }
//         } else {
//             if (ajax.status === 200) {
//                 resolve(ajax.responseText);
//             } else {
//                 reject('wrong api')
//             }
//         }
//     });
//     return promise;
// }


function $ajaxpromise(option) {
    let promise = new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        //1.请求方式：post和get  默认是get
        option.type = option.type || 'get';

        //2.接口地址：不能为空。
        if (!option.url) {
            throw new Error('请输入接口地址');
        }
        //3.传输数据：数组是否存在，数组支持拼接的，对象格式会有问题。
        //3.1get:地址栏后面?和&
        if (option.data) { //数据存在
            if (Object.prototype.toString.call(option.data).slice(8, -1) === 'Object') { //是对象
                option.data = objtostring(option.data)
            }
        }
        //3.2数据存在，同时是get请求
        if (option.data && option.type === 'get') {
            option.url += '?' + option.data
        }

        //4.是否异步
        if (option.async === false || option.async === 'false') {
            option.async = false;
        } else {
            option.async = true;
        }

        ajax.open(option.type, option.url, option.async);

        //3.3数据存在，同时是post请求
        if (option.data && option.type === 'post') {
            ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            ajax.send(option.data);
        } else {
            ajax.send();
        }

        //5.如果是同步无需监听的，异步才监听。
        if (option.async) { //异步监听就绪状态码
            ajax.onreadystatechange = function() {
                if (ajax.readyState === 4) {
                    if (ajax.status === 200) {
                        resolve(ajax.responseText);
                    } else {
                        reject('你的接口地址有误');
                    }
                }
            }
        } else { //同步顺序执行
            if (ajax.status === 200) {
                resolve(ajax.responseText);
            } else {
                reject('你的接口地址有误');
            }
        }
    });

    return promise; //返回promise实例，使用then和catch方法。
};

// cookie
let cookie = {
    set: function (key, value, day) {
        let d = new Date();
        d.setDate(d.getDate()+day);
        document.cookie=`${key}=${encodeURIComponent(value)};expires=${d};path=/`;
    },
    get:function(key){
        let arr = decodeURIComponent(document.cookie).split('; ');
        for(let value of arr){
            let newarr = value.split('=');
            if(key===newarr[0]){
                return newarr[1];
            }
        }
    },
    remove:function(key){
        cookie.set(key,'',-1);
    }
}