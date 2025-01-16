import {
  BadGatewayException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TextGeneratorService } from './text-generator.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { ApiBearerAuth, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { TextGeneratorBodyDto, TextGeneratorResponseBodyDto } from './dto';
import { InternalServerError, OpenAIError } from 'openai';

@Controller('text-generator')
@ApiTags('Text generator')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class TextGeneratorController {
  constructor(private readonly textGeneratorService: TextGeneratorService) {}
  @UseGuards(AccessTokenGuard)
  @Post('/generate')
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    type: TextGeneratorBodyDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TextGeneratorResponseBodyDto,
  })
  async generate(
    @Body() body: TextGeneratorBodyDto,
  ): Promise<TextGeneratorResponseBodyDto> {
    try {
      return await this.textGeneratorService.generateText(body.promt);
    } catch (err) {
      if (err instanceof OpenAIError) {
        throw new BadGatewayException(err);
      }
      throw new InternalServerErrorException(err);
    }
  }
}
