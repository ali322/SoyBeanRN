'use strict'

import React,{Component,View,Text,Image,Platform,LayoutAnimation,ListView,RefreshControl,TouchableOpacity,Animated} from "react-native"
import {Actions} from "react-native-router-flux"
import NavigationBar from "react-native-navbar"
import {containerByComponent} from "../lib/redux-helper"
import {eventsReducer} from "./reducer"
import {fetchEvents,fetchLocations} from "./action"

import styles from "./stylesheet/movies"

import LoadMore from "../common/loadmore"
import Loading from "../common/loading"

class Events extends Component{
     constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            refreshing: false
        }
    }
    componentDidMount(){
        this.props.fetchLocations()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.eventsFetched && !nextProps.eventsFetching) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.list)
            }, () => {
                LayoutAnimation.spring()
            })
        }
    }
    handleRefresh(){
        
    }
    loadMore() {
        const {city,pageIndex} = this.props
        this.props.fetchEvents(city.id,pageIndex + 1)
    }
    handleTapRow(id) {
        Actions.event({id})
    }
    renderRow(event) {
        const cover = <Image style={styles.movieCover} source={{ uri: event["image_lmobile"]}}/>
        return (
            <TouchableOpacity onPress={this.handleTapRow.bind(this, event.id) }>
            <Animated.View style={[styles.movieCell, {
                // opacity: this.state.rowScale,
                // transform: [{ scaleX: this.state.rowScale }]
            }]}>
                    {cover}
                    <View style={styles.movieBreif}>
                        <Text style={styles.movieTitle}>{event.title}</Text>
                        <Text style={styles.movieSubtitle}>举办者: {event.owner.name}</Text>
                        <Text style={styles.movieSubtitle}>开始时间: {event.begin_time}</Text>
                        <Text style={styles.movieSubtitle}>结束时间: {event.end_time}</Text>
                    </View>
            </Animated.View>
            </TouchableOpacity>
        )
    }
    renderNavigationBar(){
        const titleConfig = {
            title: this.props.city ? this.props.city.name : "加载中"
        }
        return <NavigationBar title={titleConfig} style={{
            borderBottomWidth: 0.5,
            borderBottomColor: "#DDD"
        }}/>
    }
    render(){
        const threshold = (Platform.OS === "android" ? 10 : -20)
        return (
            <View style={[styles.container,{marginBottom:0,paddingTop:0}]}>
                {this.renderNavigationBar()}
                {this.props.eventsFetching && this.props.list.length === 0?<Loading/>:(
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this) }
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} title="加载中..." onRefresh={this.handleRefresh.bind(this) }/>}
                    onEndReached={this.loadMore.bind(this) } onEndReachedThreshold={threshold} initialListSize={6}
                    renderFooter={() => this.props.list.length > 0 ? <LoadMore active={this.props.eventsFetching} /> : null}/>
                )}
            </View>
        )
    }
}


export default containerByComponent(Events,eventsReducer,{fetchEvents,fetchLocations},state=>state,{
    list: [],
    pageIndex: 0,
    ...this.props
})


