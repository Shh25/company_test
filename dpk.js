const crypto = require("crypto");
const dotenv = require('dotenv');
dotenv.config();

// Create partition key for given event string, return key string
exports.deterministicPartitionKey = (event) => {

  let partitionKey = process.env.TRIVIAL_PARTITION_KEY;

  // Update partition key to key value from provided parameters
  if (event) {
    if (event.partitionKey) {
      partitionKey = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      partitionKey = createHash(data);
    }
  }
  
  partitionKey = convertToString(partitionKey)
  if (partitionKey.length > process.env.MAX_PARTITION_KEY_LENGTH) {
    partitionKey = createHash(partitionKey);
  }
  return partitionKey;
};

// Create hash from given hash string, return hex 
function createHash(hashString) {
  return crypto.createHash("sha3-512").update(hashString).digest("hex");
}

// Convert non-string partition key to string, return string
function convertToString(keyValue) {
  if (typeof keyValue !== "string") {
    if(typeof keyValue !== "bigint") {
      keyValue = JSON.stringify(keyValue)
    } else {
      keyValue = keyValue.toString()
    }
  }
  return keyValue
}


