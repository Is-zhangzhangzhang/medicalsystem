$(function () {
    /**
     * @module 首页
     */
    fillTopInformation();
    callRegister();
    callConsume();
    callReply();
    window.setInterval(callRegister, 30000);
    window.setInterval(callConsume, 30000);
    window.setInterval(callReply, 30000);
});
let fillTopInformation = function () {
    let patient = JSON.parse(localStorage.getItem('patient'));
        $('#top_head_img').css('background-image',"url("+patient.pt_image+")");
        $('#top_head_name').text(patient.pt_name);
};
/*===========轮询============*/
//挂号呼叫
let getPatientId = function () {
    let id = "";
    if(localStorage.hasOwnProperty('patient')){
        id = JSON.parse(localStorage.getItem('patient')).pt_id;
    }
    return id;
};
let newClassExist = function (newClass) {
    let $alert =  $('.msg-alert>div');
    if($alert){
        let flag = false;
        for(let insert of $alert){
            if( $(insert).hasClass(newClass)){
                console.log('有了有了！');
                flag = true;
                break;
            }
            else{
                flag = false;
            }
        }
        return flag;
    }
};
//if($('#msg_rf_call')) //如果在message的话就把轮询内容插进去
let replyList = [];
let callReply = function () {
    console.log('轮询获得帖子信息！');
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/callReply.do",
        dataType: "jsonp",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        jsonp: "callback",
        data: {
            pt_id: getPatientId(),
        },
        success: function (res) {
            if (res.status == 'login') {
                if (res.result == '1') {
                    replyList = [];
                    replyList = res.replyArray;
                    if (replyList.length <= 0) {
                        $('.msg-alert').remove('.alert_reply');
                        return;
                    }
                    $('#top_myReplyNum').text(replyList.length);
                    let warn_kind = "你有" + replyList.length + "条问答消息,";
                    let warn_class = "alert_reply";
                    let open_tab = 1;
                    let warn_html = `<div class="alert alert-warning alert-dismissible ${warn_class}" role="alert">
                    <button class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong><span class="alert_msg_amount">${warn_kind}</span><a href="/font-end/html/patient/message.html?tab=${open_tab}" class="alert_msg">立即查看</a></strong>
                </div>`;
                    if (newClassExist('alert_reply')) {
                        // console.log('有了有了！');
                        $('alert_reply' + '.alert_msg_amount').text(warn_kind);
                    }
                    else {
                        console.log('添加问答消息提示！');
                        $('.msg-alert').append(warn_html);
                    }

                    console.log(warn_html);
                    var reArr = res.replyArray;
                    for (var i in reArr) {
                        console.log('re_id:' + reArr[i].re_id + ',re_content:' + reArr[i].re_content + ',re_time:' + reArr[i].re_time);

                        console.log('dt_id:' + reArr[i].re_Consultaion.doctor.dt_id + ',dt_name:' + reArr[i].re_Consultaion.doctor.dt_name + ',dt_sex:' + reArr[i].re_Consultaion.doctor.dt_sex + ',dt_tel:' + reArr[i].re_Consultaion.doctor.dt_tel + ',dt_image:' + reArr[i].re_Consultaion.doctor.dt_image + ',dt_title:' + reArr[i].re_Consultaion.doctor.dt_title + ',introduction:' + reArr[i].re_Consultaion.doctor.introduction + ',money:' + reArr[i].re_Consultaion.doctor.money);
                    }
                }
            }else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error: function () {
            console.log("提交失败");
        }
    });
};
let registerList = [];
let callRegister = function () {
    console.log('轮询获得挂号信息！');
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/callRegistration.do",
        dataType: "jsonp",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        jsonp: "callback",
        data: {
            patientId: getPatientId(),
        },
        success: function (res) {
            if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('被呼叫');
                    registerList = [];
                    registerList = res.registrationForm;
                    if (registerList.length <= 0) {
                        $('.msg-alert').remove('.alert_register');
                        return;
                    }
                    console.log(res);
                    $('#top_myRegisterNum').text(registerList.length);
                    let warn_kind = "你有" + registerList.length + "条就诊消息,";
                    let open_tab = 2;
                    let warn_class = "alert_register";
                    let warn_html = `<div class="alert alert-warning alert-dismissible ${warn_class}" role="alert">
                    <button class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong><span class="alert_msg_amount">${warn_kind}</span><a href="/font-end/html/patient/message.html?tab=${open_tab}" class="alert_msg">立即查看</a></strong>
                </div>`;
                    if (newClassExist('alert_register')) {
                        // console.log('有了有了！');
                        $('alert_register' + '.alert_msg_amount').text(warn_kind);
                    }
                    else {
                        console.log('添加就诊消息提示！');
                        $('.msg-alert').append(warn_html);
                    }
                    //TODO 把消息内容放到localstorage 加载message时显示
                } else {
                    console.log("请继续等待");
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
};
let consumeList = [];
let callConsume = function () {
    console.log('轮询获得消费信息！');
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/askCOrder.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            patientId: getPatientId(),
        },
        success: function (res) {
            if(res.status == 'login') {
                if (res.result == '1') {
                    consumeList = [];
                    consumeList = res.consumptionOrder;
                    if (consumeList.length <= 0) {
                        $('.msg-alert').remove('alert_pay');
                        return;
                    }
                    $('#top_myPayNum').text(top_myPayNum);
                    let warn_kind = "你有" + consumeList.length + "条支付消息,";
                    let open_tab = 3;
                    let warn_class = "alert_pay";
                    let warn_html = `<div class="alert alert-warning alert-dismissible ${warn_class}" role="alert">
                    <button class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong><span class="alert_msg_amount">${warn_kind}</span><a href="/font-end/html/patient/message.html?tab=${open_tab}" class="alert_msg">立即查看</a></strong>
                </div>`;
                    if (newClassExist('alert_pay')) {
                        // console.log('有了有了！');
                        $('alert_pay' + '.alert_msg_amount').text(warn_kind);
                    }
                    else {
                        console.log('添加支付消息提示！');
                        $('.msg-alert').append(warn_html);
                    }
                    console.log(warn_html);
                    console.log('有消费单啦');

                } else {
                    console.log("请继续等待");
                }
            }else{
                console.log('请登录！');
            }
        },
        error: function () {
            console.log("支付消息提交失败");
        }
    });
};
$('.msg-alert').on('click','a',function () {
    // alert("点击了！！");
    localStorage.setItem('replyList',JSON.stringify(replyList));
    localStorage.setItem('registerList',JSON.stringify(registerList));
    localStorage.setItem('consumeList',JSON.stringify(consumeList));
});
$('#top_msg').click(function () {
    localStorage.setItem('replyList',JSON.stringify(replyList));
    localStorage.setItem('registerList',JSON.stringify(registerList));
    localStorage.setItem('consumeList',JSON.stringify(consumeList));
});

if(replyList.length>0|| registerList.length>0 ||consumeList.length>0){
    $('#top_pt_msg').text('...');
}



