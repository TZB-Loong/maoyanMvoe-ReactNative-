
/**
 * Created by apple on 16/10/28.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,

    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,

} from 'react-native';

import NavigatorBar from 'react-native-navbar';

export default class Me extends Component {
    render(){
        return (
            <View style={{flex:1, backgroundColor:'white'}}>
                <NavigatorBar
                    title={{title:'我',tintColor:'white'}}
                    tintColor="red"
                    statusBar={{
                        style : 'light-content'
                    }}
                />
                <Text>个人中心</Text>


                <TouchableOpacity style={{
                    backgroundColor:'pink',
                    margin: 10
                }} underlayColor={"green"} onPress={()=>{
                    Alert.alert("1111");
                }}>
                    <Text>TouchableOpacity按钮,这显示的是个人中心的资料</Text>
                </TouchableOpacity>

                <TouchableHighlight style={{
                    backgroundColor:'pink',
                    margin: 10
                }} underlayColor={"red"} onPress={()=>{
                    Alert.alert("1111");
                }}>
                    <Text>TouchableHighlight按钮</Text>
                </TouchableHighlight>

                <TouchableNativeFeedback style={{
                    backgroundColor:'pink',
                    margin: 10
                }}>
                    <View>
                        <Text>按钮</Text>
                    </View>
                </TouchableNativeFeedback>

            </View>
        );
    }
}