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

async function askQs() {
    let _ = await filePathQ();
    console.log(JSON.stringify(answers))
}

askQs()

function ensureValidCommands(input) {
    let part = -1
    let progress = 0
    const missingCommands = [
        "Must specify a file path with \"-file <path to file\">",
        "Must specify a start date with \"-begin <start date>\"",
        "Must specify a end date with \"-end <end date>\""
    ]
    let commands = {}

    for (const word in input) {
        switch (word) {
            case "-file":
                part = 0
                progress += 1
                break
            case "-begin":
                part = 1
                progress += 1
                break
            case "-end":
                part = 2
                progress += 1
                break
            default:
                switch (part) {
                    case 0:
                        if (fs.existsSync(word)) {
                            commands["path"] = word
                        }
                        else {
                            console.log("Invalid file path")
                            return null
                        }
                        break
                    case 1:
                        if (word.isValid()) {
                            commands["begin"] = part
                        }
                        else {
                            console.log("Invalid start date") // add example of valid date
                            return null
                        }
                        break
                    case 2:
                        if (word.isValid()) {
                            commands["begin"] = part
                        }
                        else {
                            console.log("Invalid start date") // add example of valid date
                        }
                        break
                    default:
                        console.log(missingCommands[progress])
                        return null
                }
                part = -1
        }
        return commands
    }
}