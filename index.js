const inquirer = require('inquirer'); // get inquirer accesse

const askForInput = () => { // See what user wants to view or change
    return inquirer.prompt ([
        {
            type: 'list', 
            name: 'choice',
            message: 'What  would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee','Update an employee role',]
        },
    ]);
}

function init() { // Initialize the app
    askForInput() // Start prompt
        .then((input) => { // then get input
            
            // Determine what user wants to do
            switch(input.choice){ // Based upon choice, the code will do something
                case 'View all departments':
                    
                    break;
                case 'View all roles':
                    
                    break;
                case 'View all employees':
                    
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
init();