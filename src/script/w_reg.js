// reg
// 引入模块
import{
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

  // blur 事件判断
  username.onblur = function () {
      $ajaxpromise({
          url: `http://localhost/haitao/php/w_reg.php`,
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
  regBtn.onclick = function () {
      $ajaxpromise({
          url: `http://localhost/haitao/php/w_reg.php`,
          data: {
              username: username.value,
              userpass: userpass.value,
              phone: phone.value,
              repass:repass.value,
              submit: true
          },
          type: 'post'
      }).then(function(data){
          if(data){
              alert('reg cheng');
              location.href='http://localhost/haitao/src/w_login.html';
          }
      })
  }

