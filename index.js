// require packages
const mysql = require("mysql");
const inquire = require("inquirer");

// required classes
const EmployeeRole = require("./JS/lib/employeeRole");
const Employee = require("./JS/lib/employee");
const Department = require("./JS/lib/department");

//arrays 
const employeeObjArr = [];
const roleObjArr = [];
const departmentObjArr = [];

const employeeArr = [];
const roleArr = [];
const departmentArr = [];

// global 
let newDept;
let newRole;
let newEmployee;

// SQL selectors
const allTable = "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary, department.dept_name, employee.manager_id FROM Employee INNER JOIN employee_role ON employee_role.role_id = employee.role_id INNER JOIN department ON department.dept_id = employee_role.dept_id";
const employeeRoleTable = "SELECT department.dept_id, department.dept_name, employee_role.role_id, employee_role.title, employee_role.salary FROM employee_role INNER JOIN department ON department.dept_id = employee_role.dept_id";
const employeeTable = "SELECT department.dept_id, department.dept_name, employee_role.role_id, employee_role.title, employee_role.salary, employee.id, employee.first_name, employee.last_name FROM employee_role INNER JOIN department ON department.dept_id = employee_role.dept_id INNER JOIN employee ON employee.role_id = employee_role.role_id";

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

// gets Department info from DB
function getDepartments() {
    connection.query("SELECT * FROM department", function(err, data) {
        if (err) throw err;
        data.forEach(element => {
            newDept = new Department(element.dept_id, element.dept_name);
            departmentObjArr.push(newDept);
            departmentArr.push(newDept.deptName);
        });
        getRole();
    });
};

// gets Role info from DB
function getRole() {
    connection.query(`${employeeRoleTable}`, function(err, data) {
        if (err) throw err;
        data.forEach(element => {
            newRole = new EmployeeRole(element.dept_id, element.dept_name, element.role_id, element.title, element.salary);
            roleObjArr.push(newRole);
            roleArr.push(newRole.title)
        });
        getEmployees();
    });

};

// gets employee info from DB
function getEmployees() {
    connection.query(`${employeeTable}`, function(err, data) {
        if (err) throw err;
        data.forEach(element => {
            newEmployee = new Employee(element.dept_id, element.dept_name, element.role_id, element.title, element.salary, element.id, element.first_name, element.last_name)
            employeeObjArr.push(newEmployee);
            employeeArr.push(`${newEmployee.firstName} ${newEmployee.lastName}`);
        });
        promptUser();
    });
};

