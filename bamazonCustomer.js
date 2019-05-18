var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Westpoint19!",
  database: "bamazon"
});
var Table = require('cli-table');
var table = new Table({
  head: ['Item ID', 'Item', 'Price', 'Qnty'],
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
  // for(var i=0;i<results.length;i++){
  //   console.log("Product ID: " + results[i].id + "|" + "Item: " + results[i].product_name + "|" + "Category: " + results[i].department_name + "|" + "Price: "+ results[i].price + "|" + "Only " + results[i].stock_quantity + " left in stock");
  // }
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
    for (vari=0;i<results.length;i++){
      if (results[i].id == inquirerResponse.id){
      var item = results[i];
    }
  }
  var updateStock = parseInt(item.stock_quantity)-parseInt(inquirerResponse.stock_quantity);
  var sales = parseFloat(item.product_sales).toFixed(2);

  if (item.stock_quantity < parseInt(inquirerResponse.quantity)) {
    console.log(" Insufficient quantity!");
    repeat();
  }
 
  else {

    // Challenge 3 logic. Get total from new purchase, fetch current sales from table and add together.
    var Total = (parseFloat(inquirerResponse.quantity) * item.price).toFixed(2);
    var pTotal = (parseFloat(Total) + parseFloat(sales)).toFixed(2);
    var query = connection.query("UPDATE Products SET ?, ? WHERE ?", [{ stock_quantity: updateStock }, { product_sales: pTotal }, { item_id: item.item_id }], function (err, res) {
      if (err) throw err;
      console.log("Your Order is Processed!");
      console.log("Your total is $ " + Total);
      repeat();
    });
  }

}); // .then 

}); // first connection.query

} // beginSale function

//Function used to make the experience of the CLI mode like a program. Provides an exit choice to the user.
function repeat() {
inquirer.prompt({
// Ask user if he wants to purchase another item
name: "repurchase",
type: "list",
choices: ["Yes", "No"],
message: "Would you like to purchase another item?"
}).then(function (answer) {
if (answer.repurchase == "Yes") {
  beginSale();
}
else {
  console.log("Thank you for shopping with us. Have a great day!")
  connection.end();
}
});
}