$(function () {
    if (localStorage.hasOwnProperty('user_id')) {
        let initName = localStorage.getItem('user_id');
        $('#lo-username').val(initName);
    }
    /**
     *========== @module 登录正则验证 ===========
     */
    let reg_symb = /^[a-zA-Z0-9]{1,20}/g;
    let _lo_user_check = false;
    let _lo_pwd_check = false;
    if ($('#lo-username').val() != "") {
        if (reg_symb.test($('#lo-username').val())) {
            _lo_user_check = true;
        }
    }
    let loUserNameReg = function () {
        _lo_user_check = false;
        let name = $(this).val();
        let reg = /^[a-z0-9A-Z]{1,20}/g;
        let span = $($(this).next().find('span').get(0));
        if (name != "") {
            if (name.length > 20) {
                span.text('用户名长度不大于20');
            }
            else if (!reg.test(name)) {
                span.text('用户名不能含有非数字和非字母');
            }
            else {
                span.text('');
                _lo_user_check = true;
                loginCheck();
            }
        }
        else {
            span.text('输入不能为空');
        }
    };
    let loPasswordReg = function () {
        _lo_pwd_check = false;
        let pwd = $(this).val();
        let span = $($(this).next().find('span').get(0));
        if (pwd != "") {
            if (pwd.length > 20) {
                span.text('密码长度不能多于20位');
            }
            else {
                span.text("");
                _lo_pwd_check = true;
                loginCheck();
            }
        }
        else {
            span.text('输入不能为空');
        }
    };
    //全部验证通过点亮button
    let loginCheck = function () {
        let _btn = $('#login-button');
        if (_lo_user_check && _lo_pwd_check) {
            _btn.removeAttr('disabled');
        }
        else {
            _btn.attr('disabled', true);
        }
    }
    let jumpUserIndex = function (level,uid) {
        setTimeout(function () {
            // TODO 获得登录用户名和密码后判断身份进行页面跳转
            // ajax
            if (level == "0") //管理员
            {
                //TODO 跳转管理员
                window.location.href = "/font-end/html/administrator/medicine.html";
            }
            else if (level == "1")  //医生
            {
                // window.location.href = "/font-end/html/doctor/main.html";
                window.location.href = "./html/doctor/main.html";
            }
            else if (level == "2")  //患者
            {
                loadPatient(uid);
                window.location.href = "/font-end/html/patient/main.html";
            }
        else
            alert("系统出错！");
        }, 1000);
    };
    //点击登录 ajax请求
    let loClick = function (event) {
        event.preventDefault();
        let uid = $('#lo-username').val();
        let pwd = $('#lo-password').val();
        // TODO 账号密码验证
        $.ajax({
            url: 'http://134.175.21.162:8080/medicalSystem/user/login.do',
            type: 'POST',
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                user_id: uid,
                user_password: pwd
            }
        })
            .done(function (result) {
                // let data = JSON.parse(result);
                console.log(result);
                if (result.result >= 0) {
                    $('.lo-form').fadeOut(500);
                    $('.wrapper').addClass('form-success'); //输入框消失
                    localStorage.setItem('user_id', uid);  //把用户id保存到localStorage
                    jumpUserIndex(result.result, uid);
                }
                else {
                    $('#lo_fail_span').fadeIn();  //用户名或密码错误
                }

            })
            .fail(function () {
                alert("请求失败！");
            })
            .always(function () {
                $('#login-button img').hide();
            })
    };
    $("input[id='lo-username']").on('input', loUserNameReg);  //登录：用户名输入
    $("input[id='lo-password']").on('input', loPasswordReg);  //登录：密码输入
    $('#login-button').click(loClick);  //登录：点击登录按钮


    /**
     * ==============@module 注册！！！ ================
     */
    if ($('#re-born')) {
        $('#re-born').datetimepicker({
            format: 'yyyy-mm-dd',
            minView: "month",
            autoclose: 1
        });
    }
    //注册正则
    // let _re_name_check = false;
    let _re_pwd_check = false;
    let _re_spwd_check = false;
    let _re_rname_check = false;
    let _re_credit_check = false;
    let _re_tel_check = false;
    // let reUsernameReg = function () {
    //     console.log('hhhhhhh');
    //     _re_name_check = false;
    //     let name = $(this).val();
    //     let reg = /^[0-9]{1,20}/g;
    //     let span = $($(this).parent().next().find('span').get(0));
    //     if(name != ""){
    //         if(name.length > 20){
    //             span.text('用户名太长！');
    //         }
    //         else if(!reg.test(name)){
    //             span.text('用户名不能含有非数字！');
    //         }
    //         else{
    //             span.text("");
    //             _re_name_check = true;
    //             checkRegister();
    //         }
    //     }
    //     else{
    //         span.text('用户名不能为空！');
    //     }
    // };
    let rePasswordReg = function () {
        _re_pwd_check = false;
        let pwd = $(this).val();
        let span = $($(this).parent().next().find('span').get(0));
        if (pwd != "") {
            if (pwd.length > 20) {
                span.text('密码长度不能多于20位！');
            }
            else if (reg_symb.test(pwd)) {
                span.text('密码不能含有非英文和数字字符！');
            }
            else {
                span.text("");
                _re_pwd_check = true;
                checkRegister()
            }
        }
        else {
            span.text('输入不能为空！');
        }
    };
    let reSpasswordReg = function () {
        _re_spwd_check = false;
        let pwd = $('#re-password').val();
        let spwd = $(this).val();
        let span = $($(this).parent().next().find('span').get(0));
        if (spwd != "") {
            if (pwd != spwd) {
                span.text('两次密码输入不一致！');
            }
            else {
                span.text("");
                _re_spwd_check = true;
                checkRegister()
            }
        }
        else {
            span.text('输入不能为空！');
        }
    };
    let reRealnameReg = function () {
        _re_rname_check = false;
        let span = $($(this).parent().next().find('span').get(0));
        let rname = $(this).val();
        if (rname != "") {
            if (rname.length < 2) {
                span.text('太短！');
            }
            else if (rname.length > 20) {
                span.text('输入不能大于20字符！');
            }
            else {
                span.text("");
                _re_rname_check = true;
                checkRegister()
            }
        }
        else {
            span.text('输入不能为空！');
        }
    };
    let reCreditCardReg = function () {
        _re_credit_check = false;
        let credit = $(this).val();
        let span = $($(this).parent().next().find('span').get(0));
        let reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
        if (credit != "") {
            if (!reg.test(credit)) {
                span.text('身份证号不存在！');
            }
            else {
                span.text('');
                _re_credit_check = true;
                checkRegister();
            }
        } else {
            span.text('输入不能为空！');
        }

    };
    let reTelReg = function () {
        _re_tel_check = false;
        let tel = $(this).val();
        let reg = /^1[3|4|5|8][0-9]\d{8}$/;
        let span = $($(this).parent().next().find('span').get(0));
        if (tel != "") {
            if (!reg.test(tel)) {
                span.text('手机号不符合格式！');
            }
            else {
                span.text("");
                _re_tel_check = true;
                checkRegister();
            }
        } else {
            span.text('输入不能为空！');
        }
    };
    let checkRegister = function () {
        let btn = $('#re-button');
        if (_re_pwd_check && _re_spwd_check && _re_rname_check && _re_credit_check && _re_tel_check) {
            btn.removeAttr('disabled');
        }
        else {
            btn.attr('disabled', true);
        }
    };
    // $("input[id='re-username']").on('input',reUsernameReg);
    $("input[id='re-password']").on('input', rePasswordReg);
    $("input[id='re-spassword']").on('input', reSpasswordReg);
    $("input[id='re-realname']").on('input', reRealnameReg);
    $("input[id='re-creditCard']").on('input', reCreditCardReg);
    $("input[id='re-tel']").on('input', reTelReg);

    let toRegisterClick = function (event) {
        $('.lo-form').fadeOut(100);
        $('.re-form').fadeIn();
        $.ajax({
            url: 'http://134.175.21.162:8080/medicalSystem/user/register.do',
            type: 'POST',
            dataType: 'jsonp',
            jsonp: 'callback'
        })
            .done(function (result) {
                // let data = JSON.parse(result);
                console.log(result);
                $('#re-username').val(result.result);
            })
            .fail(function () {
                alert("请求失败！");
            })
    };
    let submitRegister = function () {
        $.ajax({
            url: 'http://134.175.21.162:8080/medicalSystem/user/registerSubmit.do',
            type: 'POST',
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                user_id: $('#re-username').val(),
                pt_id: $('#re-username').val(),
                user_password: $('#re-password').val(),
                pt_name: $('#re-realname').val(),
                pt_sex: '男',
                born: $('#re-born').val(),
                IDCardNumber: $('#re-creditCard').val(),
                pt_tel: $('#re-tel').val()
            }
        })
            .done(function (result) {
                console.log(result);
                if (result.result == 1) {
                    alert("注册成功！");
                    localStorage.setItem('user_id', $('#re-username').val());
                    window.location.href = "/font-end/index.html";
                } else if (result.result == 2) {
                    alert("身份证不唯一！");
                }
                else {
                    alert('注册失败');
                }
            })
            .fail(function () {
                alert("请求失败！");
            })
    };
    $('#to-register').click(toRegisterClick);
    //点击注册
    $('#re-button').click(submitRegister);
});


