'use strict'

const router = require('express').Router();

const personnel = require('../controllers/personnel.controller');

//? URL: auth
router.post('/login', personnel.login);
router.all('/logout', personnel.logout)


/* ------------------------------------------------------- */
module.exports = router