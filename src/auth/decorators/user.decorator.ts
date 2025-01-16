import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUserPayload } from '../types/jwt-user-payload.type';
export type AuthUser = JwtUserPayload;
export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
