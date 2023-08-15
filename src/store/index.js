// store/index.js
import { createStore } from 'vuex';
import modal from './modules/modal';

export default createStore({
  modules: {
    modal
  },
  // restante do código
});
