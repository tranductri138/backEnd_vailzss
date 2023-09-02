import User from "../models/User.js";

//DAO is Data Access Object

export const findOneRepo = async (email) => {
    return User.findOne({email: email}).lean()
}

export const createRepo = async (customer) => {
    const user = await User.create(customer)
    delete user.password
    return user
}




