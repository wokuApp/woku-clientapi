import { Test, TestingModule } from '@nestjs/testing';
import { WokusService } from './wokus.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

import {
  CreateWokuDTO,
  CreateTextnoteDTO,
  GetWokuReviewDTO,
  CreateVoicemailDTO,
  CreateWokuFormDataDTO,
} from './dto/woku.dto';

describe('WokusService', () => {
  let service: WokusService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WokusService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WokusService>(WokusService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createWoku', () => {
    it('should create a woku with file url', async () => {
      const mockResponse: AxiosResponse<any> = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      jest
        .spyOn(httpService, 'post')
        .mockImplementation(() => of(mockResponse));

      const createWokuDTO = new CreateWokuDTO(); // Add test data as needed
      const result = await service.createWoku(createWokuDTO, 'authHeader');

      expect(result).toBe(mockResponse.data);
      expect(httpService.post).toHaveBeenCalled();
    });
  });

  describe('createWoku', () => {
    it('should create a woku with file url', async () => {
      const mockResponse: AxiosResponse<any> = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      jest
        .spyOn(httpService, 'post')
        .mockImplementation(() => of(mockResponse));

      const createWokuFormDataDTO = new CreateWokuFormDataDTO(); // Add test data as needed
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
      const result = await service.createWoku(
        createWokuFormDataDTO,
        'authHeader',
        file,
      );

      expect(result).toBe(mockResponse.data);
      expect(httpService.post).toHaveBeenCalled();
    });
  });

  describe('getWokuReview', () => {
    it('should retrieve a woku review', async () => {
      const mockResponse: AxiosResponse<any> = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      jest.spyOn(httpService, 'get').mockImplementation(() => of(mockResponse));

      const wokuId: GetWokuReviewDTO['wokuId'] = 'some-id';
      const result = await service.getWokuReview(wokuId);

      expect(result).toBe(mockResponse.data);
      expect(httpService.get).toHaveBeenCalledWith(`/review/${wokuId}`);
    });
  });

  describe('createTextnote', () => {
    it('should create a textnote', async () => {
      const mockResponse: AxiosResponse<any> = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      jest
        .spyOn(httpService, 'post')
        .mockImplementation(() => of(mockResponse));

      const createTextnoteDTO = new CreateTextnoteDTO(); // Add test data as needed
      const result = await service.createTextnote(createTextnoteDTO);

      expect(result).toBe(mockResponse.data);
      expect(httpService.post).toHaveBeenCalled();
    });
  });

  describe('createVoicemail', () => {
    it('should create a voicemail', async () => {
      const mockResponse: AxiosResponse<any> = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      jest
        .spyOn(httpService, 'post')
        .mockImplementation(() => of(mockResponse));

      const createVoicemailDTO = new CreateVoicemailDTO(); // Add test data as needed
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
      const result = await service.createVoicemail(createVoicemailDTO, file);

      expect(result).toBe(mockResponse.data);
      expect(httpService.post).toHaveBeenCalled();
    });
  });
});
