import { SetMetadata } from "@nestjs/common";


export enum Role {
    USER = "user",
    ADMIN = "admin",
}

//Nest提供了通过@SetMetadata()装饰器将自定义元数据附加在路径处理程序的能力。我们可以在类中获取这些元数据来执行特定决策。
export const Roles = (...roles: Role[]) => SetMetadata("roles", roles);