$(function () {
    loadRecord();
});
let patient;
let pageSum = 1;
let _record;
if (localStorage.hasOwnProperty('patient')) {
    patient = JSON.parse(localStorage.getItem('patient'));
}
let fillRecordList = function () {
    let ul = $('#my_record_ul');
    if(_record.length <= 0){
        return;
    }
    ul.html('');
    let li = "";
    for (let i = 0, data; data = _record[i++];) {
        li = "";
        li += "<li class=\"list-group-item\">医生：";
        li += data.doctor.dt_name;
        li += "<span class=\"badge\">" + data.mr_time + "</span>";
        ul.append(li);
    }
};
let loadRecord = function (page) {
    page = page || 1;
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/allMedicalRecord.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            patient_id: patient.pt_id,
            page: page
        },
        success: function (res) {
            if (res.status == 'login') {
                console.log('resultNumber:' + res.resultNum);
                let sum = parseInt(res.resultNum / 10) + 1;
                _record = res.mrArray;
                console.log(_record);
                fillRecordList();
                initConsultPagination(sum,page);
                mrArr = res.mrArray;
                for (var i in mrArr) {
                    console.log('mr_id:' + mrArr[i].mr_id + ',mr_time:' + mrArr[i].mr_time + ',mr_taken_times:' + mrArr[i].mr_taken_times + ',mr_taken_days:' + mrArr[i].mr_taken_days + ',mr_score:' + mrArr[i].mr_score);
                    var doctor = mrArr[i].doctor;
                    console.log('dt_id:' + doctor.dt_id + ',dt_name:' + doctor.dt_name);
                    var patient = mrArr[i].patient;
                    console.log('pt_id:' + patient.pt_id + ',pt_name:' + patient.pt_name);
                    var ill = mrArr[i].illness;
                    console.log('ill_id:' + ill.ill_id + ',ill_name:' + ill.ill_name);
                    var prs = mrArr[i].prstSet;
                    for (var j in prs) {
                        var md = prs[j].medicine
                        console.log('md_id:' + md.md_id + ',md_name:' + md.md_name + ',md_is_Prescription:' + md.md_is_prescription + ',md_price:' + md.md_price);
                        console.log('pr_num:' + prs[j].pr_num);
                    }
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

//点击病历列表
$('#my_record_ul').on('click', 'li', function () {
    let index = $(this).index();
    console.log(index);
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/oneMedicalRecord.do",
        dataType: "jsonp",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        jsonp: "callback",
        data: {
            mr_id: _record[index].mr_id,
        },
        success: function (res) {
            if (res.status == 'login') {
                let mr = res.medicalRecord;
                let doctor = mr.doctor;
                let patient = res.patient;
                let clinic = res.clinic;
                let ill = mr.illness;

                let spanList = $("span[name='mr_msg']");
                let born = parseInt(patient.born.substring(0, 4));
                console.log(born);
                let age = parseInt((new Date()).getFullYear()) - born + 1;
                spanList[0].innerText = patient.pt_name;
                spanList[1].innerText = patient.pt_sex;
                spanList[2].innerText = age;
                spanList[3].innerText = mr.mr_id;
                spanList[4].innerText = clinic.cl_dept;
                spanList[5].innerText = clinic.cl_part;
                spanList[6].innerText = mr.mr_time;
                $('#record-disease').text(ill.ill_name);
                let table = $('#rp_table');
                table.html('');
                let thead = "<thead>\<tr><th>药品编号</th><th>药品名称</th><th>药品用量</th><th>药品单价</th>";
                thead += "</tr></thead>";
                table.append(thead);
                let tr = "";
                let tbody = "<tbody>";
                for (let i = 0, md; md = mr.prstSet[i++];) {
                    console.log(i);
                    tr = "<tr>";
                    tr += "<td>" + md.medicine.md_id + "</td>";
                    tr += "<td>" + md.medicine.md_name + "</td>";
                    tr += "<td>" + md.pr_num + "</td>";
                    tr += "<td>" + md.medicine.md_price + "</td></tr>";
                    tbody += tr;
                }
                tbody += "</tbody>";
                table.append(tbody);
                $('#mr_take_time').text(mr.mr_taken_times);
                $('#mr_taken_day').text(mr.mr_taken_days);
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


// 初始化历史病历分页
let initConsultPagination = function (sum, page) {
    let dom = $('#mr_page>ul');
    dom.html('');
    drawPagination(dom, pageSum, page);
};
//历史病历点击下一页
$('#mr_page').on('click', 'li:last-child', function () {
    if ($(this).hasClass('disabled') == false) {   //如果下一页可以点击
        let ul = $('#mr_page>ul');    //ul 分页的ul
        let page = getNextPage(ul, pageSum);
        loadRecord(page); //重新请求下一页
    }
});
//历史病历点击上一页
$('#mr_page').on('click', 'li:first-child', function () {
    if ($(this).hasClass('disabled') == false) {
        let ul = $('#mr_page>ul');
        let page = getPrePage(ul, pageSum);
        loadRecord(page); //重新请求上一页
    }
});
//历史病历点击某一页
$('#mr_page').on('click', 'li', function () {
    let toPage =Number($(this).text());
    if(!isNaN(toPage)){
        clickAnyPage($('#mr_page>ul'),toPage);
        loadRecord(page);
    }
});
