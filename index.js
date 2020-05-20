const csv = require('csv-parser');
const fs = require('fs');
const readline = require('readline');

const writeToCsv = require('./writeToCsv');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const titleCase = (title) => {
	var titledCase = title.toLowerCase().split(' ');
	for (var i = 0; i < titledCase.length; i++) {
		titledCase[i] = titledCase[i][0].toUpperCase() + titledCase[i].slice(1);
	}
	return titledCase;
}

rl.question('Drag and drop the csv you want to parse here and press ENTER\n', (path) => {
	rl.question('Enter the headers, separating them by commas, then press ENTER\n', (headers) => {
		console.log('\n\nInitializing...\n');

		const header = headers.split(',').map((item) => ({
			id: item.toLowerCase(),
			title: titleCase(item),
		}));

		const dataObject = {};
		// const header = [
		// 	{ id: 'year', title: 'Year' },
		// 	{ id: 'camels', title: 'Camels' },
		// 	{ id: 'cattle', title: 'Cattle' },
		// 	{ id: 'chickens', title: 'Chickens' },
		// 	{ id: 'goats', title: 'Goats' },
		// 	{ id: 'pigs', title: 'Pigs' },
		// 	{ id: 'sheep', title: 'Sheep' },
		// ];

		fs.createReadStream(path)
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
				writeToCsv(header, data, `[PROCESSED]${path}`);
			});
		rl.close();
	});
});

rl.on('close', function() {
	console.log("\nBYE BYE !!!");
	process.exit(0);
});
