function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/admin/clinic.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {

        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                res = res.clinicArray;
                for (var i in res) {
                    console.log('cl_id:' + res[i].cl_id + ',cl_dept:' + res[i].cl_dept + ',cl_part:' + res[i].cl_part + ',cl_place:' + res[i].cl_place);
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