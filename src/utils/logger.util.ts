type LogMessage = string | Record<string, unknown> | Error | unknown;

const formatMessage = (message: LogMessage): string => {
  if (message instanceof Error) {
    return `${message.name}: ${message.message}`;
  }

  if (typeof message === "object" && message !== null) {
    return JSON.stringify(message);
  }

  return String(message);
};

const info = (message: LogMessage): void => {
  console.log(`[INFO] ${new Date().toISOString()} ${formatMessage(message)}`);
};

const debug = (message: LogMessage, details?: unknown): void => {
  console.log(`[DEBUG] ${new Date().toISOString()} ${formatMessage(message)}`);

  if (details) {
    console.log(details);
  }
};

const warn = (message: LogMessage, details?: unknown): void => {
  console.warn(`[WARN] ${new Date().toISOString()} ${formatMessage(message)}`);

  if (details) {
    console.warn(details);
  }
};

const error = (message: LogMessage, details?: unknown): void => {
  console.error(`[ERROR] ${new Date().toISOString()} ${formatMessage(message)}`);

  if (details) {
    console.error(details);
  }
};

const stream = {
  write: (message: string): void => {
    console.log(`[HTTP] ${message.trim()}`);
  }
};

export const logger = {
  debug,
  info,
  warn,
  error,
  stream
};
