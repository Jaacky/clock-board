import { combineReducers } from 'redux';

import {
    LOGIN_SUCCESSFUL,
    CLOCKS_RETRIEVED,
    REGISTRATION_FAILED,
    REGISTRATION_SUCCESSFUL
} from 'actions/types';

const user = (state = { newUser: false }, action) => {
    console.log("User reducer: action", action);
    switch (action.type) {
        case LOGIN_SUCCESSFUL:
            console.log("user reducer, case login")
            return { ...state,
                ...action.user
            };
        case REGISTRATION_SUCCESSFUL:
            return { ...state,
                email: action.email,
                newUser: true
            };
        case REGISTRATION_FAILED:
            return {};
        default:
            return state;
    }
};

const clocks = (state = [], action) => {
    switch (action.type) {
        case CLOCKS_RETRIEVED:
            return [...action.clocks];
        default:
            return state;
    };
}

const createRootReducers = (history) => combineReducers({
    user,
    clocks,
});

export default createRootReducers;