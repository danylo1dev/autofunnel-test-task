import { OmitType } from '@nestjs/swagger';
import { Auth } from '../types';
import { UserDto } from 'src/user/dto';
export class RegisterBodyDto
  extends OmitType(UserDto, ['id'] as const)
  implements Auth.RegisterBody {}
