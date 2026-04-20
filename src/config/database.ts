import { Sequelize } from "sequelize";
import { env } from "./env";
import { logger } from "../utils/logger.util";
import { initializeModels } from "../models/model-index";

export const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: "mysql",
  benchmark: env.DB_LOGGING,
  logging: env.DB_LOGGING
    ? (sql, timingMs) => {
        if (typeof timingMs === "number" && timingMs >= env.DB_SLOW_QUERY_MS) {
          logger.warn("Slow database query detected", { sql, timingMs });
          return;
        }
        logger.debug(sql, typeof timingMs === "number" ? { timingMs } : undefined);
      }
    : false,
  define: {
    timestamps: true,
    underscored: false
  }
});

initializeModels(sequelize);

export const initializeDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established");

  } catch (error) {
    logger.error("Database initialization failed", error);
    throw error;
  }
};
