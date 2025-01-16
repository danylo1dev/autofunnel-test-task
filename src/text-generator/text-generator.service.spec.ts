import { Test, TestingModule } from '@nestjs/testing';
import { TextGeneratorService } from './text-generator.service';
import { OpenaiService } from 'src/openai/openai.service';

describe('TextGeneratorService', () => {
  let service: TextGeneratorService;
  let openaiService: OpenaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TextGeneratorService,
        {
          provide: OpenaiService,
          useFactory: () => ({
            createText: jest.fn().mockResolvedValue({
              choices: [{ message: 'Test response' }],
            }),
          }),
        },
      ],
    }).compile();

    service = module.get<TextGeneratorService>(TextGeneratorService);
    openaiService = module.get<OpenaiService>(OpenaiService);
  });

  it('should generate text', async () => {
    const prompt = 'Write a short story about a cat.';
    const result = await service.generateText(prompt);

    expect(result).toBe('Test response');
    expect(openaiService.createText).toHaveBeenCalledWith({
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
  });
});
