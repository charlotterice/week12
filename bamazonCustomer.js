var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Westpoint19!",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  beginSale();
});

function beginSale(){
connection.query("SELECT * FROM products", function (error, results, fields) {
  if (error) throw error;
  console.log("Welcome to my Bamazon Store");

  for(var i=0;i<results.length;i++){
    console.log("Product ID: " + results[i].id + "|" + "Item: " + results[i].product_name + "|" + "Category: " + results[i].department_name + "|" + "Price: "+ results[i].price + "|" + "Only " + results[i].stock_quantity + " left in stock");
  }
  inquirer
  .prompt([
    {
      type: "input",
      message: "Enter ID to purchase by Product ID: ",
      name: "id"
    },
    {
      type: "number",
      message: "Please type select quantity (must be a number)",
      name: "quantity"
    },
    {
      type: "confirm",
      message: "Confirm quantity selection",
      name: "confirm",
      default: true
    },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }
  ])
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.confirm) {
      console.log("\nWelcome " + inquirerResponse.username);
      console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
    }
    else {
      console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
    }
  });

  connection.end();
});
}
 