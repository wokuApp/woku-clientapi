import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Headers,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiHeader,
  ApiResponse,
} from '@nestjs/swagger';

import { WokusService } from './wokus.service';
import {
  CreateWokuDTO,
  GetWokuReviewDTO,
  CreateTextnoteDTO,
  CreateWokuFormDataDTO,
} from './dto/request.dto';
import { Textnote, Woku, WokuReview } from './interfaces/woku.interfaces';

import { TextnoteDTO, WokuDTO, WokuReviewDTO } from './dto/response.dto';

@ApiTags('wokus')
@Controller('wokus')
export class WokusController {
  constructor(private readonly wokusService: WokusService) {}

  @Post('/create-woku')
  @ApiOperation({ summary: 'Create a woku with file url' })
  @ApiHeader({ name: 'Authorization', description: 'Company Key' })
  @ApiResponse({
    status: 200,
    description: 'woku created successfully.',
    type: WokuDTO,
  })
  async createWoku(
    @Body() createWokuDTO: CreateWokuDTO,
    @Headers('Authorization') authHeader: string,
  ): Promise<Woku> {
    const createdWoku = await this.wokusService.createWoku(
      createWokuDTO,
      authHeader,
    );

    return createdWoku;
  }

  @Post('/create-woku-form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a woku with form-data' })
  @ApiBody({
    description: 'Data to create a woku with binary file.',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description:
            'Image or Video file. For optimal performance when sending video, the mp4 format is preferred.',
        },
        description: {
          type: 'string',
          description:
            'The description cannot have fewer than 3 characters and cannot exceed a maximum of 140 characters.',
          example: 'Docker Training',
        },
        secondaryKey: {
          type: 'string',
          description:
            'This field is optional. Upon completing this field, the woku will be stored in the Company Folder that holds this secondary key.',
          example: '17614778-3',
        },
        clientEmail: {
          type: 'string',
          description:
            'This field is optional. By completing this field, an email will be sent to the client inviting them to rate the woku.',
          example: 'pedro@empesa.com',
        },
      },
    },
  })
  @ApiHeader({ name: 'Authorization', description: 'Company Key' })
  @ApiResponse({
    status: 200,
    description: 'woku created successfully.',
    type: WokuDTO,
  })
  async createWokuFormData(
    @Body() createWokuFormDataDTO: CreateWokuFormDataDTO,
    @Headers('Authorization') authHeader: string,
    @UploadedFile() file: Express.Multer.File | null,
  ): Promise<Woku> {
    const createdWoku = await this.wokusService.createWoku(
      createWokuFormDataDTO,
      authHeader,
      file,
    );

    return createdWoku;
  }

  @Get('/review/:wokuId')
  @ApiOperation({ summary: 'Get the woku data for review visualization' })
  @ApiParam({
    name: 'wokuId',
    type: String,
    description: 'ID of the woku to review',
  })
  @ApiHeader({ name: 'Authorization', description: 'Company Key' })
  @ApiResponse({
    status: 200,
    description: 'Data of the woku review successfully obtained.',
    type: WokuReviewDTO,
  })
  async getWokuReview(
    @Param('wokuId') wokuId: GetWokuReviewDTO['wokuId'],
    @Headers('Authorization') authHeader: string,
  ): Promise<WokuReview> {
    const wokuReview = await this.wokusService.getWokuReview(
      wokuId,
      authHeader,
    );

    return wokuReview;
  }

  @Post('/create-textnote')
  @ApiOperation({ summary: 'Create a Textnote' })
  @ApiHeader({ name: 'Authorization', description: 'Company Key' })
  @ApiResponse({
    status: 200,
    description: 'Textnote created successfully.',
    type: TextnoteDTO,
  })
  async createTextnote(
    @Body() createTextnoteDTO: CreateTextnoteDTO,
    @Headers('Authorization') authHeader: string,
  ): Promise<Textnote> {
    const createdTextnote = await this.wokusService.createTextnote(
      createTextnoteDTO,
      authHeader,
    );

    return createdTextnote;
  }
}
