import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		activePlayers: []
	},
	mutations: {
		addPlayer (state, player) {
			state.activePlayers.push(player)
		}
	},
	actions: {
		addPlayer ({commit, state}, player) {
			return new Promise((resolve, reject) => {
				const newPlayer = Object.assign({}, player)
				if (state.activePlayers.length > 0) {
					var hasMatch = false
					for (var i = state.activePlayers.length - 1; i >= 0; i--) {
						if (state.activePlayers[i].id == newPlayer.id) {
							hasMatch = true
						}
					}
					if (hasMatch) {
						reject()
					} else {
						commit('addPlayer', newPlayer)
						resolve()
					}
				} else {
					commit('addPlayer', newPlayer)
					resolve()
				}
			})
		}
	}
})
