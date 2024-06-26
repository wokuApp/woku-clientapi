import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ReviewService } from './review.service';
import { CreateTextnoteDTO, CreateVoicemailDTO } from './dto/review.dtos';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/woku-review-widget/:wokuId')
  async getWokuReviewWidget(@Param('wokuId') wokuId: string) {
    const wokuReviewWidgetData =
      await this.reviewService.getWokuReviewWidget(wokuId);

    return wokuReviewWidgetData;
  }

  @Post('/create-voicemail')
  @UseInterceptors(FileInterceptor('file'))
  async createVoicemail(
    @UploadedFile() file: Express.Multer.File,
    @Body() createVoicemailDTO: CreateVoicemailDTO,
  ) {
    const voicemail = await this.reviewService.createVoicemail(
      createVoicemailDTO,
      file,
    );

    return voicemail;
  }

  @Post('/create-textnote')
  async createTextnote(@Body() createTextnoteDTO: CreateTextnoteDTO) {
    const textnote = await this.reviewService.createTextnote(createTextnoteDTO);

    return textnote;
  }
}
