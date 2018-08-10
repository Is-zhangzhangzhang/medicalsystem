$(function () {
    initSetting();
});
let doctor;
if (localStorage.hasOwnProperty('doctor')) {
    doctor = JSON.parse(localStorage.getItem('doctor'));
}
let initSetting = function () {
    $("#dt_id").val(doctor.dt_id);
    $("#head-show div").css('background-image', 'url("'+doctor.dt_image+'")');
    $("#dt_name").val(doctor.dt_name);
    $("#dt_sex").val(doctor.dt_sex);
    $("#dt_title").val(doctor.dt_title);
    $("#dt_clinic").val(doctor.clinic.cl_dept + "-" + doctor.clinic.cl_part);
    $("#dt_money").val(doctor.money);
    $("#dt_tel").val(doctor.dt_tel);
    $("#dt_introduction").val(doctor.introduction);
}

$("#dt_setting_save").on("click", function () {
    var formData = new FormData();
    formData.append('image', $("#upload-file")[0].files[0]);   //将文件转成二进制形式
    formData.append('dt_id', encodeURI(doctor.dt_id));
    formData.append('dt_name', encodeURI($("#dt_name").val()));
    formData.append('dt_sex', encodeURI($("#dt_sex").val()));
    formData.append('introduction', encodeURI($("#dt_introduction").val()));
    formData.append('dt_tel', encodeURI($("#dt_tel").val()));
    $.ajax({
        type: "post",
        url: "http://134.175.21.162:8080/medicalSystem/doctor/setting.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        async: false,
        contentType: false,    //这个一定要写
        processData: false, //这个也一定要写，不然会报错
        data: formData,
        dataType: 'text',    //返回类型，有json，text，HTML。这里并没有jsonp格式，所以别妄想能用jsonp做跨域了。
        success: function (res) {
            res = JSON.parse(res);
            console.log(res);
            // if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('success!');
                    // $('#setting_modal').modal('show');
                    //保存修改后localstorage也需要更新
                } else {
                    console.log('fail');
                }
            // } else {
            //     alert('请登录！');
            //     window.location.href = "../../index.html";
            // }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown, data) {
            alert(errorThrown);
        }
    });
});

// $('#setting_modal_btn').click(function () {
        // let day = (new Date()).getDay() + 1;
        // $.ajax({
        //     url: 'http://134.175.21.162:8080/medicalSystem/doctor/dmain.do',
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     crossDomain: true,
        //     type: 'POST',
        //     dataType: 'jsonp',
        //     jsonp: 'callback',
        //     data: {
        //         user_id: getUserId(),
        //         dayOfWeek: day
        //     },
        // })
        //     .done(function(result) {
        //             doctor = result.doctor; //医生信息
        //             localStorage.setItem('doctor', JSON.stringify(doctor));
        //     })
        //     .fail(function() {
        //         console.log("error");
        //     })
    // window.location.href = "../../js/doctor/setting.html";
// });