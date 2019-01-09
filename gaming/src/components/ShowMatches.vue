<template>
	<ul class="Match homeModule" v-if="recentMatches">
		<Match
			v-for="match in recentMatches"
			v-bind:match="match">
		</Match>
	</ul>
</template>

<script>
import Match from './Match.vue'

export default {
	name: 'ShowMatches',
	props: {
		player: Object
	},
	components: {
		Match
	},
	computed: {
		recentMatches() {
			var recentMatches = []
			for (var i = 9; i >= 0; i--) {
				recentMatches.push(this.player.data.data[0].relationships.matches.data[i])
			}
			return recentMatches
		}
	}
}
</script>