'use strict'

//? MORGAN LOGGING
// https://expressjs.com/en/resources/middleware/morgan.html
// https://github.com/expressjs/morgan
//* $ npm i morgan

const morgan = require('morgan');
const fs = require('node:fs');
const now = new Date();
const today = now.toISOString().split('T')[0];

module.exports = morgan('combined', {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+'})
});