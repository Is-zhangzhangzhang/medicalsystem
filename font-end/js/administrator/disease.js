$(function () {
    var addOrEdit = 0;
    var clinic_allId = [];
    // 立即执行请求获得 医生列表
    var ds_list = [];
    var obj = {};
    obj.id = "1";
    obj.name = "风寒感冒";
    obj.symptom = "浑身酸痛、鼻塞流涕、咳嗽有痰";
    obj.treat = "中成药可选用感冒清热冲剂、" +
        "正柴胡饮冲剂、感冒软胶囊、川芎茶调散、通宣理肺丸等等。" +
        "服药后可喝些热粥或热汤，微微出汗，以助药力驱散风寒";
    obj.clinic = "内科呼吸门诊"
    ds_list.push(obj);
    initTable("", ds_list, "ds_table");

    var tr;
    /**
     * @module 点击行 编辑疾病信息 初始化模态框中的值
     *
     * @property list_index 点击行的下标
     */
    $('#ds_table').on('click', 'tr', function () {
        addOrEdit = 1;
        tr = $(this);
        $('#ds_modal').modal('show');
        $('#ds_id').attr('disabled', true);
        //assignToModalText(ds_list,tr.index(), "ds_text");

        selectpart = $('#ds_clinic');
        td = tr.children();
        $.ajax({
            type: "post",
            async: false,
            url: "http://134.175.21.162:8080/medicalSystem/admin/clinic.do",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "jsonp",
            jsonp: "callback",
            data: {},
            success: function (res) {
                if (res.status == 'login') {
                    res = res.clinicArray;
                    clinic_allId = res;
                    var data = "";
                    //var clinicdata=[];
                    data += '<option value="请选择" selected="selected" disabled="disabled">' + td[4].innerHTML + '</option>';
                    for (let i in res) {
                        data += '<option value="' + res[i].cl_dept + res[i].cl_part + '">' + res[i].cl_dept + ":" + res[i].cl_part + '</option>'
                    }
                    selectpart.empty();
                    selectpart.append(data);
                }else {
                    alert('请登录！');
                    window.location.href = "../../index.html";
                }
            },
            error: function () {
                console.log("提交失败");
            }
        });

        $('#ds_id').val(td[0].innerHTML);
        $('#ds_name').val(td[1].innerHTML);
        $('#ds_symptom').val(td[2].innerHTML);
        $('#ds_treat').val(td[3].innerHTML);
        $('#ds_clinic').val(td[4].innerHTML);
    });

    // 点击添加疾病
    $('#ds_add_btn').click(function () {
        $('#ds_modal').modal('show');
        addOrEdit = 2;
        $('#ds_id').removeAttr('disabled');
        modalToNull('ds_text');
    });

    $('#ds_save').click(function () {
        var modal = $('#ds_modal');
        var input = modal.find('input');
        var textarea = modal.find('textarea');
        var cl_id = null;
        var ds_clinic = $('#ds_clinic').val();
        console.log(clinic_allId);
        for (let i in clinic_allId) {
            // console.log(ds_clinic);
            // console.log(clinic_allId[i].cl_dept + clinic_allId[i].cl_part);
            if (clinic_allId[i].cl_dept + clinic_allId[i].cl_part == ds_clinic) {
                cl_id = clinic_allId[i].cl_id;
                console.log("Yes");
            }
        }
        if (addOrEdit == 1) {
            //console.log(input,textarea);
            //console.log(cl_id);
            $.ajax({
                type: "post",
                async: false,
                url: "http://134.175.21.162:8080/medicalSystem/admin/updateIllness.do",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    ill_id: encodeURI(input[0].value),
                    ill_name: encodeURI(input[1].value),
                    ill_symptom: encodeURI(textarea[0].value),
                    ill_treatment: encodeURI(textarea[1].value),
                    cl_id: encodeURI(cl_id),
                },
                success: function (res) {
                    if (res.result == '1') {
                        tr = document.getElementsByTagName('tr');
                        var i = 1;
                        for (; i < tr.length; i++) {
                            if (tr[i].getElementsByTagName('td')[0].innerText == encodeURI(input[0].value)) {
                                break;
                            }
                        }
                        td = tr[i].getElementsByTagName('td');
                        td[0].innerHTML = input[0].value;
                        td[1].innerHTML = input[1].value;
                        td[2].innerHTML = textarea[0].value;
                        td[3].innerHTML = textarea[1].value;
                        td[4].innerHTML = ds_clinic;
                        console.log('修改成功');
                    }
                    else {
                        console.log('修改失败');
                    }
                },
                error: function () {
                    console.log("提交失败");
                }
            });

        }
        else {
            //console.log(dt_id,dt_name,dt_sex, dt_tel,dt_title,dt_introduction, cl_dept, cl_part,cl_id);
            // TODO insert 到数据库，如果提交成功执行下面
            $.ajax({
                type: "post",
                async: false,
                url: "http://134.175.21.162:8080/medicalSystem/admin/submitIllness.do",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    ill_id: encodeURI(input[0].value),
                    ill_name: encodeURI(input[1].value),
                    ill_symptom: encodeURI(textarea[0].value),
                    ill_treatment: encodeURI(textarea[1].value),
                    cl_id: encodeURI(cl_id),
                },
                success: function (res) {
                    if (res.status == 'login') {
                        if (res.result == '1') {
                            var table = $('#ds_table table tbody');
                            var input_i = 0;
                            var data = "";
                            data += "<td>" + input[0].value + "</td>";
                            data += "<td>" + input[1].value + "</td>";
                            data += "<td>" + textarea[0].value + "</td>";
                            data += "<td>" + textarea[1].value + "</td>";
                            data += "<td>" + ds_clinic + "</td>";
                            table.append("<tr>" + data + "</tr>");
                            console.log('添加成功');
                        }
                        else {
                            console.log('添加失败');
                        }
                    }else {
                        alert('请登录！');
                        window.location.href = "../../index.html";
                    }
                },
                error: function () {
                    console.log("insert提交失败");
                }
            });

        }
        $('#ds_modal').modal('hide');
        addOrEdit = 0;
    });

    $(document).ready(function () {
        selectpart = $('#ds_clinic');
        $.ajax({
            type: "post",
            async: false,
            url: "http://134.175.21.162:8080/medicalSystem/admin/clinic.do",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "jsonp",
            jsonp: "callback",
            data: {},
            success: function (res) {
                if (res.status == 'login') {
                    res = res.clinicArray;
                    clinic_allId = res;
                    var data = "";
                    //var clinicdata=[];
                    data += '<option value="请选择" selected="selected" disabled="disabled">请选择</option>';
                    for (let i in res) {
                        data += '<option value="' + res[i].cl_dept + res[i].cl_part + '">' + res[i].cl_dept + ":" + res[i].cl_part + '</option>'
                    }
                    selectpart.empty();
                    selectpart.append(data);
                }else {
                    alert('请登录！');
                    window.location.href = "../../index.html";
                }
            },
            error: function () {
                console.log("提交失败");
            }
        });
    });


    showPage(1);
});

