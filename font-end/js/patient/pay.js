$(function () {
    fillPay();
    window.setTimeout(afterPaid,5000);
});
let getConsumeIndex = function () {
    let url_param = location.search;
    let flag = {};
    if (url_param) {
        if (url_param.indexOf("?") != -1) {
            flag[url_param.substr(1).split('=')[0]] = url_param.substr(1).split('=')[1];
        }
    }
    return flag; //consumeIndex
};
//填充消费单的处方和消费单详情
let fillPay = function () {
    let consume;
    let index = getConsumeIndex().consumeIndex;
    console.log(index);
    if (localStorage.hasOwnProperty('consumeList') && localStorage.consumeList != "undefined") {
        consume = JSON.parse(localStorage.getItem('consumeList'));
    }
    console.log(consume[index]);
    let $spanList = $('span[name="span_consume"]');
    $spanList[0].innerText = consume[index].mr.patient.pt_id;
    $spanList[1].innerText = consume[index].mr.patient.pt_name;
    $spanList[2].innerText = consume[index].mr.doctor.dt_name;
    $spanList[3].innerText = consume[index].co_id;
    $spanList[4].innerText = consume[index].mr.doctor.money;
    $spanList[5].innerText = consume[index].co_price;
    let status;
    if(consume[index].co_status == "unpay")
        status = "未支付";
    else status = "已支付";
    $spanList[6].innerText = status;
    let table = $('#pay_md_table');
    table.html('');
    let thead = `<thead>
         <tr>
            <th>药品编号</th>
            <th>药品名称</th>
            <th>药品用量</th>
            <th>药品单价</th>
         </tr>
    </thead>`;
    let tbody = "<tbody>"
    for(let i=0,md;md =consume[index].mr.prstSet[i++];){
        console.log(md);
        tbody += `<tr>
        <td>${md.medicine.md_id}</td>
        <td>${md.medicine.md_name}</td>
        <td>${md.pr_num}</td>
        <td>${md.medicine.md_price}</td>
        </tr>`;
    }
    tbody += "</tbody>";
    table.append(thead);
    table.append(tbody);
};

let afterPaid = function(){
    $('#pt_pay_success').modal('show');
};
//点击模态框的确认按钮
$('#pay_modal_save').click(function () {
    $('#pt_pay_success').modal('hide');
    window.location.href = "./main.html";
});
//点击去评价
$('#pa_to_comment').click(function () {
    $(this).attr("href","/font-end/html/patient/bookDoctor.html?paid=true&consumeIndex="+getConsumeIndex().consumeIndex);
});