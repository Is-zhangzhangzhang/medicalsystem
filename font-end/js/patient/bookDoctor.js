/**
 * @module 立即执行函数
 * @description 病人付款结束后到挂号的医生主页处对医生进行评价
 */
$(function () {
    // 隐藏显示 支付完毕后跳转到评价医生，打开评价tab
    let flag = getUrlFlag();
    if (flag.paid) {
        let book_content = $('#book_content').children('div');
        $(book_content.get(0)).hide();   // 隐藏科室医生的选择面板
        let intro = $(book_content.get(1));
        intro.show();  //直接显示医生主页
        intro.find(".time-table").hide();  //隐藏时间选择表格

        $('.tab-show').hide();  //隐藏展开咨询和评论
        $('#consult-tab').show();
        //打开tab的医生评论
        $('#consult-tab>ul li:first-child').removeClass('active');
        $('#consult-tab>ul li:first-child').empty();
        $('#consult-tab>ul li:last-child').addClass('active');
        $('#consult').removeClass('in active');
        $('#comment').addClass('in active');
        $('.pa_comment').show();
    }
    if (flag.consumeIndex) {
        if (localStorage.hasOwnProperty('consumeList') && localStorage.consumeList != "undefined") {
            let cs_doctor = JSON.parse(localStorage.getItem('consumeList'))[flag.consumeIndex].mr.doctor;
            console.log(cs_doctor);
            //医生信息
            let dom = $('#book_dt_intro');
            let div1 = $(dom.find('div').get(0));
            let img = div1.find('div');
            img.css('background-image', 'url(' + cs_doctor.dt_image + ')');
            let div2 = div1.next();
            div2.html('');
            let str = '<h4>【医生信息】</h4>';
            str += '<h4>姓名：' + cs_doctor.dt_name + '</h4>';
            str += '<h4>职称：' + cs_doctor.dt_title + '</h4>';
            str += '<h4>联系方式：' + cs_doctor.dt_tel + '</h4>';
            str += '<h4>【医生简介】</h4>'
            str += '<h4>' + cs_doctor.introduction + '</h4>';
            div2.append(str); //医生信息end
            loadComment(1, cs_doctor.dt_id);
        }

    }
    //页面加载时请求科室
    loadDept();
});
let getUrlFlag = function () {
    let url_param = location.search;
    // console.log(url_param);
    let flag = {};
    if (url_param) {
        if (url_param.indexOf("?") != -1) {
            let temp = url_param.split('&');
            flag[temp[0].substr(1).split('=')[0]] = temp[0].substr(1).split('=')[1];
            if (temp[1]) {  //getConsumeIndex() 第n条挂号信息
                flag[temp[1].split('=')[0]] = temp[1].split('=')[1];
            }
        }
    }
    return flag;
};
/*===全局变量===*/
let deptChosen;
//挂号信息 标签选择切换
let tagChange = function () {
    let a = $(this);
    // 标签选择
    a.addClass('tag-active').siblings().removeClass('tag-active');
};
$('.tag').on('click', 'a', tagChange);

