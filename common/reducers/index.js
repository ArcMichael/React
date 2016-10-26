import { combineReducers } from 'redux';
import { routerReducer  } from 'react-router-redux';

import SEO from "./SEO"

const rootReducer = combineReducers({
    SEO,
    routing: routerReducer
});

export default rootReducer;