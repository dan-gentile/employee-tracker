DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL,
    dep_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee_role(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30)NOT NULL,
    salary DEC(10,2) NOT NULL,
    department_id INT NOT NULL, 
    FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES employee_role(id),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    PRIMARY KEY(id)
);


-- Start Values for Departments
INSERT INTO department(dep_name)
VALUES
("Marketing"),
("Engineering"),
("Sales"),
("Admin");

-- Start Values for Employee Roles w/ Salary 
INSERT INTO employee_role(title, salary, department_id)
VALUES
("Head of Marketing", 150000, 1),
("Marketing Manager", 85000, 1),
("Marketing Analyst", 65000, 1);

INSERT INTO employee_role(title, salary, department_id)
VALUES
("Lead Engineer", 150000, 2),
("Engineer", 85000, 2),
("JR Engineer", 65000, 2);

INSERT INTO employee_role(title, salary, department_id)
VALUES
("Head of Sales", 150000, 3),
("Sales Person", 85000, 3),
("Sales Assistant", 65000, 3);

INSERT INTO employee_role(title, salary, department_id)
VALUES
("CEO", 250000, 4),
("CFO", 225000, 4),
("Admin Assistant", 65000, 4);

INSERT INTO employee(first_name, last_name, role_id)
VALUES 
("John", "DOE", 10);

INSERT INTO employee(first_name, last_name, role_id)
VALUES 
("Billy", "Goat", 6);