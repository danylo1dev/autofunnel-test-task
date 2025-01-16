import { Module } from '@nestjs/common';
import { TextGeneratorService } from './text-generator.service';
import { TextGeneratorController } from './text-generator.controller';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [OpenaiModule],
  providers: [TextGeneratorService],
  controllers: [TextGeneratorController],
})
export class TextGeneratorModule {}
