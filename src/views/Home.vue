<template>
  <div>
    <div class="container" :class="{ 'empty': empty }" v-if="palette && palette.colors">
      <trianglify
        :key="trianglifyKey"
        :width=trianglifySettings.width
        :height=trianglifySettings.height
        :cellSize=trianglifySettings.cellSize
        :variance=trianglifySettings.variance
        :strokeWidth=trianglifySettings.strokeWidth
        :xColors=trianglifySettings.xColors />
    </div>
    <div class="colors" v-if="palette && palette.colors">
      <div :class="{ 'empty': empty }"
        class="color"
        v-for="(n, index) in 5"
        :key="index"
        :style="[ !empty ? { 'background-color': `#${palette.colors[index]}` } : {}]">
      </div>
    </div>
    <div class="loader" v-if="!palette || !palette.colors">Loading...</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Trianglify } from 'vue-trianglify';

export default {
  name: 'home',
  components: {
    trianglify: Trianglify,
  },
  data: () => ({
    resultSize: 50,
    palette: null,
    empty: true,
    trianglifyKey: 0,
  }),
  computed: {
    ...mapState([
      'palettes',
    ]),
    trianglifySettings() {
      const colors = this.palette ? this.palette.colors : null;
      return {
        width: window.innerWidth,
        height: window.innerHeight - 16,
        cellSize: 110 * window.devicePixelRatio,
        variance: 1,
        strokeWidth: 2,
        xColors: colors,
      };
    },
  },
  methods: {
    refreshPattern() {
      this.trianglifyKey += 1;
      this.palette = this.palettes[Math.round(Math.random() * (this.resultSize - 1))];
      this.empty = false;
    },
  },
  mounted() {
    const { refreshPattern } = this;
    this.$store.dispatch('loadPalettes', { resultSize: this.resultSize }).then(() => {
      refreshPattern();
    });

    setInterval(() => {
      this.empty = true;
      setTimeout(() => {
        refreshPattern();
      }, 2000);
    }, 12000);
  },
};
</script>

<style lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  path {
    opacity: 0;

    @for $i from 1 through 10 {
      &:nth-child(#{$i}n + #{$i}) {
        transition: fill .5s linear $i * 0.1s, stroke .5s linear 0.3 + $i * 0.1s, opacity $i * 0.4s;
        animation: reveal $i * 0.4s forwards;
      }
    }
  }

  &.empty path {
    stroke: #fff;
    fill: #fff;
  }
}

@keyframes reveal {
  from {opacity: 0}
  to {opacity: 1}
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ff847c;
  opacity: 0.3;
  font-size: 30px;
}

.colors {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #fff;
}

.color {
  height: 15px;
  width: 20%;
  display: inline-block;
  float: left;
  background-color: #fff;
  transition: background-color .5s;
  opacity: 0;

  @for $i from 1 through 5 {
    &:nth-child(#{$i}) {
      transition-delay: $i * 0.1s;
      animation: reveal 0.5s forwards;
      animation-delay: $i * 0.1s;
    }
  }

  &.empty {
    background-color: #fff;
  }
}
</style>
