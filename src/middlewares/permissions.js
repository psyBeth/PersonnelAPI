'use strict'

// Middleware: permissions (authorization)

module.exports = {

    isLogin: (req, res, next) => {

        if (req.user && req.user.isActive) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login.')
        }
    },

    isAdmin: (req, res, next) => {

        if (req.user && req.user.isActive && req.user.isAdmin) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login as an Admin.')
        }
    },

    isAdminOrLead: (req, res, next) => {

        const departmentId = req.params?.id

        if (
            req.user
            && req.user.isActive
            && (req.user.isAdmin || (req.user.isLead && req.user.departmentId == departmentId))
        ) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login as an Admin or Department Lead.')
        }
    },

    isAdminorOwn: (req, res, next) => {

        const personnelId = req.params?.id

        if(
            req.user && req.user.isActive
            && (
                req.user.isAdmin || req.user._id == personnelId
            )
        ) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login as an Admin or Record Owner.')
        }
    },
}