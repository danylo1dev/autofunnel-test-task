import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TextGenerator } from '../types';

export class TextGeneratorBodyDto implements TextGenerator.Body {
  @ApiProperty({ description: 'Promt', type: String })
  @IsString()
  promt!: string;
}
