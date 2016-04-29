'use strict'

import React,{Component,View,Text,StyleSheet} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import Spin from "./spin"

class LoadMore extends Component{
    render(){
        return (
            <View style={styles.loadMore}>
               {this.props.active?<Spin color="#AAA"/>:<Icon name="arrow-upward" size={20} color="#AAA"/>}
                <Text style={styles.loadMoreText}>{this.props.active?"加载中":"上拉加载更多"}</Text>
            </View>
        )
    }
}

LoadMore.defaultProps = {
    active:false
}

const styles = StyleSheet.create({
    loadMore:{
        backgroundColor:"#F7F7F7",
        flex:1,
        flexDirection:"row",
        height:30,
        justifyContent:"center",
        alignItems:"center"
    },
    loadMoreText:{
        paddingLeft:5,
        fontSize:13,
        color:"#AAA"
    },
    loadMoreIcon:{
        color:"#AAA"
    }
})

export default LoadMore