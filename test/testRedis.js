import {connectRedis} from "./app.test.connect.js";

const run = async () => {
    const clientRedis = await connectRedis()
    // clientRedis.set('tris dep zai1', 'hjhj')
    clientRedis.del('tris dep zai1', (err, reply) => {
        if (err) {
            console.error(err);
        } else {
            console.log(reply);
        }
    });
    console.log('done')
}

setTimeout(run, 0);