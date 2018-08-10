function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/markRegistration.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            rf_id: encodeURI("2"),
            pt_id: encodeURI("13")
        },
        success: function (res) {
            if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('标记成功');
                }
                else {
                    console.log('标记失败');
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