//闭包 填充界面的科室和门诊
let fillDeptClinic = (function () {
    let data = {};
    return {
        setData: function (result) {
            // arr是每一行的result，包含所有的门诊所有的信息
            // console.log(result);
            for (let i = 0, arr; arr = result[i++];) {
                if (!(data[arr.cl_dept] instanceof Array)) {
                    data[arr.cl_dept] = [];
                }
                let obj = {};
                obj[arr.cl_part] = arr.cl_id;
                data[arr.cl_dept].push(obj);
            }
            // console.log(data);
        },
        // 把科室展示在界面中
        fillDept: function () {
            let newDept = "";
            for (let i = 0, dept; dept = Object.keys(data)[i++];) {
                newDept += "<a href=\"javascript:void(0)\" class=\"tag\">" + dept + "</a>";
            }
            $('#book_content .book-dept .tag').append(newDept);
        },
        // 把所选择科室的对应门诊展示在界面中
        fillClinic: function (dept) {
            //选择门诊标题
            $('.book-clinic h5').text(" -- " + dept);
            let dom = $('#book_content .book-clinic .tag');
            dom.html(""); //清空
            let newClinic = "";
            for (let i = 0, cli_obj; cli_obj = data[dept][i++];) {
                for (let clinic in cli_obj) {
                    newClinic += "<a href=\"javascript:void(0)\" class=\"tag\">" + clinic + "</a>";
                }
            }
            dom.append(newClinic);
            $('.book-clinic').fadeIn();
        },
        //把获得所选择的门诊id
        getClinicId: function (dept, clinic) {
            let id;
            // console.log(data[dept]);
            for (let i = 0, cli_obj; cli_obj = data[dept][i++];) {
                if (cli_obj[clinic]) {
                    id = cli_obj[clinic];
                    break;
                }
            }
            return id;
        }
    }
})();
let loadDept = function () {
    $.ajax({
        url: 'http://134.175.21.162:8080/medicalSystem/patient/loadClinic.do',
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'jsonp',
        jsonp: 'callback',
    })
        .done(function (result) {
            console.log("success");
            if (result.status == 'login') {
                fillDeptClinic.setData(result.clinicArray);
                fillDeptClinic.fillDept();
            } else {
                alert('请登录！');
            }
        })
        .fail(function () {
            console.log("请求失败！");
        })
};
//日期显示
let fillDay = function () {
    let dom = $('.book-day');
    let tag = dom.find('.tag');
    tag.html('');
    let dayList = ['星期一', '星期二', '星期三', '星期四', '星期五'];
    let today = new Date().getDay();
    if (today > 5) {
        alert('今天周六不能挂号哦！');
    }
    let str = '';  //代码语句
    for (let i = today; i <= 5; i++) {
        str += "<a href=\"javascript:void(0)\" class=\"tag\">" + dayList[i - 1] + "</a>";
    }
    dom.find('.tag').append(str);
    dom.fadeIn();
};
let Doctor = (function () {
    // let name;
    let result;
    let day = 0;
    let dt;   //挂号的时候选择的医生
    let timeIndex = -1;
    return {
        //门诊下的所有医生信息
        setResult: function (res) {
            result = res;
        },
        setDay: function (dayOfWeek) {
            let dayList = ['星期一', '星期二', '星期三', '星期四', '星期五'];
            let i, d;
            for (i = 0, d; d = dayList[i++];) {
                if (d == dayOfWeek) {
                    day = i + 1;
                    break;
                }
            }
        },
        getDay: function () {
            return day;
        },
        setDoctor: function (name) {
            for (let i = 0, doc; doc = result[i++];) {
                if (doc.dt_name == name) {
                    dt = doc;
                }
            }
        },
        getDoctor: function () {
            return dt;
        },
        setTimeIndex: function (index) {
            timeIndex = index;
        },
        getTimeIndex: function () {
            return timeIndex;
        },
        //显示对应门诊下的所有医生
        fillDoctorsName: function () {
            let dom = $('.book-who .tag');
            let str = "";
            dom.html('');
            for (let i = 0, doc; doc = result[i++];) {
                str += "<a href=\"javascript:void(0)\" class=\"tag\">" + doc.dt_name + "</a>";
            }
            dom.append(str);
        },
        //显示医生简介和头像
        fillIntro: function () {
            let dom = $('#book_dt_intro');
            let div1 = $(dom.find('div').get(0));
            let img = div1.find('div');
            console.log(dt);
            img.css('background-image', 'url(' + dt.dt_image + ')');
            let div2 = div1.next();
            div2.html('');
            let str = '<h4>【医生信息】</h4>';
            str += '<h4>姓名：' + dt.dt_name + '</h4>';
            str += '<h4>职称：' + dt.dt_title + '</h4>';
            str += '<h4>联系方式：' + dt.dt_tel + '</h4>';
            str += '<h4>【医生简介】</h4>'
            str += '<h4>' + dt.introduction + '</h4>';
            div2.append(str);
        }
    }
})();
//POST门诊编号，Get医生信息
let loadDoctorOfClinic = function (clinicId) {
    $.ajax({
        type: 'POST',
        url: 'http://134.175.21.162:8080/medicalSystem/patient/doctorOfClinic.do',
        dataType: 'jsonp',
        jsonp: 'callback',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: {
            clinicId: clinicId
        }
    })
        .done(function (result) {
            console.log('所有医生信息加载成功！');
            console.log(result);
            if (result.status == 'login') {
                Doctor.setResult(result.doctorArray);
                Doctor.fillDoctorsName();
            }
            else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
            //TODO 处理医生信息
        })
        .fail(function () {
            console.log('请求医生失败！');
        })
};
//获取各个时间段的剩余挂号个数
let loadDoctorRemainNum = function () {
    let dt = Doctor.getDoctor();
    $.ajax({
        type: 'POST',
        url: 'http://134.175.21.162:8080/medicalSystem/patient/remainingNumber.do',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            doctorId: dt.dt_id,
            dayOfWeek: Doctor.getDay()
        }
    })
        .done(function (result) {
            // 把剩余挂号数放到时间表中
            if (result.status == 'login') {
                let spanList = $("span[name='book_remain']");
                for (let i = 0, $span, remain; $span = spanList[i], remain = result.timeArray[i++];) {
                    $span.innerText = remain;
                }
            }
            else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        })
        .fail(function () {
            console.log('剩余挂号数获取失败！');
        })
};
let fillMoney = function () {
    let dt = Doctor.getDoctor();
    let spanList = $("span[name='book_money']");
    let money = dt.money;
    for (let i = 0, $span; $span = spanList[i++];) {
        $span.innerText = "　(" + money + "元)";
    }
};
let getBookTime = function () {
    let timeIndex = Doctor.getTimeIndex();
    let timeList = ['8:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00'];
    return timeList[timeIndex];
};
let toSureBookMsg = function () {
    let dt = Doctor.getDoctor();
    let pt;
    if (localStorage.hasOwnProperty('patient')) {
        pt = JSON.parse(localStorage.getItem('patient'));
    }
    let li = $('.book-sure-msg>ul').find('li');
    li[0].innerText = '医生：' + dt.dt_name;
    li[1].innerText = '科室：' + dt.clinic.cl_dept + dt.clinic.cl_part;
    li[2].innerText = '就诊人：' + pt.pt_name;
    li[3].innerText = '检查费：' + dt.money;
    li[4].innerText = '就诊时间：' + getBookTime();
    // console.log(li);
};



