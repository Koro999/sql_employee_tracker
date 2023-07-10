const inquirer = require('inquirer')

const choices = [
    'View all departments', 
    'View all roles', 
    'View all employees', 
    'Add a department', 
    'Add a role', 
    'Add an employee',
    'Update an employee role']
    
const options = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: choices,
        name: options
    }
]