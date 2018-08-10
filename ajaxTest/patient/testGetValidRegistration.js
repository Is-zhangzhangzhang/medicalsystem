function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/validRegistration.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            pt_id: encodeURI("13"),
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                res = res.rfArray;
                for (var i in res) {
                    var rf = res[i];
                    console.log('rf_id:' + rf.rf_id + ',rf_time:' + rf.rf_time + ',rf_status:' + rf.rf_status);
                    var doctor = rf.doctor;
                    console.log('dt_id:' + doctor.dt_id + ',dt_name:' + doctor.dt_name);
                    var clinic = doctor.clinic;
                    console.log('cl_id:' + clinic.cl_id + ',cl_dept:' + clinic.cl_dept + ',cl_part:' + clinic.cl_part + ',cl_place:' + clinic.cl_place);
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