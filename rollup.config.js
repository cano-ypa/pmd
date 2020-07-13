import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";

import pkg from "./package.json";

export default [
  {
    input: "src/button/index.ts",
    output: [
      {
        file: "build/button.js",
        format: "cjs",
        sourcemap: "inline",
      },
    ],
    plugins: [
      resolve(),
      typescript(),
      commonjs({ extensions: [".ts", ".js"] }),
    ],
  },
];
