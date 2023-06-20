const inquirer = require('inquirer');
const title = require('./lib/title.js');
const { mainMenu, subMenu, renderSubMenu } = require('./lib/user_interface.js');
const { viewDepartments, viewRoles, viewEmployees,
        addDept, addRole, addEmployee, updateEmployee,
        db } = require('./lib/queries.js');

function init() {
    console.log(title);
    inquirer.prompt(mainMenu).then(answer => {
        switch (answer.option) {
            case "View all departments":
                viewDepartments()
                break;
            case "View all roles":
                viewRoles()
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department": 
                renderSubMenu('department');
                inquirer.prompt(subMenu).then(answer => {
                    addDept(answer.input)
                });
                break;
            case "Add a role": 
                renderSubMenu('role');
                inquirer.prompt(subMenu).then(answer => {
                    addRole(answer.input)
                });
            case "Add an employee": 
                renderSubMenu('employee');
                inquirer.prompt(subMenu).then(answer => {
                    addEmployee(answer.input)
                });
            case "Update an employee": 
                viewEmployees();
                renderSubMenu('employee');
                inquirer.prompt(subMenu).then(answer => {
                    updateEmployee(answer.input)
                });
                break;
            case 'Exit': return;
            default: return;
        }
        //console.log(answer);
        init();
    }).catch((error) => {
        if (error) console.log(error)
    })
};



init();

