import { combineReducers } from 'redux';

import {
    AUTHENTICATION_CHECK_REQUEST,
    AUTHENTICATION_CHECK_SUCCESS,
    AUTHENTICATION_CHECK_FAIL,
    LOGIN_SUCCESSFUL,
    LOGOUT_SUCCESSFUL,
    REGISTRATION_FAILED,
    REGISTRATION_SUCCESSFUL,
    VERIFICATION_NEEDED,
    CLOCKS_REQUEST,
    CLOCKS_REQUEST_SUCCEEDED,
    CLOCKS_REQUEST_FAILED,
    CLOCKS_RETRIEVED,
} from 'actions/types';

const user = (state = {}, action) => {
    console.log("User reducer: action", action);
    switch (action.type) {
        case AUTHENTICATION_CHECK_SUCCESS:
            return {
                email: action.email,
            };
        case LOGIN_SUCCESSFUL:
            return {
                ...action.user
            };
        case LOGOUT_SUCCESSFUL:
            return {};
        case REGISTRATION_FAILED:
            return {};
        case REGISTRATION_SUCCESSFUL:
        case VERIFICATION_NEEDED:
            return {
                email: action.email,
            };
        default:
            return state;
    }
};

const clocks = (state = [], action) => {
    switch (action.type) {
        case LOGOUT_SUCCESSFUL:
            return [];
        case CLOCKS_REQUEST_SUCCEEDED:
            console.log("action from clocks request successful: ", action);
            return [...action.clocks];
        case CLOCKS_RETRIEVED:
            return [...action.clocks];
        default:
            return state;
    };
}

const loading = (state = {app: false, dashboard: false}, action) => {
    switch (action.type) {
        case AUTHENTICATION_CHECK_REQUEST:
            return { ...state, app: true }
        case AUTHENTICATION_CHECK_SUCCESS:
        case AUTHENTICATION_CHECK_FAIL:
            return { ...state, app: false }
        case CLOCKS_REQUEST:
            return { ...state, dashboard: true };
        case CLOCKS_REQUEST_SUCCEEDED:
        case CLOCKS_REQUEST_FAILED:
            return { ...state, dashboard: false };
        default:
            return state;
    };
}

const error = (state = { dashboard: false }, action) => {
    switch(action.type) {
        case CLOCKS_REQUEST_FAILED:
            return { ...state,
                dashboard: {
                    flag: true,
                    message: action.message
                }
            };
        default:
            return state;
    }
}

const createRootReducers = (history) => combineReducers({
    user,
    clocks,
    loading,
    error,
});

export default createRootReducers;