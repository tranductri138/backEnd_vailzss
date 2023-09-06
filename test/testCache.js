import {storeInRedis} from "../service/cache/caching.js";


const run = async () => {
    await storeInRedis('haa', 'aaa')
}
setTimeout(run, 1)