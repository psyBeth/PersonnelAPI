'use strict'

const router = require('express').Router();

/* ------------------------------------------------------- *
EXAMPLE FOR TEST
{
    "username": "testF0",
    "password": "1234"
}
/* ------------------------------------------------------- */

const auth = require('../controllers/auth.controller');

//? URL: auth
router.post('/login', auth.login);
// router.all('/logout', auth.logout); //! swagger doesn't see .all method
router.get('/logout', auth.logout);

module.exports = router