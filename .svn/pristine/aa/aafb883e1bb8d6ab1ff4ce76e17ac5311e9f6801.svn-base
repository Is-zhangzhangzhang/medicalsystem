function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/admin/part.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            dept: encodeURI("内科")
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                res = res.partArray;
                for (var i in res) {
                    console.log('cl_id:' + res[i].cl_id + ',cl_part:' + res[i].cl_part);

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