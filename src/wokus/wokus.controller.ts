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

import { WokusService } from './wokus.service';

import {
  CreateWokuDTO,
  GetWokuReviewDTO,
  CreateTextnoteDTO,
  CreateVoicemailDTO,
} from './dto/woku.dto';

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
  async createVoicemail(
    @UploadedFile() file: Express.Multer.File,
    @Body() createVoicemailDTO: CreateVoicemailDTO,
  ) {
    const updatedWoku = await this.wokusService.createVoicemail(
      createVoicemailDTO,
      file,
    );

    return updatedWoku;
  }
}
