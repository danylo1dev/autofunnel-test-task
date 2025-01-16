import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { TextGenerator } from './types';

@Injectable()
export class TextGeneratorService {
  constructor(private openaiService: OpenaiService) {}
  async generateText(prompt: string): Promise<TextGenerator.Response> {
    const completion = await this.openaiService.createText({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'developer',
          content:
            'You are an incredible writer who writes beautiful text. You are incredibly knowledgeable and love helping people write.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });
    return completion.choices[0].message;
  }
}
