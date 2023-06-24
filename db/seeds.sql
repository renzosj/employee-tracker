INSERT INTO department (id, name)
VALUES (001, "Board of Directors"),
       (002, "Accounting and Finance"),
       (003, "Marketing"),
       (004, "Business Development"),
       (005, "HR"),
       (006, "IT"),
       (007, "UX/UI"),
       (008, "Customer Service");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "CEO", 0.99, 001),
       (002, "CFO", 0.98, 001),
       (003, "Marketing VP", 5.00, 003),
       (004, "Accountant", 100.00, 002),
       (005, "HR Rep", 45.00, 005),
       (006, "IT Technician", 500.55, 006),
       (007, "Business Dev VP", 0.50, 004),
       (008, "Junior Programmer", 2.00, 007),
       (009, "Senior Product Designer", 8.00, 007),
       (010, "Receptionist", 12.00, 008);

INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUES (001, "Elon", "Gate", null, 001),
       (002, "Wade", "Wilson", 001, 002),
       (003, "Jenna", "Worble", 001, 003),
       (004, "Peter", "Rider", 002, 004),
       (005, "Mary", "Joo-wana", 001, 005),
       (006, "Pam", "Beasley", 003, 010),
       (007, "Michel", "Zaki", 001, 009),
       (008, "Tony", "Stank", 007, 008),
       (009, "Lickey", "Louse", 001, 007),
       (010, "Stanley", "Crudson", 002, 004),
       (011, "Connor", "Connorsson", 007, 006);