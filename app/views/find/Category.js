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

import Swiper from 'react-native-swiper';

//取到屏幕的宽、高
let {width, height} = Dimensions.get('window');


export default class extends Component {

    //定义属性的类型
    static propTypes = {
        data : PropTypes.array
    };

    static defaultProps = {
        data : []
    };

    render(){

        /**
         * 数据
         * data = [data1,data2,data3,.......]
         *
         *
         * views = [
         *      [item1,item2,item3,...],   //items
         *      [item1,item2,item3,...],   //items
         * ]
         *
         */

        let views = [];

        //用于存储 itemElement 按钮视图的
        var items = null;

        //1.循环数组
        this.props.data.forEach(function (item, index) {

            let itemWidth = width/5;

            //2.为数组中的元素，创建一个视图
            let itemElement = (
                <TouchableHighlight style={{
                    width:itemWidth,
                    height:75,
                    marginTop:10,
                }} key={item.title} underlayColor="lightgray" onPress={()=>{

                }} >
                    <View style={{
                        justifyContent:'center',
                        alignItems : 'center',
                    }}>
                        <Image style={{
                            width:50,
                            height:50,
                            borderRadius:25,
                            marginBottom:5,
                        }} source={{uri:item.img}} />
                        <Text>{item.title}</Text>
                    </View>
                </TouchableHighlight>
            );


            if(index % 10 == 0) {  //0, 10, 20
                items = [];
                views.push(items);
            }

            items.push(itemElement);
        });


        /**
         *[
         * <View>
         *     [
         *      itemElement,
         *      itemElement,
         *      itemElement,
         *      ...
         *     ]
         * </View>,
         * <View>
         *     [
         *      itemElement,
         *      itemElement,
         *      itemElement,
         *      ...
         *     ]
         * </View>
         *]
         */
        let viewsElement = views.map(function (items, index) {
            return <View style={{
                width : width,
                flex : 1,
                flexDirection : 'row',
                flexWrap : 'wrap',
            }} key={index} >
                {items}
            </View>;
        });

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
         return (
             <Swiper
                 height={200}
                 onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                 horizontal={true}
                 showsButtons={false}
                 loop={false}
                 autoplay={false}
                 showsPagination={true}
                 dot={<View style={{backgroundColor: '#C4C4C4', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                 activeDot={<View style={{backgroundColor: '#48D1CC', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                 paginationStyle={{
                    bottom: 10, left: null, right: 20
                 }}
             >
                 {viewsElement}
             </Swiper>
         );

    }

}

