$(function () {
    var id = "";
    console.log(localStorage);
    if (localStorage.hasOwnProperty('user_id')) {
        id = parseInt(localStorage.getItem('user_id'));
    }
    console.log(id);
    $.ajax({
        url: 'http://134.175.21.162:8080/medicalSystem//doctor/score.do',
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            dt_id: id,
        },
        success: function (res) {
            if (res.status == 'login') {
                console.log(res.scoreArray.length);
                var data = Array.apply(0, Array(31)).map(function (item, i) {
                    //产生31条数据
                    i++;
                    if (i < res.scoreArray.length) {
                        return {date: i, pv: Math.floor(res.scoreArray[i] * 10) / 10};
                    }
                    else {
                        return {date: i, pv: 0};
                    }
                });
                var avgscore = 0;
                for (let i in res.scoreArray) {
                    avgscore += Math.floor(res.scoreArray[i] * 10) / 10;
                }
                //添加月平均分
                $("#span_score").empty();
                $("#span_score").append("当月评分：" + Math.floor(avgscore / res.scoreArray.length * 10) / 10);
                var width = 800, height = 350;
                margin = {left: 50, top: 50, right: 10, bottom: 20}
                var g_width = width - margin.left - margin.right,
                    g_height = height - margin.top - margin.bottom;
                var svg = d3.select("#Areachart")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)

                var g = d3.select("svg")
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

                // var data;
                // var predata;
                // var data_length;
                // var data = Array.apply(0, Array(data_length)).map(function (item, i) {
                //     //产生31条数据
                //     i++;
                //     return { date: i, pv: Math.floor(predata[i] * 10) / 10 };
                // });

                console.log(data);
                var scale_x = d3.scale.linear()
                    .domain(d3.extent(data, function (d) {
                        return d.date;
                    }))
                    .range([0, g_width - 11])
                var scale_y = d3.scale.linear()
                    .domain([0, d3.max(data, function (d) {
                        return Math.ceil(d.pv);
                    })])
                    .range([g_height, 0])

                //绘制面积图表，注意需要三个参数,y0将原来的线型图变成了封闭的面积图
                var myArea = d3.svg.area()
                    .x(function (d, i) {
                        return scale_x(d.date)
                    })
                    .y0(g_height)
                    .y1(function (d, i) {
                        return scale_y(d.pv)
                    })
                    //.interpolate("curveCardinal")//线段
                    //.interpolate("cardinal")//光滑
                    .interpolate("monotone")

                d3.select("g")
                    .append("path")
                    .attr("d", myArea(data))
                    .style("fill", "rgb(103,203,150)")

                //绘制坐标轴
                var x_axis = d3.svg.axis()
                    .scale(scale_x)
                    .tickSize(1)
                    //.tickValues(MonthDate)
                    .ticks(30)

                y_axis = d3.svg.axis()
                    .scale(scale_y)
                    .tickSize(1)
                    .orient("left")
                    .ticks(11)
                //.tickValues([0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5])

                g.append("g")
                    .call(x_axis)
                    .attr("transform", "translate(0," + g_height + ")")


                g.append("g")
                    .attr("class", ".axis axis--y")
                    .call(y_axis)
                    .append("text")
                    //.text("评分")
                    .attr("transform", "rotate(-90)")
                    .attr("dy", "1em")
                    .attr("text-anchor", "end")

                // 画背景线
                g.selectAll('.axis--y .tick')
                    .append('line')
                    .attr('class', 'bg-line')
                    .attr('stroke', '#990000')
                    .attr('shape-rendering', 'crispEdges')
                    .attr('x2', g_width - 11);
                g.select('.axis--y .bg-line:last-of-type').remove();

                //画点与tip
                var g = svg.selectAll('circle')
                    .data(data)
                    .enter()
                    .append('g');

                g.append('circle')
                    .attr('class', 'linecircle')
                    .attr('cx', (d, i) => scale_x(d.date) + margin.left)
                    .attr('cy', (d, i) => scale_y(d.pv) + margin.top)
                    .attr('r', 1.5)
                    .on('mouseover', function () {
                        d3.select(this).transition().duration(500).attr('r', 5);
                    })
                    .on('mouseout', function () {
                        d3.select(this).transition().duration(500).attr('r', 1.5);
                    });
                // <text x="20" y="20" font-family="sans-serif" font-size="20px" fill="red">Hello!</text>
                g.append('text')
                    .attr('class', 'text')
                    .attr('x', (d, i) => scale_x(d.date) + margin.left)
                    .attr('y', d => scale_y(d.pv) + margin.top - 5)
                    .text(d => d.pv)
                    .attr("font-size", "14px")
                    .attr("fill", "black");

                $("#Areachart").trigger("create");
            } else {
                alert('请登录！');
                window.location.href = "../../index.html";
            }
        },
        error: function () {
            console.log("提取失败");
        }
    })
})

