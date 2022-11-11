export enum LogLevel {
  Info = "INFO",
  Warning = "WARNING",
  Error = "ERROR",
}

export type LoggerOptions = {
  data?: any;
  level?: LogLevel;
};

const consoleLogs = (message: string, options: LoggerOptions): void => {
  const {data, level} = options;
  const formattedMessage = `[${new Date().toISOString()}] [${level}] ${message}`;
  if (level === LogLevel.Error) {
    console.error(formattedMessage, data);     
  } else if (level === LogLevel.Warning) {
    console.warn(formattedMessage, data);
  } else {
    if (data) {
      console.log(formattedMessage, data);
    } else {
      console.log(formattedMessage);
    }
  }
};

export const log = (message: string, options: LoggerOptions = { level: LogLevel.Info }): void => {
  consoleLogs(message, options);
};
