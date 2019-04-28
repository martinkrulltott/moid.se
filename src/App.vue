<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
import Home from '@/views/Home.vue';

export default {
  name: 'app',
  components: {
    home: Home,
  },
};
</script>

<style lang="scss">
body {
  background: #fff;
  margin: 0;
}
</style>
