import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard
  extends AuthGuard('jwt-refresh')
  implements CanActivate
{
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromBody(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      request['user'] = { ...payload, refreshToken: token };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromBody(request: any): string | undefined {
    return request.body.refresh_token ?? undefined;
  }
}
