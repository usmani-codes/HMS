import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import mongoose from 'mongoose'

import { User } from '../models/user.js'
import deleteProfilePicture from '../utils/deleteProfilePicture.js'

const _filename = fileURLToPath(import.meta.url)
const __dirname = dirname(_filename)

// @desc Get all users
// @route GET /api/v1/users
const getUsers = async (req, res, next) => {
    const users = await User.find({}, "-__v -createdAt -updatedAt")
    if (!users.length) {
        return res.status(404).json({ success: false, msg: 'no users found' })
    }

    res.status(200).json({ success: true, data: users })
}

// @desc Get user by id
// @route GET /api/v1/users/:id
const getUser = async (req, res, next) => {
    const { id } = req.params
    const isValidUser = mongoose.isValidObjectId(id)

    if (!isValidUser) {
        return res.status(400).json({ success: false, msg: 'not a valid id' })
    }

    const user = await User.findOne({ _id: id })

    if (!user) {
        return res.status(404).json({ success: false, msg: 'no user found with this id' })
    }

    res.status(200).json({ success: true, data: user })
}


// @desc update a user by id
// @route PUT /api/v1/users/:id
const updateUser = async (req, res, next) => {
    const { id } = req.params
    const { name, email, password, bio, phone, username } = req.body

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: 'not a valid id' })
    }

    if (email || req.body.id) {
        return res.status(400).json({ success: false, msg: "can't change email for now" })
    }

    const user = await User.findOne({ _id: id })

    console.log('before if .')
    if (user && user.username === username) {
        return res.status(409).json({ success: false, msg: 'username is taken please choose another username' })
    } else {
        console.log("in else if clause ..")
        const filePath = path.join(__dirname, '../public/', user.profilePicture)
        console.log(filePath)
        await deleteProfilePicture(user, filePath)
        //upload image

        req.cb(null, '../public/uploads/profiles')
    }
    console.log('after if ...')
    const profilePicture = `/uploads/profiles/${req.file.filename}`
    const newUser = await User.findOneAndUpdate({ _id: id }, { name, email, password, profilePicture, bio, phone, username }, { new: true })

    if (!newUser) {
        return res.status(500).json({ success: false, msg: 'something went wrong ..' })
    }

    res.status(200).json({ msg: 'user updated ', data: newUser })
}

// @desc delete a user
// @route DELETE /api/v1/users/:id
const deleteUser = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: `not a valid id` })
    }

    const user = await User.findOne({ _id: id })

    if (user && (user.email === req.user.email)) { //deleting logedIn user
        await User.findOneAndDelete({ _id: id })
        return res.status(203).json({ success: false, msg: `signing out to Delete account ..` })
    }

    // if user delete user's profile picture
    if (user) {
        const filePath = path.join(__dirname, '../public', user.profilePicture)
        await deleteProfilePicture(user, filePath)
    }

    const deletedUser = await User.findOneAndDelete({ _id: id })
    if (!deletedUser) {
        return res.status(404).json({ success: false, msg: `user not found ..` })
    }
    const users = await User.find({})

    res.status(200).json({ success: true, msg: `user deleted`, users })
}

// @desc get users total count
// @route GET /api/v1/users/get/count
const getUsersCount = async (req, res, next) => {
    const users = await User.countDocuments()
    res.status(200).json({ success: true, totalUsers: users })
}




export { getUsers, getUser, updateUser, deleteUser, getUsersCount }