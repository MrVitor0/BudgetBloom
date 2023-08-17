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
        commit('setInputModalVisible', true);
      },
      hideInputModal({ commit }) {
        commit('setInputModalVisible', false);
      }
    }
  };
  