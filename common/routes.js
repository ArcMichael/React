import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Home from './containers/Home'
import Error from './containers/404'
import Category from './containers/Category'

export default (
    <Route path="/">
        <Route path="/" component={Home} />
        <IndexRoute component={Home} />
        <Route path="Category" component={Category}>
            <Route path=":userID" component={Category} />
        </Route>
        <Route path="*" component={Error}/>
    </Route>
)