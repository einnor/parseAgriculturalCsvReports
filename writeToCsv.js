const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const writeToCsv = async (header = [], data = [], outputPath = 'output.csv') => {
	const csvWriter = createCsvWriter({
		path: outputPath,
		header,
	});
	await csvWriter.writeRecords(data);
	console.log('\nThe CSV file was written successfully!');
};

module.exports = writeToCsv;