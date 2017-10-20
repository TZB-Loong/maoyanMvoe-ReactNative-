/**
 * Created by apple on 16/10/29.
 */

class DataService {

    /**
     *
     */
    static get(url,params,callback){

        //var url = "http://m.maoyan.com/movie/list.json?";

        //1.判断url后面是拼接 ? 还是 &
        if(params) {
            url += (url.indexOf('?')>-1 ? '&' : '?');
        }


        //2.将参数用&拼接起来
        //user=jack&pass=1234&....
        let paramsArray = [];
        for(let attr in params) {
            let value = params[attr];

            let item = attr + '=' + value;
            paramsArray.push(item);
        }
        url += paramsArray.join('&');

        console.log('发送GET请求：',url);

        //3.发送请求
        fetch(url)
            .then((response) => response.json())  //将返回的数据response转成json对象
            .then((responseJson) => {
                //请求完成

                //回调函数
                callback(responseJson);

            })
            .catch((error) => {
                console.error(error);
            });
    }

}

export default  DataService;


