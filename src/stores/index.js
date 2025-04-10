// import { createStore } from "vuex";

// export default createStore({
//   state: {
//     token: localStorage.getItem("token") || null,
//     user: null,
//   },
//   mutations: {
//     SET_TOKEN(state, token) {
//       state.token = token;
//       localStorage.setItem("token", token);
//     },
//     CLEAR_AUTH(state) {
//       state.token = null;
//       state.user = null;
//       localStorage.removeItem("token");
//     },
//   },
//   actions: {
//     async login({ commit }, credentials) {
//       const response = await api.post(
//         "http://localhost:5000/api/user/login",
//         credentials
//       );
//       commit("SET_TOKEN", response.data.token);
//       return response;
//     },
//     logout({ commit }) {
//       commit("CLEAR_AUTH");
//     },
//   },
//   getters: {
//     isAuthenticated: (state) => !!state.token,
//   },
// });

import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    CLEAR_AUTH(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  actions: {
    logout({ commit }) {
      commit("CLEAR_AUTH");
      this.$router.push("/login");
    },
  },
  modules: {
    // other modules
  },
});
