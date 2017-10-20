/**
 * Created by apple on 16/10/28.
 */

import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ListView,
} from 'react-native';

import Loadding from '../../common/Loading';
import NavigatorBar from 'react-native-navbar';
import CinemaDetail from './CinemaDetail';

export default class CinemaList extends Component {
    render(){
        return (
            <View style={{flex:1, backgroundColor:'white'}}>
                <NavigatorBar
                    title={{title:'影院',tintColor:'white'}}
                    tintColor="red"
                    statusBar={{
                        style : 'light-content'
                    }}
                />
                <CinemaListView {...this.props} />
            </View>
        );
    }
}

/**
 * ListView视图组件
 */
class CinemaListView extends Component {

    // 构造
    constructor(props) {
        super(props);

        var dataSource = new ListView.DataSource({
            rowHasChanged : (row1,row2) => row1 !== row2,
            sectionHeaderHasChanged : (section1,section2) => section1 !== section2,

            // getRowData : (dataBlob,sectionID,rowID)=>{
            // },
            // getSectionHeaderData : (dataBlob,sectionID,rowID)=>{
            // }

        });

        // 初始状态
        this.state = {
            loadding : true,
            ds : dataSource,
        };

    }

    componentWillMount() {
        this._requestData();
    }

    //请求影院列表数据
    _requestData() {
        var url = "http://m.maoyan.com/cinemas.json";

        fetch(url)
            .then((responseData)=>responseData.json())
            .then((jsonData)=>{
                //this._handleData(jsonData.data);

                /**
                 * 分组的数据结构
                 * {
                 *    sectionID1 : [row1,row2,row3,...],
                 *    sectionID2 : [row1,row2,row3,...],
                 *    ...
                 * }
                 *
                 */

                this.setState({
                    ds : this.state.ds.cloneWithRowsAndSections(jsonData.data),
                    loadding : false,
                });
            });
    }

    //行组件
    _renderRow(rowData,sectionID,rowID){
        return (
            <TouchableHighlight
                style={styles.rowContainer}
                underlayColor='#F5F5F5'
                onPress={(()=>{
                    this.props.navigator.push({
                        item : CinemaDetail,
                        title : rowData.nm
                    });
                }).bind(this)}
            >

                <View>
                    <Text style={styles.textRow}>
                        <Text style={{ color:'black',fontSize:16 }}> {rowData.nm} </Text>
                        <Text style={{ color:'red',fontSize:14 }}> {rowData.sellPrice} </Text>
                        <Text> 元起 </Text>
                    </Text>
                    <Text style={styles.textRow} numberOfLines={1}>
                        { rowData.addr }
                    </Text>
                    <Text style={styles.textRow}>
                        近期场次
                    </Text>
                </View>


            </TouchableHighlight>
        );
    }

    //组头视图组件
    _renderSectionHeader(sectionData, sectionID){
        return (
            <View style={styles.sectionHeader}>
                <Text>{ sectionID }</Text>
            </View>
        );
    }

    //分割线视图
    _renderSeparator(sectionID, rowID){
        return (
            <View style={{ height: 0.5, backgroundColor: '#BFBFBF', margin: 5 }}
                  key={`${sectionID}-${rowID}`}
            >
            </View>
        );
    }

    render(){

        if(this.state.loadding) {
            return <Loadding />
        }

        return (
            <ListView
                dataSource={this.state.ds}
                renderRow={this._renderRow.bind(this)}
                renderSectionHeader={this._renderSectionHeader}
                renderSeparator={this._renderSeparator}
            />
        );
    }

}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor: 'white'
    },
    navigatorTitle : {  //导航栏标题
        color : 'white',
        fontSize : 16,
        marginBottom: 10
    },
    rowContainer : {
        flex : 1,
    },
    sectionHeader : {
        height: 30,
        backgroundColor: '#EEE9E9',
        justifyContent: 'center',
        padding : 10,
        borderBottomColor:'#DEDEDE',
        borderBottomWidth : 0.5,
    },
    textRow : {
        color : 'gray',
        fontSize : 13,
        marginLeft: 10,
        marginRight : 10,
        marginBottom: 5,
    }
});