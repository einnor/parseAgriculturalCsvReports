const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('FAOSTAT_data_5-20-2020.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });