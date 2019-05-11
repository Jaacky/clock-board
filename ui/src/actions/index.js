import {
    AUTHENTICATION_CHECK_REQUEST,
    AUTHENTICATION_CHECK_SUCCESS,
    AUTHENTICATION_CHECK_FAIL,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL,
    VERIFICATION_NEEDED,
    VERIFICATION_REQUEST,
    VERIFICATION_SUCCESS,
    VERIFICATION_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGIN_FAIL,
    CLOCKS_REQUEST,
    CLOCKS_REQUEST_SUCCESS,
    CLOCKS_REQUEST_FAIL,
} from "./types";

export function authenticationCheckRequest(history) {
    console.log(history);
    return {
        type: AUTHENTICATION_CHECK_REQUEST,
        history
    };
}

export function authenticationCheckSucceeded(email) {
    return {
        type: AUTHENTICATION_CHECK_SUCCESS,
        email,
    };
}

export function authenticationCheckFailed(message) {
    return {
        type: AUTHENTICATION_CHECK_FAIL,
        message,
    };
}

export function registrationRequest(email, password, history) {
    return {
        type: REGISTRATION_REQUEST,
        email,
        password,
        history,
    };
}

export function registrationSucceeded(email) {
    return {
        type: REGISTRATION_SUCCESS,
        email
    }
}

export function registrationFailed(message) {
    return {
        type: REGISTRATION_FAIL,
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
        type: VERIFICATION_SUCCESS,
    };
}

export function verificationFailed(message) {
    return {
        type: VERIFICATION_FAIL,
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

export function loginSucceeded(email) {
    return {
        type: LOGIN_SUCCESS,
        email,
    };
}

export function loginFailed(message) {
    return {
        type: LOGIN_FAIL,
        message,
    };
}

export function logoutRequest(history) {
    console.log("logout Request called, history", history);
    return {
        type: LOGOUT_REQUEST,
        history,
    };
}

export function logoutSucceeded() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

export function clocksRequest(email) {
    return {
        type: CLOCKS_REQUEST,
        email,
    };
}

export function clocksRequestSucceeded(clocks) {
    return {
        type: CLOCKS_REQUEST_SUCCESS,
        clocks,
    };
}

export function clocksRequestFailed(message) {
    return {
        type: CLOCKS_REQUEST_FAIL,
        message,
    };
}