//医生挂号列表
$(function () {
    loadDoctorRegistration();
    registrationButton();
});
let registerList;
let loadDoctorRegistration = function () {
    let dt_id;
    if (localStorage.hasOwnProperty('doctor')) {
        dt_id = JSON.parse(localStorage.getItem('doctor')).dt_id;
    }
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/doctor/registration.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            dt_id: dt_id
        },
        success: function (res) {
            console.log(res);
            if (res.status == 'login') {
                registerList = res.reArray;
                if(registerList.length<=0){
                    return;
                }
                $('#registerList_tbody').html('');
                let tr;
                for (var i = 0; i < registerList.length; i++) {
                    var k = i + 1;
                    tr = "";
                    tr += "<tr>";
                    tr += "<td>" + k + "</td>";
                    tr += "<td>" + registerList[i].rf_id + "</td>";
                    tr += "<td>" + registerList[i].patient.pt_name + "</td>";
                    tr += "<td class=\"list-action\">";
                    tr += "<button class=\"btn btn-warning\">呼叫</button>";
                    tr += "<button class=\"btn btn-info\">就诊</button>";
                    tr += "<button class=\"btn btn-danger\">忽略</button>";
                    tr += "</td></tr>";
                    $('#registerList_tbody').append(tr);
                }
            } else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error: function () {
            console.log("失败");
        }
    });
};
let registrationButton = function () {
    /**
     * @module 我的挂号列表界面
     * @description 点击就诊跳转到病例界面
     *
     * @property el 点击的就诊button
     * @property tr 点击的button所在tr
     * @property td 点击的button所在tr下的所有td
     */
    if (document.getElementById('list-table'))
        document.getElementById('list-table').addEventListener('click', function (e) {
            // console.log(e.target);
            var el = e.target;
            if (el.innerText == '就诊') {
                var tr = el.parentNode.parentNode;
                var td = tr.childNodes;
                // 删除空节点
                for (var i = 0; i < td.length; i++) {
                    if (td[i].nodeName.toLowerCase() != "td") {
                        tr.removeChild(td[i]);
                    }
                }
                var patient = {};
                var index = td[0].innerText;
                patient.pt_id = registerList[index - 1].patient.pt_id;
                patient.name = td[2].innerText;
                var registerId = td[1].innerText;
                // 保存到localStorage中
                if (patient != null) {
                    localStorage.setItem("patient", JSON.stringify(patient));
                }
                localStorage.setItem("registerId", JSON.stringify(registerId));
                console.log(patient);
                window.location.href = './medicalRecord.html';
            }
            if (el.innerText == '呼叫') {
                var tr = el.parentNode.parentNode;
                var td = tr.childNodes;
                var rf_id = td[1].innerText;

                function registerCall() {
                    $.ajax({
                        type: "post",
                        async: false,
                        url: "http://134.175.21.162:8080/medicalSystem/doctor/call.do",
                        dataType: "jsonp",
                        jsonp: "callback",
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        data: {
                            rf_id: rf_id
                        },
                        success: function (res) {
                            if (res.status == 'login') {
                                console.log("呼叫成功");
                            }else {
                                alert('请登录！');
                                window.location.href = "../../index.html";
                            }

                        },
                        error: function () {
                            console.log("失败！");
                        }
                    });
                }

                registerCall();

            }
            if (el.innerText == '忽略') {
                var tr = el.parentNode.parentNode;
                var td = tr.childNodes;
                let dt_id;
                if (localStorage.hasOwnProperty('doctor')) {
                    dt_id = JSON.parse(localStorage.getItem('doctor')).dt_id;
                }

                function registerIgnore() {
                    $.ajax({
                        type: "post",
                        async: false,
                        url: "http://134.175.21.162:8080/medicalSystem/doctor/ignore.do",
                        xhrFields: {
                            withCredentials: true
                        },
                        dataType: "jsonp",
                        jsonp: "callback",
                        data: {
                            dt_id: dt_id
                        },
                        success: function () {
                            if (res.status == 'login') {
                                console.log("忽略成功");
                            }else {
                                alert('请登录！');
                                window.location.href = "../../index.html";
                            }
                        },
                        error: function () {
                            console.log("失败！");
                        }
                    });
                }

                registerIgnore();

            }
        })
};
