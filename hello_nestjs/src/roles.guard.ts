import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./cats/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
      /**
       * getHandler()方法返回对将要调用的处理程序的引用。getClass()方法返回这个特定处理程序所属的 Controller 类的类型。
       * 例如，如果当前处理的请求是 POST 请求，目标是 CatsController上的 create() 方法，那么 getHandler() 将返回对 create() 方法的引用，
       * 而 getClass()将返回一个CatsControllertype(而不是实例)。
       */
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }
    //const {user}=context.switchToHttp().getRequest();
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
