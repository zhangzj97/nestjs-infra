import { Injectable } from "@nestjs/common";
import winston from "winston";

import { LoggerService } from "@/interface";
import "winston-daily-rotate-file";

const format = winston.format.combine(winston.format.timestamp(), winston.format.json());

const transport = {
  access: new winston.transports.DailyRotateFile({
    filename: "logs/access/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "30d",
    level: "debug",
    format,
  }),
  error: new winston.transports.DailyRotateFile({
    filename: "logs/error/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "30d",
    level: "error",
    format,
  }),

  backup: new winston.transports.DailyRotateFile({
    filename: "logs/backup/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "30d",
    level: "debug",
    format,
  }),

  console: new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  }),
};

@Injectable()
export class Impl2 implements LoggerService {
  private readonly accessLogger: winston.Logger;
  private readonly errorLogger: winston.Logger;
  private readonly backupLogger: winston.Logger;

  constructor() {
    this.backupLogger = winston.createLogger({
      transports: [
        transport.backup, //
      ],
    });
    this.accessLogger = winston.createLogger({
      transports: [
        transport.access, //
      ],
    });
    this.errorLogger = winston.createLogger({
      transports: [
        transport.error, //
      ],
    });
  }

  error(message: string, data: unknown) {
    this.errorLogger.error(message, data);
  }

  info(message: string, data: unknown) {
    this.accessLogger.info(message, data);
  }

  warn(message: string, data: unknown) {
    this.accessLogger.info(message, data);
  }

  debug(message: string, data: unknown) {
    this.accessLogger.info(message, data);
  }

  backup(message: string, data: unknown) {
    this.backupLogger.info(message, data);
  }
}
