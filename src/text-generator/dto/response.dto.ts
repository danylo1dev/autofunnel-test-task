import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TextGenerator } from '../types';

export class TextGeneratorResponseBodyDto implements TextGenerator.Response {
  @ApiProperty({ description: 'content', type: String })
  @IsString()
  content: string;
  @ApiProperty({ description: 'refusal', type: String })
  @IsString()
  refusal: string;
  @ApiProperty({ description: 'role', type: String })
  @IsString()
  role: 'assistant';
}
