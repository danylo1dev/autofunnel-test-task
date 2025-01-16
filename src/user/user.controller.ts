import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  SerializeOptions,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { PlantCareResponseDto, UserDto } from '@plant-care/dtos';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CustomFileInterceptor } from 'src/file/interceptors/file.interceptor';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OmitType(UserDto, ['password', 'refreshToken']),
  })
  async me(@AuthUser() user: AuthUser): Promise<UserDto> {
    return (await this.userService.me(user['sub'])) as UserDto;
  }
  @Get('me/plants')
  @ApiOkResponse({ type: [PlantCareResponseDto] })
  @UseGuards(AccessTokenGuard)
  myTendingPlants(@AuthUser() user: AuthUser): Promise<PlantCareResponseDto[]> {
    return this.userService.findTendingPlants(user['sub']);
  }
  @Get(':id/plants')
  @ApiOkResponse({ type: [PlantCareResponseDto] })
  @UseGuards(AccessTokenGuard)
  tendingPlants(@Param('id') id: string): Promise<PlantCareResponseDto[]> {
    return this.userService.findTendingPlants(id);
  }
  @Post(':id/upload/avatar')
  @UseInterceptors(CustomFileInterceptor)
  @ApiOperation({ summary: 'Upload a avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadAvatar(@UploadedFile() file, @Param('id') id: string) {
    this.userService.upload(file, id);
  }
}
