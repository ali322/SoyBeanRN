'use strict'

import {
    REQUEST_TOP250, RESPONSE_TOP250,
    REQUEST_MOVIES, RESPONSE_MOVIES,
    REQUEST_MOVIE, RESPONSE_MOVIE,
    REQUEST_CAST, RESPONSE_CAST
} from "./constant"

import {combineReducers} from "redux"

export function top250(state = {}, action) {
    switch (action.type) {
        case REQUEST_TOP250:
            return {
                ...state,
                top250Fetching: true,
                top250Fetched: false
            }
        case RESPONSE_TOP250:
            const list = [].concat(state.list, action.ret.subjects)
            return {
                ...state,
                list,
                pageIndex: action.pageIndex,
                top250Fetched: true,
                top250Fetching: false
            }
        default:
            return state
    }
}

export function movies(state = {}, action) {
    switch (action.type) {
        case REQUEST_MOVIES:
            return {
                ...state,
                moviesFetching: true,
                moviesFetched: false
            }
        case RESPONSE_MOVIES:
            const list = [].concat(state.list, action.ret.subjects)
            return {
                ...state,
                list,
                pageIndex: action.pageIndex,
                moviesFetched: true,
                moviesFetching: false
            }
        default:
            return state
    }
}

export function movieReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_MOVIE:
            return {
                ...state,
                movieFetching: true,
                movieFetched: false
            }
        case RESPONSE_MOVIE:
            return {
                ...state,
                movie: action.ret,
                movieFetched: true,
                movieFetching: false
            }
        default:
            return state
    }
}

export function castReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_CAST:
            return {
                ...state,
                castFetching: true,
                castFetched: false
            }
        case RESPONSE_CAST:
            return {
                ...state,
                cast: action.ret,
                castFetching: false,
                castFetched: true
            }
        default:
            return state
    }
}

// export default combineReducers({
    // top250
// })