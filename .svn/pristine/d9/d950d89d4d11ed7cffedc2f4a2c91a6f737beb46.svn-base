function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/admin/allDoctor.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            page: encodeURI("1")
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                console.log('结果总数：' + res.resultNum);
                var doctors = res.doctorArray;
                for (var i in doctors) {
                    console.log('id:' + doctors[i].dt_id + ',name:' + doctors[i].dt_name + ',sex:' + doctors[i].dt_sex + ',title:' + doctors[i].dt_title + ',introduction:' + doctors[i].introduction + ',money:' + doctors[i].money + ',image:' + doctors[i].dt_image);
                    console.log('cl_id:' + doctors[i].clinic.cl_id + ',cl_dept' + doctors[i].clinic.cl_dept + ',cl_part' + doctors[i].clinic.cl_part);
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