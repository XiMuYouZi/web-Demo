import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

//只有正常的请求，然后处理过程中抛出了异常，才会触发这个拦截器，我以为是拦截异常然后改写抛出的异常
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.info("hit ErrorsInterceptor");
    return next
      .handle()
      .pipe(catchError((err) => throwError(new BadGatewayException())));
  }
}
