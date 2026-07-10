const proxy = require("http-proxy-middleware");

/**
 * Dev-only proxy so the admin SPA can call the API same-origin and avoid browser CORS.
 * Uses http-proxy-middleware v0.x API (bundled with react-scripts 4).
 *
 * Prefer REACT_APP_PROXY_API_TARGET. Do not fall back to REACT_APP_API_BASE_URL when it is
 * empty or a remote URL accidentally left in .env — default to local admin-bn.
 */
const rawTarget =
  process.env.REACT_APP_PROXY_API_TARGET ||
  "http://localhost:3090";
const apiTarget = String(rawTarget).trim().replace(/\/+$/, "") || "http://localhost:3090";

console.log(`[setupProxy] /authenticationservice -> ${apiTarget}`);

module.exports = function setupProxy(app) {
  app.use(
    proxy("/authenticationservice", {
      target: apiTarget,
      changeOrigin: true,
      secure: false,
      logLevel: process.env.REACT_APP_PROXY_DEBUG === "true" ? "debug" : "warn",
      onError(err, req, res) {
        console.error(`[setupProxy] proxy error ${req.method} ${req.url} -> ${apiTarget}:`, err.message);
        if (!res.headersSent) {
          res.writeHead(502, { "Content-Type": "application/json" });
        }
        res.end(JSON.stringify({ message: "Bad Gateway", target: apiTarget, error: err.message }));
      },
    })
  );
};
