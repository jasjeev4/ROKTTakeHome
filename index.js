
// commands appear after the first 2 elements of the argument list
const commands = process.argv.splice(2)

validCommands(commands);

function ensureValidCommands(commands) {
    if(commands.length !== 3)
        return false
}