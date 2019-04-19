import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from 'reducers';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middleware = [
        sagaMiddleware,
    ];

    return {
        ...createStore(
            reducers,
            applyMiddleware(...middleware)
        ),
        runSaga: sagaMiddleware.run,
    };
};

export default configureStore;