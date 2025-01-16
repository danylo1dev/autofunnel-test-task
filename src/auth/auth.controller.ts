import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthUser } from './decorators/user.decorator';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import {
  AuthResponseDto,
  LoginBodyDto,
  RefreshBodyDto,
  RegisterBodyDto,
} from './dto';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthResponseDto,
  })
  login(@Body() body: LoginBodyDto): Promise<AuthResponseDto> {
    return this.authService.login(body);
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthResponseDto,
  })
  signup(@Body() body: RegisterBodyDto): Promise<AuthResponseDto> {
    return this.authService.signup(body);
  }
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthResponseDto,
  })
  logout(@AuthUser() user: AuthUser) {
    this.authService.logout(user['sub']);
  }
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ApiBody({ type: RefreshBodyDto })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthResponseDto,
  })
  refreshTokens(@AuthUser() user: AuthUser): Promise<AuthResponseDto> {
    const userId = user['sub'];
    const refreshToken = user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
