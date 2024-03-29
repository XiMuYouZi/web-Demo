import { Module,Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

/*
@Global 装饰器使模块成为全局作用域。 全局模块应该只注册一次，最好由根或核心模块注册。 
在上面的例子中，CatsService 组件将无处不在，而想要使用 CatsService 的模块则不需要在 imports
数组中导入 CatsModule
 */
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  //每个导入 CatsModule 的模块都可以访问 CatsService ，并且它们将共享相同的 CatsService 实例。
  exports: [CatsService]
})

//提供者也可以注入到模块(类)中（例如，用于配置目的）：
export class CatsModule {
    // constructor(private readonly catsService: CatsService) {}
  }