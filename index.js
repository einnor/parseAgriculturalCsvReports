const csv = require('csv-parser');
const fs = require('fs');

const writeToCsv = require('./writeToCsv');

const dataObject = {};
const header = [
  { id: 'year', title: 'Year' },
	{ id: 'camel', title: 'Camel' },
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
		if (!dataObject[key]) {
			dataObject[key] = {};
		}
		dataObject[key].year = key;
		dataObject[key].camel = item === 'Camel' ? value: null;
		dataObject[key].cattle = item === 'Cattle' ? value: null;
		dataObject[key].chickens = item === 'Chickens' ? value: null;
		dataObject[key].goats = item === 'Goats' ? value: null;
		dataObject[key].pigs = item === 'Pigs' ? value: null;
		dataObject[key].sheep = item === 'Sheep' ? value: null;
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
	});

const data = Object.keys(dataObject).map((key) => dataObject[key]);
writeToCsv(header, data);


// const data = [
// 	{
// 		year: 2000,
// 		camel: 12,
// 		cattle: 26,
// 		chickens: 30,
// 		goats: 40,
// 		pigs: 10,
// 		sheep: 15,
// 	},
// 	{
// 		year: 2001,
// 		camel: 19,
// 		cattle: 21,
// 		chickens: 30,
// 		goats: 20,
// 		pigs: 15,
// 		sheep: 10,
// 	},
// ];