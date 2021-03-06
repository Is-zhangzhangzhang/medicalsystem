$(function () {
    let flag = getUrlFlag();
    console.log(flag);
    let consult;
    if (flag.index) {
        console.log('从医生主页进来');
        consult = JSON.parse(localStorage.getItem('dt_allConsult'))[flag.index];
        fillDoctor(consult.doctor);
        fillTitle(consult);
        loadDialog(consult.ad_id);
    }
    else if (flag.msgConsultIndex) {
        console.log('从消息列表进来');
        consult = JSON.parse(localStorage.getItem('dt_consultList'))[flag.msgConsultIndex];
        fillDoctor(consult.re_Consultaion.doctor);
        fillTitle(consult.re_Consultaion);
        loadDialog(consult.re_Consultaion.ad_id);
    }
});
let getUrlFlag = function () {
    let url_param = location.search;
    let flag = {};
    if (url_param) {
        if (url_param.indexOf("?") != -1) {
            flag[url_param.substr(1).split('=')[0]] = url_param.substr(1).split('=')[1];
        }
    }
    return flag;
};

let fillDoctor = function (dt) {
    $('#consult_dt_intro').first().find('img').attr('src', dt.dt_image);
    let dom = $('#consult_dt_intro .intro_dt_content');
    console.log(dom);
    let str = '<h4>【医生信息】</h4>';
    str += '<h4>姓名：' + dt.dt_name + '</h4>';
    str += '<h4>职称：' + dt.dt_title + '</h4>';
    str += '<h4>联系方式：' + dt.dt_tel + '</h4>';
    str += '<h4>【医生简介】</h4>'
    str += '<h4>' + dt.introduction + '</h4>';
    dom.append(str);
};
let fillTitle = function (consult) {
    let dom = $('#consult_title');
    dom.find('h3').text(consult.ad_title);
    let span = "";
    let title = dom.find('div').first();
    title.html('');
    span += "<span>" + '作者：' + consult.patient.pt_name + "　</span>";
    span += "<span>" + '发表日期：' + consult.ad_time + "</span>"
    title.append(span);
    let p = "";
    let content = $('#consult_content');
    content.html('');
    p += "<p>" + consult.ad_content + "</p>";
    content.append(p);
};
let reply;
let fillDialog = function (res) {
    console.log(res);
    let dom = $('#messageList');
    if(res.replyArray.length <= 0){
        dom.parent().html('');
        return ;
    }
    dom.html('');
    let dt = res.doctor;
    let pt = res.patient;
    let div = "";
    for (data of res.replyArray) {
        console.log(data);
        div = "";
        if (data.respondent.user_level == 2) {
            div += "<div class=\"message\">";
            div += "<img class=\"avatar\" src=\"" + pt.pt_image + "\" />";
            div += "<div class=\"content\">";
            div += "<div class=\"nickname\"><span>" + pt.pt_name + "</span>";
            div += "<span class=\"time\">" + data.re_time + "</span></div>";
            div += "<div class=\"bubble bubble_default left\">";
            div += "<div class=\"bubble_cont\"><div class=\"plain\">";
            div += "<div class=\"plain\">" + data.re_content + "</pre></div></div></div></div></div>";
        }
        else if (data.respondent.user_level == 1) {
            div += "<div class=\"message me\">";
            div += "<img class=\"avatar\" src=\"" + dt.dt_image + "\" />";
            div += "<div class=\"content\">";
            div += "<div class=\"nickname\"><span>" + dt.dt_name + "医生</span>"
            div += "<span class=\"time\">" + data.re_time + "</span></div>";
            div += "<div class=\"bubble bubble_primary right\">";
            div += "<div class=\"bubble_cont\"><div class=\"plain\">";
            div += "<pre class=\"pre_right\">" + data.re_content + "</pre></div></div></div></div></div>";
        }
        dom.append(div);
    }
};
let loadDialog = function (ad_id) {
    $.ajax({
        url: 'http://134.175.21.162:8080/medicalSystem/doctor/consultDetail.do',
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            ad_id: ad_id
        },
    })
        .done(function (res) {
            if (res.status == 'login') {
                fillDialog(res);
                console.log('reulstNumber:' + res.resultNum);
                reply = res.replyArray;
                console.log(reply);
            } else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        })
        .fail(function () {
            console.log("error");
        })
};
$('#dt_cs_reply>div>button').click(function () {
    let re_content = $('#dt_cs_reply textarea').val();
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/doctor/respondence.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            ad_id: consult.ad_id,
            pt_id: consult.patient.pt_id,
            dt_id: consult.doctor.dt_id,
            re_content: re_content
        },
        success: function (res) {
            console.log(res)
            if (res.status == 'login') {
                if (res.result == 1) {
                    console.log("success!");
                    $('#consult_modal').modal('show');
                    loadDialog();
                }
                else {
                    console.log("fail!");
                }
            } else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error: function () {
            console.log("提交失败");
        }
    });
});