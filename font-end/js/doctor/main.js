$(function () {
    loadDoctorInformation();
});

let doctor;
let loadDoctorInformation = function () {
    let day = (new Date()).getDay();
    $.ajax({
        url: 'http://134.175.21.162:8080/medicalSystem/doctor/dmain.do',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        type: 'POST',
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            user_id: parseInt(localStorage.getItem('user_id')),
            dayOfWeek: day
        },
    })
        .done(function(result) {
            // console.log(result);
            if (result.status == 'login') {
                doctor = result.doctor; //医生信息
                localStorage.setItem('doctor', JSON.stringify(doctor));
                let registerNum = result.registerFormNumber; //医生今天挂号数
                $('#registerNum').append(registerNum);
                fillTopInformation();
                console.log("loadDoctor success");
            }else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        })
        .fail(function() {
            console.log("error");
        })
};
