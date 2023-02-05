var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

// TableName should be in lowercase
var tableName = "orders"

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

dynamodb.createTable(params, function (err, data) {
  if (err)
    console.error("Unable to create table: ", JSON.stringify(err, null, 2))
  else
    console.log("Created table with description: ", JSON.stringify(data, null, 2))

  // Adding example item to our collection
  var params = {
    TableName: tableName,
    Item: {
      id: 0,
      date: '2022-05-13',
      state: 'pending',
      items: [
        {
          id: 0,
          name: 'Surgeon Robot',
          quantity: 30,
          price: 120,
          imageUrl: "https://github.com/ebenezerdon/shopping-cart-images/blob/main/robot1.png?raw=true"
        },
        {
          id: 1,
          name: 'Main Robot',
          quantity: 20,
          price: 220,
          imageUrl: "https://github.com/ebenezerdon/shopping-cart-images/blob/main/robot2.png?raw=true"
        }
      ]
    }
  };

  console.log("Adding a new item...");
  documentClient.put(params, function (err, data) {
    if (err) {
      console.error("Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Added item successfully!");
    }
  });
});