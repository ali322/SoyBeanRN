'use strict'
import {
    REQUEST_BOOKS,RESPONSE_BOOKS,
    REQUEST_BOOK,RESPONSE_BOOK
} from "./constant"

import api from "../lib/api"


function requestBooks(pageIndex){
    return {
        type:REQUEST_BOOKS,
        pageIndex
    }
}

function responseBooks(ret,pageIndex) {
    return {
        type:RESPONSE_BOOKS,
        respondAt:Date.now(),
        ret,
        pageIndex
    }
}

export function fetchBooks(keyword="",tag="",pageIndex=0,pageSize=6) {
    return (dispatch)=>{
        dispatch(requestBooks(pageIndex))
        fetch(`${api.searchBook}?q=${keyword}&tag=${tag}&start=${pageIndex * pageSize}&count=${pageSize}`).then((ret)=>ret.json()).then((ret)=>{
            dispatch(responseBooks(ret,pageIndex))
        })
    }
}

function requestBook(id){
    return {
        type:REQUEST_BOOK,
        id
    }
}

function responseBook(ret,id) {
    return {
        type:RESPONSE_BOOK,
        respondAt:Date.now(),
        id,
        ret
    }
}

export function fetchBook(id) {
    return (dispatch)=>{
        dispatch(requestBook(id))
        fetch(`${api.book}/${id}`).then((ret)=>ret.json()).then((ret)=>{
            dispatch(responseBook(ret,id))
        })
    }
}