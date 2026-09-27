import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Dev only: serve the Vercel function api/contact.ts at /api/contact so the
 * contact form works with `npm run dev`. Put RESEND_API_KEY in .env.local
 * (git-ignored). In production Vercel runs the function itself.
 */
function vercelApiDev(): Plugin {
  return {
    name: "vercel-api-dev",
    apply: "serve",
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ""));
      server.middlewares.use("/api/contact", async (req, res) => {
        let raw = "";
        for await (const chunk of req) raw += chunk;
        const { default: handler } = await server.ssrLoadModule("/api/contact.ts");
        const vercelRes = {
          status(code: number) {
            res.statusCode = code;
            return vercelRes;
          },
          setHeader(name: string, value: string) {
            res.setHeader(name, value);
            return vercelRes;
          },
          json(data: unknown) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
            return vercelRes;
          },
        };
        let body: unknown = raw;
        try {
          body = raw ? JSON.parse(raw) : {};
        } catch {
          /* leave as string; the handler rejects it */
        }
        await handler({ method: req.method, body, headers: req.headers }, vercelRes);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), vercelApiDev()],
});
