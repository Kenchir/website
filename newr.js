const csvParser = require('csv-parser');
const fs = require('fs');
var filepath = './feeds.csv';

fs.createReadStream(filepath)
    .on('error',()=>{
        //handle error
    })
    .pipe(csvParser())
    .on('data',(row)=>{
        console.log(row);
        //use row data
    })
    .on('end',()=>{
        //handle end of CSV
    })