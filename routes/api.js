var express = require('express');
var router = express.Router();

import { GetEnv, GetCookie, GetFetch } from "../common/lib/Tools"

// Ajax -- es6-promise
require('es6-promise').polyfill();
import 'isomorphic-fetch'

router.get('/', function(req, res) {
    res.send('obligate apis');
});

router.get('/UI/GET/:ui/', function(req, res){
    var ui = req.params.ui;
    var method = "GET";

    var locationHost = JSON.parse( process.env.GlobalEnv )["restfulUrl"]

    switch(ui){
        case "queryCurrentMonthWord":
            getCookie( {"Cookie" : req.headers.cookie }, (UID, Token) => {
                getFetch( `${locationHost}/v1/wcs/product/queryCurrentMonthWord`,{
                    "method": method ,
                    "headers":{
                        UID,
                        Token
                    }
                },rel => {
                    res.send(rel)
                })
            })
            break;
        case "getOfflineShopInfo":
            getCookie( {"Cookie" : req.headers.cookie }, (UID, Token) => {
                // 顶部文字轮播器 海涛 10001
                getFetch( `${locationHost}/v1/offlineShop/getOfflineShopInfo`,{
                    "method": method ,
                    "headers":{
                        UID,
                        Token
                    }
                },rel => {
                    res.send(rel)
                })
            })
            break;
    }
})

router.post('/',function(req, res){
    res.send("json")
})

router.post('/UI/POST/:ui/', function(req, res){
    var ui = req.params.ui;
    var key = req.query.key;
    var body = req.body;
    var bodyStringify = JSON.stringify(body);
    var method = "POST";

    var locationHost = JSON.parse( process.env.GlobalEnv )["restfulUrl"];

    switch(ui){
        case "quickView":
            getCookie( {"Cookie" : req.headers.cookie }, (UID, Token) => {
                // QuickView Tim
                getFetch( locationHost + '/v1/product/productQuickView', {
                    "method" : method ,
                    "headers" : { UID : UID, Token : Token },
                    "body": '{ "queryBody":{"catentryId":'+ body.productId +'}}',
                    "timeout": 3000
                },function(rel){
                    res.send(rel)
                })
            });
            break;
        case "autoSuggest":
            getCookie( {"Cookie" : req.headers.cookie }, (UID, Token) => {
                // 顶部文字轮播器 海涛 10001
                getFetch( locationHost + '/v1/product/autoSuggest', {
                    "method" : method ,
                    "headers" : { UID : UID, Token : Token },
                    "body": bodyStringify
                },function(rel){
                    res.send(rel)
                })
            });
            break;
        case "topScroll":
            getCookie( {"Cookie" : req.headers.cookie }, (UID, Token) => {
                // 顶部文字轮播器 海涛 10001
                getFetch( locationHost + '/v1/marketing/imgKeyActivity/getResourcesOnline',{
                    "method" : method,
                    "headers" : { UID : UID, Token : Token },
                    "body" : '{ "queryBody" :{ "adPositionCode": "10001", "channel": 1, "currentDate": "2016-08-28T03:20:08.681Z", "limit": 10, "userGroup": "1" }}'
                },function(rel){
                    res.send(rel)
                })
            })
            break;
        case "guessYouLikeSlider":
            getCookie( {"Cookie" : req.headers.cookie }, (UID, Token) => {
                // 猜你喜欢轮播器 Roger
                getFetch( locationHost + '/v1/crm/product/queryGuessYouLikeProducts',{
                    "method": method,
                    "headers" : { UID : UID, Token : Token },
                    "body":'{"queryBody":{"userId":'+ UID +',"storeId":"10001"}}'
                },function(rel){
                    res.send(rel)
                })
            })
            break;
        case "guessYouLikeTags":
            getCookie( {"Cookie" : req.headers.cookie }, (UID, Token) => {
                // 顶部文字轮播器 海涛 10001
                getFetch( locationHost + '/v1/marketing/imgKeyActivity/getResourcesOnline',{
                    "method": method,
                    "headers" : { UID : UID, Token : Token },
                    "body":'{ "queryBody" :{ "adPositionCode": "10004", "channel": 1, "currentDate": "2016-08-28T03:20:08.681Z", "limit": 10, "userGroup": "1" }}'
                },function(rel){
                    res.send(rel)
                })
            })
            break;
        case "guessYouLikeMore":
            getCookie( {"Cookie" : req.headers.cookie }, (UID, Token) => {
                // 猜你喜欢右侧更多 10005 海涛
                getFetch( locationHost + '/v1/marketing/imgKeyActivity/getResourcesOnline',{
                    "method": method,
                    "headers" : { UID : UID, Token : Token },
                    "body":'{ "queryBody" :{ "adPositionCode": "10005", "channel": 1, "currentDate": "2016-08-28T03:20:08.681Z", "limit": 10, "userGroup": "1" }}'
                },function(rel){
                    res.send(rel)
                })
            })
            break;
        case "QuickView":
            break;
    }
})

// Not Match
router.get('/*', function(req, res){
    res.send({
        "status": 1,
        "message": "参数错误"
    })
})

router.post('/*', function(req, res){
    res.send({
        "status": 1,
        "message": "参数错误"
    })
})

module.exports = router;