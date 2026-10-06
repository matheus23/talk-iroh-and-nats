import oneDark from "tm-themes/themes/one-dark-pro.json"
import oneLight from "tm-themes/themes/one-light.json"
import { defineShikiSetup } from "@slidev/types";

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: oneDark,
      light: oneLight,
    },
    transformers: [
      // ...
    ],
  };
});
