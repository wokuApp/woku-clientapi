import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

import { CreateTextnoteDTO, CreateVoicemailDTO } from './dto/review.dtos';

describe('WokusService', () => {
  let service: ReviewService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWokuReviewWidget', () => {
    it('should retrieve a woku review widget', async () => {
      const mockResponse: AxiosResponse<any> = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      jest.spyOn(httpService, 'get').mockImplementation(() => of(mockResponse));

      const wokuId: string = 'some-id';
      const result = await service.getWokuReviewWidget(wokuId);

      expect(result).toBe(mockResponse.data);
      expect(httpService.get).toHaveBeenCalledWith(
        `/review/woku-review-widget/${wokuId}`,
      );
    });
  });

  describe('createTextnote', () => {
    it('should create a textnote', async () => {
      const mockResponse: AxiosResponse<any> = {
        data: {},
        status: 201,
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
      const mockResponse: AxiosResponse<any> = {
        data: {},
        status: 201,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      jest
        .spyOn(httpService, 'post')
        .mockImplementation(() => of(mockResponse));

      const createVoicemailDTO = new CreateVoicemailDTO(); // Add test data as needed
      const result = await service.createVoicemail(createVoicemailDTO, file);

      expect(result).toBe(mockResponse.data);
      expect(httpService.post).toHaveBeenCalled();
    });
  });
});
