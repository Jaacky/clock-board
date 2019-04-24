import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';

import createRootReducers from 'reducers';

export const history = createBrowserHistory();

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middleware = [
        sagaMiddleware,
    ];

    return {
        ...createStore(
            createRootReducers(history),
            applyMiddleware(...middleware)
        ),
        history,
        runSaga: sagaMiddleware.run,
    };
};

export default configureStore;