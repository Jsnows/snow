import core from './core'

class clientUi extends core{
	/**
     * 调用客户端定制图片验证码框
     * @method showCaptchaDialog
     * @param {String} title 标题
     * @param {String} img 图片(base64)
     * @param {Number} 次数 依据次数来判断首次加载，还是第二次及更多次加载  1 显示整个框 2 只替换图片
     * @return {Function} 
     * @example
     *        clientUI.showCaptchaDialog(title,img,function(data){
     *            data.status=1 1 确定 0 取消
     *            data.code=xxxx
     *        })
     * @since 2.3.0
     */
    showCaptchaDialog (title,img,times,callBack){
        this.sendData({
            method:'showCaptchaDialog',
            param:{
                'title':title,
                'image':img,
                'times':times
            },
            callBack:callBack //data.code
        })
    }
    /**
     * 大图预览接口
     * @method bigPicturePreview
     * @param {String} title 标题
     * @param {Array} imgs 大图链接数组
     * @param {Number} index 图片位置
     * @example
     *        clientUI.bigPicturePreview(title, imgs, index)
     * @since 2.4.0
     */
    bigPicturePreview (title, imgs, index){
        this.sendData({
            method:'bigPicturePreview',
            param:{
                'title':title,
                'imgs':imgs,
                'index':index
            }
        })
    }
    /**
     * 图片操作弹层
     * @method pictureOperationDialog
     * @param {String} title 标题
     * @param {Array} imgs 大图链接数组
     * @param {Number} index 图片位置
     * @example
     *        clientUI.bigPicturePreview(title, imgs, index)
     * @since 2.4.0
     */
    pictureOperationDialog (title, imgs, index, deleteCallBack){
        this.sendData({
            method:'pictureOperationDialog',
            param:{
                'title':title,
                'imgs':imgs,
                'index':index
            },
            callBack: deleteCallBack
        })
    }
    /**
     * 调用客户端选择图片控件
     * @method selectImageDialog
     * @param {Boolean} isEdit 是否可裁剪，0不要裁剪，1可裁剪，不传此参数默认可裁剪
     * @return {Null} 
     * @example
     *        clientUI.selectImageDialog(function(imgData){
     *            imgData.base64ImageData // 图片的base64数据 ios
     *            imgData.localImageUrl // 本地图片路径 Android
     *        })
     * @since 2.4.0
     */
    selectImage (callBack, isEdit){
        this.sendData({
            method:'selectImage',
            param:{
                info : 'selectImage',
                isEdit: isEdit
            },
            callBack:callBack
        })
    }
    /**
     * 吊起相机直接拍照并上传
     * @method invokeCamera
     * @param {Boolean} isEdit 是否可裁剪，0不要裁剪，1可裁剪，不传此参数默认可裁剪
     * @return {Null} 
     * @example
     *        clientUI.invokeCamera(function(data){
     *            data    // 上传服务器后的图片数据
     *        })
     * @since 2.4.0
     */
    invokeCamera (callBack, isEdit){
        this.sendData({
            method:'invokeCamera',
            param:{
                info : 'invokeCamera',
                isEdit: isEdit
            },
            callBack:callBack
        })
    }
    /**
     * 调用客户端上传图片控件
     * @method uploadImage
     * @param {Boolean} isEdit 是否可裁剪，0不要裁剪，1可裁剪，不传此参数默认可裁剪
     * @return {Null} 
     * @example
     *        clientUI.uploadImage(param, function(urlJson){
     *              // urlJson 是图片上传后的服务器端url
     *        })
     * @since 2.4.0
     */
    uploadImage (param, callBack, isEdit){
        this.sendData({
            method:'uploadImage',
            param:{
                data: param,
                isEdit: isEdit
            },
            callBack:callBack
        })
    }
    /**
     * 调用客户端选择图片并上传
     * @method selectImageDialog
     * @param {Boolean} isEdit 是否可裁剪，0不要裁剪，1可裁剪，不传此参数默认可裁剪
     * @return {Null} 
     * @example
     *        clientUI.selectImageDialog(function(imgUrl){
     *            
     *        })
     * @since 2.4.0
     */
    selectAndUploadImage (callBack, isEdit){
        this.sendData({
            method:'selectAndUploadImage',
            param:{
                info : 'selectAndUploadImage',
                isEdit: isEdit
            },
            callBack:callBack
        })
    }
    
