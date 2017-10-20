/**
 * Created by apple on 16/10/28.
 */

import React,{Component} from 'react';
import {
    Navigator
} from 'react-native';

export default class MyNavigator extends Component {
    render(){
        return (
            <Navigator
                initialRoute={{item: this.props.component }}
                configureScene={(route)=>{
                    return Navigator.SceneConfigs.PushFromRight;
                }}
                renderScene={(route,navigator)=>{
                    return <route.item navigator={navigator} {...route} />;
                }}
            />
        );
    }
}