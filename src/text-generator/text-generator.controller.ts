import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { TextGeneratorBodyDto, TextGeneratorResponseBodyDto } from './dto';
import { TextGeneratorService } from './text-generator.service';
import { Throttle } from '@nestjs/throttler';
import { CustomThrottlerGuard } from 'src/shared/guards/custom-throttler.guard';

@Controller('')
@ApiTags('Text generator')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class TextGeneratorController {
  constructor(private readonly textGeneratorService: TextGeneratorService) {}
  @UseGuards(AccessTokenGuard, CustomThrottlerGuard)
  @Post('/generate-text')
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
    return await this.textGeneratorService.generateText(body.promt);
  }
}
