 const mainMenu = {
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
    name: 'option',
    when: (answers) => {
        
    },
    loop: false
};
var subMenu;
const renderSubMenu = (newData) => {  
    subMenu = {
        type: 'input',
        message: `Enter the name of new ${newData}: `,
        name: 'option'
    }
};
var updateMenu;
const renderUpdateMenu = (data) => { 
    updateMenu = {
    type: 'list',
    message: '- Enter employee id you would like to update -',
    name: 'option',
    loop: false,
    choices: []  //spread operator
    }
};

module.exports = {mainMenu, subMenu, renderSubMenu, renderUpdateMenu, updateMenu};



