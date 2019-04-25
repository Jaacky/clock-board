import { call, put, takeEvery } from 'redux-saga/effects';

import {
    CLOCKS_REQUEST,
} from 'actions/types';

import {
    clocksRequestSucceeded,
    clocksRequestFailed,

} from 'actions';

function* requestClocks() {
    let token = "placeholder token";
    try {
        const response = yield call(fetch, "/api/authenticated/clocks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
            }),
        });
        console.log("Response yielded: ", response);
        console.log("response ok: ", response.ok);
        const json = yield response.json();
        console.log("json response from clocks submit", json);
        if (response.ok) {
            yield put(clocksRequestSucceeded(json.clocks));
        } else {
            yield put(clocksRequestFailed(json.error));
        }
    } catch(err) {
        console.log("Err requesting clocks", err);
    }
}

export function* watchClocksRequest() {
    yield takeEvery(CLOCKS_REQUEST, requestClocks);
}