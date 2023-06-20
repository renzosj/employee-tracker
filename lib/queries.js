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
    console.log("\n\n\n\n\n\n\nPress arrow keys to continue...");
};

const viewDepartments = () =>
 db.query('SELECT * FROM department', (err, results) => {
    renderTable(results);
});

const viewRoles = () =>
 db.query('SELECT * FROM role JOIN department ON role.department_id = department.id', (err, results) => {
    renderTable(results);
});

const viewEmployees = () =>
 db.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id', (err, results) => {
    renderTable(results);
});

const addDept = (dept_name) =>
 db.query(`INSERT INTO department (id, name) VALUES (${dept_name})`, (err, results) => {
    renderTable(results);
 });

module.exports = {viewDepartments, viewRoles, viewEmployees, addDept, addRole, addEmployee, updateEmployee, db};