function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/callRegistration.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            patientId: encodeURI("13"),
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('被呼叫');
                    var rf = res.registrationForm;
                    console.log('rf_id:' + rf.rf_id + ',rf_time:' + rf.rf_time + ',rf_status:' + rf.rf_status);
                    var doctor = rf.doctor;
                    console.log('dt_id:' + doctor.dt_id + ',dt_name:' + doctor.dt_name);
                    var clinic = doctor.clinic;
                    console.log('cl_id:' + clinic.cl_id + ',cl_dept:' + clinic.cl_dept + ',cl_part:' + clinic.cl_part + ',cl_place:' + clinic.cl_place);
                    var patient = rf.patient;
                    console.log('pt_id:' + patient.pt_id + ',pt_name:' + patient.pt_name);
                } else {
                    console.log("请继续等待");
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

window.setInterval(function () { sendData(); }, 20000);