import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

function cleanUrlsPlugin() {
  return {
    name: 'vite-plugin-clean-urls',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const [pathname, search] = req.url.split('?');
        if (pathname !== '/' && !pathname.includes('.')) {
          const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
          const targetHtml = resolve(import.meta.dirname, `${cleanPath}.html`);
          if (fs.existsSync(targetHtml)) {
            req.url = `/${cleanPath}.html${search ? '?' + search : ''}`;
          }
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const [pathname, search] = req.url.split('?');
        if (pathname !== '/' && !pathname.includes('.')) {
          const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
          const targetHtml = resolve(import.meta.dirname, `dist/${cleanPath}.html`);
          if (fs.existsSync(targetHtml)) {
            req.url = `/${cleanPath}.html${search ? '?' + search : ''}`;
          }
        }
        next();
      });
    },
    closeBundle() {
      const distDir = resolve(import.meta.dirname, 'dist');
      ['customer', 'owner', 'operator', 'about', 'contact'].forEach(page => {
        const srcHtml = resolve(distDir, `${page}.html`);
        const targetDir = resolve(distDir, page);
        if (fs.existsSync(srcHtml)) {
          if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
          fs.copyFileSync(srcHtml, resolve(targetDir, 'index.html'));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [cleanUrlsPlugin()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        customer: resolve(import.meta.dirname, 'customer.html'),
        owner: resolve(import.meta.dirname, 'owner.html'),
        operator: resolve(import.meta.dirname, 'operator.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
      },
    },
  },
})
