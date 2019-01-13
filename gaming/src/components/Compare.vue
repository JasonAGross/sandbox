<template>
	<div class="homeModule">
		<table class="compareTable">
			<thead>
				<tr>
					<td class="empty"></td>
					<th v-for="player in activePlayers">{{ player.playerName }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="filter in activeDataFilters">
					<td class="rowLabel">{{ filter.title }}</td>
					<td v-for="player in activePlayers">{{ player.data[filter.id] }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'compare',
	props: {
		activePlayers: {
			type: Array,
			required: true
		}
	},
	data: function() {
		return {
			filters: {
				dataPoints: [
					{
						title: 'Assists',
						id: 'assists',
						active: false
					},
					{
						title: 'Top Achieved Rank',
						id: 'bestRankPoint',
						active: false
					},
					{
						title: 'Boosts Used',
						id: 'boosts',
						active: false
					},
					{
						title: 'Players Knocked Out',
						id: 'dBNOs',
						active: false
					},
					{
						title: 'Kills Today',
						id: 'dailyKills',
						active: false
					},
					{
						title: 'Wins Today',
						id: 'dailyWins',
						active: false
					},
					{
						title: 'Total Damage Dealt',
						id: 'damageDealt',
						active: false
					},
					{
						title: 'Days Played',
						id: 'days',
						active: false
					},
					{
						title: 'Total Headshot Kills',
						id: 'headshotKills',
						active: false
					},
					{
						title: 'Healing Items Used',
						id: 'heals',
						active: false
					},
					{
						title: 'Total Kills',
						id: 'kills',
						active: true
					},
					{
						title: 'Longest Kill Distance',
						id: 'longestKill',
						active: true
					},
					{
						title: 'Longest Survival Time',
						id: 'longestTimeSurvived',
						active: false
					},
					{
						title: 'Losses',
						id: 'losses',
						active: false
					},
					{
						title: 'Longest Kill Streak',
						id: 'maxKillStreaks',
						active: true
					},
					{
						title: 'Revives',
						id: 'revives',
						active: false
					},
					{
						title: 'Total Vehicle Distance',
						id: 'rideDistance',
						active: false
					},
					{
						title: 'Road Kills',
						id: 'roadKills',
						active: false
					},
					{
						title: 'Most Kills in a Round',
						id: 'roundMostKills',
						active: true
					},
					{
						title: 'Rounds Played',
						id: 'roundsPlayed',
						active: true
					},
					{
						title: 'Suicides',
						id: 'suicides',
						active: false
					},
					{
						title: 'Total Swim Distance',
						id: 'swimDistance',
						active: false
					},
					{
						title: 'Team Kills',
						id: 'teamKills',
						active: false
					},
					{
						title: 'Total Time Survived',
						id: 'timeSurvived',
						active: false
					},
					{
						title: 'Top 10\'s',
						id: 'top10s',
						active: true
					},
					{
						title: 'Vehicles Destroyed',
						id: 'vehicleDestroys',
						active: false
					},
					{
						title: 'Total Walk/Run Distance',
						id: 'walkDistance',
						active: false
					},
					{
						title: 'Weapons Picked Up',
						id: 'weaponsAcquired',
						active: false
					},
					{
						title: 'Weekly Kills',
						id: 'weeklyKills',
						active: false
					},
					{
						title: 'Weekly Wins',
						id: 'weeklyWins',
						active: false
					},
					{
						title: 'Total Wins',
						id: 'wins',
						active: true
					}
				]
			}
		}
	},
	computed: {
		activeDataFilters: function() {
			var activeFilters = []
			for (var i = this.filters.dataPoints.length - 1; i >= 0; i--) {
				if (this.filters.dataPoints[i].active) {
					activeFilters.push(this.filters.dataPoints[i])
				}
			}
			return activeFilters
		}
	}
}
</script>