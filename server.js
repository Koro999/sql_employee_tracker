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
    'Update an employee role']

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
            case'View all roles': {
                const viewRoles = new queries.ViewRoles()
                viewRoles.viewAll();
                break;
            }
            case'View all employees': {
                const viewEmployees = new queries.ViewEmployees()
                viewEmployees.viewAll();
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

exports.init = init;

            /*
            

            break; 
            case'Add a department': 

            break; 
            case'Add a role':

            break; 
            case'Add an employee':

            break; 
            case'Update an employee role':

            break; */