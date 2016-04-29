'use strict'

import React, {Component, View, Image, Text,ListView,TouchableOpacity,ScrollView} from "react-native"
import NavigationBar from "react-native-navbar"
import {Actions} from "react-native-router-flux"

import {containerByComponent} from "../lib/redux-helper"
import {bookReducer} from "./reducer"
import {fetchBook} from "./action"
import Loading from "../common/loading"

import styles from "./stylesheet/book"

class Book extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {
        this.props.fetchBook(this.props.id)
    }
    renderNavigationBar() {
        const titleConfig = {
            title: this.props.book ? this.props.book.title : "加载中"
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
    renderAuthor(){
        const {book} = this.props
        if (!book) {
            return null
        }
        return <Text style={styles.movieSummary}>{book.author_intro}</Text>
    }
    renderBreif() {
        const {book} = this.props
        if (!book) {
            return null
        }
        return (
            <View style={styles.movieCell}>
                <View><Image style={styles.movieCover} source={{ uri: book.images["small"] }}/></View>
                <View style={styles.movieBreif}>
                    <Text style={styles.movieTitle}>{book.title}</Text>
                    <Text style={styles.movieSubtitle}>评分: {book.rating.average}</Text>
                    <Text style={styles.movieSubtitle}>作者: {book.author.join("/") }</Text>
                    <Text style={styles.movieSubtitle}>出版日期: {book.pubdate}</Text>
                    <Text style={styles.movieSubtitle}>页数: {book.pages }</Text>
                </View>
            </View>
        )
    }
    renderSummary() {
        const {book} = this.props
        if (!book) {
            return null
        }
        return <Text style={styles.movieSummary}>{book.summary}</Text>
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderNavigationBar() }
                {this.props.bookFetching?<Loading />:(
                    <ScrollView>
                    {this.renderBreif() }
                    {this.renderAuthor()}
                    {this.renderSummary() }
                    </ScrollView>
                )}
            </View>
        )
    }
}

export default containerByComponent(Book, bookReducer, { fetchBook }, state => state, {...this.props})