import dotenv from 'dotenv'
import mongoose from "mongoose";
import {createClient} from 'redis'


dotenv.config({path: 'test.env'});


export const connectMongo = async () => {
    const linkMongoose = process.env.MONGO_URL
    await mongoose.connect(linkMongoose)
}


export const connectRedis = async () => {
    const linkRedis = process.env.REDIS_URL
    const client = createClient({
        url: linkRedis
    });
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    return client
    // await client.disconnect();
}