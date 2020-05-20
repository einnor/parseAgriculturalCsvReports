const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const writeToCsv = (header = [], data = [], outputPath = 'output.csv') => {
	const csvWriter = createCsvWriter({
		path: outputPath,
		header,
	});
	csvWriter
	.writeRecords(data)
	.then(()=> console.log('\nThe CSV file was written successfully!'));
};

module.exports = writeToCsv;