const csv = require('csv-parser');
const fs = require('fs');

const writeToCsv = require('./writeToCsv');

const dataObject = {};
const header = [
  { id: 'year', title: 'Year' },
	{ id: 'camels', title: 'Camels' },
  { id: 'cattle', title: 'Cattle' },
	{ id: 'chickens', title: 'Chickens' },
	{ id: 'goats', title: 'Goats' },
	{ id: 'pigs', title: 'Pigs' },
	{ id: 'sheep', title: 'Sheep' },
]

fs.createReadStream('FAOSTAT_data_5-20-2020.csv')
  .pipe(csv())
  .on('data', (row) => {
		const key = row.Year;
		const item = row.Item;
		const value = row.Value;
		if (dataObject[key] === undefined) {
			dataObject[key] = {};
		}
		dataObject[key].year = `Y${key}`;
		dataObject[key][item.toLowerCase()] = value;
  })
  .on('end', () => {
		console.log('CSV file successfully processed');
		console.log(dataObject);
		const data = Object.keys(dataObject).map((key) => dataObject[key]);
		writeToCsv(header, data);
	});
