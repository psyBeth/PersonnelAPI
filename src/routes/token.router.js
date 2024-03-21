'use strict'

const router = require('express').Router();

const token = require('../controllers/token.controller');
const permissions = require('../middlewares/permissions');

// URL: /tokens

router.route('/')
    .get(permissions.isAdmin, token.list)
    .post(permissions.isAdmin, token.create)

router.route('/:id')
    .get(permissions.isAdmin, token.read)
    .put(permissions.isAdmin, token.update)
    .patch(permissions.isAdmin, token.update)
    .delete(permissions.isAdmin, token.delete)

module.exports = router