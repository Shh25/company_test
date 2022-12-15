const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");
const partitionKeyStr = "hello world"
const partitionKeyStrHash = "59c0d8f192e89d8bcc0c7411bdc2c3ee3d50b152b7b1e5e006c9e71e7e6a8b12343b0fe02be7091bac1d485ad2d76f7734a8be02b2495cfa3d11cae2fa5e4947"
const partitionKeyNum = crypto.randomInt(100)
const partitionKeyLength = 128

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(process.env.TRIVIAL_PARTITION_KEY.toString());
  });

  it("Returns partition key string when given input from event", () => {
    const partitionKey = deterministicPartitionKey({ partitionKey: partitionKeyStr });
    expect(partitionKey).toBe(partitionKeyStr);
  });

  it("Returns partition key number string when given numerical input from event", () => {
    const partitionKey = deterministicPartitionKey({ partitionKey: partitionKeyNum });
    expect(partitionKey).toBe(partitionKeyNum.toString());
  });

  it("Returns the hash when given event input string", () => {
    const partitionKey = deterministicPartitionKey(partitionKeyStr);
    expect(partitionKey).toBe(partitionKeyStrHash);
    expect(partitionKey.length).toBe(partitionKeyLength);
  });

  it("Returns appropriate hash when given long input string", () => {
    maxLength = parseInt(process.env.MAX_PARTITION_KEY_LENGTH)+10
    const partitionKey = deterministicPartitionKey({ partitionKey: randomString(maxLength) });
    expect(partitionKey.length).toBe(partitionKeyLength);
  });
  
});

function randomString(size = 1) {  
  val = crypto.randomBytes(size)
  .toString('base64')
  .slice(0, size)
  return val
}