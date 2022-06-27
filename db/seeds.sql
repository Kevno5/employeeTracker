INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUE ("SalesLead", 50000.00, 1), ("Salesperson", 35000.00, 1), ("LeadDeveloper", 300000.00, 2), ("Lawyer", 200000.00, 4), ("Legal Team Lead", 700000.00, 4), ("Accountant", 70000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Thomas", "John", 1, 3), ("Greg", "Jefferson", 1, 1), ("Charlie", "Douglas", 3, 2), ("Steve", "Hardy", 5, 2), ("Jim", "James", 5, 2), ('Patricia', 'Anderson', 6, 3);
