// Prompt the user questions using Inquire
// requires
const inquire = require("inquirer");
const { questions } = require("./questions");

function promptUser() {
    inquire.prompt(questions).then(answers => {
        console.log(answers)

    })

};








// exporting function
module.exports = promptUser;