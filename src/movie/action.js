'use strict'
import {
    REQUEST_TOP250,RESPONSE_TOP250,
    REQUEST_MOVIES,RESPONSE_MOVIES,
    REQUEST_MOVIE,RESPONSE_MOVIE
} from "./constant"

import api from "../lib/api"

function requestTop250(pageIndex){
    return {
        type:REQUEST_TOP250,
        pageIndex
    }
}

function responseTop250(ret,pageIndex) {
    return {
        type:RESPONSE_TOP250,
        respondAt:Date.now(),
        pageIndex,
        ret
    }
}

export function fetchTop250(pageIndex=0,pageSize=6) {
    return (dispatch)=>{
        dispatch(requestTop250(pageIndex))
        fetch(`${api.top250}?start=${pageIndex * pageSize}&count=${pageSize}`).then((ret)=>ret.json()).then((ret)=>{
            dispatch(responseTop250(ret,pageIndex))
        })
    }
}

function requestMovies(){
    return {
        type:REQUEST_MOVIES
    }
}

function responseMovies(ret) {
    return {
        type:RESPONSE_MOVIES,
        respondAt:Date.now(),
        ret
    }
}

export function fetchMovies() {
    return (dispatch)=>{
        dispatch(requestMovies())
        fetch(api.searchMovies).then((ret)=>ret.json()).then((ret)=>{
            dispatch(responseMovies(ret))
        })
    }
}

function requestMovie(id){
    return {
        type:REQUEST_MOVIE,
        id
    }
}

function responseMovie(ret,id) {
    return {
        type:RESPONSE_MOVIE,
        respondAt:Date.now(),
        id,
        ret
    }
}

export function fetchMovie(id) {
    return (dispatch)=>{
        dispatch(requestMovie(id))
        fetch(`${api.movie}/${id}`).then((ret)=>ret.json()).then((ret)=>{
            dispatch(responseMovie(ret,id))
        })
    }
}