$(function () {
    initSetting();
});
let patient;
if (localStorage.hasOwnProperty('patient')) {
    patient = JSON.parse(localStorage.getItem('patient'));
}
let initSetting = function () {
    $("#pt_id").val(patient.pt_id);
    $("#head-img").css('background-image', 'url(' + patient.pt_image + ')');
    $("#pt_name").val(patient.pt_name);
    $("#pt_sex").val(patient.pt_sex);
    $("#pt_born").val(patient.born);
    $("#pt_tel").val(patient.pt_tel);
}
/**
 * @module 个人资料
 */
// 修改出生日期
if ($('#pt_born'))
    $('#pt_born').datetimepicker({
        format: 'yyyy-mm-dd',
        minView: "month",
        autoclose: 1
    });
//更新localstorage中patient的信息
let loadPatient = function (uid) {
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/patient/loadPatient.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            userId: uid,
        },
        success: function (res) {
            if (res.status == 'login') {
                console.log("获取病人信息成功！");
                // localStorage.removeItem('patient');
                localStorage.setItem('patient', JSON.stringify(res));
            }
        },
        error: function () {
            console.log("获取病人信息失败");
        }
    });
};
$("#pt_setting_save").on("click", function () {
    var formData = new FormData();
    formData.append('image', $("#upload-file")[0].files[0]);   //将文件转成二进制形式
    formData.append('pt_id', encodeURI($("#pt_id").val()));
    formData.append('pt_name', encodeURI($("#pt_name").val()));
    formData.append('pt_sex', encodeURI($("#pt_sex").val()));
    formData.append('born', encodeURI($("#pt_born").val()));
    formData.append('pt_tel', encodeURI($("#pt_tel").val()));
    $.ajax({
        type: "post",
        url: "http://134.175.21.162:8080/medicalSystem/patient/setting.do",
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
            console.log(res);
            res = $.parseJSON(res);
            if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('success!');
                    loadPatient($("#pt_id").val());
                     $('#setting_modal').modal('show');
                    //保存修改后localstorage也需要更新
                     location.reload();
                } else {
                    console.log('fail');
                }
            }
            else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown, data) {
            alert(errorThrown);
        }
    });
});