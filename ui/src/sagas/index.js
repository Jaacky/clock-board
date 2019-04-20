import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    LOGIN_REQUEST,
} from 'actions/types';

import {
    loginSuccessful
} from 'actions';

function* login(action) {
    console.log("login saga, action: ", action);
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
                "email": event.target.email.value,
                "password": event.target.password.value,
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
    ]);
};