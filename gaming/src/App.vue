<template>
	<div id="app">
		<FetchPlayer 
			v-on:doFetchPlayer="doFetchPlayer">
		</FetchPlayer>
		<ShowPlayer
			:player="player"
			:seasons="seasons">
		</ShowPlayer>
		<Compare></Compare>
	</div>
</template>

<script>
import FetchPlayer from './components/FetchPlayer.vue'
import ShowPlayer from './components/ShowPlayer.vue'
import Compare from './components/Compare.vue'

export default {
	name: 'app',
	data () {
		return {
			seasons: {},
			player: {}
		}
	},
	components: {
		FetchPlayer,
		ShowPlayer,
		Compare
	},
	methods: {
		doFetchPlayer (playerAttr) {
			var url = 'https://api.pubg.com/shards/' + playerAttr.platform + '/players?filter[playerNames]=' + playerAttr.username
			this.$http
				.get(url, {headers: this.$apiHeaders})
				.then(response => (this.player = response))
				.then(this.doFetchSeasons(playerAttr.platform))
		},
		doFetchSeasons (platform) {
			var url = 'https://api.pubg.com/shards/' + platform + '/seasons'
			this.$http
				.get(url, {headers: this.$apiHeaders})
				.then(response => (this.seasons = response))
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
