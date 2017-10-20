
/**
 * Created by apple on 16/10/28.
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

import NavigatorBar from 'react-native-navbar';
import Loadding from '../../common/Loading';
import CategoryData from './category.json';
import Category from './Category';
import FoodSection from './FoodSection';
import DataServce from '../../service/DataService';
import GridProduct from './GridProduct';

export default class FindList extends Component {
    render(){
        return (
            <View style={{flex:1, backgroundColor:'white'}}>
                <NavigatorBar
                    tintColor="#48D1CC"
                    title={
                        <TextInput
                            placeholder="搜索商家、品类或商圈"
                            underlineColorAndroid="transparent"
                            style={{
                                width: 200,
                                height: 30,
                                borderRadius : 20,
                                marginTop:5,
                                paddingLeft:20,
                                paddingRight:20,
                                backgroundColor:'white',
                                paddingBottom: 3,
                            }}
                            onFocus={()=>{  //当输入获取焦点时，调用
                                /*
                                this.props.navigator.push({
                                    item : Search
                                });
                                */
                            }}
                        />
                    }
                    statusBar={{
                        style : 'light-content'
                    }}
                />

                <FindView {...this.props} />

            </View>
        );
    }
}

class FindView extends Component {

    constructor(props){
        super(props);

        let dataSource = new ListView.DataSource({
            rowHasChanged : (r1,r2)=>r1!==r2
        });

        //初始化状态
        this.state = {
            loadding : true,
            ds : dataSource,
            headerData1 : [],
            headerData2 : [],
        }
    }

    componentDidMount() {
        //请求数据
        this.fetchData();
    }

    fetchData(){

        //请求url
        var url1 = "http://aop.meituan.com/api/entry/topic2";

        //请求参数
        var params = {
            uuid : '35907A2436D257F90370E49A7CDFAE73678ABD5806B0029DFB83362199EEDAE4',
            utm_source : 'AppStore',
            utm_term : '7.4.0',
            latlng : '22.658886%2C114.038819',
            rn_package_version:"0",
            userid:"207705088",
            utm_content:"35907A2436D257F90370E49A7CDFAE73678ABD5806B0029DFB83362199EEDAE4",
            utm_medium:"iphone",
            version_name:"7.4.0",
            movieBundleVersion:"100",
            utm_campaign:"AgroupBgroupD100H0",
            __reqTraceID:"845EDE56-BBC2-4D0B-A33D-8969A5C28ECE",
            js_patch_version:"2",
            ci:"30",
            msid:"76EC06AA-D076-4229-A3B2-4627B12F95BB2016-10-21-18-47424"
        }

        DataServce.get(url1,params,function (jsondata) {
            //console.log(jsondata);
            console.log(this);

            var resource = jsondata.data.resource;

            this.setState({
                headerData1 : resource,
                loadding : false,
            });

        }.bind(this));


        var url2 = "http://aop.meituan.com/api/entry/discountNew?uuid=35907A2436D257F90370E49A7CDFAE73678ABD5806B0029DFB83362199EEDAE4&utm_source=AppStore&utm_term=7.4.0&latlng=22.658886%2C114.038819&rn_package_version=0&userid=207705088&utm_content=35907A2436D257F90370E49A7CDFAE73678ABD5806B0029DFB83362199EEDAE4&utm_medium=iphone&version_name=7.4.0&movieBundleVersion=100&utm_campaign=AgroupBgroupD100H0&__reqTraceID=33F8EAE5-287C-4757-A905-EFF85DF93071&js_patch_version=2&ci=30&msid=76EC06AA-D076-4229-A3B2-4627B12F95BB2016-10-21-18-47424";
        DataServce.get(url2,null,function (jsondata) {

            var resource = jsondata.data.resource;

            this.setState({
                headerData2 : resource,
                loadding : false,
            });
        }.bind(this));

        var url3 = "http://api.meituan.com/group/v2/recommend/homepage/city/30?msid=76EC06AA-D076-4229-A3B2-4627B12F95BB2016-10-21-18-47424&userid=207705088&__vhost=api.mobile.meituan.com&position=22.658886%2C114.038819&movieBundleVersion=100&utm_term=7.4.0&limit=40&wifi-mac=d4%3Aee%3A07%3A01%3A3c%3A98&ci=30&__skcy=2IoKHuPXQiBmt0Oz3UDDgIyij20%3D&__skck=3c0cf64e4b039997339ed8fec4cddf05&__skua=d64d6feffae1ef2e9dbbe402605681c1&wifi-name=HiWiFi_zningning&client=iphone&uuid=35907A2436D257F90370E49A7CDFAE73678ABD5806B0029DFB83362199EEDAE4&__skts=1477047109.656306&__skno=864E8F69-9C54-48DE-B871-A50C847F1E55&utm_content=35907A2436D257F90370E49A7CDFAE73678ABD5806B0029DFB83362199EEDAE4&utm_source=AppStore&utm_medium=iphone&version_name=7.4.0&wifi-cur=0&wifi-strength=&offset=0&supportId=1&__reqTraceID=F099390D-2405-4DA9-8134-752ADBEB1116&js_patch_version=2&rn_package_version=0&utm_campaign=AgroupBgroupD100H0&userId=207705088";
        DataServce.get(url3,null,function (jsondata) {
            let data = jsondata.data;
            let dataSource = this.state.ds;

            this.setState({
                ds : dataSource.cloneWithRows(data),
                loadding : false,
            });

        }.bind(this));


    }

