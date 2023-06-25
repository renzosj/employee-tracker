const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to ${process.env.DB_NAME}`)
);

const renderTable = (results) => {
    console.log("\n");
    console.table(results);
    console.log("\n\n\n\n\n\n\nPress up or down arrow keys to continue...");
};

// Use .promise() to upgrade queries to return promises
const viewDepartments = () =>
    db.promise().query('SELECT id AS Department_id, name AS Department FROM department')
    .then(([rows, fields]) => renderTable(rows))
    .catch((err) => console.error(err));

const viewRoles = () =>
    db.promise().query('SELECT role.id AS Role_id, title AS Job_Title, department.name AS Department, salary AS Salary FROM role AS Role JOIN department ON role.department_id = department.id')
    .then(([rows, fields]) => renderTable(rows))
    .catch((err) => console.error(err));
    
const viewEmployees = () =>
    db.promise().query('SELECT employee.id AS Employee_id, first_name AS First_Name, last_name AS Last_Name, manager_id AS Manager_id, role.title AS Job_Title, salary AS Salary, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id')
    .then(([rows, fields]) => renderTable(rows))
    .catch((err) => console.error(err));

const addDept = (name) =>
    db.promise().query(`INSERT INTO department (name) VALUES (${name})`)
    .then(([rows, fields]) => renderTable(rows))
    .catch((err) => console.error(err));

const addRole = (title, salary, department_id) =>
    db.promise().query(`INSERT INTO role (title, salary, departmend_id) VALUES (${title}, ${salary}, ${department_id})`)
    .then(([rows, fields]) => renderTable(rows))
    .catch((err) => console.error(err));

const addEmployee = (name) =>
    db.promise().query(`INSERT INTO employee (name) VALUES (${name})`)
    .then(([rows, fields]) => renderTable(rows))
    .catch((err) => console.error(err));

const updateEmployee = (employee_id, role_id) =>
    db.promise().query(`UPDATE employee SET role_id = ${role_id} WHERE employee_id = ${employee_id}`)
    .then(([rows, fields]) => renderTable(rows))
    .catch((err) => console.error(err));

module.exports = {viewDepartments, viewRoles, viewEmployees, addDept, addRole, db, addEmployee, updateEmployee};