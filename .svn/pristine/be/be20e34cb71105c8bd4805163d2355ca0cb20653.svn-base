function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/admin/submitMedicine.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            md_id: encodeURI('50'),
            md_name: encodeURI('整肠丸'),
            md_is_prescription: encodeURI('OTC'),
            md_price: encodeURI('2.5'),
            md_inventor: encodeURI('20000'),
            md_details: encodeURI('治疗腹泻，腹痛，消化不良。')
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