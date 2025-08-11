import helmet from "helmet";
import cors from "cors";

export const security = [
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "img-src": ["'self'","data:","https:"],
        "script-src": ["'self'","'unsafe-inline'"],
        "style-src": ["'self'","'unsafe-inline'"],
        "connect-src": ["'self'", process.env.SUPABASE_URL || ""]
      }
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" }
  }),
  cors({ origin: process.env.CORS_ORIGIN?.split(",") || [process.env.CORS_ORIGIN], credentials: true })
];
