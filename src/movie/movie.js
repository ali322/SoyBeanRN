'use strict'

import React, {Component, View, Image, Text,ListView,TouchableOpacity,ScrollView} from "react-native"
import NavigationBar from "react-native-navbar"
import {Actions} from "react-native-router-flux"

import {containerByComponent} from "../lib/redux-helper"
import {movieReducer} from "./reducer"
import {fetchMovie} from "./action"
import Loading from "../common/loading"

import styles from "./stylesheet/movie"

class Movie extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {
        this.props.fetchMovie(this.props.id)
    }
    renderNavigationBar() {
        const titleConfig = {
            title: this.props.movie ? this.props.movie.title : "加载中"
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
        const {movie} = this.props
        if (!movie) {
            return null
        }
        return (
            <View style={styles.movieCell}>
                <View><Image style={styles.movieCover} source={{ uri: movie.images["small"] }}/></View>
                <View style={styles.movieBreif}>
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    <Text style={[styles.movieSubtitle, styles.movieAka]}>{movie.aka.join(" ") }</Text>
                    <Text style={styles.movieSubtitle}>评分: {movie.rating.average}</Text>
                    <Text style={styles.movieSubtitle}>导演: {movie.directors.map((v) => v.name).join("/") }</Text>
                    <Text style={styles.movieSubtitle}>上映: {movie.year}</Text>
                    <Text style={styles.movieSubtitle}>国家: {movie.countries.join("/") }</Text>
                </View>
            </View>
        )
    }
    renderSummary() {
        const {movie} = this.props
        if (!movie) {
            return null
        }
        return <Text style={styles.movieSummary}>{movie.summary}</Text>
    }
    renderCasts(){
        const {movie} = this.props
        if(!movie){
            return null
        }
        const casts = movie.casts.map((cast,i)=>{
            return (
                <TouchableOpacity onPress={()=>Actions.cast({id:cast.id})} style={styles.movieCast} key={i}>
                <Image style={styles.castAvatar} source={{uri:cast.avatars["small"]}}/>
                <Text style={styles.castName}>{cast.name}</Text>
                </TouchableOpacity>
            )
        })
        return <View style={styles.movieCasts}>{casts}</View>
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderNavigationBar() }
                {this.props.movieFetching?<Loading />:(
                    <ScrollView>
                    {this.renderBreif() }
                    {this.renderSummary() }
                    {this.renderCasts()}
                    </ScrollView>
                )}
            </View>
        )
    }
}

export default containerByComponent(Movie, movieReducer, { fetchMovie }, state => state, {...this.props})