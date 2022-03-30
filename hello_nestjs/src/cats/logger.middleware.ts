import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('====> 命中LoggerMiddleware');
    console.log(`User-Agent:${ req.get('User-Agent')}} \n path: ${req.path} \n host:${req.hostname} \n body:${req.body}`);
    // res.redirect('http://www.baidu.com')
    next();
  }
}

export function logger(req, res, next) {
    console.log(`====》命中logger...`);
    next();
  };
