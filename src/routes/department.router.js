'use strict'

const router = require('express').Router();

const department = require('../controllers/department.controller');
const permissions = require('../middlewares/permissions');

//? URL: /departments

router.route('/')
    .get(permissions.isLogin, department.list)
    .post(department.create);

router.route('/:id')
    .get(department.read)
    .put(department.update)
    .patch(department.update)
    .delete(department.delete);

router.get('/:id/personnels', department.personnels);


module.exports = router;