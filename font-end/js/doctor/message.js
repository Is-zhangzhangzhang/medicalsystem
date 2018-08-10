$(function () {
    fillConsultList();
    fillCommentList();
    let url_param = location.search;
    let flag = {};
    if (url_param) {
        if (url_param.indexOf("?") != -1) {
            flag[url_param.substr(1).split('=')[0]] = url_param.substr(1).split('=')[1];
        }
        switch (flag.tab) {
            case '1': //加载问答消息
                $('#collapse1').removeClass('in');
                break;
            case '2':
                $('#collapse0').removeClass('in');
                $('#collapse1').addClass('in');
                break;
        }
    }
});

let msg_consultList;
let fillConsultList = function () {
    console.log('填充问答消息！');
    if (localStorage.hasOwnProperty('dt_consultList') && localStorage.dt_consultList != "[]" && localStorage.dt_consultList != "undefined") {
        msg_consultList = JSON.parse(localStorage.getItem('dt_consultList'));
    }else{
        return;
    }
    console.log(msg_consultList);
    let ul = $('#collapse0>ul');
    ul.html('');
    for (let i=0,data;data = msg_consultList[i++];) {
        let content;
        if(data.re_content == ""){
            if(data.re_Consultaion.ad_content != ""){
                content = data.re_Consultaion.ad_content;
            }
        }
        else{
            content = data.re_content;
        }
        if (data.re_status == "unread" || data.re_Consultaion.ad_status == "unread") {
            li = "";
            li = `<li class="list-group-item text-left">
                   <div class="row wrapping85">
                     <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">
                            <!--<img src="${data.re_Consultaion.patient.pt_image}" class="head_img" alt="">-->
                            <div class="comment_head_img" style="background-image: url('${data.re_Consultaion.patient.pt_image}')"></div>
                     </div>
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                        <span class="pull-right msg_time" id="msg_cs_time">时间：${data.re_time}</span>
                        <h4>${data.re_Consultaion.patient.pt_name}</h4>
                        <h5><i class="glyphicon glyphicon-question-sign"></i>${data.re_Consultaion.ad_title}</h5>
                        <p>${content}</p>
                    </div>
                 </div>
                </li>`;
            ul.append(li);
        }
    }
};

let msg_commentList;
//没有新的评论
let fillCommentList = function () {
    console.log('填充评论消息！');
    if (localStorage.hasOwnProperty('dt_commentList') && localStorage.dt_commentList != "[]" && localStorage.dt_commentList != "undefined") {
        msg_commentList = JSON.parse(localStorage.getItem('dt_commentList'));
    }else{
        return;
    }
    console.log(msg_commentList);
    let ul = $('#collapse1>ul');
    ul.html('');
    let li = "";
    for (let i in msg_commentList) {
        li = "<li class=\"list-group-item\"><div class=\"comment-context\"><div class=\"row\"><div class=\"col-lg-2 col-md-2 text-center\">";
        // li += "<img src=\"" + result[i].patient.pt_image + "\" alt=\"评论者头像\">";
        li += "<div class='comment_head_img' style='background: url("+'msg_commentList[i].patient.pt_image'+")'></div>"
        li += "</div><div class=\"col-lg-7 col-md-7\">";
        li += "<h4>" + msg_commentList[i].patient.pt_name + "</h4>";
        li += "<span>";
        let score = msg_commentList[i].ev_score;
        let integer = parseInt(score);
        let decimal = score - integer;
        for (let j = 1; j <= integer; j++) {
            li += "<i class=\"rating-star\"></i>";  //满星
        }
        if (decimal > 0) {
            li += "<i class=\"half-star\"></i>"; // 半星
            if ((integer + 2) < 5) {
                for (let k = integer + 2; k <= 5; k++) {
                    li += "<i class=\"no-star\"></i>"  //没星
                }
            }
        }
        else if (integer < 5) {
            for (let k = integer + 1; k <= 5; k++) {
                li += "<i class=\"no-star\"></i>"  //没星
            }
        }
        li += "</span><br>";
        li += "<span>" + msg_commentList[i].ev_content + "</span>";
        li += "</div><div class=\"col-lg-3 col-md-3\">";
        li += "<span class=\"pull-right\">" + msg_commentList[i].ev_time + "</span>";
        li += "</div></div></div></li>";
        ul.append(li);
    }
};

//医生点击某一条咨询消息  失败了！！！
$('#collapse0').on('click','li',function () {
    let index = $(this).index();
    // console.log(msg_consultList[index]re_Consultaion.ad_id);
    /*$.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/doctor/setRead.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            co_id: msg_consultList[index].re_Consultaion.ad_id,  //咨询id？
            pt_id: msg_consultList[index].re_Consultaion.patient.pt_id
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('标记咨询已读成功');
                }
                else {
                    console.log('标记咨询已读失败');
                }
            }
            else {
                console.log('请登录！');
            }
        },
        error: function () {
            console.log("提交失败");
        }
    });*/
    if(msg_consultList){
        window.location.href = "./consult.html?msgConsultIndex="+index;
    }
});
//点击评论后
$('#collapse1').on('click',function () {
    let index = $(this).index();
    // TODO 查看挂号消息后！！提交已读！！
    // console.log(msg_consultList[index]re_Consultaion.ad_id);
    window.location.href = "./doctorHome.html?toComment=true";
});