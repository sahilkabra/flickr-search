import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import './index.css';

import { searchEpic } from './epics';
import { reducer } from './reducer';
import App from './App';

const store = createStore(
    combineReducers({ data: reducer }),
    applyMiddleware(
        createEpicMiddleware(combineEpics(searchEpic)),
        createLogger()
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
