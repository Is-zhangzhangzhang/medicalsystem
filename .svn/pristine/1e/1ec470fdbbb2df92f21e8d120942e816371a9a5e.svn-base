function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/doctorOfClinic.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            clinicId: encodeURI("0101")
        },
        success: function (res) {
            if (res.status == 'login') {
                res = res.doctorArray;
                for (var i in res) {
                    console.log('id:' + res[i].dt_id + ',name:' + res[i].dt_name + ',sex:' + res[i].dt_sex + ',title:' + res[i].dt_title + ',introduction:' + res[i].introduction + ',money:' + res[i].money + ',image:' + res[i].dt_image);
                    console.log('cl_id:' + res[i].clinic.cl_id + ',cl_dept' + res[i].clinic.cl_dept + ',cl_part' + res[i].clinic.cl_part);
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