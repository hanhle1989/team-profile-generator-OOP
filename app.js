const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.resolve(__dirname, "profiles");
const outputPath = path.join(OUTPUT_DIR, "team-profiles.html");
const templatesDir = path.resolve(__dirname, "./templates");

const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");



let team = [];

const selectJobRole = [
    {
        type: "list",
        name: "role",
        message: "What is your job title?",
        choices: ["Manager", "Engineer", "Intern"],
    }
];

const questions = {
    Manager: [
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?",
        },

        {
            type: "input",
            name: "id",
            message: "What is the manager's ID number?",
        },

        {
            type: "input",
            name: "email",
            message: "What is the manager's email address?",
        },

        {
            type: "input",
            name: "office",
            message: "What is the manager's office number?",
        },

        {
            type: "list",
            name: "newProfile",
            message: "Do you want to add another profile?",
            choices: ["yes", "no"]
        },
    ],

    Engineer: [
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?",
        },

        {
            type: "input",
            name: "id",
            message: "What is the engineer's ID number?",
        },

        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?",
        },

        {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?",
        },

        {
            type: "list",
            name: "newProfile",
            message: "Do you want to add another profile?",
            choices: ["yes", "no"]
        },
    ],

    Intern: [
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?",
        },

        {
            type: "input",
            name: "id",
            message: "What is the intern's ID number?",
        },

        {
            type: "input",
            name: "email",
            message: "What is the intern's email address?",
        },

        {
            type: "input",
            name: "school",
            message: "What is the name of the intern's school?",
        },

        {
            type: "list",
            name: "newProfile",
            message: "Do you want to add another profile?",
            choices: ["yes", "no"]
        },
    ],
}

function addNewRole() {
    inquirer.prompt(selectJobRole)
        .then(answer => {
            if (answer.role === "Manager") {
                inquirer.prompt(questions.Manager)
                    .then(answer => {
                        const manager = new Manager
                            (
                                answer.name,
                                answer.id,
                                answer.email,
                                answer.office
                            );
                        team.push(manager);

                        if (answer.newProfile === "yes") {
                            addNewRole();
                        } else {
                            generate();
                        };
                    });
            };

            if (answer.role === "Engineer") {
                inquirer.prompt(questions.Engineer)
                    .then(answer => {
                        const engineer = new Engineer
                            (
                                answer.name,
                                answer.id,
                                answer.email,
                                answer.github
                            );
                        team.push(engineer);

                        if (answer.newProfile === "yes") {
                            addNewRole();
                        } else {
                            generate();
                        };
                    });
            };


            if (answer.role === "Intern") {
                inquirer.prompt(questions.Intern)
                    .then(answer => {
                        const intern = new Intern
                            (
                                answer.name,
                                answer.id,
                                answer.email,
                                answer.school
                            );
                        team.push(intern);

                        if (answer.newProfile === "yes") {
                            addNewRole();
                        } else {
                            generate();
                        };
                    });
            };
        });
};

addNewRole();


function generate() {
    fs.writeFileSync(outputPath, render(team), "utf-8");
    process.exit(0);
}

const render = employees => {
    const html = [];

    html.push(...employees
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => renderManager(manager))
    );
    html.push(...employees
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => renderEngineer(engineer))
    );
    html.push(...employees
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => renderIntern(intern))
    );
    
    console.log("Successfully created new profiles")
    return renderMain(html.join(""));
    

};

const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(templatesDir, "Manager.html"), "utf8");
    template = replacePlaceholders(template, "name", manager.getName());
    template = replacePlaceholders(template, "role", manager.getRole());
    template = replacePlaceholders(template, "id", manager.getId());
    template = replacePlaceholders(template, "email", manager.getEmail());
    template = replacePlaceholders(template, "office", manager.getOffice());
    return template;
};

const renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(templatesDir, "Engineer.html"), "utf8");
    template = replacePlaceholders(template, "name", engineer.getName());
    template = replacePlaceholders(template, "id", engineer.getId());
    template = replacePlaceholders(template, "role", engineer.getRole());
    template = replacePlaceholders(template, "email", engineer.getEmail());
    template = replacePlaceholders(template, "github", engineer.getGithub());
    return template;
};

const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(templatesDir, "Intern.html"), "utf8");
    template = replacePlaceholders(template, "name", intern.getName());
    template = replacePlaceholders(template, "id", intern.getId());
    template = replacePlaceholders(template, "role", intern.getRole());
    template = replacePlaceholders(template, "email", intern.getEmail());
    template = replacePlaceholders(template, "school", intern.getSchool());
    return template;
};

const renderMain = html => {
    const template = fs.readFileSync(path.resolve(templatesDir, "Main.html"), "utf8");
    return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
    const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
    return template.replace(pattern, value);
};

module.exports = render;
