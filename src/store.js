import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    palettes: [],
  },
  mutations: {
    SET_PALETTES(state, palettes) {
      // eslint-disable-next-line no-param-reassign
      state.palettes = palettes;
    },
  },
  actions: {
    loadPalettes(context, { resultSize }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://cors-anywhere.herokuapp.com/https://www.colourlovers.com/api/palettes/top?numResults=${resultSize}&format=json`)
          .then(r => r.data)
          .then((response) => {
            context.commit('SET_PALETTES', response);
            resolve();
          }).catch((error) => {
            reject(error.response);
          });
      });
    },
  },
});
