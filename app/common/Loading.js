/**
 * Created by apple on 16/10/29.
 */

import React,{Component,PropTypes} from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Image
} from 'react-native';

/**
 * 加载提示组件
 */
export default class Loading extends Component  {

    //设置属性的类型
    static propTypes = {
        title : PropTypes.string
    };

    //设置属性的默认值
    static defaultProps = {
        title : '正在加载...'
    };

    render(){
        return (
            <View style={{
                flex : 1,
                justifyContent: 'center',
                alignItems:'center',
                flexDirection:'row',
            }}>
                <ActivityIndicator animating={true} />
                <Text style={{margin:5}}>{this.props.title}</Text>
            </View>
        );
    }

}