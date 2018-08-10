/**
 * 对模态框中的表单进行赋值
 * @param data_list 源数据（对象数组）
 * @param list_index 数组下标
 * @param tag_name 模态框表单对象name属性
 *
 * @property modal_text 模态框name=tag_name的元素
 */
function assignToModalText(data_list, list_index, tag_name){
    var modal_text = document.getElementsByName(tag_name);
    var i = 0;
    for(var property in data_list[list_index]){
        modal_text[i].value = data_list[list_index][property];
        i++;
    }
};

/**
 * @description 把在模态框输入的值更新到对应的数组
 * @param tag_name
 * @param data_list
 * @param list_index
 */
function  assignToList(tag_name,data_list,list_index) {
    var source = document.getElementsByName(tag_name);
    var i = 0;
    for(var property in data_list[list_index]){
        data_list[list_index][property] = source[i].value;
        i++;
    }
};

function addToList(tag_name, data_List) {
    var newData = document.getElementsByName(tag_name);
    var newObj = {};
    for(var i=0;i<newData.length;i++)
    {
        newObj[i] = newData[i].value;
    }
    data_List.push(newObj);
};

/**
 * @description 清空模态框的值
 * @param tag_name 模态框的各个输入框
 */
function modalToNull(tag_name) {
    var text = document.getElementsByName(tag_name);
    for(var i=0;i<text.length;i++){
        text[i].value = "";
    }
}

/**
 * @description 修改后动态更新table
 * @param tdList
 * @param data
 */
function updateTable(tdList,data) {
    var i = 0;
    for(var property in data){
        tdList[i].innerHTML = data[property];
        i++;
    }
};

function addTable(addstr,table_id,data) {
    for(var property in data){
        addstr +="<td>"+data[property]+"</td>"
    }
    $('#'+table_id).append("<tr>"+addstr+"</tr>");
};

function initTable(str,data_list,table_id) {
    for(var i=0; i<data_list.length; i++) {
        for(var index in data_list[i]){
            str += "<td>"+data_list[i][index]+"</td>";
        }
        $('#'+table_id).append("<tr>"+str+"</tr>");
    }
}