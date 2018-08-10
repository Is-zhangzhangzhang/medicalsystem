function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/admin/submitClinic.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            cl_id: encodeURI('2309'),
            cl_dept: encodeURI('内科'),
            cl_part: encodeURI('脾肺门诊'),
            cl_place: encodeURI('4栋203')
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('添加成功');
                }
                else {
                    console.log('添加失败');
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