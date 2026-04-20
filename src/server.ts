import { app } from "./app";
import { initializeDatabase } from "./config/database";
import { env } from "./config/env";
import { logger } from "./utils/logger.util";

const PORT = env.PORT;

const startServer = async (): Promise<void> => {
  await initializeDatabase();

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
};

startServer().catch((error: unknown) => {
  logger.error("Failed to start server", error);
  process.exit(1);
});
