<template>
  <div class="loginWrapper">
    <FormLogin />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import FormLogin from '@/components/FormLogin.vue';

export default Vue.extend({
  components: {
    FormLogin,
  },
});
</script>

<style scoped lang="scss">
@import '../sass/master';

.loginWrapper {
  height: 100%;
  @include flexbox(row, center, center);
}
</style>