    /**
     * h5调用系统原生dialog，显示效果类似promt
     * @method showDialog
     * @public
     * @param  {Json} param 参数对象 
        param : {
            title : '',
            message: '',
            imageName: '',
            okBtnStr: '',
            cancelBtnStr: '',
            titleAttribute: ''   //更改弹窗title中部分字符串颜色,
            messageAttribute: '' //更改弹窗message中部分字符串颜色
        }
        //titleAttribute数据结构例(messageAttribute同理)：
        titleAttribute:[
            {  
               "location": 0,   //起始位置
               "length": 2,     //长度
               "color": #000000 //颜色(16进制)
            }
        ]
     * @param  {Function} fn 回调函数
     * @return {Object} status 1 - 确定 | 0 - 取消
     * {
     *    "status":"0"
     * }
     * <p>主要字段</p>
     * <table>
     * <tr><th>status</th><th>说明</th></tr>
     * <tr><td>1</td><td>确定</td></tr>
     * <tr><td>0</td><td>取消</td></tr>
     * </table>
     * @example
     *      widget.showDialog("提示","内容",function(data){},"确定","取消");
     * @since 1.0.0
     */
    showDialog (title,message,fn,okBtn,cancelBtn,imageName,titleAttribute,messageAttribute){
        if(title == ''){
            title = message
            message = ''
        }
        this.sendData({
            method: "showDialog",
            param: {
                "title" : title,
                "message" :message,
                "okBtn" : okBtn || "确定",
                "cancelBtn" :cancelBtn || "取消",
                "imageName" : imageName || '',
                "titleAttribute" : titleAttribute || '',
                "messageAttribute" : messageAttribute || ''
            },
            callBack:fn
        })
    }

    /**
     * 调起通用select框
     * @method showPicker
     * @public
     * @param {Json} {data1:[],data2:[]}
     * @param {Array} ['0','1']  默认值,'0' 为默认值的位置，字符串
     * @param {String} title  标题
     * @return {Fuction} callback
     * @example
     *      clientInfo.showPicker(param,callback)
     * @since 2.2.0
     */
    showPicker (param,select,title,callBack) {
        this.sendData({
            method: 'showPicker',
            param: {
                data:param,
                select:select,
                title: title
            },
            callBack:callBack
        })
    }

    /**
     * 调起通用联动select框
     * @method showBindPicker
     * @public
     * @param {Json} {data1:[],data2:[]}
     * @param {Array} ['0','1']  默认值,'0' 为默认值的位置，字符串
     * @param {String} title  标题
     * @return {Fuction} callback
     * @example
     *      clientInfo.showPicker(param,callback)
     * @since 2.2.0
     */
    showBindPicker (data, select, title, callBack) {
        this.sendData({
            method: 'showBindPicker',
            param: {
                data:data,
                select:select,
                title: title
            },
            callBack:callBack
        })
    }

    /**
     * 通过设置的时间区域，选择时间
     * @method showTimePicker
     * @public
     * @param {String} title  标题
     * @param {String} beginTime  起始时间 '0:00'
     * @param {String} endTime  结束时间 '9:30'
     * @return {Fuction} callback
     * @example
     *      clientInfo.showTimePicker(title, beginTime, endTime, (data) => {
     *          data.status // 0 取消， 1 确定
     *          data.selectedTime   // 用户选择的时间 '6:40'
     *      })
     * @since 2.2.0
     */
    showTimePicker (title, beginTime, endTime, callBack) {
        this.sendData({
            method: 'showTimePicker',
            param: {
                title:title,
                beginTime:beginTime,
                endTime: endTime
            },
            callBack:callBack
        })
    }

