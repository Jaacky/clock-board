import { db } from '../config/db';

export const getClocks = async (email) => {
    return await db('clocks')
                .where("email", email)
    // .then(result => {
    //     console.log("clocks in db select", result);
    //     return result
    // })
    // .catch(err => {
    //     console.log("error in select", err);
    //     throw err;
    // });
}

export const addClock = async () => {
    db('clocks')
    .insert({
        email: 'jaackyvan@gmail.com',
        "ends_at": "2019-04-13T00:00:00.000Z"
    })
    .then(result => {
        console.log("REsult from inserting", result);
    })
    .catch(err => {
        console.log("Inserting error:", err);
    })
}