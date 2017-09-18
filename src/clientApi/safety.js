import core from './core'

class safety extends core{
	/**
     * 加密
     * @method dekEncrypt
     * @public
     * @param {String} data 需要加密的字段
     * @param {Function} callBack 回调函数
     * @return {Object}
     * {data:信息}
     * @example
     *        userCenter.dekEncrypt(function(data){
     *          console.log(data)//返回字符串
     *      })
     * @since 2.4.0
     */
    dekEncrypt (info,callBack){
        this.sendData({
            method: 'dekEncrypt',
            param: {
                'data': info
            },
            callBack: callBack
        })
    }

    /**
     * 解密
     * @method dekDecrypt
     * @public
     * @param {String} data 需要解密的字段
     * @param {Function} callBack 回调函数
     * @return {Object}
     * {data:信息}
     * @example
     *        userCenter.dekDecrypt(function(data){
     *          console.log(data)//返回字符串
     *      })
     * @since 2.4.0
     */
    dekDecrypt (info,callBack){
        this.sendData({
            method: 'dekDecrypt',
            param: {
                'data': info
            },
            callBack: callBack
        })
    }

	
}

export default new safety({
    name: 'safety',
    author: 'huochunyang',
    version: '2.0',
    jsbc: jsBridgeClient,
    nativeCls: 'safetyApi'
})