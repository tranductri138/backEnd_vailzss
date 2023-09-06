import {createClient} from 'redis';

const PREFIX = ' REDIS_CACHE'

const client = createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect()

export const storeInRedis = async (key, value) => {
    try {
        console.log(`${PREFIX} Redis info | key: ${key} | value: ${value}`)
        await client.set(key, value)
    } catch (error) {
        console.error(`${PREFIX} Redis error: ${error}`)
    }
}


