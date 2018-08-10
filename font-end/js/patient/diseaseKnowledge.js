//搜索疾病
$('#submit_disease_name').click(function ()  {
    let disease = $('#disease_name').val();
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/searchIllness.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            searchKey: disease,
        },
        success:function(res){
            if (res.status == 'login') {
                res = res.illArray;
                $('#diseaseKnowledge_ul').html('');
                console.log(res)
                let li;
                for (var i in res) {
                    li = "";
                    li += "<li class=\"list-group-item\">";
                    li += "<h4>" + res[i].ill_name + "</h4>";
                    li += "<p><span>症状：</span>" + res[i].ill_symptom + "</p>";
                    li += "<p><span>常用治疗：</span>" + res[i].ill_treatment + "</p>";
                    li += "<p>挂号科室：" + res[i].clinic.cl_dept + "&emsp;" + res[i].clinic.cl_part + "&emsp;&emsp;&emsp;科室地点：" + res[i].clinic.cl_place + "</p>";
                    li += "</li>"
                    $('#diseaseKnowledge_ul').append(li);
                }
            }
            else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error:function(){
            console.log("失败");
        }
    });
});