export function GetEnv( title ){
    switch( title ){
        case "node":
            return JSON.parse(process.env.GlobalEnv)["localhost"][title];
            break;
        case "browser":
            return window.__INITIAL_ENV__["localhost"][title];
            break;
    }
}

export function GetSingleCookie( cookies ){
    var arr = document.cookie.match(new RegExp("(^| )"+cookies+"=([^;]*)(;|$)"));
    if(arr != null)
        return unescape(arr[2]);
    return null;
}

export function GetCookie( params, callback ){
    // prototype
    let relCookieID = 'ghost';
    let relCookieToken = null;

    if( !params.Cookie ){
        // NO Cookie Callback Ghost
        callback(null, null)
        return
    }

    // split F
    let cookies = params.Cookie.split('; ')

    // split S
    for(var i = 0 ; i < cookies.length ; i++){
        var tmpCookie = cookies[i].split('=');

        // match F => WCS
        if( tmpCookie[0].match(/^WCS_USERACTIVITY_\d*/)){
            relCookieID = tmpCookie[0].replace('WCS_USERACTIVITY_','')
            relCookieToken = tmpCookie[1];

            // if match Callback Return
            callback(relCookieID, relCookieToken)
            return
        }

        // match F => SOA
        if( tmpCookie[0].match(/^SOA_USERACTIVITY_\d*/)){
            relCookieID = tmpCookie[0].replace('SOA_USERACTIVITY_','')
            relCookieToken = tmpCookie[1];

            // if match Callback Return
            callback(relCookieID, relCookieToken)
            return
        }
    }

    // NO match Callback Ghost
    callback(null, null)
}

export function GetFetch( url, params, callback ){

    if( !url.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/) == null){
        callback({ "status": 1 , "message": "error format Url" });
        return
    }

    if( Object.prototype.toString.call( params ) != "[object Object]" ){
        callback({ "status": 1, "message": "error format Patams" });
        return
    }

    if( params["method"] == null){
        callback({ "status": 1, "message": "error Params Method" });
        return
    }

    if( !params["headers"] ){
        params["headers"] = {};
    }

    params["headers"]["Content-Type"] = "application/json";

    fetch( url, params )
        .then(response => {
            if (response.status >= 200 && response.status < 300) {return Promise.resolve(response)}
            else {return Promise.reject(new Error(response.statusText))}
        })
        .then(json => json.json())
        .then(function(data){
            callback({
                "status":data.status,
                "results":data.results
            })
        })
        .catch(error => {
            callback({
                "status":1,
                "results": error
            })
            console.log({url: url, params : params, error: error })
        })
}