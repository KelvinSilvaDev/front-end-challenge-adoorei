export default {
  namespaced: true,
  state: {
    currentTheme: localStorage.getItem("theme") || "light",
  },
  mutations: {
    setTheme(state, theme) {
      state.currentTheme = theme;
      localStorage.setItem("theme", theme);
    },
  },
  getters: {
    currentTheme: (state) => state.currentTheme,
  },
};
