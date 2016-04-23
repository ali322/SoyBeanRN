'use strict';

import React,{Component,View,Text,StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Spin from "./spin";

class LoadMore extends Component{
    render(){
        return (
            <View style={styles.loadMore}>
               {this.props.active?<Spin />:<Icon name="arrow-upward" size={20}/>}
                <Text>{this.props.active?"加载中":"上拉加载更多"}</Text>
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
    }
})

export default LoadMore