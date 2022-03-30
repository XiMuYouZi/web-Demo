import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {logger} from './cats/logger.middleware'
import {HttpExceptionFilter} from './cats/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //如果我们想一次性将中间件绑定到每个注册路由，我们可以使用由INestApplication实例提供的 use()方法
  app.use(logger);
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
