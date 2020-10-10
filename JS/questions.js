// Array for all of the questions
const questions = [{
        name: "choice",
        message: "What would you like to do?",
        type: "list",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Quit Application"
        ]
    },
    {
        name: "dept",
        message: "Which department do you want to search by?",
        type: "list",
        choices: [
            "Marketing",
            "Engineering",
            "Sales",
            "Admin"
        ],
        when: function(answers) {
            if (answers.choice === "View All Employees by Department") {
                return true
            } else {
                return false
            };
        }
    },
    {
        name: 'firstName',
        message: "What is employee's first name?",
        type: "input",
        when: function(answers) {
            if (answers.choice === "Add Employee") {
                return true
            } else {
                return false
            };
        }
    },
    {
        name: 'lastName',
        message: "What is employee's last name?",
        type: "input",
        when: function(answers) {
            if (answers.choice === "Add Employee") {
                return true
            } else {
                return false
            };
        }
    },
    {
        name: 'title',
        message: "What is employee's department?",
        type: "input",
        when: function(answers) {
            if (answers.choice === "Add Employee" || answers.choice === "Update Employee Role") {
                return true
            } else {
                return false
            };
        }
    },

];



// exporting the array
module.exports = {
    questions: questions
}