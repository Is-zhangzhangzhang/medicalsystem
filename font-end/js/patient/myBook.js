$(function () {
    loadValidRegistration();
});
let loadValidRegistration= function(){
    let pt_id;
    if(localStorage.hasOwnProperty('patient')) {
        pt_id = JSON.parse(localStorage.getItem('patient')).pt_id;
    }
    $.ajax({
        type : "post",
        async:false,
        url : "http://134.175.21.162:8080/medicalSystem/patient/validRegistration.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType:"jsonp",
        jsonp:"callback",
        data: {
            pt_id:pt_id
        },
        success:function(res){
            if (res.status == 'login') {
                console.log(res);
                let li;
                res = res.rfArray;
                if(res.length <= 0){
                    return;
                }
                $('#myBook_ul').html('');
                for (var i in res) {
                    var rf = res[i];
                    li = "";
                    li += "<li class=\"list-group-item\">";
                    li += "<h4>" + "挂号：" + rf.doctor.clinic.cl_dept + "-" + rf.doctor.clinic.cl_part + "&emsp;医生：" + rf.doctor.dt_name + "</h4>";
                    li += "<span>" + "时间：";
                    var dateTime = rf.rf_time.split(" ");
                    li += dateTime[0] + "</span>";
                    var timeHour = dateTime[1].substring(0, 2);
                    if (parseInt(timeHour) < parseInt("12")) {
                        li += "<span>&ensp; 上午：";
                        if (parseInt(timeHour) < parseInt("10")) {
                            li += "8:00-10:00</span>";
                        } else {
                            li += "10:00-12:00</span>";
                        }
                    } else {
                        li += "<span>&ensp; 下午：";
                        if (parseInt(timeHour) < parseInt("16")) {
                            li += "14:00-16:00</span>";
                        } else {
                            li += "16:00-18:00</span>";
                        }
                    }
                    li += "<span>" + "&emsp;&emsp;挂号单时间：" + rf.rf_time + "</span>";
                    li += "</li>";
                    $('#myBook_ul').append(li);
                }
            }
            else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error:function(){
            console.log("提交失败");
        }
    });
};