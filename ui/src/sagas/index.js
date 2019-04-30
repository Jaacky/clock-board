import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    watchAuthenticationCheck,
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
        watchAuthenticationCheck(),
        watchLogin(),
        watchLogout(),
        watchRegistration(),
        watchVerification(),
        watchClocksRequest(),
    ]);
};