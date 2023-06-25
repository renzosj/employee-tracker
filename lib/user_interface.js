 const mainMenu = {
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
    name: 'option',
    loop: false
};

const renderSubMenu = (newData) => {  
    return subMenu = {
        type: 'input',
        message: `Enter new ${newData} (no spaces allowed): `,
        name: 'option',
        validate: (input) => {
            if (/\s/.test(input)) {
                return 'Input should not contain any whitespace.'
            }
            return true;
        }
    }
};

var updateMenu;
const renderUpdateMenu = (data) => { 
    return updateMenu = {
        type: 'input',
        message: `- Enter employee ${data} you would like to update -`,
        name: 'option',
        loop: false
    }
};

module.exports = {mainMenu, renderSubMenu, renderUpdateMenu, updateMenu};




