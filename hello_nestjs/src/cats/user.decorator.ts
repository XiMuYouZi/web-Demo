import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  console.dir(request['body']);
//   request.user = {name:'fsadf',age:123,breed:'fasdfasdf'}
  return request['body'];
});

/*
假设用户数据如下：
{
  "id": 101,
  "firstName": "Alan",
  "lastName": "Turing",
  "email": "alan@email.com",
  "roles": ["admin"]
}
使用x-www-form-urlencode
*/
export const UserPara = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request['body'];
    console.dir(`UserPara===> ${JSON.stringify(user)}---${data}`)
    return data ? user && user[data] : user;
  });