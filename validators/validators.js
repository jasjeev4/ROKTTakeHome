const fs = require('fs')
const moment = require('moment-timezone');
const messages = require('../messages/messages')

moment.tz.setDefault("Etc/UTC");

const validateFilePath = async (filePath) => {
    if (fs.existsSync(filePath.trim())) {
        return true
    }
    else {
        return messages.reenterFile
    }
}

const validateDate = async (inputDate) => {
    if (moment(new Date(inputDate.trim())).isValid()) {
        return true
    }
    else {
        return messages.reenterDate
    }
};

const validateString = async (input) => {
   if (typeof input === 'string' || input instanceof String) {
        return true
    }
    else {
        return false
    }
};

module.exports = {
    validateFilePath: validateFilePath,
    validateDate: validateDate,
    validateString: validateString
}