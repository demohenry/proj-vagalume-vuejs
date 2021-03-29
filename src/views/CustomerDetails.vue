<template>
  <div class="small">
    <CustomerChart
      v-if="customerData.length > 0 && customer.name"
      :chartData="customerData"
      :chartLabels="labels"
      :chartValues="values"
      :options="chartOptions"
      :customer="customer"
    ></CustomerChart>
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

<style></style>
