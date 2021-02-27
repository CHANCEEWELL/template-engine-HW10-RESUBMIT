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
