$(function () {
    var addOrEdit = 0;
    // 立即执行请求获得 医生列表
    var bh_list = [];
    var obj ={};
    obj.id ="123456"
    obj.doctor = "梅毛冰";
    obj.patient = "李四";
    obj.time = "2018-6-30 11:00";
    bh_list.push(obj);
    initTable("",bh_list,"bh_table");
    
    // $('#bh_table tbody').on('click','tr',function () {
        //TODO 把这个病历编号发给后台，跳转到对应的挂号界面
    // });
    showPage(1);
});

function showPage(page) {
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/admin/allRegistration.do",
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
                var table = $('#bh_table');
                var input_i = 0;
                var data = "";
                var eachPageNum = 10;//每页显示个数
                var pageNum = Math.ceil(res.resultNum / eachPageNum);
                var mds = res.rfArray;
                console.log(mds);
                //每页添加信息
                data += "<table class='table table-hover table-striped text-center'>" + "<thead>"
                    + "<th>挂号编号</th><th>医生姓名</th><th>病人姓名</th><th>时间</th></thead>"
                    + "<tbody>";
                for (var i = 0; i < mds.length; i++) {
                    var rf = mds[i];
                    //给select的对应td赋值
                    data += "<tr>"
                    data += "<td>" + rf.rf_id + "</td>"
                    data += "<td>" + rf.doctor.dt_name + "</td>"
                    data += "<td>" + rf.patient.pt_name + "</td>"
                    data += "<td>" + rf.rf_time + "</td>"
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