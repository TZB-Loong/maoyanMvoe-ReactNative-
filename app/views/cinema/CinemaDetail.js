/**
 * Created by apple on 16/10/31.
 */

import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

import BackNavigatorBar from '../../common/BackNavigatorBar';

export default class CinemaDetail extends Component {

    render(){
        return (
            <View style={styles.container}>
                <BackNavigatorBar
                    title={this.props.title}
                    tintColor="red"
                    {...this.props}
                />
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: 'white',
    },
    backButton : {
        width : 11,
        height : 22,
        margin : 10
    },
});