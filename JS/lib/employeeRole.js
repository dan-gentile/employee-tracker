// Employee Role Class 

const Department = require("./department");

class EmployeeRole extends Department {
    constructor(deptId, roleId, title, salary) {
        super(deptId);
        this.roleId = roleId;
        this.title = title;
        this.salary = salary;
    };
};

module.exports = EmployeeRole;