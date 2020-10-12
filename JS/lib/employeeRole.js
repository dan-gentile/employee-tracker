// Employee Role Class 

const Department = require("./department");

class EmployeeRole extends Department {
    constructor(deptId, deptName, roleId, title, salary) {
        super(deptId, deptName);
        this.roleId = roleId;
        this.title = title;
        this.salary = salary;
    };
};

module.exports = EmployeeRole;