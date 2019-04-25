import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    watchLogin,
    watchRegistration,
    watchVerification,
} from './account'

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchRegistration(),
        watchVerification(),
    ]);
};