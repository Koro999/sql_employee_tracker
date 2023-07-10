DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db; 

CREATE TABLE department (
    id INT NOT NULL, 
    debt_name VARCHAR(30)
    PRIMARY KEY (id)
)

CREATE TABLE roles (
    id INT NOT NULL,
    department_id INT,
    title VARCHAR(30),
    salary DECIMAL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
)

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT DEFAULT NULL,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
)