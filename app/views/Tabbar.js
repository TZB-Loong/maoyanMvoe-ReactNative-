/**
 * Created by apple on 16/10/28.
 */

import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Navigator
} from 'react-native';

//导入 react-native-tab-navigator 组件

import Tabbar from 'react-native-tab-navigator';

import MyNavigator from '../../../MyProject/app/Tabbar/MyNavigator';
import MovieList from './movie/MovieList';
import CinemaList from './cinema/CinemaList';
import FindList from './find/FindList';
import Me from './me/Me';

export default class TabbarView extends Component {

    constructor(props){
        super(props);

        this.state = {
            //选中的的tab页签索引
            selectedIndex : 0
        }
    }

    render(){

        return (
            /**
             tabBarStyle : tabbar的样式属性
             selected : 是否是选中状态
             title : 显示的标题
             selectedTitleStyle : 选中状态title的样式
             renderIcon : function   指定一个返回组件的函数,组件作为图标显示
             renderSelectedIcon : function  选中的图标
             onPress : function 点击事件函数
             **/
            <View style={styles.contatiner}>
                <Tabbar tabBarStyle={styles.tabBarStyle}>

                    <Tabbar.Item
                        title="电影"
                        selected={this.state.selectedIndex==0}
                        selectedTitleStyle={{color:'red'}}
                        renderSelectedIcon={()=>{
                            return <Image style={styles.icon} source={require('./images/movie_on.png')} />
                        }}
                        renderIcon={()=>{
                            return <Image style={styles.icon} source={require('./images/movie.png')} />
                        }}
                        onPress={()=>{
                            this.setState({
                                selectedIndex : 0
                            });
                        }}
                    >
                        <MyNavigator component={MovieList} />
                    </Tabbar.Item>

                    <Tabbar.Item
                        title="影院"
                        selected={this.state.selectedIndex==1}
                        selectedTitleStyle={{color:'red'}}
                        renderSelectedIcon={()=>{
                            return <Image style={styles.icon} source={require('./images/cinema_on.png')} />
                        }}
                        renderIcon={()=>{
                            return <Image style={styles.icon} source={require('./images/cinema.png')} />
                        }}
                        onPress={()=>{
                            this.setState({
                                selectedIndex : 1
                            });
                        }}
                    >
                        <MyNavigator component={CinemaList} />
                    </Tabbar.Item>

                    <Tabbar.Item
                        selected={this.state.selectedIndex === 2}
                        title="发现"
                        selectedTitleStyle={{color:'red'}}
                        renderIcon={()=>{
                            return <Image  style={styles.icon} source={require('./images/forum.png')} />
                        }}
                        renderSelectedIcon={()=>{
                            return <Image  style={styles.icon} source={require('./images/forum_on.png')} />
                        }}
                        onPress={()=>{
                            this.setState({
                                selectedIndex : 2
                            });
                        }}
                    >
                        <MyNavigator component={FindList} />
                    </Tabbar.Item>

                    <Tabbar.Item
                        selected={this.state.selectedIndex === 3}
                        title="我"
                        selectedTitleStyle={{color:'red'}}
                        renderIcon={()=>{
                            return <Image  style={styles.icon} source={require('./images/mine.png')} />
                        }}
                        renderSelectedIcon={()=>{
                            return <Image  style={styles.icon} source={require('./images/mine_on.png')} />
                        }}
                        onPress={()=>{
                            this.setState({
                                selectedIndex : 3
                            });
                        }}
                    >
                        <MyNavigator component={Me} />
                    </Tabbar.Item>
                </Tabbar>
            </View>
        );

    }

}

const styles = StyleSheet.create({

    contatiner : {
        flex : 1,
        backgroundColor:'white',
    },
    tabBarStyle : {
        backgroundColor:'white',
        height:49,
        borderTopColor:'#E3E3E3',
        borderTopWidth:0.5,
    },
    icon : {
        width:25,
        height:25,
    }

});
