'use strict';

import React, {Component, View, Text,
    ListView, RefreshControl, TouchableOpacity,
    Animated, Image, LayoutAnimation, Platform} from "react-native";
import {Actions} from "react-native-router-flux";
import styles from "./stylesheet";

import {containerByComponent} from "../lib/redux-helper";
import {top250} from "./reducer";
import {fetchTop250} from "./action";

import LoadMore from "../common/loadmore";

class Movies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            refreshing: false
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
    handleRefresh() {
        // this.setState({refreshing:true})
    }
    loadMore() {
        this.props.fetchTop250(this.props.pageIndex + 1)
    }
    handleTapRow(id) {
        Actions.movie({id})
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
    render() {
        const threshold = (Platform.OS === "android" ? 10 : -20);
        return (
            <View style={styles.container}>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this) }
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} title="加载中..." onRefresh={this.handleRefresh.bind(this) }/>}
                    onEndReached={this.loadMore.bind(this) } onEndReachedThreshold={threshold} initialListSize={6}
                    renderFooter={() => this.props.list.length > 0 ? <LoadMore active={this.props.top250Fetching} /> : null}/>
            </View>
        )
    }
}


export default containerByComponent(Movies, top250, { fetchTop250 }, state => state,
    {
        list: [],
        pageIndex: 0,
    ...this.props
})

