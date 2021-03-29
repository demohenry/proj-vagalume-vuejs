<template>
  <div class="formWrapper">
    <el-container>
      <el-main>
        <el-row :gutter="20" justify="center" type="flex">
          <el-card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5"
            class="border-0 d-flex cardWrapper"
          >
            <div
              class="row"
              style="text-align: center; display: block; margin-bottom: 5px"
            >
              <img src="../../assets/logo.png" alt="logo" />
            </div>

            <el-alert
              v-show="notauthorization"
              type="error"
              effect="dark"
              style="margin-top: 10px; margin-bottom: 10px"
              >Usuário e senha são inválidos!</el-alert
            >

            <form role="form">
              <div class="inputWrapper">
                <el-input
                  placeholder="Digite seu Usuário"
                  suffix-icon="el-icon-user-solid"
                  v-model="username"
                  ref="username"
                  autoComplete="off"
                  v-on:keyup.native="enter($event)"
                >
                </el-input>

                <el-input
                  class="inputPassword"
                  :type="isHidden ? 'password' : 'text'"
                  placeholder="Digite sua Senha"
                  v-model="password"
                  ref="password"
                  autoComplete="off"
                  @keyup.enter.native="submit"
                >
                  <i
                    slot="suffix"
                    title="Show password"
                    @click="isHidden = !isHidden"
                    style="cursor: pointer"
                    :class="isHidden ? 'el-icon-lock' : 'el-icon-unlock'"
                  ></i>
                </el-input>
              </div>

              <div class="submitWrapper">
                <el-button
                  type="warning"
                  @click="submit()"
                  class="submitBtn"
                  v-loading="loading"
                  >LOGIN</el-button
                >
              </div>
            </form>
          </el-card>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
  data() {
    return {
      username: '',
      password: '',
      notauthorization: 0,
      isHidden: true,
      loading: false,
    };
  },

  mounted() {
    const vm = this;
    setTimeout(function () {
      vm.$refs.username.focus();
    }, 300);
  },

  methods: {
    ...mapActions('auth', ['login']),
    submit: function () {
      const vm = this;

      vm.notauthorization = false;
      vm.loading = true;

      this.login({
        email: this.username,
        password: this.password,
      })
        .then((response) => {
          vm.$bus.$emit('logged', 'User logged');
          vm.$router.replace({
            name: 'customers',
          });
        })
        .catch((error) => {
          this.notauthorization = true;
        })
        .finally(() => {
          vm.loading = false;
        });
    },
    enter: function (ev) {
      if (ev.key == 'Enter') {
        const vm = this;
        vm.$refs.password.$el.children[1].focus();
      }
    },
  },

  computed: {
    ...mapGetters('auth', [
      'authenticating',
      'authenticationError',
      'authenticationErrorCode',
    ]),
  },
});
</script>

<style lang="scss">
@import '../sass/master';

.formWrapper {
  position: relative;
  transition: all 400ms ease-out;

  img {
    width: 70%;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(0.9);
    }
  }

  .cardWrapper {
    width: 400px;
    padding: 10px 30px 20px;
    @include glassmorphism();
  }
  
  .el-input__suffix {
    height: 100%;
    width: 25px;
    text-align: center;
    transition: all 0.3s;
    line-height: 40px;
  }
}


.inputWrapper {
  margin: 30px 0;
  height: 100px;
  @include flexbox(column, center, space-between);
}

.submitWrapper {
  @include flexbox(row, center, center);

  button {
    background-color: $primary;
    transition: all 0.3s ease-in-out;
    border: none;
    width: 100%;

    &:hover {
      background-color: $textHighlight !important;
    }
  }
}

.el-alert {
  @include flexbox(row, center, center);

  .el-alert__description {
    margin: 0;
    padding: 5px 0;
  }
}
</style>
