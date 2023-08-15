// store/modules/modal.js
export default {
    namespaced: true,
    state: {
      isInputModalVisible: false
    },
    mutations: {
      setInputModalVisible(state, isVisible) {
        state.isInputModalVisible = isVisible;
      }
    },
    actions: {
      showInputModal({ commit }) {
        console.log('Modal está sendo mostrado.');
        commit('setInputModalVisible', true);
      },
      hideInputModal({ commit }) {
        console.log('Modal está sendo escondido.');
        commit('setInputModalVisible', false);
      }
    }
  };
  