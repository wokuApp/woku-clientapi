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
import { ApiTags, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';

import { WokusService } from './wokus.service';
import {
  CreateWokuDTO,
  GetWokuReviewDTO,
  CreateTextnoteDTO,
  CreateVoicemailDTO,
} from './dto/woku.dto';

@ApiTags('wokus')
@Controller('wokus')
export class WokusController {
  constructor(private readonly wokusService: WokusService) {}

  @Post('/create')
  async createWoku(
    @Body() createWokuDTO: CreateWokuDTO,
    @Headers('Authorization') authHeader: string,
  ) {
    const createdWoku = await this.wokusService.createWoku(
      createWokuDTO,
      authHeader,
    );

    return createdWoku;
  }

  @Get('/review/:wokuId')
  async getWokuReview(@Param('wokuId') wokuId: GetWokuReviewDTO['wokuId']) {
    const wokuReview = await this.wokusService.getWokuReview(wokuId);

    return wokuReview;
  }

  @Post('/create-textnote')
  async createTextnote(@Body() createTextnoteDTO: CreateTextnoteDTO) {
    const updatedWoku =
      await this.wokusService.createTextnote(createTextnoteDTO);

    return updatedWoku;
  }

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
  async createVoicemail(
    @UploadedFile() file: Express.Multer.File,
    @Body() createVoicemailDTO: CreateVoicemailDTO,
  ) {
    const createVoicemailData = { ...createVoicemailDTO };

    const updatedWoku = await this.wokusService.createVoicemail(
      createVoicemailData,
      file,
    );

    return updatedWoku;
  }
}
