/**
 * Created by apple on 16/10/28.
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
    RefreshControl
} from 'react-native';

import NavigatorBar from 'react-native-navbar';

//两个开源的分页组件
import Swiper from 'react-native-swiper';
import MyViewPage from 'react-native-viewpager';

import MovieDetail from './MovieDetail';
import Loading from '../../common/Loading';
import DataService from '../../service/DataService';

//取到屏幕的宽、高
let {width, height} = Dimensions.get('window');

export default class MovieList extends Component {
    render(){
        return (
            /**
             * statusBar : 这是设置ios下状态栏的颜色 light-content 白色，默认是黑色
             */
            <View style={{flex:1}}>
                <NavigatorBar
                    title={{title:'电影',tintColor:'white'}}
                    tintColor="red"
                    statusBar={{
                        style : 'light-content'
                    }}
                    rightButton={
                        <TouchableOpacity>
                            <Image source={require('../images/ic_nav_search.png')}
                                   style={{
                                       width:20,
                                       height:20,
                                       marginRight:10,
                                       marginTop:10,
                                   }}/>
                        </TouchableOpacity>
                    }

                />

                <List {...this.props} />

            </View>
        );
    }
}


class List extends Component {

    constructor(props){
        super(props);

        let datasource = new ListView.DataSource({
            rowHasChanged : (r1,r2)=>r1!==r2
        });

        //创建轮播图组件的数据源对象
        let pageDataSource = new MyViewPage.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2
        });


        this.state = {
            ds : datasource,
            pageds : pageDataSource,
            isLoading : true,
            isRefreshing : false
        }

        //请求数据不要写在构造函数中
    }

    //界面渲染完成之后调用，然后请求数据
    componentDidMount() {
        this.requestData();

        this.requestImage();
    }

    //请求电影数据
    requestData(){


/*
        var url = "http://m.maoyan.com/movie/list.json";
        fetch(url)
            .then((response) => response.json())  //将返回的数据response转成json对象
            .then((responseJson) => {

                let movies = responseJson.data.movies;

                let dataSource = this.state.ds.cloneWithRows(movies);
                this.setState({
                    ds : dataSource,
                    isLoading:false,
                    isRefreshing : false,
                });

            })
            .catch((error) => {
                console.error(error);
            });
*/
        var url = "http://m.maoyan.com/movie/list.json";
        var params = {
            type : "hot",
            offset : '0',
            limit : '1000',
        }

        DataService.get(url,params,(jsondata)=>{

            let movies = jsondata.data.movies;

            let dataSource = this.state.ds.cloneWithRows(movies);
            this.setState({
                ds : dataSource,
                isLoading:false,
                isRefreshing : false,
            });

        });


    }

    //请求头图
    requestImage(){

        let url = "http://ads.wepiao.com/advertisement/adlist";

        fetch(url,{
            method : 'POST',  //请求方式
            headers : {       //请求头
                'Accept' : 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            //请求体
            body : 'advertisingId=33&city=196&ua=WTICKET_IOS%2F6.3.0'
        })
            .then((responseData)=>responseData.json())
            .then((jsondata)=>{

                let data = jsondata.advertising.advertisements;
                let pageDataSource = this.state.pageds;

                //设置状态，更新界面
                this.setState({
                    pageds : pageDataSource.cloneWithPages(data),
                    isLoading:false,
                });

            });

    }


    render(){

        if(this.state.isLoading) {
            return (
                <Loading />
            );
        }

        return (
            <View style={{flex:1}}>
                <ListView
                    dataSource={this.state.ds}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={this.renderSeparator}
                    renderHeader={this.renderHeader.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            tintColor="white"
                            title="拼命加载中.."
                            titleColor="white"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="white"
                        />
                    }
                />
            </View>
        );
    }

    //下拉刷新
    onRefresh(){

        this.setState({
            isRefreshing : true
        });

        this.requestData();
        this.requestImage();
    }

    //轮播图的每一页界面的创建
    renderPage(pageData,pageId){

        //console.log(pageData.img);

        return (
            <Image source = {{uri:pageData.img}} style={{
                flex : 1,
            }} />
        );
    }

    //创建分割线
    renderSeparator(sectionId,rowId){
        return <View key={sectionId+rowId} style={{
            backgroundColor:'gray',
            height:0.5,
            margin : 5
        }} />
    }

    //创建行
    renderRow(rowData,sectionId,rowId){
        return (
            <TouchableOpacity
                style={{ flex:1, flexDirection:'row', padding:10}}
                activeOpacity={0.6}
                onPress={()=>{

                    this.props.navigator.push({
                        item : MovieDetail,
                        movieId : rowData.id,
                        title : rowData.nm,
                    });

                }}
            >
                {/* 1.电影图片 */}
                <Image source={{uri:rowData.img}} style={{
                    width:70,
                    height:90,
                }} />

                {/* 2.中间的电影信息 */}
                <View style={{
                    marginLeft: 5,
                    flex : 2
                }}>
                    <Text style={{
                        fontWeight:'bold'
                    }}>{rowData.nm}</Text>
                    <Text>
                        <Text style={styles.text}>观众</Text>
                        <Text style={{
                            fontSize: 15,
                            color:'orange'
                        }}>
                            {rowData.sc}
                        </Text>
                    </Text>
                    <Text style={styles.text}>{rowData.scm}</Text>
                    <Text style={styles.text}>{rowData.showInfo}</Text>

                </View>

                {/* 3.购票按钮 */}
                <View style={{
                    flex : 1,
                    justifyContent : 'center',
                    alignItems: 'flex-end',
                }}>
                    <TouchableOpacity
                        style={rowData.preSale?[styles.touchSale,{borderColor:'#63B8FF'}]:styles.touchSale}
                    >
                        <Text style={rowData.preSale?{color:'#63B8FF'}:{color:'red'}}>
                            {rowData.preSale?"预售":"购票"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }

    //创建ListView的头视图
    renderHeader(){
        /**
         * 返回分页轮播图
         *
         * renderPageIndicator : 分页的圆点是否显示
         */
        return (
            <View style={{height:120,width:width}}>
                <MyViewPage
                    dataSource={this.state.pageds}
                    renderPage={this.renderPage}
                    isLoop={true}
                    autoPlay={true}
                />
            </View>

        );

        /**
         * onMomentumScrollEnd 翻页时调用的函数
         * horizontal   是否水平方向滑动
         * showsButtons 是否显示翻页按钮
         * loop 是否循环滑动
         * autoplay 是否自动翻页
         * showsPagination 是否显示分页组件
         * dot          分页组件的圆点定义
         * activeDot   选中的分页圆点
         * paginationStyle 分页组件的样式
         */
        /*
        return (
            <Swiper
                height={120}
                onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                horizontal={true}
                showsButtons={false}
                loop={true}
                autoplay={true}
                showsPagination={true}
                dot={<View style={{backgroundColor: '#C4C4C4', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                activeDot={<View style={{backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                paginationStyle={{
                    bottom: 10, left: null, right: 20
                }}
            >
                <View style={{flex:1, backgroundColor:'red'}}></View>
                <View style={{flex:1, backgroundColor:'green'}}></View>
            </Swiper>
        );
        */
    }
}

const styles = StyleSheet.create({
    text : {
        marginTop : 5,
        fontSize:12,
        color : 'gray'
    },
    touchSale : {
        borderColor:'red',
        borderWidth:1,
        borderRadius : 2.5,
        padding: 10,
        paddingTop : 5,
        paddingBottom : 5,
    }
});
