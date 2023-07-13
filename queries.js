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

// VIEW OBJECTS 
//main constructor class
class ViewAll {
  constructor(category) {
    this.category = category;
  }
  viewAll() {}
  add() {}
  update() {}
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
    const sql = `SELECT roles.id, roles.title, department.debt_name AS 'department', roles.salary
                    FROM department
                    JOIN roles
                    ON department.id = roles.department_id`
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


// ADD OBJECTS
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
    },
  },
];
//class to add a new department
class AddDepartment extends ViewAll {
  constructor(category) {
    super(category);
  }
  add() {
    inquirer.prompt(addDepartmentQuestions).then((response) => {
      //query syntax for mysql2
      const sql = `INSERT INTO department (debt_name) VALUES (?)`;
      //database query
      db.query(sql, response.department, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(`\b`);
        console.log(`${response.department} added to department database!`);
        initialize.init();
      });
    });
  }
}

//class to add a new role
class AddRole extends ViewAll {
  constructor(category) {
    super(category);
  }

  add() {
    //query the department database to grab a list of all current departments
    const sql = "SELECT * FROM department";
    db.query(sql, (error, result) => {
      //check for error
      if (error) {
        console.log(error);
        throw error;
      }
      console.log(result);
      //array holding all department names for inquirer
      //loop through the response and push each name into the departmentList array, used for inquirer
      const departmentList = result.map(({ id, debt_name }) => ({
        name: debt_name,
        value: id,
      }));

      console.log(departmentList);
      //array holding questions to add role
      const addRoleQuestions = [
        {
          type: "input",
          message: "Enter new role name",
          name: "role",
          validate: (addRole) => {
            if (addRole) {
              return true;
            } else {
              console.log("Please enter a role name");
              return false;
            }
          },
        },
        {
          type: "input",
          message: "Enter a salary for the role",
          name: "salary",
          validate: (addSalary) => {
            if (addSalary) {
              return true;
            } else {
              console.log("Please enter a salary for the role");
              return false;
            }
          },
        },
        {
          type: "list",
          message: "Choose the corresponding department",
          choices: departmentList,
          name: "department",
        },
      ];

      //prompt for role fields
      inquirer.prompt(addRoleQuestions).then((response) => {
        //this response has 3 values
        //role name, role salary, and the department w/ department id

        //need to start prepping for commit to db
        //variables storing response information
        
        let newRole = [response.role, response.salary, response.department];
        console.log (newRole)
        
        //query syntax for mysql2
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        //database query
        //console.log(typeof response.department) string
        db.query(sql, newRole, (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(`\b`);
          console.log(`${response.role} added to roles database!`);
          initialize.init();
        });
      });
    });
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
                name: first_name + " " + last_name,
                value: id,
              }));
              //add a none option to the choices
              managers.push({ name: "NONE", value: null });

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
                    console.log(
                      `${employeeInfo[0]} ${employeeInfo[1]} added to employee database!`
                    );
                    initialize.init();
                  });
                });
            });
          });
      });
    });
  }
}

// UPDATE CLASS 
class UpdateRole extends ViewAll {
    constructor(category) {
      super(category);
    }
    //update function
    update() {
        //query to grab employees id, first name, last name, role id
        let sql =`SELECT employees.id, employees.first_name, employees.last_name, roles.id AS "role_id"
               FROM employees, roles, department WHERE department.id = roles.department_id AND roles.id = employees.role_id`;
               
        db.query(sql, (err, result1) => {
            // if error do this 
            if (err){
                console.log(err)
                throw err
            }
            //Array holding the names of Employees to be used as options in inquirer
            //loop through pushing the full name of each employee to be used as choices
            let employeeNames = [];
            result1.forEach((employee) => {
                employeeNames.push(`${employee.first_name} ${employee.last_name}`);
            });

            //query to grab role id and role title 
            let sql =`SELECT roles.id, roles.title FROM roles`;
            db.query(sql, (err, result) => {
                //if error do this 
                if (err){
                    console.log(err)
                    throw err
                }
                //
                let roles = [];
                result.forEach((role) => {roles.push(role.title);});

                //variable holding questions to update roles 
                //newRoleEMployeeName, newChosenRole
                const roleUpdateQuestions = [
                    {
                        name: 'newRoleEmployeeName',
                        type: 'list',
                        message: 'Which employee has a new role?',
                        choices: employeeNames
                    },
                    {
                        name: 'newChosenRole',
                        type: 'list',
                        message: 'What is their new role?',
                        choices: roles
                    }
                ]
                //inquirer prompt to choose which employee and choose what is the new role
                inquirer.prompt(roleUpdateQuestions).then((response) => {
                    //newRoleEmployeeName, newChosenRole
                    let newRoleId, employeeId;

                    //go through 1st server query and make comparison, if match, save the employee.id
                    result1.forEach((employee) => {
                        if (response.newRoleEmployeeName === `${employee.first_name} ${employee.last_name}`) {                                                        
                            employeeId = employee.id;
                        }
                    });                    
                    //go through 2nd server query and make comparison, if the chosen response = to an existing title, save the role.id
                    result.forEach((role) => {
                        if (response.newChosenRole === role.title) {
                            newRoleId = role.id;
                        }
                    });

                    let sql1 =`UPDATE employees SET employees.role_id = ? WHERE employees.id = ?`;
                    db.query(sql1, [newRoleId, employeeId], (err) => {
                        //if error do this 
                        if (err){
                            console.log(err)
                            throw err
                        }
                    console.log(`${response.newRoleEmployeeName}'s role has been updated to ${response.newChosenRole}`)
                    initialize.init();
                    })
                })
            })
        })
    }
}

//export necessary functions/objects
module.exports = {
  ViewAll,
  ViewDepartments,
  ViewRoles,
  ViewEmployees,
  AddEmployee,
  AddDepartment,
  AddRole,
  UpdateRole
}
