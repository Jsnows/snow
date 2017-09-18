import core from './core'

class widget extends core{
	/**
     * h5调用系统原生toast
     * @method toast
     * @public
     * @param {String} info 文本信息
     * @return {Null} void
     * @example
     *      widget.toast(info)
     * @since 1.0.0
     */
    toast(info){
		this.sendData({
			method: 'toast',
			param: {
				'info': info
			}
		})
    }

    /**
     * h5调用系统原生dialog，显示效果类似promt
     * @method showDialog
     * @public
     * @param  {String} title 标题文本
     * @param  {String} message 内容文本
     * @param  {String} okBtn 确定文本
     * @param  {String} cancelBtn 取消文本
     * @param {Function} fn 回调函数
     * @return {Object} type 1 - 确定 | 0 - 取消
     * {
     *    'type':'0'
     * }
     * <p>主要字段</p>
     * <table>
     * <tr><th>type</th><th>说明</th></tr>
     * <tr><td>1</td><td>确定</td></tr>
     * <tr><td>0</td><td>取消</td></tr>
     * </table>
     * @example
     *      widget.showDialog('提示','内容',function(data){},'确定','取消')
     * @since 1.0.0
     */
    showDialog(title,message,fn,okBtn,cancelBtn){
        this.sendData({
            method: 'showDialog',
            param: {
                'title' : title || '提示',
                'message' :message || '内容',
                'okBtn' : okBtn || '确定',
                'cancelBtn' :cancelBtn || '取消'
            },
            callBack:fn
        })
    }


    /**
     * h5调用系统原生dailog，显示效果类似alert
     * @method alertDialog
     * @public
     * @param  {String} title 标题文本
     * @param  {String} message 内容文本
     * @param  {String} okBtn 确定文本
     * @param {Function} fn 回调函数
     * @return {Object} type 1 - 确定
     * {
     *    'type':'1'
     * }
     * <p>主要字段</p>
     * <table>
     * <tr><th>type</th><th>说明</th></tr>
     * <tr><td>1</td><td>确定</td></tr>
     * </table>
     * @example
     *      widget.alertDialog('提示','内容',function(data){},'确定')
     * @since 1.0.0
     */
    alertDialog(title,message,fn,okBtn){
        this.sendData({
            method: 'showDialog',
            param: {
                'title' : title || '提示',
                'message' :message || '内容',
                'okBtn' : okBtn || '确定'
            },
            callBack:fn
        })
    }

    /**
     * 控制header条
     * @method updateTitleBar
     * @public
     * @param {Json} param 参数
        param 格式
        {
            backAction: 'checkChange',
            leftDisplay: false,
            leftText: '',
            leftAction: 'checkChange',
            rightDisplay: true,
            rightText: '保存',
            rightAction: 'saveResume'
        }
     * @return {Null} void
     * @example
     *      widget.updateTitleBar(true);
     * @since 2.4.0
     */
    updateTitleBar (param){
        this.sendData({
            method:"updateTitleBar",
            param: param
        })
    }
    /**
     * 调用客户端无网页面
     * @method loadState
     * @public
     * @param {String} loadState 失败页面
     * @param {String} msg 页面文案显示
     * @return {Null} void
     * @example
     *      widget.loadState()
     * @since 1.0.0
     */
    loadState(msg){
        msg=msg || ''
        this.sendData({
            method:'loadState',
            param: {
                loadState:'loadFailed',
                msg:msg
            }
        })
    }
    /**
     * 分享
     * @method share
     * @public
     * @param {Json} Json 分享信息
     * @return {Null} void
     * @example
     *      widget.share(json)
     * @since 2.1.0
     */
    share(json){
        this.sendData({
            method:'share',
            param: {
                shareData:json
            }
        })
    }
    /**
     * 下拉刷新
     * @method setPullToRefreshWebView
     * @public
     * @param {Boolean} true 控制下拉刷新
     * @return {Null} void
     * @example
     *      widget.setPullToRefreshWebView(true)
     * @since 2.1.0
     */
    setPullToRefreshWebView(canRefreshable){
        this.sendData({
            method:'setPullToRefreshWebView',
            param: {
                canRefreshable: canRefreshable
            }
        })
    }

    /**
     * 调起通用select框
     * @method showPicker
     * @public
     * @param {Json} {data1:[],data2:[]}
     * @return {Fuction} callback
     * @example
     *      clientInfo.showPicker(param,callback)
     * @since 2.2.0
     */
    showPicker(param,callBack) {
        this.sendData({
            method: 'showPicker',
            param: {
                data:param
            },
            callBack:callBack
        })
    }
    /**
     * 调起系统默认浏览器
     * @method callBrowser
     * @public
     * @param String
     * @example
     *      clientInfo.callBrowser(visitUrl)
     * @since 2.3.0 安卓
     */
    callBrowser(visitUrl) {
        console.log(visitUrl)
        this.sendData({
            method: 'callBrowser',
            param: {
                visitUrl:visitUrl
            }
        })
    }

	
}

export default new widget({
    name: 'widgetApi',
    author: 'huochunyang',
    version: '2.0',
    jsbc: jsBridgeClient,
    nativeCls: 'widget'
})