import {storeToRedis} from "../cache/caching.js";


const run = async () => {
    await storeToRedis('haa', 'aaa')
}
setTimeout(run, 1)