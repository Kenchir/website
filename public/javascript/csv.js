<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Coding Train: Data and APIs Project 1</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  </head>
  <body>
    <h1>sensor value</h1>
    <canvas id="myChart" ></canvas>
    <script>
        chartIt();
       async function chartIt(){
        data =  await getadcValue();
        const ctx = document.getElementById('myChart').getContext('2d');
        
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.xs,
                datasets: [{
                    label: 'power Consumption',
                    data: data.ys,
                    backgroundColor:
                        'rgba(255, 159, 64, 0.2)',
                    borderColor: 
                        'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                }]
            } 
        });
    }


       getadcValue();
      async function getadcValue(){
          const xs =[];
          const ys =[];
        const response = await fetch('feeds.csv');
        const data = await response.text();

        const table = data.split('\n').slice(1);
        table.forEach(row => {
          const columns = row.split(',');
          const date = columns[0];
          xs.push(date);
          const adcValue = columns[2];
          ys.push(parseFloat(adcValue) *0.2048);
          console.log(date,adcValue);
        });
        return{ xs,ys};
       } 
    </script>
</body>
</html>
