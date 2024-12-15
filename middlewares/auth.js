import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import CustomAPIError from '../errors/custom-error.js'
import asyncWrapper from '../middlewares/asyncWrapper.js'

export const AUTH = asyncWrapper(async (req, res, next) => {
    const secretKey = config.JWT_SECRET
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        throw new CustomAPIError(401, "Unauthorized !! no token provided")
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            throw new CustomAPIError(400, "invalid token..")
        } else {
            req.user = decoded
            next()
        }
    })


})