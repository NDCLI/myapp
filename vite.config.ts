import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const sitesWorkerSource = [
  'const worker = {',
  '  async fetch(request, env) {',
  '    const response = await env.ASSETS.fetch(request);',
  '    const contentType = response.headers.get("content-type") ?? "";',
  '    if (!contentType.includes("text/html")) return response;',
  '    const imageUrl = `${new URL(request.url).origin}/og.png`;',
  "    const html = (await response.text()).replaceAll('content=\"/og.png\"', `content=\"${imageUrl}\"`);",
  '    const headers = new Headers(response.headers);',
  '    headers.delete("content-length");',
  '    headers.delete("etag");',
  '    return new Response(html, { status: response.status, statusText: response.statusText, headers });',
  '  },',
  '};',
  '',
  'export default worker;',
  '',
].join('\n')

function sitesStaticWorker(): Plugin {
  return {
    name: 'sites-static-worker',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'server/index.js',
        source: sitesWorkerSource,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitesStaticWorker(),
  ],
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
  },
})
