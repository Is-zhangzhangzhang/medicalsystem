function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/callReply.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            pt_id: encodeURI("14"),
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                if (res.result == '1') {
                    var reArr = res.replyArray;
                    for (var i in reArr) {
                        console.log('re_id:' + reArr[i].re_id + ',re_content:' + reArr[i].re_content + ',re_time:' + reArr[i].re_time);

                        console.log('dt_id:' + reArr[i].re_Consultaion.doctor.dt_id + ',dt_name:' + reArr[i].re_Consultaion.doctor.dt_name + ',dt_sex:' + reArr[i].re_Consultaion.doctor.dt_sex + ',dt_tel:' + reArr[i].re_Consultaion.doctor.dt_tel + ',dt_image:' + reArr[i].re_Consultaion.doctor.dt_image + ',dt_title:' + reArr[i].re_Consultaion.doctor.dt_title + ',introduction:' + reArr[i].re_Consultaion.doctor.introduction + ',money:' + reArr[i].re_Consultaion.doctor.money);
                    }
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