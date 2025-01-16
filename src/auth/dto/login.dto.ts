import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto';
import { Auth } from '../types';

export class LoginBodyDto
  extends PickType(UserDto, ['email', 'password'] as const)
  implements Auth.LoginBody {}
