// requires
const mysql = require("mysql");
const promptUser = require("./assets/JS/inquire");

// connect to the database information
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employee_db"
});

// connecting to the database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    promptUser();
});


// quit the application 
function quit() {
    console.log("You just quit!")
    connection.end();
};