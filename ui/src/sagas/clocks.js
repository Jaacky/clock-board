import { call, put, takeEvery } from 'redux-saga/effects';

import {
    CLOCKS_REQUEST,
    ADD_CLOCK_REQUEST,
    REMOVE_CLOCK_REQUEST,
} from 'actions/types';

import {
    clocksRequestSucceeded,
    clocksRequestFailed,
    addClockRequestSucceeded,
    addClockRequestFailed,
    removeClockRequestSucceeded,
    removeClockRequestFailed,

} from 'actions';

function* requestClocks() {
    try {
        const response = yield call(fetch, "/api/authenticated/clocks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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

function* addClock({ends_at}) {
    try {
        const response = yield call(fetch, "/api/authenticated/clocks/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ends_at
            }),
        });

        console.log("Response yielded: ", response);
        console.log("response ok: ", response.ok);
        const json = yield response.json();
        console.log("json response from add clock submit", json);
        if (response.ok) {
            yield put(addClockRequestSucceeded(json.clock));
        } else {
            yield put(addClockRequestFailed(json.error));
        }
    } catch(err) {

    }
}

export function* watchAddClockRequest() {
    yield takeEvery(ADD_CLOCK_REQUEST, addClock);
}

function* removeClock({id, ends_at}) {
    console.log("remove clock saga,", id, ends_at);
    try {
        const response = yield call(fetch, "/api/authenticated/clocks/remove", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                ends_at,
            }),
        });

        console.log("Response yielded: ", response);
        console.log("response ok: ", response.ok);
        const json = yield response.json();
        console.log("json response from add clock submit", json);
        if (response.ok) {
            if (json.id !== id || json.ends_at !== ends_at) {
                console.log("ID OR ENDS AT FOR CLOCK REMOVED IS DIFFERENT?!", json.id, id, json.ends_at, ends_at);
            }
            yield put(removeClockRequestSucceeded(json.id, json.ends_at));
        } else {
            yield put(removeClockRequestFailed(json.error));
        }
    } catch(err) {

    }
}

export function* watchRemoveClockRequest() {
    yield takeEvery(REMOVE_CLOCK_REQUEST, removeClock);
}