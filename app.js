//Required files and modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Array that will hold the objects we create with the prompts.
var employees = []


//Inital function to prompt the user to enter Manager info. This will then call the function to let the user input more team members.
function addManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is this team managers name?",
            name: "manName"
        },
        {
            type: "input",
            message: "Assign an ID number for the manager",
            name: "manID"
        },
        {
            type: "input",
            message: "Provide an email for the manager",
            name: "manEmail"
        },
        {
            type: "input",
            message: "What is your office number?",
            name: "manOfficeNumber"
        }
    ]).then(userInput => {
        console.log(userInput);

        const manager = new Manager(userInput.manName, userInput.manID, userInput.manEmail, userInput.manOfficeNumber)

        employees.push(manager)
        createTeam();
    })
}


//Function used to create rest of the team members. Using a switch to call specified team member functions. When no more members is selected, the html file is rendered then written.
function createTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "empType",
            message: "Add a team member:",
            choices: ["Engineer", "Intern", "No more members"]
        }])
        .then(userInput => {
            switch (userInput.empType) {

                case "Engineer":
                    addEngineer();
                    break;

                case "Intern":
                    addIntern();
                    break;

                case "No more members":
                    let html = render(employees)
                    fs.writeFile(outputPath, html, (err) => {
                        if (err) throw err;
                        console.log('The html has been created.');
                    });
                    break
            }
        })
    // These two functions will call the team member function after they input member info.
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is this team members name?",
                name: "engName"
            },
            {
                type: "input",
                message: "Assign an ID number for this employee",
                name: "engID"
            },
            {
                type: "input",
                message: "Provide an email for this team member",
                name: "engEmail"
            },
            {
                type: "input",
                message: "What is your GitHub username?",
                name: "gitUsername"
            }
        ]).then(userInput => {
            console.log(userInput);

            const engineer = new Engineer(userInput.engName, userInput.engID, userInput.engEmail, userInput.gitUsername)

            employees.push(engineer)
            createTeam();
        })
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is this team members name?",
                name: "intName"
            },
            {
                type: "input",
                message: "Assign an ID number for this employee",
                name: "intID"
            },
            {
                type: "input",
                message: "Provide an email for this team member",
                name: "intEmail"
            },
            {
                type: "input",
                message: "What is your alma mater?",
                name: "intSchool"
            }
        ]).then(userInput => {
            console.log(userInput);

            const intern = new Intern(userInput.intName, userInput.intID, userInput.intEmail, userInput.intSchool)

            employees.push(intern)
            createTeam();
        })
    }
}

addManager()