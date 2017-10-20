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

import FootList from './FoodList';


export default class FoodSection extends Component {

    //设置属性的类型
    static propTypes = {
        data : PropTypes.array
    };

    //设置属性的默认值
    static defaultProps = {
        data : []
    };

    render(){
        //[data1,data2]

        let views = this.props.data.map((item,index)=>{
            return (
                <TouchableHighlight key={index} style={{
                    flex : 1,
                    borderRightColor:'gray',
                    borderRightWidth: index==0?0.5:0,
                    padding:10,
                }} onPress={()=>{
                    this.props.navigator.push({
                        item:FootList
                    });
                }} underlayColor='lightgray'>
                    <View style={{
                        flex : 1
                    }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',
                            color : 'black',
                        }}>
                            {item.maintitle}
                        </Text>

                        <Text style={{
                            color :'black',
                            margin: 2,
                        }}>{item.deputytitle}</Text>

                        <Text style={{color:item.rewardtypefacecolor}}>{item.rewardtitle}</Text>

                        <Image source={{uri:item.imgurlreward}} style={{
                            width:80,
                            height:50,
                            position:'absolute',  //使用绝对定位
                            right:5,
                        }} resizeMode={Image.resizeMode.contain} />
                    </View>
                </TouchableHighlight>
            );
        });

        return (
            <View style={{
                ...this.props.style,   //将组件外部传入的样式复制给当前视图
                flex : 1,
                flexDirection:'row',
            }}>
                {views}
            </View>
        );
    }

}