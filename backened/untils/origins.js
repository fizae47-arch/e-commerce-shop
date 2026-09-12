function normalizeOrigin(url) {
  if (!url || typeof url !== "string") return "";
  return url.trim().replace(/\/$/, "");
}

function extraOriginsFromEnv() {
  return [process.env.FRONTEND_URL, process.env.FRONTEND_URLS]
    .filter(Boolean)
    .flatMap((value) => value.split(","))
    .map(normalizeOrigin)
    .filter(Boolean);
}

const LOCAL_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const PRODUCTION_FRONTEND = "https://e-commerce-shop-232n.vercel.app";
const FRONTEND_PROJECT_NAME =
  process.env.VERCEL_FRONTEND_PROJECT || "e-commerce-shop-232n";

function isVercelFrontendOrigin(origin) {
  try {
    const { hostname, protocol } = new URL(origin);
    if (protocol !== "https:") return false;
    if (!hostname.endsWith(".vercel.app")) return false;
    if (hostname === `${FRONTEND_PROJECT_NAME}.vercel.app`) return true;
    if (hostname.startsWith(`${FRONTEND_PROJECT_NAME}-`)) return true;
    return false;
  } catch {
    return false;
  }
}

function isAllowedOrigin(origin) {
  if (!origin) return true;

  const normalized = normalizeOrigin(origin);

  if (LOCAL_ORIGINS.includes(normalized)) return true;
  if (normalized === PRODUCTION_FRONTEND) return true;
  if (extraOriginsFromEnv().includes(normalized)) return true;
  if (isVercelFrontendOrigin(normalized)) return true;

  return false;
}

function corsOptions() {
  return {
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    optionsSuccessStatus: 204,
  };
}

function applyCors(req, res) {
  const origin = req.headers.origin;
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept, Origin"
    );
    res.setHeader("Vary", "Origin");
  }
}

function getFrontendUrl() {
  return normalizeOrigin(process.env.FRONTEND_URL) || PRODUCTION_FRONTEND;
}

function getBackendUrl(req) {
  const fromEnv = normalizeOrigin(process.env.BACKEND_URL);
  if (fromEnv) return fromEnv;

  if (req) {
    const proto = req.headers["x-forwarded-proto"] || req.protocol || "https";
    const host = req.headers["x-forwarded-host"] || req.get("host");
    if (host) return `${proto}://${host}`;
  }

  return "http://localhost:3000";
}

module.exports = {
  isAllowedOrigin,
  corsOptions,
  applyCors,
  getFrontendUrl,
  getBackendUrl,
  normalizeOrigin,
};
