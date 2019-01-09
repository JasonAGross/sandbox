<template>
	<div class="Player homeModule">
		<div class="filters">
			<div class="filterGroup">
				<button v-bind:class="{ active:isFpp }" @click="isFpp = true; getPlayerStats();">First Person</button>
				<button v-bind:class="{ active:!isFpp }" @click="isFpp = false; getPlayerStats();">Third Person</button>
			</div>
			<div class="filterGroup">
				<button v-bind:class="{ active:(teamMode == 'solo') }" @click="teamMode = 'solo'; getPlayerStats();">Solo</button>
				<button v-bind:class="{ active:(teamMode == 'duo') }" @click="teamMode = 'duo'; getPlayerStats();">Duo</button>
				<button v-bind:class="{ active:(teamMode == 'squad') }" @click="teamMode = 'squad'; getPlayerStats();">Squad</button>
			</div>
		</div>
		<div class="lifetimeStats">
			<h2>{{ player.data.data[0].attributes.name }}</h2>
			<h3>Lifetime Stats</h3>
			<dl>
				<dt>Games Played</dt>
				<dd>{{ playerStats.roundsPlayed }}</dd>
				<dt>Games Won</dt>
				<dd>{{ playerStats.wins }}</dd>
				<dt>Top 10's</dt>
				<dd>{{ playerStats.top10s }}</dd>
				<dt>Kills</dt>
				<dd>{{ playerStats.kills }}</dd>
			</dl>
		</div>
		<div class="actionPanel">
			<button @click="$emit('doAddCompare', profile)">+ Compare</button>
		</div>
	</div>
</template>

<script>

export default {
	name: 'ShowPlayer',
	props: {
		player: Object
	},
	data: function() {
		return {
			profile: {},
			playerStats: {},
			isFpp: true,
			teamMode: 'squad'
		}
	},
	watch: {
		player: function() {
			this.getProfile()
		},
		profile: function() {
			this.getPlayerStats()
		}
	},
	methods: {
		getProfile: function() {
			var playerID = this.player.data.data[0].id
			var url = 'https://api.pubg.com/shards/steam/players/' + playerID + '/seasons/lifetime'
			this.$http
				.get(url, {headers: this.$apiHeaders})
				.then(response => (this.profile = response))
		},
		getPlayerStats: function() {
			var gameMode = this.teamMode
			if (this.isFpp) {
				gameMode = gameMode + '-fpp'
			}
			this.playerStats = this.profile.data.data.attributes.gameModeStats[gameMode]
		}
	}
}
</script>