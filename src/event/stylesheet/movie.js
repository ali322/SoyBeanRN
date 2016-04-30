import {StyleSheet, Platform} from "react-native"

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8"
    },
    movieCell: {
        flexDirection: "row",
        padding: 10,
        marginTop:4,
        marginHorizontal:8,
        height:175,
        backgroundColor:"#FFF"
    },
    movieCover: {
        width: 96,
        height: 155
    },
    movieBreif: {
        paddingLeft: 8,
        flex:1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    movieAka:{
      flex:1.5  
    },
    castAka:{
       flex:1
    },
    movieTitle: {
        flex: 1,
        fontSize: 14,
        color: "#333"
    },
    movieSubtitle: {
        flex: 1,
        fontSize: 12,
        color: "#666"
    },
    movieSummary:{
      fontSize:12,
      color:"#666",
      backgroundColor:"#FFF",
      marginHorizontal:8,
      padding:10
    },
    movieCasts:{
      marginHorizontal:8,
      padding:6,
      backgroundColor:"#FFF",
      flexDirection:"row",
      flexWrap:"wrap"
    },
    movieCast:{
      width:80,
      margin:3
    },
    castAvatar:{
      width:80,
      height:114
    },
    castName:{
      fontSize:12,
      color:"#333"
    }
}

const styleForAndroid = {
    container:{
        ...styles.container,
        marginTop:64
    }
}

const styleForIOS = {
    container: {
        ...styles.container
    }
}

export default StyleSheet.create(Object.assign({}, styles,
    Platform.OS === "android" ? styleForAndroid : {},
    Platform.OS === "ios" ? styleForIOS : {}
))