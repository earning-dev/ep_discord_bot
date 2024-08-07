import type { Options } from 'tsup';

export const tsup: Options = {
  entry: ['src/index.ts'],
  outDir: 'dist',
  minify: true,
  sourcemap: true,
  format: ['esm'],
  target: 'esnext',
  treeshake: true,
  splitting: false,
  clean: true,
  shims: false,
  dts: false,
  keepNames: false,
  esbuildOptions(options) {
    options.mangleProps = /__/;
    options.mangleCache = {};
  },
  noExternal: [/^[a-zA-Z]:/],
};