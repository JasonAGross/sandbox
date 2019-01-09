<template>
	<div id="app">
		<FetchPlayer 
			v-on:doFetchPlayer="doFetchPlayer">
		</FetchPlayer>
		<ShowPlayer
			v-bind:player="player"
			v-on:doAddCompare="doAddPlayer">
		</ShowPlayer>
		<!--
		<ShowMatches
			v-bind:player="player">
		</ShowMatches>
		-->
	</div>
</template>

<script>
import FetchPlayer from './components/FetchPlayer.vue'
import ShowPlayer from './components/ShowPlayer.vue'
import ShowMatches from './components/ShowMatches.vue'

export default {
	name: 'app',
	data: function() {
		return {
			player: {},
			activePlayerSet: []
		}
	},
	components: {
		FetchPlayer,
		ShowPlayer,
		ShowMatches
	},
	methods: {
		doFetchPlayer: function (playerAttr) {
			var url = 'https://api.pubg.com/shards/' + playerAttr.region + '/players?filter[playerNames]=' + playerAttr.username
			this.$http
				.get(url, {headers: this.$apiHeaders})
				.then(response => (this.player = response))
		},
		doAddPlayer: function(playerData) {
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
