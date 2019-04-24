import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStore, { history } from 'store';
import sagas from 'sagas';

import App from "App";

let store = configureStore();
store.runSaga(sagas);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('app')
);