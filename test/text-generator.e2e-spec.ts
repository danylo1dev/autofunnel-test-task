import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { TextGeneratorBodyDto } from 'src/text-generator/dto';
import { TextGeneratorService } from 'src/text-generator/text-generator.service';
import { TextGenerator } from 'src/text-generator/types';
import * as request from 'supertest';

const TextGeneratorMock = {
  generateText: jest.fn(),
};
const JwtServiceMock = {
  verifyAsync: jest.fn(),
};
describe('TextGeneratorController (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtService)
      .useValue(JwtServiceMock)
      .overrideProvider(TextGeneratorService)
      .useValue(TextGeneratorMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/generate-text (POST)', async () => {
    const body: TextGeneratorBodyDto = {
      promt: 'Generate a short story about a cat.',
    };
    const mock: TextGenerator.Response = {
      content: 'test',
      refusal: 'test',
      role: 'assistant',
    };
    JwtServiceMock.verifyAsync.mockResolvedValueOnce({ sub: 123 });
    TextGeneratorMock.generateText.mockResolvedValue(mock);
    const response = await request(app.getHttpServer())
      .post('/generate-text')
      .set('Authorization', `Bearer ${'your_valid_access_token'}`)
      .send(body)
      .expect(200);

    expect(response.body).toHaveProperty('content');
    expect(typeof response.body.content).toBe('string');
  });
});