/*=============点击事件===============*/
//点击科室
$('.book-dept .tag').on('click', 'a', function () {
    deptChosen = $(this).text();
    // $('.book-clinic').fadeOut();
    $('.book-day').fadeOut();
    $('.book-who').fadeOut();
    $('.doctor-page').fadeOut();
    fillDeptClinic.fillClinic(deptChosen);
});
//点击门诊,去选择时间
$('.book-clinic .tag').on('click', 'a', function () {
    let clinicChosen = $(this).text();
    let clinicId = fillDeptClinic.getClinicId(deptChosen, clinicChosen);
    $('.book-who').fadeOut();
    $('.doctor-page').fadeOut();
    fillDay(); //展开日期选择
    loadDoctorOfClinic(clinicId); //请求医生信息
});
// 点击日期
$('.book-day .tag').on('click', 'a', function () {
    let dayOfWeek = $(this).text();
    Doctor.setDay(dayOfWeek);
    $('.book-who').hide();
    $('.book-who').fadeIn();
});
// 点击医生
$('.book-who .tag').on('click', 'a', function () {
    let dtName = $(this).text();
    Doctor.setDoctor(dtName);
    Doctor.fillIntro();//填充医生头像和简介
    loadDoctorRemainNum(); //请求各时段剩余挂号
    fillMoney();
    $('.doctor-page').fadeOut();
    $('.doctor-page').fadeIn();
});//点击医生，请求医生剩余挂号数
// 点击预约挂号
$('.time-table table tr td:nth-of-type(2)').click(function () {
    let $timeStartIndex = $(this).parent().index();
    Doctor.setTimeIndex($timeStartIndex);
    getBookTime();
    toSureBookMsg();
    $('.book-sure-msg').fadeOut();
    $('.book-sure-msg').fadeIn();
}); //点击预约时间 end
// 点击取消预约挂号
$('#book-cancel').click(function () {
    $('.book-sure-msg').fadeOut();
});
//点击确认挂号
$('#book-ok').click(function () {
    //    TODO 提交挂号信息
    let dt = Doctor.getDoctor();
    let timeList = [8, 10, 14, 16];
    let startTime = timeList[Doctor.getTimeIndex()];
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/submitRegistration.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            doctorId: dt.dt_id,
            patientId: JSON.parse(localStorage.user_id),
            dayOfWeek: Doctor.getDay(),
            startTime: startTime
        },
        success: function (res) {
            console.log(res)
            if (res.status == 'login') {
                if (res.result == 1) {
                    console.log("确认挂号success!");
                    $('#book-modal').modal('show');
                }
                else {
                    $('#book-modal h3').text('挂号失败');
                    $('#book-modal').modal('show');
                    console.log("确认挂号fail!");
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
});
//点击确认挂号模态框 刷新剩余挂号数
$('#book_modal_btn').click(function () {
    loadDoctorRemainNum(); //请求各时段剩余挂号
    fillMoney();
});

let Consult = (function () {
    let consultList;
    let consult;
    return {
        setConsultList: function (res) {
            consultList = res;
        },
        setConsult: function (data) {
            consult = data;
        },
        getConsult: function (index) {
            return consultList[index];
        },
        getAllConsult: function () {
            return consultList;
        }
    };
})();

let fillConsultList = function (data) {
    let dom = $('#book_consult_ul');
    dom.html('');
    let li;
    for (let i in data) {
        li = "";
        li += "<li class=\"list-group-item\">";
        li += "<strong>" + data[i].ad_title + "</strong>";
        li += "<span class=\"badge pull-right \">" + data[i].ad_time + "</span>";
        li += "<span class=\"pull-right consult-writer\">作者：" + data[i].patient.pt_name + "</span>";
        li += "</li>";
        dom.append(li);
    }
};
let loadConsult = function (page) {
    page = page || 1;
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/advisoryOfDoctor.do",
        dataType: "jsonp",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        jsonp: "callback",
        data: {
            doctorId: Doctor.getDoctor().dt_id,
            page: page
        },
        success: function (res) {
            if (res.status == 'login') {
                if (res) {
                    Consult.setConsultList(res.advisoryArray);
                    fillConsultList(res.advisoryArray);
                    let pageSum = parseInt(res.resultNum / 10) + 1;
                    initConsultPagination(pageSum, page);
                }
            } else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error: function () {
            console.log("咨询获取失败！");
        }
    });
};
let fillCommentList = function (result) {
    let ul = $('#comment>ul');
    ul.html('');
    let li = "";
    for (let i in result) {
        li = "<li class=\"list-group-item\"><div class=\"comment-context\"><div class=\"row\"><div class=\"col-lg-2 col-md-2 text-center\">";
        li += "<div class='comment_head_img'></div>";
        li += "</div><div class=\"col-lg-7 col-md-7\">";
        li += "<h4>" + result[i].patient.pt_name + "</h4>";
        li += "<span>";
        let score = result[i].ev_score;
        let integer = parseInt(score);
        let decimal = score - integer;
        for (let j = 1; j <= integer; j++) {
            li += "<i class=\"rating-star\"></i>";  //满星
        }
        if (decimal > 0) {
            li += "<i class=\"half-star\"></i>"; // 半星
            if ((integer + 1) < 5) {
                for (let k = integer + 1; k <= 5; k++) {
                    li += "<i class=\"no-star\"></i>"  //没星
                }
            }
        }
        else if (integer < 5) {
            for (let k = integer; k <= 5; k++) {
                li += "<i class=\"no-star\"></i>"  //没星
            }
        }
        li += "</span><br>";
        li += "<span>" + result[i].ev_content + "</span>";
        li += "</div><div class=\"col-lg-3 col-md-3\">";
        li += "<span class=\"pull-right\">" + result[i].ev_time + "</span>";
        li += "</div></div></div></li>";
        ul.append(li);
        $('.comment_head_img').css('background-image', 'url(" ' + result[i].patient.pt_image + ' ")');
    }
};
let loadComment = function (page, dt_id) {
    page = page || 1;
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/evaluation.do",
        dataType: "jsonp",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        jsonp: "callback",
        data: {
            doctorId: dt_id,
            page: page
        },
        success: function (res) {
            //填充评论内容
            // console.log(res);
            if (res.status == 'login') {
                fillCommentList(res.evaluationArray);
                let sum = parseInt(res.resultNum / 10) + 1;
                initCommentPagination(sum, page);
            }
            else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error: function () {
            console.log("获取评论列表失败");
        }
    });
};

