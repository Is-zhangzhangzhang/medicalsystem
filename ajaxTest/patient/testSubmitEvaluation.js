function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/submitEvaluation.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            patientId: encodeURI("13"),
            doctorId: encodeURI('1'),
            ev_content: encodeURI('服务周到，很温柔！'),
            ev_score: encodeURI('3.5'),
            rf_id: encodeURI('1')
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('评价成功')
                } else {
                    console.log("评价失败");
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