    render(){

        if(this.state.loadding){
            return <Loadding />
        }

        return (
            <ListView
                dataSource={this.state.ds}
                renderRow={this.renderRow.bind(this)}
                renderHeader={this.renderHeader.bind(this)}
                renderSeparator={this.renderSeparator.bind(this)}
            />
        );
    }


    renderRow(rowData){

        let imageUrl = rowData.imageUrl.replace('w.h','100.100');

        let msg = "";
        if(rowData.mainMessage !== undefined && rowData.mainMessage2!==undefined) {
            msg = rowData.mainMessage + rowData.mainMessage2;
        }

        return (
            <TouchableHighlight style={{
                height:120,
                padding: 10,
            }}>
                <View style={{
                    flex:1,
                    flexDirection:'row',
                }}>
                    <Image style={{
                        width:100,
                        height:100,
                        marginRight:10,
                    }} source={{uri:imageUrl}}
                           resizeMode={Image.resizeMode.contain} />

                    <View style={{
                        flex : 1,
                        justifyContent:'center'
                    }}>
                        <Text style={{
                            fontSize:18,
                            fontWeight:'bold',
                            color : 'black',
                        }}>{rowData.title}</Text>

                        <Text style={{
                            color : 'gray',
                            fontSize:14,
                            marginTop:5,
                            marginBottom:5,
                        }}>{rowData.subTitle}</Text>

                        <Text style={{
                            color : 'green',
                            fontSize:22,
                            fontWeight:'bold',
                        }}>{msg}</Text>

                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    renderHeader(){
        return (
            <View style={{flex:1}}>
                <Category data={CategoryData} />

                <FoodSection navigator={this.props.navigator} data={this.state.headerData1} style={{
                    height:140,
                    borderTopColor:'#D4D4D4',
                    borderTopWidth:10,
                }} />

                <GridProduct data={this.state.headerData2} style={{
                    height:260,
                    borderTopColor:'#D4D4D4',
                    borderTopWidth:10,
                }} />

                <View style={{
                    borderTopColor:'#D4D4D4',
                    borderTopWidth:10,
                    height: 40,
                    borderBottomColor:'#D4D4D4',
                    borderBottomWidth:0.5,
                    flex : 1
                }}>
                    <Text style={{
                        flex : 1,
                        textAlign:'center',  //水平居中
                        lineHeight:25,
                    }}>— 猜你喜欢 —</Text>
                </View>

            </View>
        );
    }

    renderSeparator(sectionId,rowid){
        return (
            <View key={sectionId+rowid} style={{
                height:0.5,
                backgroundColor:'lightgray'
            }} />
        );
    }
}