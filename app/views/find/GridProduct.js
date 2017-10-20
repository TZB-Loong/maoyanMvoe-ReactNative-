/**
 * Created by apple on 16/10/31.
 */

import React,{Component,PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions
} from 'react-native';

let {width,height} = Dimensions.get('window');

export default class GridProduct extends Component {

    static propTypes = {
        data : PropTypes.array
    };

    static defaultProps = {
        data : []
    };

    render(){

        let itemWidth = width/3;

        let items = this.props.data.map(function (item, index) {
            return (
                <TouchableHighlight key={index} underlayColor='lightgray' style={{
                    width:itemWidth,
                    height:130,
                    borderRightColor:'gray',
                    borderRightWidth: (index+1)%3==0?0:0.5,
                    borderTopColor : 'gray',
                    borderTopWidth : index>2?0.5:0
                }}>
                    <View style={{
                        flex : 1,
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',
                            color : item.typefacecolor
                        }}>{item.maintitle}</Text>

                        <Text style={{
                            color : item.deputytypefacecolor,
                            fontSize:12,
                            marginTop : 3,
                        }}>{item.deputytitle}</Text>

                        <Image source={{uri:item.imgurlreward}} style={{
                            width:80,
                            height:80
                        }} resizeMode={Image.resizeMode.contain} />
                    </View>
                </TouchableHighlight>
            );
        });

        return (
            <View style={{
                ...this.props.style,
                flex : 1,
                flexDirection:'row',
                flexWrap : 'wrap',
            }}>
                {items}
            </View>
        );
    }

}