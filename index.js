const moment = require('moment');
const fs = require('fs')

// commands appear after the first 2 elements of the argument list
console.log(process.argv)

const input = process.argv.splice(2)

let commands = ensureValidCommands(input);

if(commands && commands.length === 3) {
    console.log(commands)
}
else {
    console.log("")
}

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