import mongoose from 'mongoose'
import bcypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


import { User } from '../models/user.js'
import config from '../config/config.js'
import { getPasswordHashed, getPasswordCompared } from '../utils/hashing.js'

const jwtSecret = config.JWT_SECRET

const login = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(401).json({ success: false, msg: 'please provide all required fields' })
    }

    const user = await User.findOne({ email: email }).select("+password")

    if (!user) {
        return res.status(404).json({ success: false, msg: 'user with this email not found' })
    }

    const passwordMatched = await getPasswordCompared(password, user.password)

    if (!passwordMatched) {
        return res.status(401).json({ success: false, msg: 'incorrect email or password' })
    }

    user.hashedPassword = ''

    const token = jwt.sign({ email: user.email, role: user.role }, jwtSecret, { expiresIn: '1d' })
    res.status(201).json({ success: true, userId: user.id, msg: `${user.role} logedIn successfully `, token })

}

const register = async (req, res, next) => {
    console.log("registering user ..")
    const { name, email, password, bio, phone } = req.body


    let role = req.body.role || 'user'

    let userNumber = ''

    for (let i = 0; i < 3; i++) {
        userNumber += Math.floor(Math.random() * 10)
    }

    let username = name + userNumber
    console.log("username: ", username)

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, msg: 'please fill all required fields' })
    }

    const user = await User.findOne({ email: email })

    if (user) {
        return res.status(401).json({ success: false, msg: 'the user already exists!' })
    }

    const hashedPassword = await getPasswordHashed(password, 10)
    const profilePicture = '/uploads/profiles/default-profile.png'

    let newUser = new User({ name, email, password: hashedPassword, username, profilePicture, role, bio, phone })
    newUser.role = newUser.role.toLowerCase()
    await newUser.save()

    if (!newUser) {
        return res.status(400).json({ success: false, msg: 'the user cannot be created!' })
    }

    const token = jwt.sign({ email: newUser.email, role: newUser.role }, jwtSecret, { expiresIn: '1d' })

    newUser.hashedPassword = ''

    return res.status(201).json({ success: true, msg: "user creatd successfully", data: { id: newUser.id, email: newUser.email, role: newUser.role }, token })

}

export { login, register }