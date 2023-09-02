import {compare, genSalt, hash} from "bcrypt"
import jwt from "jsonwebtoken"
import {createRepo, findOneRepo} from "../dao/user.repository.js";


const PREFIX = 'AUTH_LOGIN'
/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body

        const salt = await genSalt()
        const passwordHash = await hash(password, salt)

        const customer = {
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        }
        const newCustomer = await createRepo(customer)
        res.status(201).json(newCustomer)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}


/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await findOneRepo(email)

        if (!user) return res.status(400).json({msg: "User does not exist. "})

        const isMatch = await compare(password, user.password)
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials. "})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        delete user.password

        console.log(`${PREFIX}| User: ${user}`)
        res.status(200).json({token, user})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}
