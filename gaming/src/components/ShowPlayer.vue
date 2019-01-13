<template>
	<div class="homeModule" v-if="playerStats.playerName">
		<div class="filters">
			<div class="filterGroup">
				<button :class="{ active:isFpp }" @click="isFpp = true; getPlayerStats();">First Person</button>
				<button :class="{ active:!isFpp }" @click="isFpp = false; getPlayerStats();">Third Person</button>
			</div>
			<div class="filterGroup">
				<button :class="{ active:(teamMode == 'solo') }" @click="teamMode = 'solo'; getPlayerStats();">Solo</button>
				<button :class="{ active:(teamMode == 'duo') }" @click="teamMode = 'duo'; getPlayerStats();">Duo</button>
				<button :class="{ active:(teamMode == 'squad') }" @click="teamMode = 'squad'; getPlayerStats();">Squad</button>
			</div>
			<div class="filterGroup">
				<select v-model="selectedSeason" @change="getProfile()">
					<option value="lifetime">Lifetime</option>
					<option v-for="season in seasonsDefined" :key="season.id" :value="season.id">{{ season.title }}</option>
				</select>
			</div>
		</div>
		<div class="lifetimeStats">
			<h2>{{ playerStats.playerName }}</h2>
			<h3>{{ playerStatsTitle }}</h3>
			<dl>
				<dt>Games Played</dt>
				<dd>{{ playerStats.data.roundsPlayed }}</dd>
				<dt>Games Won</dt>
				<dd>{{ playerStats.data.wins }}</dd>
				<dt>Top 10's</dt>
				<dd>{{ playerStats.data.top10s }}</dd>
				<dt>Kills</dt>
				<dd>{{ playerStats.data.kills }}</dd>
			</dl>
		</div>
		<div class="actionPanel">
			<button @click="$emit('doAddCompare', playerStats)">+ Compare</button>
		</div>
	</div>
</template>

<script>

export default {
	name: 'ShowPlayer',
	props: {
		player: {
			type: Object,
			required: true
		},
		seasons: {
			type: Object
		}
	},
	data: function() {
		return {
			profile: {},
			playerStats: {
				id: null,
				playerName: null,
				title: null,
				data: {}
			},
			isFpp: true,
			teamMode: 'squad',
			selectedSeason: 'lifetime',
			seasonsDefined: []
		}
	},
	computed: {
		playerStatsTitle: function() {
			if (this.selectedSeason == 'lifetime') {
				return 'Lifetime Stats'
			} else {
				for (var i = this.seasonsDefined.length - 1; i >= 0; i--) {
					if (this.seasonsDefined[i].id == this.selectedSeason) {
						return this.seasonsDefined[i].title + ' Stats'
					}
				}
			}
			return ''
		}
	},
	watch: {
		player: function() {
			this.getProfile()
		},
		seasons: function() {
			this.defineSeasons()
		}
	},
	methods: {
		getProfile: function() {
			var playerID = this.player.data.data[0].id
			// Todo - add season, platform, region to application state
			var url = 'https://api.pubg.com/shards/steam/players/' + playerID + '/seasons/' + this.selectedSeason
			this.$http
				.get(url, {headers: this.$apiHeaders})
				.then(response => (this.profile = response))
				.then(this.getPlayerStats)
		},
		getPlayerStats: function() {
			var gameMode = this.teamMode
			if (this.isFpp) {
				gameMode = gameMode + '-fpp'
			}
			this.playerStats.id = this.profile.data.data.relationships.player.data.id + this.selectedSeason
			this.playerStats.playerName = this.player.data.data[0].attributes.name
			this.playerStats.title = this.playerStatsTitle
			this.playerStats.data = this.profile.data.data.attributes.gameModeStats[gameMode]
		},
		defineSeasons: function() {
			var seasonsDefinedTemp = []
			for (var i = this.seasons.data.data.length - 1; i >= 0; i--) {
				var redefinedSeason = {}
				redefinedSeason.id = this.seasons.data.data[i].id
				if (this.seasons.data.data[i].attributes.isCurrentSeason) {
					redefinedSeason.isCurrent = true
					this.selectedSeason = this.seasons.data.data[i].id
				} else {
					redefinedSeason.isCurent = false
				}
				var seasonTitle = this.seasons.data.data[i].id.split('.')[this.seasons.data.data[i].id.split('.').length - 1]
				if (seasonTitle.split('-')[1].indexOf('pre') > -1) {
					redefinedSeason.title = seasonTitle.split('-')[0] + ' Season ' + seasonTitle.split('pre')[1]
				} else if (seasonTitle.split('-')[1].indexOf('beta') > -1) {
					redefinedSeason.title = 'Pre-Beta Season'
				} else if (seasonTitle.split('-')[0] == 'pc') {
					redefinedSeason.title = 'PC ' + seasonTitle.split('-')[1] + ' Season ' + seasonTitle.split('-')[2]
				} else {
					redefinedSeason.title = seasonTitle.split('-')[0] + ' Season ' + seasonTitle.split('-')[1]
				}
				seasonsDefinedTemp.push(redefinedSeason)
			}
			this.seasonsDefined = seasonsDefinedTemp
		}
	}
}
</script>