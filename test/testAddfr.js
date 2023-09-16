import User from "../models/User.js";
import {connectMongo} from "./app.test.connect.js";

const id = "64f0bba517300447c51d441c"

const addFriends = async () => {
    // find lean() === object | ko lean() === model
    const update = await User.findOneAndUpdate(
        {_id: '64f0c4f99b953c84a71a26d4'}
        , {
            $set: {impressions: 2231}
        }, {new: true})
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
