import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  //implements -> 반드시 구현하도록 강제하는거임
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, url } = request;
    const { status } = response;

    this.logger.log(`${method} ${url} ${status}`);
    next();
  }
}
