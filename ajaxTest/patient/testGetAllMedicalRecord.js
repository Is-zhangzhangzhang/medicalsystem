function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/allMedicalRecord.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            patient_id: encodeURI("14"),
            page: encodeURI("1")
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                console.log('resultNumber:' + res.resultNum);
                var mrArr = res.mrArray
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
            } else {
                console.log('请登录！');
            }
        },
        error: function () {
            console.log("提交失败");
        }
    });
}

sendData();