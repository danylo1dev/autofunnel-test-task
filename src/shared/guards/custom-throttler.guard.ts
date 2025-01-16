import { Injectable } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerRequest } from '@nestjs/throttler';
import { JwtUserPayload } from 'src/auth/types/jwt-user-payload.type';

@Injectable()
export class ThrottleIpBodyGuard extends ThrottlerGuard {
  // protected async handleRequest(
  //   requestProps: ThrottlerRequest,
  // ): Promise<boolean> {
  //   const { req, res } = this.getRequestResponse(requestProps.context);
  //   return true;
  // }

  protected async getTracker(
    req: Record<string, any> & { user: JwtUserPayload },
  ): Promise<string> {
    return req.user.sub;
  }
}
