export default class core {

	constructor(param) {
        this.param = param
	}

	/**
     * 监听webview的滚动位置
     * @method registerHitPageBottomListener
     * @public
     * @param {Function} callBack 回调函数
     * * @param {Number} 距离底部位置
     * @return {Null}
     * @example
     *      this.registerHitPageBottomListener(function(){})
     * @since 2.1.0(ios)
     */
    registerHitPageBottomListener(callback,threshold){
        jsBridgeClient.registerHitPageBottomListener(callback,threshold)
    }

    /**
     * 与jsbridge进行通信
     * @method _exec
     * @private
     * @param {Object} data js对象串
     * @return {Null | Cllaback}
     * @example
     *      this._exec(data)
     * @since 1.0.0
     */
    _exec(data){
        if(!data.callBack){
            jsBridgeClient.invoke(data.nativeCls,data.method,data.param)
        }else{
            jsBridgeClient.invoke(data.nativeCls,data.method,data.param,data.callBack)
        }
    }

    /**
     * 对_exec方法进行封装
     * @method sendData
     * @public
     * @param {Object} param js对象串
     * <p>主要参数</p>
     * <table>
     * <tr><th>参数名称</th><th>参数说明</th></tr>
     * <tr><td>nativeCls</td><td>映射native类名</td></tr>
     * <tr><td>method</td><td>映射映射native方法</td></tr>
     * <tr><td>param</td><td>H5传递到native的json参数</td></tr>
     * <tr><td>callback</td><td>native通知h5的回调</td></tr>
     * </table>
     * @return {Null | Callback}
     * @example
     *      this.sendData(data)
     * @since 1.0.0
     */
    sendData(param){
        var nativeCls = this.param.nativeCls
        var data = Object.assign({
                nativeCls: nativeCls,
                method: "",
                param: {}
            }, param)
            // alert(self.attributes.nativeCls + ':' + data.method + '&&&' + navigator.userAgent.toLowerCase())
        this._exec(data)
    }

    /**
     * 设备初始化完成
     * @method start
     * @public
     * @param {Function} callBack 回调函数
     * @return {Null}
     * @example
     *      this.start(function(){})
     * @since 1.0.0
     */
    start(callBack){
        const scheme = this.param
        if(scheme){
            const isDoumi = navigator.userAgent.toLowerCase().indexOf(scheme) != -1 ? true : false
            if(!isDoumi){
                callBack()
                return
            }
        }
        
        jsBridgeClient.onDeviceReady(callBack)    
    }

}

