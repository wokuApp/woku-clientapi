import {
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsBoolean,
  IsString,
  IsNumber,
  IsIn,
  IsEmail,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTextnoteDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  qualification: number;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  wokuId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(3000)
  description: string;

  @ApiProperty()
  @IsOptional()
  clientId?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  anonymous?: boolean;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  clientEmail?: string;
}

export class CreateVoicemailDTO {
  @ApiProperty()
  @IsIn(['1', '2', '3', '4', '5'])
  @IsNotEmpty()
  qualification: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  wokuId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  filename: string;

  @ApiProperty()
  @IsOptional()
  clientId?: string;

  @ApiProperty()
  @IsIn(['true', 'false', ''])
  @IsOptional()
  anonymous?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  size: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  clientEmail?: string;
}
