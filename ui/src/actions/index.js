import {
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESSFUL,
    REGISTRATION_FAILED,
    VERIFICATION_NEEDED,
    VERIFICATION_REQUEST,
    VERIFICATION_SUCCESSFUL,
    VERIFICATION_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESSFUL,
    CLOCKS_RETRIEVED, 
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

export function verficiationNeeded(email) {
    return {
        type: VERIFICATION_NEEDED,
        email,
    };
}

export function verificationRequest(email, code) {
    return {
        type: VERIFICATION_REQUEST,
        email,
        code,
    };
}

export function verificationSucceeded() {
    return {
        type: VERIFICATION_SUCCESSFUL,
    };
}

export function verificationFailed(message) {
    return {
        type: VERIFICATION_FAILED,
        message,
    };
}

export function loginRequest(email, password, history) {
    console.log("login Reqest called e, history", email, history);
    return {
        type: LOGIN_REQUEST,
        email,
        password,
        history,
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