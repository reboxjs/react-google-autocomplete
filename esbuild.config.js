// Import esbuild as an ES module
import esbuild from 'esbuild';

// Use top-level await to handle the promise returned by esbuild.build
try {
  await esbuild.build({
    entryPoints: ['src/**/*.js', 'src/**/*.jsx'], // Exclude .d.ts files by specifying only JS and JSX files
    outdir: 'lib',
    minify: false,
    sourcemap: false,
    loader: { '.js': 'jsx'},
    splitting: false, // Ensure splitting is disabled for separate file output
    format: 'esm', // Or 'cjs', depending on your target module system
    // Additional options...
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}