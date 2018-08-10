var n = 5, // number of layers，Y轴层次
  m = 31, // number of samples per layer，X轴个数
  b = bumpLayer1(m, n + 1);
//console.log(b);
var
  stack = d3.layout.stack(),
  i = 0,
  // layers = stack(d3.range(5).map(function () { return bumpLayer1(m, .1); })),//数据数组
  layers = stack(d3.range(5).map(function () { return bumpLayer(b, i++); })),
  yGroupMax = d3.max(layers, function (layer) { return d3.max(layer, function (d) { return d.y; }); }),//y0即该层起始坐标，y是高度
  yStackMax = d3.max(layers, function (layer) { return d3.max(layer, function (d) { return d.y0 + d.y; }); });
console.log(layers);
//yGroupMax为layer中层次最高的，yStackMax为各sample中最高的，yGroupMax与yStackMax不一定为同一组
var margin = { top: 40, right: 80, bottom: 20, left: 0 },
  padding={top: 0, right: -20, bottom: 0, left: 0 },
  width = 700 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;
var a = [] = d3.range(m);
for (var i = 0; i < m; i++) a[i]++;
//console.log(a);
var alldate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,"总"];
var x = d3.scale.ordinal()//建立一个新的空序数比例尺
  //.domain(d3.range(m))//range(m)获取或指定当前比例尺对象的输出范围为m,domain()获取或指定当前比例尺对象的输入域。
  .domain(d3.range(m))
  //.rangeRoundBands([0, width], .08);//定义条形间距，保证每个区间的起点都是整数
  //.rangeBands([0, width],.04);
  .rangeRoundBands([-1, width],.2);//定义条形间距，保证每个区间的起点都是整数

var y = d3.scale.linear()
  .domain([0, yStackMax])
  .range([height, 0]);

var color = d3.scale.linear()
  .domain([0, n - 1])
  .range(["#FFA93C", "#EA494A"]);
var xAxis = d3.svg.axis()
  .scale(x)
  .tickValues(alldate)   //刻度线默认刻度数值
  .tickSize(0)
  .tickPadding(6)//刻度线与刻度标注之间的填充
  .orient("bottom");
console.log(xAxis.scale(x));

var svg = d3.select("#d3").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("viewBox", "0 0 700 300")
  .attr("preserveAspectRatio", "xMidYMid")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var layer = svg.selectAll(".layer")
  .data(layers)
  .enter().append("g")
  .attr("class", "layer")
  .style("fill", function (d, i) { return color(i); });

var rect = layer.selectAll("rect")
  .data(function (d) { return d; })
  .enter().append("rect")
  .attr("x", function (d) { return x(d.x); })
  .attr("y", height)
  .attr("width", x.rangeBand())
  .attr("height", 0);

rect.transition()
  .delay(function (d, i) { return i * 10; })
  .attr("y", function (d) { return y(d.y0 + d.y); })
  .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); });

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);


d3.selectAll("input").on("change", function change() {
  if (this.value === "grouped") transitionGrouped();
  else transitionStacked();
});

function transitionGrouped() {
  y.domain([0, yGroupMax]);

  rect.transition()
    .duration(500)
    .delay(function (d, i) { return i * 10; })
    .attr("x", function (d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
    .attr("width", x.rangeBand() / n)
    .transition()
    .attr("y", function (d) { return y(d.y); })
    .attr("height", function (d) { return height - y(d.y); });
}

function transitionStacked() {
  y.domain([0, yStackMax]);

  rect.transition()
    .duration(500)
    .delay(function (d, i) { return i * 10; })
    .attr("y", function (d) { return y(d.y0 + d.y); })
    .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
    .transition()
    .attr("x", function (d) { return x(d.x); })
    .attr("width", x.rangeBand());
}


var labHeight = 50;
var labRadius = 10;
var colorrange=["1","2"];
var labelCircle = layer.append("circle")
  .attr("cx", function (d) {
    return width - padding.right*0.98;
    //return width - margin.right * 0.98;
  })
  .attr("cy", function (d, i) {
    return padding.top * 2 + labHeight * i;
  })
  .attr("r", labRadius);

var labelText = layer.append("text")
  .attr("x", function (d) {
    return width - padding.right*2;
  })
  .attr("y", function (d, i) {
    return padding.top * 2 + labHeight * i;
  })
  .attr("dy", labRadius / 2)
  .text(function (d,i) { return i+"~"+(i+1); });











//Inspired by Lee Byron's test data generator.//数据生成
function bumpLayer(b, num) {//n=31,o=0.1
  //console.log(b);
  console.log(b[num].map(function (d, i) { return {x: i, y: d }; }));
  return b[num].map(function (d, i) { return { x: i, y: d }; });
}

function bumpLayer1(n = 31, num) {//n=31,num=5
  var a = [], i, t = 0;
  var b = new Array();             //声明一维数组        
  for (var x = 0; x < 5; x++) {
    b[x] = new Array();        //声明二维数组
    for (var y = 0; y < n; y++) {
      b[x][n] = 0.0;          //数组初始化为0
    }
  }
  for (i = 0; i < n; ++i)   a[i] = Math.floor((Math.random() * 5.0) * 10) / 10;//取一位小数
  console.log(a);
  for (var i = 0; i < 5; i++) {
    var c = [];
    for (var k = 0; k < n; k++) {
      if (a[k] >= 1) {
        c[k] = 1;
        a[k] = Math.floor((a[k] - 1) * 10) / 10;
      }
      else {
        c[k] = a[k];
        t = a[k];
        a[k] = 0;
      }
    }
    b[i] = c;
  }
  //console.log(b);
  return b;
}


$(function () {
  var aspect = 700 / 300,
    chart = $("#d3").find("svg");
  var targetWidth = $("#d3").parent().width();
  chart.attr("width", targetWidth);
  chart.attr("height", targetWidth / aspect);


  $(window).on("resize", function () {
    var targetWidth = $("#d3").parent().width();
    var details=$("#d3detail").parent().width();
    console.log($("#d3").parent().width());
    chart.attr("width", targetWidth);
    chart.attr("height", targetWidth / aspect);

    $("svg").width(targetWidth);
    $("svg").height(targetWidth / aspect);
  });


});