function showPage(page) {
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/admin/allIllness.do",
        dataType: "jsonp",
        jsonp: "callback",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: {
            page: encodeURI(page)
        },
        success: function (res) {
            //var endData = res;
            console.log(page, res);
            if (res.status == 'login') {
                var table = $('#ds_table');
                var input_i = 0;
                var data = "";
                var eachPageNum = 10;//每页显示个数
                var pageNum = Math.ceil(res.resultNum / eachPageNum);
                var mds = res.illnessArray;
                console.log(mds);
                //每页添加信息
                data += "<table class='table table-hover table-striped'>" + "<thead><th>疾病编号</th><th>疾病名称</th><th>疾病症状</th><th>疾病治疗</th><th>建议门诊</th></thead>" +
                    "<tbody>";
                for (var i = 0; i < mds.length; i++) {
                    var md = mds[i];
                    //console.log(mds[i],md);
                    //给select的对应td赋值
                    data += "<tr>"
                    data += "<td>" + md.ill_id + "</td>"
                    data += "<td>" + md.ill_name + "</td>"
                    data += "<td>" + md.ill_symptom + "</td>"
                    data += "<td>" + md.ill_treatment + "</td>"
                    data += "<td>" + md.clinic.cl_dept + md.clinic.cl_part + "</td>"
                    data += "</tr>"
                }

                data += '</tbody></table>';
                data += '<div class="text-right"><nav aria-label="Page navigation"><div class="pagination">'
                    + '<ul class="pagination" id="page">';
                //判断前面是否还有页面
                if (page == 1) {
                    data += '<li class="am-disabled"><a href="#">«</a></li>';
                } else {
                    data += '<li><a href="javascript:showPage(' + (page - 1) + ')">«</a></li>';
                }
                for (var i = 1; i <= pageNum; i++) {
                    if (i == page) {
                        data += '<li class="am-active"><a href="javascript:showPage(' + i + ')">' + i + '</a></li>';
                    } else {
                        data += '<li><a href="javascript:showPage(' + i + ')">' + i + '</a></li>';
                    }
                }
                //判断后面是否还有页面
                if (page == pageNum) {
                    data += '<li class="am-disabled"><a href="#">»</a></li>';
                } else {
                    data += '<li><a href="javascript:showPage(' + (page + 1) + ')">»</a></li>';
                }
                data += '</ul>' + '</div>' + '</div>';

                table.empty();
                table.append(data);
            }
            else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        }
    });

};