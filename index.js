'use strict'
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require('express')
const app = express()

/* ------------------------------------------------------- */
//? Required modules

//env variables
require('dotenv').config()
const PORT = process.env?.PORT || 8000

// async errors for errorHandler
require('express-async-errors')
/* ------------------------------------------------------- */

//? Configuration
// connect to DB
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- *

//? MORGAN LOGGING
// https://expressjs.com/en/resources/middleware/morgan.html
// https://github.com/expressjs/morgan
//? $ npm i morgan

const morgan = require('morgan');

// app.use(morgan('combined'));
// app.use(morgan('common'));
// app.use(morgan('dev'));
// app.use(morgan('short'));
// app.use(morgan('tiny'));
// app.use(morgan('IP=:remote-addr | TIME=:date[clf] | METHOD=:method | URL=:url | STATUS=:status | LENGTH=:res[content-length] | REF=:referrer |  AGENT=:user-agent'));
// seeing it on the console doesn't mean anything, we should save the logs 
// https://nodejs.org/api/fs.html#file-system-flags

//? Write to log file:
// const fs = require('node:fs');
// app.use(morgan('combined', {
//     stream: fs.createWriteStream('./access.log', { flags: 'a+'})
// }));

//? Write to file each day seperately:
const fs = require('node:fs');
const now = new Date();
const today = now.toISOString().split('T')[0];
app.use(morgan('combined', {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+'})
}));

/* ------------------------------------------------------- */

//? DOCUMENTATION:
//* https://swagger-autogen.github.io/docs/
// $ npm i swagger-autogen
// $ npm i swagger-ui-express
// $ npm i redoc-express

//? JSON:
app.use('/documents/json', (req, res) => {
    res.sendFile('swagger.json', { root: '.' })
});
// check here:
// http://127.0.0.1:8000/documents/json
// if there's a problem here, redoc will not work

//? SWAGGER:
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require("./swagger.json");
app.use('/documents/swagger',swaggerUi.serve,swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }));
// check here:
// http://127.0.0.1:8000/documents/swagger/

//? REDOC:
const redoc = require('redoc-express');
app.use('/documents/redoc', redoc({
    title: 'PersonnelAPI',
    specUrl: '/documents/json'
}))
// check here: 
// http://127.0.0.1:8000/documents/redoc

/* ------------------------------------------------------- */

//? Middlewares
// Accept JSON:
app.use(express.json())

// Logging:
app.use(require('./src/middlewares/logging'))

// Cookies-Sessins
app.use(require('cookie-session')({ secret: process.env.SECRET_KEY }))

//res.getModelList()
app.use(require('./src/middlewares/findSearchSortPage'))
/* ------------------------------------------------------- */

// Authentication (Simple Token);
app.use(require('./src/middlewares/authentication'))

/* ------------------------------------------------------- */
//? Routes
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PERSONNEL API',
        user: req.user,
    })
});

// // departments
// app.use('/departments', require('./src/routes/department.router'));

// // personnel
// app.use('/personnels', require('./src/routes/personnel.router'));

app.use(require('./src/routes/'))

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// require('./src/helpers/sync')()