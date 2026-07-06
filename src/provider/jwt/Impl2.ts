import { JwtService } from "@nestjs/jwt";

import { getEnv } from "@/tools/env";

export class Impl2 extends JwtService {
  constructor() {
    super({ publicKey: getEnv(`jwt.publicKey`).replace(/\\n/g, "\n") });
  }

  override sign(): never {
    throw new Error(`当前服务仅用于Token校验, 禁止签发JWT`);
  }
}
