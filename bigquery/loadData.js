const { BigQuery } = require('@google-cloud/bigquery');
const flattenJSON = require('./flattenJSON');
const fs = require('fs');
const path = require('path');

/**
 * Loads flattened JSON data into a BigQuery table
 * @param {string} datasetId - BigQuery dataset ID
 * @param {string} tableId - BigQuery table ID
 */
async function loadDataToBigQuery(datasetId, tableId) {
    // Initialize BigQuery client
    const bigquery = new BigQuery();

    // Construct path to sample data file
    const sampleDataPath = path.join(__dirname, '..', 'data', 'sampleData.json');
    
    // Read and parse the JSON file
    const nestedData = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'));
    
    // Flatten the JSON and wrap it in an array (BigQuery batch insert format)
    const flattenedData = [flattenJSON(nestedData)];

    // Log the data that will be loaded
    console.log('Flattened data to be loaded:', flattenedData);

    try {
        // Insert the flattened data into BigQuery
        await bigquery
            .dataset(datasetId)
            .table(tableId)
            .insert(flattenedData);

        console.log(`Data successfully loaded into table: ${tableId}`);
    } catch (error) {
        console.error('Error loading data into BigQuery:', error);
    }
}

// Configuration
const datasetId = 'testdb'; // Your BigQuery dataset name
const tableId = 'usertable'; // Your BigQuery table name

// Execute the data loading function
loadDataToBigQuery(datasetId, tableId);
