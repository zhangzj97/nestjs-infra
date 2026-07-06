import { DynamicModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";

import { GlobalExceptionFilter } from "./filter/GlobalExceptionFilter";
import { SuccessResultInterceptor } from "./interceptor/SuccessResultInterceptor";
import { AccessLogMiddleware } from "./middleware/AccessLogMiddleware";
import { AlsMiddleware } from "./middleware/AlsMiddleware";
import { ParamValidationPipe } from "./pipe/ParamValidationPipe";

export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AlsMiddleware, AccessLogMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }

  static forRoot(_options: {}): DynamicModule {
    return {
      imports: [],
      providers: [
        { provide: APP_INTERCEPTOR, useClass: SuccessResultInterceptor },
        { provide: APP_PIPE, useClass: ParamValidationPipe },
        { provide: APP_FILTER, useClass: GlobalExceptionFilter },
      ],
      exports: [],
      module: CoreModule,
    };
  }
}
