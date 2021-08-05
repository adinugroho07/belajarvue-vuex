<template>
  <button @click="addOneAsync">add 1 Async</button>
  <button @click="addMore">add 10 Async</button>
</template>
<script>
export default {
  methods: {
    addOneAsync: function () {
      this.$store.dispatch('statecounter/incrementActions');
    },
    addMore() {
      this.$store.dispatch({
        type: 'statecounter/increaseActions',
        value: 10,
      });
    },
  },
};
</script>