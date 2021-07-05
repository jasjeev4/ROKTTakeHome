const moment = require('moment-timezone');
moment.tz.setDefault("Etc/UTC");
var now = moment("2021-07-04T10:55:26Z").format('YYYY MMM DD h:mm A');
console.log(now);