import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { WokusController } from './wokus.controller';
import { WokusService } from './wokus.service';
import { UtilsService } from './utils.service';
import {
  CreateWokuDTO,
  CreateTextnoteDTO,
  GetWokuReviewDTO,
  CreateWokuFormDataDTO,
  CreateVoicemailDTO,
} from './dto/request.dto';
import {
  Avatar,
  PublicCompany,
  PublicUser,
  Textnote,
  VoicemailFile,
  Woku,
  WokuFile,
  WokuQualification,
  WokuReview,
  WokuTextnote,
  WokuVoicemail,
  Voicemail,
} from './interfaces/woku.interfaces';

describe('WokusController', () => {
  let controller: WokusController;
  let wokusService: WokusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            baseURL: configService.get<string>('API'),
          }),
          inject: [ConfigService],
        }),
      ],
      controllers: [WokusController],
      providers: [WokusService, UtilsService],
    }).compile();

    controller = module.get<WokusController>(WokusController);
    wokusService = module.get<WokusService>(WokusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createWoku', () => {
    it('should create a woku', async () => {
      const dto = new CreateWokuDTO();
      const req = { headers: { authorization: 'company key' } } as Request;
      const result = {
        _id: '65348875f3a876254aa82d5e',
        description: 'Docker Training',
        createdBy: '653485cff3a876254aa82d0b',
        companyId: '6534865cf3a876254aa82d26',
        users: ['653485cff3a876254aa82d0b', '6541cc3f666483667c07dd92'],
        file: {
          filename: 'image',
          type: 'image',
          url: 'https://wokudevfiles.blob.core.windows.net/wokus/cd7f9cf3-c2e4-4ff0-8a96-19ff813f569e1699220394936-image.webp',
        } as WokuFile,
        qualifications: [],
        textnotes: [],
        voicemails: [],
      } as Woku;

      jest
        .spyOn(wokusService, 'createWoku')
        .mockImplementation(async () => result);
      expect(await controller.createWoku(dto, req)).toBe(result);
    });
  });

  describe('createWokuFormData', () => {
    it('should create a woku with form data', async () => {
      const dto = new CreateWokuFormDataDTO();
      const file: Express.Multer.File = {
        fieldname: 'fieldname',
        originalname: 'originalname',
        encoding: 'encoding',
        mimetype: 'mimetype',
        size: 0,
        destination: 'destination',
        filename: 'filename',
        path: 'path',
        stream: null,
        buffer: Buffer.from([]),
      };
      const req = { headers: { authorization: 'company key' } } as Request;
      const result = {
        _id: '65348875f3a876254aa82d5e',
        description: 'Docker Training',
        createdBy: '653485cff3a876254aa82d0b',
        companyId: '6534865cf3a876254aa82d26',
        users: ['653485cff3a876254aa82d0b', '6541cc3f666483667c07dd92'],
        file: {
          filename: 'image',
          type: 'image',
          url: 'https://wokudevfiles.blob.core.windows.net/wokus/cd7f9cf3-c2e4-4ff0-8a96-19ff813f569e1699220394936-image.webp',
        } as WokuFile,
        qualifications: [],
        textnotes: [],
        voicemails: [],
      } as Woku;

      jest
        .spyOn(wokusService, 'createWoku')
        .mockImplementation(async () => result);
      expect(await controller.createWokuFormData(dto, file, req)).toBe(result);
    });
  });

  describe('getWokuReview', () => {
    it('should retrieve a woku review', async () => {
      const wokuId: GetWokuReviewDTO['wokuId'] = 'some-id';
      const req = { headers: { authorization: 'company key' } } as Request;
      const result: WokuReview = {
        woku: {
          _id: '65348875f3a876254aa82d5e',
          description: 'Docker Training',
          createdBy: '653485cff3a876254aa82d0b',
          companyId: '6534865cf3a876254aa82d26',
          users: ['653485cff3a876254aa82d0b', '6541cc3f666483667c07dd92'],
          file: {
            filename: 'image',
            type: 'image',
            url: 'https://wokudevfiles.blob.core.windows.net/wokus/cd7f9cf3-c2e4-4ff0-8a96-19ff813f569e1699220394936-image.webp',
          } as WokuFile,
          qualifications: [
            {
              qualification: 4,
            } as WokuQualification,
          ],
          textnotes: [
            {
              qualification: {
                qualification: 4,
              } as WokuQualification,
              anonymous: false,
              description: 'Excellent',
              feedbackType: 'recognition',
              clientId: 'Client ID',
            } as WokuTextnote,
          ],
          voicemails: [
            {
              qualification: {
                qualification: 4,
              } as WokuQualification,
              anonymous: false,
              file: {
                filename: 'audio-review-6596d27998ebf3609b208f4b',
                type: 'audio',
                url: 'https://wokudevfiles.blob.core.windows.net/wokus/28a591ae-0d65-40bb-8e4d-687c9bb75397blob',
              } as VoicemailFile,
              transcription: 'hola todo está súper bien me gustó todo',
              feedbackType: 'recognition',
              clientId: 'Client ID',
            } as WokuVoicemail,
          ],
          feedbacksSummary: 'Training with good comments and congratulations',
        } as Woku,
        users: [
          {
            name: 'dior',
            avatar: {
              filename: 'diego.png',
              type: 'image',
              url: 'https://wokudevfiles.blob.core.windows.net/wokus/5fb16472-8fcb-462a-b08b-88fa316e079d1700095980638-diego.webp',
            } as Avatar,
          } as PublicUser,
        ],
        company: {
          name: 'woku',
          avatar: {
            filename: 'wokuLogo',
            type: 'image',
            url: 'https://wokudevfiles.blob.core.windows.net/wokus/24d230df-cd8e-4345-9944-9cfed9c7da52wokuLogo.png',
          } as Avatar,
        } as PublicCompany,
      };
      jest
        .spyOn(wokusService, 'getWokuReview')
        .mockImplementation(async () => result);
      expect(await controller.getWokuReview(wokuId, req)).toBe(result);
    });
  });

  describe('createTextnote', () => {
    it('should create a textnote', async () => {
      const dto = new CreateTextnoteDTO();
      const req = { headers: { authorization: 'company key' } } as Request;
      const result = {
        qualification: {
          _id: 'Qualification ID',
          qualification: 4,
        },
        wokuId: '65348875f3a876254aa82d5e',
        anonymous: false,
        description: 'Excellent',
        feedbackType: 'recognition',
        clientId: '653c78b70c83744b1340a551',
      } as Textnote;
      jest
        .spyOn(wokusService, 'createTextnote')
        .mockImplementation(async () => result);
      expect(await controller.createTextnote(dto, req)).toBe(result);
    });
  });

  describe('createVoicemail', () => {
    it('should create a voicemail', async () => {
      const dto = new CreateVoicemailDTO();
      const file: Express.Multer.File = {
        fieldname: 'fieldname',
        originalname: 'originalname',
        encoding: 'encoding',
        mimetype: 'mimetype',
        size: 0,
        destination: 'destination',
        filename: 'filename',
        path: 'path',
        stream: null,
        buffer: Buffer.from([]),
      };
      const req = { headers: { authorization: 'company key' } } as Request;
      const result = {
        qualification: {
          qualification: 4,
        } as WokuQualification,
        anonymous: false,
        file: {
          filename: 'audio-review-6596d27998ebf3609b208f4b',
          type: 'audio',
          url: 'https://wokudevfiles.blob.core.windows.net/wokus/28a591ae-0d65-40bb-8e4d-687c9bb75397blob',
        } as VoicemailFile,
        transcription: 'hola todo está súper bien me gustó todo',
        feedbackType: 'recognition',
        clientId: 'Client  ID',
        _id: 'Voicemail ID',
      } as Voicemail;

      jest
        .spyOn(wokusService, 'createVoicemail')
        .mockImplementation(async () => result);
      expect(await controller.createVoicemail(file, dto, req)).toBe(result);
    });
  });
});
