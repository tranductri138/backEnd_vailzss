import {createClient} from 'redis';

const PREFIX = 'REDIS_CACHE'

const client = createClient({
    url:  process.env.REDIS_URL
});

client.on('error', (err) => console.log('Redis Client Error', err));


export const storeToRedis = async (key, value) => {
    try {
        await client.connect()
        await client.set(key, value)
        await client.disconnect()
    } catch (error) {
        console.error(`${PREFIX} Redis error: ${error}`)
    }
}



