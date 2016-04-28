'use strict'

import React,{Component,Text,View,TouchableOpacity,Image} from "react-native"
import NavigationBar from "react-native-navbar"
import {Actions} from "react-native-router-flux"

import {containerByComponent} from "../lib/redux-helper"
import {castReducer} from "./reducer"
import {fetchCast} from "./action"

import styles from "./stylesheet/movie"

class Cast extends Component{
    componentDidMount() {
        this.props.fetchCast(this.props.id)
    }
    renderBreif(){
        const {cast} = this.props
        if(!cast){
            return null
        }
        return (
            <View style={styles.movieCell}>
                <View><Image style={styles.movieCover} source={{ uri: cast.avatars["small"] }}/></View>
                <View style={styles.movieBreif}>
                    <Text style={styles.movieTitle}>{cast.name}</Text>
                    <Text style={[styles.movieSubtitle, styles.castAka]}>{cast.aka.join(" ") }</Text>
                    <Text style={[styles.movieSubtitle, styles.castAka]}>{cast.aka_en.join(" ") }</Text>
                    <Text style={styles.movieSubtitle}>英文名: {cast.name_en}</Text>
                    <Text style={styles.movieSubtitle}>性别: {cast.gender}</Text>
                    <Text style={styles.movieSubtitle}>出生地: {cast.born_place }</Text>
                </View>
            </View>
        )
    }
    renderWorks(){
        const {cast} = this.props
        if(!cast){
            return null
        }
        const works = cast.works.map((work,i)=>{
            const movie = work.subject
            return (
                <TouchableOpacity onPress={()=>Actions.movie({id:movie.id})} style={styles.movieCast} key={i}>
                <Image style={styles.castAvatar} source={{uri:movie.images["small"]}}/>
                <Text style={styles.castName}>{movie.title}</Text>
                </TouchableOpacity>
            )
        })
        return <View style={styles.movieCasts}>{works}</View>
    }
    renderNavigationBar() {
        const titleConfig = {
            title: this.props.cast ? this.props.cast.name : ""
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
    render(){
        return (
            <View>
            {this.renderNavigationBar()}
            {this.renderBreif()}
            {this.renderWorks()}
            </View>
        )
    }
}

export default containerByComponent(Cast,castReducer,{fetchCast},state=>state,{...this.props})