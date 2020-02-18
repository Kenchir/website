var startDate = new Date("2020-01-01"); //YYYY-MM-DD
var endDate = new Date("2020-02-13"); //YYYY-MM-DD

var getDateArray = function(start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}

var dateArr = getDateArray(startDate, endDate);

// Output
//console.log("Start Date: " + startDate + "");
//console.log("End Date: " + endDate + "");
//console.log("Date Array")
//for (var i = 0; i < dateArr.length; i++) {
  //  console.log("" + dateArr[i] + "");
//}
console.log(dateArr);