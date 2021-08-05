<template>
  <base-container title="Vuex" v-if="!getIslogin">
    <change-count></change-count>
    <button @click="addPoint">add 20</button>
    <the-counter></the-counter>
    <async-counter></async-counter>
  </base-container>
  <base-container title="Login Gan">
    <user-auth></user-auth>
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import ChangeCount from './components/ChangeCount.vue';
import TheCounter from './components/TheCounter.vue';
import AsyncCounter from './components/AsyncCounter.vue';
import UserAuth from './components/UserAuth.vue';

export default {
  components: {
    BaseContainer,
    ChangeCount,
    TheCounter,
    AsyncCounter,
    UserAuth,
  },
  computed: {
    getIslogin() {
      return this.$store.getters.getIslogedIn;
    },
  },
  methods: {
    addPoint: function () {
      //this.$store.state.counter++;
      //contoh penggunaan payload dengan format syntaks 1
      //this.$store.commit('increase', { value: 20 });

      //contoh penggunaan payload dengan format syntaks 2
      this.$store.commit({
        type: 'statecounter/increase',
        value: 20,
      });
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>