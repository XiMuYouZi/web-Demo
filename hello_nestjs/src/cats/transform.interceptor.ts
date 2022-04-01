import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException
} from "@nestjs/common";
import { Observable,throwError, TimeoutError } from "rxjs";
import { map, tap,catchError, timeout } from "rxjs/operators";

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    /**
     * http://127.0.0.1:3000/cats/RoleGenerinc
     * 默认返回：RoleGenerinc===> {"name":"ewrfewrw","age":123,"breed":"sfasfadsfaf"}
     * 加上改转换器后，输出如下：
    {
        "data": "RoleGenerinc===> {\"name\":\"ewrfewrw\",\"age\":123,\"breed\":\"sfasfadsfaf\"}"
    }
    handle() 返回一个 Observable。此流包含从路由处理程序返回的值, 因此我们可以使用 map() 运算符轻松地对其进行改变。
     */
    return next.handle().pipe(
        tap((data)=> console.log(`hit TransformInterceptor 原始数据:${data}`)),
        map((data) => ({ data })
        ));
  }
}



@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      console.log('hit ExcludeNullInterceptor')
    return next
      .handle()
      .pipe(map(value => value === null ? '' : value ));
  }
}

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  };
};