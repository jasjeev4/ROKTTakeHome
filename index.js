const fs = require('fs')
const inquirer = require('inquirer')
const moment = require('moment-timezone');
moment.tz.setDefault("Etc/UTC");

let answers = {}

const validateFilePath = async (filePath) => {
    if (fs.existsSync(filePath)) {
        return true
    }
    else {
        return "Invalid file path. Please input a valid file path eg. sample1.txt\n"
    }
}

const validateDate = async (inputDate) => {
    if (moment(new Date(inputDate)).isValid()) {
        return true
    }
    else {
        return "Invalid start date. Please input a valid UTC date eg. 2021-07-05T03:07:13Z\n" // add example of valid date
    }
};

async function filePathQ() {
    const answer = await inquirer.prompt({
        name: 'filePath',
        message: 'Enter a valid valid file eg. sample1.txt',
        type: 'input',
        validate: validateFilePath
    });

    console.log("You entered: " + answer["filePath"])
    answers["filePath"] = answer["filePath"]
    let _ = await startDateQ();
}

async function startDateQ() {
    const answer = await inquirer.prompt({
        name: 'startDate',
        message: 'Enter a valid start date in UTC format eg. 2021-07-05T03:07:13Z',
        type: 'input',
        validate: validateDate
    });

    console.log("You entered: " + answer["startDate"])
    answers["startDate"] = answer["startDate"]
    let _ = await endDateQ();
}

async function endDateQ() {
    const answer = await inquirer.prompt({
        name: 'endDate',
        message: 'Enter a valid end date in UTC format eg. 2021-07-05T03:07:13Z',
        type: 'input',
        validate: validateDate
    });

    console.log("You entered: " + answer["endDate"])
    answers["endDate"] = answer["endDate"]
}

async function askQs() {
    let _ = await filePathQ();
    console.log(JSON.stringify(answers))
}

askQs()

// inquirer.prompt(questions).then(answers => {
//     let validedStart = validateDate(answers['startDate'])
// })

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