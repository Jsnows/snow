import core from './core'

class cache extends core{
	/**
     * 设置本地缓存
     * @method setCache
     * @public
     * @param {String} cacheKey 键值
     * @param {Object} cacheData 要缓存的数据
     * @param {Number} cacheTime 缓存时间
     * @return {Null} void
     * @example
     *      cache.setCache(cacheKey, cacheData, cacheTime)
     * @since 2.6.0
     */
    setCache (cacheKey, cacheData, cacheTime) {
        this.sendData({
            method: 'setCache',
            param: {
               'cacheKey': cacheKey,
               'cacheData': cacheData,
               'cacheTime': cacheTime
            }
        })
    }

    /**
     * 获取本地缓存
     * @method getCache
     * @public
     * @param {String} cacheKey 键值
     * @return {Object} 返回setCache里面存储的对象，没有则返回null
     * 
     * @example
     *      cache.getCache(cacheKey)
     * @since 2.6.0
     */
    getCache (cacheKey, callBack) {
        this.sendData({
            method: 'getCache',
            param: {
               'cacheKey': cacheKey
            },
            callBack:callBack
        })
    }
    /**
     * 删除本地缓存
     * @method deleteCache
     * @public
     * @param {String} cacheKey 键值
     * @return {Null} void
     * @example
     *      cache.deleteCache(cacheKey)
     * @since 2.6.0
     */
    deleteCache (cacheKey) {
        this.sendData({
            method: 'deleteCache',
            param: {
               'cacheKey': cacheKey
            }
        })
    }
    /**
     * 设置内存缓存
     * @method setMemoryCache
     * @public
     * @param {String} cacheKey 键值
     * @param {Object} cacheData 要缓存的数据json格式
     * @return {Null} void
     * @example
     *      cache.setMemoryCache(cacheKey, cacheData)
     * @since 2.6.0
     */
    setMemoryCache (cacheKey, cacheData) {
        this.sendData({
            method: 'setMemoryCache',
            param: {
               'cacheKey': cacheKey,
               'cacheData': cacheData
            }
        })
    }

    /**
     * 删除内存缓存
     * @method deleteMemoryCache
     * @public
     * @param {String} cacheKey 键值
     * @return {Null} void
     * @example
     *      cache.deleteMemoryCache(cacheKey)
     * @since 2.6.0
     */
    deleteMemoryCache (cacheKey) {
        this.sendData({
            method: 'deleteMemoryCache',
            param: {
               'cacheKey': cacheKey
            }
        })
    }

    /**
     * 获取内存缓存
     * @method getMemoryCache
     * @public
     * @param {String} cacheKey 键值
     * @return {Object} 返回setMemoryCache里面存储的对象,没有返回null
     * @example
     *      cache.getMemoryCache(cacheKey, callBack)
     * @since 2.6.0
     */
    getMemoryCache (cacheKey, callBack) {
        this.sendData({
            method: 'getMemoryCache',
            param: {
               'cacheKey': cacheKey
            },
            callBack:callBack
        })
    }

    /**
     * 清除本地缓存
     * @method clearCache
     * @public
     * @param {String} type 需要清除的缓存类型  默认全部清除type为all，type为h5 清除H5的缓存
     * @example
     *      cache.clearCache(type)
     * @since 2.6.0
     */
    clearCache (type) {
        this.sendData({
            method: 'clearCache',
            param: {
               'type': type
            }
        })
    }

    /**
     * 清除内存缓存
     * @method clearMemoryCache
     * @public
     * @param {String} type 需要清除的缓存类型  默认全部清除type为all，type为h5 清除H5的缓存
     * @example
     *      cache.clearMemoryCache(type)
     * @since 2.6.0
     */
    clearMemoryCache (type) {
        this.sendData({
            method: 'clearMemoryCache',
            param: {
               'type': type
            }
        })
    }

    /**
     * 清除所有缓存，本地和内存
     * @method clearAllCache 
     * @public
     * @param {void} 
     * @example
     *      cache.clearAllCache()
     * @since 2.6.0
     */
    clearAllCache () {
        this.sendData({
            method: 'clearAllCache',
            param: {
               'info': 'clearAllCache'
            }
        })
    }

	
}

export default new cache({
    name: 'cache',
    author: 'huochunyang',
    version: '2.0',
    jsbc: jsBridgeClient,
    nativeCls: 'cache'
})