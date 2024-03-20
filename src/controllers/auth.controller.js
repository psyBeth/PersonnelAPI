'use strict'

const Personnel = require('../models/personnel.model');
const Token = require('../models/token.model');
const passwordEncrypt = require('../helpers/passwordEncrypt');

module.exports = {

    login: async (req, res) => {

        const { username, password } = req.body

        if (username && password) {

            const user = await Personnel.findOne({ username, password })
            if (user) {

                /* SESSION
                // Set Session:
                req.session = {
                    id: user._id,
                    password: user.password
                }
                // Set Cookie:
                if (req.body?.rememberMe) {
                    req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3 // 3 Days
                }
                /*  SESSION */

                /* TOKEN */
                // is there a token?
                let tokenData = await Token.findOne({ userId: user._id });

                // if there's no token, create it:
                if (!tokenData) {
                    const tokenKey = passwordEncrypt(user._id + Date.now())
                    // console.log(typeof tokenKey, tokenKey)
                    tokenData = await Token.create({ userId: user._id, token: tokenKey })
                }
                
                /* TOKEN */

                res.status(200).send({
                    error: false,
                    user
                })

            } else {
                res.errorStatusCode = 401
                throw new Error('Wrong Username or Password.')
            }
        } else {
            res.errorStatusCode = 401
            throw new Error('Please entry username and password.')
        }
    },

    logout: async (req, res) => {
        // Set session to null:
        req.session = null
        res.status(200).send({
            error: false,
            message: 'Logout: Sessions Deleted.'
        })
    },
};
