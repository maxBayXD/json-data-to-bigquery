const { BigQuery } = require('@google-cloud/bigquery');

// Remove deprecation warnings from the console output
process.removeAllListeners('warning');

/**
 * Creates a BigQuery table with predefined schema for flattened JSON data
 * This function handles both dataset and table creation
 */
async function createBigQueryTable() {
    // Initialize BigQuery client
    const bigquery = new BigQuery();
    
    // Configuration variables
    const datasetId = 'your_dataset_id'; // Dataset identifier in BigQuery
    const tableId = 'your_table_id';     // Table identifier in BigQuery

    // Schema definition matching the flattened JSON structure
    // Each field corresponds to a flattened path in the JSON
    const schema = [
        { name: 'user.name', type: 'STRING', mode: 'NULLABLE' },
        { name: 'user.address.city', type: 'STRING', mode: 'NULLABLE' },
        { name: 'user.address.country', type: 'STRING', mode: 'NULLABLE' },
        { name: 'active', type: 'BOOLEAN', mode: 'NULLABLE' }
    ];

    try {
        // Fetch list of existing datasets
        const [datasets] = await bigquery.getDatasets();
        
        // Check if our target dataset exists
        if (!datasets.some(ds => ds.id === datasetId)) {
            console.log(`Dataset "${datasetId}" does not exist. Creating it...`);
            await bigquery.createDataset(datasetId);
            console.log(`Dataset "${datasetId}" created.`);
        }

        // Create the table with our specified schema
        console.log(`Creating table "${tableId}"...`);
        await bigquery.dataset(datasetId).createTable(tableId, { schema });
        console.log(`Table "${tableId}" created successfully.`);
    } catch (error) {
        console.error('Error creating table:', error);
    }
}

// Execute the table creation function
createBigQueryTable();
