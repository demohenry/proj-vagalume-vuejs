<template>
  <div class="small">
    <div class="canvas" width="400" height="400">
    <CustomerChart
      v-if="customerData.length > 0 && customer.name"
      :chartData="customerData"
      :chartLabels="labels"
      :chartValues="values"
      :options="chartOptions"
      :customer="customer"
    ></CustomerChart>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CustomerChart from '@/components/CustomerChart.vue';
import { CustomerService } from '@/services/customer/customer.service';

export default Vue.extend({
  components: {
    CustomerChart,
  },
  data() {
    return {
      id: '',
      customerData: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
      },
      labels: [],
      values: [],
      customer: {
        name: '',
        id: 0,
      },
    };
  },
  mounted() {
    const vm = this;
    vm.id = vm.$route.params.id;

    vm.getCustomer();
  },
  methods: {
    getCustomer() {
      const vm = this;
      const loading = vm.$loading({
        lock: true,
        text: 'Carregando',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });

      CustomerService.get(+vm.id)
        .then((res) => {
          vm.customerData = res;

          vm.labels = vm.customerData.map((item) => item).reverse();
          vm.values = vm.customerData.map((item) => item).reverse();
        })
        .catch((error) => {
          vm.$notify.error({
            title: 'Erro',
            message: error,
          });
        })
        .finally(() => loading.close());

      CustomerService.list().then((res) => {
        vm.customer = res.clients.find((customer: any) => customer.id == vm.id);
      });
    },
  },
});
</script>

<style>

.canvas {
  min-width: 300px;
  
}

.small {
  position: relative;
  width: 75vh;
  height: 37.5vw;
 
  margin: auto;
}

</style>
