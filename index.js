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

/* ------------------------------------------------------- */

//? MORGAN LOGGING
// https://expressjs.com/en/resources/middleware/morgan.html
// https://github.com/expressjs/morgan
//* $ npm i morgan

const morgan = require('morgan');

// app.use(morgan('combined'));
// app.use(morgan('common'));
// app.use(morgan('dev'));
// app.use(morgan('short'));
// app.use(morgan('tiny'));
app.use(morgan('IP=:remote-addr | TIME=:date[clf] | METHOD=:method | URL=:url | STATUS=:status | LENGTH=:res[content-length] | REF=:referrer |  AGENT=:user-agent'));

/* ------------------------------------------------------- */

//? Middlewares
// Accept JSON:
app.use(express.json())

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