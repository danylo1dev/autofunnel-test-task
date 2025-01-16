import { Test, TestingModule } from '@nestjs/testing';
import { TextGeneratorService } from './text-generator.service';

describe('TextGeneratorService', () => {
  let service: TextGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextGeneratorService],
    }).compile();

    service = module.get<TextGeneratorService>(TextGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
