<template>
  <button @click="addOne">add 1</button>
</template>
<script>
export default {
  methods: {
    addOne: function () {
      this.$store.commit('statecounter/increment');
    },
  },
};
</script>