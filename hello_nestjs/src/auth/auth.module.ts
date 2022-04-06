import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    /*
在我们的 AppController 中，我们在 @AuthGuard() 装饰器中传递策略的名称。我们需要这样做，因为我们已经介绍了两种 Passport 策略(护照本地策略和护照 jwt 策略)，
这两种策略都提供了各种 Passport 组件的实现。传递名称可以消除我们链接到的实现的歧义。当应用程序中包含多个策略时，我们可以声明一个默认策略，
这样如果使用该默认策略，我们就不必在 @AuthGuard 装饰器中传递名称。下面介绍如何在导入 PassportModule 时注册默认策略
    */
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}