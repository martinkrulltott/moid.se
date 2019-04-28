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
  font-family: Arial, sans-serif;
  color: #392306;
}

h1, h2 {
  margin: 0;
}

h2 {
  font-size: 18px;
}

a {
  color: inherit;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #938571;
  }
}

p {
  margin: 0;
  line-height: 1.4;
}
</style>
