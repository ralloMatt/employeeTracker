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

const addEmployee = async () => {
    const newEmployee = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What new Employee will be joining us?"
       },
     ]);
    console.log(newEmployee.name + ' will be added');
    startPrompt(); // start prompt again
}

const findDepartmentId = async (department) => {
    const sql = 'SELECT id FROM department WHERE department_name=' + department; // create query statement
    let id = 0;
    console.log(sql);

    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }  
        console.log('hi ' + result);
        
    });

    //console.log('id is ' + id);
    return id;
}

const insertRoleIntoDatabase = async (departmentList) => {
    const newRole = await inquirer.prompt([ // ask questions
    {
      type: "input",
      name: "title",
      message: "What new Role would you like to create?"
   },
   {
    type: "input",
    name: "salary",
    message: "What what is the Salary of this Role?"
    },
    {
        type: "list",
        name: "department",
        message: "What what is the Department of this Role?",
        choices: departmentList
    }
    ]);

    const deptId = findDepartmentId(newRole.department);
    console.log(deptId + ' will be added');



    //startPrompt();
}

const addRole = async () => { // add a role

    // Get an array of departments
    const sql = 'SELECT department_name FROM department'; // create query statement
    const departmentList = [];

    db.query(sql, (err, result) => {
        if(err) throw err;
        result.forEach((element) =>
            //console.log(element.department_name)
            departmentList.push(element.department_name)
        );
        insertRoleIntoDatabase(departmentList);
        
    });
}
const addDepartment = async () => { // add a department
    const newDepartment = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What new Department would you like to add?"
       },
     ]);

    const sql = 'INSERT INTO department (department_name) VALUES (?)';

    db.query(sql, newDepartment.name, (err, result) => {
        if(err) throw err;
        console.log(newDepartment.name + ' has been added to database.');
        startPrompt(); // start prompt again
    });
}

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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee','Update an employee role', 'Exit']
        }
    ]);
}

function endProgram() {  // used to end program
    db.end(); // close connection to database
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
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    
                    break;
                case 'Exit':
                    console.log("See ya next time.");
                    endProgram(); // used to end program
                    break;
                default:
                    console.log("Something went wrong...");
            }
        });
}


// Function call to initialize app
startPrompt();
