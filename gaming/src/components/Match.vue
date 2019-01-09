<template>
	<li>{{match.id}}</li>
</template>

<script>
export default {
  name: 'match',
  props: {
    match: Object
  }
}
</script>