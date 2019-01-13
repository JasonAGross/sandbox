<template>
	<div id="app">
		<FetchPlayer 
			v-on:doFetchPlayer="doFetchPlayer">
		</FetchPlayer>
		<ShowPlayer
			:player="player"
			:seasons="seasons"
			v-on:doAddCompare="doAddPlayer">
		</ShowPlayer>
		<Compare
			:activePlayers="activePlayerSet">		
		</Compare>
	</div>
</template>

<script>
import FetchPlayer from './components/FetchPlayer.vue'
import ShowPlayer from './components/ShowPlayer.vue'
import Compare from './components/Compare.vue'

export default {
	name: 'app',
	data: function() {
		return {
			seasons: {},
			player: {},
			activePlayerSet: []
		}
	},
	components: {
		FetchPlayer,
		ShowPlayer,
		Compare
	},
	methods: {
		doFetchPlayer: function (playerAttr) {
			var url = 'https://api.pubg.com/shards/' + playerAttr.platform + '/players?filter[playerNames]=' + playerAttr.username
			this.$http
				.get(url, {headers: this.$apiHeaders})
				.then(response => (this.player = response))
				.then(this.doFetchSeasons(playerAttr.platform))
		},
		doFetchSeasons: function (platform) {
			var url = 'https://api.pubg.com/shards/' + platform + '/seasons'
			this.$http
				.get(url, {headers: this.$apiHeaders})
				.then(response => (this.seasons = response))
		},
		doAddPlayer: function (playerData) {
			this.activePlayerSet.push(playerData)
		}
	}
}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
