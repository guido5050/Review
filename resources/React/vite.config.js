import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        laravel({
            input: "src/main.jsx",
            publicDirectory: "../../public",
            refresh: ["resources/React/**"],
        }),
        react(),
    ],
});
