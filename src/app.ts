import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import { apiRoutes } from "./routes";
import { logger } from "./utils/logger.util";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev", { stream: logger.stream }));
app.use(`/${env.UPLOAD_DIR}`, express.static(path.resolve(process.cwd(), env.UPLOAD_DIR)));
app.use(env.API_PREFIX, apiRoutes);
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
