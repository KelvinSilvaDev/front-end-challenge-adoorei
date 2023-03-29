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
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-transparent dark:peer-checked:bg-gradient-to-br dark:peer-checked:from-gray-500 dark:peer-checked:to-gray-800"
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
  content: "";
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2.25l2.551 7.817h8.316l-6.721 4.885 2.551 7.816-6.721-4.884-6.72 4.885 2.55-7.816L1.834 10.067h8.316L12 2.25zm0 2.901l-2.151 6.606H3.08l5.531 4.011-2.151 6.607 5.531-4.012 5.532 4.012-2.152-6.607 5.531-4.011h-6.769L12 5.151z'%3E%3C/path%3E%3C/svg%3E");
  border-radius: 50%;
  transition: transform 0.3s;
}

.dark .peer {
  background-color: #6b7280;
}

.dark .peer:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
.dark .peer-checked::before {
  content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FBBF24"><path d="M12 2.25l2.551 7.817h8.316l-6.721 4.885 2.551 7.816-6.721-4.884-6.72 4.885 2.55-7.816L1.834 10.067h8.316L12 2.25zm0 2.901l-2.151 6.606H3.08l5.531 4.011-2.151 6.607 5.531-4.012 5.532 4.012-2.152-6.607 5.531-4.011h-6.769L12 5.151z"></path></svg>');
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
}
</style>
