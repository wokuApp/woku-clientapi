import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import FormData from 'form-data';

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
    const wokuData = {
      ...createWokuDTO,
      auth: authHeader,
    };

    const createdWoku$ = this.httpService.post('/create-woku', wokuData);
    const createdWoku = await lastValueFrom(createdWoku$);

    return createdWoku;
  }

  async getWokuReview(wokuId: GetWokuReviewDTO['wokuId']) {
    const wokuReview$ = this.httpService.get(`/review/${wokuId}`);
    const wokuReview = await lastValueFrom(wokuReview$);

    return wokuReview;
  }

  async createTextnote(createTextnoteDTO: CreateTextnoteDTO) {
    const updatedWoku$ = this.httpService.post(
      '/create-textnote',
      createTextnoteDTO,
    );
    const updatedWoku = await lastValueFrom(updatedWoku$);

    return updatedWoku;
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

    const updatedWoku$ = this.httpService.post('/create-voicemail', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    const updatedWoku = await lastValueFrom(updatedWoku$);

    return updatedWoku;
  }
}
