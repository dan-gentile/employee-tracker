const mysql = require("mysql");
const Department = require("./JS/lib/department");
const EmployeeRole = require("./JS/lib/employeeRole");
const Employee = require("./JS/lib/employee");

const employeeRoleArr = [];
const departmentArr = [];
const employeeArr = [];


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
    getEmployeeRoles();
    getEmployees();
});

function getDepartments() {
    connection.query("SELECT * FROM department", function(err, data) {
        if (err) throw err;
        data.forEach(element => {
            const newDept = new Department(element.id, element.dep_name);
            departmentArr.push(newDept);

        });

    });
};

function getEmployeeRoles() {
    connection.query("SELECT * FROM employee_role", function(err, data) {
        if (err) throw err;
        data.forEach(element => {
            const newEmployeeRole = new EmployeeRole(element.department_id, element.id, element.title, element.salary);
            employeeRoleArr.push(newEmployeeRole);

        });

    });

};

function getEmployees() {
    connection.query("SELECT * FROM employee", function(err, data) {
        if (err) throw err;
        data.forEach(element => {
            const newEmployee = new Employee(element.id, element.first_name, element.last_name, element.role_id);
            employeeArr.push(newEmployee);

        });

    });
};



// export functions
module.exports = {
    departmentArr: departmentArr,
    employeeRoleArr: employeeRoleArr,
    employeeArr: employeeArr
};