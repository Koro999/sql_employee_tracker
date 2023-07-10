//import inquirer library
//needed to downgrade to use require
const inquirer = require('inquirer')

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
    inquirer.prompt(question).then(response =>{
        switch(response){
            case'View all departments':
            
            break; 
            case'View all roles':

            break; 
            case'View all employees':

            break; 
            case'Add a department': 

            break; 
            case'Add a role':

            break; 
            case'Add an employee':

            break; 
            case'Update an employee role':

            break; 
        }

    })
}

//call init
init();