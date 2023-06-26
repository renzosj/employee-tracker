const inquirer = require('inquirer');

const { title, chalker } = require('./lib/chalk.js');
const { mainMenu, renderAddMenu, renderUpdateMenu }
        = require('./lib/user_interface.js');
const {dbQuery} = require('./lib/queries.js');

function init() {
    try {
        mainMenuPrompt(mainMenu);
    } catch (err) {
        console.error(err);
    }
};
var input = [];
function storeInput(data) {
    input.push(data);
    return;
}

function addMenuPrompt(questions, data) {
    return inquirer.prompt(questions)
    .then(answer => {
        console.log(chalker("New " + data +  " added: " + answer.option));
        storeInput(answer.option);
    })
    .catch((err) => console.log(err));
}

function updateMenuPrompt(questions, data) {
    return inquirer.prompt(questions)
    .then(answer => {
        console.log(chalker(data + " id to be updated " + answer.option));
        storeInput(answer.option);
    })
    .catch((err) => console.log(err));
}

function mainMenuPrompt(questions) {
    inquirer.prompt(questions).then(answer => {
        let addMenu;
        switch (answer.option) {
            case "View all departments":
                dbQuery.viewDepartments()
                .then(() => init())
            break;
            case "View all roles":
                dbQuery.viewRoles()
                .then(()=> init())
            break;
            case "View all employees":
                dbQuery.viewEmployees()
                .then(() => init())
            break;
            case "Add a department":
                input = []; 
                addMenu = renderAddMenu('department');
                addMenuPrompt(addMenu, 'department')
                    .then(() => {
                        dbQuery.addDepartment(input[0])
                        .then(() => init())
                    })
                    .catch((err) => {
                        console.error(err);
                        init();
                    });
            break;
            case "Add a role": 
                input = [];
                addMenu = renderAddMenu('role title');
                addMenu = addMenuPrompt(addMenu, 'role title')
                .then(() => {
                    addMenu = renderAddMenu('role salary');
                    addMenu = addMenuPrompt(addMenu, 'role salary')
                    .then(() => {
                        addMenu = renderAddMenu('role department id');
                        addMenu = addMenuPrompt(addMenu, 'role department id')
                        .then(() => {
                            dbQuery.addRole(...input)
                            .then(() => init())
                        })
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
                input = [];
                addMenu = renderAddMenu('employee first name');
                //console.log(addMenu);
                addMenu = addMenuPrompt(addMenu, 'employee first name')
                .then(() => {
                    addMenu = renderAddMenu('employee last name');
                    addMenu = addMenuPrompt(addMenu, 'employee last name')
                    .then(() => {
                        addMenu = renderAddMenu('employee role id');
                        addMenu = addMenuPrompt(addMenu, 'employee role id')
                        .then(() => {
                            addMenu = renderAddMenu('employee manager id');
                            addMenu = addMenuPrompt(addMenu, 'employee manager id')
                            .then(() => {
                                dbQuery.addEmployee(...input)
                                .then(() => init())
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
                })
                .catch((err) => {
                    console.error(err);
                    init();
                }); 
            break; 
            case "Update an employee role":
                input = [];
                console.log(chalker("Note the employee id and the id of their role to be updated")); 
                dbQuery.viewEmployeesById();
                let updateMenu = renderUpdateMenu('employee id');
                updateMenuPrompt(updateMenu, 'employee id')
                .then(() => {
                    updateMenu = renderUpdateMenu('role id');
                    updateMenuPrompt(updateMenu, 'role id')
                    .then(() => {
                        dbQuery.updateEmployee(...input)
                        .then(() => init())
                    })
                    .catch((err) => {
                        console.error(err);
                        init();
                    })
                })
                .catch((err) => {
                    console.error(err);
                    init();
                })
            break;
            case 'Exit': process.exit();
            default: return;
        }
    })
    .catch((error) => {
        if (error) console.log(error)
    })
}

console.log(title); // Welcome to Employee Manager
init();

