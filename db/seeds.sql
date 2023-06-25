INSERT INTO department (name)
VALUES ("Board of Directors"),
       ("Accounting and Finance"),
       ("Marketing"),
       ("Business Development"),
       ("HR"),
       ("IT"),
       ("UX/UI"),
       ("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 0.99, 001),
       ("CFO", 0.98, 001),
       ("Marketing VP", 5.00, 003),
       ("Accountant", 100.00, 002),
       ("HR Rep", 45.00, 005),
       ("IT Technician", 500.55, 006),
       ("Business Dev VP", 0.50, 004),
       ("Junior Programmer", 2.00, 007),
       ("Senior Product Designer", 8.00, 007),
       ("Receptionist", 12.00, 008);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("Elon", "Gate", null, 001),
       ("Wade", "Wilson", 001, 002),
       ("Jenna", "Worble", 001, 003),
       ("Peter", "Rider", 002, 004),
       ("Mary", "Joo-wana", 001, 005),
       ("Pam", "Beasley", 003, 010),
       ("Michel", "Zaki", 001, 009),
       ("Tony", "Stank", 007, 008),
       ("Lickey", "Louse", 001, 007),
       ("Stanley", "Crudson", 002, 004),
       ("Connor", "Connorsson", 007, 006); 