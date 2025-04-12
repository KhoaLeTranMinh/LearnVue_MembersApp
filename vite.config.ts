import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import Components from "unplugin-vue-components/vite"
import { BootstrapVueNextResolver } from "bootstrap-vue-next"

export default defineConfig({
	plugins: [vue(), tailwindcss(), Components({ resolvers: [BootstrapVueNextResolver()] })],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	// root: path.resolve(__dirname, "./src"),

	server: {
		port: 3000,
	},
})
