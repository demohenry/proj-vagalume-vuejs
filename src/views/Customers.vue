<template>
  <div class="customerListWrapper">
    <CustomerList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CustomerList from '@/components/CustomerList.vue';

export default Vue.extend({
  components: {
    CustomerList,
  },
});
</script>

<style lang="scss" >
@import '../sass/master';


</style>
