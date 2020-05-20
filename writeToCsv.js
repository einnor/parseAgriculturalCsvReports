const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const writeToCsv = (header = [], data = []) => {
	const csvWriter = createCsvWriter({
		path: 'output.csv',
		header,
	});
	csvWriter
	.writeRecords(data)
	.then(()=> console.log('The CSV file was written successfully'));
};

module.exports = writeToCsv;