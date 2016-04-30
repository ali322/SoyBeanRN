'use strict'

import React,{View,TouchableOpacity} from "react-native"
import {Scene,Actions} from "react-native-router-flux"
import Icon from "react-native-vector-icons/MaterialIcons"
import Events from "./events"
import Event from "./event"

let scenes = [
    <Scene key="events" component={Events} hideNavBar={true} hideTabBar={false}></Scene>,
    <Scene key="event" component={Event} hideNavBar={true} hideTabBar={true}></Scene>
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