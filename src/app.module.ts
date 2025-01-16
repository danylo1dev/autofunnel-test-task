import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TextGeneratorModule } from './text-generator/text-generator.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { OpenaiModule } from './openai/openai.module';
import { CustomThrottlerGuard } from './shared/guards/custom-throttler.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('THROTTLE_TTL') * 1000,
          limit: config.get('THROTTLE_LIMIT'),
        },
      ],
    }),
    AuthModule,
    OpenaiModule,
    TextGeneratorModule,
    UserModule,
  ],
})
export class AppModule {}
