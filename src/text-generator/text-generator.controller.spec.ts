import { Test, TestingModule } from '@nestjs/testing';
import { TextGeneratorController } from './text-generator.controller';

describe('TextGeneratorController', () => {
  let controller: TextGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextGeneratorController],
    }).compile();

    controller = module.get<TextGeneratorController>(TextGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
