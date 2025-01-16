import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { CustomThrottlerGuard } from 'src/shared/guards/custom-throttler.guard';
import { Throttle } from '@nestjs/throttler';

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
}
