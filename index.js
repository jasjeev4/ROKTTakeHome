const fs = require('fs')
const inquirer = require('inquirer')
const moment = require('moment-timezone');
const validators = require('./validators/validators')
const messages = require('./messages/messages')

moment.tz.setDefault("Etc/UTC");

let answers = {}

async function filePathQ() {
    const answer = await inquirer.prompt({
        name: 'filePath',
        message: messages.enterFile,
        type: 'input',
        validate: validators.validateFilePath
    });

    console.log("You entered: " + answer["filePath"].trim())
    answers["filePath"] = answer["filePath"].trim()
    let _ = await startDateQ();
}

async function startDateQ() {
    const answer = await inquirer.prompt({
        name: 'startDate',
        message: messages.enterStartDate,
        type: 'input',
        validate: validators.validateDate
    });

    console.log("You entered: " + answer["startDate"].trim())
    answers["startDate"] = answer["startDate"].trim()
    let _ = await endDateQ();
}

async function endDateQ() {
    const answer = await inquirer.prompt({
        name: 'endDate',
        message: messages.enterEndDate,
        type: 'input',
        validate: validators.validateDate
    });

    console.log("You entered: " + answer["endDate"].trim())
    answers["endDate"] = answer["endDate"].trim()
}

async function begin() {
    let _ = await filePathQ();

    // get the answers


    console.log(JSON.stringify(answers))
}

begin()