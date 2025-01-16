import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshBodyDto {
  @ApiProperty({ description: "refresh token", type: String })
  @IsString()
  refresh_token!: string;
}
