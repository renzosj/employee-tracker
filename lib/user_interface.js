 const mainMenu = {
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
    name: 'option',
    loop: false
};
var subMenu;
const renderSubMenu = (newData) =>  {  
    subMenu = {
        type: 'input',
        message: `Enter the name of new ${newData}: `,
        name: 'input'
    }
};

const updateMenu = {
    type: 'list' //spread operator
};

module.exports = {mainMenu, subMenu, renderSubMenu, updateMenu};



