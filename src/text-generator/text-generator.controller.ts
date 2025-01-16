import { Body, Controller } from '@nestjs/common';
import { TextGeneratorService } from './text-generator.service';

@Controller('text-generator')
export class TextGeneratorController {
  constructor(private readonly textGeneratorService: TextGeneratorService) {}
  async generate(@Body() body: { promt: string }) {
    return await this.textGeneratorService.generateText(body.promt);
  }
}
