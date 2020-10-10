// Employee Class 

const EmployeeRole = require("./employeeRole");

class Employee extends EmployeeRole {
    constructor(roleId, id, firstName, lastName) {
        super(roleId);
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    };
};

module.exports = Employee;