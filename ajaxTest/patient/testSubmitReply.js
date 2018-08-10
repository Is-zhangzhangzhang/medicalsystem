function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/submitReply.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            ad_id: encodeURI("1"),
            patient_id: encodeURI("18"),
            re_content: encodeURI("如何调节？")
        },
        success: function (res) {
            console.log(res)
            if (res.status == 'login') {
                if (res.result == 1) {
                    console.log("success!");
                }
                else {
                    console.log("fail!");
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