/*=================医生咨询和评论=======================*/
// 初始化咨询分页
let pageSum = 3; //分页总页数
let initConsultPagination = function (pages, page) {
    let dom = $('#book_consult_page_ul>ul');
    pageSum = pages;
    console.log(pageSum);
    dom.html('');
    drawPagination(dom, pageSum, page);
};
//咨询点击下一页
$('#book_consult_page_ul').on('click', 'li:last-child', function () {
    if ($(this).hasClass('disabled') == false) {
        let ul = $('#book_consult_page_ul>ul');
        let page = getNextPage(ul, pageSum);
        loadConsult(page); //重新请求下一页
    }
});
//咨询点击上一页
$('#book_consult_page_ul').on('click', 'li:first-child', function () {
    if ($(this).hasClass('disabled') == false) {
        let ul = $('#book_consult_page_ul>ul');
        let page = getPrePage(ul, pages);
        loadConsult(page); //重新请求上一页
    }
});

//发表新咨询帖子
$('#submit_new_consult').click(function () {
    let title = $('#consult_new_title').val();
    let content = $('#consult_new_content').val();
    let pt_id;
    if (localStorage.hasOwnProperty('patient'))
        pt_id = JSON.parse(localStorage.getItem('patient')).pt_id;
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/submitAdvisory.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            doctorId: Doctor.getDoctor().dt_id,
            patientId: pt_id,
            ad_title: title,
            ad_content: content
        },
        success: function (res) {
            console.log(res)
            if (res.status == 'login') {
                if (res.result == 1) {
                    console.log("发新咨询success!");
                    loadConsult();
                    $('#new-consult-modal').modal('show');
                    $('#consult_new_title').val("");
                    $('#consult_new_content').val("");
                }
                else {
                    console.log("fail!");
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
});

//初始化评论分页
let commentPage = 3;
let initCommentPagination = function (sum, page) {
    let ul = $('#book_comment_page_ul>ul');
    commentPage = sum;
    ul.html('');
    drawPagination(ul, commentPage, page);
};
//评论点击下一页
$('#book_comment_page_ul').on('click', 'li:last-child', function () {
    if ($(this).hasClass('disabled') == false) {
        let ul = $('#book_comment_page_ul>ul');
        let page = getNextPage(ul, pageSum);
        if (getUrlFlag()) {
            let dt_id = JSON.parse(localStorage.getItem('consumeList'))[getUrlFlag().consumeIndex].mr.doctor.dt_id;
            loadComment(page, dt_id);
        } else
            loadComment(page, Doctor.getDoctor().dt_id);//重新请求下一页
    }
});
//评论点击上一页
$('#book_comment_page_ul').on('click', 'li:first-child', function () {
    if ($(this).hasClass('disabled') == false) {
        let ul = $('#book_comment_page_ul>ul');
        let page = getPrePage(ul, pages);
        if (getUrlFlag()) {
            let dt_id = JSON.parse(localStorage.getItem('consumeList'))[getUrlFlag().consumeIndex].mr.doctor.dt_id;
            loadComment(page, dt_id);
        }
        else
            loadComment(page, Doctor.getDoctor().dt_id); //重新请求上一页
    }
});
// 点击展开咨询和评论
$('.tab-show').click(function () {
    loadConsult();
    $('.tab-show').fadeOut();
    $('#consult-tab').fadeIn();
});
//点击某一条咨询帖子
$('#book_consult_ul').on('click', 'li', function () {
    // event.stopPropagation();
    //把医生资料保存到localStorage
    let dt = Doctor.getDoctor();
    let index = $(this).index();
    // alert(dt.dt_name);
    // localStorage.setItem('doctor', JSON.stringify(dt));
    localStorage.setItem('pt_dtAllConsult', JSON.stringify(Consult.getAllConsult()));
    window.location.href = "../../html/patient/consult.html?dt_consultList=true&index=" + index;
});
//点击医生问答tab
$('#consult-tab>ul>li:first-child').click(function () {
    // loadConsult();
    $('#consult').tab('show');
});
//点击医生评论tab
$('#consult-tab>ul>li:last-child').click(function () {
    loadComment(1, Doctor.getDoctor().dt_id);
    $('#comment').tab('show');
});

//点击发表评论按钮
$('#pt_submit_comment button').click(function () {
    let pt_id, consume;
    if (localStorage.hasOwnProperty('patient'))
        pt_id = JSON.parse(localStorage.getItem('patient')).pt_id;
    if (localStorage.hasOwnProperty('consumeList') && localStorage.consumeList != "undefined" && localStorage.consumeList != '[]') {
        consume = JSON.parse(localStorage.getItem('consumeList'));
    }
    let flag = getUrlFlag();
    let dt_id = JSON.parse(localStorage.getItem('consumeList'))[flag.consumeIndex].mr.doctor.dt_id;

    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/submitEvaluation.do",
        dataType: "jsonp",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        jsonp: "callback",
        data: {
            patientId: pt_id,
            doctorId: dt_id,
            ev_content: $('#pt_submit_comment textarea').val(),
            ev_score: $('#pt_submit_comment select').val(),
            rf_id: encodeURI('1')
        },
        success: function (res) {
            if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('评价成功');
                    $('#book_comment_modal').modal('show');
                    loadComment(1, dt_id);
                } else {
                    console.log("评价失败");
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
});

