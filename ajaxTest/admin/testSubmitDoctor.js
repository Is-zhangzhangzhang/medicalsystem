function sendData() {
    $.ajax({
        type: "post",
        async: false,
        //  url : "http://134.175.21.162:8080/medicalSystem/admin/submitDoctor.do",
        url: "http://localhost:8080/medicalSystem/admin/submitDoctor.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            dt_id: encodeURI('770'),
            dt_name: encodeURI('小腾涌'),
            dt_sex: encodeURI('女'),
            dt_tel: encodeURI('13458201349'),
            dt_title: encodeURI('主任医师'),
            introduction: encodeURI('主要攻研脑癌领域，拯救30000脑疾患者。'),
            money: encodeURI('9000'),
            cl_id: encodeURI('0101')
        },
        success: function (res) {
            if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('添加成功');
                }
                else {
                    console.log('添加失败');
                }
            }
            else {
                console.log('请登录');
            }
        },
        error: function () {
            console.log("提交失败");
        }
    });
}

sendData();