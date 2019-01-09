<template>
  <div class="lookup">
    <h1>Search for a player</h1>
    <div class="gg-fetchPlayer">
      <label for="setRegion">Choose Region</label>
      <select id="setRegion" v-model="playerAttr.region">
        <option value="pc-na" selected>North America (NA)</option>
      </select>
      <label for="playerName">Username</label>
      <input type="text" id="playerName" name="playerName" v-model="playerAttr.username" />
      <button v-on:click="$emit('doFetchPlayer', playerAttr)">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FetchPlayer',
  data: function() {
    return {
      playerAttr: {
        region: 'pc-na',
        username: ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>