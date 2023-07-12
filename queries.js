//import mysql2 to access databases
const mysql = require("mysql2");
const initialize = require("./server");
const inquirer = require("inquirer");
require("dotenv").config();

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    //access the .env file to insert credentials
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to ${process.env.DB_NAME} database.`)
);
/*
'View all departments', 
'View all roles', 
'View all employees', 

'Add a department', 
'Add a role', 
'Add an employee',

'Update an employee role'
*/

//main constructor class
class ViewAll {
  constructor(category) {
    this.category = category;
  }
  viewAll() {}
  add() {}
}

//class for viewing all departments
class ViewDepartments extends ViewAll {
  constructor(category) {
    super(category);
  }
  viewAll() {
    //query syntax for mysql2
    const sql = `SELECT department.id, department.debt_name AS 'department' FROM department`;
    //database query
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`\b`);
      console.table(result);
      initialize.init();
    });
  }
}

//class for viewing all roles
class ViewRoles extends ViewAll {
  constructor(category) {
    super(category);
  }
  viewAll() {
    //query syntax for mysql2
    const sql = `SELECT roles.title, employees.role_id, department.debt_name AS 'department', roles.salary
                    FROM department
                    JOIN roles
                    ON department.id = roles.department_id
                    JOIN employees
                    ON roles.id = employees.role_id `;
    //database query
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`\b`);
      console.table(result);
      initialize.init();
    });
  }
}

//class for viewing all employees
class ViewEmployees extends ViewAll {
  constructor(category) {
    super(category);
  }
  viewAll() {
    //query syntax for mysql2
    const sql = `SELECT employees.role_id, employees.first_name, employees.last_name, roles.title, department.debt_name AS 'department', roles.salary, employees.manager_id
                    FROM department
                    JOIN roles
                    ON department.id = roles.department_id
                    JOIN employees
                    ON roles.id = employees.role_id `;
    //database query
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`\b`);
      console.table(result);
      initialize.init();
    });
  }
}
//array holding questions to add department
const addDepartmentQuestions = [
    {
        type: "input",
        message: "Enter new department name",
        name: "department",
        validate: (addDepartment) => {
          if (addDepartment) {
            return true;
          } else {
            console.log("Please enter a department name");
            return false;
          }
        }
    }
]
class AddDepartment extends ViewAll {
    constructor(category) {
      super(category);
    }
    add() {
        inquirer.prompt(addDepartmentQuestions).then(response => {
            //query syntax for mysql2
            const sql = `INSERT INTO department (debt_name) VALUES (?)`;
            //database query
            //console.log(typeof response.department) string 
            db.query(sql, response.department, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(`\b`);
                console.log(`${response.department} added to department database!`);
                initialize.init();            
            })
        })
    }
}

//array holding employee questions
const addEmployeeQuestions = [
  {
    type: "input",
    message: "Enter employee's first name",
    name: "firstName",
    validate: (addFirstName) => {
      if (addFirstName) {
        return true;
      } else {
        console.log("Please enter a first name");
        return false;
      }
    },
  },
  {
    type: "input",
    message: "Enter employee's last name",
    name: "lastName",
    validate: (addLastName) => {
      if (addLastName) {
        return true;
      } else {
        console.log("Please enter a last name");
        return false;
      }
    },
  },
];
// class to add values into table
class AddEmployee extends ViewAll {
  constructor(category) {
    super(category);
  }
  add() {
    //prompt for first and last name
    inquirer.prompt(addEmployeeQuestions).then((response) => {
      //array storing values to be pushed into the table
      const employeeInfo = [response.firstName, response.lastName];

      //query into sql to grab role title and role id
      const roleSql = `SELECT roles.title, roles.id FROM roles`;
      db.query(roleSql, (error, result) => {
        //if error throw error
        if (error) {
          console.log(error);
          throw error;
        }

        //map loops through the array, and returns an array suitable for inquirer
        const roles = result.map(({ title, id }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt([
            {
              type: "list",
              message: "Choose employee's role",
              choices: roles,
              name: "role",
            },
          ])
          .then((roleChoice) => {
            //add selected role to the final array
            employeeInfo.push(roleChoice.role);

            //query the database  to grab employees
            const managerSql = `SELECT * FROM employees`;
            db.query(managerSql, (error, data) => {
              //if error throw error
              if (error) {
                console.log(error);
                throw error;
              }

              //map through array to return array that works for choices
              const managers = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name, value: id,
              }));
              //add a none option to the choices 
              managers.push({name: 'NONE', value: null})

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Choose employee's manager",
                    choices: managers,
                  },
                ])
                .then((managerChoice) => {
                  //add selected role to the final array
                  employeeInfo.push(managerChoice.manager);

                  //query syntax for mysql2
                  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                  //database query
                  db.query(sql, employeeInfo, (err, result) => {
                    if (err) {
                      console.log(err);
                    }
                    console.log(`\b`);
                    console.log(`${employeeInfo[0]} ${employeeInfo[1]} added to employee database!`);
                    initialize.init();
                  });
                });
            });
          });
      });
    });
  }
}

//export necessary functions/objects
module.exports = {
  ViewAll,
  ViewDepartments,
  ViewRoles,
  ViewEmployees,
  AddEmployee,
  AddDepartment
};
