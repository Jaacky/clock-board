import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    LOGIN_REQUEST,
    REGISTRATION_REQUEST,
    VERIFICATION_REQUEST,
} from 'actions/types';

import {
    loginSuccessful,
    registrationSucceeded,
    registrationFailed,
    verificationSucceeded,
    verificationFailed,
} from 'actions';

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
        } else {
            yield put(registrationFailed(json.error));
        }
    } catch(err) {
        console.log("Err in register saga", err);
    }
}

function* watchRegistration() {
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
        } else {
            yield put(verificationFailed(json.error));
        }
    } catch(err) {
        console.log("Err in verification saga", err);
    }
}

function* watchVerification() {
    yield takeEvery(VERIFICATION_REQUEST, verification);
}

function* login({email, password}) {
    console.log("login saga, action: ", email, password);
    // NO INTERNET TEST
    // yield put(loginSuccessful({idToken: "123"}));
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
        if (response.ok){
            const json = yield response.json();
            console.log("json response from submit", json);
            yield put(loginSuccessful({ idToken: json.idToken }));
        }
    } catch(err) {
        console.log("Err in login saga", err);
    }
}
function* watchLogin() {
    yield takeEvery(LOGIN_REQUEST, login)
}

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchRegistration(),
        watchVerification(),
    ]);
};