function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/remainingNumber.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            doctorId: encodeURI("1"),
            dayOfWeek: 2
        },
        success: function (res) {
            if (res.status == 'login') {
                res = res.timeArray;
                for (var i in res) {
                    console.log('number:' + res[i]);
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