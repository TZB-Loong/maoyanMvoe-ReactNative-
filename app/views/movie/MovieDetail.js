/**
 * Created by apple on 16/10/29.
 */

import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ListView,
    Dimensions,
    ActivityIndicator,
} from 'react-native';

import NavigatorBar from 'react-native-navbar';
import Loading from '../../common/Loading';


//取到屏幕的宽、高
let {width, height} = Dimensions.get('window');

export default class MovieDetail extends Component {

    render(){
        return (
            <View style={{flex:1, backgroundColor:'white'}}>

                <BackNavigatorBar
                    title={this.props.title}
                    tintColor="red"
                    {...this.props}
                />

                <MovieDetailList {...this.props} />

            </View>
        );
    }

}

class MovieDetailList extends Component {

    constructor(props){
        super(props);

        this.state = {
            loadding : true,
            ds : new ListView.DataSource({
                rowHasChanged : (r1,r2)=>r1!==r2,
                sectionHeaderHasChanged:(h1,h2)=>h1!==h2,
            }),
            movie : {}
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    //请求数据
    fetchData(){

        var url = "http://m.maoyan.com/movie/" + this.props.movieId + ".json";

        fetch(url).then((responseData)=>responseData.json())
            .then((jsondata)=>{
                console.log(jsondata);

                let movie = jsondata.data.MovieDetailModel;

                let cmts = jsondata.data.CommentResponseModel.cmts;
                let hcmts = jsondata.data.CommentResponseModel.hcmts;

                let cms = [cmts,hcmts];
                let ds = this.state.ds;

                this.setState({
                    movie : movie,
                    ds : ds.cloneWithRowsAndSections(cms),
                    loadding : false,
                });
            });

    }

    render(){

        if(this.state.loadding) {
            return <Loading />
        }

        return (
            <ListView
                dataSource={this.state.ds}
                renderRow={this.renderRow.bind(this)}
                renderHeader={this.renderHeader.bind(this)}
                renderSectionHeader={this.renderSectionHeader.bind(this)}
                renderSeparator={this.renderSeparator}
            />
        );
    }

    //行视图
    renderRow(rowData,sectionId,rowId){
        return (
            <View style={{flexDirection:'row', padding:10}}>
                <Image source={{uri:rowData.avatarurl}} style={{
                    width:30,
                    height:30,
                    borderRadius:15,
                }} />
                <View style={{flex:1, paddingLeft:5}}>
                    <Text style={{
                        fontSize:13,
                        color:'gray',
                        marginBottom: 10
                    }}>
                        {rowData.nickName}
                    </Text>
                    <Text style={{lineHeight:17,color:'black'}}>{rowData.content}</Text>
                    <Text style={{
                        fontSize:13,
                        color:'gray',
                        marginTop:15,
                    }}>
                        {rowData.time}
                    </Text>
                </View>
            </View>
        );
    }

    //头视图
    renderHeader(){

        let m = this.state.movie;

        return (
            <View style={{flex:1}}>
                {/*1.电影信息*/}
                <View style={{
                    padding:10,
                    flex:1,
                    backgroundColor:'black',
                    flexDirection:'row'
                }}>
                    <Image style={{
                        width:95,
                        height:130,
                        borderColor:'white',
                        borderWidth:1
                    }} source={{uri:m.img}} />

                    <View style={{
                        marginLeft:10,
                        flex : 1,
                        justifyContent:'space-between'
                    }}>
                        <Text style={{color:'white',fontSize:16}}>{m.nm}</Text>
                        <Text>
                            <Text style={{
                                color:'white',
                                backgroundColor:'#00B2EE',
                                fontSize:12,
                                borderRadius:2.5,
                            }}>
                                {" " + m.ver + " "}
                            </Text>
                        </Text>
                        <Text style={{color:'#FFA500', fontSize:14}}>{m.sc}分({m.snum}人评分)</Text>
                        <Text style={styles.textStyle}>{m.cat}</Text>
                        <Text style={styles.textStyle}>{m.src}/{m.dur}分钟</Text>
                        <Text style={styles.textStyle}>{m.rt}大陆上映</Text>
                    </View>
                </View>

                {/*2.剧情*/}
                <View style={{
                    marginTop:10,
                    borderBottomColor:'#EBEBEB',
                    borderBottomWidth:10,
                    padding:10,
                }}>
                    <Text style={styles.itemStyle}>剧情：{m.dra}</Text>
                </View>

                {/*3.演员表*/}
                <View style={{padding:10}}>
                    <Text style={styles.itemStyle}>演员表：{m.star}</Text>
                </View>

            </View>
        );

    }

    renderSectionHeader(sectionData, sectionID){

        if(sectionID == 0) {
            var title = "短评";
        }else if(sectionID == 1) {
            var title = "热门短评";
        }

        return (
            <View style={{
                height:30,
                padding:10,
                paddingTop:5,
                backgroundColor:'#EBEBEB',
                borderBottomColor:'#CCCCCC',
                borderBottomWidth:0.5,
                borderTopColor:'#CCCCCC',
                borderTopWidth:0.5,

            }}>
                <Text>{title}</Text>
            </View>
        );

    }

    //分割线
    renderSeparator(sectionID, rowID){
        return (
            <View key={sectionID+rowID} style={{
                backgroundColor:'gray',
                height:0.5,
                marginLeft:40,
            }} />
        );
    }

}

const styles = StyleSheet.create({

    textStyle : {
        color : 'white',
        fontSize: 14,
    },

    itemStyle : {
        fontSize:15, lineHeight:20,color:'black'
    }

});