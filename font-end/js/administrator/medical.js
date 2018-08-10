$(function () {
    /**
     * @module 药品管理
     * @param addOrEdit 全局变量，编辑或者是添加的标兵 {1：编辑；2：添加}
     * @param tr 点击表格的行
     */
    var addOrEdit = 0;
    tr = null;
    /**
     * @description 点击编辑修改药品信息
     * @param td 点击行的所有单元格
     * @param modal 编辑列表元素的弹框
     * @param input 弹框中的所有input输入框 长度：4
     * @param input_i 遍历input的下标
     */
    $('#md_table').on('click','tr',function () {
        addOrEdit = 1;
        tr = $(this);
        var td = tr.children();
        var modal = $('#md_modal');
        $('.modal-title').text("编辑药品信息");
        var input = modal.find('input');
        // 弹出模态框
        modal.modal('show');
        $('#md_id').attr('disabled', true);  //不能修改药品编号
        var input_i = 0;
        for (var i = 0; i < td.length; i++) {
            var value = td[i].innerHTML;
            if (i == 2) {   //给select框赋值
                $('#md_is_prescription').val(value);
            }
            else if (i == 5) {  //给textarea赋值
                $('#md_detail').val(value);
            }
            else {   //给4个input赋值
                // console.log(value);
                input[input_i].value = value;
                input_i++;
            }
        }
    });

    /**
     * @description 添加药品 点击按钮弹出添加药品模态框
     */
    $('#md_add_btn').click(function () {
        addOrEdit = 2;
        var modal = $('#md_modal');
        $('.modal-title').text("添加药品");
        modal.modal('show');
        $('#md_id').removeAttr('disabled');  // 添加药品：移除id不能编辑属性
        var input = modal.find('input');
        // 清空模态框中所有文本框的值
        for (var index of input)
            index.value = "";
        $('#md_is_prescription').val("");
        $('#md_detail').val("Rx");
    });

    /**
     * @description 添加/编辑药品模态框  点击保存 为了实现动态显示对表格的添加和修改
     * @param md_property 药品性质
     * @param md_detail 药品详情
     */
    $('#md_save').click(function () {
        var modal = $('#md_modal');
        var input = modal.find('input');
        var md_property = $('#md_is_prescription').val();
        var md_detail = $('#md_detail').val();
        //更新到数据库
        if(addOrEdit==1)
        {
            $.ajax({
                type: "post",
                async: false,
                url: "http://134.175.21.162:8080/medicalSystem/admin/updateMedicine.do",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    md_id: encodeURI(input[0].value),
                    md_name: encodeURI(input[1].value),
                    md_is_prescription: encodeURI(md_property),
                    md_price: encodeURI(input[2].value),
                    md_inventor: encodeURI(input[3].value),
                    md_details: encodeURI(md_detail)
                },
                success: function (res) {
                    // TODO 把修改的值update给数据库，如果提交成功执行下面
                    if (res.status == 'login') {
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
                            td[2].innerHTML = md_property;
                            td[3].innerHTML = input[2].value;
                            td[4].innerHTML = input[3].value;
                            td[5].innerHTML = md_detail;
                            console.log('修改成功');
                        }
                        else {
                            console.log('修改失败');
                        }
                    }
                },
                error: function () {
                    console.log("提交失败");
                }
            });
        }        
        
        else if (addOrEdit == 2) {
            // TODO insert 到数据库，如果提交成功执行下面
            $.ajax({
                type: "post",
                async: false,
                url: "http://134.175.21.162:8080/medicalSystem/admin/submitMedicine.do",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    md_id: encodeURI(input[0].value),
                    md_name: encodeURI(input[1].value),
                    md_is_prescription: encodeURI(md_property),
                    md_price: encodeURI(input[2].value),
                    md_inventor: encodeURI(input[3].value),
                    md_details: encodeURI(md_detail)
                },
                success: function (res) {
                    // TODO 把修改的值update给数据库，如果提交成功执行下面
                    if (res.status == 'login') {
                        if (res.result == '1') {
                            var table = $('#md_table table tbody');
                            var input_i = 0;
                            var data = "";
                            for (var i = 0; i < 6; i++) {
                                if (i == 2) {   //给select的对应td赋值
                                    // td[2].innerHTML = md_property
                                    data += "<td>" + md_property + "</td>"
                                }
                                else if (i == 5) {  //给textarea赋值
                                    data += "<td>" + md_detail + "</td>"
                                }
                                else {   //给4个input对应的td赋值
                                    data += "<td>" + input[input_i].value + "</td>"
                                    input_i++;
                                }
                            }
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
                    console.log("提交失败");
                }
            });
        }
        // 关闭模态框
        addOrEdit = 0;
        tr = null;
        modal.modal('hide');
    });

    showPage(1);

});


function showPage(page) {
    $.ajax({
        type: "post",
        async: false,
        url: "http://134.175.21.162:8080/medicalSystem/admin/allMedicine.do",
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
                var table = $('#md_table');
                var input_i = 0;
                var data = "";
                var eachPageNum = 10;//每页显示个数
                var pageNum = Math.ceil(res.resultNum / eachPageNum);
                var mds = res.medicineArray;
                console.log(mds);
                //每页添加信息
                data += "<table class='table table-hover table-striped'>" + "<thead><th>药品编号</th><th>药品名称</th><th>药品性质</th><th>药品单价</th><th>药品库存</th><th>药品详情</th></thead>" +
                    "<tbody>";
                for (var i = 0; i < mds.length; i++) {
                    var md = mds[i];
                    //console.log(mds[i],md);
                    //给select的对应td赋值
                    data += "<tr>"
                    data += "<td>" + md.md_id + "</td>"
                    data += "<td>" + md.md_name + "</td>"
                    data += "<td>" + md.md_is_prescription + "</td>"
                    data += "<td>" + md.md_price + "</td>"
                    data += "<td>" + md.md_inventor + "</td>"
                    data += "<td>" + md.md_details + "</td>"
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