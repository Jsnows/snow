/**
 *  引入框架
 */
import Vue from 'vue'
import store from './store'

/**
 *  引入根组件
 */
import App from './App'
import router from './router'
/**
 *  start
 */
new Vue({
	el: '#mountRoot',
	store,
	router,
	components: { App }
})
