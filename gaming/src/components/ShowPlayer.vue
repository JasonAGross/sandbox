<template>
	<div class="Player homeModule">
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
				<select v-model="selectedSeason" @change="getPlayerStats()">
					<option value="lifetime">Lifetime</option>
					<option v-for="season in seasonsDefined" :value="season.id">{{ season.title }}</option>
				</select>
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
			playerStats: {},
			isFpp: true,
			teamMode: 'squad',
			selectedSeason: 'lifetime',
			seasonsDefined: []
		}
	},
	computed: {
		playerStatsTitle: function() {
			return this.season
		}
	},
	watch: {
		player: function() {
			this.getProfile()
		},
		profile: function() {
			this.getPlayerStats()
		},
		seasons: function() {
			this.defineSeasons()
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