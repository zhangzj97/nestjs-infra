type EnvConfig = {
  NodeEnv: "dev" | "prod";

  "server.port": number;

  "cache.redis.enabled": boolean;
  "cache.redis.host": string;
  "cache.redis.port": number;
  "cache.redis.password": string;
  "cache.redis.db": number;

  "orm.enabled": boolean;
  "orm.host": string;
  "orm.port": number;
  "orm.username": string;
  "orm.password": string;
  "orm.database": string;

  AccessKeyID: string;
  AccessKeySecret: string;

  "captcha.mode": "local" | "remote" | "disabled";
  "captcha.baseUrl": string;

  "sms.mode": "local" | "remote" | "disabled";
  "sms.baseUrl": string;

  "jwt.mode": "issuer" | "validator";
  "jwt.expiresIn": number;
  "jwt.privateKey": string;
  "jwt.publicKey": string;
};

export const getEnv = <T extends keyof EnvConfig>(key: T): EnvConfig[T] => {
  const data = process.env[key];

  if (data === `true`) return true as EnvConfig[T];
  if (data === `false`) return false as EnvConfig[T];

  if (data === undefined) throw new Error(`${key} is undefined`);

  return process.env[key] as EnvConfig[T];
};
