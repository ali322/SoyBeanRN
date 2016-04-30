'use strict'

import React,{Component,View,Image,Text,ScrollView} from "react-native"
import {Actions} from "react-native-router-flux"
import NavigationBar from "react-native-navbar"

import {containerByComponent} from "../lib/redux-helper"
import {eventReducer} from "./reducer"
import {fetchEvent} from "./action"

import styles from "./stylesheet/movie"

class Event extends Component{
    componentDidMount(){
        this.props.fetchEvent(this.props.id)
    }
    renderNavigationBar() {
        const titleConfig = {
            title: this.props.event ? this.props.event.title : "加载中"
        }
        const leftButtonConfig = {
            title: "返回",
            handler: () => Actions.pop()
        }
        return <NavigationBar title={titleConfig} leftButton={leftButtonConfig} style={{
            borderBottomWidth: 0.5,
            borderBottomColor: "#DDD"
        }}/>
    }
    renderBreif() {
        const {event} = this.props
        if (!event) {
            return null
        }
        return (
            <View style={styles.movieCell}>
                <View><Image style={styles.movieCover} source={{ uri: event.image}}/></View>
                <View style={styles.movieBreif}>
                    <Text style={styles.movieTitle}>{event.title}</Text>
                    <Text style={styles.movieSubtitle}>地点: {event.address}</Text>
                    <Text style={styles.movieSubtitle}>开始时间: {event.begin_time}</Text>
                    <Text style={styles.movieSubtitle}>结束时间: {event.end_time}</Text>
                </View>
            </View>
        )
    }
    renderSummary() {
        const {event} = this.props
        if (!event) {
            return null
        }
        return <Text style={styles.movieSummary}>{event.content}</Text>
    }
    render(){
        return (
            <View style={styles.container}>
            {this.renderNavigationBar()}
            <ScrollView>
            {this.renderBreif()}
            {this.renderSummary()}
            </ScrollView>
            </View>
        )
    }
}

export default containerByComponent(Event,eventReducer,{fetchEvent},state=>state,{...this.props})