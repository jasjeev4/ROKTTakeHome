const fs = require('fs')
const readline = require('readline')
const moment = require('moment-timezone');
const messages = require('../messages/messages')
const validators = require('../validators/validators')

async function createOutput(filename, startTime, endTime, silent = false) {
    const fileStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let lno = 1
    let foundStart = false
    let firstEntry = true

    let start = moment(new Date(startTime))
    let end = moment(new Date(endTime))

    for await (const line of rl) {

        if(! await validators.validateString(line)) {
            return messages.fileCorrupt
        }

        let curDate = line.split(' ')[0]
        let email = line.split(' ')[1]
        let sessionId = line.split(' ')[2]

        let isValid = await validators.validateDate(curDate) && await validators.validateString(email) && await validators.validateString(sessionId)

        if(!isValid) {
            return messages.fileCorrupt
        }

        let curDt = moment(new Date(curDate))

        if(!foundStart && start.isSameOrBefore(curDt)) {
            foundStart = true

            if(!silent) {
                // print first line
                process.stdout.write(
                    "[\n"
                );
            }
        }
        else {
            // display each entry

            if(firstEntry) {
                firstEntry = false
            }
            else {
                if(!silent) {
                    process.stdout.write(",");
                }
            }

            if(!silent) {
                process.stdout.write(
                    "\n" + fourSpaces() + "{ \n" + fourSpaces() + fourSpaces() + "\"eventTime\": \"" + curDate + "\", \n" + fourSpaces() + fourSpaces() + "\"email\": \"" + email + "\", \n" + fourSpaces() + fourSpaces() + "\"sessionId\": \"" + sessionId + "\"\n" + fourSpaces() + "}"
                );
            }
        }

        if(curDt.isSameOrAfter(end)) {

            if(!silent) {
                // print last line
                process.stdout.write(
                    "\n]\n"
                );
            }

            return true
        }

        //console.log(`Line ${lno}: ${line}`);
        lno += 1
    }

    // print last line
    if(!silent) {
        process.stdout.write(
            "\n]\n"
        );
    }

    return true
}

function fourSpaces() {
    return '    '
}

module.exports = {
    createOutput: createOutput
}