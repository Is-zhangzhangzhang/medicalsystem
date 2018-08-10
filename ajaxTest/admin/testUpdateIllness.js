function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/admin/updateIllness.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            ill_id: encodeURI('1212'),
            ill_name: encodeURI('肠胃炎'),
            ill_symptom: encodeURI('腹胀，消化不良'),
            ill_treatment: encodeURI('饮食清淡,服用江中牌健胃消食片'),
            cl_id: encodeURI('0102')
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('修改成功');
                }
                else {
                    console.log('修改失败');
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