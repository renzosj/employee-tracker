const mysql = require('mysql2');
require('dotenv').config();

try {
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    db.connect((err) => {
        if (err) {
            console.error('Failed to connect to the database:', err);
        } else {
            console.log(`Connected to ${process.env.DB_NAME}`);
        }
    });
} catch (error) {
    console.error('An error occurred during the database connection:', error + '\n Please exit the program');
}

// create Query class that contains all db query methods
class Query {
    constructor() {}
    // Use .promise() to upgrade queries to return promises
    viewDepartments() {
        return db.promise().query('SELECT id AS Department_id, name AS Department FROM department')
        .then(([rows, fields]) => renderTable(rows))
        .catch((err) => console.error(err));
    }
    viewRoles() {
        return db.promise().query('SELECT role.id AS Role_id, title AS Job_Title, department.name AS Department, salary AS Salary FROM role AS Role JOIN department ON role.department_id = department.id')
        .then(([rows, fields]) => renderTable(rows))
        .catch((err) => console.error(err));
    }
    viewEmployees() {
        return db.promise().query('SELECT employee.id AS Employee_id, first_name AS First_Name, last_name AS Last_Name, manager_id AS Manager_id, role.title AS Job_Title, salary AS Salary, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id')
        .then(([rows, fields]) => renderTable(rows))
        .catch((err) => console.error(err));
    }
    addDepartment(name) {
        return db.promise().query(`INSERT INTO department (name) VALUES ("${name}")`)
        .then(([rows, fields]) => renderTable(rows))
        .catch((err) => console.error(err));
    }
    addRole(title, salary, department_id) {
        // work on validating inputs, dept id has to match, consider new prompts
        return db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${title}", ${salary}, ${department_id})`)
        .then(([rows, fields]) => renderTable(rows))
        .catch((err) => console.error(err));
    }
    addEmployee(firstName, lastName, role_id, manager_id) {
        return db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${role_id}, ${manager_id})`)
        .then(([rows, fields]) => renderTable(rows))
        .catch((err) => console.error(err));
    }
    updateEmployee(employee_id, role_id) {
        return db.promise().query(`UPDATE employee SET employee.role_id = ${role_id} WHERE employee.id = ${employee_id}`)
        .then(([rows, fields]) => renderTable(rows))
        .catch((err) => console.error(err));
    }
    viewEmployeesById() {
        return db.promise().query(`SELECT employee.id AS Employee_id, first_name AS First_Name, last_name AS Last_Name, role.title AS Job_Title, role_id AS Role_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id`)
        .then(([rows, fields]) => renderTable(rows))
        .catch((err) => console.error(err));
    }
}

// instantiate Query object to export
const dbQuery = new Query();

const renderTable = (results) => {
    console.log("\n");
    console.table(results);
};

module.exports = {dbQuery};