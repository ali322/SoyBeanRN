'use strict'

import {
    REQUEST_BOOKS, RESPONSE_BOOKS,
    REQUEST_BOOK, RESPONSE_BOOK
} from "./constant"

import {combineReducers} from "redux"

export function booksReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_BOOKS:
            return {
                ...state,
                booksFetching: true,
                booksFetched: false
            }
        case RESPONSE_BOOKS:
            const list = [].concat(state.list, action.ret.books)
            return {
                ...state,
                list,
                pageIndex: action.pageIndex,
                booksFetched: true,
                booksFetching: false
            }
        default:
            return state
    }
}

export function bookReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_BOOK:
            return {
                ...state,
                bookFetching: true,
                bookFetched: false
            }
        case RESPONSE_BOOK:
            return {
                ...state,
                book: action.ret,
                bookFetched: true,
                bookFetching: false
            }
        default:
            return state
    }
}

// export default combineReducers({
    // top250
// })