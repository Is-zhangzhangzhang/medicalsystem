function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/loadPatient.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp:"callback",
        data: {
            userId: encodeURI("13"),
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                console.log(res.pt_id);
                console.log(res.pt_name);
                console.log(res.born);
                console.log(res.pt_sex);
                console.log(res.pt_image);
                console.log(res.IDCardNumber);
                console.log(res.pt_tel);
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