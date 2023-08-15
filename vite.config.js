// Disabled import/no-extraneous-dependencies as Vite automatically
// creates the projects with these packages as devDependencies

/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
});
