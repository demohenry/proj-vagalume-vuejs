<script>
import Vue from 'vue';
import { Line } from 'vue-chartjs';

export default Vue.extend({
  extends: Line,

  props: {
    label: {
      type: String,
    },
    chartData: {
      type: String,
    },
    options: {
      type: Object,
    },
  },
  props: ['chartLabels', 'chartValues', 'customer'],
  data() {
    return {};
  },

  mounted() {
    const vm = this;
    vm.fillData();
  },

  methods: {
    fillData() {
      const vm = this;

      vm.renderChart(
        {
          labels: vm.chartLabels,
          datasets: [
            {
              label: vm.customer.name,
              data: vm.chartValues,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        vm.options
      );
    },
  },
});
</script>

<style></style>
