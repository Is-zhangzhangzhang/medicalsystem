$(function () {
    fillReplyMsg();
    fillRegisterMsg();
    fillConsume();
    let url_param = location.search;
    let flag = {};
    if (url_param) {
        if (url_param.indexOf("?") != -1) {
            flag[url_param.substr(1).split('=')[0]] = url_param.substr(1).split('=')[1];
        }
        switch (flag.tab) {
            case '1': //加载问答消息
                $('#collapse1').removeClass('in');
                $('#collapse2').removeClass('in');
                break;
            case '2':
                $('#collapse0').removeClass('in');
                $('#collapse2').removeClass('in');
                $('#collapse1').addClass('in');
                //加载挂号消息
                break;
            case '3':
                $('#collapse0').removeClass('in');
                $('#collapse1').removeClass('in');
                $('#collapse2').addClass('in');
                //加载支付消息
                break;
        }
    }
});

let reply;
let fillReplyMsg = function () {
    console.log('填充问答消息！');
    if (localStorage.hasOwnProperty('replyList') && localStorage.replyList != "[]" && localStorage.replyList != "undefined") {
        reply = JSON.parse(localStorage.getItem('replyList'));
    } else {
        return;
    }
    console.log(reply);
    let li = "";
    let ul = $('#collapse0>ul');
    ul.html('');
    for (data of reply) {
        li = "";
        li = `<li class="list-group-item text-left">
           <div class="row wrapping85">
             <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">
                 <div class="comment_head_img" style="background-image: url('${data.re_Consultaion.doctor.dt_image}')"></div>
             </div>
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                <span class="pull-right msg_time" id="msg_cs_time">时间：${data.re_time}</span>
                <h4>${data.re_Consultaion.doctor.dt_name}医生</h4>
                <h5><i class="glyphicon glyphicon-question-sign"></i>&nbsp;${data.re_Consultaion.ad_title}</h5>
                <p>${data.re_content}</p>
            </div>
         </div>
        </li>`;
        ul.append(li);
    }
};

let fillRegisterMsg = function () {
    console.log('填充呼叫消息！');
    let register;
    if (localStorage.hasOwnProperty('registerList') && localStorage.registerList != "[]" && localStorage.registerList != 'undefined') {
        register = JSON.parse(localStorage.getItem('registerList'));
    } else {
        return;
    }
    let li = "";
    let ul = $('#collapse1>ul');
    console.log(register);
    ul.html('');
    for (data of register) {
        li = "";
        li = `<li class="list-group-item text-left">
            <div class="row wrapping85">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">
                <div class="comment_head_img" style="background-image: url('${data.doctor.dt_image}')"></div>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                 <span class="pull-right msg_time" id="msg_re_time">时间：${data.rf_time}</span>
                 <h4 id="msg_re_name">${data.doctor.dt_name}医生</h4>
                 <button class="pull-right btn btn-danger" id="call_del_btn">已读消息</button>
                 <p id="msg_re_content">请<span style="color:red">${data.patient.pt_name}</span>到${data.doctor.clinic.cl_place},${data.doctor.clinic.cl_dept},${data.doctor.clinic.cl_part}就诊</p>
              </div>
            </div>
         </li>`;
        ul.append(li);
    }
};

let consume;
let fillConsume = function () {
    if (localStorage.hasOwnProperty('consumeList') && localStorage.consumeList != "[]" && localStorage.consumeList != "undefined") {
        consume = JSON.parse(localStorage.getItem('consumeList'));
    } else {
        return;
    }
    //--${data.mr.doctor.clinic.cl_dept}${data.mr.doctor.clinic.cl_part}
    console.log(consume);
    let li = "";
    let ul = $('#collapse2>ul');
    ul.html('');
    for (data of consume) {
        li = "";
        /*！！！不知道已读未读是哪个状态*/
        let status = "";
        if (data.co_status == "pay")
            status = "已支付";
        else
            status = "待支付";
        li = ` <li class="list-group-item text-left">
                <div class="wrapping85">
                   <h4 class="pull-right">支付状态：${status}</h4>
                   <h4>门诊缴费</h4>
                   <h4>${data.mr.patient.pt_name}</h4>
                   <p style="color:red">金额：${data.co_price}</p>
                   <p>${data.mr.mr_time}</p>
                </div>
              </li>`;
        ul.append(li);
    }
};

//点击问答消息中的任意一条
$('#collapse0>ul').on('click', 'li', function () {
    let index = $(this).index();
    let pt_id = JSON.parse(localStorage.getItem('user_id'));
    window.location.href = "/font-end/html/patient/consult.html?newReply=true&replyId=" + reply[index].re_Consultaion.ad_id;
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/markReply.do",
        dataType: "jsonp",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        jsonp: "callback",
        data: {
            ad_id: reply.re_Consultaion.ad_id,
            pt_id: pt_id
        },
        success: function (res) {
            if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('标记消息成功');
                }
                else {
                    console.log('标记失败');
                }
            }
            else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error: function () {
            console.log("提交失败");
        }
    });
    //跳转到对应的consult.html

});
//点击查看挂号后
$('#collapse1>ul').on('click', '#call_del_btn', function () {
    let register;
    let index = $(this).parent().parent().parent().index();
    if (localStorage.hasOwnProperty('registerList') && localStorage.registerList != "[]" && localStorage.registerList != "undefined") {
        register = JSON.parse(localStorage.getItem('registerList'));
    } else {
        return;
    }
    console.log(register);
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/markRegistration.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            rf_id: register[index].rf_id,
            pt_id: register[index].patient.pt_id
        },
        success: function (res) {
            if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('标记成功');
                    console.log('移除呼叫的挂号消息提示');
                    callRegister();
                    fillRegisterMsg();
                }
                else {
                    console.log('标记失败');
                }
            }
            else {
                console.log('请登录！');
            }
        },
        error: function () {
            console.log("提交失败");
        }
    });
});
//点击支付消息中的任意一条
$('#collapse2>ul').on('click', 'li', function () {
    let index = $(this).index();
    console.log(consume);
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/markCOrder.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            co_id: consume[index].co_id,
            pt_id: consume[index].mr.patient.pt_id
        },
        success: function (res) {
            if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('标记支付消息成功');
                }
                else {
                    console.log('标记失败');
                }
            }
            else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error: function () {
            console.log("提交失败");
        }
    });
    //点击的第几个支付消息；
    window.location.href = "/font-end/html/patient/pay.html?consumeIndex=" + index;
});

