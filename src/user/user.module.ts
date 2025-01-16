import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { CustomThrottlerGuard } from 'src/shared/guards/custom-throttler.guard';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  providers: [
    {
      provide: 'model',
      useValue: 'user',
    },
    BasePrismaCrudService,
    UserService,
  ],
  imports: [PrismaModule, ConfigModule, JwtModule.register({})],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
