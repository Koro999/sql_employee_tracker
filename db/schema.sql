DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db; 

CREATE TABLE department (
    id INT NOT NULL, 
    debt_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL ,
    department_id INT,
    title VARCHAR(30),
    salary DECIMAL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL,
    manager_id INT DEFAULT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(department_id)
    ON DELETE SET NULL
);