import { comparePassword, hashPassword } from "../common/password.js";
import { generateToken } from "../common/token.js";
import { User } from "../Model/userModel.js";

export const userRegister = async (req, res) => {

    try {
        const { fullName, email, password, phoneNumber, address } = req.body

        if (!fullName || !email || !password || !phoneNumber || !address) {
            return res.status(400).send({
                status: 400,
                message: "enter the details"
            })
        }

        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.status(400).send({
                status: 400,
                message: "same as old user"
            })
        }

        const hash = await hashPassword(password)
        const saveUser = new User({
            fullName, email, password: hash, phoneNumber, address
        })

        const newUser = await saveUser.save()
        res.status(200).send({
            status: 200,
            message: "register user done",
            registerUser: newUser
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


export const loginUser = async (req, res) => {

    const { email, phoneNumber, password } = req.body
    if (!password) {
        return res.status(400).send({
            status: 400,
            message: "enter the password"
        })
    }

    let user
    if (email) {
        user = await User.findOne({ email })
    }
    else {
        user = await User.findOne({ phoneNumber })
    }
    if (!user) {
        return res.status(404).send({
            status: 404,
            message: "no user found"
        })
    }

    const checkPassword = await comparePassword(password, user.password)
    if (!checkPassword) {
        return res.status(404).send({
            status: 404,
            message: "no user found"
        })
    }

    const payload = {
        role: "user",
        _id: user._id,
    }
    const token = await generateToken(payload)
    res.status(200).send({
        status: 200,
        message: "login user",
        user: payload, token
    })
}


export const singleUser = async (req, res) => {

    try {
        const { userId } = req.query

        const user = await User.findOne({ _id: userId })
        if (user) {
            res.status(200).send({
                status: 200,
                message: "user details",
                userProfile: user
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "no user found",
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


export const updateUser = async (req, res) => {

    try {
        const { fullName, phoneNumber, address } = req.body

    const { id } = req.params

    const user = await User.findByIdAndUpdate({ _id: id }, {
        fullName, phoneNumber, address
    }, { new: true })

    if (user) {
        res.status(200).send({
            status: 200,
            message: "update user profile",
            updateUser: user
        })
    }
    else {
        res.status(404).send({
            status: 404,
            message: "no user found"
        })
    }
    } catch (error) {
        res.send(error.message)
    }

    
}


export const deleteUser = async (req, res) => {

    try {
        const { _id } = req.params

        const user = await User.findByIdAndDelete({ _id })
        if (user) {
            res.status(200).send({
                status: 200,
                message: "delete user details"
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "no user found"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}


export const getAllUsers = async (req, res) => {

    try {
        const users = await User.find({})

        if (users.length > 0) {
            res.status(200).send({
                status: 200,
                message: "all user lists",
                users: users
            })
        }
        else {
            res.status(404).send({
                status: 404,
                message: "no user found"
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}