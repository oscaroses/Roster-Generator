const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var theTeam = []

function createTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "What type of team member are you?",
            choices: ["Manager", "Engineer", "Intern", "No more employees"]
        }])
        .then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Manager":
                    addManager();
                    break;

                case "Engineer":
                    addEngineer();
                    break;

                case "Intern":
                    addIntern();
                    break;

                case "Finish.":
                    render(theTeam);
                    break
            }
        })

    function addManager() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is this team members name",
                name: "managerName"
            },
            {
                type: "input",
                message: "Assign an ID number for this employee",
                name: "managerID"
            },
            {
                type: "input",
                message: "Provide an email for this team member",
                name: "managerEmail"
            },
            {
                type: "input",
                message: "What is your office number?",
                name: "managerOfficeNumber"
            }
        ]).then(userChoice => {
            console.log(userChoice);

            const manager = new Manager(userChoice.managerName, userChoice.managerID, userChoice.managerEmail, userChoice.managerOfficeNumber)

            theTeam.push(manager)
            createTeam();
        })
    }


    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is this team members name?",
                name: "engineerName"
            },
            {
                type: "input",
                message: "Assign an ID number for this employee",
                name: "engineerID"
            },
            {
                type: "input",
                message: "Provide an email for this team member",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "What is your GitHub username?",
                name: "gitHubUsername"
            }
        ]).then(userChoice => {
            console.log(userChoice);

            const engineer = new Engineer(userChoice.engineerName, userChoice.engineerID, userChoice.engineerEmail, userChoice.gitHubUsername)

            theTeam.push(engineer)
            createTeam();
        })
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is this team members name?",
                name: "internName"
            },
            {
                type: "input",
                message: "Assign an ID number for this employee",
                name: "internID"
            },
            {
                type: "input",
                message: "Provide an email for this team member",
                name: "internEmail"
            },
            {
                type: "input",
                message: "What is your alma mater?",
                name: "internSchool"
            }
        ]).then(userChoice => {
            console.log(userChoice);

            const intern = new Intern(userChoice.internName, userChoice.internID, userChoice.internEmail, userChoice.internSchool)

            theTeam.push(intern)
            createTeam();
        })
    }
}

createTeam()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
