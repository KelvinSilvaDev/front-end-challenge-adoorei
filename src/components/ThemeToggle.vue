<template>
  <button
    class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
    @click="toggleTheme"
  >
    <svg
      v-if="isLightTheme"
      class="w-6 h-6 text-gray-800"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M16.5 14.5L12 10M12 10L7.5 14.5M12 10V21" />
    </svg>
    <svg
      v-else
      class="w-6 h-6 text-gray-200"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M16.5 14.5L12 10M12 10L7.5 14.5M12 10V21" />
    </svg>
  </button>
  <!-- <button
    @click="toggleTheme"
    class="text-base font-medium text-gray-500 hover:text-gray-900 focus:outline-none"
  >
    {{ theme === "dark" ? "Light" : "Dark" }}
  </button> -->
</template>

<script>
export default {
  data() {
    return {
      isLightTheme: true, // inicialmente o tema é claro
    };
  },
  methods: {
    toggleTheme() {
      if (this.theme === "light") {
        this.theme = "dark";
        this.isDarkMode = !this.isDarkMode;
        document.documentElement.classList.add("dark");
      } else {
        this.theme = "light";
        this.isDarkMode = !this.isDarkMode;
        document.documentElement.classList.remove("dark");
      }
    },
    // toggleTheme() {
    //   this.isLightTheme = !this.isLightTheme;

    //   // Verifica se o elemento HTML existe antes de alterar o tema
    //   if (document && document.documentElement) {
    //     // Verifica se a classe "dark" já está presente no elemento HTML
    //     if (this.isLightTheme) {
    //       document.documentElement.classList.remove("dark");
    //       // Verifica se o armazenamento local existe antes de atualizar
    //       if (localStorage) {
    //         localStorage.removeItem("theme");
    //       }
    //     } else {
    //       document.documentElement.classList.add("dark");
    //       // Verifica se o armazenamento local existe antes de atualizar
    //       if (localStorage) {
    //         localStorage.setItem("theme", "dark");
    //       }
    //     }
    //   }
    // },
  },
};

// export default {
//   data() {
//     return {
//       theme: "light",
//     };
//   },
//   methods: {
//     toggleTheme() {
//       this.theme = this.theme === "dark" ? "light" : "dark";
//       document.documentElement.setAttribute("data-theme", this.theme);
//       localStorage.setItem("theme", this.theme);
//     },
//   },
//   mounted() {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) {
//       this.theme = savedTheme;
//     }
//     document.documentElement.setAttribute("data-theme", this.theme);
//   },
// };
</script>
