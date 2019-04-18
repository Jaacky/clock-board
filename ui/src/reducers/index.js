import { combineReducers } from 'redux';

import {
    LOGIN,
    CLOCKS_RETRIEVED,
} from 'actions/types';

const user = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
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