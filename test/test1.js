import mongoose from "mongoose";
import User from "../models/User.js";

import dotenv from 'dotenv'
dotenv.config({ path : 'test.env'});


const id="64f0c4f99b953c84a71a26d4"


const connect = async () => {
    const linkMongoose = process.env.MONGO_URL
    await mongoose.connect(linkMongoose)
}
const addFriends = async ()=> {
    // find lean() === object | ko lean() === model
    const fil = await User.find({ _id : id}).lean()
    console.log(fil)
    // const update = await User.updateOne(
    //     { _id : '64f0a80a83da0dd8bc746143'}
    //     ,{
    //     $push: { friends: id}
    // })
    // console.log(update)
}

setTimeout(async ()=> {
    try {
        await connect()
        await addFriends()
        console.log(' done')
    } catch (e) {
        console.error(e)
    }
})
