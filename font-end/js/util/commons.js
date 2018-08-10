/**
 * @module 个人资料页面 上传图片 图片预览
 * @description doctor and patient的上传图片预览功能
 */
$('#upload-file').change(function () {
    var file = this.files[0];
    console.log('上传图片预览');
    // console.log(this.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        $('#head-img').css("background-image", 'url('+this.result+')');
    }
});

/**
 * @description 分页的绘制
 * @param pages 总页数
 * @param nowPage 当前显示页
 * @returns {string} 分页的html代码
 */
let drawPagination = function(ul,pages,nowPage){
    let li = "<li><span aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></span>\n</li>";  //上一页 <<
        for(let i=1; i<=pages; i++)
        {
            if(i == nowPage){   //如果是当前页需要加上active
                li += "<li class='active'><span>"+i+"</span></li>";
            }
            else
                li += "<li><span>"+i+"</span></li>";
        }
    li += "<li><span aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;</span></span></li>";  //下一页 >>
    ul.append(li);
    setPageDisable(ul,pages,nowPage);
};

let setPageDisable = function (ul,pages,nowPage) {
    let liNode = ul.find('li');
    // console.log(pages);
    if(pages == 1) //总页数只有1 << >>都要禁用
    {
        // console.log("总页数只有1！！");
        liNode.first().addClass('disabled');
        liNode.last().addClass('disabled');
    }else{
        liNode.first().removeClass('disabled');
        liNode.last().removeClass('disabled');
    }
    if(nowPage == 1){ //当前页为第一页
        // console.log("当前页为第一页");
        liNode.first().addClass('disabled');
    }else {
        liNode.first().removeClass('disabled');
    }
    if(nowPage == pages ){ //当前页为最后一页
        // console.log("当前页为最后一页");
        liNode.last().addClass('disabled');
    }else{
        liNode.last().removeClass('disabled');
    }
};
//分页获得下一页,返回下一页页码
let getNextPage = function (ul,pages){
    let nowPage = ul.find('.active');
    let nextPage = parseInt(nowPage.text()) +1;
    setPageDisable(ul,pages,nextPage);
    nowPage.removeClass('active');
    nowPage.next().addClass('active');
    return nextPage;
};
//分页获得上一页，返回上一页页码
let getPrePage = function (ul,pages) {
    let nowPage = ul.find('.active');
    let prevPage = parseInt(nowPage.text()) - 1;
    setPageDisable(ul,pages,prevPage);
    nowPage.removeClass('active');
    nowPage.prev().addClass('active');
    return prevPage;
};
//点击某一页
/**
 *
 * @param ul
 * @param pages 总页数
 * @param page 要切换的页数
 */
let clickAnyPage = function (ul,pages,toPage) {
    let nowPage = ul.find('.active');
    nowPage.removeClass('active');
    $(ul.find('li').get(toPage)).addClass('active');
};
