import { Module } from '@nestjs/common';
import { TextGeneratorService } from './text-generator.service';
import { TextGeneratorController } from './text-generator.controller';
import { OpenaiModule } from 'src/openai/openai.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [OpenaiModule, JwtModule.register({})],
  providers: [TextGeneratorService],
  controllers: [TextGeneratorController],
})
export class TextGeneratorModule {}
