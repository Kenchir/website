//const thingspeak = document.getElementById("mydata")

const thingspeak =document.querySelector("p");
//counter values  #mydata
var fewArr =[];
fewArr.push(thingspeak.dataset.visual);
//console.log(fewArr);
var newArr =[]
fewArr.forEach(element => newArr.push(element));
console.log(newArr.length);
//console.log(newArr[0]);
//adc values #mydata01
const adcValue = document.querySelector("h1");
var adcArr = [];
adcArr.push(adcValue.dataset.visual);
//console.log(adcArr[0]);
adcArr.map(y=>console.log(y));
//sensor values #mydata02
const sensorValue = document.querySelector("h2");
var sensorArr =[];
sensorArr.push(sensorValue.dataset.visual);
//console.log(sensorArr);

//distance values #mydata03
const disValue = document.querySelector("h3");
var disArr = [];
disArr.push(disValue.dataset.visual);
//console.log(disArr);

//time variables
const timed = document.querySelector("h4");
var timArr =[];
timArr.push(timed.dataset.visual);



console.log(timArr[0]);
var startDate = new Date("2020-01-01"); //YYYY-MM-DD
var endDate = new Date("2020-02-13");//YYYY-MM-DD
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
var listDate = [];
var startDate ='2020-01-14';
var endDate = '2020-02-17';
var dateMove = new Date(startDate);
var strDate = startDate;

while (strDate < endDate){
  var strDate = dateMove.toISOString().slice(0,10);
  listDate.push(strDate);
  dateMove.setDate(dateMove.getDate()+1);
};
// Output
//console.log("Start Date: " + startDate + "");
//console.log("End Date: " + endDate + "");
//console.log("Date Array")
//for (var i = 0; i < dateArr.length; i++) {
  //  console.log("" + dateArr[i] + "");
//}
console.log(dateArr);
//counter values
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: listDate,
        datasets: [{
            label: 'Vehicle Counter',
            data: [10,42,44,75,81,84,93,102,102,201,201,
            12,23,24,45,51,54,63,72,72,81,81,
            10,42,44,55,51,64,73,82,82,31,81,
            40,52,44,75,21,34,33,22,12,81,91,],
            backgroundColor:
                'rgba(75, 192, 192, 0.2)',
            borderColor: 
                'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
    }
});
//[10,42,44,75,81,84,93,102,102,201,201,
//12,23,24,45,51,54,63,72,72,81,81,
//10,42,44,55,51,64,73,82,82,31,81,
//40,52,44,75,21,34,33,22,12,81,91,],
//adc value 
var adc = document.getElementById('myChart01').getContext('2d');
const myChart01 = new Chart(adc, {
    type: 'bar',
    data: {
        labels: listDate,
        datasets: [{
            label: 'LDR Threshold Distribution',
            data: [475,475,475,475,519,519,519,497,503,503,504,
                475,475,475,475,519,519,519,497,503,503,504,
                519,519,519,497,508,527,689,800,678,404,567,
                503,503,504,519,519,519,497,508,527,689,800
            ],
            backgroundColor:
                'rgba(255, 159, 64, 0.2)',
            borderColor: 
                'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }]
    } 
});

//sensor value 
var sens = document.getElementById('myChart02').getContext('2d');
const myChart02 = new Chart(sens, {
    type: 'bar',
    data: {
        labels: listDate,
        datasets: [{
            label: 'ADC Threshold Distribution',
            data: [800,750,393,392,289,948,232,234,567,898,
                    700,570,933,293,983,839,332,432,765,988,
                    824,784,390,399,489,908,902,904,894,584,
                    940,270,393,392,489,998,202,294,507,988,
                ],
            backgroundColor:
                'rgba(153, 102, 255, 0.2)',
            borderColor: 
                'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    } 
});







