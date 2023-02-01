var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

var tableName = "Products"

var dynamodb = new AWS.DynamoDB();
var documentClient = new AWS.DynamoDB.DocumentClient();

var params = {
  TableName: tableName,
  KeySchema: [
    // Partition Key
    { AttributeName: "id", KeyType: "HASH" },
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "N" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err)
    console.error("Unable to create table: ", JSON.stringify(err, null, 2))
  else
    console.log("Created table with description: ", JSON.stringify(data, null, 2))

    // Adding example item to our collection
    var params = {
      TableName: tableName,
      Item: {
          "id": 1,
          "name": "First Item",
          "detail": "First Item Description",
          "price": 120,
          "imageUrl": "https://github.com/ebenezerdon/shopping-cart-images/blob/main/robot1.png?raw=true"
      }
  };

  console.log("Adding a new item...");
  documentClient.put(params, function(err, data) {
      if (err) {
          console.error("Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Added item successfully!");
      }
  });
});