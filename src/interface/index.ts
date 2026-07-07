import { JwtService as NestJwtService } from "@nestjs/jwt";
import { Redis } from "ioredis";
import { DataSource } from "typeorm";

export abstract class JwtService extends NestJwtService {}

export abstract class CacheService {
  abstract data: Redis;
  abstract init(): Promise<void>;
}

export abstract class OrmService {
  abstract data: DataSource;
  abstract init(): Promise<void>;
}

export type UserPayload = {
  userId: string;
  username: string;
};

export abstract class LoggerService {
  abstract error(message: string, data: unknown): void;
  abstract info(message: string, data: unknown): void;
  abstract warn(message: string, data: unknown): void;
  abstract debug(message: string, data: unknown): void;
  abstract backup(message: string, data: unknown): void;
}

export type AccessLog = {
  requestId: string;
  path: string;
  method: string;
  ip: string;
  body: Record<string, unknown>;
  status: string;
  duration: number;
  error: {
    name: string;
    stack: string;
    message: string;
    cause: string;
  } | null;
};

export abstract class AlsService {
  abstract get(): AlsData;
  abstract update(data: Partial<AlsData>): void;

  abstract run<T>(store: AlsData, callback: () => T): T;
}

export type AlsData = {
  requestId: string;
  startTime: string;
  success: boolean;
  userPayload: UserPayload | null;
  data: Record<string, unknown>;
};

export abstract class InfraService {
  abstract als: AlsService;
  abstract cache: CacheService;
  abstract logger: LoggerService;
  abstract jwt: JwtService;
  abstract orm: OrmService;
}
