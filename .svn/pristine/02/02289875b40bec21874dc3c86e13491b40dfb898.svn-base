function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/searchIllness.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            searchKey: encodeURI("感冒"),
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                res = res.illArray;
                for (var i in res) {
                    console.log('ill_id:' + res[i].ill_id + ',ill_name:' + res[i].ill_name + ',ill_symptom:' + res[i].ill_symptiom + ',ill_treatment:' + res[i].ill_treatment);
                    var clinic = res[i].clinic;
                    console.log('cl_id:' + clinic.cl_id + ',cl_dept:' + clinic.cl_dept + ',cl_part:' + clinic.cl_part + ',cl_place:' + clinic.cl_place);
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