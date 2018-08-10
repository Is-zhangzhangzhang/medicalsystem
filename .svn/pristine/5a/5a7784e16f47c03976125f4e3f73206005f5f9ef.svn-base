function sendData() {
  $.ajax({
    type: "post",
    async: false,
    url: "http://localhost:8080/medicalSystem/admin/allIllness.do",
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
        var ills = res.illnessArray;
        for (var i in ills) {
          console.log('ill_id:' + ills[i].ill_id + ',ill_name:' + ills[i].ill_name + ',ill_symptom:' + ills[i].ill_symptiom + ',ill_treatment:' + ills[i].ill_treatment);
          var clinic = ills[i].clinic;
          console.log('cl_id:' + clinic.cl_id + ',cl_dept:' + clinic.cl_dept + ',cl_part:' + clinic.cl_part + ',cl_place:' + clinic.cl_place);
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