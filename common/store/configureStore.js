import rootReducer from '../reducers'
import { createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger' // debugtools

const loggerMiddleware = createLogger()

const logger = store => next => action => {
    console.log('dispatching', action)
    next(action)
    console.log('next state', store.getState())
}

export default function configureStore(preloadedState) {
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware, loggerMiddleware, logger)
    )
    return store
}