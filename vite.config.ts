import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from 'vite-plugin-dts';
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: "./src", // CONFIRMED: This should be './src', not 'dist'
      outDir: "dist",
      tsconfigPath: './tsconfig.app.json',
    })
  ],
  envDir: "./environments",
  envPrefix: "APP_",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Add alias for `src`
      "@Assets": path.resolve(__dirname, "src/assets/assets.ts"),
      "@Components": path.resolve(__dirname, "src/components"),
      "@Context": path.resolve(__dirname, "src/context"),
      "@Enums": path.resolve(__dirname, "src/types/enums"),
      "@Hooks": path.resolve(__dirname, "src/hooks"),
      "@Interfaces": path.resolve(__dirname, "src/types/interface"),
      "@Layouts": path.resolve(__dirname, "src/layouts"),
      "@Pages": path.resolve(__dirname, "src/pages"),
      "@Styles": path.resolve(__dirname, "src/styles"),
      "@Services": path.resolve(__dirname, "src/services"),
      "@Utils": path.resolve(__dirname, "src/utils"),
      "@Views": path.resolve(__dirname, "src/views"),
      "@Routes": path.resolve(__dirname, "src/routes.ts"),
    },
  },

  server: {
    proxy: {
      "/cognito": {
        target: "https://cognito-idp.ap-south-1.amazonaws.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cognito/, ""),
      },
    },
    open: true,
  },
  build: {
    lib: {
      // Your main entry point for the library (where you export everything)
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'LibWorkoAi', 
      fileName: (format) => `index.${format}.js` // Naming convention for the output files
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      // into your library, but rather be provided by the consuming app.
      // These should match your peerDependencies in package.json.
      external: ['react', 'react-dom'],
      output: {
        // Global variables for externalized deps if used in UMD/IIFE
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
  // --- END ADDITION ---
});
