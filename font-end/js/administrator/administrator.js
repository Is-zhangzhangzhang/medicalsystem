$(function () {
    /**
     * @module 药品管理
     * @param addOrEdit 全局变量，编辑或者是添加的标兵 {1：编辑；2：添加}
     * @param tr 点击表格的行
     */
    var addOrEdit = 0;
    var tr = null;
    /**
     * @description 点击编辑修改药品信息
     * @param td 点击行的所有单元格
     * @param modal 编辑列表元素的弹框
     * @param input 弹框中的所有input输入框 长度：4
     * @param input_i 遍历input的下标
     */
    $('#md_table tr').click(function () {
        addOrEdit = 1;
        tr = $(this);
        var td = tr.children();
        var modal = $('#md_modal');
        $('.modal-title').text("编辑药品信息");
        var input = modal.find('input');
        // 弹出模态框
        modal.modal('show');
        var input_i = 0;
        for(var i=0; i<td.length; i++){
            var value = td[i].innerHTML;
            if(i == 2){   //给select框赋值
                $('#md_is_prescription').val(value);
            }
            else if(i == 5){  //给textarea赋值
                $('#md_detail').val(value);
            }
            else{   //给4个input赋值
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
        var input = modal.find('input');
        // 清空模态框中所有文本框的值
        for(var index of input)
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
        if(addOrEdit == 1){  //修改药品信息
            // TODO 把修改的值update给数据库，如果提交成功执行下面
            var td = tr.children();
            var input_i = 0;
            for(var i=0; i<td.length; i++){
                if(i == 2){   //给select的对应td赋值
                    td[i].innerHTML = md_property
                }
                else if(i == 5){  //给textarea赋值
                    td[i].innerHTML = md_detail;
                }
                else{   //给4个input对应的td赋值
                    td[i].innerHTML = input[input_i].value;
                    input_i++;
                }
            }
        }
        else if(addOrEdit == 2) {
            // TODO insert 到数据库，如果提交成功执行下面
            console.log("addd");
            var table = $('#md_table');
            var input_i = 0;
            var data = "";
            for(var i=0; i<6; i++){
                if(i == 2){   //给select的对应td赋值
                    // td[2].innerHTML = md_property
                    data += "<td>"+md_property+"</td>"
                }
                else if(i == 5){  //给textarea赋值
                    data += "<td>"+md_detail+"</td>"
                }
                else{   //给4个input对应的td赋值
                    data += "<td>"+input[input_i].value +"</td>"
                    input_i++;
                }
            }
            table.append("<tr>"+data+"</tr>");
        }
        // 关闭模态框
        addOrEdit = 0;
        tr = null;
        modal.modal('hide');
    });
});