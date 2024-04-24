import {Command} from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
const prog = new Command();

const questions = [
    {
        type: 'input',
        name: 'username',
        message: 'enter username',
    },
];

const file = './USERNAME';

prog
.name("User repositories")
.description("cli to get user repositories from github")
.version('1.0.0');

prog
.command("getrepos")
.alias('g')
.description("get repos of the user")
.action(() => {
    inquirer
    .prompt(questions)
    .then((user) => {
        const url = `https://api.github.com/users/${user.username}/repos`;
        fetch(url)
        .then(res => res.json())
        .then(json => {
            const repos = json.map(repo => repo.name);
            fs.writeFile(file, repos.join('\n'), (err) => {
                if(err){
                    console.error("Error writing to file:", err);
                    return;
                }
                console.log("repos added succefully");
            })
        })
    })
})

prog.parse();