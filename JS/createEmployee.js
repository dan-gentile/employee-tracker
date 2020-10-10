const mysql = require("mysql");
const questionPage = require("./questions");
const inquire = require("inquirer");

const askQuestions = questionPage.askQuestions;

const index = require("../index")
    // const promptUser = index.promptUser;

const titleArr = [];
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


});

function getEmployees() {
    connection.query("SELECT * FROM employee", function(err, data) {
        if (err) throw err;
        data.forEach(element => {
            const newEmployee = `${element.first_name} ${element.last_name}`
            employeeArr.push(newEmployee);
        });
        console.log(employeeArr);
        getTitles();
    });
};

function getTitles() {
    connection.query("SELECT * FROM employee_role", function(err, data) {
        if (err) throw err;
        data.forEach(element => {
            const title = element.title;
            titleArr.push(title);
        });
        console.log(titleArr)
        getDepartments();
    });

};

function getDepartments() {
    connection.query("SELECT * FROM department", function(err, data) {
        if (err) throw err;
        data.forEach(element => {
            const newDept = element.dep_name;
            departmentArr.push(newDept);

        });
        console.log(departmentArr)
        promptUser()
    });
};

// export functions
module.exports = {
    getDepartments,
    getTitles,
    getEmployees,
    departmentArr: departmentArr,
    titleArr: titleArr,
    employeeArr: employeeArr,
    questions: questions
};