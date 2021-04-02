import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		getJwt: this.$cookies.get('jwt')
	},
	mutations: {
		removeAuth: () => {
			this.$cookies.remove('jwt')
		}
	}
})