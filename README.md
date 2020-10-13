# Employee-Tracker

![Contents](https://img.shields.io/github/languages/top/dan-gentile/employee-tracker)
![Last-Commit](https://img.shields.io/github/last-commit/dan-gentile/employee-tracker)
![License](https://img.shields.io/github/license/dan-gentile/employee-tracker)

## Description 

Employee Tracker is a Content Management System that allows Employers to manager their employees. This app will allow the user to create departments, Job Roles including salary and Employees. It will also allow to update an employee's role and remove an employee. The user will be able to view all employees or employees based on departments. All information is stored in a SQL database. This app uses inquire prompts to lead the user through the process. This app is built using Node.js, Express.js, Inquire NPM and MYSQL.

## Table of Contents

- [Title](#title)
- [Description](#description)
- [Technologies](#technologies)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Code Snippets](#code-snippets)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Technologies 

- [Node.js](https://nodejs.org/en/)
- [Inquirer npm](https://www.npmjs.com/package/inquirer)
- [Express.js](https://expressjs.com/)
- [MySql](https://www.mysql.com/)

## Installation 

Please Navigate to [Node.js](https://nodejs.org/en/) to download and install Node.

Next fork this repository. 

Once you have your forked repo open on your computer. 

Open the `index.js` file in your terminal.

Run the command `npm install`.

You should be ready to go! 

## Usage


Open `index.js` file in the terminal. 

Input `npm start` to begin. 

Follow prompts to generate your form. 

## Code Snippets
Update Employee Function
~~~
function updateEmployee(res1, res2) {
    connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [res1, res2], function(err, data) {
        if (err) throw err;
        console.log("Success!");
        promptUser();
    });
};
~~~

## License 

This license is [MIT](https://github.com/dan-gentile/employee-tracker/blob/master/LICENSE)

Copyright (c) 2020 Dan Gentile 

## Contributing 


1. Clone repo and create a new branch: 
~~~
$ git checkout -b name_for_new_branch.
~~~
2. Make changes and commit: 
~~~
$ git add . 
$ git commit -m "made changes"
~~~
3. Push to the branch:
~~~
$ git push
~~~
4. Submit Pull Request with comprehensive description of changes

## Questions 

If you have any questions and would like to get in touch please email me! 
email: dangentile@ymail.com