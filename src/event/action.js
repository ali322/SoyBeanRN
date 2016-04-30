'use strict'

import {
    REQUEST_LOCATIONS,RESPONSE_LOCATIONS,
    REQUEST_EVENTS,RESPONSE_EVENTS,
    REQUEST_EVENT,RESPONSE_EVENT,
    CHANGE_CITY
} from "./constant"

import api from "../lib/api"

export function changeCity(city) {
    return {
        type:CHANGE_CITY,
        city
    }
}

function requestLocations() {
    return {
        type:REQUEST_LOCATIONS
    }
}

function responseLocations(ret) {
    return {
        type:RESPONSE_LOCATIONS,
        ret,
        respondAt:Date.now()
    }
}

export function fetchLocations() {
    return (dispatch)=>{
        dispatch(requestLocations())
        fetch(`${api.eventLocations}`).then((ret)=>ret.json()).then((ret)=>{
            const city = ret.locs.filter((loc)=>{return loc.name === "长沙"})[0]
            dispatch(changeCity(city))
            dispatch(fetchEvents(city.id))
            dispatch(responseLocations(ret))
        })
    }
}

function requestEvents(id,pageIndex) {
    return {
        type:REQUEST_EVENTS,
        id,pageIndex
    }
}

function responseEvents(ret,id,pageIndex) {
    return {
        type:RESPONSE_EVENTS,
        id,pageIndex,ret,
        respondAt:Date.now()
    }
}

export function fetchEvents(id,pageIndex=0,pageSize=6,dayType="weekend",type="all") {
    return (dispatch)=>{
        dispatch(requestEvents(id,pageIndex))
        fetch(`${api.events}?loc=${id}&day_type=${dayType}&type=${type}&start=${pageIndex * pageSize}&count=${pageSize}`).then((ret)=>ret.json()).then((ret)=>{
            dispatch(responseEvents(ret,id,pageIndex))
        })
    }
}

function requestEvent(id) {
    return {
        type:REQUEST_EVENT,
        id
    }
}

function responseEvent(ret,id) {
    return {
        type:RESPONSE_EVENT,
        ret,id,
        respondAt:Date.now()
    }
}

export function fetchEvent(id) {
    return (dispatch)=>{
        dispatch(requestEvent(id))
        fetch(`${api.event}/${id}`).then((ret)=>ret.json()).then((ret)=>{
            dispatch(responseEvent(ret,id))
        })
    }
}