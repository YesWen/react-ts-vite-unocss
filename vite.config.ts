import Unocss from "unocss/vite";
import react from "@vitejs/plugin-react";
import { ConfigEnv, UserConfig } from "vite";
import { resolve } from "path";
import { loadEnv } from "vite";

export default ({ mode }: ConfigEnv): UserConfig => {
    const root = process.cwd();
    return {
        base: "./",
        resolve: {
            alias: {
                "@": resolve(__dirname, "./src"),
            },
        },
        build: {
            // minify: "terser",
            // terserOptions: {
            //     compress: {
            //         // 发布时删除 console
            //         drop_console: true,
            //     },
            // },
        },
        server: {
            host: true,
            watch: { ignored: ["**/dist/**"] },
            open: true,
            // https: true,
            proxy: {
                "^/api": {
                    target: loadEnv(mode, process.cwd()).VITE_PROXY_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
        plugins: [react(), Unocss()],
        esbuild: { keepNames: true },
        // optimizeDeps: { exclude: ["lodash-es"] },
        css: {
            postcss: {},
        },
    };
};
