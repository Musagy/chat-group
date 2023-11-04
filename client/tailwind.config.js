/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        NotoSans: ["Noto Sans"],
      },
    },
    colors: {
      aside_bg: "#0B090C",
      chat_bg: "#252329",
      msg_input: "#3C393F",
      msg_placeholder: "#828282",
      blue: "#2F80ED",
      gray: "#BDBDBD",
      white: "#E0E0E0",
    },
  },
  plugins: [],
}
