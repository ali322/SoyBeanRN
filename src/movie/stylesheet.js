'use strict';

import {StyleSheet, Platform} from "react-native";

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
    },
    movieCell: {
        flexDirection: "row",
        flex: 1,
        borderColor: "#DDD",
        borderWidth: 0.5,
        borderRadius: 2,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: "#FFF",
    },
    movieCover: {
        width: 80,
        height: 80,
    },
    movieBreif: {
        paddingLeft: 8,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    movieTitle: {
        flex: 3,
        fontSize: 14,
        color: "#333",
    },
    movieSubtitle: {
        flex: 2,
        fontSize: 12,
        color: "#666"
    },
    movieCasts: {
        height: 50,
        color: "#666",
    }
}

const styleForAndroid = {}

const styleForIOS = {
    container: {
        ...styles.container,
    paddingTop:64,
    }
}

export default StyleSheet.create(Object.assign({}, styles,
    Platform.OS == "android" ? styleForAndroid : {},
    Platform.OS == "ios" ? styleForIOS : {},
))

