# employeeTracker
Command line application that uses mysql2 database to keep track of employees. In this app I have a schema and seed file that create and fill the database with some information. Once the app is started you can view / add employees, deparments, and roles. As well as update an employee role. This is all done using the npm packages inquirer (for prompts) and mysql2 (for the data). To display the results nicely I use the npm package "console.table." I query all the results using sql commands. 

## Installation

Make sure to have node js installed. I used the recommended version which is 20.10.0 LTS as of now. Also have mysql installed Log into mysql and run the schema file located in the db directory. After all that, in the terminal type "npm install" and hit enter. This should install all the npm packages used. Then just run the index js file.

## Usage

In the index js file make sure to change the password on line 10 to your mysql password. 

Follow how I did it in the video below to see it in action.

https://youtu.be/XnDZ4wfrHCU

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
