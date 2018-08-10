function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/admin/allClinic.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            page: encodeURI('1')
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                console.log('结果总数：' + res.resultNum);
                var cls = res.clinicArray;
                for (var i in cls) {
                    console.log('cl_id:' + cls[i].cl_id + ',cl_dept:' + cls[i].cl_dept + ',cl_part:' + cls[i].cl_part + ',cl_place:' + cls[i].cl_place);
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