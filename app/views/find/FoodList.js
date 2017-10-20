/**
 * Created by apple on 16/10/31.
 */


import React,{Component} from 'react';
import {
    View,
    ListView,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Image
} from 'react-native';

import BackNavigatorBar from '../../common/BackNavigatorBar';

export default class FootList extends Component {
    render(){
        return (
            <View style={{flex:1, backgroundColor:'white'}}>

                <BackNavigatorBar
                    title="商品"
                    tintColor="#48D1CC"
                    {...this.props}
                />

                <Text>11</Text>

            </View>
        );
    }
}