const flattenJSON = require('./flattenJSON');
const fs = require('fs');
const path = require('path');

// Test the JSON flattening functionality
const sampleDataPath = path.join(__dirname, '..', 'data', 'sampleData.json');
const nestedData = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'));
const flattenedData = [flattenJSON(nestedData)]; // Convert to array for BigQuery format

// Output the flattened data for verification
console.log('Flattened JSON structure:', flattenedData);