import {
    LOGIN_REQUEST,
    LOGIN_SUCCESSFUL,
    CLOCKS_RETRIEVED 
} from "./types";

export function loginRequest(email, password) {
    console.log("login Reqest called, email:", email);
    return {
        type: LOGIN_REQUEST,
        email,
        password,
    };
}

export function loginSuccessful(user) {
    return {
        type: LOGIN_SUCCESSFUL,
        user,
    };
}

export function clocksRetrieved(clocks) {
    return {
        type: CLOCKS_RETRIEVED,
        clocks,
    };
}