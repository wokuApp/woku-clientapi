import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { WokusController } from './wokus.controller';
import { WokusService } from './wokus.service';
import {
  CreateWokuDTO,
  CreateTextnoteDTO,
  GetWokuReviewDTO,
  CreateVoicemailDTO,
  CreateWokuFormDataDTO,
} from './dto/woku.dto';

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
      providers: [WokusService],
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
      const result = {};
      jest
        .spyOn(wokusService, 'createWoku')
        .mockImplementation(async () => result);
      expect(await controller.createWoku(dto, 'authHeader')).toBe(result);
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
      // Simulate file upload
      const result = {};
      jest
        .spyOn(wokusService, 'createWoku')
        .mockImplementation(async () => result);
      expect(await controller.createWokuFormData(dto, 'authHeader', file)).toBe(
        result,
      );
    });
  });

  describe('getWokuReview', () => {
    it('should retrieve a woku review', async () => {
      const wokuId: GetWokuReviewDTO['wokuId'] = 'some-id';
      const result = {};
      jest
        .spyOn(wokusService, 'getWokuReview')
        .mockImplementation(async () => result);
      expect(await controller.getWokuReview(wokuId)).toBe(result);
    });
  });

  describe('createTextnote', () => {
    it('should create a textnote', async () => {
      const dto = new CreateTextnoteDTO();
      const result = {};
      jest
        .spyOn(wokusService, 'createTextnote')
        .mockImplementation(async () => result);
      expect(await controller.createTextnote(dto)).toBe(result);
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
      // Simulate file upload
      const result = {};
      jest
        .spyOn(wokusService, 'createVoicemail')
        .mockImplementation(async () => result);
      expect(await controller.createVoicemail(file, dto)).toBe(result);
    });
  });
});
