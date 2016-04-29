'use strict'

import React, {Component, View, Text,
    ListView, RefreshControl, TouchableOpacity,TextInput,
    Animated, Image, LayoutAnimation, Platform} from "react-native"
import {Actions} from "react-native-router-flux"
import NavigationBar from "react-native-navbar"
import styles from "./stylesheet/books"

import {containerByComponent} from "../lib/redux-helper"
import {booksReducer} from "./reducer"
import {fetchBooks} from "./action"

import LoadMore from "../common/loadmore"
import Loading from "../common/loading"

class Books extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            refreshing: false,
            keyword:"",
            tag:"经典"
            // rowScale: new Animated.Value(0)
        }
    }
    componentDidMount() {
        this.props.fetchBooks("",this.state.tag)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.booksFetched && !nextProps.booksFetching) {
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
        this.props.fetchBooks(this.state.keyword,this.state.tag,this.props.pageIndex + 1)
    }
    handleTapRow(id) {
        Actions.book({id})
    }
    handleSearch(){
        this.refs["searchTextInput"].blur()
        this.props.fetchBooks(this.state.keyword)
    }
    handleChange(keyword){
        if(keyword){
            this.setState({keyword,tag:""})
        }else{
            this.setState({keyword,tag:"经典"})
        }
    }
    renderRow(book) {
        const cover = <Image style={styles.movieCover} source={{ uri: book.image }}/>
        return (
            <TouchableOpacity onPress={this.handleTapRow.bind(this, book.id) }>
            <Animated.View style={[styles.movieCell, {
                // opacity: this.state.rowScale,
                // transform: [{ scaleX: this.state.rowScale }]
            }]}>
                    {cover}
                    <View style={styles.movieBreif}>
                        <Text style={styles.movieTitle}>{book.title}</Text>
                        <Text style={styles.movieSubtitle}>评分: {book.rating.average}</Text>
                        <Text style={styles.movieSubtitle}>作者: {book.author.join("/")}</Text>
                        <Text style={styles.movieSubtitle}>出版日期: {book.pubdate}</Text>
                    </View>
            </Animated.View>
            </TouchableOpacity>
        )
    }
    renderNavigationBar(){
        return (
        <View style={styles.navigationBar}>
        <TextInput style={styles.navigationBarInput} ref="searchTextInput" placeholder="请输入搜索关键字" clearButtonMode="while-editing" 
        onChangeText={this.handleChange.bind(this)}/>
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
                {this.props.booksFetching && this.props.list.length === 0?<Loading/>:(
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this) }
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} title="加载中..." onRefresh={this.handleRefresh.bind(this) }/>}
                    onEndReached={this.loadMore.bind(this) } onEndReachedThreshold={threshold} initialListSize={6}
                    renderFooter={() => this.props.list.length > 0 ? <LoadMore active={this.props.booksFetching} /> : null}/>
                )}
            </View>
        )
    }
}


export default containerByComponent(Books, booksReducer, { fetchBooks }, state => state,
    {
        list: [],
        pageIndex: 0,
        ...this.props
})