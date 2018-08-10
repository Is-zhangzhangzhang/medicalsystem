$(function () {
    loadTreatmentInformation();
});
let loadTreatmentInformation = function () {
    let registerId;
    if (localStorage.hasOwnProperty('registerId')) {
        registerId = JSON.parse(localStorage.getItem('registerId'));
    }
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/doctor/treatment.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            rf_id: registerId
        },
        success: function (res) {
            if (res.status == 'login') {
                let mrId = res.medicalRecordId;
                let mrDate = res.medicalRecordDate;
                let doctor = res.doctor;
                let patient = res.patient;
                let clinic = res.doctor.clinic;
                // let ill = res.illness;

                let spanList = $("span[name='mr_msg']");
                let born = parseInt(patient.born.substring(0, 4));
                console.log(born);
                let age = parseInt((new Date()).getFullYear()) - born + 1;
                spanList[0].innerText = patient.pt_name;
                spanList[1].innerText = patient.pt_sex;
                spanList[2].innerText = age;
                spanList[3].innerText = mrId;
                spanList[4].innerText = clinic.cl_dept;
                spanList[5].innerText = clinic.cl_part;
                spanList[6].innerText = mrDate;
                let medicalMsg = [];
                for (let i = 0, data; data = res.medicines[i++];) {
                    medicalMsg.push(data.md_name);
                }
                console.log(medicalMsg);
                if ($('#medical-name'))
                    $('#medical-name').autocomplete({
                        source: medicalMsg
                    });
            }else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error: function () {
            console.log("失败！");
        }
    });
}
$('#medicine_button').click(function () {
    let md_name = $('#medical-name').val();
    let amount = $('#medical-amount').val();
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/doctor/MedicinePrice.do",
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            md_name: md_name,
        },
        success: function (res) {
            if ($('#medicalRecord_tbody>tr>td:first-child').text() == "暂无药品") {
                $('#medicalRecord_tbody').html('');
            }
            console.log(res.medicine.md_price);
            let tr;
            tr = "";
            tr += "<tr>";
            tr += "<td>" + res.medicine.md_id + "</td>";
            tr += "<td>" + md_name + "</td>";
            tr += "<td>" + amount + "</td>";
            tr += "<td>" + res.medicine.md_price + "</td></tr>";
            $('#medicalRecord_tbody').append(tr);
        },
        error: function () {
            console.log("失败");
        }
    });
});
$('#medicalRecord_save').click(function () {
    let pt_id;
    if (localStorage.hasOwnProperty('patient')) {
        pt_id = JSON.parse(localStorage.getItem('patient')).pt_id;
    }
    let dt_id;
    if (localStorage.hasOwnProperty('doctor')) {
        dt_id = JSON.parse(localStorage.getItem('doctor')).dt_id;
    }
    let registerId;
    if (localStorage.hasOwnProperty('registerId')) {
        registerId = JSON.parse(localStorage.getItem('registerId'));
    }
    let spanList = $("span[name='mr_msg']");
    let mr_id = spanList[3].innerText;
    let mr_time = spanList[6].innerText;
    let illness = $('#disease').val();
    let mr_taken_times = $('#eat_times').val();
    let mr_taken_days = $('#eat_days').val();
    let mr_score = $('#mr_score').val();
    var tr = $('#medicalRecord_tbody tr');
    var prstArr = [];
    console.log(tr);
    for (var i = 0; i < tr.length; i++) {
        console.log($(tr[i]).text());
        mdname = $($(tr[i]).find('td').get(1)).text();
        pr_num = $($(tr[i]).find('td').get(2)).text();
        prstArr.push({mdname,pr_num});
    }
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/doctor/submitMdRecord.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            rf_id: registerId,
            mr_id: mr_id,
            mr_time: mr_time,
            illness: illness,
            mr_taken_times: mr_taken_times,
            mr_taken_days: mr_taken_days,
            mr_score: mr_score,
            dt_id: dt_id,
            pt_id: pt_id,
            prstSet: JSON.stringify(prstArr)
        },
        success: function (result) {
            if (result.status == 'login') {
                console.log(result);//1表示提交到数据库成功0表示失败
                $('#submit_mdRecord').modal('show');
            }else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error: function () {
            console.log("失败！");
        }
    });
});