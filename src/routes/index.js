'use strict'

const router = require('express').Router()

// token
router.use('/auth', require('./auth.router'))

// token
router.use('/tokens', require('./token.router'))

// personnel
router.use('/personnels', require('./personnel.router'));

// departments
router.use('/departments', require('./department.router'));

module.exports = router;