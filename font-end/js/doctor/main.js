$(function () {
    loadDoctorInformation();
});

let getUserId = function () {
    let id = "";
    if(localStorage.hasOwnProperty('user_id')){
        id = parseInt(localStorage.getItem('user_id'));
    }
    return id;
};

let doctor;
let loadDoctorInformation = function () {
    let day = (new Date()).getDay() + 1;
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
            user_id: getUserId(),
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
