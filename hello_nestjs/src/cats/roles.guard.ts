import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./roles.decorator";

//详情见“应用上下文”：https://docs.nestjs.cn/8/fundamentals?id=%e5%ba%94%e7%94%a8%e4%b8%8a%e4%b8%8b%e6%96%87
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * ExecutionContext扩展了ArgumentsHost,提供额外的当前运行线程信息。和ArgumentsHost类似,Nest在需要的时候提供了一个ExecutionContext的实例，
   *  例如守卫的canActivate()方法和拦截器的intercept()方法，它提供以下方法：
   */
  canActivate(context: ExecutionContext): boolean {
    /**
     * 使用get()方法读取处理程序的元数据。
    ```const roles = this.reflector.get<string[]>('roles', context.getHandler());```
     * Reflector#get方法允许通过传递两个参数简单获取元数据：一个元数据key和一个context(装饰器对象)来获取元数据。在本例中，
     * 指定的key是roles(向上指回roles.decorator.ts以及在此处调用的SetMetadata()方法)。
     * context 由context.getHandler()提供,用于从当前路径处理程序中获取元数据，getHandler()给了我们一个到路径处理函数的引用。
     */
    const requireRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
      /**
       * getHandler()方法返回对将要调用的处理程序的引用。getClass()方法返回这个特定处理程序所属的 Controller 类的类型。
       * 例如，如果当前处理的请求是 POST 请求，目标是 CatsController上的 create() 方法，那么 getHandler() 将返回对 create() 方法的引用，
       * 而 getClass()将返回一个CatsControllertype(而不是实例)。
       * 能同时获取当前类和处理方法的引用的能力提供了极大的灵活性。最重要的是，它给我们提供了通过@SetMetadata()装饰器来操作守卫或拦截器元数据的方法。如下。
       */
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }
    const {user}=context.switchToHttp().getRequest();
    return this.matchRoles(requireRoles);
  }

  private matchRoles(requireRoles: Role[]): boolean {
    const user = {
      name: "Nishant",
      roles: [Role.USER],
    };
    console.log(`允许的用户:${requireRoles}，请求的用户：${user.roles}`);
    return requireRoles.some((role) => user.roles.includes(role));
  }
}
