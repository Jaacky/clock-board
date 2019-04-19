import { combineReducers } from 'redux';

import {
    LOGIN_SUCCESSFUL,
    CLOCKS_RETRIEVED,
} from 'actions/types';

const user = (state = {}, action) => {
    console.log("User reducer: action", action);
    switch (action.type) {
        case LOGIN_SUCCESSFUL:
            console.log("user reducer, case login")
            return { ...state, ...action.user };
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

const reducers = combineReducers({
    user,
    clocks,
});

export default reducers;