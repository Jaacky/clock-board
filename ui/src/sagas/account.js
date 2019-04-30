import { call, put, takeEvery } from 'redux-saga/effects';

import { history } from 'store';

import {
    AUTHENTICATION_CHECK_REQUEST,
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    REGISTRATION_REQUEST,
    VERIFICATION_REQUEST,
} from 'actions/types';

import {
    authenticationCheckSucceeded,
    authenticationCheckFailed,
    loginSucceeded,
    loginFailed,
    logoutSucceeded,
    registrationSucceeded,
    registrationFailed,
    verficiationNeeded,
    verificationSucceeded,
    verificationFailed,
} from 'actions';

function* authenticationCheck() {
    console.log("authentcation check saga");
    try {
        const response = yield call(fetch, "/api/authenticated", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Response yielded: ", response);
        console.log("response ok: ", response.ok);
        const json = yield response.json();
        console.log("json response from submit", json);
        if (response.ok){
            yield put(authenticationCheckSucceeded(json.email));
            history.push("/dashboard");
        } else {
            yield put(authenticationCheckFailed(json.error));
            history.push("/");
        }
    } catch(err) {
        console.log("Err in authentication check saga", err);
    }
}

export function* watchAuthenticationCheck() {
    yield takeEvery(AUTHENTICATION_CHECK_REQUEST, authenticationCheck);
}

function* registration({email, password}) {
    console.log("registration saga! emial:pass", email, password)
    try {
        const response = yield call(fetch, "/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        console.log("Response yielded: ", response);
        console.log("response ok: ", response.ok);
        const json = yield response.json();
        console.log("json response from submit", json);
        if (response.ok){
            yield put(registrationSucceeded(json.email));
            history.push("/verification");
        } else {
            yield put(registrationFailed(json.error));
        }
    } catch(err) {
        console.log("Err in register saga", err);
    }
}

export function* watchRegistration() {
    yield takeEvery(REGISTRATION_REQUEST, registration)
}

function* verification({email, code}) {
    try {
        const response = yield call(fetch, "/api/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                verificationCode: code,
            }),
        });
        console.log("Response yielded: ", response);
        console.log("response ok: ", response.ok);
        const json = yield response.json();
            console.log("json response from verification submit", json);
        if (response.ok){
            yield put(verificationSucceeded());
            history.push("/dashboard");
        } else {
            yield put(verificationFailed(json.error));
        }
    } catch(err) {
        console.log("Err in verification saga", err);
    }
}

export function* watchVerification() {
    yield takeEvery(VERIFICATION_REQUEST, verification);
}

function* login({email, password, history}) {
    console.log("login saga, action: ", email, password);
    // NO INTERNET TEST
    // yield put(loginSucceeded({idToken: "123"}));
    // return
    // END NO INTERNET TEST
    try {
        const response = yield call(fetch, "/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            }),
        });
        console.log("Response yielded: ", response);
        console.log("response ok: ", response.ok);
        const json = yield response.json();
        console.log("json response from submit", json);
        if (response.ok) {
            if (json.newUser) {
                console.log("Login, verification needed");
                yield put(verficiationNeeded(email));
                history.push("/verification");
                return;
            } else {
                yield put(loginSucceeded({ email }));
                history.push("/dashboard");
                yield testCookie();
                return;
            }
        }
    } catch(err) {
        console.log("Err in login saga", err);
    }

    yield put(loginFailed("Error logging in. Please try again."));
}

export function* watchLogin() {
    yield takeEvery(LOGIN_REQUEST, login);
}

function* logout({history}) {
    console.log("logout saga, action: ", history);
    try {
        const response = yield call(fetch, "/api/signout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Response yielded: ", response);
        console.log("response ok: ", response.ok);
        const json = yield response.json();
        console.log("json response from submit", json);
        if (response.ok) {
            yield put(logoutSucceeded());
            history.push("/");
            return;
        }
    } catch(err) {
        console.log("Err in logout saga", err);
    }
}

export function* watchLogout() {
    yield takeEvery(LOGOUT_REQUEST, logout);
}

async function testCookie() {
    console.log("testCookie called");
    try {
        const response = await fetch("/api/", {
            method: "POST",
        });
        console.log("Response yielded: ", response);
        console.log("response ok: ", response.ok);
        const json = await response.json();
        console.log("json response from test cookie", json);
        return json;
    } catch (err) {
        console.log("Error in test cookie", err);
        return {};
    }
}
