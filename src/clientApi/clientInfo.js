import core from './core.js'

class clientInfo extends core{
	// constructor() {
	// 	super()
	// }

	/**
     * 获取当前客户端的服务接口域名信息
     * @method getHost
     * @public
     * @param {Function} callBack 回调函数
     * @return {Object}
     * {info: 'http://api.k.sohu.com/'}
     * @example
     *        clientInfo.getHost(function(host){
     *          console.log(host.info)
     * 	    }
     * @since 1.0.0
     */
    getHost(callBack) {
    	// callBack()
        this.sendData({
            method: 'getHost',
            param: {
                'info': 'getHost'
            },
            callBack: callBack
        })
    }

    /**
     * 通知客户端数据已加载完毕
     * @method dataDownloadFinished
     * @example
     *        clientInfo.dataDownloadFinished()
     * @since 1.0.0
     */
    dataDownloadFinished(){
        this.sendData({
            method: 'dataDownloadFinished',
            param: {
                'info': 'dataDownloadFinished'
            }
        })
    }

    /**
     * h5调用native的log收集器
     * @method addLog
     * @public
     * @param {String} type 日志类型
     * @param {String} log  日志内容
     * @return {Null} void
     * @example
     *      var logObj={
     *          Type:'newssdk',
     *          statType:'read',
     *          protocol: t.secondProtocal
     *      }
     *      clientInfo.addLog('0','Type='+logObj.Type+'&='+logObj.statType+'&='+logObj.protocol)
     * @since 2.1.0
     */
    addLog (type, log) {
        this.sendData({
            method: 'addLog',
            param: {
                'type': type,
                'log': log
            }
        })
    }

    /**
     * 判断当前的网络状态
     * @method getNetworkType
     * @public
     * @param {Function} callBack 回调函数
     * @return {Object}
     * {
     *    'type':'wifi',
     *    'p1':'NjAxMjIzODg3Nzc3NDIyOTU4Mg=='
     * }
     * <p>主要字段</p>
     * <table>
     * <tr><th>字段名称</th><th>字段说明</th></tr>
     * <tr><td>type</td><td>网络状态</td></tr>
     * <tr><td>p1</td><td>设备p1值</td></tr>
     * </table>
     * @example
     *      clientInfo.getNetworkType(function(status){
     *          console.log(status.type)
     *      }
     * @since 1.0.0
     */
    getNetworkType (callBack) {
        this.sendData({
            method: 'getNetworkType',
            param: {
                'info': 'getNetworkType'
            },
            callBack: callBack
        })
    }

    /**
     * 获取deviceToken
     * @method getDeviceToken
     * @param {Function} callBack 回调函数
     * @return {Object}
     * @example
     *      clientInfo.getDeviceToken(function(data){
     *          console.log(data)
     *      }
     * @since 2.3.0
     */
    getDeviceToken (callBack) {
        this.sendData({
            method: 'getDeviceToken',
            param: {
                'info': 'getDeviceToken'
            },
            callBack: callBack
        })
    }

    
    /**
     * 获取accessToken
     * @method getAccessToken
     * @public
     * @param {Function} callBack 回调函数
     * @return {Object}
     * {data:信息}
     * @example
     *        userCenter.getAccessToken(function(data){
     *          console.log(data)
     *      })
     * @since 2.2.0
     */
    getAccessToken (callBack){
        this.sendData({
            method: 'getAccessToken',
            param: {
                'info': 'getAccessToken'
            },
            callBack: callBack
        })
    }
    /**
     * 获取accessToken,cookie等
     * @method getCommonHeaders
     * @public
     * @param {Function} callBack 回调函数
     * @return {Object}
     * {data:信息}
     * @example
     *        userCenter.getCommonHeaders(function(data){
     *          console.log(data)
     *      })
     * @since 2.2.0
     */
    getCommonHeaders (callBack){
        this.sendData({
            method: 'getCommonHeaders',
            param: {
                'info': 'getCommonHeaders'
            },
            callBack: callBack
        })
    }
    /**
     * 获取cookie
     * @method getCookie
     * @public
     * @param {Function} callBack 回调函数
     * @return {Object}
     * {data:信息}
     * @example
     *        userCenter.getCookie(function(data){
     *          console.log(data)
     *      })
     * @since 2.2.0
     */
    getCookie (callBack){
        this.sendData({
            method: 'getCookie',
            param: {
                'info': 'getCookie'
            },
            callBack: callBack
        })
    }

	
}

export default new clientInfo({
    name: 'client infomation',
    author: 'huochunyang',
    version: '2.0',
    jsbc: jsBridgeClient,
    nativeCls: 'clientInfo'
})