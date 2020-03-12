import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

module.exports = [
  {
    input: "src/index.js",
    output: {
      file: "build/duktape.js",
      format: "iife"
    },
    plugins: [
      babel(),
      terser()
    ]
  }
]
