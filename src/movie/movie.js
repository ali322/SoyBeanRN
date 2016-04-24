'use strict';

import React,{Component,View} from "react-native";

import {containerByComponent} from "../lib/redux-helper";
import {movieReducer} from "./reducer";
import {fetchMovie} from "./action";

class Movie extends Component{
    componentDidMount(){
        this.props.fetchMovie(this.props.id)
    }
    render(){
        console.log(this.props)
        return (
           <View></View>
        )
    }
}

export default containerByComponent(Movie, movieReducer, {fetchMovie}, state => state,{...this.props})