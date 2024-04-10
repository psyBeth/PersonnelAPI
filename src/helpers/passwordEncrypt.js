'use strict'

const crypto = require('node:crypto');
const keyCode = process.env.SECRET_KEY || 'pls_write_random_chars_here';
const loopCount = 10_000;
const charCount = 32;   //32 for 64
const encType = 'sha512';

module.exports = function (password) {
    return crypto.pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
    .toString('hex')
}