    /**
     * 调起通用多选框
     * @method showMultiPicker
     * @public
     * @param {String} title  标题
     * @param {Array} [[0,1],[1,2]  多选默认值,0 为默认值的位置，number
     * @param {Array} [[],[]]
     * @return {Fuction} callback
     * @example
     *      clientInfo.showMultiPicker(param,function(data){
     *          //多维数组
     *      })
     * @since 2.2.0
     */
    showMultiPicker (title,select,param,callBack) {
        this.sendData({
            method: 'showMultiPicker',
            param: {
                data:param,
                select:select,
                title: title
            },
            callBack:callBack
        })
    }

    /**
     * 调起地址筛选匡
     * @method showCityPicker
     * @public
     * @return {Fuction} callback
     * @example
     *      clientInfo.showCityPicker(param,callback)
     * @since 2.2.0
     */
    showCityPicker (callBack) {
        this.sendData({
            method: 'showCityPicker',
            param: {
                info:'showCityPicker'
            },
            callBack:callBack
        })
    }


    /**
     * h5调用系统原生dialog，显示效果类似promt
     * @method alertDialog
     * @public
     * @param  {Json} param 参数对象 
        param : {
            title : '',
            message: '',
            imageName: '',
            okBtnStr: '',
            cancelBtnStr: '',
            titleAttribute: ''   //更改弹窗title中部分字符串颜色,
            messageAttribute: '' //更改弹窗message中部分字符串颜色
        }
        //titleAttribute数据结构例(messageAttribute同理)：
        titleAttribute:[
            {  
               "location": 0,   //起始位置
               "length": 2,     //长度
               "color": #000000 //颜色(16进制)
            }
        ]
     * @param  {Function} fn 回调函数
     * @return {Object} status 1 - 确定 | 0 - 取消
     * {
     *    "status":"0"
     * }
     * <p>主要字段</p>
     * <table>
     * <tr><th>status</th><th>说明</th></tr>
     * <tr><td>1</td><td>确定</td></tr>
     * <tr><td>0</td><td>取消</td></tr>
     * </table>
     * @example
     *      widget.alertDialog("提示","内容",function(data){},"确定","取消");
     * @since 1.0.0
     */
    alertDialog (title,message,fn,okBtn,imageName,titleAttribute,messageAttribute){
        if(title == ''){
            title = message
            message = ''
        }
        this.sendData({
            method: "showDialog",
            param: {
                "title" : title,
                "message" :message,
                "okBtn" : okBtn || "确定",
                "imageName" : imageName,
                "titleAttribute" : titleAttribute || '',
                "messageAttribute" : messageAttribute || ''
            },
            callBack:fn
        })
    }
    /**
     * h5调用copyDialog
     * @method copyDialog
     * @public
     * @param  {String} title 标题文本
     * @param  {String} subtitle 需要复制的内容
     * @param  {String} detail 描述文本
     * @param  {String} confirmButton 操作文本
     * @param  {String} cancelButton 取消文本
     * @param {Function} fn 回调函数
     * @return {Object} status 1 - 确定 | 0 - 取消
     * {
     *    'status':'0'
     * }
     * <p>主要字段</p>
     * <table>
     * <tr><th>status</th><th>说明</th></tr>
     * <tr><td>1</td><td>确定</td></tr>
     * <tr><td>0</td><td>取消</td></tr>
     * </table>
     * @example
     *      widget.showDialog(title,subtitle,detail,confirmButton,cancelButton,function(data){},'确定','取消')
     * @since 1.0.0
     */
    copyDialog (title,subtitle,detail,confirmButton,cancelButton,fn){
        this.sendData({
            method: 'copyDialog',
            param: {
                'title' : title,
                subtitle : subtitle,
                detail : detail,
                confirmButton : confirmButton,
                cancelButton : cancelButton
            },
            callBack:fn
        })
    }
    showPhoneDialog (title,message,okBtn,cancelBtn,imageName,fn){
        this.sendData({
            method: 'showPhoneDialog',
            param: {
                'title' : title,
                'message' :message,
                'okBtn' : okBtn || '确定',
                'cancelBtn' :cancelBtn || '取消',
                'imageName' :imageName
            },
            callBack:fn
        })
    }
	
}

export default new clientUi({
    name: 'client ui',
    author: 'huochunyang',
    version: '2.0',
    jsbc: jsBridgeClient,
    nativeCls: 'clientUI'
})