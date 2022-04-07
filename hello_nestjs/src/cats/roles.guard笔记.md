# 应用上下文
Nest提供了一些应用类来简化在不同应用上下文之间编写应用(例如Nest HTTP应用，微服务和WebSockets应用)。这些应用可以用于创建通用的守卫，过滤器和拦截器，可以工作在控制器，方法和应用上下文中。

本章包括ArgumentsHost和ExecutionContext两个类.

## ArgumentsHost类
ArgumentsHost类提供了获取传递给处理程序的参数。它允许选择合适的上下文(例如HTTP，RPC(微服务)或者Websockets)来从框架中获取参数。框架提供了ArgumentsHost的实例，作为host参数提供给需要获取的地方。例如，在异常过滤器中传入ArgumentsHost参数来调用catch()方法。

ArgumentsHost简单地抽象为处理程序参数。例如，在HTTP应用中(使用@nestjs/platform-express时),host对象封装了Express的[request, response, next] 数组,reuest是一个request对象，response是一个response对象，next是控制应用的请求响应循环的函数。此外，在GraphQL应用中，host包含[root, args, context, info]数组。

## 当前应用上下文
当构建通用的守卫，过滤器和拦截器时，意味着要跨应用上下文运行，我们需要在当前运行时定义应用类型。可以使用 ArgumentsHost的getType()方法。
```ts
if (host.getType() === 'http') {
  // do something that is only important in the context of regular HTTP requests (REST)
} else if (host.getType() === 'rpc') {
  // do something that is only important in the context of Microservice requests
} else if (host.getType<GqlContextType>() === 'graphql') {
  // do something that is only important in the context of GraphQL requests
}

GqlContextType从中@nestjs/graphql导入。
```

应用类型定以后，可以如下编写通用组件。

## Host处理程序参数
要获取传递给处理程序的参数数组，使用host对象的getArgs()方法。
```ts
const [req, res, next] = host.getArgs();
可以使用getArgByIndex()根据索引获取指定参数:

const request = host.getArgByIndex(0);
const response = host.getArgByIndex(1);
```
在这些例子中我们通过索引来获取请求响应对象，这并不推荐，因为它将应用和特定上下文耦合。为了使代码鲁棒性更好，更可复用，你可以在程序中使用host对象的应用方法来切换合适的应用上下文，如下所示：
```ts
/**
 * Switch context to RPC.
 */
switchToRpc(): RpcArgumentsHost;
/**
 * Switch context to HTTP.
 */
switchToHttp(): HttpArgumentsHost;
/**
 * Switch context to WebSockets.
 */
switchToWs(): WsArgumentsHost;
`````
使用 switchToHttp() 方法重写前面的例子， host.switchToHttp()帮助方法调用一个HTTP应用的HttpArgumentsHost对象. HttpArgumentsHost对象有两个有用的方法，我们可以用来提取期望的对象。我们也可以使用Express类型的断言来返回原生的Express类型对象：
```ts
const ctx = host.switchToHttp();
const request = ctx.getRequest<Request>();
const response = ctx.getResponse<Response>();
```
类似地，WsArgumentsHost和RpcArgumentsHost有返回微服务和WebSockets上下文的方法，以下是WsArgumentsHost的方法:
```ts
export interface WsArgumentsHost {
  /**
   * Returns the data object.
   */
  getData<T>(): T;
  /**
   * Returns the client object.
   */
  getClient<T>(): T;
}

以下是RpcArgumentsHost的方法:

export interface RpcArgumentsHost {
  /**
   * Returns the data object.
   */
  getData<T>(): T;

  /**
   * Returns the context object.
   */
  getContext<T>(): T;
}
```

