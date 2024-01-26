import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Request } from 'express';

import { WokusService } from './wokus.service';
import {
  CreateWokuDTO,
  GetWokuReviewDTO,
  CreateTextnoteDTO,
  CreateWokuFormDataDTO,
  CreateVoicemailDTO,
} from './dto/request.dto';
import { Textnote, Woku, WokuReview } from './interfaces/woku.interfaces';
import {
  TextnoteDTO,
  WokuDTO,
  WokuReviewDTO,
  VoicemailDTO,
} from './dto/response.dto';

@ApiTags('wokus')
@Controller('wokus')
export class WokusController {
  constructor(private readonly wokusService: WokusService) {}

  @ApiBearerAuth()
  @Post('/create-woku')
  @ApiOperation({ summary: 'Create a woku with file url' })
  @ApiResponse({
    status: 201,
    description: 'woku created successfully.',
    type: WokuDTO,
  })
  async createWoku(
    @Body() createWokuDTO: CreateWokuDTO,
    @Req() req: Request,
  ): Promise<Woku> {
    const createdWoku = await this.wokusService.createWoku(
      createWokuDTO,
      req.headers.authorization,
    );

    return createdWoku;
  }

  @ApiBearerAuth()
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
  @ApiResponse({
    status: 201,
    description: 'woku created successfully.',
    type: WokuDTO,
  })
  async createWokuFormData(
    @Body() createWokuFormDataDTO: CreateWokuFormDataDTO,
    @UploadedFile() file: Express.Multer.File | null,
    @Req() req: Request,
  ): Promise<Woku> {
    const createdWoku = await this.wokusService.createWoku(
      createWokuFormDataDTO,
      req.headers.authorization,
      file,
    );

    return createdWoku;
  }

  @ApiBearerAuth()
  @Get('/review/:wokuId')
  @ApiOperation({ summary: 'Get the woku data for review visualization' })
  @ApiParam({
    name: 'wokuId',
    type: String,
    description: 'ID of the woku to review',
  })
  @ApiResponse({
    status: 200,
    description: 'Data of the woku review successfully obtained.',
    type: WokuReviewDTO,
  })
  async getWokuReview(
    @Param('wokuId') wokuId: GetWokuReviewDTO['wokuId'],
    @Req() req: Request,
  ): Promise<WokuReview> {
    const wokuReview = await this.wokusService.getWokuReview(
      wokuId,
      req.headers.authorization,
    );

    return wokuReview;
  }

  @ApiBearerAuth()
  @Post('/create-textnote')
  @ApiOperation({ summary: 'Create a Textnote' })
  @ApiResponse({
    status: 201,
    description: 'Textnote created successfully.',
    type: TextnoteDTO,
  })
  async createTextnote(
    @Body() createTextnoteDTO: CreateTextnoteDTO,
    @Req() req: Request,
  ): Promise<Textnote> {
    const createdTextnote = await this.wokusService.createTextnote(
      createTextnoteDTO,
      req.headers.authorization,
    );

    return createdTextnote;
  }

  @ApiBearerAuth()
  @Post('/create-voicemail')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a Voicemail' })
  @ApiBody({
    description: 'Data to create a Voicemail.',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Audio file.',
        },
        wokuId: {
          type: 'string',
          description: 'This field is the ID of a woku in string format.',
          example: '65348875f3a876254aa82d5e',
        },
        qualification: {
          type: 'string',
          description:
            'This field is a string that represents an integer between 1 and 5.',
          example: '5',
        },
        clientEmail: {
          type: 'string',
          description:
            'This field is the email of the client providing the feedback. This field is optional. If this field is not filled out, the anonymous field must be marked as true.',
          example: 'pedro@empesa.com',
        },
        anonymous: {
          type: 'string',
          description:
            'This field is a string that represents a boolean, so the only options are true or false. This field is optional. When this field is a true, sends anonymous feedback. When this field is omitted or marked false, the client email must be provided in the clientEmail field.',
          example: 'false',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Voicemail created successfully.',
    type: VoicemailDTO,
  })
  async createVoicemail(
    @UploadedFile() file: Express.Multer.File,
    @Body() createVoicemailDTO: CreateVoicemailDTO,
    @Req() req: Request,
  ): Promise<VoicemailDTO> {
    const createVoicemailData = { ...createVoicemailDTO };

    const updatedWoku = await this.wokusService.createVoicemail(
      createVoicemailData,
      file,
      req.headers.authorization,
    );

    return updatedWoku;
  }
}
