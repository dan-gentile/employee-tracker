// require packages
const mysql = require("mysql");
const inquire = require("inquirer");

const Department = require("./JS/lib/department");
const EmployeeRole = require("./JS/lib/employeeRole");
const Employee = require("./JS/lib/employee");

const employeeRoleArr = [];
const departmentArr = [];
const employeeArr = [];


// require arrays 
const { questions } = require("./questions");

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
    getDepartments();

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
            case "View All Employees by Manager":
                viewAllByManager();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Remove Employee":
                removeEmployee();
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