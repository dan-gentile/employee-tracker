// Employee Class 

const EmployeeRole = require("./employeeRole");

class Employee extends EmployeeRole {
    constructor(deptId, deptName, roleId, title, salary, id, firstName, lastName) {
        super(deptId, deptName, roleId, title, salary);
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    };
};

module.exports = Employee;