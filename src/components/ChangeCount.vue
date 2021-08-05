<template>
  <div>
    <h2>{{ $store.state.statecounter.counter }}</h2>
    <h2>from getters {{ $store.getters['statecounter/normalizedCounter'] }}</h2>
  </div>
</template>
<script>
export default {};
</script>