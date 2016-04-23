'use strict';

import React,{Component,Animated,Easing} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

class Spin extends Component{
    constructor(props){
        super(props)
        this.state = {
            rotateValue:new Animated.Value(0)
        }
    }
    startRotate(){
        this.state.rotateValue.setValue(0)
        Animated.timing(this.state.rotateValue,{
            toValue:1,
            duration:500,
            easing:Easing.linear
        }).start(()=>this.startRotate())
    }
    componentDidMount(){
        this.startRotate()
    }
    componentWillUnmount(){
        this.state.rotateValue.stopAnimation()
    }
    render(){
        const AnimatedComponent = Animated.createAnimatedComponent(Icon)
        return (
            <AnimatedComponent name="autorenew" size={20} 
            style={{transform:[{
                rotateZ:this.state.rotateValue.interpolate({
                    inputRange:[0,1],
                    outputRange:["0deg","360deg"]
                })
            }]}}/>
        )
    }
}

export default Spin