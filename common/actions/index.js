import * as types from "../constants/ActionTypes";
import * as action from "../lib/SLP"

export const getUI = () => {
    return (dispatch, getState) => {
        dispatch({type: types.UI, UI } )
    }
}

export const getHeaderStore = () => {
    return (dispatch, getState) => {
        action.apiTopScroll(json => {
            if( json.status == "0" ){
                dispatch({type:types.MAK_SCROLL, MAK_SCROLL:json.results })
            }
        })
    }
}