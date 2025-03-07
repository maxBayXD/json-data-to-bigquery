# BigQuery JSON Loader

## Overview
This project demonstrates how to:
1. Flatten nested JSON data.
2. Create a BigQuery table with a specified schema.
3. Load the flattened JSON data into the BigQuery table.

## File Structure
```
project-directory/
    ├── bigquery/
    │ ├── createTable.js    # Script to create a BigQuery table
    │ ├── loadData.js       # Script to load flattened JSON data into the table
    │ ├── flattenJSON.js    # Utility function to flatten nested JSON
    │ ├── test.js          # Test script for JSON flattening functionality
    ├── data/
    │ ├── sampleData.json   # Example JSON file with nested data
    ├── package.json        # Node.js project configuration
    ├── README.md          # Documentation for the project
```
This structure organizes the project, ensuring reusability and easy maintenance.

## Setup
1. Install dependencies:
    ```bash
        npm install
    ```

2. Set the GOOGLE_APPLICATION_CREDENTIALS environment variable:
    ```bash
        export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-service-account-key.json"
    ```

3. Run the scripts:
    *   Create the BigQuery table:
        ```bash
        npm run create-table
        ```
    *   Load data into the table:
        ```bash
        npm run load-data
        ```

## Testing
To verify the JSON flattening functionality:
```bash
node bigquery/test.js
```
This will output the flattened structure of the sample JSON data, allowing you to verify the transformation before loading into BigQuery.
