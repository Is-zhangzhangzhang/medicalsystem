let _deptIndex = 0;
// hover显示门诊的数据
$('.choose_dept>a').mouseover(function () {
    _deptIndex = $(this).index();
});
let _clinicList = [
    ['呼吸内科门诊','血液内科门诊','风湿免疫门诊','心血管内科门诊','内分泌科门诊','糖尿病教育门诊','消化内科门诊'],
    ['胃肠外科门诊','甲乳外科门诊','关节外科创伤骨科门诊','骨外科门诊','心胸外科门诊','泌尿外科门诊','神经外科门诊','整形烧伤科门诊'],
    ['神经内科门诊'],
    ['妇科门诊','产科门诊'],
    ['儿科门诊'],
    ['中医科门诊'],
    ['咽喉头颈科门诊','鼻科门诊','耳科门诊','耳鼻喉科门诊'],
    ['口腔科门诊'],
    ['皮肤性病科门诊'],
    ['精神（心理）科门诊']
];
function clinic_card_content() {
    // TODO 从后台获取门诊
    let data = "";
    console.log(_deptIndex);
    for(let i in _clinicList[_deptIndex])
    {
        data += "<a href='javascript:void(0)'>"+_clinicList[_deptIndex][i]+"</a>";
    }
    return data;
}
//hover科室显示门诊
$("[data-toggle='popover']").popover({
    html: true,
    content: function () {
        return clinic_card_content();
    }
});

// 轮播
$('.carousel').carousel({
    interval: 3000
});