var mysql = require("mysql");

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
  connection.end();
});
}
 