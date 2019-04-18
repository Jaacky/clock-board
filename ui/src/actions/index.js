import {
    LOGIN,
    CLOCKS_RETRIEVED 
} from "./types";

export function login(user) {
    return {
        type: LOGIN,
        user
    }
}

export function clocksRetrieved(clocks) {
    return {
        type: CLOCKS_RETRIEVED,
        clocks,
    };
}