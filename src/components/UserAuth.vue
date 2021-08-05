<template>
  <form>
    <div v-if="!getIslogin">
      <label for="uasename">Username : </label>
      <input type="text" id="username" v-model="username" />
    </div>
    <div v-if="!getIslogin">
      <label for="password">Password : </label>
      <input type="password" name="" id="password" v-model="password" />
    </div>
    <button @click="login" v-if="!getIslogin">Login</button>
    <button @click="logout" v-if="getIslogin">Logout</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      password: null,
    };
  },
  computed: {
    getIslogin() {
      return this.$store.getters.getIslogedIn;
    },
  },
  methods: {
    login(e) {
      e.preventDefault();

      this.$store.dispatch({
        type: 'loginAction',
        username: this.username,
        password: this.password,
      });
    },
    logout(e) {
      e.preventDefault();
      this.$store.dispatch('logoutActions');
      this.username = '';
      this.password = '';
    },
  },
};
</script>