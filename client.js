import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router'
import Routers from './common/routes';
// client scope
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import rootReducer from './common/reducers/'

import configureStore from './common/store/configureStore'

const store = configureStore(window.__INITIAL_STATE__)

const history = syncHistoryWithStore (browserHistory, store);
const root = document.getElementById('root')

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {Routers}
        </Router>
    </Provider>,
    root
)