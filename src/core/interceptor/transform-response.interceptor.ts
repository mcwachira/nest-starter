import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //... before root handler

    console.log(response);
    return next.handle().pipe(
      map((response) => {
        if (!response) {
          return {
            data: [],
          };
        }

        if (response.data && response.meta) {
          return {
            data: response.data,
            meta: response.meta,
          };
        }
        return { data: response };
      }),
    );

    //use .pipe() aftrer the root handler
  }
}
