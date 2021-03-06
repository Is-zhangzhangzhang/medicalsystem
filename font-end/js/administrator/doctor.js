$(function () {
    /**
     *   ======================@module 医务人员管理=========================
     */
    var addOrEdit = 0;
    // 立即执行请求获得 医生列表
    console.log("执行了执行了！！");
    var clinic_allId=[];
    var dt_list = [];
    var obj = {};
    obj.id = "0101";
    obj.name = "杨别";
    obj.sex = "男";
    obj.dept = "内科";
    obj.clinic = "门诊1";
    obj.tel = "13602799555";
    obj.title = "主任医师";
    obj.introduction = "中医世家杨家继承人，已攻克中医与新时代神经性疾病的天堑";
    obj.money = "30";
    dt_list.push(obj);
    var str = "<td><img src=\"../../img/inithead.jpg\"></td>";
    initTable(str, dt_list, "dt_table");

    /**
     * @module 点击行 编辑医生信息 初始化模态框中的值
     *
     * @property list_index 点击行的下标
     */
    var tr;
    var cl_id=null;
    $('#dt_table').on('click', 'tr', function () {
        addOrEdit = 1;
        tr = $(this);
        td=tr.children();
        $('#dt_modal').modal('show');
        $('#dt_id').attr('disabled', true);  //设置id不可编辑
        //assignToModalText(dt_list, tr.index(), "dt_text");
        
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
            data: {
            },
            success: function (res) {
                console.log(res);
                if (res.status == 'login') {
                    res = res.partArray;
                    for (var i in res) {
                        if (res[i].cl_dept == td[4].innerHTML && res[i].cl_part == td[5].innerHTML) {
                            console.log("Had Find the id");
                            cl_id = res[i].cl_id;
                            console.log(cl_id);
                            break;
                        }
                    }
                    //cl_id=res[i].cl_id;
                    console.log(cl_id);
                    return cl_id;
                }else {
                    alert('请登录！');
                    window.location.href = "../../index.html";
                }
            },
            error: function () {
                console.log("提交失败");
            }
        });

        $('#dt_id').val( td[1].innerHTML);
        $('#dt_name').val( td[2].innerHTML);
        $('#dt_sex').val( td[3].innerHTML);
        $('#dt_dept').val( td[4].innerHTML);
        $('#dt_clinic').val( td[5].innerHTML);
        $('#dt_tel').val( td[6].innerHTML);
        $('#dt_title').val( td[7].innerHTML);
        $('#dt_introdution').val( td[8].innerHTML);
        $('#dt_money').val( td[9].innerHTML);

    });

    $('#dt_dept').change(function(){
        var p1=$(this).children('option:selected').val();//这就是selected的值
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
            data: {
            },
            success: function (res) {
                if (res.status == 'login') {
                    res = res.partArray;
                    clinic_allId = res;
                    var data_part = "";
                    data_part += '<option value="请选择" selected="selected" disabled="disabled">请选择</option>';
                    for (let i in res) {
                        if (res[i].cl_dept == p1) {
                            data_part += '<option value="' + res[i].cl_part + '">' + res[i].cl_part + '</option>';
                        }
                    }
                    console.log(clinic_allId);
                    selectpart.empty();
                    selectpart.append(data_part);

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

    $('#dt_add_btn').click(function () {
        $('#dt_modal').modal('show');
        addOrEdit = 2;
        $('#dt_id').removeAttr('disabled');  //设置id可编辑
        var text = document.getElementsByName("dt_text");
        for (var i = 0; i < text.length; i++) {
            text[i].value = "";
        }
    });

    //科室选择内容提取
    $(document).ready(function () {
        selectdept = $('#dt_dept');
        selectpart = $('#dt_clinic');
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
            data: {
            },
            success: function (res) {
                if (res.status == 'login') {
                    res = res.clinicArray;
                    var data = "";
                    var clinicdata = [];
                    // arr是每一行的result，包含所有的门诊所有的信息
                    console.log(res);
                    for (let i = 0, arr; arr = res[i++];) {
                        if (!(clinicdata[arr.cl_dept] instanceof Array)) {
                            clinicdata[arr.cl_dept] = [];
                        }
                        let obj = {};
                        obj[arr.cl_part] = arr.cl_id;
                        clinicdata[arr.cl_dept].push(obj);
                    }
                    console.log(clinicdata);
                    data += '<option value="请选择" selected="selected" disabled="disabled">请选择</option>';
                    for (let i in clinicdata) {
                        data += '<option value="' + i + '">' + i + '</option>'
                    }
                    selectdept.append(data);
                    console.log(clinicdata['内科']);
                    console.log(clinicdata['内科'][0]);
                    var data_part = "";
                    data_part += '<option value="请选择" selected="selected" disabled="disabled">请选择</option>';
                    for (let i in res) {
                        if (res[i].cl_dept == '内科') {
                            data_part += '<option value="' + res[i].cl_part + '">' + res[i].cl_part + '</option>';
                        }
                    }
                    selectpart.append(data_part);

                } else {
                    alert('请登录！');
                    window.location.href = "../../index.html";
                }
            },
            error: function () {
                console.log("提交失败");
            }
        });
    });


    $('#dt_save').click(function () {
        var modal = $('#dt_modal');
        // var input = modal.find('input');
        //console.log(input);
        var dt_id =$("#dt_id").val();
        var dt_name =$("#dt_name").val();
        var dt_sex = $('#dt_sex').val();
        var cl_dept = $('#dt_dept').val();
        var cl_part = $('#dt_clinic').val();
        var dt_tel = $('#dt_tel').val();
        var dt_title = $('#dt_title').val();
        var dt_introduction = $('#dt_introdution').val();
        var dt_money = $('#dt_money').val();
        console.log(clinic_allId);
        for(let i in clinic_allId){
            if(clinic_allId[i].cl_dept==cl_dept&&clinic_allId[i].cl_part==cl_part)
            {
                cl_id=clinic_allId[i].cl_id;
            }
        }
        //console.log(dt_id,dt_name,dt_sex, dt_tel,dt_title,dt_introduction, cl_dept, cl_part,cl_id);
        //console.log(cl_id);
        //console.log(dt_id,dt_name,dt_sex, dt_tel,dt_title,dt_introduction, cl_dept, cl_part,cl_id);
        if (addOrEdit == 1) {
            $.ajax({
                type: "post",
                async: false,
                url: "http://134.175.21.162:8080/medicalSystem/admin/updateDoctor.do",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    dt_id: encodeURI(dt_id),
                    dt_name: encodeURI(dt_name),
                    dt_sex: encodeURI(dt_sex),
                    dt_tel: encodeURI(dt_tel),
                    dt_title: encodeURI(dt_title),
                    introduction: encodeURI(dt_introduction),
                    money: encodeURI(dt_money),
                    cl_id: encodeURI(cl_id)
                },
                success: function (res) {
                    if (res.status == 'login') {
                        if (res.result == '1') {
                            tr = document.getElementsByTagName('tr');
                            var i = 1;
                            for (; i < tr.length; i++) {
                                if (tr[i].getElementsByTagName('td')[1].innerText == encodeURI(dt_id)) {
                                    break;
                                }
                            }
                            td = tr[i].getElementsByTagName('td');
                            td[1].innerHTML = dt_id;
                            td[2].innerHTML = dt_name;
                            td[3].innerHTML = dt_sex;
                            td[4].innerHTML = cl_dept;
                            td[5].innerHTML = cl_part;
                            td[6].innerHTML = dt_tel;
                            td[7].innerHTML = dt_title;
                            td[8].innerHTML = dt_introduction;
                            td[9].innerHTML = dt_money;
                            console.log('修改成功');
                        }
                        else {
                            console.log('修改失败');
                        }
                    }else {
                        alert('请登录！');
                        window.location.href = "../../index.html";
                    }
                },
                error: function () {
                    console.log("提交失败");
                }
            });

        }
        else {   
            console.log(dt_id,dt_name,dt_sex, dt_tel,dt_title,dt_introduction, cl_dept, cl_part,cl_id);
            // TODO insert 到数据库，如果提交成功执行下面
            $.ajax({
                type: "post",
                async: false,
                url: "http://134.175.21.162:8080/medicalSystem/admin/submitDoctor.do",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    dt_id: encodeURI(dt_id),
                    dt_name: encodeURI(dt_name),
                    dt_sex: encodeURI(dt_sex),
                    dt_tel: encodeURI(dt_tel),
                    dt_title: encodeURI(dt_title),
                    introduction: encodeURI(dt_introduction),
                    money: encodeURI(dt_money),
                    cl_id: encodeURI(cl_id)
                },
                success: function (res) {
                console.log(dt_id,dt_name,dt_sex, dt_tel,dt_title,dt_introduction, cl_dept, cl_part,cl_id);
                   if(res.result == '1'){
                    var table = $('#dt_table table tbody');
                    var input_i = 0;
                    var data = "";
                    data+="<td>"+"<img src='inithead.jpg'>"+"</td>";
                    data+="<td>"+dt_id+"</td>";
                    data+="<td>"+dt_name+"</td>";
                    data+="<td>"+dt_sex+"</td>";
                    data+="<td>"+cl_dept+"</td>";
                    data+="<td>"+cl_part+"</td>";
                    data+="<td>"+dt_tel+"</td>";
                    data+="<td>"+dt_title+"</td>";
                    data+="<td>"+dt_introduction+"</td>";
                    data+="<td>"+dt_money+"</td>";
                    table.append("<tr>" + data + "</tr>");
                    console.log('添加成功');
                   }
                   else{
                       console.log('添加失败');
                   }
                },
                error: function () {
                    console.log("insert提交失败");
                }
            });

        }
         $('#dt_modal').modal('hide');
         addOrEdit = 0;
    });

    showPage(1);
});


