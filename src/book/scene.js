'use strict'

import React,{View,TouchableOpacity} from "react-native"
import {Scene,Actions} from "react-native-router-flux"
import Icon from "react-native-vector-icons/MaterialIcons"
import Book from "./book"
import Books from "./books"

let scenes = [
    <Scene key="books" component={Books} hideNavBar={true} initial={true}></Scene>,
    <Scene key="book" component={Book} hideNavBar={true} hideTabBar={true}></Scene>
]

export default scenes