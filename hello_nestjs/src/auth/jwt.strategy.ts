import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
/*在实现策略时，可以通过向 PassportStrategy 函数传递第二个参数来为其提供名称。如果你不这样做，每个策略将有一个默认的名称(例如，”jwt”的 jwt策略 ):
export class JwtStrategy extends PassportStrategy(Strategy, 'myjwt')
然后，通过一个像 @AuthGuard('myjwt') 这样的装饰器来引用它
*/
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}