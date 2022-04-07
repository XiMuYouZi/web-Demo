import * as common from "@nestjs/common";
import { PoliciesGuard } from "./cas.PoliciesGuard";
import { AppAbility } from "./casl-ability.factory";
import { Action, Article, User } from "./casl.entity";
import { CheckPolicies } from "./cas.PoliciesGuard";
import { CaslAbilityFactory } from "./casl-ability.factory";
@common.Controller("casl")
export class CaslController {
  constructor(private caslAbilityFactory: CaslAbilityFactory) {}
  /**
     * url：http://127.0.0.1:3000/casl/authCASL
     * 1、body：{"user":{"id":213123,"isAdmin":false}}
     * 返回：
     * {
            "statusCode": 403,
            "message": "Forbidden resource",
            "error": "Forbidden"
        }
       2、 body:{"user":{"id":213123,"isAdmin":true}}
     * 返回：authCASL SUCCESS
     */
  @common.Get("CheckPolicies")
  @common.UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Article))
  authCASLTestAdmin() {
    return "CheckPolicies SUCCESS";
  }

  /*http://127.0.0.1:3000/casl/authCASLTestArticle
  Body:{"user":{"id":1,"isAdmin":false}}
  */
  @common.Get("authCASLTestArticle")
  @common.UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => {
    console.log(JSON.stringify(ability, null, " "));
    console.log("CheckPolicies authCASLTestArticle");
    const article = new Article();
    //forbiden
    article.authorId = 2;
    //pass
    // article.authorId = 1
    const ret = ability.can(Action.Update, article);
    console.dir(ret);
    article.isPublished = true;
    console.log(ability.can(Action.Delete, article));
    return ret;
  })
  authCASLTestArticle() {
    this.testauthCASLTestArticle();
    return "authCASLTestArticle SUCCESS";
  }

  private testauthCASLTestArticle() {
    const user = new User();
    user.id = 1;

    const article = new Article();
    article.authorId = user.id;

    const ability = this.caslAbilityFactory.createForUser(user);
    ability.can(Action.Update, article); // true

    article.authorId = 2;
    ability.can(Action.Update, article); // false
  }
}
