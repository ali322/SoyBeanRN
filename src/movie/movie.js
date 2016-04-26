'use strict'

import React, {Component, View, Image, Text,ListView} from "react-native"
import NavigationBar from "react-native-navbar"
import {Actions} from "react-native-router-flux"

import {containerByComponent} from "../lib/redux-helper"
import {movieReducer} from "./reducer"
import {fetchMovie} from "./action"

import styles from "./stylesheet/movie"

class Movie extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            })
        }
    }
    componentDidMount() {
        this.props.fetchMovie(this.props.id)
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.movieFetching && nextProps.movieFetched){
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(nextProps.movie.casts)
            })
        }
    }
    renderNavigationBar() {
        const titleConfig = {
            title: this.props.movie ? this.props.movie.title : ""
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
        return <ListView contentContainerStyle={styles.movieCasts} 
        dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this) }/>
    }
    renderRow(cast){
        return (
            <View style={styles.movieCast}>
            <Image style={styles.castAvatar} source={{uri:cast.avatars["small"]}}/>
            <Text style={styles.castName}>{cast.name}</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderNavigationBar() }
                {this.renderBreif() }
                {this.renderSummary() }
                {this.renderCasts()}
            </View>
        )
    }
}

export default containerByComponent(Movie, movieReducer, { fetchMovie }, state => state, {...this.props})