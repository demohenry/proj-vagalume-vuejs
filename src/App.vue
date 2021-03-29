<template>
  <div id="app">
    <div class="appHeader">
      <Header />
    </div>

    <el-main class="appContainer">
      <transition
        :name="transitionName"
        mode="out-in"
        @beforeLeave="beforeLeave"
        @enter="enter"
      >
        <router-view class="routerView" />
      </transition>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
const DEFAULT_TRANSITION = 'fade';
import Header from '@/components/Header.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Header,
  },

  data() {
    return {
      prevHeight: '0',
      transitionName: DEFAULT_TRANSITION,
    };
  },

  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;

      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }

      this.transitionName = transitionName || DEFAULT_TRANSITION;

      next();
    });
  },

  methods: {
    beforeLeave(element: any) {
      this.prevHeight = getComputedStyle(element).height;
    },

    enter(element: any) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
  },
});
</script>

<style lang="scss">
@import 'src/sass/master.scss';

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}

.appContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  z-index: 99;
  position: relative;
}

.appHeader {
  z-index: 99;
  width: 100%;
  position: relative;
}

#app {
  @include flexbox(column, center, center);
  height: 100vh;
  background-color: $primary;
  overflow: hidden;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    min-width: 300vw;
    min-height: 300vw;
    background-color: #fff;
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  &:before {
    bottom: 45vh;
    border-radius: 45%;
    animation-duration: 10s;
  }

  &:after {
    bottom: 42vh;
    opacity: 0.5;
    border-radius: 47%;
    animation-duration: 10s;
  }
}

@keyframes rotate {
  0% {
    transform: translate(-50%, 0) rotateZ(0deg);
  }
  50% {
    transform: translate(-50%, -2%) rotateZ(180deg);
  }
  100% {
    transform: translate(-50%, 0%) rotateZ(360deg);
  }
}
</style>
