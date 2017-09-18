/**
 *  引入框架
 */
import Vue from 'vue'
import store from './store'
import zepto from 'zepto'

/**
 *  引入根组件
 */
import App from './App'

/**
 *  start
 */
new Vue({
	el: '#mountRoot',
	store,
	components: { App }
})
