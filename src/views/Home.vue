<template>

  <div>

    <div class="background" :class="{ empty: empty }" v-if="palette && palette.colors">

      <trianglify
        :key="trianglifyKey"
        :width="trianglifySettings.width"
        :height="trianglifySettings.height"
        :cellSize="trianglifySettings.cellSize"
        :variance="trianglifySettings.variance"
        :strokeWidth="trianglifySettings.strokeWidth"
        :xColors="trianglifySettings.xColors"
      />

    </div>

    <div class="wrapper" v-if="palette && palette.colors">

      <div class="content">

        <h1>Martin Ohlson</h1>

        <h2>Senior Front End Developer</h2>

      </div>

      <div class="content">

        <p>B.Sc. Informatics</p>

        <p>Microsoft MCSD certified</p>

        <p>Front-end Ninja</p>

        <p>CSS Lover</p>

      </div>

      <div class="content">

        <p><a href="https://moid.se/stoked">MOID Sports & Photography</a></p>

      </div>

      <div class="content">

        <p>

          <a href="https://www.linkedin.com/in/ohlsonmartin/" target="_blank">LinkedIn</a>
           - Full background
        </p>

        <p>

          <a href="https://github.com/martinkrulltott/" target="_blank">GitHub</a>
           - Projects
        </p>

        <p>

          <a href="https://stackoverflow.com/users/1581477/" target="_blank">Stack Overflow</a>
           - Coding community
        </p>

        <p>

          <a href="https://codepen.io/martinkrulltott/" target="_blank">CodePen</a>
           - Code snippets
        </p>

      </div>

      <div class="content">
         ... or just
        <a href="mailto:martin@moid.se?subject=Hello!">send me an email!</a>

      </div>

    </div>

    <!-- <div class="loader" v-if="!palette || !palette.colors">Loading...</div> -->

  </div>

</template>

<script>
import { mapState } from 'vuex'; import { Trianglify } from 'vue-trianglify';

export default {
  name:
'home',
  components: { trianglify: Trianglify },
  data: () => ({
    resultSize: 50,
    palette: null,
    empty:
true,
    trianglifyKey: 0,
  }),
  computed: {
    ...mapState(['palettes']),
    trianglifySettings() {
      const colors = this.palette ? this.palette.colors : null; return {
        width: window.innerWidth,
        height: window.innerHeight,
        cellSize: 70 * window.devicePixelRatio,
        variance: 1,
        strokeWidth: 2,
        xColors: colors,
      };
    },
  },
  methods:
{
  refreshPattern() {
    this.trianglifyKey += 1; this.palette = this.palettes[Math.round(Math.random()
* (this.resultSize - 1))]; setTimeout(() => { this.empty = false; }, 100);
  },
},
  mounted() {
    document.documentElement.style.setProperty('--vh',
      `${window.innerHeight * 0.01}px`); window.addEventListener('resize', () => {
      document.documentElement.style.setProperty('--vh',
        `${window.innerHeight * 0.01}px`);
    }); const { refreshPattern } = this; this.$store.dispatch('loadPalettes',
      { resultSize: this.resultSize }).then(() => { refreshPattern(); }); setInterval(() => {
      this.empty = true; setTimeout(() => refreshPattern(), 2000);
    }, 12000);
  },
};
</script>

<style lang="scss">
.background {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;

  path {
    @for $i from 1 through 10 {
      &:nth-child(#{$i}n + #{$i}) {
        transition: fill 0.5s linear $i * 0.1s, stroke 0.5s linear 0.3 + $i * 0.1s,
          opacity $i * 0.4s;
      }
    }

    &:hover {
      transition: opacity 0.4s;
      opacity: 0.3;
    }
  }

  &.empty path {
    stroke: #fff;
    fill: #fff;
  }
}

@keyframes reveal {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.3;
  font-size: 30px;
}

.wrapper {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  max-height: 100vh;
  max-height: calc(var(--vh, 1vh) * 100);
  margin: 0 20px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .content {
    background: rgba(245, 245, 220, 0.7);
    margin-bottom: 20px;
    padding: 10px 20px;
    opacity: 0;
    animation: reveal 1s forwards;

    &:nth-child(1) {
      margin-top: 20px;
    }

    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        animation-delay: 1.5s + ($i * 0.3s);
      }
    }

    &.space-between {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
