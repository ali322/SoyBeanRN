import {StyleSheet, Platform} from "react-native"

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
        marginBottom:49
    },
    movieCell: {
        flexDirection: "row",
        flex: 1,
        borderColor: "#DDD",
        borderWidth: 0.5,
        borderRadius: 2,
        padding: 10,
        marginVertical:4,
        marginHorizontal:8,
        backgroundColor: "#FFF"
    },
    movieCover: {
        width: 80,
        height: 80
    },
    movieBreif: {
        paddingLeft: 8,
        flex:1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    movieTitle: {
        flex: 2,
        fontSize: 14,
        color: "#333"
    },
    movieSubtitle: {
        flex: 1.5,
        fontSize: 12,
        color: "#666"
    },
    movieCasts: {
        color: "#666"
    },
    navigationBar:{
        height:64,
        paddingTop:20,
        paddingHorizontal:8,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#FFF",
        borderBottomWidth:0.5,
        borderBottomColor:"#DDD"
    },
    navigationBarButton:{
        width:50,
        height:44,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    navigationBarButtonText:{
        color:"#666"
    },
    navigationBarInput:{
        flex:1,
        height:30,
        paddingHorizontal:8,
        marginVertical:7,
        borderRadius:5,
        borderColor:"#DDD",
        borderWidth:0.5,
        fontSize:15,
        color:"#666"
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
        ...styles.container,
        paddingTop:64
    }
}

export default StyleSheet.create(Object.assign({}, styles,
    Platform.OS === "android" ? styleForAndroid : {},
    Platform.OS === "ios" ? styleForIOS : {}
))