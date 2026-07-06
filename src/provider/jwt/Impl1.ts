import { JwtService } from "@nestjs/jwt";

import { getEnv } from "@/tools/env";

export class Impl1 extends JwtService {
  constructor() {
    super({
      privateKey: getEnv(`jwt.privateKey`).replace(/\\n/g, "\n"),
      publicKey: getEnv(`jwt.publicKey`).replace(/\\n/g, "\n"),
      signOptions: {
        expiresIn: getEnv(`jwt.expiresIn`),
      },
    });
  }
}
