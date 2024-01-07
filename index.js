const mysql = require('mysql2'); // Import and require mysql2
const inquirer = require('inquirer'); // get inquirer accesse
const cTable = require('console.table'); // used to display data tables nicer

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db',
    },
    console.log(`Connected to the employee_db database.`)
);

function viewEmployees(){
    const sql = 
    `SELECT employee.id,
        CONCAT(employee.first_name, ' ',employee.last_name) AS Name,
        role.title AS Title,
        department.department_name AS Department,
        role.salary AS Salary,
        CONCAT(Manager.first_name,' ',Manager.last_name) AS Manager
    FROM employee 
    INNER JOIN role ON employee.role_id=role.id
    INNER JOIN department ON role.department_id=department.id
    LEFT JOIN employee Manager ON Manager.id = employee.manager_id`; // create query statement
    

    db.query(sql, (err, result) => { // applay query
        if(err) throw err;
        console.table(result); // display results
        startPrompt(); // start prompt again
    });

    return;
}

function viewRoles(){
    const sql = 'SELECT role.id,role.title AS Title,role.salary AS Salary,department.department_name AS Department FROM role INNER JOIN department ON role.department_id=department.id'; // create query statement

    db.query(sql, (err, result) => { // applay query
        if(err) throw err;
        console.table(result); // display results
        startPrompt(); // start prompt again
    });

    return;
}

function viewDepartments(){
    const sql = 'SELECT id,department_name AS Department FROM department'; // create query statement

    db.query(sql, (err, result) => { // applay query
        if(err) throw err;
        console.table(result); // display results
        startPrompt(); // start prompt again
    });

    return;
}

const askForInput = () => { // See what user wants to view or change
    return inquirer.prompt ([
        {
            type: 'list', 
            name: 'choice',
            message: 'What  would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee','Update an employee role',]
        }
    ]);
}

function startPrompt() { // Initialize the app
    askForInput() // Start prompt
        .then((input) => { // then get input
            
            // Determine what user wants to do
            switch(input.choice){ // Based upon choice, the code will do something
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    
                    break;
                case 'Add a role':
                    
                    break;
                case 'Add an employee':
                    
                    break;
                case 'Update an employee role':
                    
                    break;
                default:
                    console.log("Something went wrong...");
            }
            
        });
   
}


// Function call to initialize app
startPrompt();
