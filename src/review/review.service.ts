import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as FormData from 'form-data';

import { CreateTextnoteDTO, CreateVoicemailDTO } from './dto/review.dtos';
import { WokuReviewWidgetData } from './interfaces/review.interfaces';
import { Textnote, Voicemail } from 'src/wokus/interfaces/woku.interfaces';

@Injectable()
export class ReviewService {
  constructor(private readonly httpService: HttpService) {}

  async getWokuReviewWidget(wokuId: string): Promise<WokuReviewWidgetData> {
    const wokuReview$ = this.httpService.get(
      `/review/woku-review-widget/${wokuId}`,
    );
    const wokuReview = await firstValueFrom(wokuReview$);

    return wokuReview.data;
  }

  async createVoicemail(
    createVoicemailDTO: CreateVoicemailDTO,
    file: Express.Multer.File,
  ): Promise<Voicemail> {
    const formData = new FormData();

    Object.keys(createVoicemailDTO).forEach((key) => {
      formData.append(key, createVoicemailDTO[key]);
    });

    if (file) {
      formData.append('file', file.buffer, file.originalname);
    }

    const createdVoicemail$ = this.httpService.post(
      '/review/create-voicemail',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...formData.getHeaders(),
        },
      },
    );

    const createdVoicemail = await firstValueFrom(createdVoicemail$);

    return createdVoicemail.data;
  }

  async createTextnote(
    createTextnoteDTO: CreateTextnoteDTO,
  ): Promise<Textnote> {
    const createdTextnote$ = this.httpService.post(
      '/review/create-textnote',
      createTextnoteDTO,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const createdTextnote = await firstValueFrom(createdTextnote$);

    return createdTextnote.data;
  }
}
