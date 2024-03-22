'use strict'

const router = require('express').Router();

const personnel = require('../controllers/personnel.controller');
const permissions = require('../middlewares/permissions');

//? URL: /personnels/

router.route('/')
    .get( personnel.list)
    .post( personnel.create)

router.route('/:id')
    .get(permissions.isAdminorOwn, personnel.read)
    .put(permissions.isAdminorOwn, personnel.update)
    .patch(permissions.isAdminorOwn, personnel.update)
    .delete(permissions.isAdmin, personnel.delete)

/* ------------------------------------------------------- */
module.exports = router