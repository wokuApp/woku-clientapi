import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { CreateTextnoteDTO, CreateVoicemailDTO } from './dto/review.dtos';

import {
  Textnote,
  Voicemail,
  VoicemailFile,
  WokuQualification,
} from 'src/wokus/interfaces/woku.interfaces';

describe('ReviewController', () => {
  let reviewController: ReviewController;
  let reviewService: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: {
            getWokuReviewWidget: jest.fn(),
            createVoicemail: jest.fn(),
            createTextnote: jest.fn(),
          },
        },
      ],
    }).compile();

    reviewController = module.get<ReviewController>(ReviewController);
    reviewService = module.get<ReviewService>(ReviewService);
  });

  describe('getWokuReviewWidget', () => {
    it('should return review widget data', async () => {
      const wokuId = '65348875f3a876254aa82d5e';
      const result = {
        _id: '65348875f3a876254aa82d5e',
        description: 'woku name',
        imageUrl:
          'https://wokudevfiles.blob.core.windows.net/wokus/28a591ae-0d65-40bb-8e4d-687c9bb75397blob',
        anonymousDisabled: true,
      };
      jest
        .spyOn(reviewService, 'getWokuReviewWidget')
        .mockResolvedValue(result);

      expect(await reviewController.getWokuReviewWidget(wokuId)).toBe(result);
    });
  });

  describe('createTextnote', () => {
    it('should create a textnote', async () => {
      const dto = new CreateTextnoteDTO();
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
        .spyOn(reviewService, 'createTextnote')
        .mockImplementation(async () => result);
      expect(await reviewController.createTextnote(dto)).toBe(result);
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
        .spyOn(reviewService, 'createVoicemail')
        .mockImplementation(async () => result);
      expect(await reviewController.createVoicemail(file, dto)).toBe(result);
    });
  });
});
