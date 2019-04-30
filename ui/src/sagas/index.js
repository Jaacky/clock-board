import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    watchLogin,
    watchLogout,
    watchRegistration,
    watchVerification,
} from './account'

import {
    watchClocksRequest,
} from './clocks';

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchLogout(),
        watchRegistration(),
        watchVerification(),
        watchClocksRequest(),
    ]);
};