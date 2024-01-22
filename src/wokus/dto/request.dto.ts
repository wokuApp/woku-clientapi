import {
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWokuDTO {
  @ApiProperty({
    description:
      'The description cannot have fewer than 3 characters and cannot exceed a maximum of 140 characters.',
    example: 'Docker Training',
  })
  @MinLength(3, {
    message: 'The description cannot have less than 3 characters.',
  })
  @MaxLength(140, {
    message: 'The description cannot exceed 140 characters.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description:
      'This field must contain a public URL that includes an image or video file. For optimal performance when sending video, the mp4 format is preferred.',
    required: false,
    example:
      'https://wokudevfiles.blob.core.windows.net/wokus/cd7f9cf3-c2e4-4ff0-8a96-19ff813f569e1699220394936-image.webp',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fileUrl?: string;

  @ApiProperty({
    description:
      'This field is optional. Upon completing this field, the woku will be stored in the Company Folder that holds this secondary key.',
    required: false,
    example: '17614778-3',
  })
  @IsString()
  @IsOptional()
  secondaryKey?: string;

  @ApiProperty({
    description:
      'This field is optional. By completing this field, an email will be sent to the client inviting them to rate the woku.',
    required: false,
    example: 'pedro@empresa.com',
  })
  @IsEmail()
  @IsOptional()
  clientEmail?: string;
}

export class CreateWokuFormDataDTO {
  @ApiProperty({
    description:
      'The description cannot have fewer than 3 characters and cannot exceed a maximum of 140 characters.',
    example: 'Docker Training',
  })
  @MinLength(3, {
    message: 'The description cannot have less than 3 characters.',
  })
  @MaxLength(140, {
    message: 'The description cannot exceed 140 characters.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description:
      'This field is optional. Upon completing this field, the woku will be stored in the Company Folder that holds this secondary key.',
    required: false,
    example: '17614778-3',
  })
  @IsString()
  @IsOptional()
  secondaryKey?: string;

  @ApiProperty({
    description:
      'This field is optional. By completing this field, an email will be sent to the client inviting them to rate the woku.',
    required: false,
    example: 'pedro@empresa.com',
  })
  @IsEmail()
  @IsOptional()
  clientEmail?: string;
}

export class GetWokuReviewDTO {
  @ApiProperty({
    description: 'This field is the ID of a woku in string format.',
    example: '65348875f3a876254aa82d5e',
  })
  @IsNotEmpty()
  @IsMongoId()
  wokuId: string;
}

export class CreateTextnoteDTO {
  @ApiProperty({
    description: 'This field is the ID of a woku in string format.',
    example: '65348875f3a876254aa82d5e',
  })
  @IsNotEmpty()
  @IsMongoId()
  wokuId: string;

  @ApiProperty({
    description: 'This field must contain an integer between 1 and 5.',
    example: 4,
  })
  @IsNumber()
  @IsNotEmpty()
  qualification: number;

  @ApiProperty({
    description:
      'This field must be a string; it is the written feedback that the client leaves for the woku.',
    example: 'Very good the Docker course!',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description:
      'This field is the email of the client providing the feedback. This field is optional. If this field is not filled out, the anonymous field must be marked as true.',
    example: 'pedro@empresa.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  clientEmail?: string;

  @ApiProperty({
    description:
      'This field is a boolean that, when true, sends anonymous feedback. This field is optional. When this field is omitted or marked false, the client email must be provided in the clientEmail field.',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  anonymous?: boolean;
}