function showPage(page) {
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/admin/allDoctor.do",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            page: encodeURI(page)
        },
        success: function (res) {
            //var endData = res;
            console.log(page, res);
            if (res.status == 'login') {
                var table = $('#dt_table');
                var input_i = 0;
                var data = "";
                var eachPageNum = 10;//每页显示个数
                var pageNum = Math.ceil(res.resultNum / eachPageNum);
                var mds = res.doctorArray;
                console.log(mds);
                //每页添加信息
                data += "<table class='table table-hover table-striped text-center'>" + "<thead><th>医生头像</th><th>编号</th><th>姓名</th><th>性别</th>"
                    + "<th>科室</th><th>门诊</th><th>联系方式</th><th>职称</th><th>简介</th><th>诊金</th></thead>"
                    + "<tbody>";
                for (var i = 0; i < mds.length; i++) {
                    var dt = mds[i];
                    //给select的对应td赋值
                    data += "<tr>"
                    data += "<td>" + "<img src='" + dt.dt_image + "'/>" + "</td>"
                    data += "<td>" + dt.dt_id + "</td>"
                    data += "<td>" + dt.dt_name + "</td>"
                    data += "<td>" + dt.dt_sex + "</td>"
                    data += "<td>" + dt.clinic.cl_dept + "</td>"
                    data += "<td>" + dt.clinic.cl_part + "</td>"
                    data += "<td>" + dt.dt_tel + "</td>"
                    data += "<td>" + dt.dt_title + "</td>"
                    data += "<td>" + dt.introduction + "</td>"
                    data += "<td>" + dt.money + "</td>"
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
            }else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        }
    });

};