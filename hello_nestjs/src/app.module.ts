import { Module,NestModule, MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware,logger } from './cats/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './cats/user.decorator';
import { UsersModule } from './user/user.module';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { ArticleModule } from './article/article.module';


@Module({
  imports: [
    CatsModule,
    UsersModule,
    // TypeOrmModule.forRoot(
    //   {
    // //   type: 'mysql',
    // //   host: 'localhost',
    // //   port: 3306,
    // //   username: 'root',
    // //   password: '476301176',
    // //   database: 'nest',
    // //   // entities: [UserEntity],
    // //   //设置autoLoadEntities属性为true来自动载入实体(forFeature设置的entity)
    //   autoLoadEntities: true
    // //   synchronize: true,
    // }
    // ),
    AuthModule,
    CaslModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  // constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    // 多中间件，顺序执行
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
