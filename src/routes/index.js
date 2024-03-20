'use strict'

const router = require('express').Router()

// departments
router.use('/departments', require('./department.router'));

// personnel
router.use('/personnels', require('./personnel.router'));

// token
router.use('/tokens', require('./token.router'))

module.exports = router;