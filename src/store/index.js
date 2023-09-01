// store/index.js
import { createStore } from 'vuex';
import modal from './modules/modal';
import auth from './modules/auth';

export default createStore({
  modules: {
    modal,
    auth,
  },
  // restante do código
});
