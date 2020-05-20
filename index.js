const csv = require('csv-parser');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const writeToCsv = require('./writeToCsv');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const titleCase = (title) => {
	const titledCase = title.toLowerCase().split(' ');
	for (var i = 0; i < titledCase.length; i++) {
		titledCase[i] = titledCase[i][0].toUpperCase() + titledCase[i].slice(1);
	}
	return titledCase.join(' ');
}

rl.question('\nDrag and drop the csv you want to parse here and press ENTER\n', (filePath) => {
	const file = filePath.trimRight();
	fs.access(file, fs.F_OK, (err) => {
		if (err) {
			console.error('\nThe file path that you provided is invalid!');
			rl.close();
		}
	
		// File exists so proceed
		rl.question('\nEnter the headers, separating them by semicolons, then press ENTER\n', (headers) => {
			console.log('\n\nInitializing...');
	
			const header = headers.split(';').map((item) => ({
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
	
			console.log('\nReading CSV file...');
			fs.createReadStream(file)
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
				.on('end', async () => {
					console.log('\nTransforming data...');
					const data = Object.keys(dataObject).map((key) => dataObject[key]);
	
					console.log('\nWriting to CSV file...');
					const outputPath = `[PROCESED] ${path.basename(file)}`;
					await writeToCsv(header, data, outputPath);
	
					console.log(`\nLINK --> ${path.resolve(outputPath)}`);
	
					rl.close();
				});
		});
	});
});

rl.on('close', function() {
	console.log("\nBYE BYE !!!");
	process.exit(0);
});
