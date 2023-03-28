<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      value=""
      :checked="isDarkMode"
      class="sr-only peer"
      @click="toggleTheme"
    />
    <div
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
    ></div>
  </label>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      isDarkMode: false,
    };
  },
  computed: {
    ...mapGetters("theme", ["currentTheme"]),
  },
  created() {
    this.getTheme();
  },

  methods: {
    ...mapActions("theme", ["setTheme"]),

    toggleTheme() {
      const isLightTheme = this.currentTheme !== "dark";
      const theme = isLightTheme ? "dark" : "light";
      this.$store.commit("theme/setTheme", theme);
      this.isDarkMode = !this.isDarkMode;
    },
    getTheme() {
      if (this.currentTheme !== undefined) {
        this.isDarkMode = this.currentTheme === "dark";
      }
    },
  },
};
</script>

<style scoped>
.peer-checked:after {
  transform: translateX(100%);
}
.dark .peer-checked:after {
  transform: translateX(0);
}
</style>
