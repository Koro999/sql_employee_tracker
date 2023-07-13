//import inquirer library
//needed to downgrade to use require
const inquirer = require('inquirer')
//import queries.js for use here 
const queries = require('./queries')

//array holding choices for inquirer
const choices = [
    'View all departments', 
    'View all roles', 
    'View all employees', 
    'Add a department', 
    'Add a role', 
    'Add an employee',
    'Update an employee role'
]
//array holding question for inquirer
const question = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: choices,
        name: 'option'
    }
]

//init function
function init () {
    //break for formatting purposes
    console.log(`\b`)
    //start inquirer for user to select a field
    inquirer.prompt(question).then((response) => {
        //switch statement to check response and execute specific code 
        switch(response.option){
            //if view all departments is selected 
            case 'View all departments': {
                //create instance of queries.js and call specified function
                const viewDepartments = new queries.ViewDepartments()
                viewDepartments.viewAll();
                break;
            }
            //if view all roles is selected 
            case'View all roles': {
                const viewRoles = new queries.ViewRoles()
                viewRoles.viewAll();
                break;
            }
            //if view all employees is selected 
            case'View all employees': {
                const viewEmployees = new queries.ViewEmployees()
                viewEmployees.viewAll();
                break;
            }
            //if add a department is selected
            case'Add a department': {
                const addDepartment = new queries.AddDepartment()
                addDepartment.add();
                break;
            }
            //if add a role is selected 
            case'Add a role': {
                const addRole = new queries.AddRole()
                addRole.add();
                break;
            }
            //if add an employee is selected
            case'Add an employee':{            
                const addEmployee = new queries.AddEmployee()
                addEmployee.add();
                break;
            }
            //if update an employee role is selected
            case'Update an employee role':{
                const UpdateEmployeeRole = new queries.UpdateRole()
                UpdateEmployeeRole.update();
                break;
            }
            default: {
                console.log('switch working.')
            }
        }
    })
}
//call init
init();

//this export is required to call init inside the queries function to avoid overlapping issues in the console
//issue is happening because the table and inquirer function were being executed side by side
//by calling init() to loop inside the actual function, after the function accessing the db. This is avoided. 
exports.init = init;