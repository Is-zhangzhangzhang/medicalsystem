function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/submitRegistration.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            doctorId: encodeURI("1"),
            patientId: encodeURI("13"),
            dayOfWeek: encodeURI("3"),
            startTime: encodeURI("16")
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {

                if (res.result == 1) {
                    console.log("success!");
                }
                else {
                    console.log("fail!");
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