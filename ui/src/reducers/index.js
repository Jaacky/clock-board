import { combineReducers } from 'redux';

import {
    AUTHENTICATION_CHECK_REQUEST,
    AUTHENTICATION_CHECK_SUCCESS,
    AUTHENTICATION_CHECK_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTRATION_FAIL,
    REGISTRATION_SUCCESS,
    VERIFICATION_NEEDED,
    CLOCKS_REQUEST,
    CLOCKS_REQUEST_SUCCESS,
    CLOCKS_REQUEST_FAIL,
    ADD_CLOCK_REQUEST,
    ADD_CLOCK_REQUEST_SUCCESS,
    ADD_CLOCK_REQUEST_FAIL,
    REMOVE_CLOCK_REQUEST,
    REMOVE_CLOCK_REQUEST_SUCCESS,
    REMOVE_CLOCK_REQUEST_FAIL,
} from 'actions/types';

const user = (state = {}, action) => {
    console.log("User reducer: action", action);
    switch (action.type) {
        case AUTHENTICATION_CHECK_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                email: action.email,
            };
        case LOGOUT_SUCCESS:
            return {};
        case REGISTRATION_FAIL:
            return {};
        case REGISTRATION_SUCCESS:
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
        case LOGOUT_SUCCESS:
            return [];
        case CLOCKS_REQUEST_SUCCESS:
            console.log("action from clocks request successful: ", action);
            return [...action.clocks];
        case ADD_CLOCK_REQUEST_SUCCESS:
            return [...state, action.clock];
        case REMOVE_CLOCK_REQUEST_SUCCESS:
            console.log("remove clock success, action.id, action.ends_at", action.id, action.ends_at)
            return state.filter(clock => {
                console.log(clock.id !== action.id && clock.ends_at !== action.ends_at);
                console.log("id: ", clock.id, action.id, clock.id !== action.id);
                console.log("ends_at: ", clock.ends_at, action.ends_at, clock.ends_at !== action.ends_at);
                return clock.id !== action.id && clock.ends_at !== action.ends_at;
            });
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
        case CLOCKS_REQUEST_SUCCESS:
        case CLOCKS_REQUEST_FAIL:
            return { ...state, dashboard: false };
        case ADD_CLOCK_REQUEST:
            return { ...state, clockForm: true };
        case ADD_CLOCK_REQUEST_SUCCESS:
        case ADD_CLOCK_REQUEST_FAIL:
            return { ...state, clockForm: false };
        // case REMOVE_CLOCK_REQUEST:
        //     return { ...state, clockForm: true };
        // case REMOVE_CLOCK_REQUEST_SUCCESS:
        // case REMOVE_CLOCK_REQUEST_FAIL:
        //     return { ...state, clockForm: false };
        default:
            return state;
    };
}

const error = (state = { dashboard: false }, action) => {
    switch(action.type) {
        case CLOCKS_REQUEST_FAIL:
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