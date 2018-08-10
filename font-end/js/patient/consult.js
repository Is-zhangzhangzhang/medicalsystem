$(function () {
    fillDoctor();
    fillTitle();
    loadDialog();
});
let getUrlFlag = function () {
    let url_param = location.search;
    // console.log(url_param);
    let flag = {};
    if (url_param) {
        if (url_param.indexOf("?") != -1) {
            let temp = url_param.split('&');
            flag[temp[0].substr(1).split('=')[0]] = temp[0].substr(1).split('=')[1];
            flag[temp[1].split('=')[0]] = temp[1].split('=')[1];
        }
    }
    return flag;
};
//reply页面跳转！！！
let consult;
let flag = getUrlFlag();
console.log(flag);
if (flag.newReply) {  //查看消息
    console.log("回复消息！");
    //加载我的问答列表
    if (!localStorage.hasOwnProperty('pt_allConsult')) {
        $.ajax({
            type: "post",
            async: false,
            url: "http://134.175.21.162:8080/medicalSystem/patient/advisoryOfPatient.do",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                patientId: pt.pt_id,
                page: 1
            },
            success: function (res) {
                if (res.status == 'login') {
                    localStorage.setItem('pt_allConsult', JSON.stringify(res.advisoryArray));
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
    }
    let cs = JSON.parse(localStorage.getItem('pt_allConsult'));  //我的问答列表
    for (let i = 0, data; data = cs[i++];) {
        if (data.ad_id == flag.replyId) {
            consult = data;
        }
    }
}
else if (flag.dt_consultList) {
    console.log("医生列表！");
    consult = JSON.parse(localStorage.getItem('dt_allConsult'))[flag.index];
}
else if (flag.pt_consultList) {
    console.log("病人列表！");
    consult = JSON.parse(localStorage.getItem('pt_allConsult'))[flag.index];
}
console.log(consult);

//不是作者不能显示回复窗口！！
if (consult.patient.pt_id != localStorage.getItem('user_id')) {
    $('#consult_reply').hide();
}

let fillDoctor = function () {
    // let dt = JSON.parse(localStorage.getItem('doctor'));
    let dt = consult.doctor;
    $('#consult_dt_intro .img_dt_head').find('div').css('background-image', 'url(' + dt.dt_image + ')');
    let dom = $('#consult_dt_intro .intro_dt_content');
    console.log(dom);
    let str = '<h4>【医生信息】</h4>';
    str += '<h4>姓名：' + dt.dt_name + '</h4>';
    str += '<h4>职称：' + dt.dt_title + '</h4>';
    str += '<h4>联系方式：' + dt.dt_tel + '</h4>';
    str += '<h4>【医生简介】</h4>';
    str += '<h4>' + dt.introduction + '</h4>';
    dom.append(str);
};

let fillTitle = function () {
    let dom = $('#consult_title');
    dom.find('h3').text(consult.ad_title);
    let span = "";
    let title = dom.find('div').first();
    title.html('');
    span += "<span>" + '作者：' + consult.patient.pt_name + "　</span>";
    span += "<span>" + '发表日期：' + consult.ad_time + "</span>";
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
    if(res.replyArray.length <= 0){
        return ;
    }
    let dom = $('#messageList');
    dom.html('');
    let dt = res.doctor;
    let pt = res.patient;
    let div = "";
    for (data of res.replyArray) {
        console.log(data);
        div = "";
        if (data.respondent.user_level == 1) {
            div += "<div class=\"message\">";
            div += "<img class=\"avatar\" src=\"" + dt.dt_image + "\" />";
            div += "<div class=\"content\">";
            div += "<div class=\"nickname\"><span>" + dt.dt_name + "医生</span>";
            div += "<span class=\"time\">" + data.re_time + "</span></div>";
            div += "<div class=\"bubble bubble_default left\">";
            div += "<div class=\"bubble_cont\"><div class=\"plain\">";
            div += "<div class=\"plain\">" + data.re_content + "</pre></div></div></div></div></div>";
        }
        else if (data.respondent.user_level == 2) {
            div += "<div class=\"message me\">";
            div += "<img class=\"avatar\" src=\"" + pt.pt_image + "\" />";
            div += "<div class=\"content\">";
            div += "<div class=\"nickname\"><span>" + pt.pt_name + "</span>"
            div += "<span class=\"time\">" + data.re_time + "</span></div>";
            div += "<div class=\"bubble bubble_primary right\">";
            div += "<div class=\"bubble_cont\"><div class=\"plain\">";
            div += "<pre class=\"pre_right\">" + data.re_content + "</pre></div></div></div></div></div>";
        }
        dom.append(div);
    }
};
let loadDialog = function () {
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/advisoryWithReply.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            ad_id: consult.ad_id,
            pt_id: consult.patient.pt_id
        },
        success: function (res) {
            if (res.status == 'login') {
                console.log(res);
                fillDialog(res);
                console.log('reulstNumber:' + res.resultNum);
                reply = res.replyArray;
            }
            else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error: function () {
            console.log("获取对话失败");
        }
    });
};

//点击回复提交
$('#consult_reply>div>button').click(function () {
    let re_content = $('#consult_reply textarea').val();
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/submitReply.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            ad_id: consult.ad_id,
            patient_id: consult.patient.pt_id,
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
                console.log('请登录！');
            }
        },
        error: function () {
            console.log("提交失败");
        }
    });
});