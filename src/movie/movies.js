'use strict'

import React, {Component, View, Text,
    ListView, RefreshControl, TouchableOpacity,TextInput,
    Animated, Image, LayoutAnimation, Platform} from "react-native"
import {Actions} from "react-native-router-flux"
import NavigationBar from "react-native-navbar"
import styles from "./stylesheet/movies"

import {containerByComponent} from "../lib/redux-helper"
import {movies} from "./reducer"
import {fetchMovies} from "./action"

import LoadMore from "../common/loadmore"
import Loading from "../common/loading"

class Movies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            refreshing: false,
            keyword:""
            // rowScale: new Animated.Value(0)
        }
    }
    componentDidMount() {
        // this.props.fetchTop250()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.moviesFetched && !nextProps.moviesFetching) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.list)
            }, () => {
                LayoutAnimation.spring()
                // this.state.rowScale.setValue(0.9)
                // Animated.timing(this.state.rowScale, {
                //     toValue: 1,
                //     duration: 300
                // }).start()
            })
        }
    }
    handleRefresh() {
        // this.setState({refreshing:true})
    }
    loadMore() {
        this.props.fetchMovies(this.state.keyword,this.props.pageIndex + 1)
    }
    handleTapRow(id) {
        Actions.movie({id})
    }
    handleSearch(){
        this.refs["searchTextInput"].blur()
        this.props.fetchMovies(this.state.keyword)
    }
    renderRow(movie) {
        const cover = <Image style={styles.movieCover} source={{ uri: movie.images["small"] }}/>
        const casts = movie.casts.map((cast) => {
            return cast.name
        })
        return (
            <TouchableOpacity onPress={this.handleTapRow.bind(this, movie.id) }>
            <Animated.View style={[styles.movieCell, {
                // opacity: this.state.rowScale,
                // transform: [{ scaleX: this.state.rowScale }]
            }]}>
                    {cover}
                    <View style={styles.movieBreif}>
                        <Text style={styles.movieTitle}>{movie.title}</Text>
                        <Text style={styles.movieSubtitle}>评分: {movie.rating.average}</Text>
                        <Text style={styles.movieCasts}><Text numberOfLines={2}>演员: {casts.join("/") }</Text></Text>
                    </View>
            </Animated.View>
            </TouchableOpacity>
        )
    }
    renderNavigationBar(){
        return (
        <View style={styles.navigationBar}>
        <TextInput style={styles.navigationBarInput} ref="searchTextInput" placeholder="请输入搜索关键字" clearButtonMode="while-editing" 
        onChangeText={(keyword)=>this.setState({keyword})}/>
        <TouchableOpacity style={styles.navigationBarButton} onPress={this.state.keyword === ""?Actions.pop:this.handleSearch.bind(this)}>
            <Text style={styles.navigationBarButtonText}>{this.state.keyword === ""?"取消":"搜索"}</Text>
        </TouchableOpacity>
        </View>
        )
    }
    render() {
        const threshold = (Platform.OS === "android" ? 10 : -20)
        return (
            <View style={[styles.container,{marginBottom:0,paddingTop:0}]}>
                {this.renderNavigationBar()}
                {this.props.moviesFetching && this.props.list.length === 0?<Loading/>:(
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this) }
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} title="加载中..." onRefresh={this.handleRefresh.bind(this) }/>}
                    onEndReached={this.loadMore.bind(this) } onEndReachedThreshold={threshold} initialListSize={6}
                    renderFooter={() => this.props.list.length > 0 ? <LoadMore active={this.props.moviesFetching} /> : null}/>
                )}
            </View>
        )
    }
}


export default containerByComponent(Movies, movies, { fetchMovies }, state => state,
    {
        list: [],
        pageIndex: 0,
    ...this.props
})