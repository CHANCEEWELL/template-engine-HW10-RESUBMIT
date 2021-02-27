const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
function init() {
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
    function makeManager() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your managers name?",
                name: "name",
            },
            {
                type: "input",
                message: "What is your managers Id number?",
                name: "id",
            },
            {
                type: "input",
                message: "What is your managers email?",
                name: "email",
            },
            {
                type: "input",
                message: "What is your managers Office Number?",
                name: "officeNumber",
            }
        ]).then(answer => {
            const manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber)
            teamMembers.push(manager);
            generateTeam();
        })
    }

    function createEngineer() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your engineers name?",
                name: "name",
            },
            {
                type: "input",
                message: "What is your engineers Id number?",
                name: "id",
            },
            {
                type: "input",
                message: "What is your engineers email?",
                name: "email",
            },
            {
                type: "input",
                message: "What is your engineers Github Username?",
                name: "github",
            }
        ]).then(answer => {
            const engineer = new Engineer(answer.name, answer.id, answer.email, answer.github)
            teamMembers.push(engineer);
            generateTeam()
        })
    }

    function createIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your interns name?",
                name: "name",
            },
            {
                type: "input",
                message: "What is your interns Id number?",
                name: "id",
            },
            {
                type: "input",
                message: "What is your interns email?",
                name: "email",
            },
            {
                type: "input",
                message: "What school did your intern attend?",
                name: "school",
            }
        ]).then(answer => {
            const intern = new Intern(answer.name, answer.id, answer.email, answer.school)
            teamMembers.push(intern);
            generateTeam()
        })
    }


    function generateTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "teamChoice",
                message: "Do you want to add more team members?",
                choices: ["Engineer", "Intern", "None"],
            }
        ]).then(answer => {
            switch (answer.teamChoice) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                default:
                    makeTeam()
            }
        })
    }

    function makeTeam() {

        fs.writeFile(outputPath, render(teamMembers), function () {

        })
    }

    makeManager();
}
init();
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