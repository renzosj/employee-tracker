const inquirer = require('inquirer');

const { title, chalker } = require('./lib/chalk.js');
const { mainMenu, renderSubMenu, renderUpdateMenu, updateMenu }
        = require('./lib/user_interface.js');
const { viewDepartments, viewRoles, viewEmployees, addDept,
         addRole, db/*, addEmployee, updateEmployee*/}
        = require('./lib/queries.js');

function init() {
    try {
        console.log(title);
        mainMenuPrompt(mainMenu);
    } catch (err) {
        console.error(err);
    }
};

function subMenuPrompt(questions, data) {
    return inquirer.prompt(questions).then(answer => {
        //addDept(answer.input)
        console.log(chalker("New " + data +  " added: " + answer.option));
    });
}

function mainMenuPrompt(questions) {
    inquirer.prompt(questions).then(answer => {
        let subMenu;
        switch (answer.option) {
            case "View all departments":
                viewDepartments()
                init();
            break;
            case "View all roles":
                viewRoles()
                init();
            break;
            case "View all employees":
                viewEmployees();
                init();
            break;
            case "Add a department": 
                subMenu = renderSubMenu('department');
                subMenu = subMenuPrompt(subMenu, 'department')
                    .then(() => init())
                    .catch((err) => {
                        console.error(err);
                        init();
                    });
            break;
            case "Add a role": 
                subMenu = renderSubMenu('role title');
                subMenu = subMenuPrompt(subMenu, 'role title')
                .then(() => {
                    subMenu = renderSubMenu('role salary');
                    subMenu = subMenuPrompt(subMenu, 'role salary')
                    .then(() => {
                        subMenu = renderSubMenu('role department');
                        subMenu = subMenuPrompt(subMenu, 'role department')
                        .then(() => init())
                        .catch((err) => {
                            console.error(err);
                            init();
                        })
                    })
                    .catch((err) => {
                        console.error(err);
                        init();
                    });
                })
                .catch((err) => {
                    console.error(err);
                    init();
                });
            break;
            case "Add an employee": 
                subMenu = renderSubMenu('employee first name');
                //console.log(subMenu);
                subMenu = subMenuPrompt(subMenu, 'employee first name')
                .then(() => {
                    subMenu = renderSubMenu('employee last name');
                    subMenu = subMenuPrompt(subMenu, 'employee last name')
                    .then(() => {
                        subMenu = renderSubMenu('employee role');
                        subMenu = subMenuPrompt(subMenu, 'employee role')
                        .then(() => {
                            subMenu = renderSubMenu('employee manager');
                            subMenu = subMenuPrompt(subMenu, 'employee manager')
                            .then(() => init())
                            .catch((err) => {
                                console.error(err);
                                init();
                            });
                        })
                        .catch((err) => {
                            console.error(err);
                            init();
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        init();
                    });
                })
                .catch((err) => {
                    console.error(err);
                    init();
                }); 
            break; 
            case "Update an employee role":
                console.log(chalker("Determine the employee id whose role will be updated")); 
                viewEmployees();
               /* employeesArr = [];
                renderUpdateMenu();
                inquirer.prompt(updateMenu).then(answer => {
                    updateEmployee(answer.option)
                });*/
                init();
            break;
            case 'Exit': process.exit();
            default: return;
        }
    }).catch((error) => {
        if (error) console.log(error)
    })
}

init();

