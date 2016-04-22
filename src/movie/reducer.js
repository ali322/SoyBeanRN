'use strict';

import {
    REQUEST_TOP250, RESPONSE_TOP250,
    REQUEST_MOVIES, RESPONSE_MOVIES,
    REQUEST_MOVIE, RESPONSE_MOVIE
} from "./constant"

import {combineReducers} from "redux";

function top250(state = {}, action) {
    switch (action.type) {
        case REQUEST_TOP250:
            return {
                ...state,
                top250Fetching: true,
                top250Fetched: false
            }
        case RESPONSE_TOP250:
            console.log("state",state)
            const list = [].concat(state.list, action.ret.subjects)
            const pageIndex = action.ret.start
            const pageCount = action.ret.count
            return {
                list,pageIndex,pageCount,
                top250Fetched: true,
                top250Fetching: false
            }
        default:
            return state
    }
}

export default combineReducers({
    top250
})