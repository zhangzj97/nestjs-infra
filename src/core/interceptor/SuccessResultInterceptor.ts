import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Result } from "@zzj/ts-utils";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AlsService } from "@/interface";

@Injectable()
export class SuccessResultInterceptor implements NestInterceptor {
  constructor(
    private readonly als: AlsService, //
  ) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<Result<unknown>> {
    return next.handle().pipe(
      map((data) => {
        const { requestId } = this.als.get();
        this.als.update({ success: true });

        return Result.create<unknown>({
          success: true,
          code: "",
          message: "",
          data,
          requestId,
        });
      }),
    );
  }
}
