<template>
  <div class="customerListWrapper">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="cardHeader">
        <span>Overview</span>

        <el-input
          placeholder="Type to Search..."
          suffix-icon="el-icon-search"
          v-model="search"
          size="small"
          autoComplete="off"
        >
        </el-input>
      </div>

      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
        @row-click="showCustomerDetails($event)"
      >
        <el-table-column label="ID" prop="id" width="150"> </el-table-column>
        <el-table-column label="Name" prop="name" sortable> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CustomerService } from '@/services/customer/customer.service';
import { ICustomer } from '@/interfaces/customer.interface';

export default Vue.extend({
  data() {
    return {
      tableData: [],
      search: '',
    };
  },

  mounted() {
    const vm = this;
    vm.fetchRecords();
  },

  methods: {
    showCustomerDetails(customer: ICustomer) {
      const vm = this;

      vm.$router.push({
        name: 'details',
        params: { id: customer.id.toString() },
      });
    },
    fetchRecords() {
      const vm = this;
      const loading = vm.$loading({
        lock: true,
        text: 'Carregando',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });

      CustomerService.list()
        .then(({ clients }) => {
          vm.tableData = clients;
        })
        .catch((error) => {
          vm.$notify.error({
            title: 'Erro',
            message: error,
          });
        })
        .finally(() => loading.close());
    },
  },
});
</script>

<style lang="scss">
@import '../sass/master';

.customerListWrapper {
  padding: 20px 50px;
  width: 100%;

  @include flexbox(row, flex-start, center);
}

.cardHeader {
  @include flexbox(row, center, space-between);
  span {
    font-size: 18px;
    font-weight: 600;
  }

  .el-input {
    width: 300px;
  }
}

.box-card {
  width: 100%;
  @include glassmorphism();

  span {
    color: $white;
  }

  .el-card__body {
    padding: 0;

    .el-table {
      border: none;
      opacity: 0.8;
      color: #fff;
      font-weight: 500;
    }

    th {
      padding: 12px;
      @include glassmorphism();
      border-radius: 0;
      color: #fff;
      font-weight: 600;

      &:hover {
        color: $black;
        opacity: 0.7;
      }
    }
    tbody {
      tr {
        &:hover {
          color: $black;
          opacity: 0.7;
        }
        td {
          padding: 12px;
          @include glassmorphism();
          border-radius: 0;
          cursor: pointer;
        }
      }
    }

    .el-table__empty-block {
      @include glassmorphism();
      border-radius: 0;

      .el-table__empty-text {
        visibility: hidden;

        &:after {
          content: 'No content to display';
          visibility: visible;
          margin-left: -50px;
        }
      }
    }
  }
}
</style>
