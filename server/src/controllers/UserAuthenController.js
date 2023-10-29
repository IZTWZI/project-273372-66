const { User } = require('../models')
const config = require('../config/config')
const jwt = require('jsonwebtoken')
function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}
module.exports = {
    async singup(req, res) {
        try {
            const { email } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (user) {
                return res.status(403).send({
                    error: 'email already exists'
                })
            }
            const userc = await User.create(req.body)
            res.send(userc.toJSON())
        } catch (error) {
            res.status(400).send({
                error: 'The content information was incorrect'
            })
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: 'User not correct'
                })
            }
            if (user.status != 'active') {
                return res.status(403).send({
                    error: 'User not active'
                })
            }
            const isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'Password not correct'
                })
            }
            const userJSON = user.toJSON()
            res.send({
                user: userJSON,
                token: jwtSignUser(userJSON)
                })

        } catch (error) {
            res.status(500).send({
                error: 'Error! from get user'
            })
        }
    }
}