import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as FormData from 'form-data';

import {
  CreateWokuDTO,
  GetWokuReviewDTO,
  CreateTextnoteDTO,
  CreateWokuFormDataDTO,
  CreateVoicemailDTO,
  ShareWokuToEmailDTO,
} from './dto/request.dto';
import {
  Textnote,
  Woku,
  WokuReview,
  Voicemail,
} from './interfaces/woku.interfaces';
import { UtilsService } from './utils.service';

@Injectable()
export class WokusService {
  constructor(
    private readonly httpService: HttpService,
    private readonly utilsService: UtilsService,
  ) {}

  async createWoku(
    createWokuDTO: CreateWokuDTO | CreateWokuFormDataDTO,
    authHeader: string,
    file?: Express.Multer.File | null,
  ): Promise<Woku> {
    const data = {
      ...createWokuDTO,
      authHeader: authHeader,
    };

    if (file) {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (file) {
        formData.append('file', file.buffer, file.originalname);
      }

      const createdWokuWithFormData$ = this.httpService.post(
        '/create-woku-form-data',
        formData,
        {
          headers: {
            'Content-Type': ['multipart/form-data'],
            ...formData.getHeaders(),
          },
        },
      );
      const createdWoku = await firstValueFrom(createdWokuWithFormData$);

      return createdWoku.data;
    }

    const createdWoku$ = this.httpService.post('/create-woku', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const createdWoku = await firstValueFrom(createdWoku$);

    return createdWoku.data;
  }

  async getWokuReview(
    wokuId: GetWokuReviewDTO['wokuId'],
    authHeader: string,
  ): Promise<WokuReview> {
    const auth = this.utilsService.extractKeyFromAuthHeader(authHeader);

    const wokuReview$ = this.httpService.get(`/review/${wokuId}/${auth}`);
    const wokuReview = await firstValueFrom(wokuReview$);

    return wokuReview.data;
  }

  async createTextnote(
    createTextnoteDTO: CreateTextnoteDTO,
    authHeader: string,
  ): Promise<Textnote> {
    const data = {
      ...createTextnoteDTO,
      authHeader: authHeader,
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
    authHeader: string,
  ): Promise<Voicemail> {
    const formData = new FormData();

    Object.keys(createVoicemailDTO).forEach((key) => {
      formData.append(key, createVoicemailDTO[key]);
    });

    formData.append('authHeader', authHeader);

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

  async shareWokuToEmail(
    shareWokuToEmailDTO: ShareWokuToEmailDTO,
    authHeader: string,
  ): Promise<string> {
    if (
      shareWokuToEmailDTO?.clientEmails &&
      shareWokuToEmailDTO.clientEmails.length > 0
    ) {
      const clientEmails = shareWokuToEmailDTO.clientEmails;
      const wokuId = shareWokuToEmailDTO.wokuId;
      const failedEmails = {
        emails: [],
      };

      clientEmails.forEach(async (clientEmail: string): Promise<void> => {
        const data = {
          wokuId,
          clientEmail,
          authHeader,
        };

        const shareWokuToEmail$ = this.httpService.post(
          '/share-woku-to-email',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const response = await firstValueFrom(shareWokuToEmail$);

        if (response.data !== 'Email sent successfully') {
          failedEmails.emails.push(clientEmail);
        }
      });

      if (failedEmails.emails.length > 0) {
        const message =
          'The following emails failed to be sent: ' +
          failedEmails.emails.join(', ');

        return message;
      }

      return 'Emails sent successfully';
    }

    const data = {
      ...shareWokuToEmailDTO,
      authHeader,
    };

    const shareWokuToEmail$ = this.httpService.post(
      '/share-woku-to-email',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const shareWokuToEmail = await firstValueFrom(shareWokuToEmail$);

    return shareWokuToEmail.data;
  }
}
