import { combineReducers } from 'redux';

import {
    LOGIN_SUCCESSFUL,
    REGISTRATION_FAILED,
    REGISTRATION_SUCCESSFUL,
    VERIFICATION_NEEDED,
    CLOCKS_REQUEST,
    CLOCKS_REQUEST_SUCCEEDED,
    CLOCKS_RETRIEVED,
} from 'actions/types';

const user = (state = { newUser: false }, action) => {
    console.log("User reducer: action", action);
    switch (action.type) {
        case LOGIN_SUCCESSFUL:
            return { ...state,
                ...action.user
            };
        case REGISTRATION_FAILED:
            return {};
        case REGISTRATION_SUCCESSFUL:
            // return { ...state,
            //     email: action.email,
            //     newUser: true
            // };
        case VERIFICATION_NEEDED:
            return { ...state,
                email: action.email,
                newUser: true,
            };
        default:
            return state;
    }
};

const clocks = (state = [], action) => {
    switch (action.type) {
        case CLOCKS_REQUEST_SUCCEEDED:
            console.log("action from clocks request successful: ", action);
            return [...action.clocks];
        case CLOCKS_RETRIEVED:
            return [...action.clocks];
        default:
            return state;
    };
}

const loading = (state = {dashboard: false}, action) => {
    switch (action.type) {
        case CLOCKS_REQUEST:
        return { ...state, dashboard: true };
        case CLOCKS_REQUEST_SUCCEEDED:
            return { ...state, dashboard: false };
        default:
            return state;
    };
}

const createRootReducers = (history) => combineReducers({
    user,
    clocks,
    loading,
});

export default createRootReducers;