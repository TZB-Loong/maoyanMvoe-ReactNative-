/**
 * Created by apple on 16/10/31.
 */

import React,{Component,PropTypes} from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Image,
    TouchableOpacity
} from 'react-native';

import NavigatorBar from 'react-native-navbar';

/**
 * 加载提示组件
 */
export default class BackNavigatorBar extends Component  {
    render(){
        return (
            <NavigatorBar
                {...this.props}
                title={{ title : this.props.title, tintColor:'white' }}
                statusBar={{
                    style : 'light-content'
                }}
                leftButton={
                    <TouchableOpacity activeOpacity={0.5}
                                      onPress={()=>{
                                          this.props.navigator.pop();
                                      }}
                    >
                        <Image source={require('../views/images/btn_backItem_original.png')}
                               style={{width:11, height:22, margin:10}}
                        />
                    </TouchableOpacity>
                }
            />
        );
    }
}