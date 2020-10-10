// require packages
const mysql = require("mysql");
const inquire = require("inquirer");

const { questions } = require("./JS/questions");
const { prompt } = require("inquirer");

// require arrays 


const table = "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary, department.dep_name, employee.manager_id FROM Employee INNER JOIN employee_role ON employee_role.id = employee.role_id INNER JOIN department ON department.id = employee_role.department_id";

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

function promptUser() {
    inquire.prompt(questions).then(answers => {
        switch (answers.choice) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Employees by Department":
                viewByDepartment(answers.dept)
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "Quit Application":
                quit();
                break;
        };

    });

};


function viewAllEmployees() {
    connection.query(`${table}`, function(err, data) {
        if (err) throw err;
        console.table(data);
        promptUser();
    })
};

function viewByDepartment(res) {
    connection.query(`${table} WHERE dep_name IN (?)`, res, function(err, data) {
        if (err) throw err;
        console.table(data);
        promptUser();
    });
};

// quit the application
function quit() {
    console.log("You just quit!")
    connection.end();
};

module.exports = { promptUser };