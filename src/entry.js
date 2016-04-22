'use strict';

import React, {
    AppRegistry, Component, View, Text, StyleSheet
} from "react-native";
import {Actions, Scene, Router, Reducer} from "react-native-router-flux";
import Icon from "react-native-vector-icons/MaterialIcons";

import Movie from "./movie/movie";

const reducerCreator = params => {
    const defaultReducer = Reducer(params)
    return (state, action) => {
        return defaultReducer(state, action)
    }
}

const tabIcon = (iconConfig) => {
    return class extends Component {
        render() {
            return (
                <View style={styles.tabIcon}>
                    <Icon color="#666" {...iconConfig} />
                    <Text style={styles.tabIconText}>{this.props.title}</Text>
                </View>
            )
        }
    }
}

export default class App extends Component {
    render() {
        return (
            <Router createReducer={reducerCreator}>
                <Scene key="root">
                    <Scene tabs={true} key="tabbar" hideNavBar={true} tabBarStyle={styles.tabBar}>
                        <Scene key="tab1" title="电影" navigationBarStyle={styles.navigationBar}  
                            icon={tabIcon({ name: "movie", size: 18 }) }>
                            <Scene key="movie" component={Movie} initial={true}></Scene>
                        </Scene>
                        <Scene key="tab2" title="图书" navigationBarStyle={styles.navigationBar}
                            icon={tabIcon({ name: "book", size: 18 }) }>
                            <Scene key="movie" component={Movie} title="Top250"></Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}

const styles = StyleSheet.create({
    tabIcon: {
        flexDirection: "column",
        alignItems: "center"
    },
    navigationBar: {
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
    },
    tabBar: {
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#DDD",
    },
    tabIconText:{
        fontSize:12,
        color:"#666"
    }
})