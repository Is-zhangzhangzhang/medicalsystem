$(function () {
    fillTopInformation();
    callConsultList();
    callCommentList();
    window.setInterval(callConsultList, 300000);
    window.setInterval(callCommentList, 300000);
});
let fillTopInformation = function () {
    let doctor = JSON.parse(localStorage.getItem('doctor'));
    $('#top_head_img').css('background-image', "url(" + doctor.dt_image + ")");
    $('#top_head_name').text(doctor.dt_name);
};
/*================轮询=================*/
//判断msg-alert中是否含有要添加的子元素的class
let existClass = function (newClass) {
    // let divList = $('.msg-alert').find('div');
    // let flag = false;
    // for(let i=0,data;data = divList[i++];){
    //     if($(data).hasClass(newClass)){
    //         flag = false;
    //     }
    //     else
    //         flag = true;
    // }
    // console.log(flag);
    // return flag;
    let $alert = $('.msg-alert>div');
    if ($alert) {
        let flag = false;
        for (let insert of $alert) {
            if ($(insert).hasClass(newClass)) {
                console.log('有了有了！');
                flag = true;
                break;
            }
            else {
                flag = false;
            }
        }
        return flag;
    }
};
let getDoctorId = function () {
    let id = "";
    if (localStorage.hasOwnProperty('doctor')) {
        id = JSON.parse(localStorage.getItem('doctor')).dt_id;
    }
    return id;
};
//咨询
let dt_consultList;
let callConsultList = function () {
    console.log('轮询获得问答消息！');
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/doctor/unreadAdvisoryAndReply.do",
        dataType: "jsonp",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        jsonp: "callback",
        data: {
            doctorId: getDoctorId(),
        },
        success: function (res) {
            if (res.status == 'login') {
                if (res.totalNum != "0") {
                    dt_consultList = res.unreadArr;
                    console.log(dt_consultList);
                    let warn_kind = "你有" + res.totalNum + "条问答消息,";
                    $('#top_myConsultNum').text(res.totalNum);
                    let warn_class = "alert_dt_consult";
                    let open_tab = 1;
                    let warn_html = `<div class="alert alert-warning alert-dismissible ${warn_class}" role="alert">
                    <button class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong><span class="alert_msg_amount">${warn_kind}</span><a href="/font-end/html/doctor/message.html?tab=${open_tab}" class="alert_msg">立即查看</a></strong>
                </div>`;
                    if (existClass("alert_dt_consult")) {
                        $('.alert_dt_consult .alert_msg_amount').text(warn_kind);
                    }
                    else {
                        $('.msg-alert').append(warn_html);
                    }
                    console.log(warn_html);
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
};

let dt_commentList;
let callCommentList = function () {
    console.log('轮询获得评论消息！');
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/doctor/unreadEvaluation.do",
        dataType: "jsonp",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        jsonp: "callback",
        data: {
            doctorId: getDoctorId(),
        },
        success: function (res) {
            if (res.status == 'login') {
                dt_commentList = res.evaluationArray;
                if (res.totalNum != "0") {
                    // alert('有评论！！');
                    let warn_kind = "你有" + res.totalNum + "条新的评论,";
                    $('#top_myCommentNum').text(res.totalNum);
                    let warn_class = "alert_dt_comment";
                    let open_tab = 2;
                    let warn_html = `<div class="alert alert-warning alert-dismissible ${warn_class}" role="alert">
                    <button class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong><span class="alert_msg_amount">${warn_kind}</span><a href="/font-end/html/doctor/message.html?tab=${open_tab}" class="alert_msg">立即查看</a></strong>
                </div>`;
                    if (existClass("alert_dt_comment")) {
                        $('.alert_dt_comment .alert_msg_amount').text(warn_kind);
                    }
                    else {
                        $('.msg-alert').append(warn_html);
                    }
                    console.log(warn_html);
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
};
$('.msg-alert').on('click', 'a', function () {
    console.log(dt_commentList);
    console.log(dt_consultList);
    localStorage.setItem('dt_commentList', JSON.stringify(dt_commentList));
    localStorage.setItem('dt_consultList', JSON.stringify(dt_consultList));
});
// $('.msg-alert').on('click','.alert_dt_comment a',function () {
//     localStorage.setItem('registerList',JSON.stringify(dt_commentList));
//     localStorage.setItem('replyList',JSON.stringify(dt_consultList));
// });

$('#top_msg').click(function () {
    // alert('msg');
    localStorage.setItem('dt_consultList', JSON.stringify(dt_consultList));
    localStorage.setItem('dt_commentList', JSON.stringify(dt_commentList));
});

if(localStorage.dt_consultList.length>9|| localStorage.dt_consultList>9){
    $('#dt_top_span').text('...');
}

