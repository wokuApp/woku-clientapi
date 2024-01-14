import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as FormData from 'form-data';

import {
  CreateWokuDTO,
  GetWokuReviewDTO,
  CreateTextnoteDTO,
  CreateVoicemailDTO,
} from './dto/woku.dto';

@Injectable()
export class WokusService {
  constructor(private readonly httpService: HttpService) {}

  async createWoku(createWokuDTO: CreateWokuDTO, authHeader: string) {
    const data = {
      ...createWokuDTO,
      auth: authHeader,
    };

    const createdWoku$ = this.httpService.post('/create-woku', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const createdWoku = await firstValueFrom(createdWoku$);

    return createdWoku.data;
  }

  async getWokuReview(wokuId: GetWokuReviewDTO['wokuId']) {
    const wokuReview$ = this.httpService.get(`/review/${wokuId}`);
    const wokuReview = await firstValueFrom(wokuReview$);

    return wokuReview.data;
  }

  async createTextnote(createTextnoteDTO: CreateTextnoteDTO) {
    const data = {
      ...createTextnoteDTO,
    };

    const createdTextnote$ = this.httpService.post('/create-textnote', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const createdTextnote = await firstValueFrom(createdTextnote$);

    return createdTextnote.data;
  }

  async createVoicemail(
    createVoicemailDTO: CreateVoicemailDTO,
    file: Express.Multer.File,
  ) {
    const formData = new FormData();

    Object.keys(createVoicemailDTO).forEach((key) => {
      formData.append(key, createVoicemailDTO[key]);
    });

    if (file) {
      formData.append('file', file.buffer, file.originalname);
    }

    const createdVoicemail$ = this.httpService.post(
      '/create-voicemail',
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
}
