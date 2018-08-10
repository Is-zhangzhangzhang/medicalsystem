function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/oneMedicalRecord.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            mr_id: encodeURI("2"),
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                var mr = res.medicalRecord;
                console.log('mr_id:' + mr.mr_id + ',mr_time:' + mr.mr_time + ',mr_taken_times:' + mr.mr_taken_times + ',mr_taken_days:' + mr.mr_taken_days + ',mr_score:' + mr.mr_score);
                var doctor = mr.doctor;
                console.log('dt_id:' + doctor.dt_id + ',dt_name:' + doctor.dt_name);
                var patient = res.patient;
                var clinic = res.clinic;
                console.log('cl_id:' + clinic.cl_id + ',cl_dept:' + clinic.cl_dept + ',cl_part:' + clinic.cl_part + ',cl_place:' + clinic.cl_place);
                console.log('pt_id:' + patient.pt_id + ',pt_name:' + patient.pt_name + ',born:' + patient.born + ',pt_sex:' + patient.pt_sex + ',pt_image:' + patient.pt_image + ',IDCardNumber:' + patient.IDCardNumber + ',pt_tel:' + patient.pt_tel);
                var ill = mr.illness;
                console.log('ill_id:' + ill.ill_id + ',ill_name:' + ill.ill_name);
                var prs = mr.prstSet;
                for (var j in prs) {
                    var md = prs[j].medicine
                    console.log('md_id:' + md.md_id + ',md_name:' + md.md_name + ',md_is_Prescription:' + md.md_is_prescription + ',md_price:' + md.md_price);
                    console.log('pr_num:' + prs[j].pr_num);
                }
            }
            else {
                console.log('请登录！');
            }
        },
        error: function () {
            console.log("提交失败");
        }
    });
}

sendData();