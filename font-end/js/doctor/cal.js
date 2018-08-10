function Dragon() {
    this.init();
}
var now_Date = new Date();
var currentDate = now_Date.getDate();
console.log(now_Date + "HHHH");
Dragon.prototype = {
    nowDate: null,
    showDate: new Date(),//获取当前日期Fri Jul 27 2018 00:03:24 GMT+0800 
    init: function (date) {
        var date = date || this.showDate;
        //var year = date.getFullYear() + "-" + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)) + "-" + ((date.getDate()) > 9 ? (date.getDate()) : "0" + (date.getDate()));
        //console.log(year);
        var html_date = date.getFullYear() + "年" + (date.getMonth() + 1) + "月";
        var currentDays = this.getMonthDays(date);
        var prevDays = this.getPrevMonthDays();
        var nextDays = this.getNextMonthDays();
        var firstDay = currentDays.firstDay;
        var relaxdayNum = 0;
        var hadworkNum=0;
        var indexRow = 0;
        html = "<li>";
        console.log(firstDay);
        console.log(this.nowDate);
        //根据当前月首日将月首日之前的日期置空
        for (let i = 1; i < firstDay; i++) {
            html += "<div class='oneday'><div class='oneday_number'><span></span></div><div class='oneday_workcontent'></div></div>";
        }
        for (let i = 1; i <= currentDays.days; i++) {
            // console.log(i + "," + date.getDay());
            //判断是否日期（day）相同
            if (i == currentDate) {
                console.log(now_Date.getMonth(), date.getMonth());
                //判断是否月份相同
                if (now_Date.getMonth() == date.getMonth()) {
                    //判断是否年份相同
                    if (now_Date.getFullYear() == date.getFullYear()) {
                        hadworkNum=i-relaxdayNum;
                        html += "<div class='oneday' id='today'><div class='oneday_number'><span>" + i + "</span></div>";
                        html += "<div class='oneday_workcontent'><span>就诊人数:</span><span id='registerNum'></span></div></div>";
                    }
                    else {
                        if ((i + firstDay) % 7 == 0 || (i + firstDay) % 7 == 1) {
                            relaxdayNum++;
                            html += "<div class='oneday' id='relaxday'><div class='oneday_number'><span>" + i + "</span></div>";
                            html += "<div class='oneday_workcontent'><span></span><span id='patientnumber'></span></div></div>";
                        }
                        else {
                            html += "<div class='oneday'><div class='oneday_number'><span>" + i + "</span></div>";
                            html += "<div class='oneday_workcontent'><span></span><span id='patientnumber'></span></div></div>";
                        }
                    }
                }
                else {
                    if ((i + firstDay) % 7 == 0 || (i + firstDay) % 7 == 1) {
                        relaxdayNum++;
                        html += "<div class='oneday' id='relaxday'><div class='oneday_number'><span>" + i + "</span></div>";
                        html += "<div class='oneday_workcontent'><span></span><span id='patientnumber'></span></div></div>";
                    }
                    else {
                        html += "<div class='oneday'><div class='oneday_number'><span>" + i + "</span></div>";
                        html += "<div class='oneday_workcontent'><span></span><span id='patientnumber'></span></div></div>";
                    }
                }
            }
            else {
                if ((i + firstDay) % 7 == 0 || (i + firstDay) % 7 == 1) {
                    relaxdayNum++;
                    html += "<div class='oneday' id='relaxday'><div class='oneday_number'><span>" + i + "</span></div>";
                    html += "<div class='oneday_workcontent'><span></span><span id='patientnumber'></span></div></div>";
                }
                else {
                    html += "<div class='oneday'><div class='oneday_number'><span>" + i + "</span></div>";
                    html += "<div class='oneday_workcontent'><span></span><span id='patientnumber'></span></div></div>";
                }
            }
            if ((i + firstDay - 1) % 7 == 0) {
                html += "</li><li>";
                indexRow++;
            }
        }

        if (indexRow == 4) {
            var cols = 7 - (firstDay + currentDays.days - 1) % 7;
            for (let i = 1; i <= cols; i++) {
                html += "<div class='oneday'><div class='oneday_number'><span></span></div></div>";
            }
            html += "</li><li><div class='oneday'><span></span></div><div class='oneday'><span></span></div><div class='oneday'><span></span></div><div class='oneday'><span></span></div><div class='oneday'><span></span></div><div class='oneday'><span></span></div><div class='oneday'><span></span></div></li>";
        }
        if (indexRow == 5) {
            var cols = 7 - (firstDay + currentDays.days - 1) % 7;
            for (let i = 1; i <= cols; i++) {
                html += "<div class='oneday'><span></span></div>";
            }
            html += "</li>";
        }
        //修改应工作与已工作天数
        $('#allworkNum').empty();
        $('#allworkNum').append(currentDays.days - relaxdayNum);
        $('#hadworkNum').empty();
        $('#hadworkNum').append(hadworkNum-1);
       // document.querySelector('#allworkNum').innerHTML = currentDays.days -relaxday;
        document.querySelector("#date_").innerHTML = html_date;
        document.querySelector(".calendC").innerHTML = html;

    },
    getMonthDays: function (date, str) { //获取传入时间当前的月份有多少天（不传时间就是获取当前月份的天数）
        var str = str === undefined ? 0 : str;
        var date = date || new Date();
        if (str == 0) {
            this.showDate = date;
        }
        date.setDate(1);
        var firstDay = date.getDay();
        var monthStart = date.getTime();
        date.setMonth(date.getMonth() + 1);
        var monthEnd = date.getTime();
        var obj = {};
        var days = Math.ceil((monthEnd - monthStart) / (24 * 60 * 60 * 1000));
        date.setMonth(date.getMonth() - 1)
        obj = {
            days: days,
            firstDay: firstDay == 0 ? 7 : firstDay
        }
        return obj;
    },
    getCurrentMonthDays: function () { //获取当前月份的天数
        var date = new Date();
        if (this.nowDate == null) {
            this.nowDate = date;
        }
        date.setDate(1);
        var firstDay = date.getDay();
        var monthStart = date.getTime();
        date.setMonth(date.getMonth() + 1);
        var monthEnd = date.getTime();
        var obj = {};
        var days = Math.ceil((monthEnd - monthStart) / (24 * 60 * 60 * 1000));
        date.setMonth(date.getMonth() - 1);
        obj = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            days: days,
            firstDay: firstDay == 0 ? 7 : firstDay
        }
        return obj;
    },
    getNextMonthDays: function () { //获取下一个月的天数
        var date = this.showDate;
        date.setMonth(date.getMonth() + 1);
        this.getMonthDays(date, 1);
        date.setMonth(date.getMonth() - 1);
    },
    getPrevMonthDays: function () { //获取上一个月的天数
        var date = this.showDate;
        date.setMonth(date.getMonth() - 1);
        this.getMonthDays(date, -1);
        date.setMonth(date.getMonth() + 1);
    },
    nextMonth: function () { //显示下一个月的时间
        var date = this.showDate;
        date.setMonth(date.getMonth() + 1);
        this.init(date);
    },
    prevMonth: function () { //显示上一个月的时间
        var date = this.showDate;
        date.setMonth(date.getMonth() - 1);
        this.init(date);
    },
    nowMonth: function () { //显示本月的时间
        console.log(now_Date + "is show0");
        var date = new Date();
        this.init(date);
    }
}

var calend = new Dragon();
$("#todaybutton").on("click", function () {
    now_Date = new Date();
    currentDate = now_Date.getDate();
    console.log(now_Date + "is click");
    calend.nowMonth();
})
$(".preMonth").on("click", function () {
    calend.prevMonth();
})
$(".nextMonth").on("click", function () {
    calend.nextMonth();
})

$("#today").on("click", function () {
    window.location.href = './registerList.html';
})