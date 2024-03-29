'use strict'

const Personnel = require('../models/personnel.model');
const Token = require('../models/token.model');
const passwordEncrypt = require('../helpers/passwordEncrypt');

module.exports = {

    login: async (req, res) => {

        /* DEMO
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Login'
            #swagger.description = 'login username and password'
            #swagger.parameters['body' = {
                in: 'body',
                required: 'true',
                schema: {
                    username: 'testF00',
                    password: '123456'
                }
            }]
        */

        const { username, password } = req.body

        if (username && password) {

            const user = await Personnel.findOne({ username, password })
            if (user && user.isActive) {

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
                    token: tokenData.token,
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
        /*  DEMO
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'Delete Token'
        */

        // Set session to null:
        // req.session = null

        /* Token */
        //? 1st method
        // each user has only 1 token
        // console.log(req.user);
        // await Token.deleteOne({ userId: req.user._id})

        //? 2nd method
        // a user might have multiple tokens
        // login from multiple devices at once
        // example: netflix profiles
        const auth = req.headers?.authorization || null // Token ...tokenKey...
        const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']
        
        let deleted = null;

        if (tokenKey && tokenKey[0]=='Token') {
            const deleted = await Token.deleteOne({ token: tokenKey[1] })
        }

        res.status(200).send({
            error: false,
            message: 'Logout: Token Deleted.',
            deleted
        })
    },
};
