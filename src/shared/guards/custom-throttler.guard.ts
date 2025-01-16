import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtUserPayload } from 'src/auth/types/jwt-user-payload.type';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(
    req: Record<string, any> & { user: JwtUserPayload },
  ): Promise<string> {
    return req.user?.sub || req.ip;
  }
}
