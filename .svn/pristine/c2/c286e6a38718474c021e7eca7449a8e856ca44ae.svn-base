
function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/patient/askCOrder.do",
        // url: "http://134.175.21.162:8080/medicalSystem/patient/askCOrder.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            patientId: encodeURI("13"),
        },
        success: function (res) {
            console.log(res);
            if(res.status == 'login'){
            if (res.result == '1') {
                console.log('有消费单啦');
                for (var i in res.consumptionOrder) {
                    var co = res.consumptionOrder[i];
                    console.log('co_id:' + co.co_id + ',co_price:' + co.co_price + ',co_status:' + co.co_status);
                    var mr = co.mr;
                    console.log('mr_id:' + mr.mr_id);
                    var doctor = mr.doctor;
                    console.log('dt_id:' + doctor.dt_id + ',dt_name:' + doctor.dt_name + ',money' + doctor.money);
                    var patient = mr.patient;
                    console.log('pt_id:' + patient.pt_id + ',pt_name:' + patient.pt_name);
                    var prs = mr.prstSet;
                    for (var i in prs) {
                        var md = prs[i].medicine
                        console.log('pr_num:' + prs[i].pr_num + ',md_id:' + md.md_id + ',md_name:' + md.md_name + 'md_price:' + md.md_price);
                    }
                }
            } else {
                console.log("请继续等待");
            }
        }
        else{
            console.log('请登录！');
        }
        },
        error: function () {
            console.log("提交失败");
        }
    });
}

sendData();