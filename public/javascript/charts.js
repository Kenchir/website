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

//counter values
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: disArr,
        datasets: [{
            label: '# of Votes',
            data: [fewArr],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                barPercentage: 0.00000001,
                categoryPercentage: 1
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

//adc value 
var adc = document.getElementById('myChart01').getContext('2d');
const myChart01 = new Chart(adc, {
    type: 'bar',
    data: {
        labels: [ Wed Feb 12 2020 00:00:56 GMT+0300 (East Africa Time),
                                   
            Wed Feb 12 2020 00:00:56 GMT+0300 (East Africa Time),
           
            Wed Feb 12 2020 00:00:56 GMT+0300 (East Africa Time),
           
            Wed Feb 12 2020 00:00:56 GMT+0300 (East Africa Time),
           
            Tue Feb 11 2020 19:45:11 GMT+0300 (East Africa Time),
           
            Tue Feb 11 2020 19:45:11 GMT+0300 (East Africa Time),
           
            Tue Feb 11 2020 19:45:11 GMT+0300 (East Africa Time),
           
            Tue Feb 11 2020 19:45:11 GMT+0300 (East Africa Time),
           
            Tue Feb 11 2020 19:45:11 GMT+0300 (East Africa Time)],
        datasets: [{
            label: 'power Consumption',
            data: [475,475,475,475,519,519,519,497,503,503,504],
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
        labels: timArr,
        datasets: [{
            label: 'power Consumption',
            data: sensorArr,
            backgroundColor:
                'rgba(255, 159, 64, 0.2)',
            borderColor: 
                'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }]
    } 
});