## 执行上下文类
ExecutionContext扩展了ArgumentsHost,提供额外的当前运行线程信息。和ArgumentsHost类似,Nest在需要的时候提供了一个ExecutionContext的实例， 例如守卫的canActivate()方法和拦截器的intercept()方法，它提供以下方法：
```ts
export interface ExecutionContext extends ArgumentsHost {
  /**
   * Returns the type of the controller class which the current handler belongs to.
   */
  getClass<T>(): Type<T>;
  /**
   * Returns a reference to the handler (method) that will be invoked next in the
   * request pipeline.
   */
  getHandler(): Function;
}
```
getHandler()方法返回要调用的处理程序的引用。getClass()方法返回一个特定处理程序所属的控制器类。例如，一个HTTP上下文，如果当前处理的是一个POST请求，在CatsController中绑定create()方法。getHandler()返回create()方法和getClass()方法所在的CatsController类的引用(不是实例)。
```ts
const methodKey = ctx.getHandler().name; // "create"
const className = ctx.getClass().name; // "CatsController"
```
能同时获取当前类和处理方法的引用的能力提供了极大的灵活性。最重要的是，它给我们提供了通过@SetMetadata()装饰器来操作守卫或拦截器元数据的方法。如下。

## 反射和元数据
Nest提供了通过`@SetMetadata()`装饰器将自定义元数据附加在路径处理程序的能力。我们可以在类中获取这些元数据来执行特定决策。
> cats.controller.ts
```ts
@Post()
@SetMetadata('roles', ['admin'])
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
@SetMetadata()装饰器从@nestjs/common导入。
```
基于上述结构，我们将role元数据(role是一个元数据，[‘admin’] 是对应的值)关联到create()方法。在这种情况下，不推荐直接在路径中使用@SetMetadata()，而是应该如下创建自己的装饰器：
> roles.decorator.ts
```ts

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

这一方法更清晰，更刻度，并且是强类型的。我们现在可以使用自定义的@Roles()装饰器，并将其应用在create()方法中。
```
> cats.controller.ts
```ts
@Post()
@Roles('admin')
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
要访问role(s)路径 (自定义元数据),要使用Reflector辅助类，它由框架提供，开箱即用，从@nestjs/core包导入。Reflector可以通过常规方式注入到类:
```
> roles.guard.ts
```ts
@Injectable()
export class RolesGuard {
  constructor(private reflector: Reflector) {}
}

Reflector类从@nestjs/core导入。

使用get()方法读取处理程序的元数据。

const roles = this.reflector.get<string[]>('roles', context.getHandler());
```
Reflector#get方法允许通过传递两个参数简单获取元数据：一个元数据key和一个context(装饰器对象)来获取元数据。在本例中，指定的key是roles(向上指回roles.decorator.ts以及在此处调用的SetMetadata()方法)。context 由context.getHandler()提供,用于从当前路径处理程序中获取元数据，getHandler()给了我们一个到路径处理函数的引用。

我们也可以组织我们的控制器，来从控制器层获取元数据，以在控制器所有路径中应用。

>cats.controller.ts
```ts
@Roles('admin')
@Controller('cats')
export class CatsController {}
```
在本例中，要获取控制器元数据，将context.getClass()作为第二个参数(将控制器类作为上下文提供以获取元数据)来替代context.getHandler():

>roles.guard.ts
```ts
const roles = this.reflector.get<string[]>('roles', context.getClass());
```
要具备在多层提供元数据的能力，需要从多个上下文获取与合并元数据。Reflector类提供两个应用方法来帮助实现该功能。这些方法同时获取控制器和方法元数据，并通过不同方法来合并他们。

考虑以下场景，在两个水平应用roles元数据：

>cats.controller.ts
```ts
@Roles('user')
@Controller('cats')
export class CatsController {
  @Post()
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
```
如果你想将user指定为默认角色，并且出于特定目的有选择地进行覆盖，可以使用 `getAllAndOverride()`方法。
```ts
const roles = this.reflector.getAllAndOverride<string[]>('roles', [
  context.getHandler(),
  context.getClass(),
]);
```
使用该代码编写守卫，在上下文中应用create()方法，采用上述元数据，将生成包含 [‘admin’]的roles。

要获取与合并元数据(该方法合并数组和对象)，使用`getAllAndMerge()`方法：
```ts
const roles = this.reflector.getAllAndMerge<string[]>('roles', [
  context.getHandler(),
  context.getClass(),
]);
```
这会生成包含[‘user’, ‘admin’]的roles。

对于这两种合并方法，传输元数据作为第一个参数，数组或者元数据对象上下文(例如，调用getHandler()和/或getClass())作为第二个参数。