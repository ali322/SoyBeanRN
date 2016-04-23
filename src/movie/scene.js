'use strict';

import React,{View} from "react-native";
import {Scene} from "react-native-router-flux";
import Icon from "react-native-vector-icons/MaterialIcons";
import Movies from "./movies";

let scenes = [
    <Scene key="movies" component={Movies} title="Top250" initial={true} renderLeftButton={()=>{
        return <View style={rightButtonStyle}><Icon name="search" size={20} /></View>
    }}></Scene>
]

const rightButtonStyle = {
    width:44,
    height:44,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    right:0,
}

export default scenes