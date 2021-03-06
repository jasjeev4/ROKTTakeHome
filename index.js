const inquirer = require('inquirer')
const moment = require('moment-timezone');
const validators = require('./validators/validators')
const messages = require('./messages/messages')
const model = require('./model/generateoutput')

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

    // check date order
    if(! await validators.validateDateOrder(answers["startDate"], answers["endDate"])) {
        console.clear()
        console.log(messages.invalidDateOrder)

        await begin()
    }

    // createJSON
    let retVal = await model.createOutput(answers["filePath"], answers["startDate"], answers["endDate"])
    if(retVal != true) {
        console.clear()
        console.log(retVal)

        await begin()
    }

    //console.log(JSON.stringify(lines))
}

begin()