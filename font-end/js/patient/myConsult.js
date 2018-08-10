$(function () {
    loadMyConsult();
});
let pt;
let pageSum=1;
let consult;
if(localStorage.hasOwnProperty('patient')){
    pt = JSON.parse(localStorage.getItem('patient'));
}
let loadMyConsult = function (page) {
    page = page || 1;
    $.ajax({
        type : "post",
        async:false,
        url : "http://134.175.21.162:8080/medicalSystem/patient/advisoryOfPatient.do",
        dataType:"jsonp",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        jsonp:"callback",
        data: {
            patientId:pt.pt_id,
            page: page
        },
        success:function(res){
            if (res.status == 'login') {
                if(res.resultNum <= 0){
                    return ;
                }
                console.log('reulstNumber:' + res.resultNum);
                pageSum = parseInt(res.resultNum / 10) + 1;
                fillMyConsultList(res.advisoryArray)
                initMyConsultPagination(pageSum, page);
                // console.log(res.advisoryArray);
                consult = res.advisoryArray;
                localStorage.setItem('pt_allConsult', JSON.stringify(consult));
                // for(var i in adArr){
                //     console.log('ad_id:'+ adArr[i].ad_id+',ad_content:'+adArr[i].ad_content+',ad_time:'+adArr[i].ad_time+',ad_title'+adArr[i].ad_title);
                //     console.log('dt_id:'+adArr[i].doctor.dt_id+',dt_name:'+adArr[i].doctor.dt_name+',dt_sex:'+adArr[i].doctor.dt_sex+',dt_tel:'+adArr[i].doctor.dt_tel+',dt_image:'+adArr[i].doctor.dt_image+',dt_title:'+adArr[i].doctor.dt_title+',introduction:'+adArr[i].doctor.introduction+',money:'+adArr[i].doctor.money);
                //     console.log('cl_id:'+adArr[i].doctor.clinic.cl_id+',cl_dept:'+adArr[i].doctor.clinic.cl_dept+',cl_part:'+adArr[i].doctor.clinic.cl_part+',cl_place:'+adArr[i].doctor.clinic.cl_place);
                //     console.log('pt_id:'+adArr[i].patient.pt_id+', pt_name:'+adArr[i].patient.pt_name);
                // }
            }else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error:function(){
            console.log("提交失败");
        }
    });
};

let fillMyConsultList = function (data) {
    let dom = $('#myConsult>ul');
    dom.html('');
    let li;
    for(let i in data)
    {
        li = "";
        li += "<li class=\"list-group-item\">";
        li += "<strong>"+data[i].ad_title+"</strong>";
        li += "<span class=\"badge pull-right \">"+data[i].ad_time+"</span>";
        li += "<span class=\"pull-right consult-writer\">作者："+data[i].patient.pt_name+"</span>";
        li += "</li>";
        dom.append(li);
    }
};
let initMyConsultPagination = function (pages, page){
    let dom = $('#mycs_nav_page>ul');
    pageSum = pages;
    console.log(pageSum);
    dom.html('');
    drawPagination(dom,pageSum,page);
};

//点击我的某一条咨询帖子
$('#myConsult>ul').on('click','li',function () {
    event.stopPropagation();
    //把医生资料保存到localStorage
    let index = $(this).index();
    // localStorage.setItem('doctor',JSON.stringify(consult[index].doctor));
    // localStorage.setItem('consultIndex',index);
    window.location.href = "../../html/patient/consult.html?pt_consultList=true&index="+index;
});
//点击下一页
$('#mycs_nav_page').on('click','li:last-child',function () {
    if($(this).hasClass('disabled') == false)
    {
        let ul = $('#mycs_nav_page>ul');
        let page = getNextPage(ul,pageSum);
        loadMyConsult(page); //重新请求下一页
    }
});
//点击上一页
$('#mycs_nav_page').on('click','li:first-child',function () {
    if($(this).hasClass('disabled') == false){
        let ul = $('#mycs_nav_page>ul');
        let page = getPrePage(ul,pages);
        loadMyConsult(page); //重新请求上一页
    }
});