function sendData() {
    $.ajax({
        type: "post",
        async: false,
        url: "http://localhost:8080/medicalSystem/admin/allMedicine.do",
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
                var mds = res.medicineArray;
                for (var i in mds) {
                    var md = mds[i];
                    console.log('md_id:' + md.md_id + ',md_name:' + md.md_name + ',md_is_prescription:' + md.md_is_prescription + ',md_price:' + md.md_price + ',md_inventor:' + md.md_inventor + ',md_details:' + md.md_details);
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