'use strict'

import {
    REQUEST_LOCATIONS,RESPONSE_LOCATIONS,
    REQUEST_EVENTS,RESPONSE_EVENTS,
    REQUEST_EVENT,RESPONSE_EVENT,
    CHANGE_CITY
} from "./constant"

export function eventsReducer(state={},action) {
    switch (action.type) {
        case CHANGE_CITY:
            return {
                ...state,
                city:action.city
            }
        case REQUEST_LOCATIONS:
            return {
                ...state,
                locationsFetching:true,
                locationsFetched:false
            }
        case RESPONSE_LOCATIONS:
            return {
                ...state,
                locations:action.ret,
                locationsFetched:true,
                locationsFetching:false
            }
        case REQUEST_EVENTS:
            return {
                ...state,
                eventsFetching:true,
                eventsFetched:false
            }
        case RESPONSE_EVENTS:
           const list = [].concat(state.list, action.ret.events)
           return {
               ...state,
               list,
               pageIndex: action.pageIndex,
               eventsFetched:true,
               eventsFetching:false
           }
        default:
            return state
    }
}

export function eventReducer(state={},action) {
    switch (action.type) {
        case REQUEST_EVENT:
            return {
                ...state,
                eventFetching:true,
                eventFetched:false
            }
        case RESPONSE_EVENT:
           return {
               ...state,
               event:action.ret,
               eventFetched:true,
               eventFetching:false
           }
        default:
            return state
    }
}