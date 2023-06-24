const inquirer = require('inquirer');
const title = require('./lib/title.js');
const { mainMenu, subMenu, renderSubMenu,
        renderUpdateMenu, updateMenu }
        = require('./lib/user_interface.js');
const { viewDepartments, viewRoles, viewEmployees,
        addDept, addRole, db/*, addEmployee, updateEmployee*/}
         = require('./lib/queries.js');

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
                    //addDept(answer.input)
                    console.log(answer.option);
               });
                break;
            case "Add a role": 
                renderSubMenu('role title');
                renderSubMenu('role salary amount');
                renderSubMenu('role department');
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
                employeesArr = [];
                renderUpdateMenu('employee');
                inquirer.prompt(updateMenu).then(answer => {
                    updateEmployee(answer.option)
                });
                break;
            case 'Exit': process.exit();
            default: return;
        }
        //console.log(answer);
        init();
    }).catch((error) => {
        if (error) console.log(error)
    })
};



init();

