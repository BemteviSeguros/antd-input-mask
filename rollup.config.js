// https://www.codefeetime.com/post/rollup-config-for-react-component-library-with-typescript-scss/

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

import postcss from "rollup-plugin-postcss";
import { getFiles } from "./scripts/buildUtils.js";

const extensions = [".js", ".ts", ".jsx", ".tsx"];

export default {
  input: ["./src/index.ts", ...getFiles("./src/components", extensions)],
  output: {
    dir: "dist",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: true,
      declarationDir: "dist",
    }),
    postcss(),
  ],
  external: ["react", "react-dom"],
};
