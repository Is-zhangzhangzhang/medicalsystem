function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/evaluation.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            doctorId: encodeURI("1"),
            page: encodeURI("1")
        },
        success: function (res) {
            if (res.status == 'login') {
                console.log('reulstNumber:' + res.resultNum);
                var evArr = res.evaluationArray;
                for (var i in evArr) {
                    console.log('ev_id:' + evArr[i].ev_id + ',ev_content:' + evArr[i].ev_content + ',ev_time:' + evArr[i].ev_time + ',ev_status:' + evArr[i].ev_status + ',ev_score:' + evArr[i].ev_score);
                    console.log('dt_id:' + evArr[i].doctor.dt_id + ',dt_name:' + evArr[i].doctor.dt_name);
                    console.log('pt_id:' + evArr[i].patient.pt_id + ', pt_name:' + evArr[i].patient.pt_name + ', pt_image:' + evArr[i].patient.pt_image);
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