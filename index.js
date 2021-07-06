const fs = require('fs')
const readline = require('readline')
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

    // get line of the start date time
    let lines = await findLine(answers["filePath"], answers["startDate"], answers["endDate"])

    //console.log(JSON.stringify(lines))
}


async function findLine(filename, startTime, endTime) {
    const fileStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    let lno = 1
    let startLine = -1
    let endLine = -1

    let foundStart = false
    let firstEntry = true

    let start = moment(startTime)
    let end = moment(endTime)

    for await (const line of rl) {
        let curDate = line.split(' ')[0]

        let isValid = validators.validateDate(curDate)

        if(!isValid) {
            console.log("The file is corrupted. Try another file.")
            await begin()
            return
        }

        let curDt = moment(curDate)

        if(!foundStart && start.isSameOrBefore(curDt)) {
            foundStart = true

            // print first line
            process.stdout.write(
                "[\n"
            );
        }

        if(foundStart) {
            // display each entry

            if(firstEntry) {
                firstEntry = false
            }
            else {
                process.stdout.write(",");
            }

            process.stdout.write(
                "\n" + fourSpaces() + "{ \n" + fourSpaces() + fourSpaces() + "\"eventTime\": \"" + curDate + "\", \n" + fourSpaces() + fourSpaces() + "\"email\": \"" + line.split(" ")[1] + "\", \n" + fourSpaces() + fourSpaces() + "\"sessionId\": \"" + line.split(" " )[2] + "\"\n" + fourSpaces() + "}"
            );
        }

        if(curDt.isSameOrAfter(end)) {
            // endLine = lno

            // print last line
            process.stdout.write(
                "\n]\n"
            );

            return
        }

        // Each line in input.txt will be successively available here as `line`.
        //console.log(`Line ${lno}: ${line}`);
        lno += 1
    }

    //return [startLine, endLine]
}

function fourSpaces() {
    return '    '
}
begin()