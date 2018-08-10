$("#save").on("click", function () {
    var formData = new FormData();
    formData.append('image', $("#upload-file")[0].files[0]);   //将文件转成二进制形式
    formData.append('pt_id', encodeURI('13')),
        formData.append('pt_name', encodeURI($("#pt_name").val()));
    formData.append('pt_sex', encodeURI($("#pt_sex").val()));
    formData.append('born', encodeURI($("#pt_born").val()));
    formData.append('pt_tel', encodeURI($("#pt_tel").val()));
    $.ajax({
        type: "post",
        // url: "http://134.175.21.162:8080/medicalSystem/patient/setting.do",
        url:"http://localhost:8080/medicalSystem/patient/setting.do",
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        contentType: false,    //这个一定要写
        processData: false, //这个也一定要写，不然会报错
        data: formData,
        dataType: 'text',    //返回类型，有json，text，HTML。这里并没有jsonp格式，所以别妄想能用jsonp做跨域了。
        success: function (res) {
            res = $.parseJSON(res);
            if (res.status == 'login') {
                if (res.result == '1') {
                    console.log('success!');
                } else {
                  
                    console.log('fail');
                }
            }
            else {
                console.log('请登录');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown, data) {
            alert(errorThrown);
        }
    });
})