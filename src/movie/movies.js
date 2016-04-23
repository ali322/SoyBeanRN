'use strict';

import React, {Component, View, Text, ListView, Animated, Image, LayoutAnimation} from "react-native";
import styles from "./stylesheet";

import {containerByComponent} from "../lib/redux-helper";
import rootReducer from "./reducer";
import * as actions from "./action";

class Movies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            // rowScale: new Animated.Value(0)
        }
    }
    componentDidMount() {
        this.props.fetchTop250()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.top250Fetched && !nextProps.top250Fetching) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.list)
            }, () => {
                LayoutAnimation.spring();
                // this.state.rowScale.setValue(0.9)
                // Animated.timing(this.state.rowScale, {
                //     toValue: 1,
                //     duration: 300
                // }).start()
            })
        }
    }
    loadMore() {
        console.log("loadmore")
        // this.props.fetchTop250(this.props.pageIndex + 1)
    }
    renderRow(movie) {
        const cover = <Image style={styles.movieCover} source={{ uri: movie.images["small"] }}/>
        const casts = movie.casts.map((cast) => {
            return cast.name
        })
        return (
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
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this) }
                    onEndReached={this.loadMore.bind(this) } onEndReachedThreshold={-20} initialListSize={6}/>
            </View>
        )
    }
}


export default containerByComponent(Movies, rootReducer, actions, state => state.top250,
    {
        top250: {
            list: [],
            pageIndex: 0,
        ...this.props
    }})

