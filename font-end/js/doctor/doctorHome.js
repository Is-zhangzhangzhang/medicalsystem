/**
 * @module 立即执行函数 医生查看我的评论
 */
$(function () {
    var url_param = location.search;
    console.log(url_param);
    var flag = {};
    var toComment
    if (url_param) {
        if (url_param.indexOf("?") != -1) {
            flag[url_param.substr(1).split('=')[0]] = url_param.substr(1).split('=')[1];
        }
    }
    if (flag.toComment) {
        // $('.tab-show').css('display', 'none');
        $('#consult-tab').css('display', 'block');
        //    打开tab的医生评论
        $('#consult-tab>ul li:first-child').removeClass('active');
        $('#consult-tab>ul li:last-child').addClass('active');
        $('#consult').removeClass('in active');
        $('#comment').addClass('in active');
        loadComment();
    }
    else if (flag.toConsult) {
        // $('.tab-show').hide();
        $('#consult-tab').show();
    }
    fillIntro();
    loadConsult();
});

let dt;
let pageSum = 0;
let consult;
if (localStorage.hasOwnProperty('doctor')) {
    dt = JSON.parse(localStorage.getItem('doctor'));
}
let fillIntro = function () {
    let dom = $('#dthome_intro');
    let div1 = $(dom.find('div').get(0));
    let img = div1.find('img');
    img.attr('src', dt.dt_image);
    let div2 = div1.next();
    div2.html('');
    let str = '<h4>【医生信息】</h4>';
    str += '<h4>姓名：' + dt.dt_name + '</h4>';
    str += '<h4>职称：' + dt.dt_title + '</h4>';
    str += '<h4>联系方式：' + dt.dt_tel + '</h4>';
    str += '<h4>【医生简介】</h4>'
    str += '<h4>' + dt.introduction + '</h4>';
    div2.append(str);
};
let fillConsultList = function (data) {
    console.log(data);
    let dom = $('#dthome_cs_ul');
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
        url: 'http://134.175.21.162:8080/medicalSystem/doctor/doctorConsult.do',
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            doctorId: dt.dt_id,
            page: page
        },
    })
        .done(function (res) {
            if (res.status == 'login') {
                pageSum = parseInt(res.totalNum / 10) + 1;
                consult = res.advisoryArray;
                localStorage.setItem('dt_allConsult', JSON.stringify(consult));
                fillConsultList(res.advisoryArray);
                initConsultPagination(pageSum, page);
                console.log("success");
            } else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        })
        .fail(function () {
            console.log("error");
        })
};
let fillCommentList = function (result) {
    console.log(result);
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
        li += "<span>" + result[i].ev_content + "</span>";
        li += "</div><div class=\"col-lg-3 col-md-3\">";
        li += "<span class=\"pull-right\">" + result[i].ev_time + "</span>";
        li += "</div></div></div></li>";
        ul.append(li);
        $('.comment_head_img').css('background-image', 'url(" ' + result[i].patient.pt_image + ' ")');
    }
};
let loadComment = function (page) {
    page = page || 1;
    $.ajax({
        url: 'http://134.175.21.162:8080/medicalSystem/doctor/doctorEvaluation.do',
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            doctorId: dt.dt_id,
            page: page
        },
    })
        .done(function (res) {
            if (res.status == 'login') {
                pageSum = parseInt(res.totalNum / 10) + 1;
                fillCommentList(res.evaluationArray);
                initCommentPagination(pageSum, page);
                console.log("success");
            } else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        })
        .fail(function () {
            console.log("error");
        })
};
/**
 * @module doctor and patient 医生主页 and 咨询评论的展开
 */


//tab 页面切换
// $('#consult a').click(function () {
//     $(this).tab('show');
// });
// $('#comment a').click(function () {
//     $(this).tab('show');
// });

//点击显示咨询和评论
// $('#tab-show').click(function () {
//
//     $('#tab-show').fadeOut();
//     $('#consult-tab').fadeIn();
// });
//点击某一条咨询帖子 医生固定，咨询的病人不固定
$('#dthome_cs_ul').on('click', 'li', function () {
    // event.stopPropagation();
    //把医生资料保存到localStorage
    let index = $(this).index();
    // console.log(consult[index]);
    localStorage.setItem('dt_allConsult', JSON.stringify(consult));
    window.location.href = "../../html/doctor/consult.html?index=" + index;
});
//点击评论tab
$('#consult-tab>ul:first-child').click(function () {
    loadComment();
});
// 初始化咨询分页
//分页总页数
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
        loadComment(page, dt.dt_id);//重新请求下一页
    }
});
//评论点击上一页
$('#book_comment_page_ul').on('click', 'li:first-child', function () {
    if ($(this).hasClass('disabled') == false) {
        let ul = $('#book_comment_page_ul>ul');
        let page = getPrePage(ul, pages);
        loadComment(page, dt.dt_id); //重新请求上一页
    }
});



