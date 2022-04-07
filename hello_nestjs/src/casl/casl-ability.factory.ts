import {
  Ability,
  AnyAbility,
  PureAbility,
  SubjectType,
  InferSubjects,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from "@casl/ability";
import { Inject, Injectable } from "@nestjs/common";
import { User, Article, Action } from "./casl.entity";

type Subjects = InferSubjects<typeof Article | typeof User> | "all";
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    //casl语法：https://casl.js.org/v5/en/guide/intro
    const { can, cannot, build } = new AbilityBuilder< Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);
    /*
    【manage】 and 【all】 are special keywords in CASL. 【manage】 represents any action ， 【all】 represents any subject.
    【User Action】
    Describes what user can actually do in the app. User action is a word (usually a verb) which depends on the business logic (e.g., prolong, read). Very often it will be a list of words from CRUD - create, read, update and delete.
    【Subject】
    The subject or subject type which you want to check user action on. Usually this is a business (or domain) entity (e.g., Subscription, Article, User). The relation between subject and subject type is the same as relation between an object instance and its class.
    【Fields】
    Can be used to restrict user action only to matched subject's fields (e.g., to allow moderator to update status field of an Article and disallow to update description or title)
    【Conditions】
    Criteria which restricts user action only to matched subjects. This is useful when you need to give a permission on specific subjects (e.g., to allow user to manage own Article)
    */

    if (user.isAdmin) {
      can(Action.Manage, "all"); // read-write access to everything
    } else {
      can(Action.Read, "all"); // read-only access to everything
    }
    //如果用户是admin，就可以执行任何操作，那么下面两条规则就无效了
    can(Action.Update, Article, { authorId: user.id });
    can(Action.Delete, Article, { isPublished: true });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
