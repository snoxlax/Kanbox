import { config } from "./config/env.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import errorHandler from "./middleware/error-handler.js";

const app = express();

// CORS configuration - allow cross-origin requests from frontend
const corsOptions = {
  credentials: true,
};

// Set specific origin when frontend is served separately
if (config.cors.origin) {
  corsOptions.origin = config.cors.origin;
} else if (config.app.env === "production") {
  // In production, require CORS_ORIGIN to be set when frontend is separate
  console.warn(
    "Warning: CORS_ORIGIN not set. Frontend may not be able to connect."
  );
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.app.env === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

app.use(cookieParser());

app.use("/api", routes);

app.get("/health", function (_req, res) {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Backend is now API-only - no static file serving or SPA routing
// Frontend should be deployed separately and connect via CORS

app.use(errorHandler);

export default app;
