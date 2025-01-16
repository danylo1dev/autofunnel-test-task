import OpenAI from 'openai';

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources';
import { RequestOptions } from 'openai/core';

@Injectable()
export class OpenaiService {
  public readonly openai: OpenAI;
  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.openai = new OpenAI({ apiKey });
  }
  public createText(
    body: ChatCompletionCreateParamsNonStreaming,
    options?: RequestOptions,
  ) {
    return this.openai.chat.completions.create(body, options);
  }
}
