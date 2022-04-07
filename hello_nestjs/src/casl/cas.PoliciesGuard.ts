import { AppAbility } from "./casl-ability.factory";
import {
  SetMetadata,
  Injectable,
  CanActivate,
  ExecutionContext,
} from "@nestjs/common";
import { CaslAbilityFactory } from "./casl-ability.factory";
import { Reflector } from "@nestjs/core";
import {Action} from './casl.entity'

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;
export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
export const CHECK_POLICIES_KEY = "check_policy";
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler()
      ) || [];

    const req = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(req.body.user);
    // console.log(JSON.stringify(ability,null,' '))
    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability)
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === "function") {
      console.dir("hit execPolicyHandler")
      return handler(ability);
    }
    return handler.handle(ability);
  }
}


// export class UpdateArticlePolicyHandler implements IPolicyHandler {
//   handle(ability: AppAbility, article) {
//     return ability.can(Action.Update, article);
//   }
// }