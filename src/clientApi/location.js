import core from './core'

class location extends core{
    /**
     * 获取定位城市
     * @method getCity
     * @public
     * @param {Function} callBack 回调函数
     * @return {Object}
     * {info: "http://api.k.sohu.com/"}
     * @example
     *        location.getCity(function(posCity){
     *          console.log(posCity);
     *      }
     * @since 2.7.5
     */
    getCity (callBack) {
        this.sendData({
            method: "getCity",
            param: {
                "info": "getCity"
            },
            callBack: callBack
        });
    }


    /**
     * 获取当前位置的经纬度
     * @method requestLocation
     * @public
     * @param {Function} callBack 回调函数
     * @return {Object}
     * @example
     *        location.requestLocation(function(data){
     *          //data.lon经度  
     *          //data.lat纬度
     *      }
     * @since 2.7.5
     */
    requestLocation (callBack) {
        this.sendData({
            method: "requestLocation",
            param: {
                "info": "requestLocation"
            },
            callBack: callBack
        });
    }

    /**
     * 获取当前位置信息
     * @method requestPOI
     * @public
     * @param {Function} callBack 回调函数
     * @return {Object}
     * @example
     *        location.requestLocation(function(data){
     *          //data.lon经度  
     *          //data.lat纬度
     *      }
     * @since 2.7.5
     */
    requestPOI (callBack) {
        this.sendData({
            method: "requestPOI",
            param: {
                "info": "requestPOI"
            },
            callBack: callBack
        });
    }

    /**
     * 获取街道信息和经纬度
     * @method getLocation
     * @public
     * @param {Function} callBack 回调函数
     * @return {Object}
     * @example
     *        location.getLocation(function(data){
     *          // data中包含详细街道地址信息、经纬度等
     *      }
     * @since 2.7.5
     */
    getLocation (callBack){
        this.sendData({
            method: "getLocation",
            param: {
                "info": "getLocation"
            },
            callBack: callBack
        })
    }


    /**
     * 根据经纬度获取地理位置
     * @method regeo
     * @public
     * @param {String} lon 经度
     * @param {String} lat 纬度
     * @param {Function} callBack 回调函数
     * @return {Object}
     * @example
     *        location.regeo(function(data){
     *          //POI信息
     *      }
     * @since 2.7.5
     */
    regeo (lon,lat,callBack) {
        this.sendData({
            method: "regeo",
            param: {
                lon:lon,
                lat:lat
            },
            callBack: callBack
        });
    }


    /**
     * 根据城市街道获取经纬度
     * @method geo
     * @public
     * @param {String} address 字符串  address为结构化地址信息（规则：省+市+区+街道+门牌号）
     * @param {Function} callBack 回调函数
     * @return {Object}
     * @example
     *        location.geo(function(data){
     *          //data.lon经度  
     *          //data.lat纬度
     *      }
     * @since 2.7.5
     */
    geo (address,callBack) {
        this.sendData({
            method: "geo",
            param: {
                address:address
            },
            callBack: callBack
        });
    }


    /**
     * 获取当前位置周边的POI
     * @method searchPOIAround
     * @public
     * @param {String} lon 经度
     * @param {String} lat 纬度
     * @param {Function} callBack 回调函数
     * @return {Object}
     * @example
     *        location.searchPOIAround(function(data){
     *          //周边POI信息 数组
     *      }
     * @since 2.7.5
     */
    searchPOIAround (lon,lat,callBack) {
        this.sendData({
            method: "searchPOIAround",
            param: {
                lat:lat,
                lon:lon
            },
            callBack: callBack
        });
    }
}

export default new location({
    name: "location",
    author: "huochunyang",
    version: "2.0",
    jsbc: jsBridgeClient,
    nativeCls: "locationApi"
})