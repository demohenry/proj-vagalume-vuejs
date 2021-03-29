<template>
  <div class="headerWrapper">
    <div class="navHeader">
      <router-link :to="{ name: 'login' }" v-if="!accessToken"
        >Login</router-link
      >
      <a @click="userLogout()" v-if="accessToken">Logout</a>
      <router-link :to="{ name: 'customers' }" v-if="accessToken"
        >Customers</router-link
      >
    </div>

    <div class="backHeader" v-if="$route.name === 'details'">
      <el-button type="text" icon="el-icon-back" @click="back()"
        >Back</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import { UserService } from '@/services/user/user.service';

export default Vue.extend({
  data() {
    return {};
  },

  methods: {
    ...mapActions('auth', ['logout']),

    userLogout() {
      const vm = this;
      UserService.logout();
      vm.logout();
      vm.$router.push('login').catch(()=>{});;
    },

    back() {
      const vm = this;
      vm.$router.push('/customers');
    },
  },

  computed: {
    ...mapState({
      accessToken: (state: any) => state.auth.accessToken,
    }),
  },
});
</script>

<style lang="scss">
@import '../sass/master';
.navHeader {
  @include flexbox(row, center, flex-end);
  background-color: $black;
  height: 50px;
  padding: 0 30px;

  a {
    color: $white;
    letter-spacing: 2px;
    margin: 0 15px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      color: $primary;
    }
  }

  .router-link-exact-active {
    color: $primary;
  }
}

.backHeader {
  padding: 0 30px;

  button {
    color: $black;
    transition: all 0.3s ease-in-out;

    &:active,
    &:focus,
    &:hover {
      color: $black;
    }
  }
}
</style>
