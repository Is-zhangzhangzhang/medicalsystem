//边框的颜色
var border_color = "#1E90FF";
//用于填充的颜色
var fillcolor = "rgba(204, 238, 255, .1)";
var dotcolor = "rgba(255, 255, 255, .9)";
//数据
var history_data = [["2016-12-13", 10], ["2016-12-14", 10],
["2016-12-15", 50], ["2016-12-16", 20], ["2016-12-17", 40],
["2016-12-18", 10], ["2016-12-19", 10], ["2016-12-20", 30],
["2016-12-21", 10], ["2016-12-22", 110]];

console.log(history_data);
var w1 = 700;
var h1 = 400;

var report = $("#myhealthreport");
report.empty();
var svg = d3.select("#myhealthreport").append('svg')
    .attr("width", w1)
    .attr("height", h1);

var margin = { top: 20, right: 25, bottom: 100, left: 60 };
width = w1 - margin.left - margin.right,
    height = h1 - margin.top - margin.bottom;

var new_svg = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var format = d3.time.format("%Y-%m-%d");

var x = d3.time.scale()
    .domain([format.parse(history_data[0][0]),
    format.parse(history_data[history_data.length - 1][0])])
    .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(10)
    .tickFormat(d3.time.format("%Y-%m-%d"));

var y = d3.scale.linear()
    .domain([0, d3.max(history_data, function (d) { return d[1] }) * 1.3])
    .range([height, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

// Define the line
var line = d3.svg.line()
    .x(function (d) { return x(format.parse(d[0])) })
    .y(function (d) { return y(d[1]) })
    .interpolate("linear");

// Define the area
var area = d3.svg.area()
    .x(function (d) { return x(format.parse(d[0])); })
    .y0(height)
    .y1(function (d) { return y(d[1]); })
    .interpolate("linear");

// Add the X Axis
new_svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "x axis")
    .style("fill", border_color)
    .style("font-size", "1em")
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-70)")
    .style("text-anchor", "end");
// Add the Y Axis
new_svg.append("g")
    .attr("class", "y axis")
    .style("fill", border_color)
    .style("font-size", "1.3em")
    .call(yAxis);

// Add the line
var svg_path4 = new_svg.append('path')
    .attr("d", line(history_data))
    .attr("fill", "none")
    .attr("stroke-width", "0.16em")
    .attr("stroke", border_color);

do_animation(svg_path4);

// Add the area
svg_path5 = new_svg.append("path")
    .datum(history_data)
    .attr("d", area(history_data))
    .attr("fill", fillcolor)
    .attr("stroke-width", "0");

function do_animation(path) {
    var totalLength = path.node().getTotalLength();
    path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);
}

// Add the scatterplot
new_svg.selectAll("dot")
    .data(history_data)
    .enter()
    .append("circle")
    .attr("r", 2.5)
    .attr("cx", function (d) { return x(format.parse(d[0])); })
    .attr("cy", function (d) { return y(d[1]); })
    .attr("fill", dotcolor)
    .attr("stroke-width", "0")
    .on("mouseover", function (d, i) {
        div02.transition()
            .duration(200)
            .style("opacity", 1);
        div02.html(function () {
            return '<div style="color:#fff">' + d[1] + '</div>';
        })
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 20) + "px");
        d3.select(this)
            .attr("r", "6")
            .attr("opacity", "0.8");
    })
    .on("mouseout", function (d, i) {
        div02.transition()
            .duration(500)
            .style("opacity", 0);
        d3.select(this)
            .attr("r", "3")
            .attr("opacity", "1.0");
    });