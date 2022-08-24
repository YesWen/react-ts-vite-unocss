import { defineConfig, presetAttributify, presetIcons, presetUno } from "unocss";
import transformerDirective from "@unocss/transformer-directives";

export default defineConfig({
    theme: {},
    shortcuts: {
        //内置自定义
        "flex-center": "o-flex o-flex-row o-justify-center o-items-center",
        "flex-center-col": "o-flex o-flex-col o-justify-center o-items-center",
    },
    rules: [
        //css自定义
        ["absolute-center", { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }],
    ],
    presets: [
        presetUno({
            prefix: "o-",
        }),
        presetAttributify(),
        presetIcons({ scale: 1, warn: true }),
    ],
    transformers: [transformerDirective() as any],
});
