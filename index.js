const inq = require('inquirer');
const express = require('express');

const mysql = require('mysql2');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',

    user: 'root',

    password: 'Kevno123',
    database: 'employee_info_db'
},
    console.log(`connected to the employee_info_db database.`)
);


function start() {
    inq
    .prompt({
        type: 'list',
        name: 'option',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'View All Departments',
            'Add Department'
        ],
        message: 'What would you like to do?'
    }).then(function(res) {
        console.log('You entered: ' + res.option);

        switch (res.option) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Quit':
                quit();


            
        }
    });
}


function viewAllEmployees() {

    let query = 'SELECT employee.first_name, employee.last_name, employee.manager_id, role.title FROM employee JOIN role ON role.id = employee.role_id';
    connection.query(query, function(err,res) {
        if(err) 
        throw err;
        console.table(res);
        start();
    })
}

function addEmployee() {
    inq.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'roleId',
            message: "What is the employee's role?"
        },
        {
            type: "input",
            name: 'managerId',
            message: "What is the manager id number?"
        }
    ]).then(function(answer) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [answer.firstName, answer.lastName, answer.roleId, answer.managerId], function(err,res){
            if (err) 
            throw err;
            console.table(res);
            start();
        });
    });
}

function updateEmployeeRole(){
    inq.prompt([
        {
            type: 'input',
            name: 'employeeUpdate',
            message: 'Which employee would you like to update?'
        },
        {
            type: 'input',
            name: 'roleUpdate',
            message: 'What role would you like to update the employee to?'
        }
    ]).then(function(answer){
        connection.query('UPDATE employee SET role_id=? WHERE first_name=?', [answer.roleUpdate,answer.employeeUpdate], function(err,res){
            if (err) 
            throw err;
            console.table(res);
            start();
        });
    });
}

function viewAllRoles() {
    let query = 'SELECT * FROM role';
    connection.query(query, function(err,res){
        if (err)
        throw err;
        console.table(res);
        start();
    });
}

function addRole() {
    inq.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: "What role would you like to add?"
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the department ID?'
        }
    ]).then(function(answer){
        connection.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [answer.newRole, answer.salary, answer.departmentId], function(err,res){
            if(err)
            throw err;
            console.table(res)
            start();
        })
    })
}

function viewAllDepartments() {
    let query = 'SELECT * FROM department';
    connection.query(query, function(err,res){
        if(err)
        throw err;
        console.table(res)
        start()
    });
}

function addDepartment() {
    inq.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'What department would you like to add?',
        }
    ]).then(function(answer){
        connection.query('INSERT INTO department (name) VALUES (?)', [answer.newDepartment], function(err,res){
            if(err)
            throw err;
            console.table(res)
            start()
        })
    })
}

function quit() {
    connection.end();
    process.exit();
}

start()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

// inq.prompt([{
//     type: 'input',
//     name: 'firstName',
//     message: 'What is your name?',
// },
// {
//     type: 'input',
//     name: 'employeeId',
//     message: 'What is your employee ID?',
// },
// {
//     type: 'input',
//     name: 'email',
//     message: 'What is your email address'
// },
// {
//     type: 'input',
//     name: 'officeNumber',
//     message: 'What is your office number?'
// }]);