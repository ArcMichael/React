import express from 'express'
import path from 'path'
import compression from 'compression'
import bodyParser from 'body-parser'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './common/reducers/index'

const os = require('os');
const fs = require('fs');

const globalConfig = require("./configuration/ConfigEnv.json");

let GlobalPort = process.argv[2];
let GlobalEnv = process.argv[3];

let GlobalTotal = globalConfig[GlobalEnv];

process.env.GlobalEnv = JSON.stringify( GlobalTotal )

//console.log( EnvConfig )

/**
 * PORT 60010
 * Env production 生产
 * Env development 开发
 * Env phoenix 代理
 * @type {*|number}
 */

// store
import configureStore from './common/store/configureStore'

// router
import routes from './common/routes'
import api from './routes/api'

// app
const app = express(); // app
app.use(compression()); // gzip
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// serve our static stuff like index.css
var totalCacheTime = 86400000/2;

app.use(express.static(path.join(__dirname, 'public'), {index: false, maxAge: totalCacheTime}));

function renderFullPage( parameters ) {

    /**
     * HTML HTML
     * STORE REACT-REDUX
     * DATA TIME
     * HASH CSS JS
     */

    console.log(parameters.STORE)

    return `
    <!doctype html public="SOA">
    <html>
    <head>
        <meta charset="UTF-8">
        <link type="image/x-icon" href="http://s3.sephorastatic.cn/wcsfrontend/members/common/favicon.ico" rel="shortcut icon">
        <meta name="description" content="${ parameters.STORE.SEO.results.description }">
        <meta name="keywords" content="${ parameters.STORE.SEO.results.keywords }">
        <title>${ parameters.STORE.SEO.results.title }</title>
        <link rel=stylesheet href=`+ parameters.HASH.main.css +`>
    </head>
    </body>
        <div id=root>${ parameters.HTML }</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify( parameters.STORE )};
            window.__INITIAL_ENV__ = ${JSON.stringify( parameters.ENV )}
        </script>
        <script src="` + parameters.HASH.vendor.js + `"></script>
        <script src="` + parameters.HASH.main.js + `"></script>
    </body>
    </html>
   `
}

// api router
// send all requests to index.html so browserHistory works
app.use(/^\/api/, api );
app.get('*', (req, res) => {

    const Hash = require('./common/configuration/hash.json')

    // server scope
    match({routes: routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        }else if(redirectLocation){
            res.redirectLocation(redirectLocation.pathname + redirectLocation.search)
        }else if(renderProps){

            // PathName
            let Address = renderProps.location.pathname;

            let preloadedState = {}

            preloadedState['SEO'] = {};
            preloadedState['SEO']['status'] = 0;
            preloadedState['SEO']['message'] = "Defaults";
            preloadedState['SEO']['results'] = {};
            preloadedState['SEO']['results']["title"] = "Title";
            preloadedState['SEO']['results']['description'] = "Description";
            preloadedState['SEO']['results']['keywords'] = "Keywords";

            const store = configureStore(preloadedState);
            const html = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps}/>
                </Provider>
            );

            res.end(renderFullPage({
                "HTML": html,
                "STORE": store.getState(),
                "HASH": Hash,
                "ENV": GlobalTotal
            }));

        } else {
            res.type('html').status(404).send('Not Found - Node')
        }
    })
});

app.listen( GlobalPort , (error) => {
    if (error) {
        console.error(error)
    } else {
        console.info(`==> 🌎  Listening on port${GlobalPort} . Open up http://localhost:${GlobalPort}/ in your browser.`)
    }
});