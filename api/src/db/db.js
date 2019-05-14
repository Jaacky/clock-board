import { db } from '../config/db';

export const getClocks = async (email) => {
    return await db('clocks')
                .where("email", email)
}

export const addClock = async (email, ends_at) => {
    return await db('clocks')
                    .returning(['id', 'email', 'ends_at'])
                    .insert({
                        email,
                        ends_at,
                    });
}

export const removeClock = async(email, id, ends_at) => {
    return await db('clocks')
                    .where({
                        id,
                        email,
                        ends_at,
                    })
                    .del();
}