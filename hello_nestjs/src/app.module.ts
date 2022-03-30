import { Module,NestModule, MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware,logger } from './cats/logger.middleware';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 多中间件顺序执行
    // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);

    //函数中间件
    consumer
    .apply(logger)
    .forRoutes(CatsController);

    //类中间件
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      //路径必须是cats，cats/id不匹配
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      .forRoutes(CatsController);
      //通配符
      // forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });

  }
}
