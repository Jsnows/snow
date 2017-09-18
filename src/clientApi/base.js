import core from './core'

class base extends core{
	/**
     * 向客户端请求参数
     * @method getOptions
     * @public
     * @param {Function} callBack 回调函数
     * @return {Object}
     * @example
     *      indexApi.getOptions(function(data){
     *          console.log(data)
     *      })
     * @since 1.0.0
     */
    getOptions (callBack) {
        this.sendData({
            method: 'getOptions',
            param: {
                'info': 'getOptions'
            },
            callBack: callBack
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
     * 获取webview id，用于 goBack 指定跳转
     * @param  {[type]} callBack [description]
     * @return {[type]}          [description]
     */
    getWebViewID(callBack){
        this.sendData({
            method:"getWebViewID",
            callBack: callBack
        })
    }
    
    /**
     * 通知客户端数据已加载完毕
     * @method dataDownloadFinished
     * @example
     *        indexApi.dataDownloadFinished()
     * @since 1.0.0
     */
    dataDownloadFinished (){
        this.sendData({
            method: 'dataDownloadFinished',
            param: {
                'info': 'dataDownloadFinished'
            }
        })
    }

    /**
     * 调用客户端刷新
     * @method refreshPage
     * @example
     *        indexApi.refreshPage()
     * @since 1.0.0
     */
    refreshPage (type){
        this.sendData({
            method: 'refreshPage',
            param: {
                'info': 'refreshPage',
                'type': type
            }
        })
    }
    /**
     * 返回上一级页面
     * @method goBack
     * @public
     * @param {Number} 1
     * @return {Null} void
     * @example
     *      indexPage.goBack(1)
     * @since 2.2.0
     */
    goBack (isLoad, data, backIndex) {
        this.sendData({
            method: 'goBack',
            param: {
                'isLoad': isLoad,
                'data': data,
                backIndex: backIndex
            }
        })
    }
    /**
     * 调用客户端无网页面
     * @method loadPageStatus
     * @public
     * @param {String} status 需要显示的状态 loading  loadSuccess  loadFailed  noData  netWorkFailed
     * @param {String} msg 页面文案显示
     * @return {Null} void
     * @example
     *      indexPage.loadPageStatus()
     * @since 1.0.0
     */
    loadPageStatus (status,msg){
        if(!!msg){
            msg=msg
        }else{
            switch(status){
                case 'loadFailed':
                    msg='加载失败,点击重试'
                    break
                case 'noData':
                    msg='暂无数据'
                    break
                case 'netWorkFailed':
                    msg='网络异常,点击重试'
                    break
            }
        }
        
        this.sendData({
            method:'loadPageStatus',
            param: {
                loadPageStatus:status,
                msg:msg
            }
        })
    }
    /**
     * ios获取顶部导航栏高度
     * @method getNavbarHeight
     * @public
     * @param {Function} callBack 回调函数
     * @return {Number}
     * @example
     *      indexPage.getNavbarHeight(function(height){
                console.log(height)
            })
     * @since 2.4.0
     */
    getNavbarHeight (callBack){
        this.sendData({
            method:'getNavbarHeight',
            param: {
                info: 'getNavbarHeight'
            },
            callBack:callBack
        })
    }
    /**
     * 下拉刷新
     * @method canPullWebView
     * @public
     * @param {Boolean} true 控制下拉刷新
     * @return {Null} void
     * @example
     *      widget.canPullWebView(true)
     * @since 2.1.0
     */
    canPullWebView (canRefreshable){
        this.sendData({
            method:'canPullWebView',
            param: {
                canRefreshable: canRefreshable
            }
        })
    }
    /**
     * domPosition
     * @method domPosition
     * @public
     * @param {Number} top 元素距离页面顶部的距离
     * @param {Number} height 元素的高度
     * @return {Null} void
     * @example
     *      widget.domPosition(top, height)
     * @since 2.1.0
     */
    domPosition (top, height){
        this.sendData({
            method:'domPosition',
            param: {
                top: top,
                height: height
            }
        })
    }

}

export default base

export var KCpageInstances = new base({
    name: 'kerkee KCpage',
    author: 'huochunyang',
    version: '1.0',
    jsbc: jsBridgeClient,
    nativeCls: 'indexPage'
})