// asks questions
function promptUser() {
    inquire.prompt([{
            name: "choice",
            message: "What would you like to do?",
            type: "list",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Departments",
                "View All Employee Roles",
                "Add",
                "Remove Employee",
                "Update Employee Role",
                "Quit Application"
            ]
        },
        {
            name: "dept",
            message: "Which department do you want to search by?",
            type: "list",
            choices: departmentArr,
            when: function(answers) {
                if (answers.choice === "View All Employees by Department") {
                    return true
                } else {
                    return false
                }
            }
        },

    ], ).then(res => {
        switch (res.choice) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Employees by Department":
                viewByDepartment(res.dept)
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Employee Roles":
                viewAllEmployeeRoles();
                break;
            case "Add":
                inquire.prompt([{
                        name: "addType",
                        message: "What do you want to add?",
                        type: "list",
                        choices: [
                            "New Department",
                            "New Employee Role",
                            "New Employee",
                            "Quit"
                        ]
                    }, {
                        name: 'newDept',
                        message: "What is the New Department?",
                        type: "input",
                        when: function(answers) {
                            if (answers.addType === "New Department") {
                                return true
                            } else {
                                return false
                            }
                        }
                    }, {
                        name: 'newRole',
                        message: "What is the New Role?",
                        type: "input",
                        when: function(answers) {
                            if (answers.addType === "New Employee Role") {
                                return true
                            } else {
                                return false
                            }
                        }
                    }, {
                        name: 'newSalary',
                        message: "What is the Salary?",
                        type: "number",
                        when: function(answers) {
                            if (answers.addType === "New Employee Role") {
                                return true
                            } else {
                                return false
                            }
                        }
                    }, {
                        name: 'dept',
                        message: "What is employee's department?",
                        type: "list",
                        choices: departmentArr,
                        when: function(answers) {
                            if (answers.addType === "New Employee Role") {
                                return true
                            } else {
                                return false
                            }
                        }

                    },
                    {
                        name: 'firstName',
                        message: "What is employee's first name?",
                        type: "input",
                        when: function(answers) {
                            if (answers.addType === "New Employee") {
                                return true
                            } else {
                                return false
                            }
                        }

                    }, {
                        name: 'lastName',
                        message: "What is employee's last name?",
                        type: "input",
                        when: function(answers) {
                            if (answers.addType === "New Employee") {
                                return true
                            } else {
                                return false
                            }
                        }

                    }, {
                        name: 'role',
                        message: "What is employee's Role?",
                        type: "list",
                        choices: roleArr,
                        when: function(answers) {
                            if (answers.addType === "New Employee") {
                                return true
                            } else {
                                return false
                            }
                        }

                    }

                ]).then(res => {
                    switch (res.addType) {
                        case "New Department":
                            addDepartment(res.newDept)
                            break;
                        case "New Employee Role":
                            let findDeptId = departmentObjArr.find(element => element.deptName === `${res.dept}`);
                            let { deptId } = findDeptId;
                            addRole(res.newRole, res.newSalary, deptId)
                            break;
                        case "New Employee":
                            let findId = roleObjArr.find(element => element.title === `${res.role}`);
                            let { roleId } = findId;

                            addEmployee(res.firstName, res.lastName, roleId);
                            break;
                        case "Quit":
                            promptUser();
                            break;

                    };
                });
                break;
            case "Update Employee Role":
                inquire.prompt([{
                        name: "who",
                        message: "Who do you want to update?",
                        type: "list",
                        choices: employeeArr
                    }, {
                        name: "role",
                        message: "What is their new role?",
                        type: "list",
                        choices: roleArr
                    }

                ]).then(res => {
                    let findId = roleObjArr.find(element => element.title === `${res.role}`);
                    let { roleId } = findId;

                    let arr = res.who.split(" ");

                    let findEmpId = employeeObjArr.find(element => element.firstName === `${arr[0]}` && element.lastName === `${arr[1]}`);
                    let { id } = findEmpId;

                    updateEmployee(roleId, id);
                });
                break;
            case "Remove Employee":
                inquire.prompt({
                    name: "who",
                    message: "Who do you want to update?",
                    type: "list",
                    choices: employeeArr
                }).then(res => {
                    let arr = res.who.split(" ");

                    let index = employeeArr.indexOf(`${res.who}`)
                    let findEmpId = employeeObjArr.find(element => element.firstName === `${arr[0]}` && element.lastName === `${arr[1]}`);
                    let { id } = findEmpId;

                    removeEmployee(id, index);
                });
                break;
            case "Quit Application":
                console.log("You just quit!")
                connection.end();
                break;
        };

    });

};

// creates a view for all employees
function viewAllEmployees() {
    connection.query(`${allTable}`, function(err, data) {
        if (err) throw err;
        console.table(data);
        promptUser();
    });
};

// creates a view filtered by departments
function viewByDepartment(res) {
    connection.query(`${allTable} WHERE dept_name IN (?)`, res, function(err, data) {
        if (err) throw err;
        console.table(data);
        promptUser();
    });
};

// creates a view filtered by departments
function viewAllDepartments() {
    connection.query('SELECT * FROM department', function(err, data) {
        if (err) throw err;
        console.table(data);
        promptUser();
    });
};

// creates a view filtered by departments
function viewAllEmployeeRoles() {
    connection.query('SELECT * FROM employee_role', function(err, data) {
        if (err) throw err;
        console.table(data);
        promptUser();
    });
};

// adds a department to DB 
function addDepartment(res) {
    connection.query('INSERT INTO department(dept_name) VALUES(?)', res, function(err, data) {
        if (err) throw err;
        console.log("Success!");
        departmentArr.push(res);
        getDepartments();
    });
};

// adds a role to DB
function addRole(role, salary, deptId) {
    connection.query('INSERT INTO employee_role(title, salary, dept_id) VALUES(?, ?, ?)', [role, salary, deptId], function(err, data) {
        if (err) throw err;
        console.log("Success!");
        roleArr.push(role);
        getRole();
    });
};

// adds an employee to DB 
function addEmployee(firstName, lastName, roleId) {
    connection.query('INSERT INTO employee(first_name, last_name, role_id) VALUES(?,?,?)', [firstName, lastName, roleId], function(err, data) {
        if (err) throw err;
        console.log("Success!");
        employeeArr.push(`${firstName} ${lastName}`);
        getEmployees();
    });
};

// updates an employee in the DB 
function updateEmployee(res1, res2) {
    connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [res1, res2], function(err, data) {
        if (err) throw err;
        console.log("Success!");
        promptUser();
    });
};

// removes an employee from the DB
function removeEmployee(res, res2) {
    connection.query('DELETE FROM employee WHERE id = ?', res, function(err, data) {
        if (err) throw err;
        console.log("Success!");

        employeeArr.splice(res2, 1);

        getEmployees();
    });
};