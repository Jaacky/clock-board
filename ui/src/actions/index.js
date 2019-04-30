import {
    AUTHENTICATION_CHECK_REQUEST,
    AUTHENTICATION_CHECK_SUCCESS,
    AUTHENTICATION_CHECK_FAIL,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESSFUL,
    REGISTRATION_FAILED,
    VERIFICATION_NEEDED,
    VERIFICATION_REQUEST,
    VERIFICATION_SUCCESSFUL,
    VERIFICATION_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESSFUL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESSFUL,
    LOGIN_FAILED,
    CLOCKS_REQUEST,
    CLOCKS_REQUEST_SUCCEEDED,
    CLOCKS_REQUEST_FAILED,
    CLOCKS_RETRIEVED, 
} from "./types";

export function authenticationCheckRequest() {
    return {
        type: AUTHENTICATION_CHECK_REQUEST,
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

export function loginFailed(message) {
    return {
        type: LOGIN_FAILED,
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

export function logoutSuccessful() {
    return {
        type: LOGOUT_SUCCESSFUL,
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
        type: CLOCKS_REQUEST_SUCCEEDED,
        clocks,
    };
}

export function clocksRequestFailed(message) {
    return {
        type: CLOCKS_REQUEST_FAILED,
        message,
    };
}

export function clocksRetrieved(clocks) {
    return {
        type: CLOCKS_RETRIEVED,
        clocks,
    };
}