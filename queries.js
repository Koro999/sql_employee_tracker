//import mysql2 to access databases
const mysql = require('mysql2');
const initialize = require('./server')
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      //access the .env file to insert credentials
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
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

//main constructor class for viewing tables
class ViewAll {
    constructor(category) {
        this.category = category;
    }
    viewAll() {
    }
}

class ViewDepartments extends ViewAll {
    constructor(category) {
        super(category)
    }
    viewAll() {
        //query syntax for mysql2
        const sql = `SELECT department.id, department.debt_name ,roles.department_id FROM roles JOIN department ON department.id = roles.department_id`;
        //database query
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(`\b`)
            console.table(result);
            initialize.init();
        })
    }
}

class ViewRoles extends ViewAll {
    constructor(category) {
        super(category)
    }
    viewAll() {
        //query syntax for mysql2
        const sql = `SELECT * FROM roles`;
        //database query
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(`\b`)
            return console.table(result)
        })
    }
}

class ViewEmployees extends ViewAll {
    constructor(category) {
        super(category)
    }
    viewAll() {
        //query syntax for mysql2
        const sql = `SELECT * FROM employees`;
        //database query
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(`\b`)
            return console.table(result)
        })
    }
}

//export necessary functions/objects
module.exports = {ViewAll, ViewDepartments, ViewRoles, ViewEmployees}