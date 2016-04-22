'use strict';
import {
    REQUEST_TOP250,RESPONSE_TOP250,
    REQUEST_MOVIES,RESPONSE_MOVIES,
    REQUEST_MOVIE,RESPONSE_MOVIE
} from "./constant"

import api from "../lib/api";

function requestTop250(){
    return {
        type:REQUEST_TOP250,
    }
}

function responseTop250(ret) {
    return {
        type:RESPONSE_TOP250,
        respondAt:Date.now(),
        ret
    }
}

export function fetchTop250(pageIndex=0) {
    return (dispatch)=>{
        dispatch(requestTop250())
        fetch(api.top250).then((ret)=>ret.json()).then((ret)=>{
        console.log('top250',ret)
            dispatch(responseTop250(ret))
        })
    }
}

function requestMovies(){
    return {
        type:REQUEST_MOVIES,
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

function requestMovie(){
    return {
        type:REQUEST_MOVIE,
    }
}

function responseMovie(ret) {
    return {
        type:RESPONSE_MOVIE,
        respondAt:Date.now(),
        ret
    }
}

export function fetchMovie() {
    return (dispatch)=>{
        dispatch(requestMovie())
        fetch(api.movie).then((ret)=>ret.json()).then((ret)=>{
            dispatch(responseMovie(ret))
        })
    }
}