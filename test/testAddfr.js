import User from "../models/User.js";
import {connectMongo} from "./app.test.connect.js";

const id = "64f0bba517300447c51d441c"

const addFriends = async () => {
    // find lean() === object | ko lean() === model
    const update = await User.updateOne(
        { _id : '64f0a80a83da0dd8bc746143'}
        ,{
        $push: { friends: id}
    })
    console.log(update)
}

setTimeout(async () => {
    try {
        await connectMongo()
        await addFriends()
        console.log(' done')
    } catch (e) {
        console.error(e)
    }
})
