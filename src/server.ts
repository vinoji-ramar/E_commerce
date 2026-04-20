import { app } from "./app";
import { initializeDatabase } from "./config/database";
import { env } from "./config/env";
import { logger } from "./utils/logger.util";

const PORT = env.PORT;

const startServer = async (): Promise<void> => {
  await initializeDatabase();

app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on http://0.0.0.0:${PORT}`);
});
};

startServer().catch((error: unknown) => {
  logger.error("Failed to start server", error);
  process.exit(1);
});
