var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Westpoint19!",
  database: "bamazon"
});
var Table = require("cli-table");
var table = new Table({
  head: ["Item ID", "Product Description", "Price", "Quantity"],
  colWidths: [20, 40, 15, 15]
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

beginSale();

function beginSale(){
connection.query("SELECT * FROM products", function (error, results, fields) {
  if (error) throw error;
  console.log("Welcome to my Bamazon Store");
  for (var i = 0; i < results.length; i++) {
    table.push([results[i].id, results[i].product_name, results[i].price.toFixed(2), results[i].stock_quantity])
  }
  console.log(table.toString());
  
  inquirer
  .prompt([
    {
      type: "input",
      message: "Enter ID to purchase by Product ID: ",
      name: "id",
    },
    {
      type: "number",
      message: "Please type select quantity (must be a number)",
      name: "quantity",
      validate: function (value){
        if (isNaN(value)==false){
          return true;
        } else{
          return false;
        }
        }
    }
  ])
  .then(function(inquirerResponse) {
    for (var i=0;i<results.length;i++){
      if (results[i].id == inquirerResponse.id){
      var item = results[i];
    }
  }


  if (item.stock_quantity < parseInt(inquirerResponse.quantity)) {
    console.log(" Insufficient quantity!");
  }
 
  else {
      console.log("Your Order is Processed!");
      console.log("Thank you for shopping with us. Have a great day!")
      connection.end();
  }

}); // .then 

}); // first connection.query

} // beginSale function