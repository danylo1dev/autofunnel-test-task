import { ApiProperty } from '@nestjs/swagger';
import { Auth } from '../types';
export class AuthResponseDto implements Auth.Response {
  @ApiProperty({
    type: String,
    description: 'JWT access token used for accessing protected resources',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token!: string;

  @ApiProperty({
    type: String,
    description:
      'JWT refresh token used for renewing the access token when it expires',
    example: 'def50200e1d5ac...',
  })
  refresh_token!: string;
}
