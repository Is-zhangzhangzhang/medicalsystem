function sendData() {
    $.ajax({
        type: "post",
        async: false,
        // url: "http://134.175.21.162:8080/medicalSystem/admin/allRegistration.do",
        url: "http://localhost:8080/medicalSystem/admin/allRegistration.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            page: encodeURI("1"),
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                console.log('结果总数：' + res.resultNum);
                var rfs = res.rfArray;
                for (var i in rfs) {
                    var rf = rfs[i];
                    console.log('rf_id:' + rf.rf_id + ',rf_time:' + rf.rf_time + ',rf_status:' + rf.rf_status);
                    var doctor = rf.doctor;
                    console.log('dt_id:' + doctor.dt_id + ',dt_name:' + doctor.dt_name);
                    var patient = rf.patient;
                    console.log('pt_id:' + patient.pt_id + ',pt_name:' + patient.pt_name);
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