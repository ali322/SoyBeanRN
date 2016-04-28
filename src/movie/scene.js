'use strict'

import React,{View} from "react-native"
import {Scene,Actions} from "react-native-router-flux"
import Icon from "react-native-vector-icons/MaterialIcons"
import Top250 from "./top250"
import Movie from "./movie"
import Movies from "./movies"
import Cast from "./cast"

let scenes = [
    <Scene key="top250" component={Top250} title="Top250" initial={true} renderLeftButton={()=>{
        return <View style={rightButtonStyle}><Icon name="search" size={20} onPress={Actions.movies}/></View>
    }}></Scene>,
    <Scene key="movies" component={Movies} hideNavBar={true} hideTabBar={true}></Scene>,
    <Scene key="movie" component={Movie} hideNavBar={true} hideTabBar={true}></Scene>,
    <Scene key="cast" component={Cast} hideNavBar={true} hideTabBar={true}></Scene>
]

const rightButtonStyle = {
    width:44,
    height:44,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    right:0
}

export default scenes