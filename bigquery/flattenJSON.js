/**
 * Flattens a nested JSON object into a single-level object with dot notation keys
 * @param {Object} json - The nested JSON object to flatten
 * @returns {Object} Flattened object with dot notation keys
 */
function flattenJSON(json) {
    // Initialize empty object to store flattened key-value pairs
    let result = {};

    /**
     * Recursively flattens nested objects
     * @param {Object} data - Current object being processed
     * @param {string} parentKey - Parent key for nested properties
     */
    function recursiveFlatten(data, parentKey = '') {
        // Iterate through all keys in the current object
        for (let key in data) {
            // Create new key by combining parent key with current key
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            
            // Check if the current value is a nested object
            if (typeof data[key] === 'object' && data[key] !== null) {
                // If nested object, recursively flatten it
                recursiveFlatten(data[key], newKey);
            } else {
                // If not nested, add to result with flattened key
                result[newKey] = data[key];
            }
        }
    }

    // Start the flattening process with the root object
    recursiveFlatten(json);
    return result;
}

module.exports = flattenJSON;
