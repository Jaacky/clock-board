import { combineReducers } from 'redux';

import { LOGIN } from 'actions/types';

const user = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, ...action.user };
        default:
            return state;
    }
};

const reducers = combineReducers({
    user,
});

export default reducers;