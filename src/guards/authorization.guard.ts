import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('헤더 형식이 잘못되었습니다.');
    }

    const token = authorizationHeader.substring(7);
    const expectedToken = this.configService.get<string>('DATABASE_PASSWORD');

    if (token !== expectedToken) {
      throw new UnauthorizedException('토큰이 일치하지 않습니다.');
    }

    return true;
  }
}
