import {
    REGISTRATION_REQUEST,
    LOGIN_REQUEST,
    LOGIN_SUCCESSFUL,
    CLOCKS_RETRIEVED, 
    REGISTRATION_FAILED,
    REGISTRATION_SUCCESSFUL
} from "./types";

export function registrationRequest(email, password) {
    return {
        type: REGISTRATION_REQUEST,
        email,
        password,
    };
}

export function registrationSucceeded(email) {
    return {
        type: REGISTRATION_SUCCESSFUL,
        email
    }
}

export function registrationFailed(message) {
    return {
        type: REGISTRATION_FAILED,
        message,
    };
}

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